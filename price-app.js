/* Queen Tech – instant price check / hardware list (uses prices.js) */
(function(){
"use strict";
var P=window.QT_PRICES,I=P.items,L=P.labour,B=P.brands,WA="971557971520";
var BRAND_KEYS=["hikvision","dahua","honeywell","infinique","zkteco"];
function $(id){return document.getElementById(id)}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function money(v){return Number(v).toLocaleString("en-US",{minimumFractionDigits:v%1?2:0,maximumFractionDigits:2})}
function r2(v){return Math.round(v*100)/100}

var state={goal:"office",mode:"price",brand:"rec",ov:{},extra:{}};
function ov(){return state.ov[state.goal]||(state.ov[state.goal]={})}
function extra(){return state.extra[state.goal]||(state.extra[state.goal]=[])}

/* ---------- questions ---------- */
function stepper(id,label,hint,val,min,max){return '<div class="q"><label class="lbl" for="'+id+'">'+label+(hint?'<small>'+hint+'</small>':'')+'</label><div class="step"><button type="button" data-step="-1" aria-label="Less">−</button><input id="'+id+'" name="'+id+'" type="number" inputmode="numeric" min="'+min+'" max="'+max+'" value="'+val+'"><button type="button" data-step="1" aria-label="More">+</button></div></div>'}
function choice(name,label,hint,opts,sel){return '<div class="q"><span class="lbl" id="l-'+name+'">'+label+(hint?'<small>'+hint+'</small>':'')+'</span><div class="opts" role="radiogroup" aria-labelledby="l-'+name+'">'+opts.map(function(o){return '<label class="opt"><input type="radio" name="'+name+'" value="'+o[0]+'"'+(o[0]===sel?" checked":"")+'><span>'+o[1]+(o[2]?'<small>'+o[2]+'</small>':'')+'</span></label>'}).join("")+'</div></div>'}
function checks(label,hint,opts){return '<div class="q"><span class="lbl">'+label+(hint?'<small>'+hint+'</small>':'')+'</span><div class="opts">'+opts.map(function(o){return '<label class="opt chk"><input type="checkbox" name="'+o[0]+'"'+(o[3]?" checked":"")+'><span>'+o[1]+(o[2]?'<small>'+o[2]+'</small>':'')+'</span></label>'}).join("")+'</div></div>'}
var Q={
  office:function(){return '<div class="row2">'+stepper("in","Rooms or areas inside","Offices, shop floor, till, store room",4,0,16)+stepper("out","Entrances &amp; outside areas","Doors, parking, back side",2,0,16)+'</div>'+
    choice("mp","Picture quality","",[["2","Standard","2MP · Full HD"],["4","Sharp","4MP · recommended"],["4c","Colour at night","4MP colour outside"]],"4")+
    choice("days","How many days of recording to keep?","",[["7","7 days"],["15","15 days"],["30","30 days","most common"],["60","60 days"]],"30")+
    choice("size","How big is the place?","For cable length",[["15","Small","shop / small office"],["25","Medium","office floor"],["40","Large","warehouse / villa"]],"25")+
    choice("mon","Do you want a screen on site to watch the cameras?","",[["1","Yes, add a monitor"],["0","No, phone only"]],"0")+
    '<div class="big-warn" id="bigwarn" hidden>More than 16 cameras needs a bigger recorder and a site plan. The list covers 16 cameras; book a free visit for the full design.</div>'},
  access:function(){return stepper("doors","How many doors?","Each door gets a reader, magnetic lock, exit button and power supply",1,1,20)+
    choice("how","How will people open the door?","",[["card","Card or PIN","budget"],["finger","Fingerprint","+ card + PIN"],["face","Face recognition","+ fingerprint + card"]],"finger")+
    choice("bell","Do you need a door bell?","",[["none","No"],["chime","Simple bell"],["intercom","Video intercom","see &amp; talk to visitors"]],"chime")+
    stepper("staff","How many staff need a card?","Cards come in packs of 50",10,0,500)},
  home:function(){return choice("sys","What type of system?","",[["wifi","Wi-Fi cameras","quick, no cabling"],["wired","Wired system","most reliable, records 24/7"]],"wifi")+
    '<div class="row2">'+stepper("hin","Cameras inside","Living room, entrance hall, kids' room",2,0,16)+stepper("hout","Cameras outside","Gate, garden, parking",2,0,16)+'</div>'+
    choice("door","Doorbell","",[["none","No"],["video","Video doorbell","see visitors on your phone"],["intercom","Video intercom","screen inside the villa"]],"video")+
    '<div id="wiredopts" hidden>'+choice("hdays","Days of recording","",[["15","15 days"],["30","30 days"]],"30")+'</div>'},
  network:function(){return stepper("area","Office size (m²)","Roughly, all rooms together",150,20,2000)+
    stepper("points","Wired network points","Desks, printers, TVs that need a cable",8,0,96)+
    choice("wifi","WiFi type","",[["6","WiFi 6","faster, newer"],["5","WiFi 5","budget"]],"6")+
    choice("router","Add a business router / firewall?","",[["1","Yes","VPN, two internet lines"],["0","No, keep my ISP router"]],"1")+
    choice("rack","Add a wall network cabinet?","",[["1","Yes","neat and safe"],["0","No"]],"1")},
  barrier:function(){return stepper("lanes","How many barriers?","One per entry or exit lane",1,1,6)+
    choice("road","How wide is the lane?","",[["4","Up to 4 m","standard arm"],["6","Wider than 4 m","longer arm, site visit"]],"4")+
    checks("How will cars get in?","Choose one or more",[["m_anpr","Number plate (ANPR)","camera reads the plate",1],["m_qr","QR code","for visitors",1],["m_uhf","UHF tag","sticker on residents' cars",0],["m_remote","Remote control","for staff / guards",1]])+
    '<div id="carsq" hidden>'+stepper("cars","Residents' cars (UHF tags)","One tag per car",20,1,2000)+'</div>'+
    choice("autoexit","Open automatically when a car leaves?","Adds an exit loop in the road",[["1","Yes","exit loop"],["0","No","exit by reader / remote"]],"1")+
    '<p class="hint">Every barrier includes a safety loop detector and a photocell, so the arm never closes on a car.</p>'}
};
function v(n){var el=document.querySelector('[name="'+n+'"]');if(!el)return null;if(el.type==="radio"){var c=document.querySelector('[name="'+n+'"]:checked');return c?c.value:null}if(el.type==="checkbox")return el.checked;return el.value}
function n(nm,min,max){var x=parseInt(v(nm),10);if(isNaN(x))x=min;return Math.max(min,Math.min(max,x))}

/* ---------- brand choice & recommendation ---------- */
var CCTV_SLOTS=/^(cam|nvr)/;
var ctx={};
function cheapestSys(slots){ // pick Hikvision or Dahua, whichever is cheaper for the whole camera system
  var best=null;["hikvision","dahua"].forEach(function(b){var t=0,ok=true;slots.forEach(function(s){var it=I[s.slot].v[b];if(!it||it.price==null)ok=false;else t+=it.price*s.qty});if(ok&&(!best||t<best.t))best={b:b,t:t}});
  return best?best.b:"hikvision"}
function recFor(slot){
  if(CCTV_SLOTS.test(slot))return ctx.cctvBrand||"hikvision";
  var r={ac_card:"generic",ac_finger:"zkteco",ac_face:"hikvision",intercom:"dahua",barrier:"hikvision",anpr:"dahua",qr:"generic",uhf:"generic",controller:(ctx.lanes>2?"zkteco":"generic")}[slot];
  return r||"generic"}
function variant(slot){
  var it=I[slot],keys=Object.keys(it.v);
  if(keys.length===1)return{brand:keys[0],d:it.v[keys[0]],fallback:false,generic:true};
  var want=state.brand==="rec"?recFor(slot):state.brand;
  if(it.v[want])return{brand:want,d:it.v[want],fallback:false};
  var r=recFor(slot);if(!it.v[r])r=keys[0];
  return{brand:r,d:it.v[r],fallback:true,wanted:want};
}
function brandName(b){return b==="generic"?"":B[b]+" "}

/* ---------- builders ---------- */
function eq(slot,qty,note){return{type:"eq",key:slot,slot:slot,qty:qty,note:note}}
function lab(id,qty){return{type:"lab",key:"lab:"+id,id:id,qty:qty}}
function storage(cams,mbps,days){var gb=cams*mbps*86400*days/8/1000*1.1,need=gb/931,list=[1,2,4,8];for(var i=0;i<list.length;i++)if(list[i]>=need)return{n:1,tb:list[i]};return{n:Math.ceil(need/8),tb:8}}
function cctv(cIn,cOut,mp,days,runM,mon,lines,notes){
  var total=cIn+cOut;if(!total)return;
  var capped=Math.min(total,16);if(total>16){var r=16/total;cIn=Math.round(cIn*r);cOut=16-cIn}
  var inId=mp==="2"?"cam2_dome":"cam4_dome",outId=mp==="2"?"cam2_bullet":(mp==="4c"?"cam4_colorvu":"cam4_bullet");
  var nvr=capped<=4?"nvr4":capped<=8?"nvr8":"nvr16";
  ctx.cctvBrand=cheapestSys([{slot:inId,qty:cIn},{slot:outId,qty:cOut},{slot:nvr,qty:1}]);
  if(cIn)lines.push(eq(inId,cIn,"Inside"));if(cOut)lines.push(eq(outId,cOut,"Outside"));
  lines.push(eq(nvr,1));
  var mb=(mp==="2"?2:mp==="4c"?3:2.5),s=storage(capped,mb,+days);
  lines.push(eq("hdd"+s.tb,s.n,"Keeps about "+days+" days"));
  if(s.n>I[nvr].bays)notes.push("This much recording needs a recorder with "+s.n+" disk bays; we'll advise on the right model.");
  lines.push(eq("cat6",Math.max(1,Math.ceil(capped*runM/305)),"About "+runM+" m per camera"));
  if(mon)lines.push(eq("monitor",1));
  lines.push(lab("cam",capped));lines.push(lab("nvr",1));
}
var BUILD={
  office:function(lines,notes){var cIn=n("in",0,16),cOut=n("out",0,16);$("bigwarn").hidden=cIn+cOut<=16;
    cctv(cIn,cOut,v("mp"),v("days"),+v("size"),v("mon")==="1",lines,notes);
    return{title:"Secure my office / shop",summary:(cIn+cOut)+" cameras ("+cIn+" inside, "+cOut+" outside), "+({"2":"2MP","4":"4MP","4c":"4MP colour at night"})[v("mp")]+", "+v("days")+" days recording"}},
  access:function(lines){var d=n("doors",1,20),how=v("how"),bell=v("bell"),staff=n("staff",0,500);
    lines.push(eq(how==="card"?"ac_card":how==="finger"?"ac_finger":"ac_face",d));
    lines.push(eq("maglock",d),eq("bracket",d),eq("exitbtn",d),eq("psu",d),eq("breakglass",d,"Required for fire safety"));
    if(staff)lines.push(eq("cards50",Math.ceil(staff/50)));
    lines.push(eq("cat6",Math.max(1,Math.ceil(d*20/305)),"About 20 m per door"));
    if(bell==="chime")lines.push(eq("chime",1));
    if(bell==="intercom")lines.push(eq("intercom",1));
    lines.push(lab("door",d));if(bell==="intercom")lines.push(lab("intercom",1));
    return{title:"Control door access",summary:d+" door"+(d>1?"s":"")+", "+({card:"card/PIN",finger:"fingerprint",face:"face recognition"})[how]+(bell!=="none"?", "+(bell==="chime"?"door bell":"video intercom"):"")+(staff?", "+staff+" staff cards":"")}},
  home:function(lines,notes){var sys=v("sys"),ci=n("hin",0,16),co=n("hout",0,16),door=v("door");$("wiredopts").hidden=sys!=="wired";
    if(sys==="wifi"){if(ci)lines.push(eq("wifi_in",ci,"Inside"));if(co)lines.push(eq("wifi_out",co,"Outside"));if(ci+co)lines.push(lab("wificam",ci+co));
      if(ci+co)notes.push("Wi-Fi cameras record to a memory card or the EZVIZ cloud (not included).");}
    else cctv(ci,co,"4",v("hdays")||"30",40,false,lines,notes);
    if(door==="video"){lines.push(eq("vdoorbell",1));lines.push(lab("intercom",1))}
    if(door==="intercom"){lines.push(eq("intercom",1));lines.push(lab("intercom",1))}
    return{title:"Secure my home / villa",summary:(sys==="wifi"?"Wi-Fi":"wired")+" cameras: "+ci+" inside, "+co+" outside"+(door!=="none"?", "+(door==="video"?"video doorbell":"video intercom"):"")}},
  network:function(lines){var area=n("area",20,2000),pts=n("points",0,96),w=v("wifi"),rt=v("router")==="1",rk=v("rack")==="1";
    var aps=Math.max(1,Math.ceil(area/120));lines.push(eq(w==="6"?"ap6":"ap5",aps,"About 1 per 120 m²"));
    var ports=aps+pts+(rt?1:0);
    if(ports<=9)lines.push(eq("poe8",1));else if(ports<=16)lines.push(eq("poe16",1));else{lines.push(eq("poe16",1));lines.push(eq("sw24",Math.ceil((ports-16)/24)))}
    if(rt)lines.push(eq("router",1));
    if(pts){lines.push(eq("keystone",pts));lines.push(eq("faceplate",pts));}
    lines.push(eq("cat6",Math.max(1,Math.ceil((pts+aps)*25/305)),"About 25 m per point"));
    if(rk){lines.push(eq("cab6u",1));if(pts)lines.push(eq("patch24",Math.ceil(pts/24)))}
    lines.push(lab("ap",aps));if(pts)lines.push(lab("point",pts));if(rt||rk)lines.push(lab("rack",1));
    return{title:"Office network & WiFi",summary:area+" m² office, "+aps+" WiFi "+w+" access point"+(aps>1?"s":"")+", "+pts+" network points"}},
  barrier:function(lines,notes){var ln=n("lanes",1,6),anpr=v("m_anpr"),qr=v("m_qr"),uhf=v("m_uhf"),rem=v("m_remote"),ax=v("autoexit")==="1",cars=n("cars",1,2000);
    ctx.lanes=ln;$("carsq").hidden=!uhf;
    var loops=ln*(ax?2:1);
    lines.push(eq("barrier",ln));
    lines.push(eq("loopdet",loops,ax?"Safety + exit loop per barrier":"Safety loop per barrier"));
    lines.push(eq("loopwire",Math.max(1,Math.ceil(loops*30/100)),"About 30 m per loop"));
    lines.push(eq("photocell",ln,"Safety beam"));
    if(anpr)lines.push(eq("anpr",ln));
    if(qr)lines.push(eq("qr",ln));
    if(uhf){lines.push(eq("uhf",ln));lines.push(eq("uhf_tag",cars))}
    if(rem)lines.push(eq("remote",ln));
    var readers=(anpr?ln:0)+(qr?ln:0)+(uhf?ln:0);
    if(readers){var c=variant("controller").d.lanes||2;lines.push(eq("controller",Math.ceil(ln/c)));lines.push(eq("cat6",Math.max(1,Math.ceil(ln*40/305)),"Data cable to camera / readers"))}
    lines.push(lab("barrier",ln));lines.push(lab("loop",loops));if(anpr)lines.push(lab("anprset",ln));if(qr||uhf)lines.push(lab("reader",(qr?ln:0)+(uhf?ln:0)));
    if(v("road")==="6")notes.push("Lanes wider than 4 m need a longer arm; we'll confirm the model after a site visit.");
    var how=[anpr&&"ANPR",qr&&"QR",uhf&&"UHF tags",rem&&"remote"].filter(Boolean).join(", ")||"no reader";
    return{title:"Gate barrier & ANPR",summary:ln+" barrier"+(ln>1?"s":"")+", entry by "+how+(ax?", automatic exit loop":"")}}
};

/* ---------- recommendation text ---------- */
function why(){
  if(state.brand!=="rec")return "Showing <b>"+B[state.brand]+"</b> where it makes the item. Where "+B[state.brand]+" has no matching product, our recommended brand is shown and marked.";
  return ({
    office:"<b>"+B[ctx.cctvBrand||"hikvision"]+"</b> cameras and recorder are the best value for your setup right now. One brand for cameras and recorder means smooth setup and one phone app.",
    home:v("sys")==="wired"?"<b>"+B[ctx.cctvBrand||"hikvision"]+"</b> gives the best value for a wired home system, with a free phone app.":"For Wi-Fi cameras we recommend <b>EZVIZ</b> (made by Hikvision): no cabling, easy phone app.",
    access:"Fingerprint: <b>ZKTeco SF300</b> (includes staff attendance). Face: <b>Hikvision</b>. Card: a standalone keypad. Video intercom: <b>Dahua KTP03 Pro</b>.",
    barrier:"<b>Hikvision</b> barrier kit (comes with photocells, warning light and remotes) with a <b>Dahua ANPR</b> camera, the best-priced ANPR available in the UAE.",
    network:"We use <b>TP-Link Omada</b> access points and switches: reliable, one app for the whole network."
  })[state.goal]}

/* ---------- render ---------- */
function renderQs(){
  $("qs").innerHTML=Q[state.goal]();
  $("qs").setAttribute("data-label",{office:"Secure my office / shop",access:"Control door access",home:"Secure my home / villa",network:"Office network & WiFi",barrier:"Gate barrier & ANPR"}[state.goal]);
  calc()}
function renderChips(){
  var opts=[["rec",'<span class="star">★</span> Recommended for my site']].concat(BRAND_KEYS.map(function(b){return[b,B[b]]}));
  $("chips").innerHTML=opts.map(function(o){return'<button type="button" data-brand="'+o[0]+'" aria-pressed="'+(state.brand===o[0])+'">'+o[1]+'</button>'}).join("");
}
function resolve(base){
  var o=ov(),out=[],removed=[];
  base.concat(extra().map(function(x){return eq(x,1,"Added")})).forEach(function(l,i){
    var k=l.key;var st=o[k]||{};
    var q=st.qty!=null?st.qty:l.qty;
    var line=Object.assign({},l,{qty:q});
    if(st.off||q<=0)removed.push(line);else out.push(line)});
  return{lines:out,removed:removed}}
function lineData(l){
  if(l.type==="lab"){var b=L[l.id];return{name:b.name,unit:b.price,was:b.was,per:b.per}}
  var it=I[l.slot],vr=variant(l.slot),d=vr.d;
  var incl=false;
  if((l.slot==="photocell"||l.slot==="remote")){var bv=variant("barrier").d;if(bv.includes&&bv.includes.indexOf(l.slot)>-1)incl=true}
  return{name:it.label,model:incl?"Comes with the "+brandName(variant("barrier").brand)+"barrier kit":brandName(vr.brand)+d.model,unit:incl?0:d.price,shop:d.shop,url:d.url,incl:incl,fallback:vr.fallback?("No "+B[vr.wanted]+" model; "+(B[vr.brand]||"other brand")+" shown"):"",brand:vr.brand}
}
function li(l){
  var d=lineData(l),hw=state.mode==="hw";
  var ctl='<div class="ctl"><span class="qty"><button type="button" data-q="-1" data-k="'+esc(l.key)+'" aria-label="Less">−</button><input data-qk="'+esc(l.key)+'" type="number" min="0" value="'+l.qty+'" aria-label="Quantity"><button type="button" data-q="1" data-k="'+esc(l.key)+'" aria-label="More">+</button></span><button type="button" class="rm" data-rm="'+esc(l.key)+'">Remove</button></div>';
  if(l.type==="lab"){var tot=r2(d.unit*l.qty);
    return '<div class="li"><div class="n"><b>'+esc(d.name)+'</b>'+(d.was?'<span class="badge">50% off</span>':"")+'<small>'+l.qty+' '+esc(d.per)+(l.qty>1&&!/s$/.test(d.per)?"s":"")+' × AED '+(d.was?'<s>'+money(d.was)+'</s> ':"")+money(d.unit)+'</small>'+ctl+'</div><div class="p">'+(d.was?'<s>'+money(d.was*l.qty)+'</s>':"")+'<span class="off">'+money(tot)+'</span></div></div>'}
  var price;
  if(d.incl)price='<span class="off">Included</span><small>with barrier kit</small>';
  else if(d.unit==null)price='<span class="req">On request</span><small>'+l.qty+' pc'+(l.qty>1?'s':'')+'</small>';
  else price=money(r2(d.unit*l.qty))+'<small>'+l.qty+' × '+money(d.unit)+'</small>';
  var link=d.url&&!d.incl?'<a href="'+esc(d.url)+'" target="_blank" rel="noopener nofollow">'+esc(d.shop)+' ↗</a>':(d.incl?"":'<a>'+esc(d.shop)+'</a>');
  return '<div class="li"><div class="n"><b>'+(hw?l.qty+' × ':"")+esc(d.name)+'</b><small>'+esc(d.model)+(l.note?" · "+esc(l.note):"")+'</small>'+(d.fallback?'<span class="flag">'+esc(d.fallback)+'</span><br>':"")+link+ctl+'</div><div class="p">'+price+'</div></div>'}
function addOptions(){
  var groups={office:/^(cam|nvr|hdd|cat6|monitor)/,home:/^(cam|nvr|hdd|cat6|monitor|wifi|vdoor|intercom|chime)/,access:/^(ac_|maglock|bracket|exitbtn|psu|breakglass|cards|chime|intercom|cat6)/,network:/^(ap|poe|sw24|router|patch|cab|keystone|face|cat6)/,barrier:/^(barrier|anpr|loop|photocell|qr|controller|uhf|remote|cat6|cam4_bullet)/}[state.goal];
  return Object.keys(I).filter(function(k){return groups.test(k)}).map(function(k){return'<option value="'+k+'">'+esc(I[k].label)+'</option>'}).join("")}
var last={};
function calc(){
  ctx={};var base=[],notes=[];var info=BUILD[state.goal](base,notes);
  last.baseKeys=base.map(function(l){return l.key});var r=resolve(base),lines=r.lines,hw=state.mode==="hw";
  var eqs=lines.filter(function(l){return l.type==="eq"}),labs=lines.filter(function(l){return l.type==="lab"});
  var eT=0,pend=0;eqs.forEach(function(l){var d=lineData(l);if(d.unit==null)pend++;else eT+=d.unit*l.qty});eT=r2(eT);
  var lT=r2(labs.reduce(function(a,l){return a+L[l.id].price*l.qty},0)),saved=r2(labs.reduce(function(a,l){var b=L[l.id];return a+(b.was?(b.was-b.price)*l.qty:0)},0));
  $("why").innerHTML=why();
  $("brandrow").hidden=state.goal==="network"||(state.goal==="home"&&v("sys")!=="wired");
  var rem=r.removed.length?'<div class="removed">Removed: '+r.removed.map(function(l){var nm=l.type==="lab"?L[l.id].name:I[l.slot].label;return'<span>'+esc(nm)+' <button type="button" class="link" data-back="'+esc(l.key)+'">add back</button></span>'}).join("")+'</div>':"";
  var tools="";
  if(hw&&$("withtools").checked){var tl=P.tools.common.concat(P.tools[{office:"cctv",home:v("sys")==="wired"?"cctv":"home",access:"access",network:"network",barrier:"barrier"}[state.goal]]||[]);
    tools='<div class="grp tools"><h3>Tools &amp; consumables <span>optional</span></h3><ul>'+tl.map(function(t){return'<li>'+esc(t)+'</li>'}).join("")+'</ul></div>'}
  $("groups").innerHTML='<div class="grp"><h3>'+(hw?"Hardware needed":"Equipment")+' <span>'+(hw?eqs.length+" items":"AED "+money(eT))+'</span></h3><p class="sub">'+(hw?"Quantities and models for this job. Change, remove or add items as needed.":"Lowest price we found online. Tap a shop to buy. Change, remove or add items as needed.")+'</p>'+eqs.map(li).join("")+
    '<div class="addrow"><select id="addsel" aria-label="Add an item"><option value="">+ Add an item…</option>'+addOptions()+'</select><button type="button" class="link" id="reset">Reset to suggested</button></div>'+rem+'</div>'+
    '<div class="grp lab"><h3>Installation by Queen Tech <span>AED '+money(lT)+'</span></h3>'+labs.map(li).join("")+'</div>'+tools+
    (notes.length?'<div class="grp"><p class="sub">'+notes.map(esc).join("<br>")+'</p></div>':"");
  document.querySelector(".quote").classList.toggle("hwmode",hw);
  $("totk").textContent=hw?"Items in this list":"Estimated total";
  $("grand").textContent=hw?eqs.length:money(r2(eT+lT));
  (function(){var n=$("totnote");if(!n)return;n.hidden=hw;if(hw)return;
    var AR=window.QT_LANG==="ar",MON={Jan:"يناير",Feb:"فبراير",Mar:"مارس",Apr:"أبريل",May:"مايو",Jun:"يونيو",Jul:"يوليو",Aug:"أغسطس",Sep:"سبتمبر",Oct:"أكتوبر",Nov:"نوفمبر",Dec:"ديسمبر"};
    var d=AR?String(P.checked).replace(/[A-Z][a-z]{2}/,function(m){return MON[m]||m}):P.checked;
    var t=AR?["تقدير مبدئي","الأسعار راجعناها "+d,"قد تُضاف ضريبة القيمة المضافة","التوصيل قد يكون إضافي","السعر النهائي بعد زيارة مجانية"]
            :["Estimate","Prices checked "+d,"VAT may apply","Delivery may be extra","Final quote after a free visit"];
    n.innerHTML=t.map(function(x,i){return'<span'+(i===0||i===4?' class="g"':'')+'>'+esc(x)+'</span>'}).join("")})();
  $("save").hidden=hw||!saved;$("save").textContent="You save AED "+money(saved);
  $("copy").hidden=!hw;$("toolsopt").hidden=!hw;
  $("fine").textContent=hw?"Models follow the brand you chose. Check compatibility on site before ordering.":
    "Equipment prices are the lowest we found at UAE online shops and dealers on "+P.checked+" (prices and stock change; delivery may be extra)."+(pend?" "+pend+" item"+(pend>1?"s are":" is")+" priced on request and not included in the total.":"")+" Installation by Queen Tech; VAT may apply. Final price confirmed after a free site visit.";
  // text versions
  var brandTxt=state.brand==="rec"?"Recommended":B[state.brand];
  var hwLines=eqs.map(function(l){var d=lineData(l);return"• "+l.qty+" × "+d.name+" — "+d.model});
  last.text=[info.title+" — hardware list ("+brandTxt+")",info.summary,""].concat(hwLines);
  if($("withtools").checked&&hw){var tl2=P.tools.common.concat(P.tools[{office:"cctv",home:v("sys")==="wired"?"cctv":"home",access:"access",network:"network",barrier:"barrier"}[state.goal]]||[]);last.text=last.text.concat(["","Tools & consumables:"],tl2.map(function(t){return"- "+t}))}
  last.text.push("","Made with queentechsolution.info/price.html");
  var waTxt=hw?last.text:["Hello Queen Tech, I used your price check.",info.title+": "+info.summary,"Brand: "+brandTxt,"Estimated total: AED "+money(r2(eT+lT))+" (equipment AED "+money(eT)+(pend?" + "+pend+" on request":"")+" + installation AED "+money(lT)+")",""].concat(hwLines).concat(["","Please contact me to book a site visit."]);
  $("wa").href=(hw?"https://wa.me/?text=":"https://wa.me/"+WA+"?text=")+encodeURIComponent(waTxt.join("\n"));
  $("wa").lastChild.textContent=hw?"Send list on WhatsApp":"Book this on WhatsApp";
}

/* ---------- events ---------- */
document.querySelectorAll(".goal").forEach(function(b){b.addEventListener("click",function(){
  state.goal=b.getAttribute("data-goal");document.querySelectorAll(".goal").forEach(function(x){x.setAttribute("aria-pressed",x===b)});
  renderQs();try{history.replaceState(null,"","#"+state.goal)}catch(e){}
})});
document.querySelectorAll("[data-mode]").forEach(function(b){b.addEventListener("click",function(){
  state.mode=b.getAttribute("data-mode");document.querySelectorAll("[data-mode]").forEach(function(x){x.setAttribute("aria-pressed",x===b)});calc()})});
$("chips").addEventListener("click",function(e){var b=e.target.closest("[data-brand]");if(!b)return;state.brand=b.getAttribute("data-brand");renderChips();calc()});
$("qs").addEventListener("input",calc);$("qs").addEventListener("change",calc);
$("qs").addEventListener("click",function(e){var b=e.target.closest("[data-step]");if(!b)return;var i=b.parentElement.querySelector("input");
  var x=(parseInt(i.value,10)||0)+parseInt(b.getAttribute("data-step"),10);x=Math.max(+i.min,Math.min(+i.max,x));i.value=x;calc()});
$("groups").addEventListener("click",function(e){var t=e.target,o=ov(),k;
  if((k=t.getAttribute("data-rm"))){o[k]=Object.assign(o[k]||{},{off:true});calc();return}
  if((k=t.getAttribute("data-back"))){if(o[k]){delete o[k].off;if(o[k].qty===0)delete o[k].qty}calc();return}
  if((k=t.getAttribute("data-k"))){var inp=t.parentElement.querySelector("input"),q=Math.max(0,(parseInt(inp.value,10)||0)+parseInt(t.getAttribute("data-q"),10));o[k]=Object.assign(o[k]||{},{qty:q});calc();return}
  if(t.id==="reset"){state.ov[state.goal]={};state.extra[state.goal]=[];calc()}});
$("groups").addEventListener("change",function(e){var t=e.target;
  if(t.id==="addsel"&&t.value){var s=t.value,ex=extra(),o=ov();if(last.baseKeys.indexOf(s)<0&&ex.indexOf(s)<0){ex.push(s);if(o[s])delete o[s]}else{var cur=document.querySelector('[data-qk="'+s+'"]');o[s]=Object.assign(o[s]||{},{off:false,qty:((cur&&parseInt(cur.value,10))||0)+1})}calc();return}
  var k=t.getAttribute("data-qk");if(k){var o2=ov();o2[k]=Object.assign(o2[k]||{},{qty:Math.max(0,parseInt(t.value,10)||0)});calc()}});
$("withtools").addEventListener("change",calc);
$("copy").addEventListener("click",function(){var txt=last.text.join("\n"),b=$("copy");
  function ok(){b.textContent="Copied ✓";setTimeout(function(){b.textContent="Copy list"},1600)}
  try{navigator.clipboard.writeText(txt).then(ok,function(){prompt("Copy the list:",txt)})}catch(e){prompt("Copy the list:",txt)}});
var h=location.hash.slice(1);if(Q[h]){state.goal=h;document.querySelectorAll(".goal").forEach(function(x){x.setAttribute("aria-pressed",x.getAttribute("data-goal")===h)})}
if(/[?&]mode=hw/.test(location.search)){state.mode="hw";document.querySelectorAll("[data-mode]").forEach(function(x){x.setAttribute("aria-pressed",x.getAttribute("data-mode")==="hw")})}
var PRESETS={
  apartment:{goal:"home",f:{sys:"wifi",hin:2,hout:0,door:"video"}},
  villa:{goal:"home",f:{sys:"wired",hin:2,hout:4,door:"intercom",hdays:"30"}},
  office:{goal:"office",f:{in:4,out:2,mp:"4",days:"30",size:"25",mon:"0"}},
  shop:{goal:"office",f:{in:3,out:1,mp:"4",days:"30",size:"15",mon:"1"}},
  warehouse:{goal:"office",f:{in:6,out:6,mp:"4c",days:"30",size:"40",mon:"1"}},
  building:{goal:"barrier",f:{lanes:2,m_anpr:true,m_qr:true,m_uhf:true,m_remote:false,cars:60,autoexit:"1"}}
};
var pm=location.search.match(/[?&]preset=([a-z]+)/),pre=pm&&PRESETS[pm[1]];
if(pre){state.goal=pre.goal;document.querySelectorAll(".goal").forEach(function(x){x.setAttribute("aria-pressed",x.getAttribute("data-goal")===pre.goal)})}
renderChips();renderQs();
if(pre){Object.keys(pre.f).forEach(function(k){var val=pre.f[k],els=document.querySelectorAll('[name="'+k+'"]');
  els.forEach(function(el){if(el.type==="radio")el.checked=el.value===String(val);else if(el.type==="checkbox")el.checked=!!val;else el.value=val})});calc()}
})();
