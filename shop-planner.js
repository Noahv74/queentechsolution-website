/* Queen Tech – "Is my shop covered?" floor-plan camera planner.
   Plan in metres. Cameras are chosen by a greedy cover over wall positions × directions:
   priority spots first (doors = faces, till, safe, back door, shelves), then floor coverage. */
(function () {
  "use strict";
  var ar = window.QT_LANG === "ar", P = window.QT_PRICES || { items: {}, labour: {} };
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var L = ar ? {
    types: { retail: "محل تجاري", cafe: "مطعم أو كافيه", salon: "صالون أو عيادة", pharmacy: "صيدلية", market: "سوبرماركت صغير", office: "مكتب" },
    items: { door: "باب الدخول", back: "باب خلفي", till: "الكاشير", safe: "خزنة", shelf: "رف / بضاعة غالية", stock: "المخزن", outside: "واجهة المحل برّه" },
    cam: "كاميرا", watches: { door: "وجوه الداخلين عند الباب", back: "الباب الخلفي", till: "الكاشير والفلوس", safe: "الخزنة", shelf: "الرفوف الغالية", stock: "جوه المخزن", floor: "أرضية المحل", outside: "واجهة المحل والرصيف" },
    cov: "تغطية الأرضية", cams: "كاميرات", indoor: "داخلية", outdoor: "خارجية", gaps: "الأماكن الحمرا مش متغطية", none: "حط باب الدخول على الأقل.",
    nvr: "جهاز تسجيل", hdd: "هارد", cable: "كابل Cat6", labour: "التركيب", eq: "الأجهزة", total: "الإجمالي التقديري", setup: "إعداد جهاز التسجيل والتطبيق", aed: "درهم",
    wa: "مرحباً كوين تك، عملت خطة كاميرات لمحلي:", place: "اضغط على المخطط لحط", sel: "اسحب أي حاجة لتحريكها. اضغط عليها مرتين لمسحها.", m: "م", tb: "تيرا"
  } : {
    types: { retail: "Retail shop", cafe: "Restaurant or café", salon: "Salon or clinic", pharmacy: "Pharmacy", market: "Mini-market", office: "Office" },
    items: { door: "Entrance door", back: "Back door", till: "Till", safe: "Safe", shelf: "Shelf / high-value stock", stock: "Stock room", outside: "Outside front" },
    cam: "Camera", watches: { door: "faces at the entrance", back: "the back door", till: "the till and cash", safe: "the safe", shelf: "high-value shelves", stock: "inside the stock room", floor: "the shop floor", outside: "the shop front and pavement" },
    cov: "Floor coverage", cams: "cameras", indoor: "indoor", outdoor: "outdoor", gaps: "Red areas are not covered", none: "Add at least the entrance door.",
    nvr: "Recorder", hdd: "Hard disk", cable: "Cat6 cable", labour: "Installation", eq: "Equipment", total: "Estimated total", setup: "Recorder setup + phone app", aed: "AED",
    wa: "Hello Queen Tech, I planned cameras for my shop:", place: "Tap the plan to place", sel: "Drag anything to move it. Double-tap to remove it.", m: "m", tb: "TB"
  };
  var ICON = { door: "🚪", back: "🚪", till: "💳", safe: "🔒", shelf: "🛍️", outside: "🌆", stock: "📦" };
  var NEED = { door: { w: 30, r: 6, c: 25 }, back: { w: 20, r: 6, c: 30 }, till: { w: 22, r: 4.5, c: 35 }, safe: { w: 16, r: 4, c: 40 }, shelf: { w: 7, r: 7, c: 50 } };
  var FOV = 100 * Math.PI / 180, RANGE = 9;

  /* ---------- state ---------- */
  var S = { type: "retail", W: 10, D: 8, items: [], stock: null, days: 30, brand: "hikvision", monitor: false, tool: null };
  function preset(type) {
    var W = S.W, D = S.D, it = [];
    function add(t, x, y) { it.push({ t: t, x: x, y: y }); }
    add("door", W / 2, D - 0.2);
    var stock = { x: 0, y: 0, w: Math.min(3.5, W * 0.35), h: Math.min(3, D * 0.35) };
    if (type === "retail") { add("till", W * 0.8, D - 1.6); add("shelf", W * 0.55, D * 0.35); add("shelf", W * 0.2, D * 0.65); add("safe", stock.w * 0.6, stock.h * 0.5); }
    else if (type === "cafe") { add("till", W * 0.8, D * 0.45); add("back", W - 0.2, 1.2); stock = { x: W * 0.55, y: 0, w: Math.min(4, W * 0.45), h: Math.min(3, D * 0.3) }; }
    else if (type === "salon") { add("till", W * 0.25, D - 1.5); stock = { x: W - Math.min(3, W * 0.3), y: 0, w: Math.min(3, W * 0.3), h: Math.min(3, D * 0.35) }; }
    else if (type === "pharmacy") { add("till", W * 0.5, D * 0.45); add("shelf", W * 0.15, D * 0.5); add("shelf", W * 0.85, D * 0.5); add("safe", stock.w * 0.5, stock.h * 0.5); }
    else if (type === "market") { add("till", W * 0.25, D - 1.5); add("till", W * 0.4, D - 1.5); add("shelf", W * 0.35, D * 0.45); add("shelf", W * 0.65, D * 0.45); add("shelf", W * 0.85, D * 0.7); add("back", W - 0.2, 1); }
    else if (type === "office") { add("till", W * 0.5, D - 2); stock = { x: W - Math.min(2.5, W * 0.25), y: 0, w: Math.min(2.5, W * 0.25), h: Math.min(2.5, D * 0.3) }; }
    add("outside", W / 2, D + 0.9);
    S.items = it; S.stock = stock;
  }

  /* ---------- geometry ---------- */
  function inStock(x, y) { var s = S.stock; return s && x > s.x && x < s.x + s.w && y > s.y && y < s.y + s.h; }
  function segHitsStock(ax, ay, bx, by) {               /* does the segment cross the stock-room rectangle boundary? */
    var s = S.stock; if (!s) return false; var ia = inStock(ax, ay), ib = inStock(bx, by); if (ia !== ib) return true; if (ia) return false;
    var n = 12; for (var i = 1; i < n; i++) { var x = ax + (bx - ax) * i / n, y = ay + (by - ay) * i / n; if (inStock(x, y)) return true; } return false;
  }
  function sees(c, px, py, range, cone) {
    var dx = px - c.x, dy = py - c.y, d = Math.sqrt(dx * dx + dy * dy); if (d > range || d < 0.05) return d < 0.05;
    var a = Math.atan2(dy, dx), diff = Math.abs(Math.atan2(Math.sin(a - c.a), Math.cos(a - c.a))); if (diff > (cone || FOV / 2)) return false;
    return !segHitsStock(c.x, c.y, px, py);
  }
  function plan() {
    var W = S.W, D = S.D, pts = [], tg = [], cands = [], i, j;
    for (var y = 0.5; y < D; y += 1) for (var x = 0.5; x < W; x += 1) pts.push({ x: x, y: y, st: inStock(x, y) });
    S.items.forEach(function (it) { if (NEED[it.t]) tg.push({ t: it.t, x: it.x, y: it.y, w: NEED[it.t].w, r: NEED[it.t].r, c: NEED[it.t].c * Math.PI / 180 }); });
    /* wall positions every metre + corners, inset 0.15 m; stock-room walls (inside) too */
    function wallCands(x0, y0, w, h, inner) {
      var out = [], e = 0.15;
      for (var t = 0; t <= w + 0.001; t += Math.max(1, w / 12)) { out.push([x0 + Math.min(Math.max(t, e), w - e), y0 + e]); out.push([x0 + Math.min(Math.max(t, e), w - e), y0 + h - e]); }
      for (t = 1; t < h; t += Math.max(1, h / 10)) { out.push([x0 + e, y0 + t]); out.push([x0 + w - e, y0 + t]); }
      return out.map(function (p) { return { x: p[0], y: p[1], inner: inner }; });
    }
    var pos = wallCands(0, 0, W, D, false).filter(function (p) { return !inStock(p.x, p.y); });
    if (S.stock) pos = pos.concat(wallCands(S.stock.x, S.stock.y, S.stock.w, S.stock.h, true));
    pos.forEach(function (p) {
      for (var k = 0; k < 24; k++) {
        var a = k * Math.PI / 12, cx = p.x + Math.cos(a) * 0.6, cy = p.y + Math.sin(a) * 0.6;   /* must look into its own room */
        if (cx <= 0 || cy <= 0 || cx >= W || cy >= D || inStock(cx, cy) !== !!p.inner) continue;
        var c = { x: p.x, y: p.y, a: a, inner: p.inner }, vp = [], vt = [];
        for (i = 0; i < pts.length; i++) if (pts[i].st === !!p.inner && sees(c, pts[i].x, pts[i].y, RANGE)) vp.push(i);
        for (j = 0; j < tg.length; j++) if (inStock(tg[j].x, tg[j].y) === !!p.inner && sees(c, tg[j].x, tg[j].y, tg[j].r, tg[j].c) && (tg[j].t !== "door" && tg[j].t !== "back" || Math.hypot(tg[j].x - c.x, tg[j].y - c.y) > 1.2)) vt.push(j);
        if (vp.length || vt.length) { c.vp = vp; c.vt = vt; cands.push(c); }
      }
    });
    var covP = new Uint8Array(pts.length), covT = new Uint8Array(tg.length), chosen = [], floorN = pts.length || 1;
    for (var it = 0; it < 16; it++) {
      var best = null, bs = 0;
      for (i = 0; i < cands.length; i++) {
        var c = cands[i], s = 0, km = 0;
        for (j = 0; j < c.vt.length; j++) if (!covT[c.vt[j]]) { if (tg[c.vt[j]].t === "shelf") s += tg[c.vt[j]].w; else km = Math.max(km, tg[c.vt[j]].w); }
        s += km;
        for (j = 0; j < c.vp.length; j++) if (!covP[c.vp[j]]) s += pts[c.vp[j]].st ? 1.6 : 1;
        if (s > bs) { bs = s; best = c; }
      }
      var allT = tg.every(function (_, k) { return covT[k]; }), cov = covP.reduce(function (a, b) { return a + b; }, 0) / floorN;
      if (!best || (allT && (cov >= 0.9 || bs < floorN * 0.04))) break;
      best.watch = [];
      var key = -1; best.vt.forEach(function (k) { if (!covT[k] && tg[k].t !== "shelf" && (key < 0 || tg[k].w > tg[key].w)) key = k; });
      best.vt.forEach(function (k) { if (covT[k] || (tg[k].t !== "shelf" && k !== key)) return; best.watch.push(tg[k].t); covT[k] = 1; });
      best.vp.forEach(function (k) { covP[k] = 1; });
      if (!best.watch.length) best.watch.push(best.inner ? "stock" : "floor");
      chosen.push(best);
    }
    var outside = S.items.some(function (x) { return x.t === "outside"; });
    return { cams: chosen, pts: pts, covP: covP, cov: covP.reduce(function (a, b) { return a + b; }, 0) / floorN, outside: outside };
  }

  /* ---------- prices ---------- */
  function price(key) { var it = P.items[key]; if (!it) return 0; var v = it.v[S.brand] || it.v.generic || {}; if (v.price == null) { for (var b in it.v) if (it.v[b].price) return it.v[b].price; return 0; } return v.price; }
  function lab(key) { var l = P.labour[key] || {}; var on = window.QT_OFFER ? window.QT_OFFER.on !== false : true; return on ? l.price || 0 : l.was || l.price || 0; }
  function estimate(r) {
    var nin = r.cams.length, nout = r.outside ? 1 : 0, n = nin + nout, lines = [];
    if (!n) return { lines: [], total: 0, n: 0 };
    var nvr = n <= 4 ? "nvr4" : n <= 8 ? "nvr8" : "nvr16";
    var tb = n * 3.9 * 3600 * 24 * S.days / 8 / 1e6 * 1.1, bays = P.items[nvr] ? P.items[nvr].bays || 1 : 1;
    var disks = [], sizes = [1, 2, 4, 8], need = tb;
    for (var b = 0; b < bays && need > 0; b++) { var pick = sizes.find(function (z) { return z >= need / (bays - b); }) || 8; disks.push(pick); need -= pick; }
    var cable = 0; r.cams.forEach(function (c) { cable += Math.abs(c.x - (S.stock ? S.stock.x + 0.5 : 0.5)) + Math.abs(c.y - (S.stock ? S.stock.y + 0.5 : 0.5)) + 6; }); if (nout) cable += S.D + 8;
    var boxes = Math.max(1, Math.ceil(cable / 290));
    function line(name, qty, unit) { lines.push([name, qty, unit, qty * unit]); }
    var it = P.items;
    if (nin) line((it.cam4_dome || {}).label || "4MP dome camera", nin, price("cam4_dome"));
    if (nout) line((it.cam4_colorvu || {}).label || "4MP colour-at-night camera", nout, price("cam4_colorvu"));
    line((it[nvr] || {}).label || nvr, 1, price(nvr));
    disks.forEach(function (z) { line(((it["hdd" + z] || {}).label) || ("Hard disk " + z + "TB"), 1, price("hdd" + z)); });
    line((it.cat6 || {}).label || "Cat6 cable box", boxes, price("cat6"));
    if (S.monitor) line((it.monitor || {}).label || "Monitor", 1, price("monitor"));
    var eq = lines.reduce(function (a, l) { return a + l[3]; }, 0);
    var labLines = [[(P.labour.cam || {}).name || L.labour, n, lab("cam")], [(P.labour.nvr || {}).name || L.setup, 1, lab("nvr")]];
    var lb = labLines.reduce(function (a, l) { return a + l[1] * l[2]; }, 0);
    return { lines: lines, lab: labLines, eq: eq, lb: lb, total: Math.round(eq + lb), n: n, nin: nin, nout: nout, nvr: nvr, disks: disks, tb: tb };
  }
  var money = function (v) { return Math.round(v).toLocaleString("en-US"); };
  var tr = function (s) { return window.t ? window.t(s) : s; };

  /* ---------- drawing ---------- */
  var svg = $("plan"), last = null;
  function draw() {
    var W = S.W, D = S.D, pad = 1.6, r = plan(); last = r;
    svg.setAttribute("viewBox", (-0.6) + " " + (-0.6) + " " + (W + 1.2) + " " + (D + pad + 0.6));
    var h = '<defs><pattern id="gr" width="1" height="1" patternUnits="userSpaceOnUse"><path d="M1 0H0V1" fill="none" stroke="rgba(226,166,63,.08)" stroke-width=".03"/></pattern></defs>';
    h += '<rect x="0" y="' + D + '" width="' + W + '" height="' + pad + '" fill="rgba(95,200,232,.05)"/><text x="' + (W / 2) + '" y="' + (D + pad - 0.25) + '" class="lbl" text-anchor="middle">' + esc(ar ? "الشارع / الممر" : "Street / mall corridor") + '</text>';
    h += '<rect x="0" y="0" width="' + W + '" height="' + D + '" fill="#1d1b17" stroke="#E2A63F" stroke-width=".12"/><rect x="0" y="0" width="' + W + '" height="' + D + '" fill="url(#gr)"/>';
    if (S.stock) h += '<rect class="drag" data-k="stock" x="' + S.stock.x + '" y="' + S.stock.y + '" width="' + S.stock.w + '" height="' + S.stock.h + '" fill="#26231e" stroke="#8a7d66" stroke-width=".08" stroke-dasharray=".25 .15"/><text x="' + (S.stock.x + S.stock.w / 2) + '" y="' + (S.stock.y + S.stock.h / 2 + 0.15) + '" class="lbl" text-anchor="middle">' + esc(L.items.stock) + '</text>';
    /* uncovered floor */
    r.pts.forEach(function (p, i) { if (!r.covP[i]) h += '<rect x="' + (p.x - 0.5) + '" y="' + (p.y - 0.5) + '" width="1" height="1" fill="rgba(226,91,69,.18)"/>'; });
    /* camera cones */
    r.cams.forEach(function (c, i) {
      var a1 = c.a - FOV / 2, a2 = c.a + FOV / 2, R = 4.2;
      h += '<path d="M' + c.x + ' ' + c.y + ' L' + (c.x + Math.cos(a1) * R) + ' ' + (c.y + Math.sin(a1) * R) + ' A' + R + ' ' + R + ' 0 0 1 ' + (c.x + Math.cos(a2) * R) + ' ' + (c.y + Math.sin(a2) * R) + ' Z" fill="rgba(226,166,63,.16)" stroke="rgba(226,166,63,.5)" stroke-width=".04"/>';
    });
    S.items.forEach(function (it, i) {
      h += '<g class="drag" data-k="' + i + '" transform="translate(' + it.x + ' ' + it.y + ')"><circle r=".42" fill="#131210" stroke="' + (it.t === "outside" ? "#5FC8E8" : "#EFE8DB") + '" stroke-width=".05"/><text y=".16" text-anchor="middle" class="ic">' + ICON[it.t] + '</text></g>';
    });
    r.cams.forEach(function (c, i) {
      h += '<g pointer-events="none" transform="translate(' + c.x + ' ' + c.y + ')"><circle r=".3" fill="#E2A63F"/><text y=".11" text-anchor="middle" class="cn">' + (i + 1) + '</text></g>';
    });
    if (r.outside) { var o = S.items.find(function (x) { return x.t === "outside"; }), fx = Math.min(W - 0.3, Math.max(0.3, o.x)); h += '<g pointer-events="none" transform="translate(' + fx + ' ' + (D - 0.15) + ')"><path d="M0 0 L-1.6 1.5 A2.2 2.2 0 0 0 1.6 1.5 Z" fill="rgba(95,200,232,.18)"/><circle r=".3" fill="#5FC8E8"/><text y=".11" text-anchor="middle" class="cn">' + (r.cams.length + 1) + '</text></g>'; }
    h += '<text x="' + (W / 2) + '" y="-.15" class="lbl" text-anchor="middle">' + W + ' ' + L.m + '</text><text x="-.2" y="' + (D / 2) + '" class="lbl" text-anchor="middle" transform="rotate(-90 -.2 ' + (D / 2) + ')">' + D + ' ' + L.m + '</text>';
    svg.innerHTML = h;
    summary(r);
  }
  function summary(r) {
    var e = estimate(r), cov = Math.round(r.cov * 100);
    if (!S.items.some(function (x) { return x.t === "door"; })) { $("res").innerHTML = '<p class="muted">' + esc(L.none) + '</p>'; return; }
    var list = r.cams.map(function (c, i) { return '<li><b>' + (i + 1) + '</b> ' + esc(L.cam) + ' (' + esc(L.indoor) + ') – ' + esc(c.watch.filter(function (w, k, a) { return a.indexOf(w) === k; }).map(function (w) { return L.watches[w]; }).join(", ")) + '</li>'; }).join("") +
      (r.outside ? '<li><b>' + (r.cams.length + 1) + '</b> ' + esc(L.cam) + ' (' + esc(L.outdoor) + ') – ' + esc(L.watches.outside) + '</li>' : "");
    var rows = e.lines.map(function (l) { return '<tr><td>' + esc(tr(l[0])) + '</td><td class="n">' + l[1] + '</td><td class="n">' + money(l[3]) + '</td></tr>'; }).join("") +
      e.lab.map(function (l) { return '<tr class="lab"><td>' + esc(tr(l[0])) + '</td><td class="n">' + l[1] + '</td><td class="n">' + money(l[1] * l[2]) + '</td></tr>'; }).join("");
    $("res").innerHTML = '<div class="kpis"><div><b>' + e.n + '</b><span>' + esc(L.cams) + '</span></div><div><b>' + cov + '%</b><span>' + esc(L.cov) + '</span></div><div><b>' + esc(e.nvr.replace("nvr", "")) + 'ch</b><span>' + esc(L.nvr) + '</span></div><div><b>' + e.disks.join("+") + ' ' + esc(L.tb) + '</b><span>' + esc(L.hdd) + ' · ' + S.days + (ar ? " يوم" : " days") + '</span></div></div>' +
      (cov < 100 ? '<p class="muted small">' + esc(L.gaps) + '</p>' : '') + '<ol class="camlist">' + list + '</ol>' +
      '<table class="est"><tbody>' + rows + '</tbody><tfoot><tr><td colspan="2">' + esc(L.total) + '</td><td class="n">' + esc(L.aed) + ' ' + money(e.total) + '</td></tr></tfoot></table>';
    $("wa").href = "https://wa.me/971557971520?text=" + encodeURIComponent(waText(r, e));
    window.QT_SHOP_PLAN = { type: "shop-plan", title: L.types[S.type] + " · " + S.W + "×" + S.D + " " + L.m, summary: e.n + " " + L.cams + " · " + cov + "% · " + e.nvr.replace("nvr", "") + "ch", total: e.total, data: { text: waText(r, e), plan: { type: S.type, W: S.W, D: S.D, items: S.items, stock: S.stock, days: S.days, brand: S.brand } } };
  }
  function waText(r, e) {
    return [L.wa, L.types[S.type] + ", " + S.W + " × " + S.D + " " + L.m, e.n + " " + L.cams + " (" + e.nin + " " + L.indoor + (e.nout ? ", " + e.nout + " " + L.outdoor : "") + "), " + L.cov + " " + Math.round(r.cov * 100) + "%",
      L.nvr + " " + e.nvr.replace("nvr", "") + "ch · " + L.hdd + " " + e.disks.join("+") + " " + L.tb + " (" + S.days + (ar ? " يوم" : " days") + ")",
      L.total + ": " + L.aed + " " + money(e.total), location.origin + "/shop-planner.html"].join("\n");
  }

  /* ---------- interaction ---------- */
  function toPlan(ev) { var pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY; var m = svg.getScreenCTM(); return m ? pt.matrixTransform(m.inverse()) : { x: 0, y: 0 }; }
  var drag = null, lastTap = { k: null, t: 0 }, raf = 0;
  function redrawSoon() { if (raf) return; raf = requestAnimationFrame(function () { raf = 0; draw(); }); }
  svg.addEventListener("pointerdown", function (ev) {
    var g = ev.target.closest(".drag"), p = toPlan(ev);
    if (S.tool && !g) {
      if (S.tool === "stock") S.stock = { x: Math.max(0, Math.min(S.W - 2.5, p.x - 1.25)), y: Math.max(0, Math.min(S.D - 2.5, p.y - 1.25)), w: 2.5, h: 2.5 };
      else S.items.push({ t: S.tool, x: S.tool === "outside" ? Math.max(0.5, Math.min(S.W - 0.5, p.x)) : Math.max(0.2, Math.min(S.W - 0.2, p.x)), y: S.tool === "outside" ? S.D + 0.9 : Math.max(0.2, Math.min(S.D - 0.2, p.y)) });
      setTool(null); draw(); return;
    }
    if (!g) return;
    var k = g.getAttribute("data-k"), now = Date.now();
    if (lastTap.k === k && now - lastTap.t < 380) { if (k === "stock") S.stock = null; else S.items.splice(+k, 1); lastTap = { k: null, t: 0 }; draw(); return; }
    lastTap = { k: k, t: now };
    var o = k === "stock" ? S.stock : S.items[+k];
    drag = { k: k, dx: p.x - o.x, dy: p.y - o.y }; svg.setPointerCapture(ev.pointerId); ev.preventDefault();
  });
  svg.addEventListener("pointermove", function (ev) {
    if (!drag) return; var p = toPlan(ev);
    if (drag.k === "stock") { S.stock.x = Math.max(0, Math.min(S.W - S.stock.w, p.x - drag.dx)); S.stock.y = Math.max(0, Math.min(S.D - S.stock.h, p.y - drag.dy)); }
    else { var it = S.items[+drag.k]; it.x = Math.max(0.2, Math.min(S.W - 0.2, p.x - drag.dx)); it.y = it.t === "outside" ? S.D + 0.9 : Math.max(0.2, Math.min(S.D - 0.2, p.y - drag.dy)); }
    redrawSoon();
  });
  svg.addEventListener("pointerup", function () { drag = null; });
  function setTool(t) { S.tool = t; document.querySelectorAll("#tools [data-tool]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-tool") === t); }); $("hint").textContent = t ? L.place + ": " + (L.items[t] || "") : L.sel; }
  $("tools").innerHTML = ["door", "back", "till", "safe", "shelf", "stock", "outside"].map(function (t) { return '<button type="button" data-tool="' + t + '" aria-pressed="false">' + ICON[t] + ' ' + esc(L.items[t]) + '</button>'; }).join("");
  $("tools").addEventListener("click", function (e) { var b = e.target.closest("[data-tool]"); if (b) setTool(S.tool === b.getAttribute("data-tool") ? null : b.getAttribute("data-tool")); });
  $("types").innerHTML = Object.keys(L.types).map(function (k) { return '<button type="button" data-type="' + k + '" aria-pressed="' + (k === S.type) + '">' + esc(L.types[k]) + '</button>'; }).join("");
  $("types").addEventListener("click", function (e) { var b = e.target.closest("[data-type]"); if (!b) return; S.type = b.getAttribute("data-type"); document.querySelectorAll("#types [data-type]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
    if (S.type === "office" && S.W < 10) { S.W = 12; S.D = 9; } syncSize(); preset(S.type); draw(); });
  function syncSize() { $("w").value = S.W; $("d").value = S.D; $("wv").textContent = S.W + " " + L.m; $("dv").textContent = S.D + " " + L.m; }
  function resize() {
    var nw = +$("w").value, nd = +$("d").value, fx = nw / S.W, fy = nd / S.D;
    S.items.forEach(function (it) { it.x = Math.min(nw - 0.2, it.x * fx); it.y = it.t === "outside" ? nd + 0.9 : Math.min(nd - 0.2, it.y * fy); });
    if (S.stock) { S.stock.x *= fx; S.stock.y *= fy; S.stock.w = Math.min(nw, S.stock.w * fx); S.stock.h = Math.min(nd, S.stock.h * fy); }
    S.W = nw; S.D = nd; syncSize(); redrawSoon();
  }
  $("w").addEventListener("input", resize); $("d").addEventListener("input", resize);
  $("days").addEventListener("change", function () { S.days = +this.value; draw(); });
  $("brand").addEventListener("change", function () { S.brand = this.value; draw(); });
  $("mon").addEventListener("change", function () { S.monitor = this.checked; draw(); });
  $("reset").addEventListener("click", function () { preset(S.type); draw(); });
  $("pdf").addEventListener("click", function () { if (window.QT_CLOUD && window.QT_SHOP_PLAN) window.QT_CLOUD.add(window.QT_SHOP_PLAN); window.print(); });
  $("wa").addEventListener("click", function () { if (window.qtTrack) qtTrack("lead_form", { form: "shop_planner" }); });
  /* reopen from account history (?plan=… in sessionStorage) */
  try { var rs = sessionStorage.getItem("qt-restore-shop"); if (rs) { sessionStorage.removeItem("qt-restore-shop"); var pj = JSON.parse(rs).plan; if (pj && pj.items) { Object.assign(S, pj); } } } catch (e) {}
  if (!S.items.length) preset(S.type);
  document.querySelectorAll("#types [data-type]").forEach(function (x) { x.setAttribute("aria-pressed", x.getAttribute("data-type") === S.type); });
  $("days").value = S.days; $("brand").value = S.brand;
  syncSize(); setTool(null); draw();
  window.__shop = { S: S, plan: plan, estimate: estimate };
})();
