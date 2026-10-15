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
    <div class="cta-row"><a class="btn btn-gold" href="#book">Book a checkup</a><a class="btn btn-line" href="#sizes">See prices</a></div>
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
'''

page("wifi-check", "Wi-Fi Checkup: Find Dead Zones &amp; Fix Slow Wi-Fi in Dubai | Queen Tech",
     "Book a Wi-Fi survey in Dubai or Abu Dhabi. We map the signal in every room, find dead zones and interference, and give you a recommended setup with a fixed price.",
     "Wi-Fi Checkup | Queen Tech Solutions", "Wi-Fi Checkup", ("#book", "Book a checkup"), BODY, SCRIPT,
     ld=ld_service("Wi-Fi Checkup", "On-site Wi-Fi survey: signal map, speed tests, interference scan and a recommended setup with a fixed price.", "wifi-check", {"serviceType": "Wi-Fi site survey"}))
