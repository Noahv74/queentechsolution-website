/* Glitch Run – drawing, menus and progress (game rules live in glitch-engine.js). */
(function () {
  "use strict";
  var G = window.QTG, E = window.GlitchEngine, t = G.t, K = G.keys;
  var W = E.W, H = E.H, T = E.T, N = E.LEVELS.length;
  var cv = document.getElementById("game"); G.setup(cv);
  var ctx = G.cx;

  var lvlDeaths = { l: -1, n: 0, offered: false };
  var data = G.load("glitch", { level: 0, deaths: 0, time: 0, best: null, bestTime: null, unlocked: 0 });
  var st = null, deadT = 0, winT = 0, parts = [], shakeA = 0, flash = 0, frame = 0, playing = false, landSquash = 0, wasGround = true;
  var cam = { s: 1, x: 0, ox: 0, oy: 0 };

  function persist() { G.save("glitch", data); }
  /* every 20 levels the building changes colour */
  var WORLDS = [["Lobby", "الاستقبال", "#E2A63F"], ["Basement", "البدروم", "#5FC8A0"], ["Server room", "غرفة السيرفرات", "#5FC8E8"], ["Rooftop", "السطح", "#E25B45"], ["The Core", "القلب", "#B79BF2"]];
  function world(i) { return WORLDS[Math.min(WORLDS.length - 1, Math.floor(i / 20))]; }
  var ACC = "#E2A63F";
  function hud() {
    G.hud("hLvl", Math.min(N, data.level + 1) + "/" + N);
    G.hud("hDeaths", st ? st.deaths : data.deaths);
  }
  function start(level) {
    if (level !== lvlDeaths.l) lvlDeaths = { l: level, n: 0, offered: false };
    st = E.create(level, data.deaths); deadT = 0; winT = 0; parts = []; wasGround = true;
    playing = true; hud();
    ACC = world(level)[2];
    var Lv = E.LEVELS[level], tags = (Lv.rev ? " ⇄" : "") + (Lv.moon ? " 🌙" : "") + (Lv.rise ? " ⚡" : "");
    G.toast((level % 20 === 0 ? (G.ar ? world(level)[1] : world(level)[0]) + " · " : "") + t("Level") + " " + (level + 1) + " · " + t(Lv.hint) + tags, 2400);
  }
  function burst(x, y, n, colors, spd) {
    for (var i = 0; i < n; i++) {
      var a = Math.random() * Math.PI * 2, v = (spd || 160) * (0.4 + Math.random());
      parts.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 60, life: 0.5 + Math.random() * 0.5, c: colors[i % colors.length], s: 2 + Math.random() * 3 });
    }
  }

  /* ---------- menus ---------- */
  function how() {
    return '<div class="how">' +
      (G.touch ? '<div><kbd>◀ ▶</kbd><span>' + t("Move") + '</span></div><div><kbd>▲</kbd><span>' + t("Jump (hold for higher)") + '</span></div>'
               : '<div><kbd>← →</kbd><kbd>A D</kbd><span>' + t("Move") + '</span></div><div><kbd>↑</kbd><kbd>Space</kbd><span>' + t("Jump (hold for higher)") + '</span></div><div><kbd>R</kbd><span>' + t("Restart level") + '</span></div>') +
      '</div>';
  }
  function menu() {
    playing = false;
    var cont = data.level > 0 && data.level < N;
    var html = '<span class="k">' + t("Queen Tech Arcade") + '</span><h2>Glitch Run</h2>' +
      '<p>' + t("The building's floor is glitching. Reach the exit door in 100 levels. Nothing is what it seems.") + '</p>' + how() + G.jumpSetting() +
      (data.best != null ? '<div class="stats"><div><b>' + data.best + '</b><small>' + t("Best: deaths") + '</small></div><div><b>' + G.fmtTime(data.bestTime || 0) + '</b><small>' + t("Best time") + '</small></div></div>' : '') +
      '<div class="btns">' +
      (cont ? '<button class="go" data-a="cont">' + t("Continue") + " · " + t("Level") + " " + (data.level + 1) + '</button><button data-a="new">' + t("New game") + '</button>'
            : '<button class="go" data-a="new">' + t("Play") + '</button>') +
      (data.unlocked > 0 ? '<button data-a="levels">' + t("Choose level") + '</button>' : '') +
      '<a class="b" href="/games.html">' + t("More games") + '</a></div>';
    G.overlay(html);
  }
  function levelsMenu() {
    var h = '<span class="k">' + t("Choose level") + '</span><h2>Glitch Run</h2><div class="lvls">';
    for (var i = 0; i < N; i++) {
      if (i % 20 === 0) h += '<div class="lw" style="color:' + world(i)[2] + '">' + (G.ar ? world(i)[1] : world(i)[0]) + '</div>';
      var open = i <= data.unlocked;
      h += '<button ' + (open ? 'data-lv="' + i + '"' : 'disabled') + (i === data.level ? ' class="cur"' : '') + ' style="--w:' + world(i)[2] + '">' + (open ? i + 1 : '🔒') + '</button>';
    }
    G.overlay(h + '</div><div class="btns"><button data-a="menu">' + t("Back") + '</button></div>');
    var cur = document.querySelector(".lvls .cur"); if (cur) cur.scrollIntoView({ block: "center" });
  }
  function pauseMenu() {
    if (!playing || G.overlayOpen()) return;
    G.overlay('<span class="k">' + t("Paused") + '</span><h2>Glitch Run</h2><div class="btns"><button class="go" data-a="resume">' + t("Resume") + '</button><button data-a="retry">' + t("Restart level") + '</button><button data-a="menu">' + t("Menu") + '</button></div>' + G.jumpSetting());
  }
  function finish() {
    playing = false;
    var deaths = st.deaths, time = data.time, full = data.full !== false, newBest = full && (data.best == null || deaths < data.best);
    if (newBest) { data.best = deaths; data.bestTime = time; }
    data.full = true;
    data.level = 0; data.deaths = 0; data.time = 0; persist();
    var msg = (G.ar ? "خلصت Glitch Run في كوين تك بـ " + deaths + " موتة! تقدر تعمل أحسن؟" : "I escaped Glitch Run on Queen Tech with " + deaths + " deaths! Can you beat that?");
    G.overlay('<span class="k">' + t("You escaped!") + '</span><h2>' + t("Building cleared") + '</h2>' +
      '<div class="stats"><div><b>' + deaths + '</b><small>' + t("Deaths") + '</small></div><div><b>' + G.fmtTime(time) + '</b><small>' + t("Time") + '</small></div></div>' +
      (newBest ? '<p>⭐ ' + t("New personal best!") + '</p>' : '<p>' + t("Best: deaths") + ': ' + data.best + '</p>') +
      '<div class="btns"><a class="b wa" href="' + G.shareLink(msg) + '" target="_blank" rel="noopener">' + t("Challenge a friend on WhatsApp") + '</a>' +
      '<button class="go" data-a="new">' + t("Play again") + '</button><a class="b" href="/games.html">' + t("More games") + '</a>' + G.reviewBtn() + '</div>' +
      '<p class="promo">' + t("Real buildings need security that never glitches.") + ' <a href="/price.html">' + t("Get a CCTV price") + ' →</a></p>');
    G.sfx("win");
    if (window.QTReview) setTimeout(function () { window.QTReview.ask("game"); }, 1800);
  }
  document.getElementById("ov").addEventListener("click", function (e) {
    var lv = e.target.closest("[data-lv]");
    if (lv) { var i = +lv.getAttribute("data-lv"); data.level = i; if (i > 0) data.full = false; persist(); G.hideOverlay(); start(i); return; }
    var b = e.target.closest("[data-a]"); if (!b) return;
    var a = b.getAttribute("data-a");
    if (a === "new") { data.level = 0; data.deaths = 0; data.time = 0; data.full = true; persist(); G.hideOverlay(); start(0); }
    else if (a === "levels") { levelsMenu(); }
    else if (a === "cont") { G.hideOverlay(); start(data.level); }
    else if (a === "resume") { G.hideOverlay(); }
    else if (a === "retry") { G.hideOverlay(); start(data.level); }
    else if (a === "menu") { menu(); }
  });
  G.onrestart = function () { if (playing && !G.overlayOpen()) start(data.level); };
  G.onpause = function () { if (G.overlayOpen() && playing) G.hideOverlay(); else pauseMenu(); };
  G.onhide = pauseMenu;
  G.oncloud = function () { hud(); if (!playing) menu(); };

  /* ---------- update ---------- */
  function update() {
    frame++;
    for (var i = parts.length - 1; i >= 0; i--) { var q = parts[i]; q.life -= E.DT; q.vy += 500 * E.DT; q.x += q.vx * E.DT; q.y += q.vy * E.DT; if (q.life <= 0) parts.splice(i, 1); }
    shakeA *= 0.86; flash = Math.max(0, flash - E.DT * 3); landSquash = Math.max(0, landSquash - E.DT * 6);
    if (!st || !playing) return;
    if (st.dead) { deadT -= E.DT; if (deadT <= 0) {
      lvlDeaths.n++;
      if (lvlDeaths.n >= 6 && !lvlDeaths.offered && data.level < N - 1) {
        lvlDeaths.offered = true;
        if (G.rewarded("glitch_skip", t("This level is tough. Watch a short ad to skip to the next one."), function () { data.level++; data.unlocked = Math.max(data.unlocked, data.level); persist(); start(data.level); })) { start(data.level); return; }
      }
      start(data.level); } return; }
    if (st.won) { winT -= E.DT; if (winT <= 0 && !st.adWait) { st.adWait = 1; if (data.level >= N) finish(); else G.adBreak("glitch_level", function () { start(data.level); }); } return; }
    E.step(st, { l: K.l, r: K.r, j: K.j });
    data.time += E.DT;
    var p = st.p;
    if (p.ground && !wasGround) { landSquash = 1; burst(p.x + 9, p.y + 26, 4, ["#6E675C"], 50); }
    wasGround = p.ground;
    st.ev.forEach(function (ev) {
      if (ev === "jump") G.sfx("jump");
      else if (ev.indexOf("die") === 0) {
        G.sfx("die"); G.buzz(70); deadT = 0.8; shakeA = 9; flash = 1;
        burst(p.x + 9, p.y + 13, 26, ["#EFE8DB", "#E2A63F", "#E25B45"], 230);
        data.deaths = st.deaths; persist(); hud();
      } else if (ev === "win") {
        G.sfx("win"); winT = 0.75; burst(p.x + 9, p.y + 13, 22, ["#E2A63F", "#F3C877", "#5FC8A0"], 200);
        data.level++; data.unlocked = Math.max(data.unlocked, Math.min(N - 1, data.level)); data.deaths = st.deaths; persist();
        if (data.level < N) G.toast(t("Level complete!"), 900);
        if (data.level === 3 && window.QTReview) setTimeout(function () { window.QTReview.ask("game"); }, 900);
      } else if (ev === "spike") G.sfx("pop");
      else if (ev === "rumble") { shakeA = Math.max(shakeA, 3); G.sfx("tick"); }
      else if (ev === "slam") { shakeA = 8; G.sfx("slam"); G.buzz(30); }
      else if (ev === "door") { G.sfx("pop"); var d = st.doors[st.door - 1]; burst(d.x + 15, d.y + 30, 18, ["#E2A63F", "#EFE8DB"], 140); G.toast(t("The door moved!"), 1100); }
      else if (ev === "crack") G.sfx("tick");
      else if (ev === "poof") { G.sfx("pop"); }
      else if (ev === "reveal" || ev === "bonk") G.sfx("step");
    });
    st.ev.length = 0;
  }

  /* ---------- drawing ---------- */
  function layout() {
    var fit = Math.min(G.w / W, G.h / H);
    if (fit >= 0.6 || G.w >= G.h) { cam.s = fit; cam.ox = (G.w - W * fit) / 2; cam.oy = (G.h - H * fit) / 2; cam.follow = false; }
    else { cam.s = Math.min(0.95, G.h / H); cam.follow = true; cam.oy = Math.max(0, (G.h - H * cam.s) / 2); cam.ox = 0; }
  }
  G.onresize = layout;
  function tile(x, y, top, fill) {
    ctx.fillStyle = fill || "#24211c"; ctx.fillRect(x, y, T, T);
    ctx.fillStyle = "rgba(255,255,255,.035)"; ctx.fillRect(x, y, T, 2);
    if (top) { ctx.fillStyle = ACC; ctx.fillRect(x, y, T, 3); }
  }
  function solidAt(r, c) { return r >= 0 && r < E.ROWS && c >= 0 && c < E.COLS && st.solid[r][c]; }
  function drawPlayer(p) {
    var x = p.x, y = p.y, sx = 1, sy = 1;
    if (p.vy < -120) { sx = 0.92; sy = 1.08; } if (landSquash > 0) { sx = 1 + 0.12 * landSquash; sy = 1 - 0.12 * landSquash; }
    ctx.save(); ctx.translate(x + 9, y + 26); ctx.scale(sx, sy); ctx.translate(-9, -26);
    var walk = p.ground && Math.abs(p.vx) > 20 ? Math.sin(st.t * 22) : 0;
    ctx.fillStyle = "#131210"; ctx.fillRect(3, 21 + (walk > 0 ? -1 : 0), 4, 5); ctx.fillRect(11, 21 + (walk < 0 ? -1 : 0), 4, 5);
    ctx.fillStyle = "#EFE8DB"; roundRect(0, 4, 18, 18, 4); ctx.fill();
    ctx.fillStyle = "#131210"; ctx.fillRect(3, 9, 12, 6);
    ctx.fillStyle = "#E2A63F"; ctx.fillRect(p.face > 0 ? 10 : 4, 10, 4, 4);
    ctx.strokeStyle = "#EFE8DB"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(9, 4); ctx.lineTo(9, -1); ctx.stroke();
    ctx.fillStyle = "#E2A63F"; ctx.beginPath(); ctx.arc(9, -2, 2.2, 0, 7); ctx.fill();
    ctx.restore();
  }
  function roundRect(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
  function render() {
    var dpr = G.dpr || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = "#0d0c0a"; ctx.fillRect(0, 0, cv.width, cv.height);
    if (!st) return;
    if (!cam.s) layout();
    var s = cam.s, camX = 0;
    if (cam.follow) { var vw = G.w / s; camX = Math.max(0, Math.min(W - vw, st.p.x + 9 - vw / 2)); }
    var sh = shakeA > 0.3 ? (Math.random() - 0.5) * shakeA : 0, sv = shakeA > 0.3 ? (Math.random() - 0.5) * shakeA : 0;
    ctx.setTransform(dpr * s, 0, 0, dpr * s, dpr * (cam.ox - camX * s + sh), dpr * (cam.oy + sv));
    // background
    ctx.fillStyle = "#15130f"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = ACC; ctx.globalAlpha = 0.05;
    for (var gx = 0; gx <= W; gx += T) ctx.fillRect(gx, 0, 1, H);
    for (var gy = 0; gy <= H; gy += T) ctx.fillRect(0, gy, W, 1);
    ctx.globalAlpha = 1;
    // static blocks
    for (var r = 0; r < E.ROWS; r++) for (var c = 0; c < E.COLS; c++) if (st.solid[r][c]) tile(c * T, r * T, !solidAt(r - 1, c) && r > 0);
    // traps
    st.ents.forEach(function (e) {
      if (e.k === "fall" && e.s !== "gone") {
        var jx = e.s === "shake" ? (Math.random() - 0.5) * 3 : 0;
        for (var x = 0; x < e.w; x += T) tile(e.x + x + jx, e.y, true);
      } else if (e.k === "vanish" && e.s !== "gone") {
        ctx.globalAlpha = e.s === "fade" ? (Math.floor(frame / 3) % 2 ? 0.35 : 0.8) : 1;
        tile(e.x, e.y, true, "#27231d");
        ctx.strokeStyle = "rgba(95,200,160,.35)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(e.x + 8, e.y + 8); ctx.lineTo(e.x + 15, e.y + 16); ctx.lineTo(e.x + 12, e.y + 24); ctx.stroke();
        ctx.globalAlpha = 1;
      } else if (e.k === "invis") {
        if (e.s === "shown") { ctx.fillStyle = "#1c2826"; ctx.fillRect(e.x, e.y, T, T); ctx.fillStyle = "#5FC8A0"; ctx.fillRect(e.x, e.y, T, 3); }
        else { var ph = (frame + e.x) % 100; if (ph < 26) { ctx.fillStyle = "rgba(243,200,119," + (0.5 - Math.abs(ph - 13) / 26) + ")"; ctx.fillRect(e.x + 8 + (e.x % 11), e.y + 6 + (ph % 9), 3, 3); ctx.fillRect(e.x + 20 - (e.x % 7), e.y + 18 - (ph % 7), 2, 2); } }
      } else if (e.k === "fake") { tile(e.x, e.y, true); }
      else if (e.k === "drop" && e.s !== "gone") {
        var wob = e.s === "idle" ? Math.sin(frame * 0.2 + e.x) * 0.6 : 0;
        for (var q = 0; q < 3; q++) { var x0 = e.x + 1 + q * 9.4 + wob;
          ctx.fillStyle = "#EFE8DB"; ctx.beginPath(); ctx.moveTo(x0, e.y); ctx.lineTo(x0 + 4.7, e.y + 20); ctx.lineTo(x0 + 9.4, e.y); ctx.closePath(); ctx.fill();
          ctx.fillStyle = ACC; ctx.beginPath(); ctx.moveTo(x0 + 3, e.y + 12); ctx.lineTo(x0 + 4.7, e.y + 20); ctx.lineTo(x0 + 6.4, e.y + 12); ctx.closePath(); ctx.fill(); }
      }
      else if (e.k === "crush") {
        ctx.fillStyle = "#2b2721"; ctx.fillRect(e.x, e.y, e.w, e.h);
        for (var k = 0; k < e.w; k += 12) { ctx.fillStyle = (k / 12) % 2 ? "#131210" : "#E2A63F"; ctx.fillRect(e.x + k, e.y + e.h - 5, 12, 5); }
        if (e.s === "idle") { ctx.fillStyle = "rgba(0,0,0,.25)"; ctx.fillRect(e.x + e.w / 2 - 1, e.y + 4, 2, 14); }
      }
    });
    // spikes
    st.spikes.forEach(function (sp) {
      if (!sp.up) return;
      var hgt = 18 * Math.min(1, sp.up), by = sp.y + T;
      for (var i = 0; i < 3; i++) {
        var x0 = sp.x + 1 + i * 9.4;
        ctx.fillStyle = "#EFE8DB"; ctx.beginPath(); ctx.moveTo(x0, by); ctx.lineTo(x0 + 4.7, by - hgt); ctx.lineTo(x0 + 9.4, by); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#E2A63F"; ctx.beginPath(); ctx.moveTo(x0 + 3, by - hgt * 0.62); ctx.lineTo(x0 + 4.7, by - hgt); ctx.lineTo(x0 + 6.4, by - hgt * 0.62); ctx.closePath(); ctx.fill();
      }
    });
    // saws
    st.saws.forEach(function (w) {
      ctx.save(); ctx.translate(w.x, w.y); ctx.rotate(frame * 0.3);
      ctx.fillStyle = "#EFE8DB";
      for (var i = 0; i < 10; i++) { ctx.rotate(Math.PI / 5); ctx.beginPath(); ctx.moveTo(-3, -w.r + 2); ctx.lineTo(0, -w.r - 4); ctx.lineTo(3, -w.r + 2); ctx.fill(); }
      ctx.fillStyle = "#3a352d"; ctx.beginPath(); ctx.arc(0, 0, w.r, 0, 7); ctx.fill();
      ctx.strokeStyle = "#E2A63F"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, w.r - 4, 0, 7); ctx.stroke();
      ctx.fillStyle = "#E2A63F"; ctx.beginPath(); ctx.arc(0, 0, 3, 0, 7); ctx.fill();
      ctx.restore();
    });
    // rising live cables
    if (st.rise && st.rise.y < H) {
      var ry = st.rise.y;
      ctx.fillStyle = "rgba(95,200,232,.16)"; ctx.fillRect(0, ry, W, H - ry);
      ctx.strokeStyle = "rgba(95,200,232,.95)"; ctx.lineWidth = 2; ctx.beginPath();
      for (var zx = 0; zx <= W; zx += 15) { var zy = ry + ((zx / 15 + frame) % 2 ? -4 : 3) * (Math.sin(frame * 0.4 + zx) > 0 ? 1 : 0.5); if (!zx) ctx.moveTo(zx, zy); else ctx.lineTo(zx, zy); }
      ctx.stroke();
    }
    // door
    var d = st.doors[st.door];
    ctx.fillStyle = "#0b0a09"; ctx.fillRect(d.x + 3, d.y + 4, T - 6, 2 * T - 4);
    ctx.strokeStyle = "#E2A63F"; ctx.lineWidth = 2; ctx.strokeRect(d.x + 3, d.y + 4, T - 6, 2 * T - 4);
    ctx.fillStyle = "#E2A63F"; ctx.fillRect(d.x + T - 11, d.y + 34, 3, 3);
    ctx.fillStyle = "#1f8f5a"; ctx.fillRect(d.x - 2, d.y - 10, T + 4, 11);
    ctx.fillStyle = "#EFE8DB"; ctx.font = "bold 8px system-ui,sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("EXIT", d.x + T / 2, d.y - 4.5);
    // player
    if (!st.dead) drawPlayer(st.p);
    // particles
    parts.forEach(function (q) { ctx.globalAlpha = Math.max(0, Math.min(1, q.life * 2)); ctx.fillStyle = q.c; ctx.fillRect(q.x, q.y, q.s, q.s); });
    ctx.globalAlpha = 1;
    if (flash > 0) { ctx.fillStyle = "rgba(226,91,69," + flash * 0.22 + ")"; ctx.fillRect(0, 0, W, H); }
  }

  /* ---------- go ---------- */
  hud(); menu();
  if (G.touch) {
    var hint = document.getElementById("rotate");
    if (hint && matchMedia("(orientation: portrait)").matches) { hint.hidden = false; setTimeout(function () { hint.hidden = true; }, 5000); }
  }
  G.run(update, render);
  /* test hook: lets automated checks play the levels */
  window.__glitch = { state: function () { return st; }, data: data, start: function (i) { G.hideOverlay(); data.level = i; start(i); } };
})();
