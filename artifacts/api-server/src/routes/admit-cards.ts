import { Router, type IRouter } from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";

const router: IRouter = Router();

const SEEN_CARDS_PATH = path.join(__dirname, "../../data/seen-cards.json");
const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;

interface AdmitCard {
  id: string;
  title: string;
  organization: string;
  link: string;
  firstSeen: string;
}

interface SeenCards {
  [articleId: string]: string;
}

function loadSeenCards(): SeenCards {
  try {
    return JSON.parse(fs.readFileSync(SEEN_CARDS_PATH, "utf-8"));
  } catch {
    return {};
  }
}

function saveSeenCards(seen: SeenCards): void {
  try {
    fs.writeFileSync(SEEN_CARDS_PATH, JSON.stringify(seen, null, 2));
  } catch {
    // non-fatal
  }
}

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.5",
};

function extractArticleId(url: string): string {
  const m = url.match(/-(\d+)$/);
  return m ? m[1] : url;
}

function slugToTitle(slug: string): string {
  return slug
    .replace(/-\d+$/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

async function fetchOfficialLink(articleUrl: string): Promise<string | null> {
  try {
    const res = await axios.get(articleUrl, { headers: HEADERS, timeout: 12000 });
    const $ = cheerio.load(res.data);
    let officialLink: string | null = null;

    $("a[href]").each((_, el) => {
      if (officialLink) return;
      const href = $(el).attr("href") || "";
      const text = $(el).text().toLowerCase().trim();
      const isOfficial = /\.gov\.in|\.nic\.in|\.ac\.in|\.org\.in|ibps\.in|rbi\.org\.in|sbi\.co\.in|nabard\.org|licindia\.in|railway\.gov\.in/.test(href);
      if (isOfficial && /download|admit|click here|hall ticket|direct|login|apply/.test(text)) {
        officialLink = href;
      }
    });

    if (!officialLink) {
      $("a[href]").each((_, el) => {
        if (officialLink) return;
        const href = $(el).attr("href") || "";
        if (/\.gov\.in|\.nic\.in|\.ac\.in|ibps\.in|rbi\.org\.in|sbi\.co\.in|nabard\.org|licindia\.in/.test(href)) {
          if (!href.includes("freejobalert")) officialLink = href;
        }
      });
    }

    return officialLink;
  } catch {
    return null;
  }
}

let cache: { items: AdmitCard[]; lastUpdated: string } | null = null;
let cacheTime = 0;
const CACHE_TTL = 6 * 60 * 60 * 1000;

async function scrapeAdmitCards(): Promise<AdmitCard[]> {
  const listingUrl = "https://www.freejobalert.com/admit-card/";
  const listingRes = await axios.get(listingUrl, { headers: HEADERS, timeout: 15000 });
  const $ = cheerio.load(listingRes.data);

  const articleMap = new Map<
    string,
    { title: string; organization: string; articleUrl: string; articleId: string }
  >();

  $("table").each((tableIdx, table) => {
    $(table)
      .find("tr")
      .each((rowIdx, row) => {
        if (rowIdx === 0) return;
        const cells = $(row).find("td");
        if (cells.length < 3) return;

        const linkEl = $(cells[cells.length - 1]).find("a[href]").first();
        const href = linkEl.attr("href") || "";
        if (!href.includes("/articles/")) return;
        if (articleMap.has(href)) return;

        const articleId = extractArticleId(href);

        let org = "";
        let title = "";

        if (cells.length >= 4) {
          org = $(cells[1]).text().trim();
          const post = $(cells[2]).text().trim();
          title = post
            ? `${org} ${post} Admit Card`
            : slugToTitle(href.split("/articles/")[1] || "");
        } else {
          const combined = $(cells[1]).text().trim();
          org = combined.split(" ").slice(0, 2).join(" ");
          title = combined || slugToTitle(href.split("/articles/")[1] || "");
        }

        if (!title || title.length < 5) {
          title = slugToTitle(href.split("/articles/")[1] || "");
        }
        if (!org) org = title.split(" ").slice(0, 2).join(" ");

        articleMap.set(href, { title, organization: org, articleUrl: href, articleId });
      });
  });

  const sorted = Array.from(articleMap.values()).sort(
    (a, b) => parseInt(b.articleId) - parseInt(a.articleId)
  );
  const top25 = sorted.slice(0, 25);

  const seen = loadSeenCards();
  const now = Date.now();

  const results = await Promise.all(
    top25.map(async ({ title, organization, articleUrl, articleId }) => {
      const id = `ac-${articleId}`;
      const firstSeen: string = seen[id] ?? new Date(now).toISOString();
      seen[id] = firstSeen;

      const officialLink = await fetchOfficialLink(articleUrl);
      if (!officialLink) return null;

      return {
        id,
        title,
        organization,
        link: officialLink,
        firstSeen,
      } satisfies AdmitCard;
    })
  );

  saveSeenCards(seen);

  const validItems = results.filter((item): item is AdmitCard => {
    if (!item) return false;
    const age = now - new Date(item.firstSeen).getTime();
    return age <= TEN_DAYS_MS;
  });

  validItems.sort(
    (a, b) => new Date(b.firstSeen).getTime() - new Date(a.firstSeen).getTime()
  );

  return validItems;
}

export async function refreshAdmitCardsCache(log?: { info: (msg: string) => void; error: (obj: object, msg: string) => void }): Promise<void> {
  try {
    log?.info("Background scrape: fetching admit cards...");
    const items = await scrapeAdmitCards();
    cache = { items, lastUpdated: new Date().toISOString() };
    cacheTime = Date.now();
    log?.info(`Background scrape: done — ${items.length} admit cards cached`);
  } catch (err) {
    log?.error({ err }, "Background scrape failed for admit cards");
  }
}

router.get("/admit-cards", async (req, res) => {
  try {
    const now = Date.now();
    if (cache && now - cacheTime < CACHE_TTL) {
      res.json(cache);
      return;
    }

    const items = await scrapeAdmitCards();
    const result = { items, lastUpdated: new Date().toISOString() };
    cache = result;
    cacheTime = now;
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to scrape admit cards");
    res.status(500).json({ error: "Failed to fetch admit cards" });
  }
});
router.get("/cron/admitcard", async (req, res) => {
  try {
    console.log("Cron admitcard triggered");

    const items = await scrapeAdmitCards();

    // update cache also
    cache = { items, lastUpdated: new Date().toISOString() };
    cacheTime = Date.now();

    res.json({
      success: true,
      count: items.length,
      message: "Admit cards updated"
    });
  } catch (error) {
    console.error("Cron error:", error);
    res.status(500).json({ success: false });
  }
});
export default router;
