BODY = '''
<style>
.adm{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:18px;align-items:start;padding:20px 0 40px}
@media (max-width:900px){.adm{grid-template-columns:1fr}}
.tool{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}
.tool input{flex:1 1 180px;font:inherit;padding:10px 12px;border:1px solid var(--line-2);border-radius:4px;background:var(--bg);color:var(--ink)}
.counts{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}
.counts button{all:unset;cursor:pointer;font:600 .8rem var(--f-mono);padding:6px 10px;border:1px solid var(--line-2);border-radius:999px;color:var(--muted)}
.counts button[aria-pressed=true]{border-color:var(--gold);color:var(--gold-2)}
.rows{display:grid;gap:8px}
.row{all:unset;box-sizing:border-box;display:grid;grid-template-columns:1fr auto;gap:3px 12px;padding:12px 14px;border:1px solid var(--line-2);border-radius:8px;background:var(--surface);cursor:pointer}
.row:hover,.row[aria-current=true]{border-color:var(--gold)}
.row b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.row small{color:var(--muted);font-size:.84rem;grid-column:1/-1}
.pill{font:700 .64rem/1 var(--f-mono);letter-spacing:.06em;text-transform:uppercase;padding:5px 7px;border-radius:3px;border:1px solid var(--line-2);color:var(--muted);align-self:start}
.pill.due{border-color:var(--warn);color:var(--warn)}
.pill.soon{border-color:var(--gold);color:var(--gold-2)}
.field select,.field input{font:inherit}
.stk{display:flex;gap:16px;align-items:center;flex-wrap:wrap;border:1px dashed var(--line-2);border-radius:8px;padding:14px;margin-top:14px;background:var(--bg-2)}
.sticker{width:50mm;height:62mm;background:#fff;color:#111;border-radius:3mm;display:grid;justify-items:center;align-content:center;gap:1.2mm;padding:3mm;box-sizing:border-box;font-family:Figtree,Arial,sans-serif;text-align:center}
.sticker .q svg{width:36mm;height:36mm;display:block}
.sticker .b{font:900 4.2mm/1 "Big Shoulders Display","Arial Narrow",sans-serif;letter-spacing:.04em}
.sticker .s{font-size:2.6mm;line-height:1.25}
.sticker .i{font:600 2.8mm "JetBrains Mono",monospace;letter-spacing:.06em}
@media print{
  @page{margin:8mm}
  html,body{background:#fff!important}
  body *{visibility:hidden!important}
  #print,#print *{visibility:visible!important}
  #print{position:absolute;inset:0 auto auto 0;display:flex!important;flex-wrap:wrap;gap:4mm}
  .sticker{break-inside:avoid;border:.2mm solid #ccc}
}
#print{display:none}
</style>
  <section class="phead" style="padding-bottom:6px">
    <span class="tag">Private · Queen Tech staff only</span>
    <h1>System <em>cards.</em></h1>
    <p class="lede">Register every system you install, print its QR sticker, and log each service visit. Customers scan the sticker to see warranty and history and to report problems.</p>
  </section>

  <div class="block" id="gate">Loading…</div>

  <div id="app" hidden>
    <div class="adm">
      <div>
        <div class="counts" id="counts"></div>
        <div class="tool">
          <input id="q" placeholder="Search title, area, customer, ID" aria-label="Search">
          <button class="btn btn-gold" id="new" type="button">+ New system</button>
        </div>
        <div class="rows" id="rows"></div>
      </div>

      <div>
        <form class="block" id="ed" novalidate hidden>
          <h2 id="ed-h">New system</h2>
          <div class="two">
            <div class="field"><label for="e-type">Type</label><select id="e-type"><option value="cctv">CCTV</option><option value="access">Access control</option><option value="barrier">Parking barrier</option><option value="network">Network / Wi-Fi</option><option value="intercom">Video intercom</option><option value="other">Other</option></select></div>
            <div class="field"><label for="e-plan">Care Plan</label><select id="e-plan"><option value="">No plan</option><option>Home Care</option><option>Standard</option><option>Business</option><option>IT Starter</option><option>IT Business</option><option>IT Pro</option><option>Custom plan</option></select></div>
          </div>
          <div class="field"><label for="e-title">Title (shows to the customer)</label><input id="e-title" maxlength="80" placeholder="Villa CCTV – 8 cameras"></div>
          <div class="field"><label for="e-site">Area / site (no street address)</label><input id="e-site" maxlength="80" placeholder="Arabian Ranches, Dubai"></div>
          <div class="two">
            <div class="field"><label for="e-brand">Brand</label><input id="e-brand" maxlength="40" placeholder="Hikvision"></div>
            <div class="field"><label for="e-model">Main model</label><input id="e-model" maxlength="80" placeholder="NVR DS-7608NI + 8 × 4MP"></div>
          </div>
          <div class="two">
            <div class="field"><label for="e-inst">Installed on</label><input id="e-inst" type="date"></div>
            <div class="field"><label for="e-war">Warranty (months)</label><input id="e-war" type="number" min="0" max="120" value="12"></div>
          </div>
          <div class="field"><label for="e-next">Next service</label><input id="e-next" type="date"><span class="hint">Leave empty if none. With a Care Plan: every 3 or 6 months.</span></div>
          <h3 style="margin:18px 0 10px;font-size:1.05rem">Customer (private, staff only)</h3>
          <div class="two">
            <div class="field"><label for="p-name">Name</label><input id="p-name" maxlength="80"></div>
            <div class="field"><label for="p-phone">Phone</label><input id="p-phone" type="tel" maxlength="30"></div>
          </div>
          <div class="field"><label for="p-addr">Address</label><input id="p-addr" maxlength="160"></div>
          <div class="field"><label for="p-notes">Notes (never store passwords here)</label><textarea id="p-notes" maxlength="800" placeholder="Cable routes, IP addresses, where the recorder is…"></textarea></div>
          <div class="cta-row" style="margin-top:0"><button class="btn btn-gold" type="submit">Save</button><button class="btn btn-line" type="button" id="cancel">Cancel</button></div>
          <div class="err" id="e-err"></div>
        </form>

        <div class="block" id="det" hidden>
          <span class="tag" id="d-type">–</span>
          <h2 id="d-title" style="margin-top:10px">–</h2>
          <p class="muted" id="d-site"></p>
          <div class="kv">
            <div><span>Customer</span><b id="d-name">–</b></div>
            <div><span>Phone</span><b id="d-phone">–</b></div>
            <div><span>Installed</span><b id="d-inst">–</b></div>
            <div><span>Next service</span><b id="d-next">–</b></div>
          </div>
          <p class="note" id="d-notes" style="margin-top:10px;white-space:pre-wrap"></p>
          <div class="stk">
            <div class="sticker" id="stk"></div>
            <div style="display:grid;gap:8px">
              <button class="btn btn-gold" type="button" id="d-print">Print sticker</button>
              <label class="note">Copies <input id="d-copies" type="number" min="1" max="24" value="1" style="width:60px;font:inherit;padding:4px;background:var(--bg);color:var(--ink);border:1px solid var(--line-2);border-radius:4px"></label>
              <a class="btn btn-line" id="d-open" href="#" target="_blank" rel="noopener">Open card</a>
              <a class="btn btn-wa" id="d-wa" href="#" target="_blank" rel="noopener">Send card to customer</a>
              <a class="btn btn-line" id="d-rem" href="#" target="_blank" rel="noopener">Service reminder</a>
            </div>
          </div>
          <form id="vf" novalidate style="margin-top:18px">
            <h3 style="margin-bottom:10px;font-size:1.05rem">Log a service visit</h3>
            <div class="field"><label for="v-note">What was done (shows to the customer)</label><input id="v-note" maxlength="200" placeholder="Service visit: cleaned 8 cameras, HDD healthy, 31 days recording"></div>
            <div class="field"><label for="v-next">Next service</label><input id="v-next" type="date"></div>
            <div class="cta-row" style="margin-top:0"><button class="btn btn-gold" type="submit">Add visit</button><button class="btn btn-line" type="button" id="d-edit">Edit details</button><button class="btn btn-line" type="button" id="d-del">Delete</button></div>
            <div class="err" id="v-err"></div>
          </form>
          <h3 style="margin:18px 0 10px;font-size:1.05rem">History</h3>
          <ol class="tl" id="d-log"></ol>
        </div>
      </div>
    </div>
  </div>
  <div id="print"></div>
'''

