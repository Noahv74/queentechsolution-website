/* Arabic for the account system drawn by /qt-auth.js:
   the login gate on locked tool pages, the header account chip and the Firebase error messages.
   Load after /i18n/ar-common.js on account.html, bandwidth.html and boq.html. */
QT_AR.add({
  /* Firebase error messages (qt-auth.js → message) */
  "There's already an account with this email. Sign in instead, or reset your password.":"يوجد حساب مسجّل بهذا البريد الإلكتروني. سجّل الدخول بدلاً من ذلك، أو أعد تعيين كلمة المرور.",
  "That email address doesn't look right.":"يبدو أن عنوان البريد الإلكتروني غير صحيح.",
  "Please use a password of at least 8 characters.":"يرجى استخدام كلمة مرور من 8 أحرف على الأقل.",
  "Please enter your password.":"يرجى إدخال كلمة المرور.",
  "Email or password is wrong.":"البريد الإلكتروني أو كلمة المرور غير صحيحة.",
  "There's no account with this email yet.":"لا يوجد حساب بهذا البريد الإلكتروني حتى الآن.",
  "Too many attempts. Please wait a few minutes and try again.":"محاولات كثيرة. يرجى الانتظار بضع دقائق ثم المحاولة مرة أخرى.",
  "No connection. Check your internet and try again.":"لا يوجد اتصال. تحقّق من الإنترنت وحاول مرة أخرى.",
  "This website isn't allowed in the Firebase settings yet (Authentication → Settings → Authorized domains).":"هذا الموقع غير مسموح به في إعدادات Firebase بعد (Authentication ← Settings ← Authorized domains).",
  "This sign-in method isn't switched on in Firebase yet (Authentication → Sign-in method).":"طريقة تسجيل الدخول هذه غير مفعّلة في Firebase بعد (Authentication ← Sign-in method).",
  "You already have an account with this email. Sign in with your email and password instead.":"لديك حساب بهذا البريد الإلكتروني. سجّل الدخول ببريدك الإلكتروني وكلمة المرور بدلاً من ذلك.",
  "Your browser blocked the Google window. Allow pop-ups for this site and try again.":"منع المتصفح نافذة Google. اسمح بالنوافذ المنبثقة لهذا الموقع ثم حاول مرة أخرى.",
  "Google sign-in couldn't start. Please try again.":"تعذّر بدء تسجيل الدخول عبر Google. يرجى المحاولة مرة أخرى.",
  "Something went wrong. Please try again.":"حدث خطأ ما. يرجى المحاولة مرة أخرى.",

  /* gate: loading / connection problem */
  "Checking your account":"جارٍ التحقق من حسابك",
  "Connection problem":"مشكلة في الاتصال",
  "Couldn't check your account":"تعذّر التحقق من حسابك",
  "Please check your internet connection and reload the page.":"يرجى التحقق من اتصال الإنترنت وإعادة تحميل الصفحة.",
  "Reload":"إعادة التحميل",

  /* gate: signed in but email not verified */
  "One more step":"خطوة واحدة متبقية",
  "Verify your email":"أكّد بريدك الإلكتروني",
  "We sent a link to":"أرسلنا رابطاً إلى",
  ". Click it, then come back and press continue.":"‏. اضغط عليه، ثم عُد إلى هنا واضغط «متابعة».",
  "Can't find it? Check spam or junk.":"لم تجده؟ تحقّق من مجلد الرسائل غير المرغوب فيها (Spam / Junk).",
  "I've verified, continue":"أكّدت بريدي، متابعة",
  "Send again":"إرسال مرة أخرى",
  "Not verified yet. Click the link in the email first.":"لم يتم التأكيد بعد. اضغط على الرابط في البريد الإلكتروني أولاً.",
  "Sent. Check your inbox.":"تم الإرسال. تحقّق من صندوق الوارد.",

  /* gate: signed out */
  "Limited free service":"خدمة مجانية محدودة",
  "Free with a Queen Tech account":"مجاناً مع حساب كوين تك",
  "Free, takes about a minute":"مجاني ويستغرق دقيقة تقريباً",
  "Use all Queen Tech free tools":"استخدم جميع أدوات كوين تك المجانية",
  "We never share your details":"لا نشارك بياناتك مع أي جهة",
  "Have a Google account?":"لديك حساب Google؟",
  "Continue with Google":"المتابعة عبر Google",
  ", no email to verify.":"، دون الحاجة إلى تأكيد البريد الإلكتروني.",
  "Back to home page":"العودة إلى الصفحة الرئيسية"
  /* header chip: "Account" and "Sign out" come from ar-common.js */
});
QT_AR.rx([
  [/^Something went wrong\. Please try again\. \((auth\/[\w-]+)\)$/, "حدث خطأ ما. يرجى المحاولة مرة أخرى. ($1)"],
  [/^The bandwidth & CCTV storage calculator is free for registered customers\. Create your account once and use it any time, on any device\.$/, "حاسبة عرض النطاق وتخزين كاميرات المراقبة مجانية للعملاء المسجّلين. أنشئ حسابك مرة واحدة واستخدمها في أي وقت ومن أي جهاز."],
  [/^The CCTV BOQ builder is free for registered customers\. Create your account once and use it any time, on any device\.$/, "منشئ جدول كميات كاميرات المراقبة (BOQ) مجاني للعملاء المسجّلين. أنشئ حسابك مرة واحدة واستخدمه في أي وقت ومن أي جهاز."],
  [/^(.+) is free for registered customers\. Create your account once and use it any time, on any device\.$/, "$1 مجانية للعملاء المسجّلين. أنشئ حسابك مرة واحدة واستخدمها في أي وقت ومن أي جهاز."]
]);

/* Right-to-left fixes for the gate overlay and header chip (their base styles come from /qt-gate.js) */
(function(){
  if (window.QT_LANG !== "ar") return;
  var s = document.createElement("style");
  s.textContent =
    "html.rtl #qt-gate .box,html.rtl #qt-gate a.b,html.rtl #qt-gate button.b,html.rtl #qt-gate .k,html.rtl .qt-chip{font-family:'IBM Plex Sans Arabic','Segoe UI',Tahoma,sans-serif}" +
    "html.rtl #qt-gate .k{font-size:.8rem;font-weight:600}" +
    "html.rtl #qt-gate h2{font-family:'Noto Kufi Arabic','Segoe UI',Tahoma,sans-serif;font-size:1.75rem;line-height:1.35;text-transform:none}" +
    "html.rtl #qt-gate p{line-height:1.8}" +
    "html.rtl #qt-gate li{padding:5px 20px 5px 0}" +
    "html.rtl #qt-gate li::before{left:auto;right:0}" +
    "html.rtl #qt-gate b{unicode-bidi:plaintext}" +
    "html.rtl .qt-chip{font-size:.85rem}" +
    "html.rtl .qt-chip>span:first-child{unicode-bidi:plaintext}";
  document.head.appendChild(s);
})();
