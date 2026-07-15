# Hoodie Connect Referral Scan Tracker

Static, no-backend scan tracker. Two HTML files, no server code, no database
setup. Deploy it on GitHub Pages for free.

## What's in here

- `redirect.html` — every QR code points here (`?to=<slug>`). Logs a scan,
  then instantly forwards to the real referral link.
- `dashboard.html` — shows live scan counts, grouped by client (e.g. Gron).
- `index.html` — just forwards `/` to the dashboard, for convenience.
- `links.json` — reference copy of the name/client/URL mapping (already baked
  into the two HTML files directly — this file is just for your records).

## Step-by-step: get this live on GitHub Pages

### 1. Create the repository
1. Go to **github.com** and log in (or create a free account if you don't
   have one).
2. Click the **+** icon top-right → **New repository**.
3. Name it something like `hoodie-referral-tracker`.
4. Set it to **Public** (required for GitHub Pages on a free account —
   the content isn't sensitive, it's just redirect logic and referral
   links).
5. Leave everything else default, click **Create repository**.

### 2. Upload the files
No command line needed:
1. On your new repo's page, click **"uploading an existing file"** (or
   **Add file → Upload files**).
2. Drag in all four files from this folder: `redirect.html`,
   `dashboard.html`, `index.html`, `links.json`.
3. Scroll down, click **Commit changes**.

*(If you're comfortable with git instead: `git clone` the repo, copy these
files in, then `git add . && git commit -m "Add tracker" && git push`.)*

### 3. Turn on GitHub Pages
1. In your repo, click **Settings** (top tab bar).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a
   branch**.
4. Under **Branch**, choose **main** and folder **/ (root)**. Click **Save**.
5. Wait about a minute, then refresh the page — GitHub will show you the
   live URL, something like:

       https://YOUR-USERNAME.github.io/hoodie-referral-tracker/

### 4. Get your tracked links
Each person's tracked QR destination is:

    https://YOUR-USERNAME.github.io/hoodie-referral-tracker/redirect.html?to=<slug>

For example, Laural Romig's is:

    https://YOUR-USERNAME.github.io/hoodie-referral-tracker/redirect.html?to=gron-laural-romig

### 5. Send me the live URL
Once it's up, send me the `https://YOUR-USERNAME.github.io/...` URL and
I'll regenerate the final QR codes to point through the tracker instead of
the raw referral links. From then on, every scan shows up on
`dashboard.html` within a few seconds.

## Adding another client later

Edit `links.json` for your records, then add the same entries (with a new
`client` value) into the `LINKS` object inside both `redirect.html` and
`dashboard.html`. Commit and push — GitHub Pages redeploys automatically
in under a minute. No code changes needed, just data.

## Notes

- The dashboard has no login/password by default — it's on a public GitHub
  Pages URL. Let me know if you want simple password protection before
  sharing widely.
- Scan counts live on a free public counter service (counterapi.dev), not
  in your GitHub repo — the repo just hosts the redirect/dashboard logic.
