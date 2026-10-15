/* Queen Tech – reviews on our own site (Firebase Firestore lite).
   reviews/{id}: name, area, service, rating 1–5, text, job (FixTrack code or ""), lang, at,
                 approved (admin), verified (admin, job confirmed), reply (admin text or null), replyAt.
   Anyone can read APPROVED reviews and create a new, unapproved one. Only admins (admins/{uid}) can approve,
   verify, reply or delete. We publish every genuine review, good or bad. */
import { enabled, firebase } from "/qt-auth.js";
const V = "10.12.2";
let dbP = null;
function db() {
  if (!enabled) return Promise.reject(new Error("off"));
  if (!dbP) dbP = firebase().then(fb => import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore-lite.js`)
    .then(fs => ({ fb, fs, db: fs.getFirestore(fb.auth.app) })));
  return dbP;
}
export const SERVICES = ["cctv", "access", "barrier", "network", "it", "laptop", "phone", "gaming", "other"];
export async function listApproved() {
  const d = await db();
  const snap = await d.fs.getDocs(d.fs.query(d.fs.collection(d.db, "reviews"), d.fs.where("approved", "==", true), d.fs.limit(300)));
  return snap.docs.map(x => Object.assign({ id: x.id }, x.data())).sort((a, b) => b.at - a.at);
}
export async function submitReview(r) {
  const d = await db();
  const rec = {
    name: String(r.name || "").trim().slice(0, 40), area: String(r.area || "").trim().slice(0, 40),
    service: SERVICES.includes(r.service) ? r.service : "other", rating: Math.max(1, Math.min(5, Math.round(+r.rating || 0))),
    text: String(r.text || "").trim().slice(0, 1000), job: String(r.job || "").trim().toUpperCase().slice(0, 12),
    lang: r.lang === "ar" ? "ar" : "en", at: Date.now(), approved: false, verified: false, reply: null, replyAt: null
  };
  const ref = await d.fs.addDoc(d.fs.collection(d.db, "reviews"), rec);
  return ref.id;
}
/* admin */
export async function listAll() {
  const d = await db();
  const snap = await d.fs.getDocs(d.fs.query(d.fs.collection(d.db, "reviews"), d.fs.orderBy("at", "desc"), d.fs.limit(300)));
  return snap.docs.map(x => Object.assign({ id: x.id }, x.data()));
}
export async function updateReview(id, patch) {
  const d = await db(); await d.fs.updateDoc(d.fs.doc(d.db, "reviews", id), patch);
}
export async function deleteReview(id) {
  const d = await db(); await d.fs.deleteDoc(d.fs.doc(d.db, "reviews", id));
}
export async function findJob(code) {
  const d = await db(); if (!code) return null;
  const snap = await d.fs.getDoc(d.fs.doc(d.db, "repairs", code));
  return snap.exists() ? snap.data() : null;
}
