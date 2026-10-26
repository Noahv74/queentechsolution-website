# Queen Tech online payments (Ziina) – setup (about 10 minutes, one time)

Customers pay on Ziina's secure page. This small Cloudflare Worker holds the Ziina API key
and creates the payments, so the key is never in the website code (the site is public on GitHub).

- `/pay.html?repair=QT-XXXX-XXXX` – pays the price saved in FixTrack for that repair (the customer can't change it).
- `/pay.html` → "Invoice or other payment" – the customer types the amount and invoice number.
- FixTrack shows "Pay online by card" once a repair has a price. The repairs admin page has "💳 Send pay link" for WhatsApp.
- Every payment appears in your Ziina app.

## 1. Deploy the worker (free Cloudflare plan is enough)
**Connected to GitHub (current setup):** Workers & Pages → queentech-pay → Settings → Build:
Root directory `/pay-worker`, Deploy command `npx wrangler deploy`, Include paths `pay-worker/*`.
Do NOT use the repo-root `wrangler.jsonc` (that one publishes the whole website as static files).
The key goes in Settings → **Variables and Secrets** (runtime), not in the Build variables box.

**Or from a terminal:**
Use the same Cloudflare account as the AI assistant if you made one. On your computer (Node.js installed):
```
cd pay-worker
npx wrangler login
npx wrangler secret put ZIINA_API_KEY      (paste the Ziina API key, press Enter)
npx wrangler deploy
```
Wrangler prints a URL like `https://queentech-pay.<name>.workers.dev`.

## 2. Switch it on in the website
Send that URL to Claude, or put it in `site-config.js` → `payEndpoint: "https://queentech-pay.<name>.workers.dev"`.
The "Pay online" buttons appear after that.

## 3. Test, then go live
- It starts in **test mode** (`ZIINA_TEST = "true"` in wrangler.toml): pay with any card number, expiry and CVV; no money moves.
  The pay page shows a yellow "TEST MODE" bar.
- To take real payments: change it to `ZIINA_TEST = "false"` and run `npx wrangler deploy` again.

## Safety built in
- Only accepts requests from queentechsolution.info.
- Repair payments use the FixTrack price; invoice payments are limited to AED 2 – 20,000 (MIN_AED / MAX_AED).
- At most 20 payment attempts per visitor per hour (MAX_PER_HOUR).
- The key is a Cloudflare secret. Never paste it into a website file, GitHub, or a chat.
  If the key was ever shared, create a new one in the Ziina app, run `npx wrangler secret put ZIINA_API_KEY` with the new key, and delete the old one in Ziina.
