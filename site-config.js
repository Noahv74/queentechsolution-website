/* Queen Tech – small site settings.
   coffeeUrl: paste your Buy Me a Coffee page (e.g. "https://buymeacoffee.com/queentech").
   While it is empty, the coffee buttons stay hidden. */
window.QT_SITE = {
  coffeeUrl: "",
  reviewUrl: "https://g.page/r/CXPWAzSYn864ECE/review"   /* Google Business "write a review" link */,
  /* Google AdSense publisher ID (the AdSense tag itself is in the <head> of each public page).
     adsPages = where the games may call ads between levels / rewarded ads (Google's Ad Placement API). */
  adsClient: "ca-pub-5383296169254857",
  adsPages: ["/games.html", "/games/"],
  adsFrequency: "120s",        /* at most one between-level ad about every 2 minutes */
  adSlots: { arcade: "" }      /* optional: display ad unit ID for the box on games.html */
};
(function(){
  function apply(){
    var u=(window.QT_SITE||{}).coffeeUrl;
    document.querySelectorAll("[data-coffee]").forEach(function(el){
      if(!u){el.hidden=true;return}
      el.hidden=false;var a=el.tagName==="A"?el:el.querySelector("a");if(a)a.href=u;
    });
  }
  function ads(){
    var on=/^ca-pub-\d{10,20}$/.test(String((window.QT_SITE||{}).adsClient||"").trim());
    document.querySelectorAll("[data-ads-only]").forEach(function(el){el.hidden=!on});
    document.querySelectorAll("[data-noads-only]").forEach(function(el){el.hidden=on});
  }
  function both(){apply();ads()}
  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",both):both();
})();
