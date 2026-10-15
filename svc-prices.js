/* Queen Tech – keeps the price chips on the service pages in step with prices.js.
   Each chip: <div class="pchip" data-p="lab:cam"> or data-p="from:cam2_dome,cam2_bullet">
   with an inner [data-v] for the value. The page ships with the price at build time;
   this script refreshes it (new prices, or the offer ending). */
(function(){
  var P=window.QT_PRICES;if(!P)return;
  var ar=document.documentElement.lang==="ar";
  function money(v){var s=(Math.round(v*100)/100).toLocaleString("en-US");return ar?s+" درهم":"AED "+s}
  document.querySelectorAll(".pchip[data-p]").forEach(function(c){
    var p=c.getAttribute("data-p").split(":"),v=c.querySelector("[data-v]");if(!v)return;
    if(p[0]==="lab"){
      var L=P.labour&&P.labour[p[1]];if(!L)return;
      v.textContent=money(L.price);
      var s=c.querySelector("s");
      if(L.was&&L.was>L.price){if(!s){s=document.createElement("s");v.parentNode.appendChild(s)}s.textContent=money(L.was)}
      else if(s)s.remove();
    }else if(p[0]==="from"){
      var best=null;
      p[1].split(",").forEach(function(k){var it=P.items&&P.items[k];if(!it)return;
        Object.keys(it.v).forEach(function(b){var x=it.v[b];if(x.price!=null&&(best==null||x.price<best))best=x.price})});
      if(best!=null)v.textContent=(ar?"ابتداءً من ":"From ")+money(best);
    }
  });
})();
