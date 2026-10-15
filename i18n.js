/* Queen Tech – Arabic / English switch for the tool pages.
   Load in <head> (not deferred), BEFORE the page's Arabic dictionary files:
     <script src="/i18n.js"></script>
     <script src="/i18n/ar-common.js"></script>
     <script src="/i18n/ar-<page>.js"></script>
   Dictionaries are keyed by the exact English text:
     QT_AR.add({"English text": "النص العربي"});
     QT_AR.rx([[/^Keeps about (\d+) days$/, "يحفظ حوالي $1 يوماً"]]);
   The page is translated after load, and anything the page's scripts draw later
   is translated automatically. Mark an element translate="no" to skip it.
   Language: ?lang=ar / ?lang=en, else the saved choice, else Arabic under /ar/, else English. */
(function(){
  "use strict";
  var KEY="qt-lang";
  var m=location.search.match(/[?&]lang=(ar|en)\b/);
  var saved=null;try{saved=localStorage.getItem(KEY)}catch(e){}
  var lang=m?m[1]:(/^\/ar(\/|$)/.test(location.pathname)?"ar":(saved||"en"));
  if(!document.documentElement.hasAttribute("data-i18n-static")&&(m||/^\/ar(\/|$)/.test(location.pathname))){
    if(location.pathname==="/"||location.pathname==="/index.html")lang=m?m[1]:"en";
    try{localStorage.setItem(KEY,lang)}catch(e){}
  }
  window.QT_LANG=lang;
  /* Running inside the installed app (Android app / installed PWA)? */
  var APP=false;
  try{
    if(/[?&]source=(app|pwa)\b/.test(location.search)||document.referrer.indexOf("android-app://")===0)sessionStorage.setItem("qt-app","1");
    APP=sessionStorage.getItem("qt-app")==="1"||matchMedia("(display-mode: standalone)").matches;
  }catch(e){}
  /* Brand cursor (black arrow, white glow; gold over links). Mouse/trackpad only; text fields keep the text cursor. */
  try{if(matchMedia("(pointer:fine)").matches){document.documentElement.classList.add("qt-cur");var cs=document.createElement("style");cs.textContent="html.qt-cur,html.qt-cur body{cursor:url(/cursor.png) 3 3,auto;cursor:-webkit-image-set(url(/cursor.png) 1x,url(/cursor@2x.png) 2x) 3 3,auto;cursor:image-set(url(/cursor.png) 1x,url(/cursor@2x.png) 2x) 3 3,auto}html.qt-cur :is(a[href],button,[role=button],summary,label[for],select,.btn,input[type=checkbox],input[type=radio],input[type=submit],input[type=button]):not(:disabled){cursor:url(/cursor-link.png) 3 3,pointer!important;cursor:-webkit-image-set(url(/cursor-link.png) 1x,url(/cursor-link@2x.png) 2x) 3 3,pointer!important;cursor:image-set(url(/cursor-link.png) 1x,url(/cursor-link@2x.png) 2x) 3 3,pointer!important}";document.head.appendChild(cs)}}catch(e){}
  window.QT_APP=APP;if(APP)document.documentElement.classList.add("qt-app");
  /* Install from Chrome (PWA) */
  var installEvt=null;
  window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();installEvt=e;document.documentElement.classList.add("qt-can-install");document.dispatchEvent(new Event("qt-installable"))});
  window.addEventListener("appinstalled",function(){installEvt=null;document.documentElement.classList.remove("qt-can-install")});
  window.QT_INSTALL=function(){if(!installEvt)return false;var ev=installEvt;installEvt=null;ev.prompt();(ev.userChoice||Promise.resolve()).then(function(){document.documentElement.classList.remove("qt-can-install")});return true};
  var ls=document.createElement("style");ls.textContent=".lang-tg{display:inline-flex;align-items:center;color:var(--gold,#E2A63F)!important;border:1px solid var(--line-2,#4A443A);border-radius:3px;padding:5px 10px;font:600 .82rem/1.2 'Noto Kufi Arabic','Figtree',system-ui,sans-serif;text-decoration:none;white-space:nowrap}.lang-tg:hover{border-color:var(--gold,#E2A63F)}@media (max-width:520px){.lang-tg{padding:4px 7px;font-size:.74rem}.brand small{display:none!important}.links{gap:10px!important}.nav{gap:10px!important}.brand b{font-size:1.1rem!important}.brand .crown{width:30px!important;height:30px!important}.links .btn{padding:10px 11px!important;font-size:.8rem!important}}@media (max-width:380px){.links .btn{display:none!important}}";document.head.appendChild(ls);
  /* ---- Offers: everything ends 1 December 2026, 23:59 Dubai time. Change OFFER_END to extend. ---- */
  var OFFER_END=Date.UTC(2026,11,1,19,59,59);
  window.QT_OFFER={end:OFFER_END,on:Date.now()<=OFFER_END,days:Math.max(0,Math.ceil((OFFER_END-Date.now())/864e5))};
  function offers(){
    var O=window.QT_OFFER;
    document.querySelectorAll(".offerbar,[data-offer-only]").forEach(function(e){if(!O.on)e.style.display="none"});
    document.querySelectorAll("[data-offer-days]").forEach(function(e){e.textContent=O.days<=1?(lang==="ar"?"آخر يوم!":"Last day!"):(lang==="ar"?"باقي "+O.days+" يوم":O.days+" days left")});
  }
  /* ---- Site-wide section bar (every page): one page per section, always visible under the header ---- */
  var STATIC=document.documentElement.hasAttribute("data-i18n-static");
  if(STATIC){var hl=document.documentElement.lang==="ar"?"ar":"en";lang=hl;window.QT_LANG=hl}
  var PAGES=[["/","Home","الرئيسية",1],["/services.html","Services","الخدمات",1],["/price.html","Prices","الأسعار"],["/tools.html","Tools & Help","الأدوات والمساعدة",1],["/gamers.html","Gamers & PC","الجيمرز والكمبيوتر"],["/contact.html","Contact","تواصل معنا",1]];
  /* Tools & Help hub: one menu item, tabs on every page inside it. [path, EN, AR, pages that light this tab] */
  var HUB=[["/tools.html#free-tools","Free tools","الأدوات المجانية",["/tools.html","/bandwidth.html","/boq.html","/planner.html","/rescue.html"]],["/help.html","Help centre","مركز المساعدة",["/help.html","/boards.html"]],["/tech.html","Tech corner","ركن الفنيين",["/tech.html"]]];
  window.QT_STATIC_AR={"/":"/ar/","/services.html":"/ar/services.html","/tools.html":"/ar/tools.html","/contact.html":"/ar/contact.html","/cctv-installation-dubai.html":"/ar/cctv-installation-dubai.html","/cctv-installation-abu-dhabi.html":"/ar/cctv-installation-abu-dhabi.html","/access-control-dubai.html":"/ar/access-control-dubai.html","/gate-barrier-installation.html":"/ar/gate-barrier-installation.html","/network-wifi-installation-dubai.html":"/ar/network-wifi-installation-dubai.html","/laptop-repair-business-bay.html":"/ar/laptop-repair-business-bay.html","/phone-repair-dubai.html":"/ar/phone-repair-dubai.html","/it-support-dubai.html":"/ar/it-support-dubai.html"};
  /* A returning visitor who picked a language lands on that version of the static pages. */
  if(STATIC){
    var wasSet=false;try{wasSet=localStorage.getItem("qt-lang-set")==="1"}catch(e){}
    if(!m&&wasSet&&saved&&saved!==lang&&!/bot|crawl|spider|slurp/i.test(navigator.userAgent)){
      var pth=location.pathname.replace(/index\.html$/,"");
      var to=saved==="ar"?window.QT_STATIC_AR[pth]:(pth.replace(/^\/ar/,"")||"/");
      if(to&&to!==location.pathname){location.replace(to+location.hash);return}
    }
    try{localStorage.setItem(KEY,lang)}catch(e){}
  }
  function secnav(){
    var hd=document.querySelector("header.top");if(!hd||hd.querySelector(".qt-sec"))return;
    var ar=lang==="ar",p=location.pathname.replace(/^\/ar(?=\/)/,"").replace(/index\.html$/,"");
    var pg=p,hubTab=-1;HUB.forEach(function(t,i){if(t[3].indexOf(pg)>=0)hubTab=i});
    if(hubTab>=0)p="/tools.html";
    if(p==="/games.html"||/^\/games\//.test(p))p="/gamers.html";
    if(/^\/(cctv-installation|access-control|gate-barrier|network-wifi|laptop-repair|phone-repair|it-support)/.test(p))p="/services.html";
    var css=document.createElement("style");
    css.textContent=".qt-sec{border-top:1px solid var(--line,#2E2A24);position:relative}.qt-sec .qt-in{display:flex;gap:2px;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}.qt-sec .qt-in::-webkit-scrollbar{display:none}.qt-sec a{flex:none;display:inline-flex;align-items:center;gap:6px;padding:11px 13px 10px;color:var(--muted,#A69E8E);text-decoration:none;white-space:nowrap;font:600 .86rem/1.2 "+(ar?"'IBM Plex Sans Arabic','Noto Kufi Arabic'":"'Figtree'")+",system-ui,sans-serif;border-bottom:2px solid transparent;transition:color .15s,border-color .15s}.qt-sec a:hover{color:var(--ink,#F2ECE0)}.qt-sec a.on{color:var(--gold,#E2A63F);border-bottom-color:var(--gold,#E2A63F)}.qt-sec a i{font:700 .6rem/1 'JetBrains Mono',monospace;font-style:normal;color:#131210;background:var(--gold,#E2A63F);padding:3px 5px;border-radius:2px;letter-spacing:"+(ar?"0":".06em")+"}.qt-sec a:first-child{padding-inline-start:0}@media (max-width:760px){.qt-sec::after{content:'';position:absolute;top:0;bottom:0;"+(ar?"left":"right")+":0;width:28px;pointer-events:none;background:linear-gradient(to "+(ar?"right":"left")+",var(--bg,#131210),transparent)}.qt-sec a{padding:10px 11px 9px;font-size:.82rem}}@media print{.qt-sec{display:none}}.qt-sec a.qt-app{margin-inline-start:auto;opacity:.75;font-size:.8rem}.qt-hub{border-top:1px dashed var(--line,#2E2A24);background:color-mix(in srgb,var(--gold,#E2A63F) 5%,transparent)}.qt-hub .qt-in{display:flex;align-items:center;gap:4px;overflow-x:auto;scrollbar-width:none}.qt-hub .qt-in::-webkit-scrollbar{display:none}.qt-hub .qt-hub-t{flex:none;font:600 .7rem/1 "+(ar?"'IBM Plex Sans Arabic'":"'JetBrains Mono',monospace")+";letter-spacing:"+(ar?"0":".12em")+";text-transform:uppercase;color:var(--gold,#E2A63F);padding-inline-end:10px;margin-inline-end:4px;border-inline-end:1px solid var(--line-2,#4A443A)}.qt-hub a{flex:none;padding:7px 12px;margin:6px 0;border-radius:999px;color:var(--muted,#A69E8E);text-decoration:none;font:600 .82rem/1.2 "+(ar?"'IBM Plex Sans Arabic','Noto Kufi Arabic'":"'Figtree'")+",system-ui,sans-serif;border:1px solid transparent}.qt-hub a:hover{color:var(--ink,#EFE8DB);border-color:var(--line-2,#4A443A)}.qt-hub a.on{color:var(--bg,#131210);background:var(--gold,#E2A63F)}"+(ar?".qt-sec a i{font-family:'IBM Plex Sans Arabic',sans-serif;font-size:.66rem;padding:3px 6px}":"");
    document.head.appendChild(css);
    var nav=document.createElement("nav");nav.className="qt-sec";nav.setAttribute("aria-label",ar?"أقسام الموقع":"Site sections");nav.setAttribute("translate","no");
    var h='<div class="wrap qt-in">';
    PAGES.forEach(function(g){
      if(g[5]&&APP)return;
      var href=ar&&g[3]?window.QT_STATIC_AR[g[0]]:g[0],on=p===g[0];
      h+='<a href="'+href+'"'+(on?' class="on" aria-current="page"':'')+'>'+(ar?g[2]:g[1].replace("&","&amp;"))+(g[4]?'<i>'+(ar?"جديد":"NEW")+'</i>':'')+'</a>';
    });
    if(!APP)h+='<a class="qt-app" href="/app.html">📲 '+(ar?"التطبيق":"App")+'</a>';
    nav.innerHTML=h+'</div>';
    if(hubTab>=0){
      var sub=document.createElement("nav");sub.className="qt-hub";sub.setAttribute("aria-label",ar?"الأدوات والمساعدة":"Tools & Help");sub.setAttribute("translate","no");
      var sh='<div class="wrap qt-in"><span class="qt-hub-t">'+(ar?"الأدوات والمساعدة":"Tools &amp; Help")+'</span>';
      HUB.forEach(function(t,i){var href=t[0];if(ar&&href.indexOf("/tools.html")===0)href=href.replace("/tools.html","/ar/tools.html");
        sh+='<a href="'+href+'"'+(i===hubTab?' class="on" aria-current="page"':'')+'>'+(ar?t[2]:t[1])+'</a>'});
      sub.innerHTML=sh+'</div>';nav.appendChild(sub);
    }
    var first=hd.querySelector(".nav");first&&first.nextSibling?hd.insertBefore(nav,first.nextSibling):hd.appendChild(nav);
    hd.querySelectorAll(".links a.hide-sm").forEach(function(a){a.remove()});
    var on=nav.querySelector(".on"),inr=nav.firstChild;if(on&&inr.scrollWidth>inr.clientWidth+2){try{var r=on.getBoundingClientRect(),q=inr.getBoundingClientRect();inr.scrollLeft+=(r.left+r.width/2)-(q.left+q.width/2)}catch(e){}}
  }
  /* ---- First visit: ask which language (bilingual screen). Remembered in qt-lang-set. ---- */
  var SET="qt-lang-set";
  function chosen(){try{return localStorage.getItem(SET)==="1"}catch(e){return true}}
  function markChosen(l){try{localStorage.setItem(SET,"1");if(l)localStorage.setItem(KEY,l)}catch(e){}}
  if(m)markChosen(m[1]);
  function urlFor(l){
    var path=location.pathname,isAr=/^\/ar(\/|$)/.test(path);
    if(STATIC){
      if(l==="ar")return isAr?null:(window.QT_STATIC_AR[path.replace(/index\.html$/,"")]||"/ar/")+location.hash;
      return isAr?(path.replace(/^\/ar/,"")||"/")+location.hash:null;
    }
    if(l===lang)return null;
    var q=location.search.replace(/([?&])lang=(ar|en)&?/,"$1").replace(/[?&]$/,"");
    return path+(q?q+"&":"?")+"lang="+l+location.hash;
  }
  function picker(){
    document.querySelectorAll("a.lang").forEach(function(a){a.addEventListener("click",function(){markChosen(a.getAttribute("lang")==="ar"?"ar":"en")})});
    if(chosen()||/bot|crawl|spider|slurp|lighthouse/i.test(navigator.userAgent))return;
    var guess=(navigator.languages&&navigator.languages[0]||navigator.language||"").slice(0,2)==="ar"?"ar":lang;
    var st=document.createElement("style");
    st.textContent="#qt-lp{position:fixed;inset:0;z-index:400;display:grid;place-items:center;padding:20px;background:rgba(14,13,11,.94);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);animation:qtlp .25s ease}@keyframes qtlp{from{opacity:0}}#qt-lp .bx{width:100%;max-width:520px;background:#201E1A;border:1px solid #4A443A;border-radius:12px;padding:30px 26px 24px;color:#EFE8DB;text-align:center;box-shadow:0 40px 90px -30px rgba(0,0,0,.85)}#qt-lp svg{width:46px;height:46px}#qt-lp h2{margin:14px 0 4px;font:900 2rem/1.05 'Big Shoulders Display','Arial Narrow',sans-serif;text-transform:uppercase;letter-spacing:.01em}#qt-lp h2+h2{font:800 1.6rem/1.3 'Noto Kufi Arabic','IBM Plex Sans Arabic',sans-serif;text-transform:none;margin-top:2px}#qt-lp p{margin:10px 0 22px;color:#A79E8F;font:400 .95rem/1.6 Figtree,system-ui,sans-serif}#qt-lp p span{display:block;font-family:'IBM Plex Sans Arabic','Noto Kufi Arabic',sans-serif}#qt-lp .ch{display:grid;grid-template-columns:1fr 1fr;gap:12px}#qt-lp button{all:unset;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;padding:18px 10px;border:1px solid #4A443A;border-radius:8px;background:#1A1916;transition:border-color .15s,background .15s}#qt-lp button:hover,#qt-lp button:focus-visible{border-color:#E2A63F;background:rgba(226,166,63,.1)}#qt-lp button.sg{border-color:#E2A63F}#qt-lp button b{font:800 1.5rem/1.2 Figtree,system-ui,sans-serif;color:#EFE8DB}#qt-lp button[lang=ar] b{font-family:'Noto Kufi Arabic','IBM Plex Sans Arabic',sans-serif}#qt-lp button small{font:500 .8rem/1.3 Figtree,system-ui,sans-serif;color:#A79E8F}#qt-lp button[lang=ar] small{font-family:'IBM Plex Sans Arabic',sans-serif}#qt-lp .qt-ft{margin-top:16px;font:400 .78rem/1.5 Figtree,system-ui,sans-serif;color:#6E675C}@media (max-width:380px){#qt-lp .bx{padding:24px 16px 18px}#qt-lp button b{font-size:1.25rem}}";
    document.head.appendChild(st);
    if(!document.querySelector('link[href*="Noto+Kufi"]')){var fl=document.createElement("link");fl.rel="stylesheet";fl.href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@700;800&family=IBM+Plex+Sans+Arabic:wght@400;500&display=swap";document.head.appendChild(fl)}
    var d=document.createElement("div");d.id="qt-lp";d.setAttribute("role","dialog");d.setAttribute("aria-modal","true");d.setAttribute("aria-label","Choose your language / اختر لغتك");d.setAttribute("translate","no");d.dir="ltr";
    d.innerHTML='<div class="bx"><svg viewBox="0 0 36 36" aria-hidden="true"><rect x=".5" y=".5" width="35" height="35" rx="5" fill="none" stroke="#E2A63F"/><path d="M8 23.5 L9.6 12.5 L14.4 17.6 L18 10 L21.6 17.6 L26.4 12.5 L28 23.5 Z" fill="#E2A63F"/><rect x="8" y="25.2" width="20" height="2.4" rx="1" fill="#E2A63F"/></svg>'+
      '<h2>Choose your language</h2><h2 lang="ar" dir="rtl">اختر لغتك</h2>'+
      '<p>Welcome to Queen Tech Solutions.<span lang="ar" dir="rtl">أهلاً بك في كوين تك للحلول التقنية.</span></p>'+
      '<div class="ch"><button type="button" lang="en" data-l="en"'+(guess==="en"?' class="sg"':'')+'><b>English</b><small>Continue in English</small></button>'+
      '<button type="button" lang="ar" dir="rtl" data-l="ar"'+(guess==="ar"?' class="sg"':'')+'><b>العربية</b><small>المتابعة بالعربية</small></button></div>'+
      '<div class="qt-ft">You can change it any time from the top of the page.<br><span lang="ar" dir="rtl">يمكنك تغيير اللغة في أي وقت من أعلى الصفحة.</span></div></div>';
    document.body.appendChild(d);
    var bs=d.querySelectorAll("button");(d.querySelector(".sg")||bs[0]).focus();
    function close(){d.remove();document.removeEventListener("keydown",key)}
    function key(e){if(e.key==="Escape"){markChosen(lang);close()}if(e.key==="Tab"){e.preventDefault();(document.activeElement===bs[0]?bs[1]:bs[0]).focus()}}
    document.addEventListener("keydown",key);
    bs.forEach(function(b){b.addEventListener("click",function(){var l=b.getAttribute("data-l");markChosen(l);var u=urlFor(l);if(u)location.href=u;else close()})});
  }
  function sw(){if("serviceWorker" in navigator&&(location.protocol==="https:"||location.hostname==="localhost"))navigator.serviceWorker.register("/sw.js").catch(function(){})}
  if(document.readyState==="complete")setTimeout(sw,0);else window.addEventListener("load",sw);
  function boot(){secnav();offers();picker();(function(){var es=document.createElement("script");es.src="/engage.js";es.defer=true;document.body.appendChild(es)})();if(!/^\/games\/|\/offline\.html$/.test(location.pathname)){var ss=document.createElement("script");ss.src="/search.js";ss.defer=true;document.body.appendChild(ss)}if(!/\/(boq|account)\.html$/.test(location.pathname)&&!/^\/games\//.test(location.pathname)){var as=document.createElement("script");as.src="/assistant.js";as.defer=true;document.body.appendChild(as)}}
  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",boot):setTimeout(boot);

  var D=Object.create(null),RX=[];
  if(STATIC){window.QT_AR={add:function(){},rx:function(){}};window.t=function(s){return s};return}
  window.QT_AR={add:function(o){for(var k in o)D[k]=o[k]},rx:function(a){RX=RX.concat(a)}};
  function tr(s){
    if(s==null)return null;
    var t=s.trim();if(!t)return null;
    var hit=D[t];
    if(hit==null)for(var i=0;i<RX.length;i++){if(RX[i][0].test(t)){hit=t.replace(RX[i][0],RX[i][1]);break}}
    if(hit==null)return null;
    return s.replace(t,hit);
  }
  window.t=function(s){if(lang!=="ar")return s;var r=tr(String(s));return r==null?s:r};
  if(lang!=="ar"){window.QT_I18N_READY=true;document.addEventListener("DOMContentLoaded",toggles);return}

  var html=document.documentElement;
  html.lang="ar";html.dir="rtl";html.classList.add("rtl","i18n-pending");
  var st=document.createElement("style");st.textContent="html.i18n-pending body{visibility:hidden}";
  document.head.appendChild(st);
  var f=document.createElement("link");f.rel="stylesheet";f.href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@500;700;800;900&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap";document.head.appendChild(f);
  var r=document.createElement("link");r.rel="stylesheet";r.href="/rtl.css";document.head.appendChild(r);
  var pg=(location.pathname.split("/").pop()||"index").replace(/\.html$/,"");if(/^[a-z0-9-]+$/.test(pg)){var r2=document.createElement("link");r2.rel="stylesheet";r2.href="/i18n/rtl-"+pg+".css";document.head.appendChild(r2)}

  var SKIP={SCRIPT:1,STYLE:1,NOSCRIPT:1,TEXTAREA:1};
  var ATTRS=["placeholder","title","aria-label","alt","data-label"];
  var busy=false;
  function el(e){
    if(e.closest&&e.closest('[translate="no"]'))return;
    for(var i=0;i<ATTRS.length;i++){var a=e.getAttribute&&e.getAttribute(ATTRS[i]);if(a){var x=tr(a);if(x!=null&&x!==a)e.setAttribute(ATTRS[i],x)}}
    if(e.tagName==="A"){var h=e.getAttribute("href"),m2=h&&h.match(/^(\/[a-z0-9-]*(?:\.html)?)(#.*)?$/);if(m2&&window.QT_STATIC_AR[m2[1]])e.setAttribute("href",window.QT_STATIC_AR[m2[1]]+(m2[2]||""))}
  }
  function text(n){
    var p=n.parentNode;if(!p||SKIP[p.nodeName])return;
    if(p.closest&&p.closest('[translate="no"]'))return;
    var x=tr(n.nodeValue);if(x==null||x===n.nodeValue)return;
    if(p.nodeName==="OPTION"&&!p.hasAttribute("value"))p.setAttribute("value",p.textContent);
    n.nodeValue=x;
  }
  function walk(root){
    if(!root)return;
    if(root.nodeType===3){text(root);return}
    if(root.nodeType!==1||SKIP[root.nodeName])return;
    el(root);
    var w=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,null),n;
    while((n=w.nextNode())){if(n.nodeType===3)text(n);else if(!SKIP[n.nodeName])el(n)}
  }
  function run(){
    busy=true;walk(document.body);var tt=tr(document.title);if(tt!=null&&tt!==document.title)document.title=tt;busy=false;
    html.classList.remove("i18n-pending");toggles();
    new MutationObserver(function(list){
      if(busy)return;busy=true;
      list.forEach(function(mu){
        if(mu.type==="characterData")text(mu.target);
        else if(mu.type==="attributes")el(mu.target);
        else mu.addedNodes.forEach(walk);
      });
      busy=false;
    }).observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:ATTRS});
    window.QT_I18N_READY=true;
  }
  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",run):run();
  setTimeout(function(){html.classList.remove("i18n-pending")},2500);

  function toggles(){
    document.querySelectorAll("[data-lang-toggle]").forEach(function(a){
      var to=lang==="ar"?"en":"ar";
      var q=location.search.replace(/([?&])lang=(ar|en)&?/,"$1").replace(/[?&]$/,"");
      a.href=location.pathname+(q?q+"&":"?")+"lang="+to+location.hash;
      a.textContent=to==="ar"?"العربية":"English";
      a.setAttribute("lang",to);a.setAttribute("translate","no");
      a.addEventListener("click",function(){try{localStorage.setItem(KEY,to);localStorage.setItem("qt-lang-set","1")}catch(e){}});
    });
  }
})();
