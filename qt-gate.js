/* Runs in <head> on the free-tool pages, before anything is drawn.
   If accounts are switched on, hide the page until qt-auth.js has checked the login. */
(function(){
  var C=window.QT_AUTH||{};
  if(!C.firebase)return;
  document.documentElement.classList.add("qt-locked");
  var s=document.createElement("style");
  s.textContent=
    ".qt-locked body>*:not(#qt-gate):not(header){visibility:hidden!important}"+
    ".qt-locked body{overflow:hidden}"+
    "#qt-gate{position:fixed;inset:0;z-index:300;display:grid;place-items:center;padding:20px;background:rgba(19,18,16,.92);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}"+
    "#qt-gate .box{max-width:460px;width:100%;background:#201E1A;border:1px solid #4A443A;border-radius:8px;padding:30px 28px;color:#EFE8DB;font-family:Figtree,'Segoe UI',system-ui,sans-serif;box-shadow:0 40px 80px -30px rgba(0,0,0,.8)}"+
    "#qt-gate .k{font:500 .68rem 'JetBrains Mono',monospace;letter-spacing:.14em;text-transform:uppercase;color:#E2A63F}"+
    "#qt-gate h2{font:900 2.2rem/.95 'Big Shoulders Display','Arial Narrow',sans-serif;text-transform:uppercase;margin:12px 0}"+
    "#qt-gate p{color:#A79E8F;margin:0 0 10px;font-size:.98rem;line-height:1.55}"+
    "#qt-gate ul{margin:6px 0 18px;padding:0;list-style:none;color:#EFE8DB;font-size:.93rem}"+
    "#qt-gate li{padding:5px 0 5px 20px;position:relative}#qt-gate li::before{content:'';position:absolute;left:0;top:.95em;width:10px;height:1px;background:#E2A63F}"+
    "#qt-gate .row{display:flex;gap:10px;flex-wrap:wrap;margin-top:6px}"+
    "#qt-gate a.b,#qt-gate button.b{display:inline-flex;align-items:center;justify-content:center;padding:13px 20px;border-radius:4px;font:600 .95rem/1 Figtree,system-ui,sans-serif;text-decoration:none;border:1px solid #4A443A;color:#EFE8DB;background:transparent;cursor:pointer}"+
    "#qt-gate a.b.g,#qt-gate button.b.g{background:#E2A63F;border-color:#E2A63F;color:#131210}"+
    "#qt-gate .spin{width:28px;height:28px;border:2px solid #4A443A;border-top-color:#E2A63F;border-radius:50%;animation:qtspin .8s linear infinite;margin:0 auto}"+
    "@keyframes qtspin{to{transform:rotate(360deg)}}"+
    ".qt-chip{display:inline-flex;align-items:center;gap:8px;font:500 .72rem 'JetBrains Mono',monospace;color:#A79E8F;letter-spacing:.04em}"+
    ".qt-chip a,.qt-chip button{color:#E2A63F;background:none;border:0;cursor:pointer;font:inherit;padding:0;text-decoration:underline}";
  document.head.appendChild(s);
})();
