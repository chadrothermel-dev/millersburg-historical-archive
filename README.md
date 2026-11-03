# Historical Society of Millersburg & Upper Paxton Township
### Digital Photo Archive

[![Build and Deploy to GitHub Pages](https://github.com/chadrothermel-dev/millersburg-historical-archive/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/chadrothermel-dev/millersburg-historical-archive/actions/workflows/deploy-pages.yml)

**Live site:** https://chadrothermel-dev.github.io/millersburg-historical-archive/

A searchable photo archive for the **Historical Society of Millersburg & Upper Paxton Township (HSMUPT)**, styled to match the Society's current website at [millersburgpahistory.org](https://www.millersburgpahistory.org): the same cream, navy, gold, maroon, and river-blue palette, Fjalla One and Frank Ruhl Libre type, and the About / Discover / Support / Contact navigation.

> **Demo status:** the six gallery records are **sample entries with stock images**, not items from the Society's collection. Uploads, sign-in, and account creation run entirely in the browser and are not saved anywhere; refreshing the page resets them.

---

## What's on the page

| Section | Contents |
|---|---|
| Hero & mission | Society wordmark, "From the River to the Railroad" intro, four mission pillars |
| By the Numbers | 3 floors of artifacts, 100+ years of newspapers, 20K+ photographs |
| Search the Collection | Keyword search plus category, era, and sort filters |
| Photo Collection | Card grid; click a card for the full scan, metadata table, and keywords |
| History | Timeline from the Paleo-Indian era to the 1898 passenger station |
| Visit the Museum | 330 Center Street, phone, and a link to the official hours page |
| Membership | Student, Individual, Family, and Lifetime tiers (links to the official join page) |
| Upload & Login | Drag-and-drop bulk uploader with batch metadata editor; simulated Entra ID and local sign-in |

Pages the archive doesn't host (Rail Passenger Station, Tour, Events, Donate, Volunteer, and so on) link to the matching page on the official site.

---

## Repository layout

```
millersburg-historical-archive/
├── .github/workflows/deploy-pages.yml   # CI/CD: validate, then deploy to GitHub Pages
├── index.html                           # Page structure, sections, and modals
├── style.css                            # Design system (palette, type, layout, responsive rules)
├── script.js                            # Archive data, search/filter engine, uploader, auth demo
└── README.md
```

No build step and no dependencies: it's plain HTML, CSS, and JavaScript.

---

## Run it locally

```bash
git clone https://github.com/chadrothermel-dev/millersburg-historical-archive.git
cd millersburg-historical-archive
python -m http.server 8085
```

Then open http://localhost:8085.

---

## CI/CD (GitHub Actions + GitHub Pages)

Every push to `master` (or `main`) runs [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml):

1. **Validate**
   - Lints `index.html` with HTMLHint.
   - Syntax-checks `script.js` with `node --check`.
   - Confirms every `getElementById(...)` target in `script.js` exists in `index.html`, so a markup change can't silently break the app.
2. **Deploy**: if validation passes, it publishes the site files to GitHub Pages.

Pull requests run the validation job only, so problems show up before merging. You can also start a deploy by hand from **Actions → Build and Deploy to GitHub Pages → Run workflow**, or with:

```bash
gh workflow run deploy-pages.yml
```

**One-time setup** (already done for this repo): **Settings → Pages → Source: GitHub Actions**, or:

```bash
gh api -X POST repos/chadrothermel-dev/millersburg-historical-archive/pages -f build_type=workflow
```

---

## Next steps toward production

- Replace the sample records in `script.js` with real catalog entries and scans from the Society's collection.
- Store uploads in persistent storage (for example Azure Blob Storage or a GitHub-backed content folder) instead of browser memory.
- Wire the Entra ID button to a real app registration using MSAL.js, with the Pages URL as the redirect URI.

---

## License
MIT. Free for educational, community, and historical preservation use. Society name, history, and membership details are drawn from [millersburgpahistory.org](https://www.millersburgpahistory.org).
