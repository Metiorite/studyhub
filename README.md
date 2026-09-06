# StudyHub — Deployment Guide

## Structure
```
index.html            <- Hub / portal page (sidebar nav, coaching cards)
hub.css                <- Shared dark theme for hub + coaching landing pages
middleware.js          <- Basic Auth gate (site-wide)
vercel.json
coachings/
  marrow/               <- Marrow Edition 8 Qbank (self-contained app)
    index.html
    theme.css
    data-part1.js
    data-part2.js
  prep-dams/            <- Demo coaching, replace with real files
    index.html          <- landing page listing this coaching's tests
    cerebellum-test-1.html   (demo — replace with real content)
    cerebellum-test-2.html   (demo — replace with real content)
```

## Adding a new coaching
1. Create a folder under `coachings/<name>/`.
2. Add an `index.html` landing page for it — copy `coachings/prep-dams/index.html`
   as a starting point and swap the `<a class="mini-card">` blocks for your tests.
3. Drop in as many test HTML files as you need (each one self-contained, or
   following the same pattern as the Marrow app if it's a full multi-test qbank).
4. Add one entry to the root `index.html` (hero card + list row) pointing at
   `coachings/<name>/index.html`.

Nothing else needs to change — each coaching is independent, so a huge qbank
(like Marrow's data files) never affects the size or load time of another
coaching's pages.

## Replacing the Prep DAMS demo
The two `cerebellum-test-*.html` files are placeholders with 5 dummy MCQs each,
built as a small self-contained quiz engine (see the `<script>` block — just
swap the `QUESTIONS` array for real content, or replace the whole file with
your real exported HTML). Update the card links in
`coachings/prep-dams/index.html` if filenames change.

## Deploy to Vercel

### Option A — Vercel CLI
```bash
npm i -g vercel
cd site
vercel --prod
```

### Option B — GitHub + Vercel dashboard
1. Push this folder to a **private** GitHub repo (each file is under GitHub's
   25MB web-upload limit, so drag-and-drop works too).
2. vercel.com → "Add New Project" → import the repo → Framework preset "Other",
   no build command, output = root.
3. Deploy.

## Password protection
In Vercel → Settings → Environment Variables, set:
- `SITE_USER`
- `SITE_PASSWORD`

Redeploy after adding them — `middleware.js` checks these against Basic Auth
on every request, so the whole site (hub + all coachings) stays private.
