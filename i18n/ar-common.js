/* Shared Arabic text used on several pages */
QT_AR.add({
  "Queen Tech":"Queen Tech",
  "Solutions · Dubai · Abu Dhabi":"حلول تقنية · دبي · أبوظبي",
  "Services":"الخدمات","Prices":"الأسعار","Free tools":"أدوات مجانية","Tools & Help":"الأدوات والمساعدة","FAQ":"الأسئلة الشائعة","Home":"الرئيسية","Account":"الحساب",
  "Free site visit":"زيارة مجانية للموقع","Calculator":"الحاسبة","BOQ builder":"منشئ جدول الكميات","Hardware list":"قائمة الأجهزة",
  "Tech corner":"ركن الفنيين","Help centre":"مركز المساعدة","Help":"المساعدة",
  "Chat on WhatsApp":"تحدث معنا على واتساب","WhatsApp us":"راسلنا على واتساب",
  "Queen Tech Solutions home":"الصفحة الرئيسية لكوين تك","Main":"القائمة الرئيسية","On this page":"في هذه الصفحة",
  "Save as PDF":"حفظ PDF","Print":"طباعة","Copy":"نسخ","Copied ✓":"تم النسخ ✓","Copy list":"نسخ القائمة",
  "Sign out":"تسجيل الخروج","Sign in":"تسجيل الدخول","Create free account":"إنشاء حساب مجاني",
  "☕ Buy us a coffee":"☕ اعزمنا على قهوة",
  "Less":"أقل","More":"أكثر","Delete":"حذف","Remove":"حذف","Quantity":"الكمية",
  "Live":"مباشر","Mbps":"Mbps","GB":"GB","TB":"TB","AED":"درهم"
});
QT_AR.rx([
  [/^Queen Tech Solutions ·$/, "كوين تك للحلول التقنية ·"],
  [/^© 2026 Queen Tech Solutions/, "© 2026 كوين تك للحلول التقنية"],
  [/^AED ([\d.,]+)$/, "$1 درهم"],
  [/^You save AED ([\d.,]+)$/, "توفّر $1 درهم"]
]);
