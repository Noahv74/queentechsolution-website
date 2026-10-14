/* Queen Tech accounts (Firebase Authentication).
   - account.html imports the helpers below.
   - Free-tool pages with <html data-gate> are locked until the visitor is signed in. */
const C = window.QT_AUTH || {};
const V = "10.12.2";
let fbPromise = null;

export const enabled = !!C.firebase;

export function firebase() {
  if (!enabled) return Promise.resolve(null);
  if (!fbPromise) {
    fbPromise = Promise.all([
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`)
    ]).then(([appMod, authMod]) => {
      const app = appMod.initializeApp(C.firebase);
      const auth = authMod.getAuth(app);
      return Object.assign({ auth }, authMod);
    });
  }
  return fbPromise;
}

export function canUse(user) {
  return !!user && (user.emailVerified || C.requireVerifiedEmail === false);
}

/* Save a new sign-up as a row in the Google Sheet (fire and forget). */
export function saveLead(data) {
  if (!C.sheetUrl) return Promise.resolve();
  const body = JSON.stringify(Object.assign({ page: location.pathname, at: new Date().toISOString() }, data));
  return fetch(C.sheetUrl, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body, keepalive: true })
    .catch(() => {});
}

export function message(err) {
  const c = (err && err.code) || "";
  return ({
    "auth/email-already-in-use": "There's already an account with this email. Sign in instead, or reset your password.",
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/weak-password": "Please use a password of at least 8 characters.",
    "auth/missing-password": "Please enter your password.",
    "auth/invalid-credential": "Email or password is wrong.",
    "auth/wrong-password": "Email or password is wrong.",
    "auth/user-not-found": "There's no account with this email yet.",
    "auth/too-many-requests": "Too many attempts. Please wait a few minutes and try again.",
    "auth/network-request-failed": "No connection. Check your internet and try again.",
    "auth/unauthorized-domain": "This website isn't allowed in the Firebase settings yet (Authentication → Settings → Authorized domains).",
    "auth/operation-not-allowed": "Email sign-in isn't switched on in Firebase yet (Authentication → Sign-in method → Email/Password)."
  })[c] || "Something went wrong. Please try again." + (c ? " (" + c + ")" : "");
}

/* ---------- gate for tool pages ---------- */
function esc(s) { return String(s || "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]); }

function gateBox(html) {
  let g = document.getElementById("qt-gate");
  if (!g) { g = document.createElement("div"); g.id = "qt-gate"; g.setAttribute("role", "dialog"); g.setAttribute("aria-modal", "true"); document.body.appendChild(g); }
  g.innerHTML = '<div class="box">' + html + "</div>";
  return g;
}

function unlock() {
  document.documentElement.classList.remove("qt-locked");
  const g = document.getElementById("qt-gate"); if (g) g.remove();
}

function chip(fb, user) {
  const nav = document.querySelector("header .nav");
  if (!nav || document.querySelector(".qt-chip")) return;
  const s = document.createElement("span");
  s.className = "qt-chip";
  s.innerHTML = '<span>' + esc(user.displayName || user.email) + '</span> · <a href="/account.html">Account</a> · <button type="button">Sign out</button>';
  s.querySelector("button").addEventListener("click", () => fb.signOut(fb.auth).then(() => location.reload()));
  const brand = nav.querySelector(".brand");
  brand && brand.nextSibling ? nav.insertBefore(s, brand.nextSibling) : nav.appendChild(s);
}

async function gate() {
  const tool = document.documentElement.getAttribute("data-gate") || "this tool";
  const next = encodeURIComponent(location.pathname + location.hash);
  gateBox('<div class="spin" aria-label="Checking your account"></div>');
  let fb;
  try { fb = await firebase(); }
  catch (e) {
    gateBox('<span class="k">Connection problem</span><h2>Couldn\'t check your account</h2><p>Please check your internet connection and reload the page.</p><div class="row"><button class="b g" type="button" onclick="location.reload()">Reload</button></div>');
    return;
  }
  fb.onAuthStateChanged(fb.auth, async (user) => {
    if (user && !user.emailVerified && C.requireVerifiedEmail !== false) { try { await user.reload(); user = fb.auth.currentUser; } catch (e) {} }
    if (canUse(user)) { unlock(); chip(fb, user); return; }
    document.documentElement.classList.add("qt-locked");
    if (user) {
      const g = gateBox('<span class="k">One more step</span><h2>Verify your email</h2><p>We sent a link to <b style="color:#EFE8DB">' + esc(user.email) + '</b>. Click it, then come back and press continue.</p><p style="font-size:.85rem">Can\'t find it? Check spam or junk.</p><div class="row"><button class="b g" type="button" data-a="go">I\'ve verified, continue</button><button class="b" type="button" data-a="re">Send again</button><button class="b" type="button" data-a="out">Sign out</button></div><p data-msg style="margin-top:12px;font-size:.88rem"></p>');
      g.addEventListener("click", async (e) => {
        const a = e.target.getAttribute("data-a"), m = g.querySelector("[data-msg]");
        if (a === "go") { await user.reload(); canUse(fb.auth.currentUser) ? location.reload() : (m.textContent = "Not verified yet. Click the link in the email first."); }
        if (a === "re") { try { await fb.sendEmailVerification(user, { url: location.href }); m.textContent = "Sent. Check your inbox."; } catch (err) { m.textContent = message(err); } }
        if (a === "out") { await fb.signOut(fb.auth); location.reload(); }
      });
      return;
    }
    gateBox('<span class="k">Limited free service</span><h2>Free with a Queen Tech account</h2><p>' + esc(tool) + ' is free for registered customers. Create your account once and use it any time, on any device.</p><ul><li>Free, takes about a minute</li><li>Use all Queen Tech free tools</li><li>We never share your details</li></ul><div class="row"><a class="b g" href="/account.html?mode=signup&next=' + next + '">Create free account</a><a class="b" href="/account.html?next=' + next + '">Sign in</a></div><p style="margin-top:14px;font-size:.85rem"><a href="/" style="color:#A79E8F">Back to home page</a></p>');
  });
}

if (enabled && document.documentElement.hasAttribute("data-gate")) {
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", gate) : gate();
}
