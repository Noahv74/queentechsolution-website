IC = {
 "laptop": '<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>',
 "desktop": '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M9 20h6M12 16v4"/>',
 "mac": '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4M12 8.5v3"/>',
 "phone": '<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/>',
 "tablet": '<rect x="4.5" y="3" width="15" height="18" rx="2"/><path d="M11 18h2"/>',
 "other": '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5v.7M12 17h.01"/>',
 "dropoff": '<path d="M4 21V9l8-5 8 5v12"/><path d="M9 21v-6h6v6"/>',
 "pickup": '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
}
def opt(k, label, small="", pressed=False, extra=""):
    return ('<button type="button" class="opt" data-v="%s" aria-pressed="%s"><svg viewBox="0 0 24 24" aria-hidden="true">%s</svg><b>%s</b>%s%s</button>'
            % (k, "true" if pressed else "false", IC[k], label, ('<small>%s</small>' % small) if small else "", extra))

DEV = "".join([opt("laptop", "Laptop", pressed=True), opt("desktop", "Desktop PC"), opt("mac", "MacBook / iMac"),
               opt("phone", "Phone"), opt("tablet", "Tablet / iPad"), opt("other", "Other")])
PROBS = ["Won't turn on", "Slow or freezing", "Broken screen", "Battery or charging", "Virus or pop-ups",
         "Windows or software", "Water damage", "Overheating or noisy", "Keyboard or ports", "Data recovery",
         "Upgrade (SSD / RAM)", "Something else"]
TAGS = "".join('<button type="button" class="tg" data-v="%d" aria-pressed="false">%s</button>' % (i, p) for i, p in enumerate(PROBS))
SVC = (opt("dropoff", "We come to you", "A technician visits your home or office. Software jobs are often fixed on the spot.", True, '<span class="pr" id="p-drop"></span>')
       + opt("pickup", "We pick it up", "We collect from your home or office in Dubai and bring it back fixed.", False, '<span class="pr" id="p-pick"></span>'))
SLOTS = "".join('<option>%s</option>' % s for s in ["10 am – 12 pm", "12 pm – 2 pm", "2 pm – 4 pm", "4 pm – 6 pm", "6 pm – 8 pm", "8 pm – 10 pm"])

