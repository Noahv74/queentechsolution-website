/* Queen Tech QuickSwap – loaner devices while a customer's device is being repaired (Firestore lite).
   loaners/{id}        public read: type (laptop|router|nvr|other), label, status (available|out|service), updated
   loan_requests/{id}  anyone can create (status "new"); admins read and manage:
                       company, licence, name, phone, type, repair, from, notes, lang, at, status, loaner, history[] */
import { enabled, firebase } from "/qt-auth.js";
const V = "10.12.2";
let dbP = null;
function db() {
  if (!enabled) return Promise.reject(new Error("off"));
  if (!dbP) dbP = firebase().then(fb => import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore-lite.js`)
    .then(fs => ({ fb, fs, db: fs.getFirestore(fb.auth.app) })));
  return dbP;
}
export const TYPES = ["laptop", "router", "nvr", "other"];
export async function listLoaners() {
  const d = await db();
  const snap = await d.fs.getDocs(d.fs.collection(d.db, "loaners"));
  return snap.docs.map(x => Object.assign({ id: x.id }, x.data()));
}
export async function requestLoan(r) {
  const d = await db(), s = (v, n) => String(v || "").trim().slice(0, n);
  const rec = { company: s(r.company, 80), licence: s(r.licence, 40), name: s(r.name, 60), phone: s(r.phone, 30),
    type: TYPES.includes(r.type) ? r.type : "other", repair: s(r.repair, 12).toUpperCase(), from: s(r.from, 20), notes: s(r.notes, 500),
    lang: r.lang === "ar" ? "ar" : "en", at: Date.now(), status: "new", loaner: "" };
  const ref = await d.fs.addDoc(d.fs.collection(d.db, "loan_requests"), rec);
  return ref.id;
}
/* admin */
export async function listRequests() {
  const d = await db();
  const snap = await d.fs.getDocs(d.fs.query(d.fs.collection(d.db, "loan_requests"), d.fs.orderBy("at", "desc"), d.fs.limit(200)));
  return snap.docs.map(x => Object.assign({ id: x.id }, x.data()));
}
export async function updateRequest(id, patch) { const d = await db(); await d.fs.updateDoc(d.fs.doc(d.db, "loan_requests", id), patch); }
export async function deleteRequest(id) { const d = await db(); await d.fs.deleteDoc(d.fs.doc(d.db, "loan_requests", id)); }
export async function saveLoaner(id, data) {
  const d = await db(), rec = Object.assign({}, data, { updated: Date.now() });
  if (id) { await d.fs.setDoc(d.fs.doc(d.db, "loaners", id), rec, { merge: true }); return id; }
  const ref = await d.fs.addDoc(d.fs.collection(d.db, "loaners"), Object.assign({ status: "available" }, rec)); return ref.id;
}
export async function deleteLoaner(id) { const d = await db(); await d.fs.deleteDoc(d.fs.doc(d.db, "loaners", id)); }
