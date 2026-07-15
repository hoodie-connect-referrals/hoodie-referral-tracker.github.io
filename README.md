# Hoodie Referral Scan Tracker (Vercel + Upstash Redis)

A tiny self-hosted redirect service. Each of your 25 referral links gets a short
tracking URL like:

    https://YOUR-PROJECT.vercel.app/r/gron-laural-romig

Visiting it logs a scan, then instantly forwards to the real referral link. A
live dashboard at `/dashboard.html` shows scan counts per person.

This avoids the problems we hit with the static/GitHub Pages + public counter
API approach: no CORS issues, no third-party counting service that can get
deprecated out from under you. The counting logic runs on your own Vercel
project and talks to your own database directly, server-side.

## What's in here

- `api/r/[slug].js` — the redirect + logging endpoint
- `api/stats.js` — JSON endpoint the dashboard reads from
- `public/dashboard.html` — the scan-count dashboard
- `links.json` — maps each person's slug (e.g. `gron-laural-romig`) to their
  real referral URL
- `vercel.json` — sends `/` straight to the dashboard

## Cost: this stays free

- **Vercel Hobby plan**: free, 100 GB bandwidth/mo, 100 hours of serverless
  execution/mo — this project uses a tiny fraction of that.
- **Upstash Redis free tier**: free, 256 MB storage, 500K commands/month,
  **no credit card required**. You will not be charged unless you
  deliberately upgrade later.
- Note: Vercel's Hobby tier is officially for personal/non-commercial use per
  their terms of service. Since this supports a business referral program,
  it's worth a quick check with whoever handles your company's Vercel/vendor
  decisions on whether that matters for your situation — Pro is $20/month if
  you want to be fully compliant.

## Deploy it (~5-10 minutes)

1. **Push this folder to a GitHub repo** (or upload it directly in Vercel's
   dashboard — "Import Project" also accepts a folder without git).

2. **Import the repo into Vercel** at vercel.com → "Add New… → Project".
   Framework preset: choose "Other" (no build step needed).

3. **Add Upstash Redis** (this is what stores the scan counts — replaces the
   old "Vercel KV" button, which Vercel retired in Dec 2024):
   - In your project, go to the **Storage** tab.
   - Click **Marketplace Database Integrations** (or **Browse Marketplace**).
   - Search for **Upstash**, select **Redis**.
   - When prompted to choose a plan, pick the **Free** tier — it will
     explicitly say no credit card required. Do not enter payment details.
   - Connect it to this project. Vercel automatically adds the
     `KV_REST_API_URL` and `KV_REST_API_TOKEN` environment variables for
     you — same variable names as before, so no code changes are needed.

4. **Deploy.** Vercel will give you a live URL like
   `https://hoodie-referral-tracker.vercel.app`.

5. **Visit `/dashboard.html`** on that URL to see the (empty, for now) scan
   dashboard.

## Once it's live

Send me the live URL and I'll regenerate the final QR codes so they point to
`https://YOUR-PROJECT.vercel.app/r/<slug>` instead of the current links.
From then on, every scan shows up on the dashboard within a few seconds —
no CORS issues, since the redirect page and the counting API are on the
same domain.

## Notes

- If you ever add or remove referral links, just edit `links.json` and
  redeploy — no other code changes needed.
- The redirect endpoint logs a timestamp, user agent, and referrer for each
  scan (kept as the last 1000 events per link) in case you want more detailed
  analysis later — the dashboard currently only shows the running total.
- This has no login on the dashboard by default. If you don't want it
  publicly viewable, let me know and I'll add simple password protection.
