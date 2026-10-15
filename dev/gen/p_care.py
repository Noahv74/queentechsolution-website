ICN = {
 "cam": '<path d="M3 7h11l3 3v4l-3 3H3z"/><circle cx="8.5" cy="12" r="2.5"/><path d="M17 10l4-2v8l-4-2"/>',
 "nvr": '<rect x="3" y="7" width="18" height="10" rx="1.5"/><path d="M7 12h.01M10 12h.01M15 12h3"/>',
 "cable": '<path d="M4 20c0-6 4-6 8-8s8-2 8-8"/><path d="M2 20h4M18 4h4"/>',
 "phone": '<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M10 7h4M11 18.5h2"/>',
}
CHECKS = [
 ("cam", "Cameras", ["Clean the lens and housing", "Check focus, angle and night vision", "Check for water, dust or spider webs", "Re-aim any camera that moved"]),
 ("nvr", "Recorder (NVR / DVR)", ["Hard-disk health and free space", "Confirm how many days are recorded", "Correct date and time on footage", "Firmware update when it's safe"]),
 ("cable", "Cabling and power", ["Connectors, joints and cable runs", "PoE switch and power supplies", "UPS battery test if you have one", "Fix loose or damaged cables found"]),
 ("phone", "Remote viewing", ["App working on your phones", "Add or remove users", "Change weak or default passwords", "Test alerts and playback"]),
]
CK = "".join('<div class="card"><h3><svg viewBox="0 0 24 24" aria-hidden="true">%s</svg>%s</h3><ul>%s</ul></div>' % (ICN[k], h, "".join("<li>%s</li>" % x for x in items)) for k, h, items in CHECKS)

