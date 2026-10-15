/* Queen Tech Arcade – shared helpers for every game page:
   canvas sizing, fixed 60 Hz loop, keyboard + touch input, sound, overlays, saved progress, WhatsApp challenge. */
(function () {
  "use strict";
  var t = window.t || function (s) { return s; };
  var G = window.QTG = { t: t, ar: (window.QT_LANG || document.documentElement.lang) === "ar", paused: false };
  G.touch = ("ontouchstart" in window) || navigator.maxTouchPoints > 0;
  if (G.touch) document.documentElement.classList.add("touch");

  /* ---------- saved data ---------- */
  G.load = function (k, d) { try { var v = localStorage.getItem("qtg-" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } };
  G.save = function (k, v) { try { localStorage.setItem("qtg-" + k, JSON.stringify(v)); } catch (e) {} };

  /* ---------- sound (tiny synth, no files) ---------- */
  var ac = null;
  G.muted = G.load("muted", false);
  function tone(f, d, type, vol, to) {
    var o = ac.createOscillator(), g = ac.createGain(), n = ac.currentTime;
    o.type = type; o.frequency.setValueAtTime(f, n);
    if (to) o.frequency.exponentialRampToValueAtTime(to, n + d);
    g.gain.setValueAtTime(vol, n); g.gain.exponentialRampToValueAtTime(0.0001, n + d);
    o.connect(g); g.connect(ac.destination); o.start(n); o.stop(n + d + 0.02);
  }
  G.sfx = function (name) {
    if (G.muted) return;
    try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === "suspended") ac.resume(); } catch (e) { return; }
    switch (name) {
      case "jump": tone(420, 0.1, "square", 0.04, 720); break;
      case "die": tone(260, 0.38, "sawtooth", 0.06, 60); break;
      case "win": [523, 659, 784, 1046].forEach(function (f, i) { setTimeout(function () { tone(f, 0.14, "triangle", 0.07); }, i * 85); }); break;
      case "grab": tone(760, 0.05, "square", 0.035, 980); break;
      case "coin": tone(988, 0.07, "square", 0.045, 1480); break;
      case "alarm": tone(900, 0.22, "square", 0.05, 450); setTimeout(function () { tone(900, 0.22, "square", 0.05, 450); }, 240); break;
      case "tick": tone(1500, 0.03, "square", 0.025); break;
      case "pop": tone(240, 0.08, "triangle", 0.07, 620); break;
      case "slam": tone(110, 0.22, "sawtooth", 0.07, 40); break;
      case "bounce": tone(300, 0.14, "triangle", 0.07, 900); break;
      case "step": tone(180, 0.03, "triangle", 0.03); break;
    }
  };
  G.buzz = function (ms) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) {} };

  /* ---------- canvas ---------- */
  G.setup = function (canvas) {
    G.cv = canvas; G.cx = canvas.getContext("2d");
    function rs() {
      var r = canvas.parentNode.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(r.width * dpr)); canvas.height = Math.max(1, Math.round(r.height * dpr));
      G.w = r.width; G.h = r.height; G.dpr = dpr;
      if (G.onresize) G.onresize();
    }
    window.addEventListener("resize", rs);
    window.addEventListener("orientationchange", function () { setTimeout(rs, 200); });
    rs(); setTimeout(rs, 120);
  };

  /* ---------- fixed-step loop ---------- */
  G.run = function (update, render) {
    var last = performance.now(), acc = 0;
    function frame(now) {
      var dt = Math.min(0.1, (now - last) / 1000); last = now;
      if (!G.paused) { acc += dt; var n = 0; while (acc >= 1 / 60 && n < 6) { update(); acc -= 1 / 60; n++; } if (n >= 6) acc = 0; }
      render();
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  };
  document.addEventListener("visibilitychange", function () { if (document.hidden && G.onhide) G.onhide(); });

  /* ---------- input ---------- */
  var K = G.keys = { l: 0, r: 0, j: 0, hold: 0 };
  var MAP = { ArrowLeft: "l", KeyA: "l", ArrowRight: "r", KeyD: "r", ArrowUp: "j", KeyW: "j", Space: "j", KeyZ: "j" };
  addEventListener("keydown", function (e) {
    if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    var k = MAP[e.code];
    if (k) { K[k] = 1; e.preventDefault(); }
    if (e.code === "Space" || e.code === "Enter" || e.code === "ArrowUp") { K.hold = 1; }
    if (e.code === "KeyR" && G.onrestart) G.onrestart();
    if ((e.code === "Escape" || e.code === "KeyP") && G.onpause) G.onpause();
    if (e.code === "Enter" && G.onenter) G.onenter();
  });
  addEventListener("keyup", function (e) {
    var k = MAP[e.code]; if (k) K[k] = 0;
    if (e.code === "Space" || e.code === "Enter" || e.code === "ArrowUp") K.hold = 0;
  });
  addEventListener("blur", function () { K.l = K.r = K.j = K.hold = 0; });
  document.querySelectorAll(".g-pad [data-k]").forEach(function (b) {
    var k = b.getAttribute("data-k");
    function on(e) { e.preventDefault(); K[k] = 1; b.classList.add("on"); try { b.setPointerCapture(e.pointerId); } catch (x) {} }
    function off() { K[k] = 0; b.classList.remove("on"); }
    b.addEventListener("pointerdown", on); b.addEventListener("pointerup", off); b.addEventListener("pointercancel", off); b.addEventListener("lostpointercapture", off);
    b.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  });
  /* hold anywhere on an element (one-button games) */
  G.holdArea = function (el) {
    var down = 0;
    el.addEventListener("pointerdown", function (e) { if (e.target.closest(".g-ov")) return; e.preventDefault(); down++; K.hold = 1; try { el.setPointerCapture(e.pointerId); } catch (x) {} });
    function up() { down = Math.max(0, down - 1); if (!down) K.hold = 0; }
    el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);
    el.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  };

  /* ---------- overlay, toast, hud ---------- */
  var ov = document.getElementById("ov"), toastEl = document.getElementById("toast"), toastTimer = 0;
  G.overlay = function (html) {
    ov.innerHTML = '<div class="g-card" role="dialog" aria-modal="true">' + html + "</div>"; ov.hidden = false; G.paused = true;
    var f = ov.querySelector("button.go") || ov.querySelector("button"); if (f) setTimeout(function () { f.focus(); }, 30);
    return ov;
  };
  G.hideOverlay = function () { ov.hidden = true; G.paused = false; K.l = K.r = K.j = K.hold = 0; };
  G.overlayOpen = function () { return !ov.hidden; };
  G.toast = function (text, ms) {
    if (!toastEl) return;
    toastEl.textContent = text; toastEl.classList.remove("off"); toastEl.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { toastEl.classList.add("off"); }, ms || 1600);
  };
  G.hud = function (id, v) { var e = document.getElementById(id); if (e && e.textContent !== String(v)) e.textContent = v; };
  G.esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  G.fmtTime = function (s) { s = Math.max(0, s); var m = Math.floor(s / 60), r = Math.floor(s % 60); return m + ":" + (r < 10 ? "0" : "") + r; };

  /* ---------- WhatsApp challenge ---------- */
  G.reviewUrl = "https://g.page/r/CXPWAzSYn864ECE/review";
  G.reviewBtn = function () { return '<a class="b" href="' + G.reviewUrl + '" target="_blank" rel="noopener">⭐ ' + t("Enjoyed it? Review us on Google") + "</a>"; };
  G.shareLink = function (text) {
    var url = location.origin + location.pathname;
    return "https://wa.me/?text=" + encodeURIComponent(text + "\n" + url);
  };

  /* ---------- top bar buttons ---------- */
  var mute = document.getElementById("mute");
  function paintMute() {
    if (!mute) return;
    mute.setAttribute("aria-pressed", G.muted ? "true" : "false");
    mute.setAttribute("aria-label", G.muted ? t("Sound off") : t("Sound on"));
    mute.innerHTML = G.muted
      ? '<svg viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="m22 9-6 6M16 9l6 6"/></svg>'
      : '<svg viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
  }
  if (mute) { paintMute(); mute.addEventListener("click", function () { G.muted = !G.muted; G.save("muted", G.muted); paintMute(); if (!G.muted) G.sfx("tick"); }); }
  var rst = document.getElementById("restart");
  if (rst) rst.addEventListener("click", function () { if (G.onrestart) G.onrestart(); });
  var pau = document.getElementById("pause");
  if (pau) pau.addEventListener("click", function () { if (G.onpause) G.onpause(); });
})();