SCRIPT = '''
<script src="/qt-auth-config.js"></script>
<script src="/vendor/qrcode.js"></script>
<script type="module">
import { firebase } from "/qt-auth.js";
import { enabled, isAdmin, listSystems, getPrivate, saveSystem, addVisit, removeSystem } from "/qt-systems.js";
const $ = id => document.getElementById(id);
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const TN = { cctv: "CCTV", access: "Access control", barrier: "Parking barrier", network: "Network / Wi-Fi", intercom: "Video intercom", other: "Other" };
const fmt = ms => ms ? new Date(ms).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "–";
const toDate = ms => { if (!ms) return ""; const d = new Date(ms); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
const fromDate = s => s ? new Date(s + "T10:00:00").getTime() : null;
const url = id => location.origin + "/system.html?id=" + id;
const DAY = 864e5;
let all = [], privs = {}, sel = null, filt = "all", editing = null;

function gate(h) { $("gate").innerHTML = h; $("gate").hidden = false; $("app").hidden = true; }
if (!enabled) gate("Firebase is not set up.");
else firebase().then(fb => fb.onAuthStateChanged(fb.auth, async u => {
  if (!u) { gate('<h2>Sign in</h2><p>Sign in with your Queen Tech account.</p><a class="btn btn-gold" href="/account.html?next=/systems-admin.html">Sign in</a>'); return; }
  let ok = false, why = "";
  try { ok = await isAdmin(u.uid); } catch (e) { why = e.code || e.message; }
  if (!ok) { gate("Signed in as " + esc(u.email) + ". This account is not on the admin list" + (why ? " (" + esc(why) + ")" : "") + ". Add a document admins/" + esc(u.uid) + " in Firebase → Firestore (same as for the repairs board)."); return; }
  $("gate").hidden = true; $("app").hidden = false; refresh();
}));

async function refresh() {
  try {
    all = await listSystems(500);
    const ps = await Promise.all(all.map(s => getPrivate(s.id).catch(() => ({}))));
    privs = {}; all.forEach((s, i) => privs[s.id] = ps[i] || {});
    draw();
  } catch (e) { gate("Couldn't load systems: " + esc(e.code || e.message) + ". Publish the latest firestore.rules in Firebase."); }
}
const isDue = s => s.next && s.next < Date.now();
const isSoon = s => s.next && s.next >= Date.now() && s.next < Date.now() + 14 * DAY;
function draw() {
  const c = { all: all.length, due: all.filter(isDue).length, soon: all.filter(isSoon).length, plan: all.filter(s => s.plan).length };
  $("counts").innerHTML = [["all", "All"], ["due", "Service overdue"], ["soon", "Due in 14 days"], ["plan", "On a plan"]].map(([k, l]) => '<button type="button" data-k="' + k + '" aria-pressed="' + (filt === k) + '">' + l + " · " + c[k] + "</button>").join("");
  const q = $("q").value.trim().toLowerCase();
  const list = all.filter(s => filt === "all" || (filt === "due" && isDue(s)) || (filt === "soon" && isSoon(s)) || (filt === "plan" && s.plan))
    .filter(s => !q || [s.id, s.title, s.site, s.brand, s.model, (privs[s.id] || {}).name, (privs[s.id] || {}).phone].join(" ").toLowerCase().includes(q));
  $("rows").innerHTML = list.length ? list.map(s => {
    const p = privs[s.id] || {}, pill = isDue(s) ? '<span class="pill due">Overdue</span>' : isSoon(s) ? '<span class="pill soon">Due soon</span>' : '<span class="pill">' + esc(TN[s.type] || s.type) + "</span>";
    return '<button type="button" class="row" data-id="' + s.id + '" aria-current="' + (sel && sel.id === s.id) + '"><b>' + esc(s.title || TN[s.type]) + "</b>" + pill + "<small>" + esc([p.name, s.site, "next " + fmt(s.next)].filter(Boolean).join(" · ")) + "</small></button>";
  }).join("") : '<p class="muted">Nothing here yet. Add the first system with “+ New system”.</p>';
}
$("counts").addEventListener("click", e => { const b = e.target.closest("button[data-k]"); if (b) { filt = b.dataset.k; draw(); } });
$("q").addEventListener("input", draw);
$("rows").addEventListener("click", e => { const b = e.target.closest(".row"); if (b) open(b.dataset.id); });

function qrSvg(text) { const q = qrcode(0, "M"); q.addData(text); q.make(); return q.createSvgTag({ cellSize: 4, margin: 0, scalable: true }); }
function sticker(s) {
  return '<div class="q">' + qrSvg(url(s.id)) + '</div><div class="b">QUEEN TECH</div><div class="s">Scan for service · امسح للصيانة<br>+971 55 797 1520</div><div class="i">' + s.id + "</div>";
}
function uae(p) { let d = String(p || "").replace(/\\D/g, ""); if (d.startsWith("00")) d = d.slice(2); if (d.startsWith("0")) d = "971" + d.slice(1); if (d.length === 9 && d[0] === "5") d = "971" + d; return d; }
function open(id) {
  sel = all.find(s => s.id === id); if (!sel) return;
  const p = privs[id] || {};
  $("ed").hidden = true; $("det").hidden = false; draw();
  $("d-type").textContent = TN[sel.type] || sel.type; $("d-title").textContent = sel.title || "–"; $("d-site").textContent = [sel.site, sel.brand, sel.model, sel.plan ? "Plan: " + sel.plan : ""].filter(Boolean).join(" · ");
  $("d-name").textContent = p.name || "–";
  $("d-phone").innerHTML = p.phone ? '<a href="tel:+' + uae(p.phone) + '">' + esc(p.phone) + "</a>" : "–";
  $("d-inst").textContent = fmt(sel.installed) + (sel.warranty ? " · " + sel.warranty + " mo warranty" : "");
  $("d-next").textContent = fmt(sel.next); $("d-notes").textContent = [p.address, p.notes].filter(Boolean).join("\\n");
  $("stk").innerHTML = sticker(sel);
  $("d-open").href = url(sel.id);
  const first = (p.name || "").split(" ")[0];
  $("d-wa").href = "https://wa.me/" + uae(p.phone) + "?text=" + encodeURIComponent("Hi " + first + ", this is Queen Tech. Here is the card for your " + (sel.title || "system") + ": warranty, service history and one-tap support.\\n" + url(sel.id) + "\\n\\nمرحباً، هذه بطاقة نظامك من كوين تك: الضمان وسجل الصيانة والدعم بلمسة واحدة.");
  $("d-rem").href = "https://wa.me/" + uae(p.phone) + "?text=" + encodeURIComponent("Hi " + first + ", Queen Tech here. Your " + (sel.title || "system") + " is due for its service visit" + (sel.next ? " (" + fmt(sel.next) + ")" : "") + ". Which day suits you?\\n" + url(sel.id));
  $("v-note").value = ""; $("v-next").value = sel.plan ? toDate(Date.now() + (/Home Care/.test(sel.plan) ? 182 : 91) * DAY) : "";
  $("v-err").textContent = ""; $("d-del").textContent = "Delete";
  $("d-log").innerHTML = (sel.log || []).slice().sort((a, b) => b.at - a.at).map(x => "<li><b>" + esc(x.note) + "</b><time>" + fmt(x.at) + "</time></li>").join("");
}
function edit(s) {
  editing = s ? s.id : null; const p = s ? privs[s.id] || {} : {};
  $("det").hidden = true; $("ed").hidden = false; $("ed-h").textContent = s ? "Edit system" : "New system";
  $("e-type").value = s ? s.type : "cctv"; $("e-plan").value = s ? s.plan || "" : "";
  $("e-title").value = s ? s.title : ""; $("e-site").value = s ? s.site : ""; $("e-brand").value = s ? s.brand : ""; $("e-model").value = s ? s.model : "";
  $("e-inst").value = s ? toDate(s.installed) : toDate(Date.now()); $("e-war").value = s ? s.warranty : 12; $("e-next").value = s ? toDate(s.next) : "";
  $("p-name").value = p.name || ""; $("p-phone").value = p.phone || ""; $("p-addr").value = p.address || ""; $("p-notes").value = p.notes || "";
  $("e-err").textContent = ""; $("e-title").focus();
}
$("new").addEventListener("click", () => { sel = null; draw(); edit(null); });
$("d-edit").addEventListener("click", () => edit(sel));
$("cancel").addEventListener("click", () => { $("ed").hidden = true; if (sel) open(sel.id); });
$("ed").addEventListener("submit", async e => {
  e.preventDefault();
  if (!$("e-title").value.trim()) { $("e-err").textContent = "Add a title."; return; }
  $("e-err").textContent = "Saving…";
  try {
    const id = await saveSystem(editing, { type: $("e-type").value, title: $("e-title").value.trim(), site: $("e-site").value.trim(), brand: $("e-brand").value.trim(), model: $("e-model").value.trim(), installed: fromDate($("e-inst").value), warranty: $("e-war").value, next: fromDate($("e-next").value), plan: $("e-plan").value },
      { name: $("p-name").value.trim(), phone: $("p-phone").value.trim(), address: $("p-addr").value.trim(), notes: $("p-notes").value.trim() });
    await refresh(); open(id);
  } catch (err) { $("e-err").textContent = "Couldn't save: " + (err.code || err.message); }
});
$("vf").addEventListener("submit", async e => {
  e.preventDefault(); if (!sel) return;
  if (!$("v-note").value.trim()) { $("v-err").textContent = "Write what was done."; return; }
  $("v-err").textContent = "Saving…";
  try { await addVisit(sel.id, $("v-note").value.trim(), fromDate($("v-next").value)); const id = sel.id; await refresh(); open(id); $("v-err").textContent = "Visit added."; }
  catch (err) { $("v-err").textContent = "Couldn't save: " + (err.code || err.message); }
});
$("d-del").addEventListener("click", async () => {
  const b = $("d-del"); if (b.textContent !== "Tap again to delete") { b.textContent = "Tap again to delete"; return; }
  try { await removeSystem(sel.id); sel = null; $("det").hidden = true; await refresh(); } catch (err) { $("v-err").textContent = "Couldn't delete: " + (err.code || err.message); }
});
$("d-print").addEventListener("click", () => {
  const n = Math.max(1, Math.min(24, Number($("d-copies").value) || 1));
  $("print").innerHTML = Array.from({ length: n }, () => '<div class="sticker">' + sticker(sel) + "</div>").join("");
  window.print();
});
</script>
'''

page("systems-admin", "System cards admin | Queen Tech", "Queen Tech staff page.", "", "System cards", ("/repairs-admin.html", "Repairs board"), BODY, SCRIPT, admin=True)
