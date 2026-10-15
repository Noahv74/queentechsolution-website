/* Crown Heist – drawing, menus and progress (rules in heist-engine.js). */
(function () {
  "use strict";
  var G = window.QTG, E = window.HeistEngine, t = G.t, K = G.keys, N = E.LEVELS.length;
  var cv = document.getElementById("game"); G.setup(cv);
  var ctx = G.cx, WW = 540, X0 = 80, X1 = 460, CX = 270;
  G.holdArea(document.getElementById("stage"));
  var statusEl = document.getElementById("status");

  var caughtHere = 0, caughtLvl = -1, skipOffered = {};
  var data = G.load("heist", { level: 0, caught: 0, time: 0, stars: [], best: null });
  var st = null, playing = false, frame = 0, endT = 0, flash = 0, parts = [], attempt = 0, cam = { s: 1, y: 0, vh: 900, ox: 0 };

  function persist() { G.save("heist", data); }
  function hud() { G.hud("hLvl", Math.min(N, data.level + 1) + "/" + N); G.hud("hCaught", data.caught); G.hud("hStars", data.stars.reduce(function (a, b) { return a + (b || 0); }, 0)); }
  function par(i) { return E.LEVELS[i].len / E.SPEED; }
  function starsFor(i, time) { return time <= par(i) * 1.55 ? 3 : time <= par(i) * 2.2 ? 2 : 1; }
  function start(i) {
    attempt++; st = E.create(i, (Date.now() + attempt * 7919) % 1e9); playing = true; endT = 0; parts = []; hud();
    cam.y = st.y - cam.vh * 0.72;
    G.toast(t("Level") + " " + (i + 1) + " · " + (E.LEVELS[i].cams.length > 1 ? t("Cameras:") + " " + E.LEVELS[i].cams.length : t("Hold to sneak, let go to freeze")), 2000);
  }
  function stars(n) { var s = ""; for (var i = 0; i < 3; i++) s += i < n ? "★" : "☆"; return s; }
  function menu() {
    playing = false;
    var cont = data.level > 0 && data.level < N;
    G.overlay('<span class="k">' + t("Queen Tech Arcade") + '</span><h2>Crown Heist</h2>' +
      '<p>' + t("Sneak up to the crown. Freeze when a camera looks your way. Faster = more stars.") + '</p>' +
      '<div class="how">' + (G.touch ? '<div><kbd>👆</kbd><span>' + t("Hold anywhere: sneak forward") + '</span></div>' : '<div><kbd>Space</kbd><kbd>🖱</kbd><span>' + t("Hold: sneak forward") + '</span></div>') +
      '<div><kbd>✋</kbd><span>' + t("Let go: freeze") + '</span></div>' +
      '<div><kbd style="color:#F3C877">●</kbd><span>' + t("Yellow light: the camera is about to look") + '</span></div>' +
      '<div><kbd style="color:#E25B45">●</kbd><span>' + t("Red: it's watching. Don't move!") + '</span></div></div>' +
      (data.best ? '<div class="stats"><div><b>' + data.best.stars + '</b><small>' + t("Best stars") + '</small></div><div><b>' + data.best.caught + '</b><small>' + t("Times caught") + '</small></div></div>' : '') +
      '<div class="btns">' + (cont ? '<button class="go" data-a="cont">' + t("Continue") + " · " + t("Level") + " " + (data.level + 1) + '</button><button data-a="new">' + t("New game") + '</button>'
        : '<button class="go" data-a="new">' + t("Play") + '</button>') + '<a class="b" href="/games.html">' + t("More games") + '</a></div>');
  }
  function finish() {
    playing = false;
    var total = data.stars.reduce(function (a, b) { return a + (b || 0); }, 0), caught = data.caught;
    var isBest = !data.best || total > data.best.stars || (total === data.best.stars && caught < data.best.caught);
    if (isBest) data.best = { stars: total, caught: caught };
    var time = data.time;
    data.level = 0; data.caught = 0; data.time = 0; data.stars = []; persist(); hud();
    var msg = G.ar ? "سرقت التاج في Crown Heist على كوين تك وجمعت " + total + " نجمة من 30! جرّب تهرب من الكاميرات:" : "I stole the crown in Crown Heist on Queen Tech with " + total + "/30 stars! Can you beat the cameras?";
    G.overlay('<span class="k">' + t("Heist complete!") + '</span><h2>' + t("The crown is yours") + '</h2>' +
      '<div class="stats"><div><b>' + total + '/30</b><small>' + t("Stars") + '</small></div><div><b>' + caught + '</b><small>' + t("Times caught") + '</small></div><div><b>' + G.fmtTime(time) + '</b><small>' + t("Time") + '</small></div></div>' +
      (isBest ? '<p>⭐ ' + t("New personal best!") + '</p>' : '') +
      '<div class="btns"><a class="b wa" href="' + G.shareLink(msg) + '" target="_blank" rel="noopener">' + t("Challenge a friend on WhatsApp") + '</a>' +
      '<button class="go" data-a="new">' + t("Play again") + '</button><a class="b" href="/games.html">' + t("More games") + '</a>' + G.reviewBtn() + '</div>' +
      '<p class="promo">' + t("Our real cameras never blink.") + ' <a href="/price.html">' + t("Protect your shop: get a CCTV price") + ' →</a></p>');
    G.sfx("win");
    if (window.QTReview) setTimeout(function () { window.QTReview.ask("game"); }, 1800);
  }
  document.getElementById("ov").addEventListener("click", function (e) {
    var b = e.target.closest("[data-a]"); if (!b) return;
    var a = b.getAttribute("data-a");
    if (a === "new") { data.level = 0; data.caught = 0; data.time = 0; data.stars = []; persist(); G.hideOverlay(); start(0); }
    else if (a === "cont") { G.hideOverlay(); start(data.level); }
    else if (a === "resume") G.hideOverlay();
    else if (a === "retry") { G.hideOverlay(); start(data.level); }
    else if (a === "menu") menu();
  });
  G.onenter = function () { if (G.overlayOpen()) { var b = document.querySelector("#ov button.go"); if (b) b.click(); } };
  G.onrestart = function () { if (playing && !G.overlayOpen()) start(data.level); };
  G.oncloud = function () { hud(); if (!playing) menu(); };
  G.onpause = function () {
    if (!playing) return;
    if (G.overlayOpen()) { G.hideOverlay(); return; }
    G.overlay('<span class="k">' + t("Paused") + '</span><h2>Crown Heist</h2><div class="btns"><button class="go" data-a="resume">' + t("Resume") + '</button><button data-a="retry">' + t("Restart level") + '</button><button data-a="menu">' + t("Menu") + '</button></div>');
  };
  G.onhide = function () { if (playing && !G.overlayOpen()) G.onpause(); };

  function burst(x, y, n, cols) { for (var i = 0; i < n; i++) { var a = Math.random() * 6.283, v = 80 + Math.random() * 160; parts.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 0.5 + Math.random() * 0.6, c: cols[i % cols.length] }); } }

  var lastStatus = "";
  function status() {
    if (!statusEl) return;
    var d = st && playing && !st.won && !st.caught ? E.danger(st) : -1;
    var key = d === 2 ? "watch" : d === 1 ? "warn" : d === 0 ? "safe" : "off";
    if (key === lastStatus) return; lastStatus = key;
    statusEl.hidden = key === "off";
    statusEl.className = "h-status " + key;
    statusEl.textContent = key === "watch" ? t("FREEZE!") : key === "warn" ? t("Careful…") : t("Clear: move!");
  }

  function update() {
    frame++;
    for (var i = parts.length - 1; i >= 0; i--) { var q = parts[i]; q.life -= E.DT; q.vy += 300 * E.DT; q.x += q.vx * E.DT; q.y += q.vy * E.DT; if (q.life <= 0) parts.splice(i, 1); }
    flash = Math.max(0, flash - E.DT * 2.5);
    status();
    if (!st || !playing) return;
    if (st.caught || st.won) {
      endT -= E.DT;
      if (endT <= 0 && !st.adWait) { st.adWait = 1;
        if (st.won) { if (data.level >= N) finish(); else G.adBreak("heist_level", function () { start(data.level); }); }
        else {
          caughtHere = st.index === caughtLvl ? caughtHere + 1 : 1; caughtLvl = st.index;
          if (caughtHere >= 5 && !skipOffered[st.index] && data.level < N - 1) { skipOffered[st.index] = 1;
            G.rewarded("heist_skip", t("This level is tough. Watch a short ad to skip to the next one."), function () { data.level++; persist(); hud(); start(data.level); }); }
          start(data.level);
        } }
      return;
    }
    E.step(st, !!K.hold);
    data.time += E.DT;
    if (st.moving && frame % 14 === 0) G.sfx("step");
    st.ev.forEach(function (e) {
      if (e === "warn") G.sfx("tick");
      else if (e === "caught") { G.sfx("alarm"); G.buzz(120); flash = 1; endT = 1.1; data.caught++; persist(); hud(); G.toast(t("Caught! Back to the start."), 1200); }
      else if (e === "win") {
        var sc = starsFor(st.index, st.t);
        data.stars[st.index] = Math.max(data.stars[st.index] || 0, sc);
        data.level++; persist(); hud(); G.sfx("win"); endT = 1.2; burst(CX, st.crownY, 30, ["#E2A63F", "#F3C877", "#EFE8DB"]);
        G.toast(t("Level complete!") + " " + stars(sc), 1300);
        if (data.level === 3 && window.QTReview) setTimeout(function () { window.QTReview.ask("game"); }, 1000);
      }
    });
    st.ev.length = 0;
  }

  function layout() {
    var s = Math.min(G.w / WW, G.h / 720);
    cam.s = s; cam.vh = G.h / s; cam.ox = (G.w / s - WW) / 2;
  }
  G.onresize = layout;

  function camPos(c) { return c.side === "l" ? { x: X0 + 6, y: c.y } : c.side === "r" ? { x: X1 - 6, y: c.y } : { x: CX, y: st.crownY - 34 }; }
  function camDir(c) {                       // angle the camera points at: away -> towards the wall/ceiling, watch -> down the corridor
    var a = c.angle;
    if (c.side === "c") return -Math.PI / 2 + a * Math.PI;                 // up -> down
    if (c.side === "l") return -Math.PI * 0.75 + a * (Math.PI * 1.15);      // up-left wall -> down-right
    return -Math.PI * 0.25 - a * (Math.PI * 1.15);                         // up-right wall -> down-left
  }
  function render() {
    var dpr = G.dpr || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = "#0d0c0a"; ctx.fillRect(0, 0, cv.width, cv.height);
    if (!st) return;
    if (!cam.s) layout();
    var s = cam.s, want = st.y - cam.vh * 0.68;
    want = Math.max(st.crownY - 140, Math.min(want, st.L.len + 120 - cam.vh));
    cam.y += (want - cam.y) * 0.12;
    ctx.setTransform(dpr * s, 0, 0, dpr * s, dpr * cam.ox * s, dpr * (-cam.y * s));
    var top = cam.y - 20, bot = cam.y + cam.vh + 20;
    // outside walls
    ctx.fillStyle = "#15130f"; ctx.fillRect(-400, top, WW + 800, bot - top);
    // corridor floor
    ctx.fillStyle = "#1c1915"; ctx.fillRect(X0, Math.max(top, st.crownY - 120), X1 - X0, bot - Math.max(top, st.crownY - 120));
    for (var ty = Math.floor(Math.max(top, st.crownY - 120) / 40) * 40; ty < bot; ty += 40) for (var tx = X0; tx < X1; tx += 40) if (((tx + ty) / 40) % 2 === 0) { ctx.fillStyle = "rgba(255,255,255,.02)"; ctx.fillRect(tx, ty, 40, 40); }
    // carpet
    ctx.fillStyle = "#3a1717"; ctx.fillRect(CX - 70, Math.max(top, st.crownY + 10), 140, bot);
    ctx.fillStyle = "#E2A63F"; ctx.fillRect(CX - 70, Math.max(top, st.crownY + 10), 4, bot); ctx.fillRect(CX + 66, Math.max(top, st.crownY + 10), 4, bot);
    // walls + pillars
    ctx.fillStyle = "#24211c"; ctx.fillRect(X0 - 30, top, 30, bot - top); ctx.fillRect(X1, top, 30, bot - top);
    for (var py = Math.floor(top / 160) * 160; py < bot; py += 160) { if (py < st.crownY - 100) continue; ctx.fillStyle = "#2f2b24"; ctx.fillRect(X0 - 34, py, 38, 26); ctx.fillRect(X1 - 4, py, 38, 26); ctx.fillStyle = "rgba(226,166,63,.5)"; ctx.fillRect(X0 - 34, py, 38, 3); ctx.fillRect(X1 - 4, py, 38, 3); }
    // back wall + pedestal + crown
    ctx.fillStyle = "#24211c"; ctx.fillRect(X0 - 30, st.crownY - 140, X1 - X0 + 60, 70);
    var glow = ctx.createRadialGradient(CX, st.crownY - 6, 4, CX, st.crownY - 6, 120); glow.addColorStop(0, "rgba(226,166,63,.35)"); glow.addColorStop(1, "rgba(226,166,63,0)");
    ctx.fillStyle = glow; ctx.fillRect(CX - 130, st.crownY - 130, 260, 260);
    ctx.fillStyle = "#3a352d"; ctx.fillRect(CX - 26, st.crownY + 6, 52, 30); ctx.fillStyle = "#E2A63F"; ctx.fillRect(CX - 30, st.crownY + 4, 60, 5);
    if (!(st.won)) {
      var bob = Math.sin(frame * 0.06) * 3;
      ctx.save(); ctx.translate(CX, st.crownY - 12 + bob); ctx.scale(1.6, 1.6);
      ctx.fillStyle = "#E2A63F"; ctx.beginPath(); ctx.moveTo(-10, 5); ctx.lineTo(-8, -6); ctx.lineTo(-3, -1); ctx.lineTo(0, -8); ctx.lineTo(3, -1); ctx.lineTo(8, -6); ctx.lineTo(10, 5); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#F3C877"; ctx.fillRect(-10, 6, 20, 3); ctx.restore();
    }
    // camera cones (under everything that sits on the floor)
    st.cams.forEach(function (c) {
      var p = camPos(c), a = camDir(c), col = c.s === "watch" ? "226,91,69" : c.s === "warn" ? "243,200,119" : "95,200,160";
      var spread = 0.32, len = c.s === "watch" ? 1600 : 260, alpha = c.s === "watch" ? 0.26 : c.s === "warn" ? 0.16 : 0.08;
      var g2 = ctx.createRadialGradient(p.x, p.y, 10, p.x, p.y, len); g2.addColorStop(0, "rgba(" + col + "," + alpha + ")"); g2.addColorStop(1, "rgba(" + col + ",0)");
      ctx.fillStyle = g2; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.arc(p.x, p.y, len, a - spread, a + spread); ctx.closePath(); ctx.fill();
    });
    // player (masked bot with a sack)
    var walking = st.moving && !st.caught && !st.won, bobp = walking ? Math.abs(Math.sin(frame * 0.35)) * 3 : 0;
    var px = CX, pyy = st.y - bobp;
    if (!st.won) {
      ctx.fillStyle = "rgba(0,0,0,.35)"; ctx.beginPath(); ctx.ellipse(px, st.y + 18, 16, 5, 0, 0, 7); ctx.fill();
      ctx.fillStyle = "#6b5532"; ctx.beginPath(); ctx.arc(px + 15, pyy + 4, 9, 0, 7); ctx.fill();
      ctx.fillStyle = "#EFE8DB"; ctx.beginPath(); ctx.arc(px, pyy, 15, 0, 7); ctx.fill();
      ctx.fillStyle = "#131210"; ctx.fillRect(px - 13, pyy - 7, 26, 9);
      ctx.fillStyle = "#EFE8DB"; ctx.fillRect(px - 8, pyy - 5, 5, 4); ctx.fillRect(px + 3, pyy - 5, 5, 4);
      ctx.strokeStyle = "#EFE8DB"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, pyy - 15); ctx.lineTo(px, pyy - 22); ctx.stroke();
      ctx.fillStyle = st.caught ? "#E25B45" : "#E2A63F"; ctx.beginPath(); ctx.arc(px, pyy - 23, 3, 0, 7); ctx.fill();
      var d = E.danger(st);
      if (d && !st.caught) { ctx.fillStyle = d === 2 ? "#E25B45" : "#F3C877"; ctx.font = "900 22px system-ui,sans-serif"; ctx.textAlign = "center"; ctx.fillText(d === 2 ? "!!" : "!", px, pyy - 32); }
    }
    // cameras (on top)
    st.cams.forEach(function (c) {
      var p = camPos(c), a = camDir(c);
      ctx.fillStyle = "#3a352d"; ctx.fillRect(p.x - 6, p.y - 6, 12, 12);
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(a);
      ctx.fillStyle = "#EFE8DB"; ctx.fillRect(2, -8, 26, 16); ctx.fillStyle = "#131210"; ctx.fillRect(26, -6, 6, 12);
      var on = c.s === "watch" ? "#E25B45" : c.s === "warn" ? (Math.floor(frame / 6) % 2 ? "#F3C877" : "#6E675C") : "#5FC8A0";
      ctx.fillStyle = on; ctx.beginPath(); ctx.arc(9, -3, 2.6, 0, 7); ctx.fill();
      ctx.restore();
    });
    // progress bar
    ctx.fillStyle = "rgba(239,232,219,.12)"; var bx = X1 + 40, bt = cam.y + 30, bh = cam.vh - 60; ctx.fillRect(bx, bt, 5, bh);
    var prog = 1 - (st.y - st.crownY) / (st.L.len - st.crownY); ctx.fillStyle = "#E2A63F"; ctx.fillRect(bx, bt + bh * (1 - prog), 5, bh * prog);
    parts.forEach(function (q) { ctx.globalAlpha = Math.max(0, Math.min(1, q.life * 2)); ctx.fillStyle = q.c; ctx.fillRect(q.x, q.y, 3, 3); });
    ctx.globalAlpha = 1;
    if (flash > 0) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = "rgba(226,91,69," + flash * 0.3 + ")"; ctx.fillRect(0, 0, cv.width, cv.height); }
  }

  hud(); menu();
  G.run(update, render);
  window.__heist = { state: function () { return st; }, data: data, start: function (i) { G.hideOverlay(); data.level = i; start(i); } };
})();
