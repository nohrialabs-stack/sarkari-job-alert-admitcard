import { Router, type IRouter } from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router: IRouter = Router();

interface AdmitCard {
  id: string;
  title: string;
  organization: string;
  postName: string;
  releaseDate: string;
  examDate: string;
  link: string;
}

let cache: { items: AdmitCard[]; lastUpdated: string } | null = null;
let cacheTime = 0;
const CACHE_TTL = 15 * 60 * 1000;

async function scrapeAdmitCards(): Promise<AdmitCard[]> {
  const url = "https://www.freejobalert.com/admit-card/";
  const response = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
    },
    timeout: 15000,
  });

  const $ = cheerio.load(response.data);
  const items: AdmitCard[] = [];

  $("table tr, .admit-card-table tr, article table tr").each((i, row) => {
    if (i === 0) return;
    const cells = $(row).find("td");
    if (cells.length < 2) return;

    const linkEl = $(cells[0]).find("a").first();
    const title = linkEl.text().trim() || $(cells[0]).text().trim();
    const link = linkEl.attr("href") || "#";

    if (!title) return;

    const org = $(cells[1]).text().trim();
    const postName = $(cells[2])?.text().trim() || "";
    const releaseDate = $(cells[3])?.text().trim() || "";
    const examDate = $(cells[4])?.text().trim() || "";

    items.push({
      id: `ac-${i}`,
      title,
      organization: org || "Government",
      postName,
      releaseDate,
      examDate,
      link: link.startsWith("http") ? link : `https://www.freejobalert.com${link}`,
    });
  });

  if (items.length === 0) {
    $("table").each((_, table) => {
      $(table)
        .find("tr")
        .each((i, row) => {
          if (i === 0) return;
          const cells = $(row).find("td");
          if (cells.length < 2) return;

          const linkEl = $(cells[0]).find("a").first();
          const title = linkEl.text().trim() || $(cells[0]).text().trim();
          const link = linkEl.attr("href") || "#";

          if (!title || title.length < 5) return;

          items.push({
            id: `ac-${items.length}`,
            title,
            organization: $(cells[1]).text().trim() || "Government",
            postName: $(cells[2])?.text().trim() || "",
            releaseDate: $(cells[3])?.text().trim() || "",
            examDate: $(cells[4])?.text().trim() || "",
            link: link.startsWith("http") ? link : `https://www.freejobalert.com${link}`,
          });
        });
    });
  }

  if (items.length === 0) {
    $("a").each((i, el) => {
      const href = $(el).attr("href") || "";
      const text = $(el).text().trim();
      if (
        href.includes("admit-card") &&
        text.length > 10 &&
        !href.includes("freejobalert.com/admit-card/$")
      ) {
        items.push({
          id: `ac-${items.length}`,
          title: text,
          organization: "Government",
          postName: "",
          releaseDate: "",
          examDate: "",
          link: href.startsWith("http") ? href : `https://www.freejobalert.com${href}`,
        });
      }
    });
  }

  return items.slice(0, 100);
}

router.get("/admit-cards", async (req, res) => {
  try {
    const now = Date.now();
    if (cache && now - cacheTime < CACHE_TTL) {
      res.json(cache);
      return;
    }

    const items = await scrapeAdmitCards();
    const result = {
      items,
      lastUpdated: new Date().toISOString(),
    };
    cache = result;
    cacheTime = now;
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to scrape admit cards");
    res.status(500).json({ error: "Failed to fetch admit cards" });
  }
});

export default router;
