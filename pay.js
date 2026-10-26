/* Queen Tech – pay online (Ziina). Talks to the payment worker (QT_SITE.payEndpoint); the Ziina key lives only there. */
(function () {
  var S = window.QT_SITE || {}, E = String(S.payEndpoint || "").replace(/\/+$/, "");
  var q = new URLSearchParams(location.search);
  /* testing before go-live: /pay.html?pe=https://queentech-pay.<account>.workers.dev (this browser tab only) */
  try {
    var pe = q.get("pe"); if (pe && /^https:\/\/queentech-pay\.[a-z0-9-]+\.workers\.dev$/.test(pe)) sessionStorage.setItem("qt-pe", pe);
    if (!E) E = sessionStorage.getItem("qt-pe") || "";
  } catch (e) {}
  var ar = document.documentElement.lang === "ar" || q.get("lang") === "ar";
  var L = ar ? {
    go: "جاري التحويل لصفحة الدفع…", nf: "مش لاقيين الكود ده. اتأكد منه أو كلمنا على واتساب.", nq: "لسه مفيش سعر للإصلاح ده. هنبعتلك السعر الأول.",
    col: "الجهاز ده اتسلّم خلاص.", amt: "اكتب مبلغ صحيح (أقل حاجة 2 درهم).", name: "اكتب اسمك أو اسم الشركة.", code: "اكتب كود الإصلاح زي QT-AB12-CD34.",
    lim: "محاولات كتير. جرب بعد شوية.", err: "حصلت مشكلة. جرب تاني أو كلمنا على واتساب.",
    okH: "تم الدفع ✓", okP: "وصلنا المبلغ. شكراً لك! هيوصلك إيصال من Ziina.", penH: "الدفع تحت المراجعة", penP: "العملية لسه بتتم. حدّث الصفحة بعد دقيقة.",
    badH: "الدفع ما تمش", badP: "ما اتخصمش أي مبلغ. تقدر تجرب تاني.", canH: "إلغاء الدفع", canP: "ما اتخصمش أي مبلغ.",
    wa: "ابعت تأكيد على واتساب", again: "جرّب تاني", trk: "تابع الإصلاح", aed: "درهم"
  } : {
    go: "Taking you to the payment page…", nf: "We couldn't find that code. Check it, or message us on WhatsApp.", nq: "There's no price for this repair yet. We'll send it to you first.",
    col: "This device was already collected.", amt: "Enter a valid amount (minimum AED 2).", name: "Enter your name or company.", code: "Enter your repair code, like QT-AB12-CD34.",
    lim: "Too many tries. Please wait a little.", err: "Something went wrong. Try again or message us on WhatsApp.",
    okH: "Payment received ✓", okP: "Thank you! Ziina will send you a receipt.", penH: "Payment processing", penP: "Your payment is still being processed. Refresh this page in a minute.",
    badH: "Payment didn't go through", badP: "No money was taken. You can try again.", canH: "Payment cancelled", canP: "No money was taken.",
    wa: "Send confirmation on WhatsApp", again: "Try again", trk: "Track my repair", aed: "AED"
  };
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var money = function (v) { var n = Number(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); return ar ? n + " " + L.aed : L.aed + " " + n; };
  if (!E) { $("paybox").hidden = true; $("off").hidden = false; return; }

  var tabs = document.querySelectorAll(".ptabs [data-k]");
  function tab(k) { tabs.forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-k") === k); }); $("fRepair").hidden = k !== "repair"; $("fInvoice").hidden = k !== "invoice"; }
  tabs.forEach(function (b) { b.addEventListener("click", function () { tab(b.getAttribute("data-k")); }); });
  if (q.get("repair")) $("fRepair").elements.code.value = q.get("repair");
  if (q.get("amount")) { $("fInvoice").elements.amount.value = q.get("amount"); tab("invoice"); }
  if (q.get("ref")) $("fInvoice").elements.ref.value = q.get("ref");

  fetch(E + "/info").then(function (r) { return r.json(); }).then(function (d) { if (d && d.test) $("testbar").hidden = false; }).catch(function () {});

  function send(form, body) {
    var msg = form.querySelector("[data-msg]"), btn = form.querySelector("button[type=submit]");
    msg.textContent = L.go; msg.style.color = "var(--muted)"; btn.disabled = true;
    body.lang = ar ? "ar" : "en";
    fetch(E + "/pay", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (d) {
        if (d.redirect_url) { if (window.qtTrack) qtTrack("begin_checkout", { kind: body.kind, value: d.aed, currency: "AED" }); location.href = d.redirect_url; return; }
        var m = { no_repair: L.nf, bad_code: L.code, no_quote: L.nq, already_collected: L.col, bad_amount: L.amt, need_name: L.name, limit: L.lim }[d.error] || L.err;
        msg.textContent = m; msg.style.color = ""; btn.disabled = false;
      })
      .catch(function () { msg.textContent = L.err; msg.style.color = ""; btn.disabled = false; });
  }
  $("fRepair").addEventListener("submit", function (e) {
    e.preventDefault(); var c = this.elements.code.value.trim();
    if (!/^(QT)?[\s-]*[0-9A-Z]{4}[\s-]*[0-9A-Z]{4}$/i.test(c)) { this.querySelector("[data-msg]").textContent = L.code; return; }
    send(this, { kind: "repair", code: c });
  });
  $("fInvoice").addEventListener("submit", function (e) {
    e.preventDefault(); var f = this.elements, a = Number(String(f.amount.value).replace(/[^0-9.]/g, ""));
    if (!f.name.value.trim()) { this.querySelector("[data-msg]").textContent = L.name; return; }
    if (!(a >= 2)) { this.querySelector("[data-msg]").textContent = L.amt; return; }
    send(this, { kind: "invoice", amount: a, name: f.name.value, ref: f.ref.value });
  });

  /* coming back from Ziina */
  function show(cls, h, p, extra) {
    var r = $("result"); r.hidden = false; r.className = "res " + cls;
    r.innerHTML = "<h2>" + esc(h) + "</h2><p>" + esc(p) + "</p>" + (extra || "");
    r.scrollIntoView({ block: "start" });
  }
  var rep = q.get("repair"), trk = rep ? '<a class="btn btn-line" href="/track.html?c=' + encodeURIComponent(rep) + (ar ? "&lang=ar" : "") + '">' + esc(L.trk) + "</a>" : "";
  if (q.get("cancel")) show("", L.canH, L.canP);
  else if (q.get("ok") || q.get("fail")) {
    var id = q.get("id") || "";
    fetch(E + "/status?id=" + encodeURIComponent(id)).then(function (r) { return r.json(); }).then(function (d) {
      if (d.status === "completed") {
        $("paybox").hidden = true;
        var text = (ar ? "أهلاً كوين تك، دفعت أونلاين " : "Hi Queen Tech, I paid online ") + money(d.aed) + " – " + (d.message || "") + " (Ziina " + id + ")";
        show("ok", L.okH, L.okP + " " + money(d.aed) + (d.message ? " · " + d.message : "") + (d.test ? " · TEST" : ""),
          '<div class="row" style="margin-top:12px"><a class="btn btn-wa" target="_blank" rel="noopener" href="https://wa.me/971557971520?text=' + encodeURIComponent(text) + '">' + esc(L.wa) + "</a>" + trk + "</div>");
        if (window.qtTrack) qtTrack("purchase", { value: d.aed, currency: "AED", transaction_id: id });
      } else if (d.status === "failed" || d.status === "canceled") show("bad", L.badH, L.badP);
      else if (d.status) show("", L.penH, L.penP, trk ? '<div class="row" style="margin-top:12px">' + trk + "</div>" : "");
      else show("bad", L.badH, L.err);
    }).catch(function () { show("bad", L.badH, L.err); });
  }
})();
