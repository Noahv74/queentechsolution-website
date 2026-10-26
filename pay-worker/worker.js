/* Queen Tech – online payments with Ziina.
   The Ziina API key is a Cloudflare secret (ZIINA_API_KEY). It is never in the website code.

   POST /pay     {kind:"repair", code:"QT-XXXX-XXXX", lang}             amount = the quote saved in FixTrack (customer can't change it)
                 {kind:"invoice", amount:250, ref:"INV-102", name, lang} amount typed by the customer (MIN_AED..MAX_AED)
                 → {id, redirect_url}
   GET  /status?id=<payment intent id>  → {status, aed, message, test}
   GET  /info                           → {test, min, max}
*/
const API = "https://api-v2.ziina.com/api";
const hits = new Map();

export default {
  async fetch(req, env) {
    const origin = req.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
    const cors = {
      "Access-Control-Allow-Origin": allowed.includes(origin) ? origin : (allowed[0] || "*"),
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    };
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    if (origin && allowed.length && !allowed.includes(origin)) return json({ error: "origin" }, 403, cors);
    if (!env.ZIINA_API_KEY) return json({ error: "not_configured" }, 503, cors);
    const url = new URL(req.url);

    try {
      if (req.method === "GET" && url.pathname === "/info")
        return json({ test: env.ZIINA_TEST !== "false", min: Number(env.MIN_AED || 2), max: Number(env.MAX_AED || 20000) }, 200, cors);
      if (req.method === "GET" && url.pathname === "/status") {
        const id = String(url.searchParams.get("id") || "");
        if (!/^[A-Za-z0-9_-]{6,80}$/.test(id)) return json({ error: "bad_id" }, 400, cors);
        const r = await fetch(`${API}/payment_intent/${encodeURIComponent(id)}`, { headers: { Authorization: "Bearer " + env.ZIINA_API_KEY } });
        const d = await r.json().catch(() => ({}));
        if (!r.ok) return json({ error: "not_found" }, 404, cors);
        return json({ status: d.status, aed: (Number(d.amount) || 0) / 100, message: d.message || "", test: env.ZIINA_TEST !== "false" }, 200, cors);
      }

      if (req.method === "POST" && url.pathname === "/pay") {
        const ip = req.headers.get("CF-Connecting-IP") || "x", key = ip + ":" + Math.floor(Date.now() / 3600000);
        const n = (hits.get(key) || 0) + 1; hits.set(key, n); if (hits.size > 5000) hits.clear();
        if (n > Number(env.MAX_PER_HOUR || 20)) return json({ error: "limit" }, 429, cors);

        const b = await req.json().catch(() => ({}));
        const lang = b.lang === "ar" ? "ar" : "en";
        const min = Number(env.MIN_AED || 2), max = Number(env.MAX_AED || 20000);
        let aed, message, back;

        if (b.kind === "repair") {
          const code = cleanCode(b.code);
          if (!code) return json({ error: "bad_code" }, 400, cors);
          const rep = await getRepair(env, code);
          if (!rep) return json({ error: "no_repair" }, 404, cors);
          if (rep.collected) return json({ error: "already_collected" }, 409, cors);
          aed = Number(String(rep.quote == null ? "" : rep.quote).replace(/[^0-9.]/g, ""));
          if (!(aed >= min)) return json({ error: "no_quote" }, 409, cors);
          message = `Queen Tech · Repair ${code}` + (rep.device ? ` · ${String(rep.device).slice(0, 40)}` : "");
          back = `&repair=${code}`;
        } else if (b.kind === "invoice") {
          aed = Math.round(Number(b.amount) * 100) / 100;
          if (!(aed >= min && aed <= max)) return json({ error: "bad_amount", min, max }, 400, cors);
          const ref = clean(b.ref, 30), name = clean(b.name, 40);
          if (!name) return json({ error: "need_name" }, 400, cors);
          message = `Queen Tech · ${ref ? "Invoice " + ref + " · " : ""}${name}`;
          back = "";
        } else return json({ error: "bad_kind" }, 400, cors);

        const site = env.SITE || "https://queentechsolution.info", l = lang === "ar" ? "&lang=ar" : "";
        const r = await fetch(`${API}/payment_intent`, {
          method: "POST",
          headers: { Authorization: "Bearer " + env.ZIINA_API_KEY, "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Math.round(aed * 100), currency_code: "AED", message: message.slice(0, 120),
            success_url: `${site}/pay.html?ok=1&id={PAYMENT_INTENT_ID}${back}${l}`,
            cancel_url: `${site}/pay.html?cancel=1${back}${l}`,
            failure_url: `${site}/pay.html?fail=1&id={PAYMENT_INTENT_ID}${back}${l}`,
            test: env.ZIINA_TEST !== "false"
          })
        });
        const d = await r.json().catch(() => ({}));
        if (!r.ok || !d.redirect_url) return json({ error: "ziina", detail: (d && (d.message || (d.latest_error && d.latest_error.message))) || r.status }, 502, cors);
        return json({ id: d.id, redirect_url: d.redirect_url, aed }, 200, cors);
      }
    } catch (e) {
      return json({ error: "server" }, 500, cors);
    }
    return new Response("Not found", { status: 404, headers: cors });
  }
};

function json(o, s, h) { return new Response(JSON.stringify(o), { status: s, headers: Object.assign({ "Content-Type": "application/json" }, h) }); }
function clean(v, n) { return String(v || "").replace(/[<>\u0000-\u001f]/g, "").trim().slice(0, n); }
function cleanCode(c) {
  const s = String(c || "").toUpperCase().replace(/[^0-9A-Z]/g, "").replace(/^QT/, "");
  return s.length === 8 ? "QT-" + s.slice(0, 4) + "-" + s.slice(4) : null;
}
/* FixTrack repairs are public by code (Firestore rules: get only), so the worker reads the quote without any key. */
async function getRepair(env, code) {
  const p = env.FIREBASE_PROJECT || "queen-tech";
  const r = await fetch(`https://firestore.googleapis.com/v1/projects/${p}/databases/(default)/documents/repairs/${code}`);
  if (!r.ok) return null;
  const f = (await r.json()).fields || {};
  const v = x => !x ? null : x.stringValue ?? (x.integerValue != null ? Number(x.integerValue) : x.doubleValue ?? x.booleanValue ?? null);
  return { quote: v(f.quote), device: v(f.device), collected: v(f.collected) === true };
}
