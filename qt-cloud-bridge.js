/* Queen Tech – cloud save bridge for normal (non-module) pages: games, BOQ builder, price check.
   window.QT_CLOUD.onUser(fn)       fn(user or null) once the sign-in state is known
   window.QT_CLOUD.add(item)        save one history entry for the signed-in customer (no-op when signed out)
   window.QT_CLOUD.status           "loading" | "on" | "off" (Firestore not switched on / offline) | "signed-out"
   Game progress sync lives in games/shell.js and uses QT_CLOUD.mod (the qt-cloud.js module). */
(function () {
  "use strict";
  if (window.QT_CLOUD) return;
  var waiters = [], user, known = false;
  var C = window.QT_CLOUD = {
    status: "loading", user: null, mod: null,
    onUser: function (fn) { if (known) fn(user); else waiters.push(fn); },
    add: function (item) {
      if (!C.user || !C.mod || C.status === "off") return Promise.resolve(null);
      return C.mod.addHistory(C.user, item).then(function (id) { toast(); return id; }, function (e) { off(e); return null; });
    }
  };
  function off(e) { if (e && /permission|not.?found|unavailable|failed-precondition|NOT_FOUND|database/i.test(String(e.code || e.message || e))) C.status = "off"; }
  C.off = off;
  function toast() {
    var t = document.createElement("div");
    t.textContent = (document.documentElement.lang === "ar" || window.QT_LANG === "ar") ? "☁ اتحفظ في حسابك" : "☁ Saved to your account";
    t.style.cssText = "position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:500;background:#201E1A;color:#EFE8DB;border:1px solid #E2A63F;border-radius:999px;padding:8px 16px;font:600 14px system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.4)";
    document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2200);
  }
  function settle(u) { user = u || null; C.user = user; if (!user && C.status === "loading") C.status = "signed-out"; known = true; var w = waiters; waiters = []; w.forEach(function (fn) { try { fn(user); } catch (e) {} }); }
  function boot() {
    if (!window.QT_AUTH || !window.QT_AUTH.firebase) return settle(null);
    import("/qt-cloud.js").then(function (m) {
      C.mod = m;
      m.onUser(function (u) {
        if (!u) { C.status = "signed-out"; return settle(null); }
        C.status = "on"; settle(u);
      });
    }).catch(function () { C.status = "off"; settle(null); });
  }
  if (window.QT_AUTH) boot();
  else { var s = document.createElement("script"); s.src = "/qt-auth-config.js"; s.onload = boot; s.onerror = function () { settle(null); }; document.head.appendChild(s); }
})();
