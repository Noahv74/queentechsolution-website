/* Cable Swing – game engine (no drawing). Hold = grab the nearest hook ahead, release = let go and fly.
   World is 600 px tall; the floor is live cable (touch it and the run ends) except on bounce pads. */
(function (root) {
  "use strict";
  var H = 600, FLOOR = 560, DT = 1 / 60, GRAV = 1300, R = 12, REACH = 330, MAXV = 1150;

  function rng(seed) { var s = seed >>> 0 || 1; return function () { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }

  function create(seed) {
    var st = { seed: seed || 1, rand: rng(seed || 1), t: 0, dead: false, started: false,
      p: { x: 80, y: 420 - R, vx: 0, vy: 0, a: 0 }, hook: null, len: 0, hooks: [], pads: [], crowns: [],
      crownsGot: 0, lastHookX: 220, nextPadAt: 9, made: 0, grace: 0, prevHold: false, ev: [], startX: 80, maxX: 80 };
    st.hooks.push({ x: 260, y: 200 });
    st.lastHookX = 260; st.made = 1;
    gen(st, 1600);
    return st;
  }

  function gen(st, toX) {
    while (st.lastHookX < toX) {
      var d = Math.min(1, st.lastHookX / 14000), r = st.rand;
      var gap = 165 + r() * 70 + d * (40 + r() * 70);
      var x = st.lastHookX + gap, y = 95 + r() * (150 + d * 70);
      st.hooks.push({ x: x, y: y });
      st.made++;
      if (r() < 0.45) {                        // a crown on the way to the next hook
        st.crowns.push({ x: x + gap * 0.5, y: y + 70 + r() * 120, got: false });
      }
      if (st.made >= st.nextPadAt) {          // a bounce pad on the floor every few hooks
        st.pads.push({ x: x + 30, w: 120 });
        st.nextPadAt = st.made + 7 + Math.floor(r() * 5);
      }
      st.lastHookX = x;
    }
  }

  function target(st) {
    var p = st.p, best = null, bd = 1e9;
    for (var i = 0; i < st.hooks.length; i++) {
      var h = st.hooks[i];
      if (h.x < p.x - 40 || h.x > p.x + REACH || h.y > p.y - 12) continue;
      var d = Math.hypot(h.x - p.x, h.y - p.y);
      if (d < REACH && d < bd) { bd = d; best = h; }
    }
    return best;
  }

  function step(st, hold) {
    if (st.dead) return st;
    var p = st.p, dt = DT;
    st.t += dt;
    var pressed = hold && !st.prevHold;
    st.prevHold = hold;
    if (!st.started) {
      if (pressed) { st.started = true; p.vx = 380; p.vy = -560; st.grace = 0.35; st.ev.push("launch"); }
      return st;
    }
    if (pressed) st.grace = 0.3;
    if (!hold) { if (st.hook) { st.hook = null; p.vx *= 1.08; p.vy = p.vy * 1.08 - 40; st.ev.push("release"); } st.grace = 0; }
    else if (!st.hook && st.grace > 0) {
      var h = target(st);
      if (h) { st.hook = h; st.len = Math.max(70, Math.min(260, FLOOR - 40 - R - h.y, Math.hypot(h.x - p.x, h.y - p.y))); st.grace = 0; st.ev.push("grab"); }
    }
    st.grace = Math.max(0, st.grace - dt);

    p.vy += GRAV * dt;
    if (st.hook) {                               // swing assist: a little push along the swing
      var dx = p.x - st.hook.x, dy = p.y - st.hook.y, dl = Math.hypot(dx, dy) || 1, tx = -dy / dl, ty = dx / dl;
      var along = p.vx * tx + p.vy * ty;
      if (dy > 0) { var push = 380 * dt * (along >= 0 ? 1 : -1); p.vx += tx * push; p.vy += ty * push; }
    }
    var sp = Math.hypot(p.vx, p.vy); if (sp > MAXV) { p.vx *= MAXV / sp; p.vy *= MAXV / sp; }
    p.x += p.vx * dt; p.y += p.vy * dt;
    if (st.hook) {                               // rigid rope
      var ex = p.x - st.hook.x, ey = p.y - st.hook.y, e = Math.hypot(ex, ey);
      if (e > st.len) {
        var nx = ex / e, ny = ey / e;
        p.x = st.hook.x + nx * st.len; p.y = st.hook.y + ny * st.len;
        var rad = p.vx * nx + p.vy * ny; if (rad > 0) { p.vx -= rad * nx; p.vy -= rad * ny; }
      }
    }
    p.a += p.vx * dt * 0.05;
    if (p.y < -900) { p.y = -900; if (p.vy < 0) p.vy = 0; }
    // floor: bounce pad or live cable
    if (p.y + R >= FLOOR) {
      var pad = null;
      for (var i = 0; i < st.pads.length; i++) if (p.x > st.pads[i].x - 6 && p.x < st.pads[i].x + st.pads[i].w + 6) { pad = st.pads[i]; break; }
      if (pad) { p.y = FLOOR - R; p.vy = -Math.min(1050, Math.abs(p.vy) * 0.95 + 420); p.vx = Math.max(p.vx, 260); st.hook = null; st.ev.push("bounce"); }
      else { st.dead = true; st.ev.push("die"); }
    }
    // crowns
    for (var c = 0; c < st.crowns.length; c++) {
      var k = st.crowns[c];
      if (!k.got && Math.abs(k.x - p.x) < 22 && Math.abs(k.y - p.y) < 22) { k.got = true; st.crownsGot++; st.ev.push("crown"); }
    }
    if (p.x > st.maxX) st.maxX = p.x;
    if (st.lastHookX < p.x + 1600) gen(st, p.x + 2000);
    // forget what is far behind
    while (st.hooks.length > 4 && st.hooks[0].x < p.x - 900 && st.hooks[0] !== st.hook) st.hooks.shift();
    while (st.crowns.length && st.crowns[0].x < p.x - 900) st.crowns.shift();
    while (st.pads.length && st.pads[0].x + st.pads[0].w < p.x - 900) st.pads.shift();
    return st;
  }

  function meters(st) { return Math.max(0, Math.floor((st.maxX - st.startX) / 40)); }

  var api = { create: create, step: step, target: target, meters: meters, H: H, FLOOR: FLOOR, R: R, DT: DT, REACH: REACH };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.CableEngine = api;
})(this);
