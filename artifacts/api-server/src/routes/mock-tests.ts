import { Router, type IRouter } from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router: IRouter = Router();

interface MockTest {
  id: string;
  title: string;
  category: string;
  description: string;
  link: string;
  questionCount: string;
}

const FALLBACK_MOCK_TESTS: MockTest[] = [
  {
    id: "mt-ssc-cgl",
    title: "SSC CGL Mock Test 2026",
    category: "SSC",
    description: "Combined Graduate Level - Full length practice exam with 100 questions covering Reasoning, English, Quantitative Aptitude and GK.",
    link: "https://slate.freejobalert.com/mock-test/",
    questionCount: "100",
  },
  {
    id: "mt-ibps-po",
    title: "IBPS PO Mock Test 2026",
    category: "Banking",
    description: "Institute of Banking Personnel Selection - Probationary Officer full mock test with section-wise detailed analysis.",
    link: "https://slate.freejobalert.com/mock-test/",
    questionCount: "100",
  },
  {
    id: "mt-rrb-ntpc",
    title: "RRB NTPC Mock Test 2026",
    category: "Railway",
    description: "Railway Recruitment Board NTPC - Practice test covering Mathematics, General Intelligence, and General Awareness.",
    link: "https://slate.freejobalert.com/mock-test/",
    questionCount: "100",
  },
  {
    id: "mt-sbi-po",
    title: "SBI PO Mock Test 2026",
    category: "Banking",
    description: "State Bank of India Probationary Officer - Complete mock test with prelims and mains pattern.",
    link: "https://slate.freejobalert.com/mock-test/",
    questionCount: "100",
  },
  {
    id: "mt-ssc-chsl",
    title: "SSC CHSL Mock Test 2026",
    category: "SSC",
    description: "Combined Higher Secondary Level exam mock test. Practice questions on Tier 1 pattern.",
    link: "https://slate.freejobalert.com/mock-test/",
    questionCount: "100",
  },
  {
    id: "mt-rrb-group-d",
    title: "RRB Group D Mock Test 2026",
    category: "Railway",
    description: "Railway Group D exam practice test covering Mathematics, General Intelligence, Science and GK.",
    link: "https://slate.freejobalert.com/mock-test/",
    questionCount: "100",
  },
  {
    id: "mt-upsc-cse",
    title: "UPSC Civil Services Prelims Mock Test",
    category: "UPSC",
    description: "IAS Prelims General Studies Paper I practice test. 100 questions to be completed in 2 hours.",
    link: "https://slate.freejobalert.com/mock-test/",
    questionCount: "100",
  },
  {
    id: "mt-ibps-clerk",
    title: "IBPS Clerk Mock Test 2026",
    category: "Banking",
    description: "IBPS Clerk Prelims mock test with English Language, Numerical Ability and Reasoning sections.",
    link: "https://slate.freejobalert.com/mock-test/",
    questionCount: "100",
  },
  {
    id: "mt-ssc-mts",
    title: "SSC MTS Mock Test 2026",
    category: "SSC",
    description: "Multi Tasking Staff exam practice test based on latest syllabus and exam pattern.",
    link: "https://slate.freejobalert.com/mock-test/",
    questionCount: "90",
  },
  {
    id: "mt-nda",
    title: "NDA Mock Test 2026",
    category: "Defence",
    description: "National Defence Academy & Naval Academy exam mock test with Mathematics and General Ability sections.",
    link: "https://slate.freejobalert.com/mock-test/",
    questionCount: "150",
  },
  {
    id: "mt-cds",
    title: "CDS Mock Test 2026",
    category: "Defence",
    description: "Combined Defence Services practice test for IMA, INA, AFA and OTA entries.",
    link: "https://slate.freejobalert.com/mock-test/",
    questionCount: "120",
  },
  {
    id: "mt-lic-aao",
    title: "LIC AAO Mock Test 2026",
    category: "Insurance",
    description: "Life Insurance Corporation Assistant Administrative Officer exam practice test.",
    link: "https://slate.freejobalert.com/mock-test/",
    questionCount: "90",
  },
  {
    id: "mt-nabard",
    title: "NABARD Grade A Mock Test 2026",
    category: "Banking",
    description: "National Bank for Agriculture and Rural Development Grade A officer exam practice test.",
    link: "https://slate.freejobalert.com/mock-test/",
    questionCount: "200",
  },
  {
    id: "mt-rrb-je",
    title: "RRB JE Mock Test 2026",
    category: "Railway",
    description: "Railway Junior Engineer exam practice covering CBT Stage 1 and Stage 2 patterns.",
    link: "https://slate.freejobalert.com/mock-test/",
    questionCount: "100",
  },
  {
    id: "mt-capf-ac",
    title: "CAPF AC Mock Test 2026",
    category: "Defence",
    description: "Central Armed Police Forces Assistant Commandant practice exam test.",
    link: "https://slate.freejobalert.com/mock-test/",
    questionCount: "125",
  },
  {
    id: "mt-ssc-gd",
    title: "SSC GD Constable Mock Test 2026",
    category: "SSC",
    description: "General Duty Constable exam practice. Covers Reasoning, Elementary Mathematics, English, and GK.",
    link: "https://slate.freejobalert.com/mock-test/",
    questionCount: "80",
  },
];

let cache: { items: MockTest[]; lastUpdated: string; source: "scraped" | "fallback" } | null = null;
let cacheTime = 0;
const CACHE_TTL = 30 * 60 * 1000;

async function scrapeMockTests(): Promise<{ items: MockTest[]; source: "scraped" | "fallback" }> {
  try {
    const url = "https://slate.freejobalert.com/mock-test/";
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
    const items: MockTest[] = [];

    $("a[href]").each((_, el) => {
      const href = $(el).attr("href") || "";
      const text = $(el).text().trim();

      if (
        (href.includes("/quiz/") || href.includes("/test/") || href.includes("/exam/")) &&
        text.length > 5 &&
        text !== "Mock Test"
      ) {
        const category = text.match(/SSC/i)
          ? "SSC"
          : text.match(/IBPS|SBI|NABARD|RBI|Bank/i)
          ? "Banking"
          : text.match(/RRB|Railway/i)
          ? "Railway"
          : text.match(/UPSC|IAS|IPS/i)
          ? "UPSC"
          : text.match(/NDA|CDS|CAPF|Defence|Army|Navy/i)
          ? "Defence"
          : text.match(/LIC|Insurance/i)
          ? "Insurance"
          : "General";

        items.push({
          id: `mt-scraped-${items.length}`,
          title: text,
          category,
          description: "",
          link: href.startsWith("http") ? href : `https://slate.freejobalert.com${href}`,
          questionCount: "",
        });
      }
    });

    if (items.length > 5) {
      return { items: items.slice(0, 50), source: "scraped" };
    }
  } catch (_err) {
    // Fall through to fallback data
  }

  return { items: FALLBACK_MOCK_TESTS, source: "fallback" };
}

router.get("/mock-tests", async (req, res) => {
  try {
    const now = Date.now();
    if (cache && now - cacheTime < CACHE_TTL) {
      res.json(cache);
      return;
    }

    const { items, source } = await scrapeMockTests();
    const result = {
      items,
      lastUpdated: new Date().toISOString(),
      source,
    };
    cache = result;
    cacheTime = now;
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch mock tests");
    res.status(500).json({ error: "Failed to fetch mock tests" });
  }
});

export default router;
