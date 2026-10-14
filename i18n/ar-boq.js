/* Arabic text for boq.html (CCTV BOQ builder).
   Only the visible text is translated. Camera data (coverage level, existing/new),
   the Excel export and the printed BOQ stay in English. */
QT_AR.add({
  "BOQ Builder | Queen Tech Solutions":"منشئ جدول الكميات | كوين تك",
  "BOQ builder · free tool":"منشئ جدول الكميات · أداة مجانية",
  "Saved on this device only":"محفوظ على هذا الجهاز فقط",
  "Saved on this device":"محفوظ على هذا الجهاز",
  "New":"جديد","Existing":"قائم","Open / import":"فتح / استيراد",
  "Sections":"الأقسام","Project":"المشروع","Cameras":"الكاميرات","Storage":"التخزين","BOQ":"جدول الكميات","Export":"التصدير",

  /* intro */
  "Limited free service · for installers & site teams":"خدمة مجانية محدودة · للفنيين وفرق المواقع",
  "Survey to":"من المسح إلى",", on site.":"، في الموقع.",
  "List the cameras as you walk the site. The BOQ, the camera breakdown per model and the hard-disk storage per NVR are worked out for you. Export to Excel or print to PDF when you're done.":
    "سجّل الكاميرات وأنت تتجوّل في الموقع، ويُحسب لك جدول الكميات وتوزيع الكاميرات حسب الموديل وسعة الأقراص الصلبة لكل NVR تلقائياً. وعند الانتهاء صدّر الملف إلى Excel أو اطبعه PDF.",
  "Everything stays on this device and is saved automatically. Nothing is uploaded. Use":"كل البيانات تبقى على هذا الجهاز وتُحفظ تلقائياً، ولا يُرفع أي شيء. استخدم",
  "or":"أو","Save project file":"حفظ ملف المشروع","to move a job to another device.":"لنقل العمل إلى جهاز آخر.",

  /* 01 project */
  "Project & client":"المشروع والعميل",
  "Project name":"اسم المشروع","Project / job ref":"رقم المشروع / المهمة","Survey date":"تاريخ المسح",
  "Client name":"اسم العميل","Client ID":"رقم العميل","Client phone":"هاتف العميل","Client email":"بريد العميل",
  "Location link":"رابط الموقع","Coordinates":"الإحداثيات","Use my current location":"استخدم موقعي الحالي",
  "Technician":"الفني","AMC expiry":"انتهاء عقد الصيانة (AMC)","Contract value":"قيمة العقد","Notes":"ملاحظات",
  "e.g. Sunset Residences 4 - SS4":"مثال: Sunset Residences 4 - SS4","e.g. SS1-CT-19-0041":"مثال: SS1-CT-19-0041",
  "e.g. 800000 AED":"مثال: 800000 درهم",

  /* 02 cameras */
  "Camera list":"قائمة الكاميرات","+ One camera":"+ كاميرا واحدة","Clear list":"مسح القائمة",
  "Add a batch":"إضافة مجموعة","e.g. all cameras on one floor":"مثلاً كل كاميرات طابق واحد",
  "How many":"العدد","Name prefix":"بداية الاسم","Start number":"رقم البداية","Model":"الموديل",
  "Coverage":"مستوى التغطية","Existing / new":"قائم / جديد","Floor":"الطابق","Remarks":"ملاحظات",
  "Add cameras":"إضافة الكاميرات",
  "Paste from Excel":"لصق من Excel","or import the whole file":"أو استيراد الملف كاملاً",
  "Same column order as the camera list sheet. The N. column is optional, and a blank floor takes the floor from the row above (for merged cells).":
    "بنفس ترتيب أعمدة ورقة قائمة الكاميرات. عمود N. اختياري، وإذا كانت خانة الطابق فارغة يُؤخذ الطابق من الصف الذي فوقها (للخلايا المدمجة).",
  "Add pasted rows":"إضافة الصفوف الملصقة","Import .xlsx file":"استيراد ملف ‎.xlsx",
  "Camera name":"اسم الكاميرا","Camera model":"موديل الكاميرا","Coverage level":"مستوى التغطية",
  "No cameras yet":"لا توجد كاميرات بعد",
  "Add a batch, paste rows from Excel, or import your existing file.":"أضف مجموعة، أو الصق صفوفاً من Excel، أو استورد ملفك الحالي.",
  "Existing or new":"قائم أو جديد",
  /* coverage levels: only the visible option text; the saved value stays English */
  "Detection Level":"كشف (DET)","Recognition Level":"تمييز (REC)","Identification Level":"تعرّف (ID)","Observation Level":"مراقبة (OBS)",
  /* summary pills */
  "cameras":"كاميرا","new ·":"جديد ·","existing":"قائم","floors":"طابق",

  /* 03 storage */
  "Models & storage":"الموديلات والتخزين","Add NVRs & hard disks to BOQ":"إضافة أجهزة NVR والأقراص إلى جدول الكميات",
  "Days to keep":"أيام الحفظ","Hard disk size":"سعة القرص الصلب","HDD model":"موديل HDD",
  "Camera models":"موديلات الكاميرات",
  "Fill in each model once. The description and brand go into the BOQ, and the bitrate drives the storage calculation. Typical H.265 bitrates: 2MP about 2–4 Mbps, 4MP about 4–6, 4K about 8.":
    "املأ بيانات كل موديل مرة واحدة. الوصف والماركة يظهران في جدول الكميات، ومعدل البت (Bitrate) يُستخدم لحساب التخزين. معدلات H.265 المعتادة: 2MP حوالي 2–4 Mbps، و4MP حوالي 4–6، و4K حوالي 8.",
  "Brand":"الماركة","Description (for BOQ)":"الوصف (لجدول الكميات)","Bitrate Mbps":"Bitrate ‏(Mbps)","Unit price":"سعر الوحدة","Qty":"الكمية",
  "No models yet":"لا توجد موديلات بعد","Models appear here as you add cameras.":"تظهر الموديلات هنا عند إضافة الكاميرات.",
  "e.g. 2MP IR bullet camera":"مثال: كاميرا Bullet بدقة 2MP مع IR",
  "Storage per NVR":"التخزين لكل NVR",
  "REC / DET":"REC / DET","ANPR / other":"ANPR / أخرى","Total Mbps":"إجمالي Mbps","Required":"المطلوب","HDDs":"عدد HDD",
  "Actual capacity":"السعة الفعلية","Suggested NVR":"NVR المقترح",
  "Nothing to size":"لا يوجد ما يُحسب","Give each camera an NVR to see the storage.":"حدّد NVR لكل كاميرا لعرض التخزين.",
  "Required = bitrate × 24 h × days, continuous recording. Actual capacity is what the recorder shows: an 8 TB disk gives about 7,450 GB.":
    "المطلوب = معدل البت × 24 ساعة × عدد الأيام، بتسجيل مستمر. السعة الفعلية هي ما يعرضه جهاز التسجيل: قرص 8 TB يعطي حوالي 7,450 GB.",
  "(no NVR)":"(بدون NVR)",

  /* 04 BOQ */
  "Bill of quantities":"جدول الكميات","Cameras to count":"الكاميرات المحتسبة",
  "All":"الكل","New only":"الجديد فقط","Existing only":"القائم فقط",
  "Show prices":"إظهار الأسعار","Add 5% VAT":"إضافة VAT بنسبة 5%",
  "N":"م","Device type":"نوع الجهاز","Description":"الوصف","Model number":"رقم الموديل","QTY":"الكمية","Total":"الإجمالي",
  "Quick add:":"إضافة سريعة:","+ Blank line":"+ سطر فارغ",
  "Camera lines":"أسطر الكاميرات","AUTO":"تلقائي",
  "come from the camera list; edit their description in Step 03.":"تأتي من قائمة الكاميرات؛ عدّل وصفها في الخطوة 03.",
  "Camera":"كاميرا","IP camera":"كاميرا IP","Delete line":"حذف السطر",
  "Empty BOQ":"جدول الكميات فارغ","Add cameras in Step 02 or use the quick-add buttons.":"أضف الكاميرات في الخطوة 02 أو استخدم أزرار الإضافة السريعة.",
  "Subtotal":"المجموع الفرعي","VAT 5%":"VAT ‏5%",
  /* quick-add chips (the line added to the BOQ stays English) */
  "+ 32 Channel NVR with 8x HDD":"+ NVR ‏32 قناة مع 8 أقراص HDD",
  "+ Surveillance HDD 8TB":"+ قرص مراقبة HDD ‏8TB",
  "+ 24 Port PoE+ Gigabit managed switch":"+ سويتش PoE+ جيجابت مُدار 24 منفذ",
  "+ 48 Port PoE+ Gigabit managed switch with fiber":"+ سويتش PoE+ جيجابت مُدار 48 منفذ مع فايبر",
  "+ 6U wall-mount cabinet 600x450":"+ كابينة جدارية 6U مقاس 600x450",
  "+ 42U floor-standing cabinet":"+ كابينة أرضية 42U",
  "+ Monitor 24-inch":"+ شاشة 24 بوصة",
  "+ Cat6 cable box 305m":"+ صندوق كابل Cat6 ‏305m",
  "+ Junction boxes":"+ علب التوصيل والحوامل والملحقات",
  "+ Installation":"+ التركيب والاختبار والتشغيل",

  /* 05 export */
  "Excel file":"ملف Excel",
  "Four sheets, as in your usual file: Client Details, Camera list, BOQ and STORAGE.":"أربع أوراق كما في ملفك المعتاد: Client Details وCamera list وBOQ وSTORAGE.",
  "Download .xlsx":"تنزيل ‎.xlsx","PDF / print":"PDF / طباعة",
  "A clean A4 BOQ with the Queen Tech header and signature lines, ready to send to the client.":"جدول كميات مرتب بحجم A4 بترويسة كوين تك وخانات التوقيع، جاهز للإرسال إلى العميل (بالإنجليزية).",
  "Include camera list":"تضمين قائمة الكاميرات","Print / save PDF":"طباعة / حفظ PDF","Project file":"ملف المشروع",
  "Save the whole job to continue on another phone or laptop, then open it with":"احفظ العمل كاملاً لتكمله على هاتف أو لابتوب آخر، ثم افتحه من زر",
  "Queen Tech Solutions · free tool · your project data stays on this device ·":"كوين تك للحلول التقنية · أداة مجانية · بيانات مشروعك تبقى على هذا الجهاز ·",

  /* messages */
  "Location isn't available on this device":"تحديد الموقع غير متاح على هذا الجهاز",
  "Location added":"تمت إضافة الموقع",
  "Couldn't get the location. Check location permission.":"تعذّر تحديد الموقع. تحقق من إذن الوصول إلى الموقع.",
  "Paste some rows first":"الصق بعض الصفوف أولاً","No camera rows found":"لم يتم العثور على صفوف كاميرات",
  "Give the cameras an NVR first":"حدّد NVR للكاميرات أولاً",
  "NVR and hard disk lines added to the BOQ":"تمت إضافة أسطر NVR والأقراص الصلبة إلى جدول الكميات",
  "Project file saved":"تم حفظ ملف المشروع","New project started":"تم بدء مشروع جديد","Project opened":"تم فتح المشروع",
  "That file isn't a BOQ project file":"هذا الملف ليس ملف مشروع جدول كميات",
  "Couldn't read that Excel file":"تعذّرت قراءة ملف Excel هذا",
  "Preparing Excel file…":"جارٍ تجهيز ملف Excel…","Excel file downloaded":"تم تنزيل ملف Excel",
  "Couldn't build the Excel file. Check your internet connection and try again.":"تعذّر إنشاء ملف Excel. تحقق من اتصال الإنترنت وحاول مرة أخرى.",
  "Start a new project? The current one will be cleared from this device. Download it first if you need it.":
    "بدء مشروع جديد؟ سيُمسح المشروع الحالي من هذا الجهاز. نزّله أولاً إذا كنت تحتاجه.",
  "Replace the current project with this file?\n\nOK = replace, Cancel = add the cameras to the current list":
    "استبدال المشروع الحالي بهذا الملف؟\n\nموافق (OK) = استبدال، إلغاء (Cancel) = إضافة الكاميرات إلى القائمة الحالية"
});

