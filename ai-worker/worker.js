/* Queen Tech AI assistant – answers website chat questions with Claude.
   The API key stays here (Cloudflare secret), never in the website code.
   POST /chat  {lang:"en"|"ar", page, history:[...], message}  →  {reply, links:[{t,href}]} */

const KNOWLEDGE = `
You are the assistant on queentechsolution.info for Queen Tech Solutions, a small CCTV, access control and IT company.
Office: Silver Tower, Business Bay, Dubai. Works across Dubai and Abu Dhabi. WhatsApp / phone: +971 55 797 1520. Email: noah@queentechsolution.info.
Services: CCTV cameras (IP, NVR, phone viewing), access control (fingerprint/face terminals, magnetic locks, exit buttons), gate barriers with loop detectors, photocell, QR readers and ANPR, video intercom, office networks and Wi-Fi, PC/laptop/phone repair, software installation, data backup, monthly IT support, gaming PC help.
Free site survey, then a written quote. Customer only pays if they go ahead.
Offers until 1 December 2026: 50% off all installation (e.g. camera installation AED 75 instead of 150, NVR setup AED 75, access control door AED 175 instead of 350, barrier installation AED 600 instead of 1200). Equipment prices change; send people to the instant price page for real numbers.
Gamers: many software problems (game crashes, FPS drops, controller/wheel/sim racing setup, Windows/drivers) are fixed online with AnyDesk (official download anydesk.com/en/downloads; customer sends the AnyDesk address and accepts the connection). Hardware jobs (overheating/thermal paste, no power/no display, new builds, upgrades) via home visit or pick-up in Dubai and Abu Dhabi.
Steam games bought and installed on the customer's own Steam account: Assetto Corsa AED 150 and BeamNG.drive AED 150 including mods (new tracks/maps and cars), Grand Theft Auto V AED 200 (offers until 1 December 2026); any other Steam game = Steam price + AED 50.
Useful pages: /price.html (instant price), /gamers.html (gamers & PC), /help.html (install guides and fixes for CCTV, access control, network, barrier, intercom), /tech.html (technician tools), /bandwidth.html and /boq.html (free tools, need a free account), /contact.html (book a free visit).
Rules:
- Reply in the customer's language (Arabic replies in simple Gulf/Egyptian-friendly Modern Standard Arabic). Keep it short: 2–6 sentences or a short numbered list of steps.
- Troubleshooting: give safe first checks a customer can do. Never tell customers to open 230 V equipment or bypass security systems. Never help reset someone else's device password; only official reset by the owner.
- Never invent prices, opening hours, certifications, brands stocked or delivery times beyond the facts above. If unsure, say our engineer will confirm on WhatsApp.
- Do not discuss unrelated topics; politely steer back to Queen Tech services.
- End with what to do next (a page or WhatsApp).
Return ONLY JSON: {"reply":"...","links":[{"t":"label","href":"/path"}]} with at most 3 links to the pages above.`;

const hits = new Map(); // simple per-IP hourly limit (per worker instance)

export default {
  async fetch(req, env) {
    const origin = req.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGINS || "https://queentechsolution.info,https://www.queentechsolution.info").split(",").map(s => s.trim());
    const cors = {
      "Access-Control-Allow-Origin": allowed.includes(origin) ? origin : allowed[0] || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    };
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    const url = new URL(req.url);
    if (req.method !== "POST" || url.pathname !== "/chat") return new Response("Not found", { status: 404, headers: cors });
    if (origin && !allowed.includes(origin)) return json({ error: "origin" }, 403, cors);
    if (!env.ANTHROPIC_API_KEY) return json({ error: "not configured" }, 503, cors);

    const ip = req.headers.get("CF-Connecting-IP") || "x";
    const hour = Math.floor(Date.now() / 3600000), key = ip + ":" + hour;
    const n = (hits.get(key) || 0) + 1; hits.set(key, n);
    if (hits.size > 5000) hits.clear();
    if (n > Number(env.MAX_PER_HOUR || 30)) return json({ error: "limit" }, 429, cors);

    let body;
    try { body = await req.json(); } catch { return json({ error: "bad json" }, 400, cors); }
    const msg = String(body.message || "").slice(0, 600).trim();
    if (!msg) return json({ error: "empty" }, 400, cors);
    const lang = body.lang === "ar" ? "ar" : "en";
    const history = Array.isArray(body.history) ? body.history.slice(-10).map(h => String(h).slice(0, 400)).join("\n") : "";

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({
        model: env.MODEL || "claude-haiku-5-5",
        max_tokens: 500,
        system: KNOWLEDGE,
        messages: [{ role: "user", content: `Page: ${String(body.page || "/").slice(0, 80)}\nLanguage: ${lang}\nConversation so far:\n${history}\n\nCustomer message: ${msg}` }]
      })
    });
    if (!r.ok) return json({ error: "ai " + r.status }, 502, cors);
    const data = await r.json();
    const text = (data.content || []).filter(c => c.type === "text").map(c => c.text).join("").trim();
    let out;
    try { out = JSON.parse(text.replace(/^```(?:json)?|```$/g, "").trim()); } catch { out = { reply: text, links: [] }; }
    const links = (Array.isArray(out.links) ? out.links : [])
      .filter(l => l && typeof l.href === "string" && /^\/[a-z0-9\-\/.#?=&]*$/i.test(l.href))
      .slice(0, 3).map(l => ({ t: String(l.t || l.href).slice(0, 40), href: l.href }));
    return json({ reply: String(out.reply || "").slice(0, 1500), links }, 200, cors);
  }
};
function json(o, status, headers) {
  return new Response(JSON.stringify(o), { status, headers: { ...headers, "Content-Type": "application/json; charset=utf-8" } });
}
