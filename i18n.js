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
  if(m||/^\/ar(\/|$)/.test(location.pathname)||location.pathname==="/"||location.pathname==="/index.html"){
    if(location.pathname==="/"||location.pathname==="/index.html")lang=m?m[1]:"en";
    try{localStorage.setItem(KEY,lang)}catch(e){}
  }
  window.QT_LANG=lang;
  var ls=document.createElement("style");ls.textContent=".lang-tg{display:inline-flex;align-items:center;color:var(--gold,#E2A63F)!important;border:1px solid var(--line-2,#4A443A);border-radius:3px;padding:5px 10px;font:600 .82rem/1.2 'Noto Kufi Arabic','Figtree',system-ui,sans-serif;text-decoration:none;white-space:nowrap}.lang-tg:hover{border-color:var(--gold,#E2A63F)}@media (max-width:520px){.lang-tg{padding:4px 7px;font-size:.74rem}.brand small{display:none!important}.links{gap:10px!important}.nav{gap:10px!important}.brand b{font-size:1.1rem!important}.brand .crown{width:30px!important;height:30px!important}.links .btn{padding:10px 11px!important;font-size:.8rem!important}}@media (max-width:380px){.links .btn{display:none!important}}";document.head.appendChild(ls);
  var D=Object.create(null),RX=[];
  if(document.documentElement.hasAttribute("data-i18n-static")){window.QT_AR={add:function(){},rx:function(){}};window.t=function(s){return s};return}
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
    if(e.tagName==="A"){var h=e.getAttribute("href");if(h&&/^\/(#.*)?$/.test(h))e.setAttribute("href","/ar/"+h.slice(1))}
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
      a.addEventListener("click",function(){try{localStorage.setItem(KEY,to)}catch(e){}});
    });
  }
})();