(function(){
  /* Arabic counting: 1 كاميرا واحدة, 2 كاميرتين, 3–10 كاميرات, 11+ كاميرا */
  function cams(n){n=+n;return n===1?"كاميرا واحدة":n===2?"كاميرتين":(n>=3&&n<=10)?n+" كاميرات":n+" كاميرا"}
  function lines(n){n=+n;return n===1?"سطر واحد":n===2?"سطرين":(n>=3&&n<=10)?n+" أسطر":n+" سطراً"}
  QT_AR.rx([
    [/^Step (\d+)$/, "الخطوة $1"],
    [/^(\d+) cameras? added$/, function(m,n){return "تمت إضافة "+cams(n)}],
    [/^(\d+) cameras? imported$/, function(m,n){return "تم استيراد "+cams(n)}],
    [/^(\d+) cameras? and (\d+) BOQ lines imported$/, function(m,n,k){return "تم استيراد "+cams(n)+" و"+lines(k)+" من جدول الكميات"}],
    [/^Reading (.+)…$/, "جارٍ قراءة $1…"],
    [/^(\d+) ch · (\d+)\+ bays$/, "$1 قناة · فتحات أقراص: $2 على الأقل"],
    [/^Delete camera (\d+)$/, "حذف الكاميرا $1"],
    [/^Brand for (.+)$/, "الماركة لـ $1"],
    [/^Description for (.+)$/, "الوصف لـ $1"],
    [/^Bitrate for (.+)$/, "معدل البت لـ $1"],
    [/^Unit price for (.+)$/, "سعر الوحدة لـ $1"],
    [/^Remove all (\d+) cameras from the list\?$/, function(m,n){return "حذف كل الكاميرات من القائمة ("+cams(n)+")؟"}],
    [/^Replace the current project with ([\s\S]+)\?$/, "استبدال المشروع الحالي بالملف $1؟"],
    [/^The BOQ already has (\d+) NVR \/ hard disk lines?\.\n\nOK = replace them with the suggested lines\nCancel = keep them and add the suggestion too$/,
      function(m,n){return "جدول الكميات يحتوي مسبقاً على "+lines(n)+" لأجهزة NVR / الأقراص الصلبة.\n\nموافق (OK) = استبدالها بالأسطر المقترحة\nإلغاء (Cancel) = إبقاؤها وإضافة الاقتراح أيضاً"}]
  ]);
  /* textarea placeholders are skipped by i18n.js, so set this one here */
  if(window.QT_LANG==="ar")document.addEventListener("DOMContentLoaded",function(){
    var p=document.getElementById("pasteBox");
    if(p)p.placeholder="انسخ الصفوف من قائمة الكاميرات في Excel والصقها هنا.\nالأعمدة: N. | Camera name | Model | Coverage | Existing/New | NVR | Remarks | Floor";
  });
})();
