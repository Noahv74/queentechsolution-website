BODY = '''
<style>
.stepper{display:flex;align-items:center;border:1px solid var(--line-2);border-radius:4px;overflow:hidden;direction:ltr;width:max-content}
.stepper button{all:unset;width:40px;height:40px;display:grid;place-items:center;cursor:pointer;color:var(--gold);font:700 1.25rem/1 var(--f-mono);background:var(--surface)}
.stepper button:hover{background:var(--surface-2)}
.stepper button:focus-visible{outline:2px solid var(--gold-2);outline-offset:-2px}
.stepper output{min-width:44px;text-align:center;font:700 1.05rem var(--f-mono)}
.qrow{display:flex;justify-content:space-between;align-items:center;gap:14px;padding:10px 0;border-bottom:1px dashed var(--line)}
.qrow:last-child{border-bottom:0}
.qrow b{display:block;font-weight:600}
.qrow small{display:block;color:var(--dim);font-size:.84rem}
.kpis{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:14px 0}
.kpi{border:1px solid var(--line-2);border-radius:8px;padding:12px;background:var(--bg-2)}
.kpi .k{font:500 .64rem var(--f-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
html[lang=ar] .kpi .k{font-family:var(--f-body);letter-spacing:0;font-size:.78rem}
.kpi .v{font:900 1.7rem/1.1 var(--f-display);color:var(--gold);margin-top:4px}
.kpi .s{font-size:.8rem;color:var(--dim)}
.lines{display:grid;gap:0;margin-top:6px}
.ln{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 12px;padding:8px 0;border-bottom:1px dashed var(--line);font-size:.9rem}
.ln span{color:var(--ink)}
.ln small{grid-column:1;color:var(--dim);font-size:.78rem}
.ln b{grid-row:span 2;align-self:center;font-variant-numeric:tabular-nums;white-space:nowrap}
.ln.h{border-bottom:0;padding-top:14px;font:600 .7rem var(--f-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--gold)}
html[lang=ar] .ln.h{font-family:var(--f-body);letter-spacing:0;font-size:.82rem}
.total{display:flex;justify-content:space-between;align-items:baseline;gap:12px;margin-top:14px;padding-top:12px;border-top:1px solid var(--line-2)}
.total b{font:900 2rem/1 var(--f-display);color:var(--gold)}
.hide{display:none!important}
#result.side{position:static}
</style>
  <section class="phead">
    <div class="crumbs"><a href="/">Home</a><span>/</span><a href="/tools.html">Tools &amp; Help</a><span>/</span><span>Access &amp; barrier planner</span></div>
    <span class="tag">Free tool · Dubai · Abu Dhabi</span>
    <h1>Plan your access control <em>and parking barrier.</em></h1>
    <p class="lede">Tell us how many doors and parking lanes you want to control and how people should get in. You'll see the equipment you need and an estimated price with installation, then send the plan to us on WhatsApp.</p>
  </section>

  <section class="sec" id="tool" style="border-bottom:0">
    <div class="bk">
      <div>
        <div class="block">
          <h2><span class="n">1</span>What do you want to control?</h2>
          <p>Choose one or both.</p>
          <div class="opts wide" id="what" role="group" aria-label="What to control">
            <button type="button" class="opt" data-v="doors" aria-pressed="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V3h11v18M3 21h16"/><circle cx="13" cy="12" r=".8"/></svg><b>Doors</b><small>Office, shop, villa or server room doors.</small></button>
            <button type="button" class="opt" data-v="barrier" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V9M2 21h5M4 11h17"/><path d="M8 11l2-2M12 11l2-2M16 11l2-2"/></svg><b>Parking barrier</b><small>Car park, building or compound entrance.</small></button>
            <button type="button" class="opt" data-v="both" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21V5h7v16M14 21V13M12 21h10M14 14h8"/></svg><b>Both</b><small>Doors and parking together.</small></button>
          </div>
        </div>

        <div class="block" id="b-doors">
          <h2><span class="n">2</span>Doors</h2>
          <p>Each door gets a reader outside, a magnetic lock, an exit button inside and an emergency break glass.</p>
          <div class="qrow"><div><b>Number of doors</b><small>Main entrance, office, store room…</small></div><div class="stepper"><button type="button" data-s="doors" data-d="-1" aria-label="Less">−</button><output id="v-doors">1</output><button type="button" data-s="doors" data-d="1" aria-label="More">+</button></div></div>
          <div class="field" style="margin-top:14px"><label>How do people open the door?</label>
            <div class="opts" id="method" role="group" aria-label="Entry method">
              <button type="button" class="opt" data-v="card" aria-pressed="false"><b>Card + PIN</b><small>Cheapest. Cards can be shared or lost.</small></button>
              <button type="button" class="opt" data-v="finger" aria-pressed="true"><b>Fingerprint</b><small>Plus card and PIN. With attendance.</small></button>
              <button type="button" class="opt" data-v="face" aria-pressed="false"><b>Face</b><small>Touch-free and fast. With attendance.</small></button>
            </div>
          </div>
          <div class="qrow"><div><b>People using the doors</b><small>Staff, family or tenants</small></div><div class="stepper"><button type="button" data-s="users" data-d="-10" aria-label="Less">−</button><output id="v-users">20</output><button type="button" data-s="users" data-d="10" aria-label="More">+</button></div></div>
          <label class="tg" style="margin-top:12px;display:inline-flex;gap:8px;align-items:center" id="att-l"><input type="checkbox" id="att" checked> Staff attendance report (time in / time out)</label>
        </div>

        <div class="block hide" id="b-barrier">
          <h2><span class="n">3</span>Parking barrier</h2>
          <p>Each lane gets a 4 m boom barrier, a safety loop in the road and a photocell, so the arm never comes down on a car.</p>
          <div class="qrow"><div><b>Number of lanes</b><small>One lane = one barrier (entry or exit)</small></div><div class="stepper"><button type="button" data-s="lanes" data-d="-1" aria-label="Less">−</button><output id="v-lanes">1</output><button type="button" data-s="lanes" data-d="1" aria-label="More">+</button></div></div>
          <div class="field" style="margin-top:14px"><label>How do cars open it?</label>
            <div class="opts wide" id="open" role="group" aria-label="How cars open the barrier">
              <button type="button" class="opt" data-v="remote" aria-pressed="false"><b>Remote control</b><small>Simple, for a few cars.</small></button>
              <button type="button" class="opt" data-v="uhf" aria-pressed="true"><b>Windshield tag (UHF)</b><small>Opens by itself for residents' and staff cars.</small></button>
              <button type="button" class="opt" data-v="anpr" aria-pressed="false"><b>Number-plate camera (ANPR)</b><small>No tags. Reads the plate and opens.</small></button>
            </div>
          </div>
          <div class="qrow"><div><b>Cars that need access</b><small>For tags and the plate list</small></div><div class="stepper"><button type="button" data-s="cars" data-d="-10" aria-label="Less">−</button><output id="v-cars">30</output><button type="button" data-s="cars" data-d="10" aria-label="More">+</button></div></div>
          <label class="tg" style="margin-top:12px;display:inline-flex;gap:8px;align-items:center"><input type="checkbox" id="qrv"> Visitors open with a QR code</label>
        </div>

        <div class="block">
          <h2><span class="n" id="n-brand">3</span>Brand</h2>
          <p>We install all of them. Prices update from UAE shops.</p>
          <div class="opts" id="brand" role="group" aria-label="Brand">
            <button type="button" class="opt" data-v="zkteco" aria-pressed="true"><b>ZKTeco</b></button>
            <button type="button" class="opt" data-v="hikvision" aria-pressed="false"><b>Hikvision</b></button>
            <button type="button" class="opt" data-v="dahua" aria-pressed="false"><b>Dahua</b></button>
          </div>
        </div>
      </div>

      <aside class="side" id="result" aria-live="polite">
        <div class="block">
          <span class="tag">Your plan</span>
          <div class="kpis">
            <div class="kpi"><div class="k">Doors</div><div class="v" id="k-doors">–</div><div class="s" id="k-doors-s"></div></div>
            <div class="kpi"><div class="k">Barrier lanes</div><div class="v" id="k-lanes">–</div><div class="s" id="k-lanes-s"></div></div>
          </div>
          <div class="lines" id="lines"></div>
          <div class="total"><span>Estimated total</span><b id="tot">–</b></div>
          <p class="fine" id="tot-n">Equipment at the lowest UAE shop prices we found, plus our installation. Cabling over 20 m per door, trenching and civil work are quoted after a free site visit.</p>
          <div class="cta-row" style="margin-top:14px"><a class="btn btn-wa" id="wa" href="#" target="_blank" rel="noopener">Send my plan on WhatsApp</a><a class="btn btn-line" href="/contact.html">Free site visit</a></div>
        </div>
      </aside>
    </div>
  </section>

  <section class="sec">
    <div class="sec-head"><span class="tag">Questions</span><h2>Good to know</h2></div>
    <div class="faq">
      <details><summary>Card, fingerprint or face?</summary><p>Cards are the cheapest but can be shared or lost. Fingerprint stops sharing and gives you an attendance report. Face is touch-free and fastest at busy doors, and works well for offices and clinics.</p></details>
      <details><summary>What happens in a power cut or a fire?</summary><p>Each door has a power supply with a backup battery. Magnetic locks open when power is cut, and the green break glass opens the door at once in an emergency, as fire safety requires.</p></details>
      <details><summary>Tags or number-plate camera for the car park?</summary><p>Windshield tags are cheap per car and very reliable. A number-plate camera needs no tags, so it suits visitors and changing tenants, but the camera costs more.</p></details>
      <details><summary>Can I see who came in from my phone?</summary><p>Yes. Most systems we install have an app or software that shows entries and attendance, and you can add or remove people any time.</p></details>
    </div>
  </section>

  <section class="sec" style="border-bottom:0">
    <div class="cta-box">
      <div><h2>Want the exact price?</h2><p>We visit, check the doors and the road, and give you a fixed quote. The visit is free.</p></div>
      <div class="acts"><a class="btn btn-wa" href="https://wa.me/971557971520?text=Hi%20Queen%20Tech%2C%20I%27d%20like%20a%20free%20site%20visit%20for%20access%20control" target="_blank" rel="noopener">Book a free site visit</a><a class="btn btn-line" href="/access-control-dubai.html">Access control service</a><a class="btn btn-line" href="/gate-barrier-installation.html">Barrier service</a></div>
    </div>
  </section>
'''

