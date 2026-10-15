Y = '<span class="y">✓</span>'
N = '<span class="no">–</span>'
ROWS = [
 ("Help by WhatsApp, phone and remote screen", Y, Y, Y),
 ("Response time in working hours", "Next day", "Same day", "Within 2 hours"),
 ("On-site visits each month", "1", "2", "4"),
 ("PC and laptop health check", Y, Y, Y),
 ("Windows, Office and security updates", Y, Y, Y),
 ("Antivirus set up and watched", Y, Y, Y),
 ("Backup set up and checked", "Monthly", "Weekly", "Weekly"),
 ("Email accounts (Microsoft 365 / Google Workspace)", Y, Y, Y),
 ("Wi-Fi, router and printer support", Y, Y, Y),
 ("New staff laptop set-up", "1 a month", "3 a month", "Unlimited"),
 ("List of your devices and licences", N, Y, Y),
 ("Monthly report", N, Y, Y),
 ("CCTV and access control check", N, N, Y),
 ("Emergency visit outside hours", N, N, Y),
]
def cell(v):
    return v if v.startswith("<span") else v
MX = ('<div class="mxw"><table class="mx"><thead><tr><th scope="col">What you get</th><th scope="col">Starter</th><th scope="col">Business</th><th scope="col">Pro</th></tr></thead><tbody>'
      + "".join('<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>' % r for r in ROWS)
      + '<tr><td>Price</td><td id="m-starter">–</td><td id="m-business">–</td><td id="m-pro">–</td></tr></tbody></table></div>')

