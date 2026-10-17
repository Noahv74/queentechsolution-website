# Page generators (not part of the website)

These scripts write some of the site's HTML pages. Edit the content here and run them, instead of editing those HTML files by hand, or the next run will undo hand edits.

Run from the repository root with Python 3:

| Command | Writes |
|---|---|
| `python3 dev/sitegen/build.py` | The 8 service pages + `/ar/` copies (CCTV Dubai/Abu Dhabi, access control, barriers, network, laptop, phone, IT support). Text in `dev/sitegen/content.py`. |
| `python3 dev/sitegen/build_areas.py` | The 6 area pages `cctv-it-support-*.html` + `/ar/` copies. Text in `dev/sitegen/area_content.py`. |
| `python3 dev/gen/gen.py p_express.py p_care.py p_it.py p_wifi.py p_access.py p_system.py p_sysadmin.py` | express, care, it-plans, wifi-check, access-planner, system, systems-admin. One `p_*.py` per page. Arabic text lives in `i18n/ar-<page>.js`. |

Notes
- `dev/sitegen/prices.json` is a snapshot of `prices.js` + `i18n/ar-price.js` used for the price chips' first paint; the live chips update from `prices.js` in the browser.
- Ads: generators do NOT add the AdSense tag (ads stay off pages where customers decide to buy). Ads are only on tools, help, games, gamers and app pages.
- Not built here: index, services, tools, contact (+ /ar/), price, planner, rescue, games, help, track, repairs-admin, boards, account, reviews, reviews-admin, quickswap, quickswap-admin, shop-planner. Edit those files directly.
- robots.txt blocks /dev/.

## Glitch Run level tools (dev/games)
- `node dev/games/solve.js games 12` checks that every level can still be finished with input changing every 0.2 s (prints X + level number for any that fail). Pass level numbers (0-based) at the end to check only some. About 9 s per level.
- `node dev/games/gen.js <copy of games dir> <from> <to> <seed>` adds extra traps to levels and keeps only the ones the solver can still beat; it writes `extra-<from>.json`, which goes into `games/glitch-extra.js`.
- Trap difficulty lives in `HARD` at the top of `games/glitch-engine.js`. After changing it, run the solver on all levels.
