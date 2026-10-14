/* Queen Tech assistant – chat bubble on every page (loaded by i18n.js).
   Works on its own: quick answers, step-by-step problem diagnosis from the Help centre,
   gamer issues, prices and offers, then hands the customer to WhatsApp with a summary.
   Real AI for free-text questions: set AI_ENDPOINT to the Cloudflare Worker URL (see /ai-worker/README.md). */
(function(){
"use strict";
if(window.QT_ASSIST)return;window.QT_ASSIST=true;
var AI_ENDPOINT=window.QT_AI_ENDPOINT||"";                     /* e.g. "https://queentech-ai.<your-account>.workers.dev/chat" */
var WA="971557971520";
var AR=(window.QT_LANG||document.documentElement.lang)==="ar";
function L(en,ar){return AR?ar:en}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
var O=window.QT_OFFER||{on:Date.now()<=Date.UTC(2026,11,1,19,59,59),days:0};
var P=function(path){return AR&&window.QT_STATIC_AR&&window.QT_STATIC_AR[path]?window.QT_STATIC_AR[path]:path};

/* ---------- knowledge ---------- */
var CATS=[
  {id:"cctv",en:"Cameras / CCTV",ar:"الكاميرات"},
  {id:"access",en:"Door access / fingerprint",ar:"أنظمة الدخول والبصمة"},
  {id:"network",en:"Internet / Wi-Fi / network",ar:"الإنترنت والواي فاي والشبكة"},
  {id:"barrier",en:"Gate barrier / parking",ar:"بوابة المواقف"},
  {id:"intercom",en:"Video intercom",ar:"الإنتركم"},
  {id:"pc",en:"PC, laptop or games",ar:"الكمبيوتر واللابتوب والألعاب"}
];
var GAMER=[
  ["game","Game won't install or crashes","اللعبة لا تتثبت أو تقفل"],
  ["fps","Low FPS, stutter or lag","فريمات قليلة أو تقطيع أو لاج"],
  ["sim","Wheel, controller or sim racing setup","ضبط الدركسيون أو الدراع أو المحاكي"],
  ["win","Windows, drivers or Steam/Epic problem","مشكلة ويندوز أو تعريفات أو Steam/Epic"],
  ["heat","PC very hot or loud","الجهاز سخن جداً أو صوته عالٍ"],
  ["power","No power or no picture","الجهاز لا يعمل أو لا توجد صورة"],
  ["build","New build or upgrade","تجميع جهاز أو ترقية"]
];
var INTENTS=[
  {k:/steam|assetto|beam ?ng|gta|grand theft|buy (a )?game|game offer|ستيم|اسيتو|عروض الالعاب|عروض الألعاب|اشتري لعب|شراء لعب|تنصيب لعب|تسطيب لعب/i,a:"games"},
  {k:/price|cost|how much|quote|rate|سعر|اسعار|أسعار|بكام|كام|تكلف|تكلفة|عرض سعر/i,a:"price"},
  {k:/offer|discount|promo|sale|عرض|عروض|خصم|تخفيض/i,a:"offer"},
  {k:/anydesk|remote|online fix|عن بعد|انى ديسك|اني ديسك|أني ديسك/i,a:"remote"},
  {k:/where|location|address|office|area|abu dhabi|dubai|sharjah|فين|عنوان|مكان|موقع|مكتب|ابوظبي|أبوظبي|دبي|الشارقة/i,a:"where"},
  {k:/visit|survey|book|appointment|technician|زيارة|معاينة|حجز|احجز|موعد|فني/i,a:"visit"},
  {k:/bandwidth|storage|hard ?disk size|how many tb|boq|bill of quant|calculator|باندويث|تخزين|حاسبة|جدول الكميات/i,a:"tools"},
  {k:/hours|open now|working time|مواعيد|ساعات العمل|مفتوح/i,a:"hours"},
  {k:/^(hi|hello|hey|salam|السلام|مرحبا|اهلا|أهلا|هاي)\b/i,a:"hi"},
  {k:/thank|thanks|شكرا|شكراً|تسلم/i,a:"thanks"}
];
var HELP=null;
function loadHelp(cb){
  if(window.QT_HELP){HELP=window.QT_HELP;return cb()}
  var s=document.createElement("script");s.src="/help-data.js";s.onload=function(){HELP=window.QT_HELP||[];cb()};s.onerror=function(){HELP=[];cb()};document.head.appendChild(s);
}
var STOP=/^(the|a|an|is|are|my|me|i|it|to|of|on|in|and|or|not|no|with|for|from|do|does|doesn't|dont|don't|can't|cant|won't|this|that|في|من|على|عن|لا|ما|مش|هو|هي|انا|أنا|عندي|ال|و|او|أو|مع|الى|إلى)$/i;
function norm(s){return String(s).toLowerCase().replace(/[أإآ]/g,"ا").replace(/ة/g,"ه").replace(/ى/g,"ي").replace(/[^\w\u0600-\u06FF\s]/g," ")}
function searchHelp(q){
  var words=norm(q).split(/\s+/).filter(function(w){return w.length>1&&!STOP.test(w)});
  if(!words.length)return[];
  return HELP.map(function(a){
    var hay=norm([a.tags,a.en.t,a.en.when,a.ar.t,a.ar.when,a.cat].join(" ")),sc=0;
    words.forEach(function(w){if(hay.indexOf(w)>=0)sc+=w.length>3?2:1;var title=norm(a.en.t+" "+a.ar.t);if(title.indexOf(w)>=0)sc+=1});
    if(a.type==="fix")sc+=.5;
    return{a:a,s:sc};
  }).filter(function(x){return x.s>=2}).sort(function(x,y){return y.s-x.s}).slice(0,3).map(function(x){return x.a});
}

/* ---------- UI ---------- */
var css=document.createElement("style");
css.textContent=
"#qa-btn{position:fixed;bottom:84px;right:18px;z-index:61;display:flex;align-items:center;gap:8px;height:48px;padding:0 16px 0 12px;border-radius:24px;border:1px solid #E2A63F;background:#201E1A;color:#EFE8DB;font:600 .9rem/1 "+(AR?"'IBM Plex Sans Arabic',":"")+"Figtree,system-ui,sans-serif;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.45)}"+
"#qa-btn svg{width:24px;height:24px;flex:none}#qa-btn:hover{background:#2A2722}#qa-btn .dot{position:absolute;top:-3px;right:-3px;width:12px;height:12px;border-radius:50%;background:#E2A63F;border:2px solid #131210}"+
"html[dir=rtl] #qa-btn{right:auto;left:18px}html[dir=rtl] #qa-btn .dot{right:auto;left:-3px}"+
"body.qa-nowa #qa-btn{bottom:18px}"+
"#qa{position:fixed;bottom:18px;right:18px;z-index:62;width:380px;max-width:calc(100vw - 24px);height:min(600px,calc(100vh - 36px));display:flex;flex-direction:column;background:#1A1916;border:1px solid #4A443A;border-radius:14px;box-shadow:0 30px 80px -20px rgba(0,0,0,.8);overflow:hidden;color:#EFE8DB;font:400 .93rem/1.55 "+(AR?"'IBM Plex Sans Arabic','Noto Kufi Arabic',":"")+"Figtree,system-ui,sans-serif;animation:qain .2s ease}"+
"html[dir=rtl] #qa{right:auto;left:18px}"+
"@keyframes qain{from{opacity:0;transform:translateY(12px)}}"+
"@media (max-width:520px){#qa{inset:auto 0 0 0;width:100%;max-width:none;height:88vh;border-radius:14px 14px 0 0}html[dir=rtl] #qa{left:0}}"+
"#qa .hd{display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid #36322B;background:#201E1A}"+
"#qa .hd b{display:block;font-weight:700}#qa .hd small{display:block;color:#A79E8F;font-size:.76rem}#qa .hd .x{margin-inline-start:auto;all:unset;cursor:pointer;width:32px;height:32px;display:grid;place-items:center;border-radius:6px;color:#A79E8F;font-size:1.3rem}#qa .hd .x:hover{background:#2A2722;color:#EFE8DB}"+
"#qa .av{width:34px;height:34px;flex:none}"+
"#qa .log{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth}"+
"#qa .m{max-width:88%;padding:10px 12px;border-radius:12px;background:#2A2722;white-space:normal}#qa .m.me{align-self:flex-end;background:#E2A63F;color:#131210;border-bottom-right-radius:3px}html[dir=rtl] #qa .m.me{border-bottom-right-radius:12px;border-bottom-left-radius:3px}"+
"#qa .m.bot{align-self:flex-start;border-bottom-left-radius:3px}html[dir=rtl] #qa .m.bot{border-bottom-left-radius:12px;border-bottom-right-radius:3px}"+
"#qa .m b{color:#F3C877}#qa .m.me b{color:inherit}#qa .m ol,#qa .m ul{margin:6px 0 0;padding-inline-start:20px}#qa .m li{margin:3px 0}#qa .m a{color:#F3C877}#qa .m .tip{margin-top:8px;padding:7px 9px;border-radius:6px;background:rgba(226,166,63,.1);font-size:.86rem}"+
"#qa .ch{display:flex;flex-wrap:wrap;gap:6px}#qa .ch button,#qa .ch a{all:unset;box-sizing:border-box;cursor:pointer;padding:7px 11px;border:1px solid #4A443A;border-radius:999px;font-size:.85rem;line-height:1.3;color:#EFE8DB;background:#131210}#qa .ch button:hover,#qa .ch a:hover{border-color:#E2A63F;color:#F3C877}#qa .ch .wa{background:#2FA866;border-color:#2FA866;color:#fff}#qa .ch .wa:hover{color:#fff;filter:brightness(1.1)}"+
"#qa .typing{display:inline-flex;gap:4px}#qa .typing i{width:6px;height:6px;border-radius:50%;background:#A79E8F;animation:qadot 1s infinite}#qa .typing i:nth-child(2){animation-delay:.15s}#qa .typing i:nth-child(3){animation-delay:.3s}@keyframes qadot{50%{opacity:.2}}"+
"#qa form{display:flex;gap:8px;padding:10px;border-top:1px solid #36322B;background:#201E1A}#qa input{flex:1;min-width:0;font:inherit;padding:11px 12px;border-radius:8px;border:1px solid #4A443A;background:#131210;color:#EFE8DB}#qa input:focus{outline:none;border-color:#E2A63F}"+
"#qa form button{all:unset;cursor:pointer;width:44px;display:grid;place-items:center;border-radius:8px;background:#E2A63F;color:#131210}#qa form button svg{width:20px;height:20px}html[dir=rtl] #qa form button svg{transform:scaleX(-1)}"+
"#qa .ft{padding:0 12px 8px;background:#201E1A;color:#6E675C;font-size:.72rem;text-align:center}"+
"@media print{#qa,#qa-btn{display:none!important}}";
document.head.appendChild(css);

function seen(){try{return sessionStorage.getItem("qa-seen")}catch(e){return 1}}
var CROWN='<svg viewBox="0 0 36 36" aria-hidden="true"><rect x=".5" y=".5" width="35" height="35" rx="8" fill="#131210" stroke="#E2A63F"/><path d="M8 23.5 L9.6 12.5 L14.4 17.6 L18 10 L21.6 17.6 L26.4 12.5 L28 23.5 Z" fill="#E2A63F"/><rect x="8" y="25.2" width="20" height="2.4" rx="1" fill="#E2A63F"/></svg>';
var btn=document.createElement("button");btn.id="qa-btn";btn.type="button";btn.setAttribute("translate","no");
btn.setAttribute("aria-label",L("Ask the Queen Tech assistant","اسأل مساعد كوين تك"));
btn.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="#E2A63F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01"/></svg><span>'+L("Ask us","اسألنا")+'</span>'+(seen()?"":'<i class="dot"></i>');
document.body.appendChild(btn);
if(!document.querySelector(".wa-float"))document.body.classList.add("qa-nowa");

var box=null,log=null,inp=null,hist=[],ctx={topic:""};
function open(){
  try{sessionStorage.setItem("qa-seen","1")}catch(e){}
  var d=btn.querySelector(".dot");if(d)d.remove();
  if(box){box.hidden=false;btn.hidden=true;inp.focus();return}
  box=document.createElement("div");box.id="qa";box.setAttribute("role","dialog");box.setAttribute("aria-label",L("Queen Tech assistant","مساعد كوين تك"));box.setAttribute("translate","no");
  box.innerHTML='<div class="hd">'+CROWN.replace('<svg','<svg class="av"')+'<div><b>'+L("Queen Tech assistant","مساعد كوين تك")+'</b><small>'+L("Instant answers · a real engineer on WhatsApp","إجابات فورية · ومهندس حقيقي على واتساب")+'</small></div><button class="x" type="button" aria-label="'+L("Close","إغلاق")+'">×</button></div>'+
    '<div class="log" aria-live="polite"></div>'+
    '<form><input type="text" autocomplete="off" maxlength="400" placeholder="'+L("Describe your problem or ask a question…","اكتب مشكلتك أو سؤالك…")+'" aria-label="'+L("Your message","رسالتك")+'"><button type="submit" aria-label="'+L("Send","إرسال")+'"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.4 20.4 21 12 3.4 3.6 3 10l12 2-12 2z"/></svg></button></form>'+
    '<div class="ft">'+L("Automatic assistant. For a confirmed price or booking, we reply on WhatsApp.","مساعد آلي. لتأكيد السعر أو الحجز نرد عليك على واتساب.")+'</div>';
  document.body.appendChild(box);btn.hidden=true;
  log=box.querySelector(".log");inp=box.querySelector("input");
  box.querySelector(".x").onclick=close;
  box.addEventListener("keydown",function(e){if(e.key==="Escape")close()});
  box.querySelector("form").onsubmit=function(e){e.preventDefault();var v=inp.value.trim();if(!v)return;inp.value="";me(v);answer(v)};
  log.addEventListener("click",onChip);
  welcome();inp.focus();
}
function close(){if(box)box.hidden=true;btn.hidden=false;btn.focus()}
btn.onclick=open;

function scroll(){log.scrollTop=log.scrollHeight}
function me(t){hist.push("Customer: "+t);var m=document.createElement("div");m.className="m me";m.textContent=t;log.appendChild(m);scroll()}
function bot(html,chips){
  var m=document.createElement("div");m.className="m bot";m.innerHTML=html;log.appendChild(m);
  hist.push("Assistant: "+m.textContent.slice(0,300));
  if(chips&&chips.length){var c=document.createElement("div");c.className="ch";c.innerHTML=chips.map(chip).join("");log.appendChild(c)}
  scroll();
}
function chip(c){
  if(c.href)return'<a href="'+esc(c.href)+'"'+(c.ext?' target="_blank" rel="noopener"':'')+(c.wa?' class="wa"':'')+'>'+esc(c.t)+'</a>';
  return'<button type="button" data-a="'+esc(c.a)+'"'+(c.v?' data-v="'+esc(c.v)+'"':'')+'>'+esc(c.t)+'</button>';
}
function waChip(extra){
  var lines=[L("Hello Queen Tech, I came from the website assistant.","مرحباً كوين تك، جئت من مساعد الموقع.")];
  if(ctx.topic)lines.push(L("Topic: ","الموضوع: ")+ctx.topic);
  if(extra)lines.push(extra);
  var last=hist.filter(function(h){return h.indexOf("Customer: ")===0}).slice(-3).map(function(h){return"• "+h.slice(10)});
  if(last.length)lines=lines.concat([L("My messages:","رسائلي:")],last);
  return{t:L("💬 Talk to an engineer on WhatsApp","💬 كلّم مهندس على واتساب"),href:"https://wa.me/"+WA+"?text="+encodeURIComponent(lines.join("\n")),ext:1,wa:1};
}
function menu(){return[{t:L("🔧 Something isn't working","🔧 عندي مشكلة"),a:"diag"},{t:L("💰 Prices & offers","💰 الأسعار والعروض"),a:"price"},{t:L("🎮 Gamers & Steam games","🎮 الجيمرز وألعاب Steam"),a:"games"},{t:L("📅 Book a free site visit","📅 احجز زيارة مجانية"),a:"visit"}]}
function welcome(){
  bot(L("Hi! 👋 I'm the Queen Tech assistant. I can help you fix a problem step by step, check prices and offers, or connect you to our engineer.","أهلاً! 👋 أنا مساعد كوين تك. أقدر أساعدك تحل مشكلتك خطوة بخطوة، أو تعرف الأسعار والعروض، أو أوصلك بالمهندس.")+
    (O.on?'<div class="tip">'+L("🔥 50% off all installation until 1 December.","🔥 خصم 50% على كل التركيب حتى 1 ديسمبر.")+'</div>':""),menu());
}
function onChip(e){
  var b=e.target.closest("button[data-a]");if(!b)return;
  var a=b.getAttribute("data-a"),v=b.getAttribute("data-v");
  me(b.textContent.replace(/^[^\w\u0600-\u06FF]+/,""));
  act(a,v);
}
function act(a,v){
  switch(a){
  case"diag":ctx.topic="";bot(L("Which system has the problem?","المشكلة في أي نظام؟"),CATS.map(function(c){return{t:L(c.en,c.ar),a:"cat",v:c.id}}));break;
  case"cat":
    var c=CATS.filter(function(x){return x.id===v})[0];ctx.topic=c?L(c.en,c.ar):"";
    if(v==="pc"){bot(L("What's happening with the PC?","إيه اللي بيحصل في الجهاز؟"),GAMER.map(function(g){return{t:L(g[1],g[2]),a:"gamer",v:g[0]}}));break}
    loadHelp(function(){
      var list=HELP.filter(function(h){return h.cat===v&&h.type==="fix"});
      var chips=list.map(function(h){return{t:L(h.en.t,h.ar.t),a:"fix",v:h.id}});
      var g=HELP.filter(function(h){return h.cat===v&&h.type==="guide"})[0];
      if(g)chips.push({t:L("📘 Installation guide","📘 دليل التركيب"),a:"fix",v:g.id});
      chips.push({t:L("Something else","مشكلة أخرى"),a:"other"});
      bot(L("Which one looks like your problem?","أي واحدة شبه مشكلتك؟"),chips);
    });break;
  case"fix":loadHelp(function(){var h=HELP.filter(function(x){return x.id===v})[0];if(h)showArticle(h)});break;
  case"gamer":
    var g=GAMER.filter(function(x){return x[0]===v})[0],hw=/heat|power|build/.test(v);ctx.topic=L(g[1],g[2]);
    if(hw)bot(L("<b>"+esc(g[1])+"</b> needs a hands-on check. We do home visits or pick-up and return in Dubai and Abu Dhabi, and confirm the price before any work.","<b>"+esc(g[2])+"</b> يحتاج فحص الجهاز نفسه. نوفر زيارة منزلية أو استلام وتوصيل في دبي وأبوظبي، ونؤكد السعر قبل أي عمل."),[{t:L("Book a hardware check","احجز فحص هاردوير"),href:"/gamers.html#"+v},waChip()]);
    else bot(L("Good news: <b>"+esc(g[1])+"</b> can usually be fixed <b>online with AnyDesk</b> while you watch your screen. Install AnyDesk, send us the number, and an engineer connects.","خبر جيد: <b>"+esc(g[2])+"</b> غالباً تتحل <b>أونلاين عبر AnyDesk</b> وأنت تشاهد شاشتك. حمّل AnyDesk وابعت لنا الرقم ومهندسنا يتصل."),[{t:L("Start the online fix","ابدأ الحل أونلاين"),href:"/gamers.html#"+v},{t:L("Download AnyDesk (official)","تحميل AnyDesk (الرسمي)"),href:"https://anydesk.com/en/downloads",ext:1},waChip()]);
    break;
  case"yes":bot(L("Great, glad it's sorted! 🎉 Anything else?","ممتاز، سعيد إنها اتحلت! 🎉 في حاجة تانية؟"),menu());break;
  case"no":bot(L("No problem, let's get an engineer on it. Tap below and your details go straight to our WhatsApp.","ولا يهمك، خلّي المهندس يتابعها معاك. اضغط تحت وتفاصيلك هتوصل على واتساب مباشرة."),[waChip(L("The quick steps didn't fix it.","الخطوات السريعة لم تحل المشكلة.")),{t:L("Book a site visit","احجز زيارة"),href:P("/contact.html")}]);break;
  case"other":bot(L("Tell me in a few words what's happening, for example \"camera offline at night\" or \"door won't lock\".","اكتب لي في كلمتين إيه اللي بيحصل، مثلاً \"الكاميرا أوفلاين بالليل\" أو \"الباب مش بيقفل\"."));inp.focus();break;
  default:reply(a);
  }
}
function showArticle(h){
  var x=AR?h.ar:h.en;ctx.topic=x.t;
  var steps=x.steps.slice(0,5).map(function(s){return"<li>"+esc(s)+"</li>"}).join("");
  bot("<b>"+esc(x.t)+"</b><br>"+esc(x.when)+"<ol>"+steps+"</ol>"+(x.steps.length>5?L("…and "+(x.steps.length-5)+" more steps in the full guide.","…و"+(x.steps.length-5)+" خطوات أخرى في الدليل الكامل."):"")+(x.tip?'<div class="tip">💡 '+esc(x.tip)+"</div>":""),
    [{t:L("Open the full guide","افتح الدليل كامل"),href:"/help.html#"+h.id},{t:L("✅ That fixed it","✅ اتحلت"),a:"yes"},{t:L("❌ Still not working","❌ لسه مش شغالة"),a:"no"}]);
}
function reply(a){
  switch(a){
  case"price":bot(L("Get an instant price in 30 seconds: pick your goal (home, office, shop, gate barrier…) and the brand."+(O.on?" Installation is <b>50% off until 1 December</b>, cameras from <b>AED 75</b> each.":""),"اعرف السعر فوراً في 30 ثانية: اختار هدفك (بيت، مكتب، محل، بوابة مواقف…) والماركة."+(O.on?" التركيب <b>بخصم 50% حتى 1 ديسمبر</b>، والكاميرا من <b>75 درهم</b>.":"")),[{t:L("Check my price","احسب سعري"),href:"/price.html"},{t:L("Villa","فيلا"),href:"/price.html?preset=villa"},{t:L("Office","مكتب"),href:"/price.html?preset=office"},{t:L("Shop","محل"),href:"/price.html?preset=shop"},waChip()]);break;
  case"offer":bot(O.on?L("Current offers, all ending <b>1 December</b>:<ul><li>50% off all installation (cameras AED 75 instead of 150)</li><li>Assetto Corsa AED 150 and BeamNG.drive AED 150 with mods</li><li>Grand Theft Auto V AED 200</li><li>Any Steam game: Steam price + AED 50</li></ul>","العروض الحالية، وكلها تنتهي <b>1 ديسمبر</b>:<ul><li>خصم 50% على كل التركيب (الكاميرا 75 بدل 150)</li><li>Assetto Corsa ب150 و BeamNG.drive ب150 شامل الإضافات</li><li>Grand Theft Auto V ب200</li><li>أي لعبة Steam: سعرها + 50 درهم</li></ul>"):L("There are no running offers right now, but ask us on WhatsApp for the best price.","لا توجد عروض حالياً، لكن اسألنا على واتساب على أفضل سعر."),[{t:L("Check my price","احسب سعري"),href:"/price.html"},{t:L("Game offers","عروض الألعاب"),href:"/gamers.html#games"},waChip()]);break;
  case"games":bot(L("We buy the game on Steam, set up your account and install it, so you just press Play."+(O.on?" Offers until 1 December: <b>Assetto Corsa AED 150</b>, <b>BeamNG.drive AED 150</b> (with new tracks and cars), <b>GTA V AED 200</b>.":"")+" Any other game: Steam price + AED 50.","نشتري اللعبة من Steam ونجهّز حسابك ونثبّتها، وأنت تضغط Play بس."+(O.on?" عروض حتى 1 ديسمبر: <b>Assetto Corsa ب150</b>، <b>BeamNG.drive ب150</b> (مع طرق وسيارات جديدة)، <b>GTA V ب200</b>.":"")+" أي لعبة تانية: سعر Steam + 50 درهم."),[{t:L("See game offers","شوف عروض الألعاب"),href:"/gamers.html#games"},waChip(L("I'm interested in a Steam game.","مهتم بلعبة من Steam."))]);break;
  case"remote":act("gamer","win");break;
  case"where":bot(L("Our office is in <b>Silver Tower, Business Bay, Dubai</b>. We work all over <b>Dubai and Abu Dhabi</b>, and the site survey is free.","مكتبنا في <b>سيلفر تاور، الخليج التجاري، دبي</b>. نشتغل في كل <b>دبي وأبوظبي</b>، والمعاينة مجانية."),[{t:L("Open in Google Maps","افتح في خرائط جوجل"),href:"https://www.google.com/maps/search/?api=1&query=Silver+Tower+Business+Bay+Dubai",ext:1},{t:L("Book a free visit","احجز زيارة مجانية"),href:P("/contact.html")},waChip()]);break;
  case"visit":bot(L("We visit for free, check the place and send you a written quote. You only pay if you go ahead.","نزورك مجاناً، نعاين المكان ونبعتلك عرض سعر مكتوب، ولا تدفع إلا لو وافقت."),[{t:L("Book a free visit","احجز زيارة مجانية"),href:P("/contact.html")},waChip(L("I'd like a free site visit.","أريد زيارة مجانية للموقع."))]);break;
  case"tools":bot(L("Free tools for planning jobs: CCTV bandwidth and storage calculator, BOQ builder with Excel export, and the Tech corner.","أدوات مجانية لتخطيط الشغل: حاسبة الباندويث والتخزين، منشئ جدول الكميات مع تصدير Excel، وركن الفنيين."),[{t:L("Bandwidth calculator","حاسبة الباندويث"),href:"/bandwidth.html"},{t:L("BOQ builder","جدول الكميات"),href:"/boq.html"},{t:L("Tech corner","ركن الفنيين"),href:"/tech.html"}]);break;
  case"hours":bot(L("Message us on WhatsApp any time and we'll reply as soon as we can.","راسلنا على واتساب في أي وقت وهنرد عليك في أقرب وقت."),[waChip()]);break;
  case"hi":bot(L("Hello! How can I help?","أهلاً بيك! أقدر أساعدك إزاي؟"),menu());break;
  case"thanks":bot(L("You're welcome! 😊","العفو! 😊"),menu());break;
  }
}
function typing(){var m=document.createElement("div");m.className="m bot";m.innerHTML='<span class="typing"><i></i><i></i><i></i></span>';log.appendChild(m);scroll();return m}
function answer(q){
  var t=typing();
  if(AI_ENDPOINT){
    var ctl=new AbortController();setTimeout(function(){ctl.abort()},20000);
    fetch(AI_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},signal:ctl.signal,body:JSON.stringify({lang:AR?"ar":"en",page:location.pathname,history:hist.slice(-10),message:q})})
      .then(function(r){if(!r.ok)throw 0;return r.json()})
      .then(function(d){t.remove();if(!d||!d.reply)throw 0;
        var html=esc(d.reply).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/\n/g,"<br>");
        var chips=(d.links||[]).slice(0,3).map(function(l){return{t:l.t,href:l.href}});chips.push(waChip());bot(html,chips)})
      .catch(function(){t.remove();local(q)});
    return;
  }
  setTimeout(function(){t.remove();local(q)},450);
}
var PCFIX=/fps|lag|stutter|crash|game|gaming|graphics|gpu|overheat|thermal|laptop|\bpc\b|computer|فريم|لاج|تقطيع|بتقفل|تقفل|كراش|لعبه|لعبة|العاب|ألعاب|سخن|حراره|حرارة|كمبيوتر|لابتوب|كرت الشاشه|كرت الشاشة/i,
    CAMWORD=/camera|cctv|nvr|dvr|كاميرا|كاميرات|تسجيل/i;
function local(q){
  if(PCFIX.test(q)&&!CAMWORD.test(q)&&!/steam|ستيم|assetto|gta|beam/i.test(q)){act("cat","pc");return}
  for(var i=0;i<INTENTS.length;i++){if(INTENTS[i].k.test(q)){reply(INTENTS[i].a);return}}
  loadHelp(function(){
    var hits=searchHelp(q);
    if(hits.length===1){showArticle(hits[0]);return}
    if(hits.length){bot(L("These look close to your problem. Pick one:","دي أقرب حاجات لمشكلتك، اختار واحدة:"),hits.map(function(h){return{t:L(h.en.t,h.ar.t),a:"fix",v:h.id}}).concat([waChip()]));return}
    bot(L("I'm not sure I understood. Choose a topic, or send it to our engineer on WhatsApp and we'll reply.","مش متأكد إني فهمت. اختار موضوع، أو ابعتها للمهندس على واتساب وهنرد عليك."),menu().concat([waChip()]));
  });
}
window.QT_ASSIST_OPEN=open;
})();