BODY = '''
  <section class="phead">
    <div class="crumbs"><a href="/">Home</a><span>/</span><a href="/services.html">Services</a><span>/</span><span>IT Support Plans</span></div>
    <span class="tag">Monthly IT support · Small offices · Dubai · Abu Dhabi</span>
    <h1>Business IT Support Plans: <em>your IT team for a fixed monthly fee.</em></h1>
    <p class="lede">For small offices, clinics, shops and agencies that don't need a full-time IT person. One monthly price, a clear list of what's included, and a real person who knows your office when something stops working.</p>
    <div class="cta-row"><a class="btn btn-gold" href="#plans">Compare plans</a><a class="btn btn-line" href="#book">Get a plan for my office</a></div>
  </section>

  <section class="sec" id="plans">
    <div class="sec-head"><span class="tag">Plans</span><h2>Three plans, clearly priced</h2><p>Priced by the number of people using computers in your office. Move up or down any month as your team changes.</p></div>
    <div class="tiers" id="tiers"></div>
  </section>

  <section class="sec">
    <div class="sec-head"><span class="tag">Side by side</span><h2>What's included</h2></div>
    ''' + MX + '''
    <p class="fine">Not included: new hardware, software licences and big projects like new cabling or a server move. We quote these separately and plan customers get our best price. Working hours are 10 am to 10 pm, every day.</p>
  </section>

  <section class="sec" id="book" style="border-bottom:0">
    <div class="bk">
      <form class="block" id="f" novalidate>
        <h2><span class="n">1</span>Your office</h2>
        <p>We'll reply with the right plan and a start date. The first visit includes a free check of your setup.</p>
        <div class="field"><label>Plan</label><div class="opts" id="plan" role="group" aria-label="Plan"></div></div>
        <div class="two">
          <div class="field"><label for="users">People using computers</label><input id="users" type="number" min="1" max="500" value="10" inputmode="numeric"></div>
          <div class="field"><label for="biz">Type of business</label><select id="biz"><option>Office</option><option>Clinic</option><option>Shop or showroom</option><option>Restaurant or café</option><option>Agency or studio</option><option>Warehouse</option><option>Other</option></select></div>
        </div>
        <div class="field"><label>What do you use?</label><div class="tags" id="use">
          <button type="button" class="tg" data-v="1" aria-pressed="false">Microsoft 365</button>
          <button type="button" class="tg" data-v="2" aria-pressed="false">Google Workspace</button>
          <button type="button" class="tg" data-v="3" aria-pressed="false">Shared printer</button>
          <button type="button" class="tg" data-v="4" aria-pressed="false">Server or NAS</button>
          <button type="button" class="tg" data-v="5" aria-pressed="false">Accounting software</button>
          <button type="button" class="tg" data-v="6" aria-pressed="false">CCTV</button>
          <button type="button" class="tg" data-v="7" aria-pressed="false">Access control</button>
        </div></div>
        <div class="field"><label for="pain">Biggest IT headache right now (optional)</label><textarea id="pain" maxlength="400" placeholder="e.g. Wi-Fi drops in the meeting room, no backup, slow laptops"></textarea></div>
        <h2 style="margin-top:20px"><span class="n">2</span>Contact</h2>
        <div class="two">
          <div class="field"><label for="name">Your name</label><input id="name" maxlength="70" autocomplete="name"></div>
          <div class="field"><label for="company">Company</label><input id="company" maxlength="80" autocomplete="organization"></div>
        </div>
        <div class="two">
          <div class="field"><label for="phone">Mobile / WhatsApp</label><input id="phone" type="tel" maxlength="25" autocomplete="tel" placeholder="05X XXX XXXX"></div>
          <div class="field"><label for="area">Office area</label><input id="area" maxlength="75" placeholder="e.g. Business Bay, JLT, Al Quoz"></div>
        </div>
        <button class="btn btn-wa submit" type="submit">Send on WhatsApp</button>
        <div class="err" id="err" role="alert"></div>
      </form>
      <aside class="side">
        <div class="block">
          <h2>How it works</h2>
          <ul class="promise">
            <li><span><b>Free first check.</b> We look at every PC, the network, backup and email.</span></li>
            <li><span><b>We fix the basics</b> and write down every device and password safely.</span></li>
            <li><span><b>Then we keep it running</b> with regular visits and remote help.</span></li>
            <li><span><b>Month to month.</b> Cancel with 30 days' notice.</span></li>
          </ul>
        </div>
        <div class="block">
          <h2>Just one problem?</h2>
          <p class="note">No plan needed. Book a one-time visit or send in a laptop for repair.</p>
          <div class="cta-row" style="margin-top:12px"><a class="btn btn-line" href="/express.html">ExpressFix repair</a><a class="btn btn-line" href="/it-support-dubai.html">One-time IT support</a></div>
        </div>
      </aside>
    </div>
  </section>

  <section class="sec">
    <div class="sec-head"><span class="tag">Questions</span><h2>Good to know</h2></div>
    <div class="faq">
      <details><summary>Who counts as a user?</summary><p>Each person who uses a computer or laptop at work. Shared PCs, printers and the router are included, you don't pay extra for them.</p></details>
      <details><summary>Is there a contract?</summary><p>No long contract. Plans run month to month and you can cancel with 30 days' notice.</p></details>
      <details><summary>What if we need more than the plan includes?</summary><p>Extra visits or projects are charged at a lower plan rate, and we always tell you the price first.</p></details>
      <details><summary>Do you work in Abu Dhabi too?</summary><p>Yes. Remote help works anywhere. On-site visits in Abu Dhabi are planned on fixed days each month.</p></details>
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
  var NAMES = { starter: ["Starter", "Up to 5 people"], business: ["Business", "Up to 15 people"], pro: ["Pro", "Up to 30 people"] };
  var RESP = { starter: "Next-day response", business: "Same-day response", pro: "Response within 2 hours" };
  var tiers = P.it || [];
  $("tiers").innerHTML = tiers.map(function (p) {
    var n = NAMES[p.id] || [p.id, ""], pr = B.price(p.price);
    var li = [
      "<b>" + p.users + " " + t("users") + "</b> " + t("included"),
      "<b>" + p.visits + " " + t(p.visits === 1 ? "on-site visit" : "on-site visits") + "</b> " + t("a month"),
      t("Unlimited remote help"),
      "<b>" + t(RESP[p.id] || "") + "</b>",
      t("Updates, antivirus and backup checks"),
      p.priority ? t("CCTV and access control check") : t("Email, Wi-Fi and printer support"),
      P.approved ? t("Extra user") + ": " + B.aed(p.extraUser) + " " + t("a month") : t("Add more users any time")
    ];
    var m = $("m-" + p.id); if (m) m.textContent = pr ? B.aed(p.price) + " " + t("a month") : t("On request");
    return '<div class="tier' + (p.featured ? " feat" : "") + '">' + (p.featured ? '<span class="badge">' + B.esc(t("Most popular")) + '</span>' : "") +
      '<h3>' + B.esc(t(n[0])) + '</h3><p class="for">' + B.esc(t(n[1])) + '</p>' +
      (pr ? '<div class="amt">' + B.esc(B.aed(p.price)) + '<small>' + B.esc(t("a month")) + '</small></div>' : '<div class="amt ask">' + B.esc(t("Price on request")) + '</div>') +
      '<ul>' + li.map(function (x) { return "<li><span>" + x + "</span></li>"; }).join("") + '</ul>' +
      '<a class="btn ' + (p.featured ? "btn-gold" : "btn-line") + '" href="#book" data-plan="' + p.id + '">' + B.esc(t("Choose")) + " " + B.esc(t(n[0])) + '</a></div>';
  }).join("");
  $("plan").innerHTML = tiers.map(function (p) {
    var n = NAMES[p.id] || [p.id, ""];
    return '<button type="button" class="opt" data-v="' + p.id + '" aria-pressed="' + (p.featured ? "true" : "false") + '"><b>' + B.esc(t(n[0])) + '</b><small>' + B.esc(t(n[1])) + '</small></button>';
  }).join("") + '<button type="button" class="opt" data-v="help" aria-pressed="false"><b>' + B.esc(t("Help me choose")) + '</b><small>' + B.esc(t("We'll suggest one")) + '</small></button>';
  B.pick($("plan"), function (v) { var p = tiers.filter(function (x) { return x.id === v; })[0]; if (p) $("users").value = p.users; });
  $("tiers").addEventListener("click", function (e) { var a = e.target.closest("a[data-plan]"); if (!a) return; var b = $("plan").querySelector('[data-v="' + a.dataset.plan + '"]'); if (b) b.click(); });
  B.multi($("use"));
  $("f").addEventListener("submit", function (e) {
    e.preventDefault(); $("err").textContent = "";
    if (B.need([$("name"), $("phone")])) { $("err").textContent = t("Please fill in the highlighted fields."); return; }
    var use = B.labels($("use"));
    var L = [
      t("Hi Queen Tech, I'm interested in a Business IT Support Plan."),
      t("Plan") + ": " + B.label($("plan"), $("plan").dataset.value),
      t("Users") + ": " + $("users").value + " · " + B.sel($("biz")),
      use.length ? t("We use") + ": " + use.join(", ") : "",
      $("pain").value.trim() ? t("Main problem") + ": " + $("pain").value.trim() : "",
      t("Name") + ": " + $("name").value.trim() + ($("company").value.trim() ? " · " + $("company").value.trim() : ""),
      t("Phone") + ": " + $("phone").value.trim(),
      $("area").value.trim() ? t("Area") + ": " + $("area").value.trim() : ""
    ].filter(Boolean);
    if (window.qtTrack) qtTrack("lead_form", { form: "it_plan" });
    window.open(B.wa(L.join("\\n")), "_blank", "noopener");
  });
})();
</script>
'''

page("it-plans", "Business IT Support Plans for Small Offices in Dubai | Queen Tech",
     "Monthly IT support for small offices in Dubai and Abu Dhabi: remote help, on-site visits, updates, antivirus, backup checks, email and Wi-Fi. Three clear plans, month to month.",
     "Business IT Support Plans | Queen Tech Solutions", "IT Support Plans", ("#book", "Get a plan"), BODY, SCRIPT,
     ld=ld_service("Business IT Support Plans", "Monthly managed IT support for small offices with remote help, on-site visits, updates, antivirus and backup checks.", "it-plans", {"serviceType": "Managed IT support"}))
