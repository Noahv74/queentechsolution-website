/* Queen Tech FixTrack – repair tracking (Firebase Firestore lite).
   repairs/{code}          public by code (get only, no listing): first name, device, issue, stage, times, note, quote, eta, lang
   repairs_private/{code}  admins only: full name, phone, private notes
   admins/{uid}            exists = this signed-in user is an admin (create it once in the Firebase console)
   Stages: 0 Received · 1 Diagnosing · 2 Waiting for approval · 3 Repairing · 4 Ready (+ collected = done) */
import { enabled, firebase } from "/qt-auth.js";
const V = "10.12.2";
let dbP = null;
function db() {
  if (!enabled) return Promise.reject(new Error("off"));
  if (!dbP) dbP = firebase().then(fb => import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore-lite.js`)
    .then(fs => ({ fb, fs, db: fs.getFirestore(fb.auth.app) })));
  return dbP;
}
export const STAGES = 5;
const ABC = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";             /* no 0/O/1/I */
export function newCode() {
  const r = crypto.getRandomValues(new Uint8Array(8)); let s = "";
  for (let i = 0; i < 8; i++) s += ABC[r[i] % ABC.length];
  return "QT-" + s.slice(0, 4) + "-" + s.slice(4);
}
export function cleanCode(c) {
  const s = String(c || "").toUpperCase().replace(/[^0-9A-Z]/g, "").replace(/^QT/, "");
  return s.length === 8 ? "QT-" + s.slice(0, 4) + "-" + s.slice(4) : null;
}
export async function getRepair(code) {
  const d = await db(); const snap = await d.fs.getDoc(d.fs.doc(d.db, "repairs", code));
  return snap.exists() ? Object.assign({ code }, snap.data()) : null;
}
export async function me() { const d = await db(); return d.fb; }
export async function isAdmin(uid) {
  const d = await db(); const snap = await d.fs.getDoc(d.fs.doc(d.db, "admins", uid)); return snap.exists();
}
export async function listRepairs(max) {
  const d = await db();
  const snap = await d.fs.getDocs(d.fs.query(d.fs.collection(d.db, "repairs"), d.fs.orderBy("updated", "desc"), d.fs.limit(max || 150)));
  return snap.docs.map(x => Object.assign({ code: x.id }, x.data()));
}
export async function getPrivate(code) {
  const d = await db(); const snap = await d.fs.getDoc(d.fs.doc(d.db, "repairs_private", code));
  return snap.exists() ? snap.data() : {};
}
export async function createRepair(pub, priv) {
  const d = await db(), code = newCode(), now = Date.now();
  const rec = Object.assign({ first: "", device: "", issue: "", note: "", quote: null, eta: "", lang: "en", stage: 0, collected: false }, pub,
    { times: { 0: now }, created: now, updated: now });
  await d.fs.setDoc(d.fs.doc(d.db, "repairs", code), rec);
  await d.fs.setDoc(d.fs.doc(d.db, "repairs_private", code), Object.assign({ name: "", phone: "", notes: "" }, priv, { created: now }));
  return Object.assign({ code }, rec);
}
export async function updateRepair(code, patch, privPatch) {
  const d = await db(), now = Date.now(), up = Object.assign({}, patch, { updated: now });
  if (typeof patch.stage === "number") up["times." + patch.stage] = now;
  await d.fs.updateDoc(d.fs.doc(d.db, "repairs", code), up);
  if (privPatch) await d.fs.setDoc(d.fs.doc(d.db, "repairs_private", code), privPatch, { merge: true });
}
export async function deleteRepair(code) {
  const d = await db();
  await d.fs.deleteDoc(d.fs.doc(d.db, "repairs", code));
  await d.fs.deleteDoc(d.fs.doc(d.db, "repairs_private", code));
}
