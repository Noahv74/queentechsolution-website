# Queen Tech AI assistant – setup (about 15 minutes, one time)

The chat bubble on the website already works without this: it answers common questions,
walks customers through fixes from the Help centre and sends them to WhatsApp.
This worker adds a real AI brain for free-text questions. The API key stays secret on Cloudflare.

## 1. Get an Anthropic API key
1. Go to https://console.anthropic.com and sign up (use noah@queentechsolution.info).
2. Billing → add a card and a small credit (you set the limit).
3. API keys → Create key → copy it (starts with `sk-ant-`). Keep it private.

## 2. Deploy the worker on Cloudflare (free plan is enough)
1. Sign up at https://dash.cloudflare.com (free).
2. On your computer install Node.js (https://nodejs.org, LTS), then in a terminal:
   ```
   cd ai-worker
   npx wrangler login
   npx wrangler secret put ANTHROPIC_API_KEY      (paste the key)
   npx wrangler deploy
   ```
3. Wrangler prints a URL like `https://queentech-ai.<name>.workers.dev`.

## 3. Switch it on in the website
Send that URL to Claude, or edit `assistant.js` line:
`var AI_ENDPOINT=window.QT_AI_ENDPOINT||"";` → put `"https://queentech-ai.<name>.workers.dev/chat"` in the quotes.

## Safety built in
- Only answers requests from queentechsolution.info.
- 30 messages per hour per visitor (MAX_PER_HOUR in wrangler.toml).
- Knows only Queen Tech facts (in worker.js → KNOWLEDGE). Update prices/offers there when they change.
- If the AI is down or not set up, the site falls back to the built-in assistant automatically.
