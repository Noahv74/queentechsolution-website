# Queen Tech Solutions – queentechsolution.info

The website, published by GitHub Pages from the `main` branch. A change pushed here is live in about a minute.

Page addresses are the file names (for example `services.html` → queentechsolution.info/services.html), so pages stay in the main folder. Moving or renaming a page breaks links that Google and customers already have.

## Folders
| Folder | What's in it |
|---|---|
| `ar/` | Arabic copies of the home, services, tools, contact, service and area pages |
| `i18n/` | Arabic text for every other page (`ar-<page>.js`), plus `i18n.js` in the main folder that switches language |
| `games/` | The arcade: Glitch Run, Crown Heist, Cable Swing |
| `work/` | Photos for the Our work page |
| `icons/` | App icons, shortcuts and Play Store screenshots |
| `images/` | Logo files (not used by the pages) |
| `app/` | The Android app download (APK) |
| `vendor/` | Third-party code kept here (QR code generator, MIT licence) |
| `.well-known/` | Android app link file |
| `android/` | Android app source (Trusted Web Activity) |
| `ai-worker/` | Cloudflare Worker for the AI chat (not part of the site) |
| `dev/` | Tools that build some pages and check the game levels; see `dev/README.md` |

## Main shared files
- `pages.css`, `book.css`, `rtl.css`: styles
- `i18n.js`: language switch, menu, cursor, analytics (GA_ID)
- `search.js`, `assistant.js`, `engage.js`: site search, "Ask us" chat, review pop-up
- `prices.js`: equipment and labour prices · `plans.js`: plan prices (approved: false until approved)
- `site-config.js`: review link, coffee link, ads settings
- `qt-*.js`: accounts and Firebase features (repairs, system cards, reviews, loaners)
- `firestore.rules`: Firebase security rules, paste into Firebase after any change
- `sw.js`: offline support; change VERSION when core files change
- `sitemap.xml`, `robots.txt`: for Google

## Do not delete
`CNAME` (the domain), `.nojekyll`, `ads.txt` (AdSense), `google46f27d87e0d0459d.html` (Search Console).
