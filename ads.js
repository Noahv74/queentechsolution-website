/* Queen Tech – game ads helper for Google AdSense (publisher ID in site-config.js; the AdSense tag is in each page's <head>).
   Loads only on the pages listed in QT_SITE.adsPages (default: the arcade), never on service, price or contact pages.
   Gives the games Google's Ad Placement API (adBreak / adConfig) for ads between levels and opt-in rewarded ads.
   Test mode: add ?adtest=1 to a game URL (Google shows test ads, no money involved). */
(function () {
  "use strict";
  if (window.QT_ADS) return;
  window.QT_ADS = { on: false };
  function start() {
    var S = window.QT_SITE || {}, id = String(S.adsClient || "").trim();
    if (!/^ca-pub-\d{10,20}$/.test(id)) return;
    var path = location.pathname, pages = S.adsPages || ["/games.html", "/games/"];
    if (!pages.some(function (p) { return p.slice(-1) === "/" ? path.indexOf(p) === 0 : path === p; })) return;
    if (document.documentElement.classList.contains("qt-app") && S.adsInApp === false) return;
    window.adsbygoogle = window.adsbygoogle || [];
    window.adBreak = window.adConfig = function (o) { window.adsbygoogle.push(o); };
    var have = document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');
    if (have) { have.addEventListener("error", function () { window.QT_ADS.on = false; window.QT_ADS.blocked = true; }); }
    else {
    var s = document.createElement("script");
    s.async = true; s.crossOrigin = "anonymous";
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(id);
    s.setAttribute("data-ad-client", id);
    s.setAttribute("data-ad-frequency-hint", S.adsFrequency || "120s");
    if (/[?&]adtest=1\b/.test(location.search)) s.setAttribute("data-adbreak-test", "on");
    s.onerror = function () { window.QT_ADS.on = false; window.QT_ADS.blocked = true; };
    document.head.appendChild(s);
    }
    var muted = false; try { muted = JSON.parse(localStorage.getItem("qtg-muted") || "false"); } catch (e) {}
    window.adConfig({ preloadAdBreaks: "on", sound: muted ? "off" : "on" });
    window.QT_ADS.on = true; window.QT_ADS.client = id;
    /* display units: <div data-ad-slot-name="arcade"></div> + QT_SITE.adSlots.arcade = "1234567890" */
    var slots = S.adSlots || {};
    document.querySelectorAll("[data-ad-slot-name]").forEach(function (el) {
      var slot = slots[el.getAttribute("data-ad-slot-name")]; if (!slot) return;
      el.hidden = false; el.classList.add("on");
      el.innerHTML = '<span class="ad-lbl">' + (document.documentElement.lang === "ar" ? "إعلان" : "Advertisement") + '</span><ins class="adsbygoogle" style="display:block" data-ad-client="' + id + '" data-ad-slot="' + slot + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
      try { window.adsbygoogle.push({}); } catch (e) {}
    });
  }
  function boot() {
    if (window.QT_SITE) return start();
    var c = document.createElement("script"); c.src = "/site-config.js"; c.onload = start; document.head.appendChild(c);
  }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", boot) : boot();
})();
