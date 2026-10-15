/* Queen Tech – small helpers shared by the booking and plan pages. Needs /plans.js and /i18n.js first. */
(function () {
  var WA = "971557971520";
  var tt = function (s) { return window.t ? window.t(s) : s; };
  function ar() { return document.documentElement.lang === "ar"; }
  function aed(n) {
    var v = Math.round(n).toLocaleString("en-US");
    return ar() ? v + " درهم" : "AED " + v;
  }
  var P = window.QT_PLANS || { approved: false };
  window.QTB = {
    plans: P,
    ar: ar,
    aed: aed,
    t: tt,
    /* price or "Price on request" while Noah has not approved the numbers */
    price: function (n, per) {
      if (!P.approved || n == null) return null;
      return aed(n) + (per ? " " + tt(per) : "");
    },
    esc: function (s) {
      return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    },
    wa: function (text) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(text); },
    /* single-choice button group: <div data-pick="name"><button data-v="..."> */
    pick: function (box, onChange) {
      box.addEventListener("click", function (e) {
        var b = e.target.closest("button[data-v]"); if (!b || !box.contains(b)) return;
        box.querySelectorAll("button[data-v]").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        box.dataset.value = b.dataset.v;
        if (onChange) onChange(b.dataset.v, b);
      });
      var on = box.querySelector('button[aria-pressed="true"]'); if (on) box.dataset.value = on.dataset.v;
    },
    /* multi-choice toggles */
    multi: function (box, onChange) {
      box.addEventListener("click", function (e) {
        var b = e.target.closest("button[data-v]"); if (!b || !box.contains(b)) return;
        b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true");
        if (onChange) onChange();
      });
    },
    picked: function (box) {
      return Array.prototype.map.call(box.querySelectorAll('button[aria-pressed="true"]'), function (b) { return b.dataset.v; });
    },
    label: function (box, v) {
      var b = box.querySelector('button[data-v="' + v + '"]'); if (!b) return v || "";
      var l = b.querySelector("b"); return (l ? l.textContent : b.textContent).trim();
    },
    labels: function (box) {
      return Array.prototype.map.call(box.querySelectorAll('button[aria-pressed="true"]'), function (b) {
        var l = b.querySelector("b"); return (l ? l.textContent : b.textContent).trim();
      });
    },
    today: function () {
      var d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10);
    },
    /* required check: returns first bad element or null */
    need: function (els) {
      var bad = null;
      els.forEach(function (el) {
        var f = el.closest(".field"); var ok = String(el.value || "").trim().length > 0;
        if (el.type === "tel") ok = String(el.value).replace(/\D/g, "").length >= 7;
        if (f) f.classList.toggle("bad", !ok);
        if (!ok && !bad) bad = el;
      });
      if (bad) bad.focus();
      return bad;
    },
    /* text the visitor sees in a <select> (option values stay in English after translation) */
    sel: function (el) { var o = el.options[el.selectedIndex]; return o ? o.text.trim() : el.value; },
    store: {
      get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
      set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
    }
  };
  /* i18n.js skips <textarea>, so translate their placeholders here */
  document.querySelectorAll("textarea[placeholder]").forEach(function (x) { x.placeholder = tt(x.getAttribute("placeholder")); });
})();