BODY = '''
  <section class="phead">
    <div class="crumbs"><a href="/">Home</a><span>/</span><a href="/services.html">Services</a><span>/</span><span>ExpressFix</span></div>
    <span class="tag">PC · Laptop · Phone repair · Dubai</span>
    <h1>ExpressFix: book a repair, <em>track it live.</em></h1>
    <p class="lede">Book your PC, laptop or phone repair in one minute. We come to you, or pick it up anywhere in Dubai. You get a tracking code and can follow every step of the repair from your phone.</p>
    <div class="cta-row"><a class="btn btn-gold" href="#book">Book a repair</a><a class="btn btn-line" href="/track.html">Track my repair</a></div>
  </section>

  <section class="sec">
    <ol class="steps">
      <li><b>Book online</b><span>Tell us the device and the problem. It takes one minute.</span></li>
      <li><b>Visit or pickup</b><span>We come to you, or collect it from you anywhere in Dubai.</span></li>
      <li><b>Free check and a clear quote</b><span>We find the fault and send you the price on WhatsApp. Nothing is done until you say yes.</span></li>
      <li><b>Track it live</b><span>Open your tracking page any time to see where your repair is.</span></li>
      <li><b>Ready</b><span>Collect it, or we deliver it back to you. Every repair has a warranty.</span></li>
    </ol>
  </section>

  <section class="sec" id="book" style="border-bottom:0">
    <div class="bk">
      <form id="f" novalidate>
        <div class="block">
          <h2><span class="n">1</span>Your device</h2>
          <p>What needs fixing?</p>
          <div class="opts" id="dev" role="group" aria-label="Device type">''' + DEV + '''</div>
          <div class="field" style="margin:14px 0 0"><label for="model">Brand and model</label><input id="model" maxlength="50" placeholder="e.g. HP ProBook 450 G8, iPhone 13" autocomplete="off"><span class="hint">If you don't know, leave it empty.</span></div>
        </div>

        <div class="block">
          <h2><span class="n">2</span>The problem</h2>
          <p>Pick everything that fits.</p>
          <div class="tags" id="prob" role="group" aria-label="Problem">''' + TAGS + '''</div>
          <div class="field" style="margin:14px 0 0"><label for="details">Tell us more (optional)</label><textarea id="details" maxlength="500" placeholder="When did it start? Any error message? Do you need your files kept?"></textarea></div>
        </div>

        <div class="block">
          <h2><span class="n">3</span>Visit or pickup</h2>
          <p>Choose what's easier for you.</p>
          <div class="opts wide" id="svc" role="group" aria-label="Service">''' + SVC + '''</div>
          <div class="two" style="margin-top:14px">
            <div class="field"><label for="date">Preferred day</label><input id="date" type="date"></div>
            <div class="field"><label for="slot">Time</label><select id="slot">''' + SLOTS + '''</select></div>
          </div>
          <p class="note">We're open every day, 10 am to 10 pm.</p>
        </div>

        <div class="block">
          <h2><span class="n">4</span>Your details</h2>
          <p>We send the quote and updates to this number on WhatsApp.</p>
          <div class="two">
            <div class="field"><label for="name">Your name</label><input id="name" maxlength="70" autocomplete="name" required></div>
            <div class="field"><label for="phone">Mobile / WhatsApp</label><input id="phone" type="tel" maxlength="25" autocomplete="tel" placeholder="05X XXX XXXX" required></div>
          </div>
          <div class="field"><label for="area" id="area-l">Area in Dubai (optional)</label><input id="area" maxlength="75" autocomplete="street-address" placeholder="e.g. Business Bay, JLT, Al Barsha"></div>
          <button class="btn btn-gold submit" id="go" type="submit">Book my repair</button>
          <div class="err" id="err" role="alert"></div>
          <p class="fine">Your name and number are only used for this repair. Your tracking page shows the device and status only, never your name or number.</p>
        </div>
      </form>

      <aside class="side">
        <div class="done" id="done" hidden aria-live="polite">
          <span class="tag">Booked</span>
          <div>Your tracking code</div>
          <div class="code" id="code">QT-</div>
          <p class="note" id="done-t">Last step: send your booking to us on WhatsApp so we can confirm the time.</p>
          <div class="acts">
            <a class="btn btn-wa" id="wa" href="#" target="_blank" rel="noopener">Send on WhatsApp</a>
            <a class="btn btn-line" id="trk" href="/track.html">Open tracking page</a>
          </div>
          <p class="note" id="done-s">Save this code. You can open your tracking page any time from the menu: Services → Track a repair.</p>
        </div>
        <div class="block">
          <h2>Your booking</h2>
          <div class="sumrow"><span>Device</span><b id="s-dev">–</b></div>
          <div class="sumrow"><span>Problem</span><b id="s-prob">–</b></div>
          <div class="sumrow"><span>Service</span><b id="s-svc">–</b></div>
          <div class="sumrow"><span>When</span><b id="s-when">–</b></div>
        </div>
        <div class="block">
          <h2>Our promise</h2>
          <ul class="promise">
            <li><span><b>Free check</b> on a visit.</span></li>
            <li><span><b>Price before work.</b> We only repair after you approve the quote.</span></li>
            <li><span><b id="w-days">Warranty</b> on every repair and part we fit.</span></li>
            <li><span><b>Your data stays private.</b> We don't open your files unless you ask us to.</span></li>
            <li><span><b>Live tracking</b> from booking to pick-up.</span></li>
          </ul>
        </div>
        <div class="block">
          <h2>Common jobs</h2>
          <div id="from"></div>
          <p class="fine" id="from-n">Parts are priced for your exact model and included in your quote.</p>
        </div>
      </aside>
    </div>
  </section>

  <section class="sec">
    <div class="sec-head"><span class="tag">Questions</span><h2>Good to know</h2></div>
    <div class="faq">
      <details><summary>How long does a repair take?</summary><p>Software jobs like a Windows reinstall or virus clean-up are usually done the same day. Screens, batteries and other parts depend on the part: most are done in 1 to 3 days. Your tracking page always shows the expected date.</p></details>
      <details><summary>Do I pay if I decide not to repair?</summary><p>The check on a visit is free. If we picked it up and you decide not to go ahead, you only pay the pickup and check fee. We tell you this before we collect.</p></details>
      <details><summary>Will I lose my files?</summary><p>Not if we can help it. Tell us if your files matter and we back them up before any software work. If the drive is failing, we tell you first and quote data recovery separately.</p></details>
      <details><summary>Which devices do you repair?</summary><p>Windows laptops and desktops, MacBooks and iMacs, iPhone and Android phones, and tablets. For business laptops we can also set up email, Office, printers and backup.</p></details>
      <details><summary>How do I follow my repair?</summary><p>After booking you get a code like QT-7K4M-2PXA. Open the tracking page, type the code and you'll see each step: received, checking, price approval, repairing and ready.</p></details>
    </div>
  </section>

  <section class="sec" style="border-bottom:0">
    <div class="cta-box">
      <div><h2>Need it today?</h2><p>Message us now. If it's a quick fix, we can often do it on the same day at your place.</p></div>
      <div class="acts"><a class="btn btn-wa" href="https://wa.me/971557971520?text=Hi%20Queen%20Tech%2C%20I%20need%20an%20urgent%20repair" target="_blank" rel="noopener">WhatsApp us</a><a class="btn btn-line" href="tel:+971557971520">Call +971 55 797 1520</a><span class="addr">Dubai and Abu Dhabi · 10 am – 10 pm daily</span></div>
    </div>
  </section>
'''