BODY = '''
  <section class="phead">
    <div class="crumbs"><a href="/">Home</a><span>/</span><a href="/services.html">Services</a><span>/</span><span>CCTV Care Plan</span></div>
    <span class="tag">CCTV maintenance · Dubai · Abu Dhabi</span>
    <h1>CCTV Care Plan: <em>cameras that keep recording.</em></h1>
    <p class="lede">Most camera problems are found only after something happens and the footage is missing. With a Care Plan we visit on a fixed schedule and check every camera, the recorder, the cabling and the app on your phone, so it works when you need it.</p>
    <div class="cta-row"><a class="btn btn-gold" href="#plans">See the plans</a><a class="btn btn-line" href="#book">Schedule the first visit</a></div>
  </section>

  <section class="sec">
    <div class="sec-head"><span class="tag">Every visit</span><h2>What we check</h2><p>A full checklist on every visit. You get a short report on WhatsApp after each one, with photos of anything that needs attention.</p></div>
    <div class="checks">''' + CK + '''</div>
  </section>

  <section class="sec" id="plans">
    <div class="sec-head"><span class="tag">Plans</span><h2>Pick your plan</h2><p>Yearly plans for homes, shops, offices and buildings. Works with Hikvision, Dahua, Uniview and most other brands, even if we didn't install the system.</p></div>
    <div class="tiers" id="tiers"></div>
    <p class="fine" id="tiers-n">Parts like hard disks, cameras or power supplies are quoted separately before we fit them. Care Plan customers get 10% off parts.</p>
  </section>

  <section class="sec" id="book" style="border-bottom:0">
    <div class="bk">
      <form class="block" id="f" novalidate>
        <h2><span class="n">1</span>Schedule your visits</h2>
        <p>Tell us about your system. We confirm the plan, the price and the first visit date on WhatsApp.</p>
        <div class="field"><label>Plan</label><div class="opts" id="plan" role="group" aria-label="Plan"></div></div>
        <div class="two">
          <div class="field"><label for="cams">Number of cameras</label><input id="cams" type="number" min="1" max="200" value="8" inputmode="numeric"></div>
          <div class="field"><label for="brand">System brand</label><select id="brand"><option>Hikvision</option><option>Dahua</option><option>Uniview</option><option>Other brand</option><option>I don't know</option></select></div>
        </div>
        <div class="two">
          <div class="field"><label for="prop">Property</label><select id="prop"><option>Villa</option><option>Apartment</option><option>Shop</option><option>Restaurant or café</option><option>Office</option><option>Warehouse</option><option>Building</option></select></div>
          <div class="field"><label for="first">First visit</label><select id="first"><option>As soon as possible</option><option>This week</option><option>Next week</option><option>Next month</option></select></div>
        </div>
        <div class="field"><label>Any problems right now?</label><div class="tags" id="now">
          <button type="button" class="tg" data-v="1" aria-pressed="false">A camera is offline</button>
          <button type="button" class="tg" data-v="2" aria-pressed="false">Blurry or dark picture</button>
          <button type="button" class="tg" data-v="3" aria-pressed="false">Not recording enough days</button>
          <button type="button" class="tg" data-v="4" aria-pressed="false">App not working</button>
          <button type="button" class="tg" data-v="5" aria-pressed="false">Forgot the password</button>
          <button type="button" class="tg" data-v="6" aria-pressed="false">All working</button>
        </div></div>
        <h2 style="margin-top:20px"><span class="n">2</span>Your details</h2>
        <div class="two">
          <div class="field"><label for="name">Your name</label><input id="name" maxlength="70" autocomplete="name"></div>
          <div class="field"><label for="phone">Mobile / WhatsApp</label><input id="phone" type="tel" maxlength="25" autocomplete="tel" placeholder="05X XXX XXXX"></div>
        </div>
        <div class="field"><label for="area">Area</label><input id="area" maxlength="75" placeholder="e.g. Business Bay, Al Barsha, Khalifa City"></div>
        <button class="btn btn-wa submit" type="submit">Send on WhatsApp</button>
        <div class="err" id="err" role="alert"></div>
      </form>
      <aside class="side">
        <div class="block">
          <h2>Why a Care Plan</h2>
          <ul class="promise">
            <li><span><b>Visits on a schedule.</b> We remind you a few days before each one.</span></li>
            <li><span><b>A report after every visit</b> with photos, so you know it's done.</span></li>
            <li><span><b>Priority when something breaks.</b> Plan customers come first.</span></li>
            <li><span><b>10% off parts</b> like hard disks and cameras.</span></li>
            <li><span><b>Any brand</b>, even if we didn't install it.</span></li>
          </ul>
        </div>
        <div class="block">
          <h2>Not sure about your system?</h2>
          <p class="note">Book a one-time health check first, or use our free tools to plan cameras and storage.</p>
          <div class="cta-row" style="margin-top:12px"><a class="btn btn-line" href="/planner.html">Camera planner</a><a class="btn btn-line" href="/bandwidth.html">Storage calculator</a></div>
        </div>
      </aside>
    </div>
  </section>

  <section class="sec">
    <div class="sec-head"><span class="tag">Questions</span><h2>Good to know</h2></div>
    <div class="faq">
      <details><summary>Do you maintain systems you didn't install?</summary><p>Yes. On the first visit we check the whole system and tell you if anything needs fixing before the plan starts. You need the recorder's admin password, or we can help you reset it.</p></details>
      <details><summary>What if a camera breaks between visits?</summary><p>Message us. Care Plan customers get priority visits. If a part needs replacing, we send you the price first and you get 10% off.</p></details>
      <details><summary>I have more cameras than the plan covers.</summary><p>Every plan can take extra cameras for a small fee per camera per year. For large buildings and compounds we make a custom plan.</p></details>
      <details><summary>Can I pay monthly?</summary><p>Plans are yearly. For businesses we can split the payment into quarters.</p></details>
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
  var NAMES = { home: ["Home Care", "Apartments and villas"], standard: ["Standard", "Villas, shops and restaurants"], business: ["Business", "Offices, warehouses and buildings"] };
  var tiers = P.care || [];
  $("tiers").innerHTML = tiers.map(function (p) {
    var n = NAMES[p.id] || [p.id, ""], pr = B.price(p.price, "per year");
    var li = [
      "<b>" + t("Up to") + " " + p.cams + "</b> " + t("cameras"),
      "<b>" + p.visits + " " + t("visits") + "</b> " + t("a year") + " (" + t(p.visits >= 4 ? "every 3 months" : "every 6 months") + ")",
      t("Full checklist and report after each visit"),
      t("Remote help on WhatsApp"),
      t("10% off parts"),
      p.priority ? "<b>" + t("Same-day response") + "</b> " + t("for faults") : t("Priority booking for faults"),
      P.approved ? t("Extra camera") + ": " + B.aed(p.extraCam) + " " + t("per year") : t("Extra cameras can be added")
    ];
    return '<div class="tier' + (p.featured ? " feat" : "") + '">' + (p.featured ? '<span class="badge">' + B.esc(t("Most popular")) + '</span>' : "") +
      '<h3>' + B.esc(t(n[0])) + '</h3><p class="for">' + B.esc(t(n[1])) + '</p>' +
      (pr ? '<div class="amt">' + B.esc(B.aed(p.price)) + '<small>' + B.esc(t("per year")) + '</small></div>' : '<div class="amt ask">' + B.esc(t("Price on request")) + '</div>') +
      '<ul>' + li.map(function (x) { return "<li><span>" + x + "</span></li>"; }).join("") + '</ul>' +
      '<a class="btn ' + (p.featured ? "btn-gold" : "btn-line") + '" href="#book" data-plan="' + p.id + '">' + B.esc(t("Choose")) + " " + B.esc(t(n[0])) + '</a></div>';
  }).join("");
  $("plan").innerHTML = tiers.map(function (p) {
    var n = NAMES[p.id] || [p.id, ""];
    return '<button type="button" class="opt" data-v="' + p.id + '" aria-pressed="' + (p.featured ? "true" : "false") + '"><b>' + B.esc(t(n[0])) + '</b><small>' + B.esc(t("Up to") + " " + p.cams + " " + t("cameras")) + '</small></button>';
  }).join("") + '<button type="button" class="opt" data-v="custom" aria-pressed="false"><b>' + B.esc(t("Custom")) + '</b><small>' + B.esc(t("More than 16 cameras")) + '</small></button>';
  B.pick($("plan"), function (v) { var p = tiers.filter(function (x) { return x.id === v; })[0]; if (p) $("cams").value = p.cams; });
  $("tiers").addEventListener("click", function (e) { var a = e.target.closest("a[data-plan]"); if (!a) return; var b = $("plan").querySelector('[data-v="' + a.dataset.plan + '"]'); if (b) b.click(); });
  B.multi($("now"));
  $("f").addEventListener("submit", function (e) {
    e.preventDefault(); $("err").textContent = "";
    if (B.need([$("name"), $("phone")])) { $("err").textContent = t("Please fill in the highlighted fields."); return; }
    var probs = B.labels($("now"));
    var L = [
      t("Hi Queen Tech, I'd like a CCTV Care Plan."),
      t("Plan") + ": " + B.label($("plan"), $("plan").dataset.value),
      t("Cameras") + ": " + $("cams").value + " · " + B.sel($("brand")),
      t("Property") + ": " + B.sel($("prop")),
      t("First visit") + ": " + B.sel($("first")),
      probs.length ? t("Right now") + ": " + probs.join(", ") : "",
      t("Name") + ": " + $("name").value.trim(),
      t("Phone") + ": " + $("phone").value.trim(),
      $("area").value.trim() ? t("Area") + ": " + $("area").value.trim() : ""
    ].filter(Boolean);
    if (window.qtTrack) qtTrack("lead_form", { form: "care_plan" });
    window.open(B.wa(L.join("\\n")), "_blank", "noopener");
  });
})();
</script>
'''

page("care", "CCTV Care Plan: Yearly CCTV Maintenance in Dubai &amp; Abu Dhabi | Queen Tech",
     "Scheduled CCTV maintenance visits for homes, shops and offices in Dubai and Abu Dhabi: cameras, recorder, hard disk, cabling and the phone app checked on every visit, with a report.",
     "CCTV Care Plan | Queen Tech Solutions", "CCTV Care Plan", ("#book", "Schedule visits"), BODY, SCRIPT,
     ld=ld_service("CCTV Care Plan", "Yearly CCTV maintenance plan with scheduled visits checking cameras, recorder, cabling and remote viewing.", "care", {"serviceType": "CCTV maintenance"}))
