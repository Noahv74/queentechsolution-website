/* Crown Heist – game engine (no drawing). Hold to sneak up the corridor, let go to freeze.
   Each camera cycles: away -> warn (light blinks) -> watch (looking down the corridor) -> away.
   Sometimes it only pretends (warn -> away). A camera only sees the part of the corridor below it.
   Moving while a camera that can see you is watching = caught (back to the start of the level). */
(function (root) {
  "use strict";
  var DT = 1 / 60, SPEED = 165, GRACE = 0.14, W = 540;

  // per level: corridor length, cameras [side, height from the crown], away/warn/watch times (s), chance of a fake-out
  var LEVELS = [
    { len: 700,  cams: [["c", 0]], away: [1.6, 2.6], warn: 0.75, watch: [1.2, 1.8], fake: 0 },
    { len: 820,  cams: [["c", 0]], away: [1.2, 2.2], warn: 0.65, watch: [1.0, 1.8], fake: 0 },
    { len: 880,  cams: [["c", 0]], away: [1.1, 2.0], warn: 0.6,  watch: [1.0, 1.6], fake: 0.3 },
    { len: 980,  cams: [["c", 0], ["r", 460]], away: [1.3, 2.4], warn: 0.6, watch: [1.0, 1.6], fake: 0.15 },
    { len: 1020, cams: [["c", 0], ["l", 520]], away: [1.0, 2.0], warn: 0.5,  watch: [0.9, 1.5], fake: 0.3 },
    { len: 1080, cams: [["c", 0], ["r", 420]], away: [0.8, 1.6], warn: 0.5,  watch: [0.5, 1.0], fake: 0.25 },
    { len: 1140, cams: [["c", 0], ["l", 380], ["r", 760]], away: [1.2, 2.4], warn: 0.55, watch: [0.8, 1.4], fake: 0.2 },
    { len: 1200, cams: [["c", 0], ["r", 400], ["l", 800]], away: [1.0, 2.0], warn: 0.45, watch: [0.8, 1.4], fake: 0.3 },
    { len: 1260, cams: [["c", 0], ["l", 420], ["r", 840]], away: [0.9, 1.8], warn: 0.42, watch: [0.6, 1.2], fake: 0.35 },
    { len: 1340, cams: [["c", 0], ["r", 360], ["l", 720], ["r", 1060]], away: [1.0, 2.0], warn: 0.4, watch: [0.6, 1.2], fake: 0.3 },
    /* levels 11–20 (15 Oct 2026): bot with 0.2–0.3 s reaction wins 100%, ignoring warnings gets caught 100% */
    { len: 1380, cams: [["c", 0], ["l", 460], ["r", 920]], away: [1, 2], warn: 0.42, watch: [0.6, 1.2], fake: 0.4 },
    { len: 1420, cams: [["c", 0], ["r", 300], ["l", 640], ["r", 1000]], away: [1.1, 2.1], warn: 0.42, watch: [0.6, 1.1], fake: 0.3 },
    { len: 1460, cams: [["c", 0], ["l", 500], ["r", 980]], away: [0.8, 1.5], warn: 0.4, watch: [0.6, 1], fake: 0.35 },
    { len: 1500, cams: [["c", 0], ["r", 360], ["l", 720], ["r", 1080]], away: [0.9, 1.7], warn: 0.4, watch: [0.5, 1], fake: 0.35 },
    { len: 1540, cams: [["c", 0], ["l", 300], ["r", 600], ["l", 900], ["r", 1200]], away: [1.1, 2.2], warn: 0.42, watch: [0.5, 1], fake: 0.3 },
    { len: 1580, cams: [["c", 0], ["r", 520], ["l", 1040]], away: [0.7, 1.4], warn: 0.38, watch: [0.5, 0.9], fake: 0.4 },
    { len: 1620, cams: [["c", 0], ["l", 400], ["r", 800], ["l", 1200]], away: [0.8, 1.6], warn: 0.38, watch: [0.5, 1], fake: 0.4 },
    { len: 1660, cams: [["c", 0], ["r", 330], ["l", 660], ["r", 990], ["l", 1320]], away: [1, 2], warn: 0.4, watch: [0.5, 0.9], fake: 0.35 },
    { len: 1700, cams: [["c", 0], ["l", 420], ["r", 840], ["l", 1260]], away: [0.7, 1.4], warn: 0.36, watch: [0.5, 0.9], fake: 0.45 },
    { len: 1760, cams: [["c", 0], ["r", 350], ["l", 700], ["r", 1050], ["l", 1400]], away: [0.8, 1.6], warn: 0.36, watch: [0.5, 0.9], fake: 0.4 }
  ];

  function rng(seed) { var s = seed >>> 0 || 1; return function () { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
  function between(r, a) { return a[0] + r() * (a[1] - a[0]); }

  function create(index, seed) {
    var L = LEVELS[index], r = rng(seed || (index + 1) * 9973);
    var st = { index: index, L: L, rand: r, t: 0, y: L.len, crownY: 60, caught: false, won: false, moving: false, ev: [], cams: [], watchT: 0, steps: 0 };
    L.cams.forEach(function (c, i) {
      var cam = { side: c[0], y: st.crownY + 20 + c[1], s: "away", t: i === 0 ? 0.9 + r() * 0.6 : between(r, L.away) * (0.6 + r() * 0.8) + 0.6, fake: false, angle: 0, seen: 0 };
      st.cams.push(cam);
    });
    return st;
  }

  function sees(st, cam) { return st.y > cam.y; }          // a camera sees everything below it

  function step(st, hold) {
    if (st.caught || st.won) return st;
    var L = st.L, r = st.rand, dt = DT;
    st.t += dt;
    st.cams.forEach(function (c) {
      c.t -= dt;
      if (c.t > 0) return;
      if (c.s === "away") { c.s = "warn"; c.fake = r() < L.fake; c.t = L.warn * (0.85 + r() * 0.3); st.ev.push("warn"); }
      else if (c.s === "warn") {
        if (c.fake) { c.s = "away"; c.t = between(r, L.away) * 0.7; st.ev.push("fake"); }
        else { c.s = "watch"; c.t = between(r, L.watch); c.seen = 0; st.ev.push("watch"); }
      } else { c.s = "away"; c.t = between(r, L.away); st.ev.push("away"); }
    });
    st.cams.forEach(function (c) { var goal = c.s === "watch" ? 1 : c.s === "warn" ? 0.35 : 0; c.angle += (goal - c.angle) * Math.min(1, dt * 14); });
    st.moving = !!hold;
    if (hold) { st.y = Math.max(st.crownY, st.y - SPEED * dt); st.steps += dt; }
    for (var i = 0; i < st.cams.length; i++) {
      var c = st.cams[i];
      if (c.s === "watch" && sees(st, c)) {
        c.seen += dt;
        if (hold && c.seen > GRACE) { st.caught = true; st.ev.push("caught"); return st; }
      }
    }
    if (st.y <= st.crownY + 4) { st.won = true; st.ev.push("win"); }
    return st;
  }

  function danger(st) {                                    // what the player should know right now: 0 safe, 1 warning, 2 watching
    var d = 0;
    st.cams.forEach(function (c) { if (!sees(st, c)) return; if (c.s === "watch") d = 2; else if (c.s === "warn" && d < 1) d = 1; });
    return d;
  }

  var api = { LEVELS: LEVELS, create: create, step: step, danger: danger, sees: sees, DT: DT, W: W, SPEED: SPEED };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.HeistEngine = api;
})(this);
