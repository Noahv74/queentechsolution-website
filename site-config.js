/* Queen Tech – small site settings.
   coffeeUrl: paste your Buy Me a Coffee page (e.g. "https://buymeacoffee.com/queentech").
   While it is empty, the coffee buttons stay hidden. */
window.QT_SITE = {
  coffeeUrl: "",
  reviewUrl: "https://g.page/r/CXPWAzSYn864ECE/review"   /* Google Business "write a review" link */
};
(function(){
  function apply(){
    var u=(window.QT_SITE||{}).coffeeUrl;
    document.querySelectorAll("[data-coffee]").forEach(function(el){
      if(!u){el.hidden=true;return}
      el.hidden=false;var a=el.tagName==="A"?el:el.querySelector("a");if(a)a.href=u;
    });
  }
  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",apply):apply();
})();