SCRIPT = '''
<script src="/plans.js"></script>
<script src="/book.js"></script>
<script>
(function () {
  var B = window.QTB, t = B.t, P = window.QT_PRICES || { items: {}, labour: {} }, I = P.items, LB = P.labour;
  var $ = function (id) { return document.getElementById(id); };
  var S = { doors: 1, users: 20, lanes: 1, cars: 30 };
  var MIN = { doors: 1, users: 5, lanes: 1, cars: 5 }, MAX = { doors: 30, users: 500, lanes: 6, cars: 1000 };
  /* item for the chosen brand; falls back to the cheapest priced one */
  function item(key, brand) {
    var it = I[key]; if (!it) return null;
    var v = it.v[brand]; if (v && v.price) return { label: it.label, model: v.model, price: v.price };
    var best = null; for (var k in it.v) { var x = it.v[k]; if (x.price && (!best || x.price < best.price)) best = x; }
    return best ? { label: it.label, model: best.model, price: best.price } : null;
  }
  function calc() {
    var what = $("what").dataset.value, brand = $("brand").dataset.value;
    var doors = what !== "barrier", bar = what !== "doors";
    $("b-doors").classList.toggle("hide", !doors); $("b-barrier").classList.toggle("hide", !bar);
    $("n-brand").textContent = doors && bar ? "4" : "3";
    var method = $("method").dataset.value, open = $("open").dataset.value;
    $("att-l").classList.toggle("hide", method === "card");
    var L = [], eq = 0, lab = 0;
    function add(group, key, qty, note) { var x = item(key, brand); if (!x || !qty) return; var s = x.price * qty; eq += s; L.push({ g: group, t: t(x.label), m: x.model, q: qty, s: s, n: note }); }
    function work(group, key, qty) { var x = LB[key]; if (!x || !qty) return; var s = x.price * qty; lab += s; L.push({ g: group, t: t(x.name), q: qty, s: s, was: x.was ? x.was * qty : 0 }); }
    if (doors) {
      var d = S.doors;
      add("Doors", method === "card" ? "ac_card" : method === "face" ? "ac_face" : "ac_finger", d);
      add("Doors", "maglock", d); add("Doors", "bracket", d); add("Doors", "exitbtn", d); add("Doors", "breakglass", d);
      add("Doors", "psu", Math.ceil(d / 2));
      if (method === "card" || method === "finger") add("Doors", "cards50", Math.ceil(S.users / 50));
      work("Installation", "door", d);
    }
    if (bar) {
      var n = S.lanes;
      add("Parking", "barrier", n); add("Parking", "photocell", n); add("Parking", "loopdet", n); add("Parking", "loopwire", Math.ceil(n / 2));
      if (open === "remote") add("Parking", "remote", Math.ceil(S.cars / 3) > 3 ? Math.ceil(S.cars / 3) : 1);
      if (open === "uhf") { add("Parking", "uhf", n); add("Parking", "uhf_tag", S.cars); }
      if (open === "anpr") add("Parking", "anpr", n);
      if ($("qrv").checked) add("Parking", "qr", n);
      if (open === "uhf" || $("qrv").checked) add("Parking", "controller", Math.ceil(n / 2));
      work("Installation", "barrier", n); work("Installation", "loop", n);
      if (open === "anpr") work("Installation", "anprset", n);
      if (open === "uhf") work("Installation", "reader", n);
      if ($("qrv").checked) work("Installation", "reader", n);
    }
    var groups = ["Doors", "Parking", "Installation"], h = "";
    groups.forEach(function (g) {
      var rows = L.filter(function (x) { return x.g === g; }); if (!rows.length) return;
      h += '<div class="ln h">' + B.esc(t(g)) + '</div>';
      rows.forEach(function (x) {
        h += '<div class="ln"><span>' + x.q + ' × ' + B.esc(x.t) + '</span><b>' + B.esc(B.aed(x.s)) + '</b>' + (x.m ? '<small>' + B.esc(x.m) + '</small>' : x.was ? '<small><s>' + B.esc(B.aed(x.was)) + '</s> · ' + B.esc(t("50% off installation")) + '</small>' : '<small></small>') + '</div>';
      });
    });
    $("lines").innerHTML = h;
    $("tot").textContent = B.aed(eq + lab);
    $("k-doors").textContent = doors ? S.doors : "–";
    $("k-doors-s").textContent = doors ? t({ card: "Card + PIN", finger: "Fingerprint", face: "Face" }[method]) : "";
    $("k-lanes").textContent = bar ? S.lanes : "–";
    $("k-lanes-s").textContent = bar ? t({ remote: "Remote control", uhf: "Windshield tag (UHF)", anpr: "Number-plate camera (ANPR)" }[open]) : "";
    var msg = [t("Hi Queen Tech, here is my access control plan:")];
    if (doors) msg.push(t("Doors") + ": " + S.doors + " · " + t({ card: "Card + PIN", finger: "Fingerprint", face: "Face" }[method]) + " · " + S.users + " " + t("people") + (method !== "card" && $("att").checked ? " · " + t("with attendance") : ""));
    if (bar) msg.push(t("Barrier lanes") + ": " + S.lanes + " · " + t({ remote: "Remote control", uhf: "Windshield tag (UHF)", anpr: "Number-plate camera (ANPR)" }[open]) + " · " + S.cars + " " + t("cars") + ($("qrv").checked ? " · " + t("QR for visitors") : ""));
    msg.push(t("Brand") + ": " + B.label($("brand"), brand));
    msg.push(t("Estimated total") + ": " + B.aed(eq + lab));
    msg.push(t("Please send me a fixed quote."));
    $("wa").href = B.wa(msg.join("\\n"));
  }
  ["what", "method", "open", "brand"].forEach(function (id) { B.pick($(id), calc); });
  ["att", "qrv"].forEach(function (id) { $(id).addEventListener("change", calc); });
  document.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-s]"); if (!b) return;
    var k = b.dataset.s; S[k] = Math.max(MIN[k], Math.min(MAX[k], S[k] + Number(b.dataset.d)));
    $("v-" + k).textContent = S[k]; calc();
  });
  var q = new URLSearchParams(location.search).get("for");
  if (q === "barrier" || q === "both") { var bt = $("what").querySelector('[data-v="' + q + '"]'); if (bt) bt.click(); }
  calc();
})();
</script>
'''

# prices.js must load before the page script
BODY = BODY
page("access-planner", "Access Control &amp; Parking Barrier Planner with Price | Queen Tech Dubai",
     "Plan door access control (card, fingerprint or face) and parking barriers (remote, UHF tags or number-plate camera) for Dubai and Abu Dhabi. See the equipment and an estimated price with installation.",
     "Access control &amp; barrier planner | Queen Tech Solutions", "Access planner", ("#result", "My plan"), BODY,
     '<script src="/prices.js"></script>' + SCRIPT,
     extra_ar=("price",), ld={"@context": "https://schema.org", "@type": "WebApplication", "name": "Access control and parking barrier planner", "url": "https://queentechsolution.info/access-planner.html", "applicationCategory": "UtilitiesApplication", "operatingSystem": "Any", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "AED"}, "provider": BIZ})
