STEPS = [
 ("Walk-through and signal map", "We measure the Wi-Fi signal in every room, corner and floor and mark the dead zones on your floor plan."),
 ("Speed tests", "We test the internet speed at the router and in the rooms you use most, so you can see where the speed drops."),
 ("Interference scan", "We check which channels your neighbours use and what blocks the signal: thick walls, mirrors, metal, other networks."),
 ("Router and line check", "We check your router, the du or e& line, cables and any extenders already in place."),
 ("Your recommended setup", "You get a short report: where to put access points or mesh units, which cables are needed, and a fixed price to do it."),
]
ST = "".join("<li><b>%s</b><span>%s</span></li>" % s for s in STEPS)

BODY = '''
  <section class="phead">
    <div class="crumbs"><a href="/">Home</a><span>/</span><a href="/services.html">Services</a><span>/</span><span>Wi-Fi Checkup</span></div>
    <span class="tag">Wi-Fi survey · Homes · Offices · Dubai · Abu Dhabi</span>
    <h1>Wi-Fi Checkup: <em>find the dead zones, fix them once.</em></h1>
    <p class="lede">Slow Wi-Fi in the bedroom, the meeting room or the back of the shop? We visit, measure the signal in every room and give you a clear plan to fix it, instead of guessing with more extenders.</p>
    <div class="cta-row"><a class="btn btn-gold" href="#quiz">Check my Wi-Fi (1 min)</a><a class="btn btn-line" href="#book">Book a checkup</a><a class="btn btn-line" href="#sizes">See prices</a></div>
  </section>

  <section class="sec" id="quiz">
    <style>
      .qz{display:grid;gap:14px}.qz .qbar{height:6px;border-radius:99px;background:var(--line);overflow:hidden}.qz .qbar i{display:block;height:100%;background:var(--gold);transition:width .25s}
      .qz .qq{font:700 1.15rem var(--f-body)}.qz .qh{color:var(--muted);font-size:.9rem;margin-top:-8px}
      .qz .qopts{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px}
      .qz .qnav{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
      .qres{display:grid;gap:10px}.qres .rec{display:grid;grid-template-columns:auto 1fr;gap:4px 12px;align-items:start;border:1px solid var(--line-2);border-radius:8px;padding:12px 14px;background:var(--bg-2)}
      .qres .rec .ic{font-size:1.5rem;grid-row:span 2}.qres .rec b{font-size:1rem}.qres .rec span{color:var(--muted);font-size:.92rem;line-height:1.5}
      .qres .rec.top{border-color:var(--gold);box-shadow:0 0 0 1px var(--gold) inset}
      .qres .sum{font-size:1.05rem}.qres .sum b{color:var(--gold-2)}
    </style>
    <div class="sec-head"><span class="tag">Free · 1 minute</span><h2>Wi-Fi dead-zone check</h2><p>Answer 6 quick questions and get a first idea of what's wrong and how to fix it, before anyone visits.</p></div>
    <div class="block qz" id="qz" translate="no"></div>
  </section>

  <section class="sec">
    <div class="sec-head"><span class="tag">On the visit</span><h2>What we do</h2></div>
    <ol class="steps">''' + ST + '''</ol>
  </section>

  <section class="sec" id="sizes">
    <div class="sec-head"><span class="tag">Prices</span><h2>One visit, priced by size</h2><p id="ded">If you go ahead with the work, the checkup fee is taken off the installation price.</p></div>
    <div class="tiers" id="tiers"></div>
  </section>

  <section class="sec" id="book" style="border-bottom:0">
    <div class="bk">
      <form class="block" id="f" novalidate>
        <h2><span class="n">1</span>Your place</h2>
        <p>We confirm the visit time and price on WhatsApp.</p>
        <div class="field"><label>Size</label><div class="opts wide" id="size" role="group" aria-label="Size"></div></div>
        <div class="two">
          <div class="field"><label for="prop">Property</label><select id="prop"><option>Apartment</option><option>Villa</option><option>Office</option><option>Shop or restaurant</option><option>Warehouse</option><option>Hotel or building</option></select></div>
          <div class="field"><label for="floors">Floors</label><select id="floors"><option>1</option><option>2</option><option>3</option><option>4 or more</option></select></div>
        </div>
        <div class="field"><label>What's wrong?</label><div class="tags" id="prob">
          <button type="button" class="tg" data-v="1" aria-pressed="false">Dead zones</button>
          <button type="button" class="tg" data-v="2" aria-pressed="false">Slow speed</button>
          <button type="button" class="tg" data-v="3" aria-pressed="false">Keeps dropping</button>
          <button type="button" class="tg" data-v="4" aria-pressed="false">Too many devices</button>
          <button type="button" class="tg" data-v="5" aria-pressed="false">Video calls freeze</button>
          <button type="button" class="tg" data-v="6" aria-pressed="false">CCTV goes offline</button>
          <button type="button" class="tg" data-v="7" aria-pressed="false">Extenders don't help</button>
          <button type="button" class="tg" data-v="8" aria-pressed="false">Guest Wi-Fi needed</button>
        </div></div>
        <div class="two">
          <div class="field"><label for="isp">Internet provider</label><select id="isp"><option>du</option><option>e&amp; (Etisalat)</option><option>Other</option><option>I don't know</option></select></div>
          <div class="field"><label for="when">Preferred visit</label><select id="when"><option>As soon as possible</option><option>This week</option><option>Weekend</option><option>Next week</option></select></div>
        </div>
        <h2 style="margin-top:20px"><span class="n">2</span>Your details</h2>
        <div class="two">
          <div class="field"><label for="name">Your name</label><input id="name" maxlength="70" autocomplete="name"></div>
          <div class="field"><label for="phone">Mobile / WhatsApp</label><input id="phone" type="tel" maxlength="25" autocomplete="tel" placeholder="05X XXX XXXX"></div>
        </div>
        <div class="field"><label for="area">Area</label><input id="area" maxlength="75" placeholder="e.g. Dubai Hills, JVC, Al Reem Island"></div>
        <button class="btn btn-wa submit" type="submit">Send on WhatsApp</button>
        <div class="err" id="err" role="alert"></div>
      </form>
      <aside class="side">
        <div class="block">
          <h2>Quick fixes to try first</h2>
          <ul class="promise">
            <li><span><b>Restart the router</b> and any extenders.</span></li>
            <li><span><b>Move the router</b> out of cupboards and away from the TV.</span></li>
            <li><span><b>Use 5 GHz</b> near the router and 2.4 GHz far away.</span></li>
            <li><span><b>Test with a cable.</b> If it's slow on a cable too, the problem is the line, not the Wi-Fi.</span></li>
          </ul>
        </div>
        <div class="block">
          <h2>Check your speed needs</h2>
          <p class="note">See how much internet your cameras and devices use with our free calculator.</p>
          <div class="cta-row" style="margin-top:12px"><a class="btn btn-line" href="/bandwidth.html">Bandwidth calculator</a><a class="btn btn-line" href="/network-wifi-installation-dubai.html">Wi-Fi installation</a></div>
        </div>
      </aside>
    </div>
  </section>

  <section class="sec">
    <div class="sec-head"><span class="tag">Questions</span><h2>Good to know</h2></div>
    <div class="faq">
      <details><summary>How long is the visit?</summary><p>About 1 hour for an apartment and 2 to 3 hours for a large villa or office floor. You get the report the same day.</p></details>
      <details><summary>Do I have to use you for the installation?</summary><p>No. The report is yours to keep. If you do use us, the checkup fee comes off the installation price.</p></details>
      <details><summary>Will you just tell me to buy an expensive system?</summary><p>No. Often moving the router, changing a channel or adding one cable fixes it. We recommend the simplest setup that covers your space.</p></details>
      <details><summary>Can you fix it on the same visit?</summary><p>Small fixes like router settings and channels, yes. If you need new access points or cabling, we quote first and come back with the equipment.</p></details>
    </div>
  </section>
'''