SCRIPT = '''
<script src="/qt-auth-config.js"></script>
<script src="/plans.js"></script>
<script src="/book.js"></script>
<script type="module">
import { enabled } from "/qt-auth.js";
import { createRepair } from "/qt-repairs.js";
const B = window.QTB, t = B.t, P = B.plans, X = P.express || {};
const $ = id => document.getElementById(id);
const dev = $("dev"), prob = $("prob"), svc = $("svc");
const JOBS = [["windows","Windows or macOS reinstall"],["virus","Virus and junk clean-up"],["clean","Deep clean and new thermal paste"],["ssd","SSD or RAM upgrade"],["phoneBattery","Phone battery replacement"],["data","Data recovery"]];

function prices() {
  if (P.approved) {
    $("p-drop").textContent = X.dropoffDiagnosis ? B.aed(X.dropoffDiagnosis) : t("Free check");
    $("p-pick").textContent = B.aed(X.pickupFee) + " · " + t("free on repairs over") + " " + B.aed(X.pickupFreeOver);
    $("w-days").textContent = X.warrantyDays + " " + t("days warranty");
  } else {
    $("p-drop").textContent = t("Free check");
    $("p-pick").textContent = t("Pickup fee told before we collect");
  }
  $("from").innerHTML = JOBS.map(j => '<div class="sumrow"><span>' + B.esc(t(j[1])) + '</span><b>' +
    B.esc(P.approved && X.from ? t("from") + " " + B.aed(X.from[j[0]]) : t("Price on request")) + '</b></div>').join("");
}

function when() {
  const d = $("date").value;
  const sep = B.ar() ? "، " : ", ";
  if (!d) return t("Any day") + sep + B.sel($("slot"));
  const dt = new Date(d + "T12:00:00");
  return dt.toLocaleDateString(B.ar() ? "ar-AE" : "en-GB", { weekday: "short", day: "numeric", month: "short" }) + sep + B.sel($("slot"));
}
function sum() {
  const m = $("model").value.trim();
  $("s-dev").textContent = B.label(dev, dev.dataset.value) + (m ? " · " + m : "");
  const p = B.labels(prob); $("s-prob").textContent = p.length ? p.join(", ") : "–";
  $("s-svc").textContent = B.label(svc, svc.dataset.value);
  $("s-when").textContent = when();
  const pick = svc.dataset.value === "pickup";
  $("area-l").textContent = pick ? t("Pickup address in Dubai") : t("Area in Dubai (optional)");
  $("area").required = pick;
}
B.pick(dev, sum); B.multi(prob, sum); B.pick(svc, sum);
["model", "date", "slot"].forEach(id => $(id).addEventListener("input", sum));
$("date").min = B.today(); $("date").value = B.today();
const qs = new URLSearchParams(location.search);
if (qs.get("device")) { const b = dev.querySelector('[data-v="' + qs.get("device") + '"]'); if (b) b.click(); }
if (qs.get("pickup") === "1") svc.querySelector('[data-v="pickup"]').click();
prices(); sum();

function withTimeout(p, ms) { return Promise.race([p, new Promise((_, r) => setTimeout(() => r(new Error("timeout")), ms))]); }

$("f").addEventListener("submit", async e => {
  e.preventDefault();
  $("err").textContent = "";
  const req = [$("name"), $("phone")]; if ($("area").required) req.push($("area"));
  if (B.need(req)) { $("err").textContent = t("Please fill in the highlighted fields."); return; }
  const go = $("go"); go.disabled = true; go.textContent = t("Booking…");
  const device = B.label(dev, dev.dataset.value) + ($("model").value.trim() ? " · " + $("model").value.trim() : "");
  const problems = B.labels(prob).join(", ") || t("Not sure");
  const service = svc.dataset.value;
  let code = null;
  if (enabled) {
    try {
      const name = $("name").value.trim();
      const rec = await withTimeout(createRepair(
        { first: name.split(/\\s+/)[0].slice(0, 40), device: device.slice(0, 80), issue: problems.slice(0, 160),
          note: (t("Booked online") + " · " + B.label(svc, service) + " · " + when()).slice(0, 200), lang: B.ar() ? "ar" : "en" },
        { name: name.slice(0, 80), phone: $("phone").value.trim().slice(0, 30),
          notes: ["ExpressFix online booking", "Service: " + service, "When: " + when(), "Area: " + $("area").value.trim(), "Details: " + $("details").value.trim()].join("\\n").slice(0, 800) }), 9000);
      code = rec && rec.code;
    } catch (err) { code = null; }
  }
  const link = code ? location.origin + "/track.html?c=" + code : "";
  const lines = [
    t("Hi Queen Tech, I booked an ExpressFix repair."),
    code ? t("Tracking code") + ": " + code : "",
    t("Device") + ": " + device,
    t("Problem") + ": " + problems,
    $("details").value.trim() ? t("Details") + ": " + $("details").value.trim() : "",
    t("Service") + ": " + B.label(svc, service),
    t("When") + ": " + when(),
    t("Name") + ": " + $("name").value.trim(),
    t("Phone") + ": " + $("phone").value.trim(),
    $("area").value.trim() ? t("Area") + ": " + $("area").value.trim() : "",
    link ? t("Track") + ": " + link : ""
  ].filter(Boolean);
  $("wa").href = B.wa(lines.join("\\n"));
  const done = $("done");
  if (code) {
    $("code").textContent = code; $("code").hidden = false; $("trk").href = "/track.html?c=" + code; $("trk").hidden = false; $("done-s").hidden = false;
    try { localStorage.setItem("qt-last-repair", code); } catch (e) {}
    $("done-t").textContent = t("Last step: send your booking to us on WhatsApp so we can confirm the time.");
  } else {
    $("code").hidden = true; $("trk").hidden = true; $("done-s").hidden = true;
    $("done-t").textContent = t("Send your booking to us on WhatsApp. We'll confirm the time and send your tracking code.");
  }
  done.hidden = false;
  if (window.qtTrack) qtTrack("booking", { form: "expressfix", service, online: code ? "yes" : "no" });
  done.scrollIntoView({ behavior: "smooth", block: "center" });
  go.disabled = false; go.textContent = t("Book my repair");
});
</script>
'''

page("express", "ExpressFix PC, Laptop &amp; Phone Repair with Pickup and Live Tracking | Queen Tech Dubai",
     "Book a PC, laptop or phone repair in Dubai in one minute. We come to you or pick it up. Free check, price before work, warranty and a live tracking page.",
     "ExpressFix repair booking | Queen Tech Solutions", "ExpressFix repair", ("/track.html", "Track repair"),
     BODY, SCRIPT, ld=ld_service("ExpressFix PC, laptop and phone repair", "Repair booking with an on-site visit or pickup in Dubai, free check, quote before work and live tracking.", "express"))
