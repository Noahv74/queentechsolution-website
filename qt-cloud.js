/* Queen Tech – customer cloud save (Firebase Firestore, "lite" SDK).
   Data lives under users/{uid} and only that signed-in user can read or write it (see firestore.rules).
     users/{uid}                 { email, name, games: { glitch, heist, cable, cablemis }, updated }
     users/{uid}/history/{id}    { type, title, summary, total, data, page, at }
   If Firestore is not switched on in the Firebase project, every call fails quietly and the site keeps
   working with on-device saves only (QT_CLOUD.status === "off"). */
import { enabled, firebase, canUse } from "/qt-auth.js";
const V = "10.12.2";
let dbP = null;

function db() {
  if (!enabled) return Promise.resolve(null);
  if (!dbP) dbP = firebase().then(fb => fb && import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore-lite.js`)
    .then(fs => ({ fb, fs, db: fs.getFirestore(fb.auth.app) })));
  return dbP;
}

export function onUser(cb) {
  if (!enabled) { cb(null); return; }
  firebase().then(fb => fb.onAuthStateChanged(fb.auth, u => cb(u && canUse(u) ? u : null))).catch(() => cb(null));
}

export async function getProfile(uid) {
  const d = await db(); if (!d) return null;
  const snap = await d.fs.getDoc(d.fs.doc(d.db, "users", uid));
  return snap.exists() ? snap.data() : {};
}

export async function saveGames(user, games, extra) {
  const d = await db(); if (!d) return;
  await d.fs.setDoc(d.fs.doc(d.db, "users", user.uid),
    Object.assign({ email: user.email || "", name: user.displayName || "", games, updated: Date.now() }, extra || {}), { merge: true });
}

export async function addHistory(user, item) {
  const d = await db(); if (!d) return null;
  const rec = Object.assign({ type: "other", title: "", summary: "", total: null, data: null, page: location.pathname }, item, { at: Date.now() });
  if (rec.data && typeof rec.data !== "string") rec.data = JSON.stringify(rec.data);
  if (rec.data && rec.data.length > 700000) rec.data = null;          /* stay well under Firestore's 1 MB per document */
  const ref = await d.fs.addDoc(d.fs.collection(d.db, "users", user.uid, "history"), rec);
  return ref.id;
}

export async function listHistory(uid, max) {
  const d = await db(); if (!d) return [];
  const q = d.fs.query(d.fs.collection(d.db, "users", uid, "history"), d.fs.orderBy("at", "desc"), d.fs.limit(max || 50));
  const snap = await d.fs.getDocs(q);
  return snap.docs.map(x => Object.assign({ id: x.id }, x.data()));
}

export async function getHistory(uid, id) {
  const d = await db(); if (!d) return null;
  const snap = await d.fs.getDoc(d.fs.doc(d.db, "users", uid, "history", id));
  return snap.exists() ? Object.assign({ id }, snap.data()) : null;
}

export async function deleteHistory(uid, id) {
  const d = await db(); if (!d) return;
  await d.fs.deleteDoc(d.fs.doc(d.db, "users", uid, "history", id));
}

export async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(text).trim().toLowerCase()));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}