SCRIPT = '''
<script src="/plans.js"></script>
<script src="/book.js"></script>
<script>
(function () {
  var B = window.QTB, t = B.t, P = B.plans;
  var $ = function (id) { return document.getElementById(id); };
  var NAMES = {
    small: ["Small", "Apartment, small office or shop", ["Up to 3 rooms or about 1,500 sq ft", "Signal map and speed tests", "Router settings fixed on the spot", "Written recommendation"]],
    medium: ["Medium", "Villa or office up to about 3,000 sq ft", ["Up to 2 floors", "Signal map for every room", "Interference and channel scan", "Recommended setup with a fixed price"]],
    large: ["Large", "Large villa, office floor or warehouse", ["3 floors or more, or open spaces", "Full signal map and floor plan", "Access point positions marked", "Cabling plan and fixed price"]]
  };
  var tiers = P.wifi || [];
  $("tiers").innerHTML = tiers.map(function (p, i) {
    var n = NAMES[p.id] || [p.id, "", []], pr = B.price(p.price);
    return '<div class="tier' + (i === 1 ? " feat" : "") + '">' + (i === 1 ? '<span class="badge">' + B.esc(t("Most booked")) + '</span>' : "") +
      '<h3>' + B.esc(t(n[0])) + '</h3><p class="for">' + B.esc(t(n[1])) + '</p>' +
      (pr ? '<div class="amt">' + B.esc(B.aed(p.price)) + '<small>' + B.esc(t("one visit")) + '</small></div>' : '<div class="amt ask">' + B.esc(t("Price on request")) + '</div>') +
      '<ul>' + n[2].map(function (x) { return "<li><span>" + B.esc(t(x)) + "</span></li>"; }).join("") + '<li><span>' + B.esc(t("Fee taken off the installation")) + '</span></li></ul>' +
      '<a class="btn ' + (i === 1 ? "btn-gold" : "btn-line") + '" href="#book" data-size="' + p.id + '">' + B.esc(t("Book")) + " " + B.esc(t(n[0])) + '</a></div>';
  }).join("");
  $("size").innerHTML = tiers.map(function (p, i) {
    var n = NAMES[p.id] || [p.id, ""], pr = B.price(p.price);
    return '<button type="button" class="opt" data-v="' + p.id + '" aria-pressed="' + (i === 0 ? "true" : "false") + '"><b>' + B.esc(t(n[0])) + '</b><small>' + B.esc(t(n[1])) + '</small>' + (pr ? '<span class="pr">' + B.esc(pr) + '</span>' : "") + '</button>';
  }).join("");
  B.pick($("size"));
  $("tiers").addEventListener("click", function (e) { var a = e.target.closest("a[data-size]"); if (!a) return; var b = $("size").querySelector('[data-v="' + a.dataset.size + '"]'); if (b) b.click(); });
  $("prop").addEventListener("change", function () {
    var v = $("prop").selectedIndex, map = ["small", "medium", "medium", "small", "large", "large"];
    var b = $("size").querySelector('[data-v="' + map[v] + '"]'); if (b) b.click();
  });
  B.multi($("prob"));
  $("f").addEventListener("submit", function (e) {
    e.preventDefault(); $("err").textContent = "";
    if (B.need([$("name"), $("phone")])) { $("err").textContent = t("Please fill in the highlighted fields."); return; }
    var pr = B.labels($("prob"));
    var L = [
      t("Hi Queen Tech, I'd like to book a Wi-Fi Checkup."),
      t("Size") + ": " + B.label($("size"), $("size").dataset.value),
      t("Property") + ": " + B.sel($("prop")) + " · " + t("Floors") + ": " + B.sel($("floors")),
      pr.length ? t("Problem") + ": " + pr.join(", ") : "",
      t("Internet") + ": " + B.sel($("isp")),
      t("Visit") + ": " + B.sel($("when")),
      t("Name") + ": " + $("name").value.trim(),
      t("Phone") + ": " + $("phone").value.trim(),
      $("area").value.trim() ? t("Area") + ": " + $("area").value.trim() : ""
    ].filter(Boolean);
    if (window.qtTrack) qtTrack("lead_form", { form: "wifi_check" });
    window.open(B.wa(L.join("\\n")), "_blank", "noopener");
  });
})();
</script>
<script>
/* Wi-Fi dead-zone check: 6 questions → recommendations → pre-fills the booking form */
(function () {
  var B = window.QTB, t = B ? B.t : function (s) { return s; }, box = document.getElementById("qz"); if (!box) return;
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var Q = [
    { id: "prop", q: "What kind of place is it?", o: [["apt", "Apartment"], ["villa", "Villa or townhouse"], ["office", "Office"], ["shop", "Shop or restaurant"], ["wh", "Warehouse or large hall"]] },
    { id: "size", q: "How big is it?", o: [["s", "Up to 3 rooms, 1 floor"], ["m", "4–6 rooms or a big open floor"], ["two", "2 floors"], ["three", "3 floors or more"]] },
    { id: "where", q: "Where is the Wi-Fi weak?", h: "Pick all that apply.", multi: true, o: [["far", "Rooms far from the router"], ["floor", "On another floor"], ["out", "Garden, roof or majlis outside"], ["meet", "Meeting room or back office"], ["all", "Everywhere, even next to the router"], ["drop", "It works, then drops for no reason"]] },
    { id: "router", q: "Where is the main router?", o: [["mid", "In the middle of the place"], ["hide", "In a cupboard, corner or behind the TV"], ["other", "On a different floor"], ["dk", "I'm not sure"]] },
    { id: "use", q: "What do you use it for?", h: "Pick all that apply.", multi: true, o: [["calls", "Video calls and work"], ["tv", "Streaming and TVs"], ["game", "Gaming"], ["cctv", "CCTV cameras"], ["many", "20+ devices or staff"], ["smart", "Smart home devices"]] },
    { id: "now", q: "What's installed now?", o: [["isp", "Only the du / e& router"], ["ext", "Plug-in extenders or repeaters"], ["mesh", "A mesh system"], ["ap", "Access points with cables"]] }
  ];
  var A = {}, step = 0;
  function has(id, v) { var a = A[id]; return Array.isArray(a) ? a.indexOf(v) > -1 : a === v; }
  function draw() {
    if (step >= Q.length) return result();
    var q = Q[step], sel = A[q.id] || (q.multi ? [] : null);
    box.innerHTML = '<div class="qbar"><i style="width:' + Math.round(step / Q.length * 100) + '%"></i></div>' +
      '<div class="qq">' + (step + 1) + ' / ' + Q.length + ' · ' + esc(t(q.q)) + '</div>' + (q.h ? '<div class="qh">' + esc(t(q.h)) + '</div>' : '') +
      '<div class="qopts">' + q.o.map(function (o) { var on = q.multi ? sel.indexOf(o[0]) > -1 : sel === o[0]; return '<button type="button" class="opt" data-v="' + o[0] + '" aria-pressed="' + on + '"><b>' + esc(t(o[1])) + '</b></button>'; }).join("") + '</div>' +
      '<div class="qnav">' + (step ? '<button type="button" class="btn btn-line" data-q="back">' + esc(t("Back")) + '</button>' : '') +
      (q.multi ? '<button type="button" class="btn btn-gold" data-q="next"' + (sel.length ? '' : ' disabled') + '>' + esc(t("Next")) + '</button>' : '') + '</div>';
  }
  box.addEventListener("click", function (e) {
    var b = e.target.closest("[data-v]"), n = e.target.closest("[data-q]");
    if (b && step < Q.length) {
      var q = Q[step], v = b.getAttribute("data-v");
      if (q.multi) { var a = A[q.id] = A[q.id] || []; var i = a.indexOf(v); if (i > -1) a.splice(i, 1); else { if (v === "all") a.length = 0; else { var j = a.indexOf("all"); if (j > -1) a.splice(j, 1); } a.push(v); } draw(); }
      else { A[q.id] = v; step++; draw(); }
      return;
    }
    if (n) { var k = n.getAttribute("data-q"); if (k === "back") { step = Math.max(0, step - 1); draw(); } else if (k === "next") { step++; draw(); } else if (k === "again") { A = {}; step = 0; draw(); } else if (k === "book") prefill(); }
  });
  function recs() {
    var R = [], big = has("size", "two") || has("size", "three") || has("prop", "villa") || has("prop", "wh");
    var units = has("size", "three") ? "4–6" : has("size", "two") ? "3–4" : has("size", "m") ? "2–3" : "1–2";
    if (has("prop", "office") && has("use", "many")) units = has("size", "s") ? "2–3" : "3–6";
    if (has("where", "all")) R.push([1, "📡", "Your line or router may be the problem", "If it's slow even next to the router, test with a cable. If it's slow on a cable too, the issue is the internet line or plan (du / e&), not the Wi-Fi. We check the line and router on the visit."]);
    if (has("router", "hide")) R.push([2, "📦", "Move the router out of the cupboard", "Cupboards, corners and TV cabinets block a lot of signal. Moving the router to a central, open spot often fixes weak rooms for free."]);
    if (has("router", "other") || has("where", "floor")) R.push([2, "🏢", "Each floor needs its own Wi-Fi point", "Concrete floors in the UAE block most of the signal. Put one access point or mesh unit on every floor, ideally connected by cable."]);
    if (has("now", "ext")) R.push([2, "🔁", "Replace the extenders with mesh or cabled access points", "Plug-in extenders usually cut the speed in half and make devices jump between networks. A mesh system or cabled access points give one network with full speed."]);
    if (has("where", "far") || has("where", "meet") || big) R.push([3, "📶", "About " + units + " access points or mesh units", "For this size of place, plan on roughly " + units + " units placed where you use Wi-Fi most. A signal map on the visit gives the exact number and positions."]);
    if (has("where", "out")) R.push([3, "🌴", "An outdoor access point for the garden or majlis", "Indoor Wi-Fi rarely reaches outside through walls and glass. A weatherproof outdoor access point covers the garden, roof or majlis."]);
    if (has("where", "drop")) R.push([3, "📻", "Fix channel interference", "Random drops are often caused by neighbours' networks on the same channel. We scan the area and set clean channels; often this is fixed on the spot."]);
    if (has("use", "game") || has("use", "calls")) R.push([4, "🔌", "Use a cable for the desk, console or meeting room", "For gaming and video calls a network cable is always more stable than Wi-Fi. We can add a network point where you need it."]);
    if (has("use", "cctv")) R.push([4, "📹", "Keep CCTV off the Wi-Fi", "Wi-Fi cameras use a lot of upload and drop often. Wired PoE cameras on their own network are far more reliable."]);
    if (has("use", "many") || has("prop", "office") || has("prop", "shop")) R.push([4, "👥", "Separate staff and guest Wi-Fi", "A separate guest network keeps visitors away from your computers, printers and cameras, and keeps the staff network fast."]);
    if (!R.length) R.push([5, "✅", "Your setup sounds close", "A quick visit to check router settings and channels may be all you need."]);
    R.sort(function (a, b) { return a[0] - b[0]; });
    return { list: R, size: (has("size", "three") || has("prop", "wh")) ? "large" : (has("size", "two") || has("size", "m") || has("prop", "villa") || has("prop", "office")) ? "medium" : "small" };
  }
  var NAME = { small: "Small", medium: "Medium", large: "Large" };
  function result() {
    var r = recs();
    box.innerHTML = '<div class="qbar"><i style="width:100%"></i></div><div class="qres">' +
      '<p class="sum">' + esc(t("Most likely fix")) + ': <b>' + esc(t(r.list[0][2]).replace(/^About /, "")) + '</b></p>' +
      r.list.map(function (x, i) { return '<div class="rec' + (i ? "" : " top") + '"><span class="ic">' + x[1] + '</span><b>' + esc(t(x[2])) + '</b><span>' + esc(t(x[3])) + '</span></div>'; }).join("") +
      '<p class="note">' + esc(t("Suggested visit")) + ': <b>' + esc(t(NAME[r.size])) + '</b>. ' + esc(t("A first idea only: the signal map on the visit shows the real dead zones.")) + '</p>' +
      '<div class="qnav"><button type="button" class="btn btn-gold" data-q="book">' + esc(t("Book this checkup")) + '</button><button type="button" class="btn btn-line" data-q="again">' + esc(t("Start again")) + '</button></div></div>';
    box.dataset.size = r.size;
  }
  function prefill() {
    var size = box.dataset.size || "small", sb = document.querySelector('#size [data-v="' + size + '"]'); if (sb) sb.click();
    var prop = { apt: 0, villa: 1, office: 2, shop: 3, wh: 4 }[A.prop], ps = document.getElementById("prop"); if (ps && prop != null) ps.selectedIndex = prop;
    var fl = document.getElementById("floors"); if (fl) fl.selectedIndex = has("size", "three") ? 2 : has("size", "two") ? 1 : 0;
    var map = { far: 1, floor: 1, out: 1, meet: 1, all: 2, drop: 3 }, tags = {};
    (A.where || []).forEach(function (w) { if (map[w]) tags[map[w]] = 1; });
    if (has("use", "many")) tags[4] = 1; if (has("use", "calls")) tags[5] = 1; if (has("use", "cctv")) tags[6] = 1; if (has("now", "ext")) tags[7] = 1;
    document.querySelectorAll("#prob [data-v]").forEach(function (b) { var want = !!tags[b.getAttribute("data-v")]; if ((b.getAttribute("aria-pressed") === "true") !== want) b.click(); });
    if (window.qtTrack) qtTrack("lead_form", { form: "wifi_quiz" });
    document.getElementById("book").scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(function () { var n = document.getElementById("name"); if (n) n.focus({ preventScroll: true }); }, 600);
  }
  draw();
})();
</script>
'''

page("wifi-check", "Wi-Fi Checkup: Find Dead Zones &amp; Fix Slow Wi-Fi in Dubai | Queen Tech",
     "Book a Wi-Fi survey in Dubai or Abu Dhabi. We map the signal in every room, find dead zones and interference, and give you a recommended setup with a fixed price.",
     "Wi-Fi Checkup | Queen Tech Solutions", "Wi-Fi Checkup", ("#book", "Book a checkup"), BODY, SCRIPT,
     ld=ld_service("Wi-Fi Checkup", "On-site Wi-Fi survey: signal map, speed tests, interference scan and a recommended setup with a fixed price.", "wifi-check", {"serviceType": "Wi-Fi site survey"}))
