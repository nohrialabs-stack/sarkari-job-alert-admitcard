# Sarkari Job Alert — Self-Hosting & Deployment Guide

This guide explains how to host both services (the website + the API server) on **free platforms** and connect them to your custom domain and Android app.

---

## Overview

There are two parts to host:

| Part | What it is | Host on |
|---|---|---|
| **API Server** | Node.js server that scrapes FreeJobAlert | Railway or Render |
| **Website** | React frontend | Vercel or Netlify |

---

## Step 1 — Export the Code

Download this project from Replit:
1. Click the three-dot menu (top-left) → **Download as ZIP**
2. Extract the ZIP on your computer

---

## Step 2 — Host the API Server (Railway — Free)

Railway gives you a **always-on** free tier, which is ideal because the background scraper needs to run 24/7.

### Steps:
1. Go to **[railway.app](https://railway.app)** and create a free account
2. Click **New Project → Deploy from GitHub repo**
3. Push your code to GitHub first (create a repo and push the ZIP contents)
4. In Railway, select your repo
5. Set the **Root Directory** to: `artifacts/api-server`
6. Set these **Environment Variables** in Railway:
   ```
   NODE_ENV=production
   PORT=3000
   ```
7. Set the **Start Command** to:
   ```
   pnpm run build && pnpm run start
   ```
8. Click **Deploy**
9. Railway gives you a URL like: `https://your-api.up.railway.app`

> **Alternative: Render.com** — also free, same steps. Set root directory to `artifacts/api-server`.

---

## Step 3 — Host the Website (Vercel — Free)

1. Go to **[vercel.com](https://vercel.com)** and create a free account
2. Click **Add New → Project → Import from GitHub**
3. Select your repo
4. Set **Root Directory** to: `artifacts/sarkari-job-alert`
5. Set this **Environment Variable**:
   ```
   VITE_API_BASE_URL=https://your-api.up.railway.app
   ```
   (Use the Railway URL from Step 2)
6. Click **Deploy**
7. Vercel gives you: `https://your-site.vercel.app`

---

## Step 4 — Connect Your Custom Domain

### For the Website (Vercel):
1. In Vercel → your project → **Settings → Domains**
2. Add your domain (e.g. `sarkarialert.in`)
3. Update your domain's DNS with the CNAME records Vercel provides

### For the API (Railway):
1. In Railway → your project → **Settings → Networking → Custom Domain**
2. Add `api.sarkarialert.in` (subdomain)
3. Update DNS with the CNAME Railway provides

---

## Step 5 — Connect Your Android App

Update your Android app to call the API at your new Railway URL.

### API Endpoints your app can use:

**Get all admit cards (scraped live, updated every 6 hours automatically):**
```
GET https://api.sarkarialert.in/admit-cards

Response:
{
  "items": [
    {
      "id": "ac-12345",
      "title": "UPSC Civil Services Admit Card",
      "organization": "UPSC",
      "link": "https://upsc.gov.in/...",
      "firstSeen": "2026-04-09T10:00:00.000Z"
    }
  ],
  "lastUpdated": "2026-04-09T14:00:00.000Z"
}
```

**Get mock tests:**
```
GET https://api.sarkarialert.in/mock-tests
```

**Health check (to verify server is up):**
```
GET https://api.sarkarialert.in/health
```

### In your Android app (Retrofit example):
```kotlin
interface SarkariApiService {
    @GET("admit-cards")
    suspend fun getAdmitCards(): AdmitCardsResponse

    @GET("mock-tests")
    suspend fun getMockTests(): MockTestsResponse
}

val retrofit = Retrofit.Builder()
    .baseUrl("https://api.sarkarialert.in/")
    .addConverterFactory(GsonConverterFactory.create())
    .build()
```

---

## How the Auto-Scraping Works (After Deployment)

Once deployed to Railway:
- On every **server startup** → scrapes FreeJobAlert immediately and caches results
- Every **6 hours** → automatically re-scrapes in the background, no visitor needed
- Data persists in `data/seen-cards.json` (tracks when each card was first seen)
- Cards auto-expire after **10 days** (keeps the list fresh)

---

## Cost

| Service | Free Tier |
|---|---|
| Railway | 500 hours/month free (always-on for 1 project) |
| Vercel | Unlimited for personal projects |
| Domain | ~₹500–800/year from GoDaddy or Namecheap |

---

## Summary Checklist

- [ ] Push code to GitHub
- [ ] Deploy API Server → Railway (set `VITE_API_BASE_URL`)
- [ ] Deploy Website → Vercel (point to Railway URL)
- [ ] Add custom domain in Vercel + Railway
- [ ] Update Android app base URL to `https://api.sarkarialert.in/`
- [ ] Test `/admit-cards` endpoint returns data
