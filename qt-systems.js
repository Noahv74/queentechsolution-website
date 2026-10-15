/* Queen Tech – QR system cards (Firebase Firestore lite).
   systems/{id}          public by id (get only, no listing). No names or phone numbers here:
                         { type, title, site, brand, model, installed, warranty, next, plan, log:[{at,note}], created, updated }
   systems_private/{id}  admins only: { name, phone, address, notes }
   Admins = documents in admins/{uid} (same as FixTrack). Rules: firestore.rules. */
import { enabled, firebase } from "/qt-auth.js";
export { enabled };
const V = "10.12.2";
let dbP = null;
function db() {
  if (!enabled) return Promise.reject(new Error("off"));
  if (!dbP) dbP = firebase().then(fb => import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore-lite.js`)
    .then(fs => ({ fb, fs, db: fs.getFirestore(fb.auth.app) })));
  return dbP;
}
export const TYPES = ["cctv", "access", "barrier", "network", "intercom", "other"];
const ABC = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
export function newId() {
  const r = crypto.getRandomValues(new Uint8Array(10)); let s = "";
  for (let i = 0; i < 10; i++) s += ABC[r[i] % ABC.length];
  return s;
}
export function cleanId(s) {
  const t = String(s || "").toUpperCase().replace(/[^0-9A-Z]/g, "");
  return /^[0-9A-Z]{10}$/.test(t) ? t : null;
}
const cut = (s, n) => String(s == null ? "" : s).slice(0, n);
function pub(p) {
  return {
    type: TYPES.indexOf(p.type) >= 0 ? p.type : "other", title: cut(p.title, 80), site: cut(p.site, 80),
    brand: cut(p.brand, 40), model: cut(p.model, 80), installed: Number(p.installed) || null,
    warranty: Math.max(0, Math.min(120, Number(p.warranty) || 0)), next: Number(p.next) || null, plan: cut(p.plan, 40)
  };
}
export async function getSystem(id) {
  const d = await db(); const s = await d.fs.getDoc(d.fs.doc(d.db, "systems", id));
  return s.exists() ? Object.assign({ id }, s.data()) : null;
}
export async function isAdmin(uid) {
  const d = await db(); const s = await d.fs.getDoc(d.fs.doc(d.db, "admins", uid)); return s.exists();
}
export async function listSystems(max) {
  const d = await db();
  const s = await d.fs.getDocs(d.fs.query(d.fs.collection(d.db, "systems"), d.fs.orderBy("updated", "desc"), d.fs.limit(max || 300)));
  return s.docs.map(x => Object.assign({ id: x.id }, x.data()));
}
export async function getPrivate(id) {
  const d = await db(); const s = await d.fs.getDoc(d.fs.doc(d.db, "systems_private", id));
  return s.exists() ? s.data() : {};
}
export async function saveSystem(id, p, priv) {
  const d = await db(), now = Date.now(), isNew = !id;
  id = id || newId();
  const data = Object.assign(pub(p), { updated: now });
  if (isNew) Object.assign(data, { created: now, log: [{ at: now, note: "Installed by Queen Tech" }] });
  await d.fs.setDoc(d.fs.doc(d.db, "systems", id), data, { merge: true });
  if (priv) await d.fs.setDoc(d.fs.doc(d.db, "systems_private", id), {
    name: cut(priv.name, 80), phone: cut(priv.phone, 30), address: cut(priv.address, 160), notes: cut(priv.notes, 800)
  }, { merge: true });
  return id;
}
/* service visit: adds a line to the public history, optionally moves the next service date */
export async function addVisit(id, note, next) {
  const d = await db(), now = Date.now();
  const up = { updated: now, log: d.fs.arrayUnion({ at: now, note: cut(note, 200) }) };
  if (next !== undefined) up.next = Number(next) || null;
  await d.fs.updateDoc(d.fs.doc(d.db, "systems", id), up);
}
export async function removeSystem(id) {
  const d = await db();
  await d.fs.deleteDoc(d.fs.doc(d.db, "systems", id));
  try { await d.fs.deleteDoc(d.fs.doc(d.db, "systems_private", id)); } catch (e) {}
}
