/* Cable Swing – drawing, menus and best score (physics in cable-engine.js). */
(function () {
  "use strict";
  var G = window.QTG, C = window.CableEngine, t = G.t, K = G.keys;
  var cv = document.getElementById("game"); G.setup(cv);
  var ctx = G.cx, H = C.H;
  G.holdArea(document.getElementById("stage"));

  var best = G.load("cable", { best: 0, crowns: 0 });
  /* Missions: a ladder of 20 goals so the endless game has "levels". Progress saved in qtg-cablemis. */
  var MIS = [["m", 50], ["c", 1], ["m", 100], ["c", 3], ["b", 1], ["m", 150], ["g", 20], ["c", 5], ["m", 200], ["b", 2],
             ["m", 300], ["c", 8], ["g", 50], ["m", 400], ["c", 12], ["m", 500], ["t", 50], ["m", 700], ["c", 20], ["m", 1000]];
  var mis = G.load("cablemis", { i: 0, total: 0 }), run = { g: 0, b: 0 };
  function misText(i) {
    var m = MIS[i]; if (!m) return G.ar ? "خلّصت كل المهمات! 🏆" : "All missions done! 🏆";
    var n = m[1];
    if (m[0] === "m") return G.ar ? "وصّل " + n + " متر" : "Reach " + n + " m";
    if (m[0] === "c") return n === 1 ? (G.ar ? "اجمع تاج واحد" : "Collect 1 crown") : (G.ar ? "اجمع " + n + " تيجان في محاولة واحدة" : "Collect " + n + " crowns in one run");
    if (m[0] === "b") return n === 1 ? (G.ar ? "انط على لوح ذهبي" : "Bounce on a gold pad") : (G.ar ? "انط " + n + " مرات على الألواح في محاولة واحدة" : "Bounce " + n + " times in one run");
    if (m[0] === "g") return G.ar ? "امسك " + n + " خطاف في محاولة واحدة" : "Grab " + n + " hooks in one run";
    return G.ar ? "اجمع " + n + " تاج في كل المحاولات" : "Collect " + n + " crowns in total";
  }
  function misLabel() { return (G.ar ? "مهمة " : "Mission ") + Math.min(MIS.length, mis.i + 1) + "/" + MIS.length; }
  function misValue(m) {
    if (m[0] === "m") return C.meters(st); if (m[0] === "c") return st.crownsGot; if (m[0] === "b") return run.b;
    if (m[0] === "g") return run.g; return mis.total + st.crownsGot;
  }
  function misCheck() {
    var done = 0;
    while (st && MIS[mis.i] && misValue(MIS[mis.i]) >= MIS[mis.i][1]) {
      done++; G.toast("🎯 " + misLabel() + " ✓ " + misText(mis.i), 1800); mis.i++;
    }
    if (done) { G.sfx("win"); G.save("cablemis", mis); hud(); }
  }
  var st = null, playing = false, parts = [], trail = [], frame = 0, deadT = 0, shake = 0, cam = { s: 1, x: 0, y: 0, vw: 800, vh: 600 };
  var stars = [], city1 = [], city2 = [];
  (function scenery() {
    var r = Math.random;
    for (var i = 0; i < 90; i++) stars.push({ x: r() * 2400, y: -900 + r() * 1300, s: r() < 0.15 ? 2 : 1, a: 0.25 + r() * 0.5 });
    var x = 0; while (x < 2400) { var w = 60 + r() * 90; city1.push({ x: x, w: w, h: 120 + r() * 200, win: r() }); x += w + 6 + r() * 20; }
    x = 0; while (x < 2400) { w = 40 + r() * 70; city2.push({ x: x, w: w, h: 60 + r() * 130 }); x += w + 4 + r() * 14; }
  })();

  function hud() {
    G.hud("hDist", st ? C.meters(st) + " m" : "0 m");
    G.hud("hCrowns", st ? st.crownsGot : 0);
    G.hud("hBest", best.best + " m");
    G.hud("hMis", Math.min(MIS.length, mis.i + 1) + "/" + MIS.length);
  }
  function newRun() {
    st = C.create((Math.random() * 1e9) | 0 || 7); playing = true; parts = []; trail = []; deadT = 0; hud();
    run = { g: 0, b: 0 };
    G.hideOverlay(); G.toast((MIS[mis.i] ? "🎯 " + misText(mis.i) + " · " : "") + (G.touch ? t("Tap and hold to launch") : t("Hold Space or the mouse to launch")), 2600);
  }
  function menu() {
    playing = false;
    G.overlay('<span class="k">' + t("Queen Tech Arcade") + '</span><h2>Cable Swing</h2>' +
      '<p>' + t("Hold to grab the nearest hook, let go to fly. Don't touch the live cables on the floor. How far can you go?") + '</p>' +
      '<div class="how">' + (G.touch ? '<div><kbd>👆</kbd><span>' + t("Hold anywhere: grab a hook") + '</span></div><div><kbd>✋</kbd><span>' + t("Let go: fly") + '</span></div>'
        : '<div><kbd>Space</kbd><kbd>🖱</kbd><span>' + t("Hold: grab a hook") + '</span></div><div><kbd>↑</kbd><span>' + t("Let go: fly") + '</span></div>') +
      '<div><kbd>👑</kbd><span>' + t("Collect crowns, bounce on the gold pads") + '</span></div></div>' +
      '<p class="mis">🎯 <b>' + misLabel() + '</b> · ' + misText(mis.i) + '</p>' +
      (best.best ? '<div class="stats"><div><b>' + best.best + '</b><small>' + t("Best distance (m)") + '</small></div></div>' : '') +
      '<div class="btns"><button class="go" data-a="play">' + t("Play") + '</button><a class="b" href="/games.html">' + t("More games") + '</a></div>');
  }
  var plays = 0;
  function gameOver() {
    playing = false; plays++;
    if (plays >= 2 && window.QTReview) setTimeout(function () { window.QTReview.ask("game"); }, 1600);
    var m = C.meters(st), isBest = m > best.best;
    misCheck(); mis.total += st.crownsGot; G.save("cablemis", mis);
    if (isBest) best.best = m; best.crowns = Math.max(best.crowns, st.crownsGot); G.save("cable", best); hud();
    var msg = G.ar ? "وصلت " + m + " متر في Cable Swing على كوين تك! تقدر تكسر رقمي؟" : "I swung " + m + " m in Cable Swing on Queen Tech! Can you beat it?";
    G.overlay('<span class="k">' + t("Zapped!") + '</span><h2>' + m + ' m</h2>' +
      '<div class="stats"><div><b>' + st.crownsGot + '</b><small>' + t("Crowns") + '</small></div><div><b>' + best.best + '</b><small>' + t("Best distance (m)") + '</small></div></div>' +
      (isBest && m > 0 ? '<p>⭐ ' + t("New personal best!") + '</p>' : '') +
      '<p class="mis">🎯 <b>' + misLabel() + '</b> · ' + misText(mis.i) + '</p>' +
      '<div class="btns"><button class="go" data-a="play">' + t("Play again") + '</button>' +
      '<a class="b wa" href="' + G.shareLink(msg) + '" target="_blank" rel="noopener">' + t("Challenge a friend on WhatsApp") + '</a>' +
      '<a class="b" href="/games.html">' + t("More games") + '</a>' + G.reviewBtn() + '</div>' +
      '<p class="promo">' + t("Need cables done properly? We install networks and Wi-Fi.") + ' <a href="/services.html">' + t("Our services") + ' →</a></p>');
  }
  document.getElementById("ov").addEventListener("click", function (e) {
    var b = e.target.closest("[data-a]"); if (!b) return;
    if (b.getAttribute("data-a") === "play") { if (st && st.dead) { G.hideOverlay(); G.adBreak("cable_replay", newRun); } else newRun(); }
    else if (b.getAttribute("data-a") === "resume") G.hideOverlay();
    else if (b.getAttribute("data-a") === "menu") menu();
  });
  G.onenter = function () { if (G.overlayOpen()) { var b = document.querySelector("#ov button.go"); if (b) b.click(); } };
  G.onrestart = function () { if (!G.overlayOpen()) newRun(); };
  G.oncloud = function () { hud(); if (!playing) menu(); };
  G.onpause = function () {
    if (!playing) return;
    if (G.overlayOpen()) { G.hideOverlay(); return; }
    G.overlay('<span class="k">' + t("Paused") + '</span><h2>Cable Swing</h2><div class="btns"><button class="go" data-a="resume">' + t("Resume") + '</button><button data-a="play">' + t("Restart") + '</button><button data-a="menu">' + t("Menu") + '</button></div>');
  };
  G.onhide = function () { if (playing && !G.overlayOpen() && st && st.started) G.onpause(); };

  function burst(x, y, n, cols, sp) {
    for (var i = 0; i < n; i++) { var a = Math.random() * 6.283, v = sp * (0.3 + Math.random()); parts.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 0.4 + Math.random() * 0.6, c: cols[i % cols.length] }); }
  }
  function update() {
    frame++;
    for (var i = parts.length - 1; i >= 0; i--) { var q = parts[i]; q.life -= C.DT; q.vy += 600 * C.DT; q.x += q.vx * C.DT; q.y += q.vy * C.DT; if (q.life <= 0) parts.splice(i, 1); }
    shake *= 0.85;
    if (!st || !playing) return;
    if (st.dead) { deadT -= C.DT; if (deadT <= 0) gameOver(); return; }
    C.step(st, !!K.hold);
    var p = st.p;
    if (st.started && frame % 2 === 0) { trail.push({ x: p.x, y: p.y }); if (trail.length > 18) trail.shift(); }
    st.ev.forEach(function (e) {
      if (e === "grab") { G.sfx("grab"); run.g++; }
      else if (e === "launch") G.sfx("jump");
      else if (e === "crown") { G.sfx("coin"); burst(p.x, p.y, 10, ["#E2A63F", "#F3C877"], 160); }
      else if (e === "bounce") { run.b++; G.sfx("bounce"); shake = 5; burst(p.x, C.FLOOR, 12, ["#E2A63F", "#EFE8DB"], 180); }
      else if (e === "die") { G.sfx("die"); G.buzz(80); shake = 12; deadT = 0.9; burst(p.x, p.y, 34, ["#5FC8E8", "#EFE8DB", "#E2A63F"], 260); }
    });
    st.ev.length = 0;
    if (frame % 6 === 0) { hud(); if (!st.dead) misCheck(); }
  }

  function layout() {
    var s = Math.min(G.h / H, G.w / 520);
    cam.s = s; cam.vw = G.w / s; cam.vh = G.h / s;
  }
  G.onresize = layout;

  function crownPath(x, y, k) {
    ctx.beginPath();
    ctx.moveTo(x - 10 * k, y + 5 * k); ctx.lineTo(x - 8 * k, y - 6 * k); ctx.lineTo(x - 3 * k, y - 1 * k); ctx.lineTo(x, y - 8 * k);
    ctx.lineTo(x + 3 * k, y - 1 * k); ctx.lineTo(x + 8 * k, y - 6 * k); ctx.lineTo(x + 10 * k, y + 5 * k); ctx.closePath();
  }
  function render() {
    var dpr = G.dpr || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    var g = ctx.createLinearGradient(0, 0, 0, cv.height); g.addColorStop(0, "#0b0a09"); g.addColorStop(1, "#1d1912");
    ctx.fillStyle = g; ctx.fillRect(0, 0, cv.width, cv.height);
    if (!st) return;
    if (!cam.s) layout();
    var s = cam.s, px = st.p.x, target = px - cam.vw * 0.33;
    cam.x += (target - cam.x) * 0.14; if (!st.started) cam.x = target;
    cam.y = H - cam.vh;
    var sh = shake > 0.4 ? (Math.random() - 0.5) * shake : 0;
    function view(par) { ctx.setTransform(dpr * s, 0, 0, dpr * s, dpr * (-cam.x * par * s + sh), dpr * (-cam.y * s)); }
    // stars + skyline (parallax)
    view(0.08);
    stars.forEach(function (o) { var x = ((o.x - cam.x * 0.08) % 2400 + 2400) % 2400 + cam.x * 0.08; ctx.globalAlpha = o.a * (0.7 + 0.3 * Math.sin(frame * 0.03 + o.x)); ctx.fillStyle = "#EFE8DB"; ctx.fillRect(x, o.y, o.s, o.s); });
    ctx.globalAlpha = 1;
    view(0.25);
    city1.forEach(function (b) {
      var x = b.x + Math.floor((cam.x * 0.25 - b.x + 400) / 2400) * 2400; if (x > cam.x * 0.25 + cam.vw + 200) x -= 2400;
      ctx.fillStyle = "#1a1813"; ctx.fillRect(x, C.FLOOR - b.h, b.w, b.h);
      ctx.fillStyle = "rgba(226,166,63,.18)";
      for (var wy = C.FLOOR - b.h + 12; wy < C.FLOOR - 20; wy += 18) for (var wx = x + 8; wx < x + b.w - 8; wx += 14) if (((wx * 7 + wy * 13 + b.win * 100) | 0) % 5 === 0) ctx.fillRect(wx, wy, 5, 7);
    });
    view(0.5);
    city2.forEach(function (b) { var x = b.x + Math.floor((cam.x * 0.5 - b.x + 300) / 2400) * 2400; ctx.fillStyle = "#13110e"; ctx.fillRect(x, C.FLOOR - b.h, b.w, b.h); });
    // world
    view(1);
    var x0 = cam.x - 40, x1 = cam.x + cam.vw + 40;
    // live cables floor
    ctx.fillStyle = "#0e0d0b"; ctx.fillRect(x0, C.FLOOR, x1 - x0, 80);
    ctx.strokeStyle = "rgba(95,200,232,.85)"; ctx.lineWidth = 2; ctx.beginPath();
    for (var x = Math.floor(x0 / 16) * 16; x < x1; x += 16) { var y = C.FLOOR + 6 + ((x / 16 + frame) % 3 === 0 ? -5 : 3) * (Math.sin(frame * 0.5 + x) > 0 ? 1 : 0.4); if (x === Math.floor(x0 / 16) * 16) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
    ctx.stroke();
    ctx.fillStyle = "rgba(95,200,232,.08)"; ctx.fillRect(x0, C.FLOOR - 14, x1 - x0, 14);
    // pads
    st.pads.forEach(function (pd) {
      if (pd.x + pd.w < x0 || pd.x > x1) return;
      ctx.fillStyle = "#2a2620"; ctx.fillRect(pd.x, C.FLOOR - 6, pd.w, 26);
      ctx.fillStyle = "#E2A63F"; ctx.fillRect(pd.x, C.FLOOR - 10, pd.w, 6);
      ctx.strokeStyle = "#F3C877"; ctx.lineWidth = 2; ctx.beginPath();
      for (var k = 0; k <= pd.w; k += 12) ctx.lineTo(pd.x + k, C.FLOOR - 2 + (k / 12 % 2 ? 8 : 0)); ctx.stroke();
    });
    // start platform
    if (cam.x < 200) { ctx.fillStyle = "#24211c"; ctx.fillRect(0, 420, 140, C.FLOOR - 420); ctx.fillStyle = "#E2A63F"; ctx.fillRect(0, 420, 140, 4); }
    // aim hint: hook you would grab now
    var tg = st.started && !st.hook ? C.target(st) : null;
    // hooks
    st.hooks.forEach(function (h) {
      if (h.x < x0 || h.x > x1) return;
      ctx.strokeStyle = "rgba(239,232,219,.15)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(h.x, cam.y - 20); ctx.lineTo(h.x, h.y - 10); ctx.stroke();
      if (h === tg) { ctx.strokeStyle = "rgba(243,200,119," + (0.35 + 0.25 * Math.sin(frame * 0.25)) + ")"; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(h.x, h.y, 18, 0, 7); ctx.stroke(); }
      ctx.strokeStyle = h === st.hook ? "#F3C877" : "#E2A63F"; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(h.x, h.y, 9, 0, 7); ctx.stroke();
    });
    // crowns
    st.crowns.forEach(function (k) {
      if (k.got || k.x < x0 || k.x > x1) return;
      var bob = Math.sin(frame * 0.08 + k.x) * 4;
      ctx.fillStyle = "#E2A63F"; crownPath(k.x, k.y + bob, 1); ctx.fill();
      ctx.fillStyle = "#F3C877"; ctx.fillRect(k.x - 10, k.y + bob + 6, 20, 3);
    });
    // rope
    var p = st.p;
    if (st.hook) { ctx.strokeStyle = "#E2A63F"; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(st.hook.x, st.hook.y); ctx.lineTo(p.x, p.y); ctx.stroke(); }
    // trail
    trail.forEach(function (q, i) { ctx.globalAlpha = i / trail.length * 0.35; ctx.fillStyle = "#E2A63F"; ctx.beginPath(); ctx.arc(q.x, q.y, 3 + i * 0.25, 0, 7); ctx.fill(); });
    ctx.globalAlpha = 1;
    // player (round bot)
    if (!st.dead) {
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a);
      ctx.fillStyle = "#EFE8DB"; ctx.beginPath(); ctx.arc(0, 0, C.R, 0, 7); ctx.fill();
      ctx.fillStyle = "#131210"; ctx.fillRect(-8, -5, 16, 7);
      ctx.fillStyle = "#E2A63F"; ctx.fillRect(2, -4, 4, 4);
      ctx.strokeStyle = "#EFE8DB"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -C.R); ctx.lineTo(0, -C.R - 6); ctx.stroke();
      ctx.fillStyle = "#E2A63F"; ctx.beginPath(); ctx.arc(0, -C.R - 7, 2.5, 0, 7); ctx.fill();
      ctx.restore();
    }
    parts.forEach(function (q) { ctx.globalAlpha = Math.max(0, Math.min(1, q.life * 2)); ctx.fillStyle = q.c; ctx.fillRect(q.x, q.y, 3, 3); });
    ctx.globalAlpha = 1;
    // distance markers every 50 m
    ctx.fillStyle = "rgba(239,232,219,.25)"; ctx.font = "600 12px system-ui,sans-serif"; ctx.textAlign = "center";
    for (var mx = Math.ceil((x0 - st.startX) / 2000) * 2000 + st.startX; mx < x1; mx += 2000) { if (mx <= st.startX) continue; ctx.fillRect(mx - 1, C.FLOOR - 60, 2, 46); ctx.fillText(Math.round((mx - st.startX) / 40) + " m", mx, C.FLOOR - 66); }
    if (!st.started) {
      ctx.fillStyle = "rgba(243,200,119," + (0.6 + 0.4 * Math.sin(frame * 0.12)) + ")"; ctx.font = "700 15px system-ui,sans-serif";
      ctx.fillText("▶", p.x + 26, p.y - 18);
    }
  }

  hud(); menu();
  G.run(update, render);
  window.__cable = { state: function () { return st; }, best: best, mis: mis, MIS: MIS };
})();
