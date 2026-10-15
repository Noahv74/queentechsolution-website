/* Queen Tech – engagement helpers (loaded on every page by i18n.js):
   1) Review popup: after games or free tools. Stars + comment, then the customer chooses to post it on Google
      (text copied for them) or send it to us privately on WhatsApp. Same options for every rating (no review gating).
   2) "Feeling bored?" invite to the arcade for visitors who haven't played yet. */
(function () {
  "use strict";
  if (window.QTReview) return;
  var AR = (window.QT_LANG || document.documentElement.lang) === "ar";
  function L(en, ar) { return AR ? ar : en; }
  var REVIEW = (window.QT_SITE && window.QT_SITE.reviewUrl) || "https://g.page/r/CXPWAzSYn864ECE/review";
  var WA = "971557971520", path = location.pathname, DAY = 864e5;
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function sget(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function sset(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  if (/^\/games(\/|\.html)/.test(path)) set("qt-arcade-seen", "1");

  var css = document.createElement("style");
  css.textContent =
    "#qt-rv{position:fixed;inset:0;z-index:420;display:grid;place-items:center;padding:16px;background:rgba(10,9,8,.72);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);animation:qtf .2s ease}" +
    "@keyframes qtf{from{opacity:0}}" +
    "#qt-rv .bx{width:100%;max-width:420px;background:#201E1A;border:1px solid #4A443A;border-radius:16px;padding:22px 20px;color:#EFE8DB;text-align:center;font-family:" + (AR ? "'IBM Plex Sans Arabic','Noto Kufi Arabic'," : "") + "Figtree,system-ui,sans-serif;box-shadow:0 30px 80px -20px rgba(0,0,0,.85);position:relative}" +
    "#qt-rv h3{margin:6px 0 4px;font:800 1.35rem/1.3 " + (AR ? "'Noto Kufi Arabic'," : "'Big Shoulders Display',") + "system-ui,sans-serif;" + (AR ? "" : "text-transform:uppercase;font-size:1.7rem;font-weight:900;") + "}" +
    "#qt-rv p{color:#A79E8F;margin:4px 0 0;font-size:.93rem;line-height:1.55}" +
    "#qt-rv .x{all:unset;cursor:pointer;position:absolute;top:10px;inset-inline-end:12px;width:32px;height:32px;display:grid;place-items:center;border-radius:8px;color:#A79E8F;font-size:1.4rem}" +
    "#qt-rv .x:hover{background:#2A2722;color:#EFE8DB}" +
    "#qt-rv .stars{display:flex;justify-content:center;gap:6px;margin:16px 0 6px;direction:ltr}" +
    "#qt-rv .stars button{all:unset;cursor:pointer;font-size:2.3rem;line-height:1;color:#4A443A;transition:transform .1s,color .1s}" +
    "#qt-rv .stars button.on{color:#E2A63F;text-shadow:0 0 14px rgba(226,166,63,.6)}" +
    "#qt-rv .stars button:hover{transform:scale(1.15)}" +
    "#qt-rv .stars button:focus-visible{outline:2px solid #F3C877;outline-offset:3px;border-radius:6px}" +
    "#qt-rv .lab{min-height:1.4em;color:#F3C877;font-weight:700;font-size:.95rem}" +
    "#qt-rv textarea,#qt-rv input{width:100%;box-sizing:border-box;margin-top:10px;font:inherit;font-size:.95rem;padding:11px 12px;border-radius:10px;border:1px solid #4A443A;background:#131210;color:#EFE8DB;resize:vertical}" +
    "#qt-rv textarea{min-height:78px}" +
    "#qt-rv textarea:focus,#qt-rv input:focus{outline:none;border-color:#E2A63F}" +
    "#qt-rv .acts{display:grid;gap:9px;margin-top:14px}" +
    "#qt-rv .acts a,#qt-rv .acts button{all:unset;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;padding:13px 14px;border-radius:10px;font-weight:700;border:1px solid #4A443A;text-align:center}" +
    "#qt-rv .acts .g{background:#E2A63F;border-color:#E2A63F;color:#131210}" +
    "#qt-rv .acts .w{background:#2FA866;border-color:#2FA866;color:#fff}" +
    "#qt-rv .acts .n{color:#A79E8F;border-color:transparent;padding:8px}" +
    "#qt-rv .step2[hidden]{display:none}" +
    "#qt-rv .ok{font-size:2.6rem}" +
    "#qt-bored{position:fixed;z-index:58;bottom:18px;inset-inline-start:16px;max-width:340px;display:flex;align-items:center;gap:12px;padding:12px 12px 12px 14px;border-radius:14px;background:#201E1A;border:1px solid #E2A63F;box-shadow:0 18px 50px -12px rgba(0,0,0,.8),0 0 22px rgba(226,166,63,.18);color:#EFE8DB;font-family:" + (AR ? "'IBM Plex Sans Arabic'," : "") + "Figtree,system-ui,sans-serif;animation:qtin .35s cubic-bezier(.2,.8,.2,1)}" +
    "@keyframes qtin{from{opacity:0;transform:translateY(20px)}}" +
    "#qt-bored .e{font-size:1.9rem;line-height:1}" +
    "#qt-bored b{display:block;font-size:.98rem}" +
    "#qt-bored small{display:block;color:#A79E8F;font-size:.82rem;margin-top:2px}" +
    "#qt-bored a{flex:none;background:#E2A63F;color:#131210;text-decoration:none;font-weight:800;font-size:.9rem;padding:9px 14px;border-radius:999px}" +
    "#qt-bored .x{all:unset;cursor:pointer;color:#6E675C;font-size:1.2rem;padding:0 4px;align-self:flex-start}" +
    "@media (max-width:560px){#qt-bored{inset-inline-end:84px;max-width:none;bottom:14px}}" +
    "@media print{#qt-rv,#qt-bored{display:none!important}}";
  document.head.appendChild(css);

  /* ---------------- review popup ---------------- */
  var open = null;
  function canAsk() {
    if (get("qt-rev-done")) return false;
    var snooze = +get("qt-rev-snooze") || 0; if (Date.now() < snooze) return false;
    if (sget("qt-rev-asked")) return false;
    if (document.getElementById("qt-lp") || document.getElementById("qt-rv")) return false;
    return true;
  }
  function pauseGame(on) { if (window.QTG) { if (on) { open.wasPaused = window.QTG.paused; window.QTG.paused = true; } else if (!(window.QTG.overlayOpen && window.QTG.overlayOpen())) window.QTG.paused = !!open.wasPaused; } }
  var WORDS = AR ? ["", "سيئة", "مقبولة", "جيدة", "ممتازة", "رائعة جداً!"] : ["", "Poor", "Okay", "Good", "Great", "Excellent!"];
  function ask(source, force) {
    if (!force && !canAsk()) return false;
    sset("qt-rev-asked", "1");
    var what = source === "game" ? L("our games", "ألعابنا") : source === "tool" ? L("our free tools", "أدواتنا المجانية") : L("Queen Tech", "كوين تك");
    var d = document.createElement("div"); d.id = "qt-rv"; d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true"); d.setAttribute("translate", "no");
    d.setAttribute("aria-label", L("Rate Queen Tech", "قيّم كوين تك"));
    d.innerHTML = '<div class="bx"><button class="x" type="button" aria-label="' + L("Close", "إغلاق") + '">×</button>' +
      '<div class="step1"><h3>' + L("How do you like ", "إيه رأيك في ") + esc(what) + L("?", "؟") + '</h3>' +
      '<p>' + L("Tap the stars. It takes 10 seconds and helps us a lot.", "اضغط على النجوم. تاخد ١٠ ثواني وبتفرق معانا كتير.") + '</p>' +
      '<div class="stars" role="radiogroup" aria-label="' + L("Rating", "التقييم") + '">' +
      [1, 2, 3, 4, 5].map(function (n) { return '<button type="button" role="radio" aria-checked="false" data-n="' + n + '" aria-label="' + n + '">★</button>'; }).join("") + '</div>' +
      '<div class="lab" aria-live="polite"></div></div>' +
      '<div class="step2" hidden>' +
      '<textarea maxlength="500" placeholder="' + L("What did you like? What can we do better? (optional)", "إيه اللي عجبك؟ وإيه اللي نقدر نحسّنه؟ (اختياري)") + '"></textarea>' +
      '<input type="text" maxlength="40" autocomplete="name" placeholder="' + L("Your name (optional)", "اسمك (اختياري)") + '">' +
      '<div class="acts"><button class="g" type="button" data-a="google">⭐ ' + L("Post it on Google", "انشره على جوجل") + '</button>' +
      '<button class="w" type="button" data-a="wa">' + L("Send it to us on WhatsApp", "ابعته لنا على واتساب") + '</button>' +
      '<button class="n" type="button" data-a="later">' + L("Not now", "مش دلوقتي") + '</button></div>' +
      '<p style="font-size:.78rem;margin-top:10px">' + L("Google: your text is copied, just paste it and tap Post.", "جوجل: بننسخ كلامك تلقائياً، الصقه واضغط نشر.") + '</p></div>' +
      '<div class="step3" hidden><div class="ok">🙏</div><h3>' + L("Thank you!", "شكراً لك!") + '</h3><p>' + L("Your feedback helps us serve Dubai and Abu Dhabi better.", "رأيك يساعدنا نخدم دبي وأبوظبي بشكل أفضل.") + '</p>' +
      '<div class="acts"><button class="n" type="button" data-a="close">' + L("Close", "إغلاق") + '</button></div></div></div>';
    document.body.appendChild(d);
    open = { el: d, stars: 0, source: source };
    pauseGame(true);
    var lab = d.querySelector(".lab"), bs = d.querySelectorAll(".stars button");
    function paint(n) { bs.forEach(function (b, i) { b.classList.toggle("on", i < n); b.setAttribute("aria-checked", i === n - 1 ? "true" : "false"); }); lab.textContent = WORDS[n] || ""; }
    bs.forEach(function (b) {
      var n = +b.getAttribute("data-n");
      b.addEventListener("mouseenter", function () { paint(n); });
      b.addEventListener("mouseleave", function () { paint(open ? open.stars : 0); });
      b.addEventListener("click", function () { open.stars = n; paint(n); d.querySelector(".step2").hidden = false; setTimeout(function () { d.querySelector("textarea").focus(); }, 30); });
    });
    setTimeout(function () { bs[4].focus(); }, 40);
    function text() {
      var c = d.querySelector("textarea").value.trim(), nm = d.querySelector("input").value.trim();
      return { c: c, nm: nm };
    }
    function finish() { set("qt-rev-done", String(Date.now())); d.querySelector(".step1").hidden = true; d.querySelector(".step2").hidden = true; d.querySelector(".step3").hidden = false; }
    function close(snoozeDays) { if (snoozeDays) set("qt-rev-snooze", String(Date.now() + snoozeDays * DAY)); d.remove(); pauseGame(false); open = null; document.removeEventListener("keydown", key); }
    function key(e) { if (e.key === "Escape") close(7); }
    document.addEventListener("keydown", key);
    d.addEventListener("click", function (e) {
      if (e.target === d) { close(7); return; }
      var b = e.target.closest("[data-a],.x"); if (!b) return;
      var a = b.classList.contains("x") ? "later" : b.getAttribute("data-a"), x = text();
      if (a === "later") close(14);
      else if (a === "close") close(0);
      else if (a === "google") {
        var body = x.c || (open.stars >= 4 ? L("Great service from Queen Tech Solutions.", "خدمة ممتازة من كوين تك للحلول التقنية.") : "");
        try { if (body && navigator.clipboard) navigator.clipboard.writeText(body); } catch (err) {}
        window.open(REVIEW, "_blank", "noopener"); finish();
      } else if (a === "wa") {
        var stars = "★★★★★".slice(0, open.stars) + "☆☆☆☆☆".slice(0, 5 - open.stars);
        var lines = [L("Hello Queen Tech, my feedback:", "مرحباً كوين تك، هذا رأيي:"), stars + " (" + open.stars + "/5) · " + (open.source === "game" ? L("Games", "الألعاب") : open.source === "tool" ? L("Free tools", "الأدوات المجانية") : L("Website", "الموقع"))];
        if (x.c) lines.push(x.c); if (x.nm) lines.push("— " + x.nm);
        window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener"); finish();
      }
    });
    return true;
  }
  window.QTReview = { ask: ask };

  /* free tools: ask after real use (1 minute and a few interactions) */
  if (/^\/(bandwidth|boq|price|tech|boards)\.html$/.test(path)) {
    var acts = 0, t0 = Date.now();
    var onAct = function (e) {
      if (e.target.closest && e.target.closest("header,#qa,#qt-rv,#qt-bored,#qt-lp")) return;
      acts++;
      if (acts >= 6 && Date.now() - t0 > 60000) { document.removeEventListener("change", onAct, true); document.removeEventListener("click", onAct, true); setTimeout(function () { ask("tool"); }, 1500); }
    };
    document.addEventListener("change", onAct, true); document.addEventListener("click", onAct, true);
  }

  /* ---------------- "feeling bored?" arcade invite ---------------- */
  function bored() {
    if (/^\/(games|boq|account|offline)/.test(path) || /^\/games/.test(path)) return;
    if (get("qt-arcade-seen")) return;
    if (Date.now() < (+get("qt-bored-at") || 0) + 3 * DAY) return;
    var shown = false;
    function show() {
      if (shown || document.getElementById("qt-rv") || document.getElementById("qt-lp")) return;
      var qa = document.getElementById("qa"); if (qa && !qa.hidden) return;
      shown = true; set("qt-bored-at", String(Date.now()));
      var b = document.createElement("div"); b.id = "qt-bored"; b.setAttribute("role", "status"); b.setAttribute("translate", "no");
      b.innerHTML = '<span class="e" aria-hidden="true">😴</span><span><b>' + L("Feeling bored?", "زهقان؟") + '</b><small>' + L("Play our free games 🎮 no download", "العب ألعابنا المجانية 🎮 بدون تحميل") + '</small></span>' +
        '<a href="/games.html">' + L("Play", "العب") + '</a><button class="x" type="button" aria-label="' + L("Close", "إغلاق") + '">×</button>';
      document.body.appendChild(b);
      b.querySelector(".x").onclick = function () { b.remove(); };
      setTimeout(function () { if (b.parentNode) b.remove(); }, 20000);
    }
    setTimeout(show, 35000);
    var onScroll = function () {
      var h = document.documentElement, p = (h.scrollTop + innerHeight) / h.scrollHeight;
      if (p > 0.65 && performance.now() > 12000) { removeEventListener("scroll", onScroll); show(); }
    };
    addEventListener("scroll", onScroll, { passive: true });
  }
  bored();
})();
