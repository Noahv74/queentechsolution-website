/* Queen Tech – site-wide search with autocomplete (EN/AR).
   Adds a 🔍 pill at the start of the section bar on every page. Opens with a click, "/" or Ctrl/⌘+K.
   Searches pages, services, prices, tools, help guides (help-data.js), barrier error codes (boards-data.js),
   gamer services, Steam offers and games. Arabic is normalised (أ/إ/آ→ا, ة→ه, ى→ي, no tashkeel, Arabic digits). */
(function () {
  "use strict";
  if (window.QT_SEARCH) return;
  var AR = (window.QT_LANG || document.documentElement.lang) === "ar";
  var WA = "971557971520";
  function L(en, ar) { return AR ? ar : en; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* ---------- text normalising ---------- */
  function norm(s) {
    return String(s || "").toLowerCase()
      .replace(/[٠-٩]/g, function (d) { return "٠١٢٣٤٥٦٧٨٩".indexOf(d); })
      .replace(/[۰-۹]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹".indexOf(d); })
      .replace(/[ً-ْـ]/g, "")
      .replace(/[أإآٱ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/ؤ/g, "و").replace(/ئ/g, "ي")
      .replace(/[&@#.,،؛;:!?؟"'()\[\]{}\/\\|·•–—_+*=<>~`-]+/g, " ")
      .replace(/\s+/g, " ").trim();
  }
  /* Arabic: drop the article "ال" (and "وال", "بال") from each word so "الكاميرا" finds "كاميرا". */
  function words(s) {
    return norm(s).split(" ").filter(Boolean).map(function (w) { w = w.replace(/^(و|ب|ف|ك|ل)?ال(?=\S{2,})/, ""); return /[\u0600-\u06FF]/.test(w) && w.length >= 5 ? w.replace(/(ات|ين|ون|ه|ي|ا)$/, "") : w; });
  }

  /* ---------- the index ---------- */
  var G = {
    page: ["Page", "صفحة"], svc: ["Service", "خدمة"], price: ["Price", "سعر"], tool: ["Free tool", "أداة مجانية"],
    help: ["Help guide", "دليل"], code: ["Error code", "كود عطل"], board: ["Barrier board", "كارت بوابة"],
    gamer: ["Gamers & PC", "الجيمرز"], game: ["Arcade", "الألعاب"], contact: ["Contact", "تواصل"]
  };
  /* [group, en title, ar title, url, en desc, ar desc, extra keywords] */
  var BASE = [
    ["page", "Home", "الرئيسية", "/", "Queen Tech Solutions, Dubai & Abu Dhabi", "كوين تك للحلول التقنية، دبي وأبوظبي", "start main queen tech home page الرئيسيه"],
    ["page", "Services", "الخدمات", "/services.html", "Everything we install and maintain", "كل اللي بنركّبه ونصونه", "what we do خدمات"],
    ["svc", "CCTV & security cameras", "كاميرات المراقبة", "/cctv-installation-dubai.html", "Install, upgrade and repair", "تركيب وترقية وصيانة", "cctv camera cameras nvr dvr hikvision dahua surveillance كاميرا كاميرات مراقبه تسجيل"],
    ["svc", "Access control", "أنظمة الدخول (أكسس كنترول)", "/access-control-dubai.html", "Fingerprint, face, card, maglocks", "بصمة، وجه، كارت، أقفال مغناطيسية", "access control fingerprint face card door maglock zkteco بصمه باب قفل اكسس"],
    ["svc", "Gate barriers", "بوابات المواقف", "/gate-barrier-installation.html", "Parking barriers, ANPR, loops", "بوابات المواقف، قراءة اللوحات، اللوب", "barrier gate parking boom anpr loop came bft titan بوابه باريير مواقف"],
    ["svc", "Networking & Wi-Fi", "الشبكات والواي فاي", "/network-wifi-installation-dubai.html", "Cabling, switches, Wi-Fi coverage", "تمديد، سويتشات، تغطية واي فاي", "network wifi wi-fi cabling cat6 switch router access point شبكه واي فاي انترنت راوتر"],
    ["svc", "IT maintenance & support", "صيانة ودعم IT", "/it-support-dubai.html", "Monthly support for offices and shops", "دعم شهري للمكاتب والمحلات", "it support maintenance monthly contract amc صيانه دعم عقد"],
    ["svc", "PC & laptop repair", "صيانة الكمبيوتر واللابتوب", "/laptop-repair-business-bay.html", "Hardware and software fixes", "إصلاح الهاردوير والسوفتوير", "pc laptop computer repair screen keyboard كمبيوتر لابتوب صيانه"],
    ["svc", "Mobile phone repair", "صيانة الموبايل", "/phone-repair-dubai.html", "Screens, batteries, software", "شاشات، بطاريات، سوفتوير", "mobile phone iphone samsung screen battery موبايل جوال تلفون شاشه بطاريه"],
    ["svc", "Software installation", "تسطيب البرامج", "/services.html#services", "Windows, Office, drivers", "ويندوز، أوفيس، تعريفات", "software windows office install drivers برامج ويندوز تسطيب تنصيب"],
    ["svc", "Laptop & data backup", "النسخ الاحتياطي للبيانات", "/services.html#services", "Backups and data recovery", "نسخ احتياطي واسترجاع بيانات", "backup data recovery cloud نسخ احتياطي بيانات استرجاع"],
    ["svc", "Service packages", "الباقات", "/services.html#packages", "Starting points for most jobs", "نقطة بداية لمعظم الشغل", "packages bundles plans باقات عروض"],
    ["price", "Instant price check", "احسب السعر فوراً", "/price.html", "Price in 30 seconds, with current offers", "السعر في 30 ثانية مع العروض الحالية", "price prices cost quote how much offer discount سعر اسعار بكام تكلفه عرض خصم"],
    ["price", "Cameras for a villa: price", "سعر كاميرات فيلا", "/price.html?preset=villa", "Typical villa CCTV setup", "تجهيز كاميرات فيلا", "villa home house cameras price فيلا بيت منزل"],
    ["price", "Cameras for an apartment: price", "سعر كاميرات شقة", "/price.html?preset=apartment", "Wi-Fi cameras and video door bell", "كاميرات واي فاي وجرس فيديو", "apartment flat شقه"],
    ["price", "Cameras for an office: price", "سعر كاميرات مكتب", "/price.html?preset=office", "Office CCTV setup", "كاميرات مكتب", "office مكتب شركه"],
    ["price", "Cameras for a shop: price", "سعر كاميرات محل", "/price.html?preset=shop", "Shop or restaurant CCTV", "كاميرات محل أو مطعم", "shop store restaurant محل مطعم"],
    ["price", "Cameras for a warehouse: price", "سعر كاميرات مستودع", "/price.html?preset=warehouse", "Warehouse CCTV", "كاميرات مستودع", "warehouse store مستودع مخزن"],
    ["price", "Gate barrier price", "سعر بوابة مواقف", "/price.html#barrier", "Barrier, ANPR, QR, UHF, remotes", "بوابة، قراءة لوحات، QR، UHF، ريموت", "barrier gate parking anpr price بوابه مواقف سعر"],
    ["price", "Access control price", "سعر أنظمة الدخول", "/price.html#access", "Fingerprint / face door", "باب ببصمة أو وجه", "access fingerprint door price بصمه باب سعر"],
    ["price", "Network & Wi-Fi price", "سعر الشبكات والواي فاي", "/price.html#network", "Cabling and Wi-Fi", "تمديد وواي فاي", "network wifi price شبكه واي فاي سعر"],
    ["price", "Offers until 1 December 2026", "العروض حتى 1 ديسمبر 2026", "/price.html", "50% off installation and game offers", "خصم 50% على التركيب وعروض الألعاب", "offer offers discount sale deal 50 عرض عروض خصم تخفيض"],
    ["tool", "Free tools", "أدوات مجانية", "/tools.html", "Calculators and BOQ builder", "حاسبات ومنشئ جدول الكميات", "tools free ادوات مجانيه"],
    ["tool", "CCTV bandwidth & storage calculator", "حاسبة الباندويث والتخزين", "/bandwidth.html", "Mbps, hard disk size, recording days", "ميجابت، حجم الهارد، أيام التسجيل", "bandwidth storage hdd hard disk tb days bitrate calculator باندويث تخزين هارد حاسبه ايام"],
    ["tool", "CCTV BOQ builder (Excel)", "منشئ جدول الكميات (Excel)", "/boq.html", "Camera list, storage, export to Excel/PDF", "قائمة الكاميرات والتخزين وتصدير Excel/PDF", "boq bill of quantities excel quotation جدول كميات اكسل"],
    ["tool", "Tech corner", "ركن الفنيين", "/tech.html", "Calculators, wiring and cheat sheets", "حاسبات وتوصيلات ومراجع سريعة", "tech corner technicians فنيين"],
    ["tool", "PoE budget calculator", "حاسبة طاقة PoE", "/tech.html#poe", "Watts per port and switch budget", "الوات لكل منفذ وطاقة السويتش", "poe watts switch power budget بو طاقه سويتش"],
    ["tool", "Lock wiring: NO / NC / COM", "توصيل الأقفال: NO / NC / COM", "/tech.html#wiring", "Maglock, exit button, break glass", "قفل مغناطيسي، زر خروج، كاسر زجاج", "wiring lock maglock no nc com exit button break glass diagram توصيل قفل زر خروج"],
    ["tool", "Default IPs & setup tools", "الآي بي الافتراضي وأدوات الضبط", "/tech.html#defaults", "Hikvision, Dahua, ZKTeco defaults", "الافتراضي لهيكفيجن وداهوا و ZKTeco", "default ip password hikvision dahua sadp config tool ايبي باسورد افتراضي"],
    ["tool", "RJ45 colours & Wiegand", "ألوان RJ45 و Wiegand", "/tech.html#cables", "T568B / T568A and distances", "T568B / T568A والمسافات", "rj45 colors colours t568b t568a cat6 wiegand cable الوان كابل"],
    ["tool", "Tools checklist", "قائمة العدة", "/tech.html#tools", "What to bring to site", "تاخد إيه معاك للموقع", "tools checklist kit عده"],
    ["help", "Help centre", "مركز المساعدة", "/help.html", "Installation guides and fixes", "أدلة تركيب وحلول مشاكل", "help guides fix problem troubleshooting مساعده دليل حل مشكله"],
    ["board", "Barrier board error codes", "أكواد أعطال كروت البوابات", "/boards.html", "CAME · BFT · Titan: choose the board, type the code", "CAME · BFT · Titan: اختار الكارت واكتب الكود", "error code fault board barrier came bft titan er err كود عطل ايرور كارت بوابه"],
    ["board", "CAME barrier boards", "كروت بوابات CAME", "/boards.html#came", "ZL392, ZL39, ZL39B, GARD PT, GARD PX…", "ZL392 و ZL39 و ZL39B و GARD PT و GARD PX…", "came gard كامي"],
    ["board", "BFT barrier boards", "كروت بوابات BFT", "/boards.html#bft", "MERAK, LIBRA, LEO MV D…", "MERAK و LIBRA و LEO MV D…", "bft giotto moovi michelangelo بي اف تي"],
    ["board", "Titan barrier board", "كارت بوابة Titan", "/boards.html#titan", "Fault finder and photo help", "تشخيص الأعطال والمساعدة بالصور", "titan titanhz تيتان"],
    ["gamer", "Gamers & PC rescue", "الجيمرز والكمبيوتر", "/gamers.html", "Online fixes with AnyDesk, hardware booking", "حل أونلاين عبر AnyDesk وحجز صيانة", "gamers gaming pc rescue جيمرز العاب كمبيوتر"],
    ["gamer", "Online fix with AnyDesk", "حل أونلاين عبر AnyDesk", "/gamers.html#online", "Send your AnyDesk ID, we connect", "ابعت رقم AnyDesk ومهندسنا يتصل", "anydesk remote online fix id عن بعد انى ديسك"],
    ["gamer", "Steam game offers", "عروض ألعاب Steam", "/gamers.html#games", "We buy, set up and install your game", "نشتري اللعبة ونجهزها ونثبتها", "steam games buy install account ستيم العاب لعبه تنصيب"],
    ["gamer", "Assetto Corsa: AED 150", "Assetto Corsa: 150 درهم", "/gamers.html#games", "With mods, tracks and cars, until 1 December 2026", "شامل الإضافات والطرق والسيارات، حتى 1 ديسمبر 2026", "assetto corsa racing sim اسيتو كورسا"],
    ["gamer", "BeamNG.drive: AED 150", "BeamNG.drive: 150 درهم", "/gamers.html#games", "With mods, until 1 December 2026", "شامل الإضافات، حتى 1 ديسمبر 2026", "beamng beam ng drive بيم"],
    ["gamer", "GTA V: AED 200", "GTA V: 200 درهم", "/gamers.html#games", "Account and install included, until 1 December 2026", "شامل الأكاونت والتنصيب، حتى 1 ديسمبر 2026", "gta grand theft auto 5 v جراند"],
    ["gamer", "Any other Steam game: Steam price + AED 50", "أي لعبة Steam: سعرها + 50 درهم", "/gamers.html#games", "Account set-up and install included", "شامل تجهيز الأكاونت والتنصيب", "steam other game price ستيم لعبه"],
    ["gamer", "Gamer quick checks", "فحوصات سريعة للجيمرز", "/gamers.html#tips", "Try these before you message us", "جرّبها قبل ما تراسلنا", "tips checks crash fps نصايح"],
    ["game", "Queen Tech Arcade", "ألعاب كوين تك", "/games.html", "Free games, no download", "ألعاب مجانية من غير تحميل", "games arcade play free fun bored العاب العب مجاني زهقان"],
    ["game", "Glitch Run", "Glitch Run", "/games/glitch-run.html", "Trap platformer, 100 levels", "لعبة فخاخ، 100 مرحلة", "glitch run platformer jump traps level"],
    ["game", "Cable Swing", "Cable Swing", "/games/cable-swing.html", "Swing on hooks, go far", "اتمرجح على الخطاطيف وروح لأبعد مسافة", "cable swing rope hook stickman"],
    ["game", "Crown Heist", "Crown Heist", "/games/crown-heist.html", "Sneak past the cameras", "اتسلل من غير ما الكاميرات تشوفك", "crown heist sneak stealth cameras"],
    ["contact", "Contact & free site visit", "تواصل واحجز زيارة مجانية", "/contact.html", "Book a free survey and written quote", "احجز معاينة مجانية وعرض سعر مكتوب", "contact visit survey quote book appointment تواصل زياره معاينه حجز"],
    ["contact", "FAQ", "الأسئلة الشائعة", "/contact.html#faq", "Common questions", "أسئلة متكررة", "faq questions warranty payment اسئله ضمان دفع"],
    ["contact", "Areas: Dubai & Abu Dhabi", "المناطق: دبي وأبوظبي", "/contact.html#areas", "Where we work", "المناطق اللي بنشتغل فيها", "areas dubai abu dhabi sharjah location مناطق دبي ابوظبي"],
    ["contact", "Our location on Google Maps", "موقعنا على خرائط جوجل", "https://maps.app.goo.gl/cSnLAqS8K9FapcgEA", "Silver Tower, Business Bay, Dubai", "سيلفر تاور، الخليج التجاري، دبي", "map location address office where directions موقع موقعكم مكانكم عنوان عنوانكم خريطه مكتب فين وين لوكيشن"],
    ["contact", "Review us on Google", "قيّمنا على جوجل", "https://g.page/r/CXPWAzSYn864ECE/review", "Tell others about your experience", "قول رأيك للناس", "review rating stars google تقييم"],
    ["contact", "Opening hours: every day 10am–10pm", "مواعيد العمل: كل يوم 10 ص – 10 م", "/contact.html", "Urgent help outside hours: call +971 55 797 1520", "للحالات العاجلة برّه المواعيد: اتصل +971 55 797 1520", "hours opening open close time today working مواعيد ساعات مفتوحين بتفتحوا امتى"],
    ["contact", "Track my repair (FixTrack)", "تابع إصلاح جهازي (FixTrack)", "/track.html", "Received · Diagnosing · Approval · Repairing · Ready", "استلام · فحص · موافقة · إصلاح · جاهز", "track repair status order code fixtrack where is my laptop phone ready تتبع تابع حالة الاصلاح جهازي جاهز كود"],
    ["contact", "WhatsApp us", "كلمنا واتساب", "https://wa.me/" + WA, "+971 55 797 1520", "+971 55 797 1520", "whatsapp phone call number واتساب رقم تلفون"],
    ["tool", "CCTV Camera Planner for Villas, Shops, Offices & Warehouses", "مخطط كاميرات المراقبة للفلل والمحلات والمكاتب والمستودعات", "/planner.html", "How many cameras, which NVR, how many TB", "كام كاميرا، أنهي NVR، وكام تيرا", "planner plan cameras how many nvr storage tb villa shop office warehouse مخطط تخطيط كام كاميرا هارد تيرا"],
    ["gamer", "Game Error Rescue: Vanguard, EasyAntiCheat, DirectX, FPS & Controller Fixes", "إنقاذ أخطاء الألعاب: حلول Vanguard وEasyAntiCheat وDirectX والـFPS ويد التحكم", "/rescue.html", "Fix game errors yourself, step by step", "حل أخطاء الألعاب بنفسك خطوة بخطوة", "game error rescue crash fix vanguard eac anticheat directx dll fps ping controller خطا لعبه بتقفل"],
    ["svc", "CCTV Installation in Dubai", "تركيب كاميرات المراقبة في دبي", "/cctv-installation-dubai.html", "Villas, shops, offices, warehouses", "فلل ومحلات ومكاتب ومستودعات", "cctv camera installation dubai تركيب كاميرات دبي"],
    ["svc", "CCTV Installation in Abu Dhabi", "تركيب كاميرات المراقبة في أبوظبي", "/cctv-installation-abu-dhabi.html", "Mussafah, Al Reem, Khalifa City, MBZ, Yas", "مصفح، الريم، مدينة خليفة، MBZ، ياس", "cctv camera installation abu dhabi mussafah reem khalifa mbz yas تركيب كاميرات ابوظبي مصفح"],
    ["svc", "Access Control Systems in Dubai & Abu Dhabi", "أنظمة التحكم بالدخول في دبي وأبوظبي", "/access-control-dubai.html", "Fingerprint, face, card, maglocks, attendance", "بصمة ووجه وكارت وأقفال وحضور وانصراف", "access control fingerprint face card attendance intercom بصمه حضور انصراف"],
    ["svc", "Gate Barrier & Parking Barrier Installation in Dubai and Abu Dhabi", "تركيب بوابات وحواجز المواقف في دبي وأبوظبي", "/gate-barrier-installation.html", "Remote, card, UHF, ANPR, loops", "ريموت، كارت، UHF، قراءة لوحات، لوب", "gate barrier parking boom anpr uhf installation بوابه مواقف حاجز"],
    ["svc", "Office Network & WiFi Installation in Dubai and Abu Dhabi", "تركيب الشبكات والواي فاي للمكاتب والفلل في دبي وأبوظبي", "/network-wifi-installation-dubai.html", "Cabling, business Wi-Fi, mesh for villas", "تمديد، واي فاي للشركات، ميش للفلل", "network wifi mesh cabling firewall شبكه واي فاي ميش"],
    ["svc", "IT Support & Maintenance for Small Businesses in Dubai and Abu Dhabi", "الدعم الفني وصيانة تقنية المعلومات للشركات الصغيرة في دبي وأبوظبي", "/it-support-dubai.html", "Offices, shops, clinics: Microsoft 365, backups", "مكاتب ومحلات وعيادات: مايكروسوفت 365 ونسخ احتياطي", "it support microsoft 365 email backup antivirus printer دعم فني ايميل طابعه"],
    ["svc", "Laptop & PC Repair in Business Bay, Dubai", "صيانة اللابتوب والكمبيوتر في الخليج التجاري دبي", "/laptop-repair-business-bay.html", "Screen, battery, SSD, Windows, overheating", "شاشة، بطارية، SSD، ويندوز، سخونة", "laptop pc repair business bay screen battery ssd ram صيانه لابتوب"],
    ["svc", "Mobile Phone Repair in Dubai", "صيانة الجوال في دبي", "/phone-repair-dubai.html", "iPhone & Android screen, battery, software", "آيفون وأندرويد: شاشة، بطارية، سوفتوير", "phone mobile repair iphone android screen battery charging صيانه جوال موبايل ايفون"],
    ["svc", "ExpressFix: book a repair", "إكسبرس فيكس: احجز تصليح", "/express.html", "PC, laptop, phone · drop-off or pickup · live tracking", "كمبيوتر، لابتوب، موبايل · تسليم أو استلام · تتبّع مباشر", "book repair booking pickup drop off laptop pc phone fix expressfix express حجز تصليح صيانه استلام لابتوب موبايل"],
    ["svc", "CCTV Care Plan", "خطة صيانة الكاميرات", "/care.html", "Scheduled CCTV maintenance visits", "زيارات صيانة دورية للكاميرات", "cctv maintenance amc annual contract care plan camera check nvr hard disk صيانه كاميرات عقد سنوي"],
    ["svc", "Business IT Support Plans", "باقات الدعم التقني للشركات", "/it-plans.html", "Monthly IT support for small offices", "دعم تقني شهري للمكاتب الصغيرة", "it support plan monthly managed office small business helpdesk amc دعم فني شهري شركات مكتب باقه"],
    ["svc", "Wi-Fi Checkup", "فحص الواي فاي", "/wifi-check.html", "Find dead zones and get a recommended setup", "اكتشف المناطق الميتة واحصل على الحل المناسب", "wifi wi-fi survey slow dead zone signal weak coverage mesh access point checkup واي فاي ضعيف بطيء اشاره فحص"],
    ["tool", "Access & barrier planner", "مخطط الدخول والبوابات", "/access-planner.html", "Doors, barriers, equipment and price", "الأبواب والبوابات والأجهزة والسعر", "access control planner door fingerprint face card barrier boom uhf anpr price estimate attendance مخطط نظام دخول بصمه وجه بوابه حضور انصراف سعر"],
    ["svc", "System card (QR sticker)", "بطاقة النظام (ملصق QR)", "/system.html", "Warranty, service history, report a problem", "الضمان وسجل الصيانة والإبلاغ عن مشكلة", "qr sticker system card warranty service history my system scan ملصق ضمان بطاقه نظام صيانه"],
    ["svc", "Business Bay: CCTV, access & IT", "الخليج التجاري: كاميرات ودخول وتقنية", "/cctv-it-support-business-bay.html", "Our home area", "منطقتنا", "business bay الخليج التجاري silver tower office"],
    ["svc", "JLT: IT support & Wi-Fi", "JLT: دعم تقني وواي فاي", "/cctv-it-support-jlt.html", "Offices, clinics, cafés", "مكاتب وعيادات وكافيهات", "jlt jumeirah lake towers ابراج بحيرات جميرا"],
    ["svc", "Dubai Marina: Wi-Fi, cameras & repairs", "دبي مارينا: واي فاي وكاميرات وتصليح", "/cctv-it-support-dubai-marina.html", "Apartments and shops", "شقق ومحلات", "dubai marina مارينا apartment شقه"],
    ["svc", "Al Quoz: warehouse CCTV & barriers", "القوز: كاميرات مستودعات وبوابات", "/cctv-it-support-al-quoz.html", "Warehouses and workshops", "مستودعات وورش", "al quoz القوز warehouse مستودع industrial"],
    ["svc", "Deira: shop CCTV & IT", "ديرة: كاميرات محلات وتقنية", "/cctv-it-support-deira.html", "Shops and trading companies", "محلات وشركات تجارية", "deira ديره shop محل trading"],
    ["svc", "Mussafah: CCTV, barriers & attendance", "مصفح: كاميرات وبوابات وحضور", "/cctv-it-support-mussafah.html", "Abu Dhabi industrial area", "منطقة أبوظبي الصناعية", "mussafah مصفح abu dhabi ابوظبي icad"],
    ["gamer", "Vanguard error (Valorant, League of Legends)", "خطأ Vanguard (فالورانت، ليغ أوف ليجندز)", "/rescue.html#vanguard", "Vanguard not initialized, or a VAN error when the game starts.", "Vanguard لم يبدأ، أو يظهر خطأ VAN عند تشغيل اللعبة.", "VAN 9001 · VAN 9003 · VAN -81 · VAN 152 · VAN 68 game error fix"],
    ["gamer", "EasyAntiCheat error", "خطأ EasyAntiCheat", "/rescue.html#eac", "EasyAntiCheat is not installed, launch error, or untrusted system file.", "EasyAntiCheat غير مثبت، أو خطأ في التشغيل، أو ملف نظام غير موثوق.", "EAC · EOS · 30005 · Untrusted system file game error fix"],
    ["gamer", "BattlEye error", "خطأ BattlEye", "/rescue.html#battleye", "BattlEye failed to initialize, BEService errors or kicks.", "فشل تشغيل BattlEye، أو أخطاء BEService، أو الطرد من اللعب.", "BEService · Failed to initialize game error fix"],
    ["gamer", "DirectX error (DXGI, D3D device lost)", "خطأ DirectX (DXGI أو D3D device lost)", "/rescue.html#dxgi", "The game freezes or closes with a graphics error.", "اللعبة تتجمد أو تغلق مع خطأ في الرسوميات.", "DXGI_ERROR_DEVICE_HUNG · DXGI_ERROR_DEVICE_REMOVED · D3D device lost game error fix"],
    ["gamer", "Missing DLL file", "ملف DLL ناقص", "/rescue.html#dll", "The game won't open because a file is missing.", "اللعبة لا تفتح بسبب ملف ناقص.", "MSVCP140.dll · VCRUNTIME140.dll · d3dx9_43.dll · xinput1_3.dll game error fix"],
    ["gamer", "Game crashes on start or to desktop", "اللعبة تنهار عند التشغيل أو تخرج لسطح المكتب", "/rescue.html#crash", "No error message, the game just closes.", "بدون رسالة خطأ، اللعبة تغلق فقط.", "Crash to desktop · Not responding game error fix"],
    ["gamer", "Low FPS and stutter", "FPS منخفض وتقطيع", "/rescue.html#fps", "The game runs slower than it should or freezes for a moment.", "اللعبة أبطأ مما يجب أو تتوقف لحظات.", "Low FPS · Stutter · Frame drops game error fix"],
    ["gamer", "High ping, lag and disconnects", "بنق عالٍ وتأخير وانقطاع", "/rescue.html#ping", "Rubber-banding, packet loss or getting kicked from matches.", "رجوع اللاعب للخلف، أو فقدان الحزم، أو الطرد من المباريات.", "High ping · Packet loss · Connection lost game error fix"],
    ["gamer", "Controller not detected", "يد التحكم غير معرّفة", "/rescue.html#controller", "Xbox, PlayStation or other gamepad not working in games.", "يد Xbox أو PlayStation أو غيرها لا تعمل في الألعاب.", "Gamepad · DualSense · Xbox controller game error fix"],
    ["gamer", "Steering wheel, pedals or force feedback", "المقود أو الدواسات أو الاهتزاز (Force Feedback)", "/rescue.html#wheel", "Wheel not detected, wrong rotation, pedals not working, no force feedback.", "المقود غير معرّف، أو الدوران خاطئ، أو الدواسات لا تعمل، أو لا يوجد اهتزاز.", "Logitech · Thrustmaster · Fanatec · Moza game error fix"],
    ["gamer", "Steam, Epic or Battle.net not working", "Steam أو Epic أو Battle.net لا يعمل", "/rescue.html#launcher", "The launcher won't open, log in or download.", "المنصة لا تفتح أو لا تسجّل الدخول أو لا تحمّل.", "Steam · Epic Games · Battle.net game error fix"],
    ["gamer", "Blue screen while gaming", "شاشة زرقاء أثناء اللعب", "/rescue.html#bsod", "The PC shows a blue screen and restarts.", "يظهر في الجهاز شاشة زرقاء ثم يعيد التشغيل.", "VIDEO_TDR_FAILURE · WHEA_UNCORRECTABLE_ERROR · IRQL_NOT_LESS_OR_EQUAL game error fix"],
    ["gamer", "PC shuts down or fans are very loud", "الجهاز ينطفئ أو المراوح عالية جداً", "/rescue.html#heat", "The PC turns off during games or sounds like a jet engine.", "الجهاز ينطفئ أثناء اللعب أو صوته مثل محرك طائرة.", "Overheating · Thermal throttling game error fix"],
    ["gamer", "No power or no display", "لا يعمل أو لا توجد صورة", "/rescue.html#nodisplay", "PC won't turn on, or it turns on with a black screen.", "الجهاز لا يعمل، أو يعمل مع شاشة سوداء.", "No POST · Black screen game error fix"],
    ["page", "Android app", "تطبيق الأندرويد", "/app.html", "Download the free app", "حمّل التطبيق المجاني", "app android apk download install تطبيق تحميل"],
    ["page", "My account", "حسابي", "/account.html", "Sign in for the BOQ builder", "سجّل دخول لمنشئ جدول الكميات", "account login sign in register حساب دخول تسجيل"],
    ["page", "Privacy policy", "سياسة الخصوصية", "/privacy.html", "", "", "privacy data delete خصوصيه"]
  ];
  var IDX = [], extraLoaded = 0;
  function add(g, en, ar, url, den, dar, kw, boost, cv) {
    var item = { g: g, en: en, ar: ar, u: url, den: den || "", dar: dar || "", b: boost || 0, cv: cv || null };
    item.tw = words(en + " " + ar);
    item.w = words([en, ar, den, dar, kw || ""].join(" "));
    IDX.push(item);
  }
  BASE.forEach(function (r) { add(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[0] === "svc" ? 6 : r[0] === "page" ? 1 : 0); });

  function loadScript(src, test, cb) {
    if (test()) return cb();
    var s = document.createElement("script"); s.src = src; s.onload = cb; s.onerror = cb; document.head.appendChild(s);
  }
  function codeVariants(c) {
    var u = c.toUpperCase().replace(/\s+/g, ""), m = u.match(/^(ERR?|E)(?=[0-9A-FX])/), core = m ? u.slice(m[0].length) : u;
    var cores = [core];
    if (/X$/.test(core)) { cores = "0123456789ABCDEF".split("").map(function (d) { return core.slice(0, -1) + d; }); }
    var out = [];
    var wild = /X$/.test(core);
    cores.forEach(function (k) {
      if (!/^[0-9]/.test(k) && !(m && /^[0-9A-F]/.test(k))) { out.push(k); return; }
      out.push(k, "E" + k, "ER" + k, "ERR" + k);
      if (!wild && /^0\d/.test(k)) out.push(k.slice(1), "ER" + k.slice(1));
    });
    return out.join(" ");
  }
  function loadExtra(cb) {
    if (extraLoaded === 2) return cb && cb();
    if (extraLoaded === 1) { setTimeout(function () { loadExtra(cb); }, 120); return; }
    extraLoaded = 1;
    var n = 2;
    function done() { if (--n) return; build(); extraLoaded = 2; if (cb) cb(); }
    loadScript("/help-data.js", function () { return !!window.QT_HELP; }, done);
    loadScript("/boards-data.js", function () { return !!window.QT_BOARDS; }, done);
  }
  function build() {
    (window.QT_HELP || []).forEach(function (a) {
      add("help", a.en.t, a.ar.t, "/help.html#" + a.id, a.en.when, a.ar.when, (a.tags || "") + " " + a.cat);
    });
    (window.QT_BOARDS || []).forEach(function (br) {
      br.boards.forEach(function (d) {
        add("board", br.name + " " + d.name, br.name + " " + d.name, "/boards.html#" + br.id + "/" + d.id, d.models, d.models, br.name + " " + d.models);
        d.codes.forEach(function (c) {
          var txt = !!d.text;
          add("code", (txt ? "" : c.c + " · ") + c.t[0], (txt ? "" : c.c + " · ") + c.t[1],
            "/boards.html#" + br.id + "/" + d.id + "/" + encodeURIComponent(c.c),
            br.name + " " + d.name + " · " + d.models, br.name + " " + d.name + " · " + d.models,
            br.name + " " + d.name + " " + (txt ? "" : codeVariants(c.c) + " " + c.al.map(codeVariants).join(" ")) + " " + c.why[0] + " " + c.why[1], 0,
            txt ? null : (codeVariants(c.c) + " " + c.al.map(codeVariants).join(" ")).toLowerCase().split(" "));
        });
      });
    });
  }

  /* ---------- matching ---------- */
  function lev1(a, b) { /* true if edit distance ≤ 1 */
    if (Math.abs(a.length - b.length) > 1) return false;
    var i = 0, j = 0, e = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++e > 1) return false;
      if (a.length > b.length) i++; else if (b.length > a.length) j++; else { i++; j++; }
    }
    return e + (a.length - i) + (b.length - j) <= 1;
  }
  function tokScore(t, ws, tws) {
    var best = 0, i, w;
    for (i = 0; i < tws.length; i++) { w = tws[i]; if (w === t) return 10; if (w.indexOf(t) === 0) best = Math.max(best, 8); }
    for (i = 0; i < ws.length; i++) {
      w = ws[i];
      if (w === t) best = Math.max(best, 6);
      else if (w.indexOf(t) === 0) best = Math.max(best, 5);
      else if (t.length >= 3 && w.indexOf(t) > 0) best = Math.max(best, 2);
      else if (t.length >= 4 && w.length >= 4 && (lev1(t, w) || lev1(t, w.slice(0, t.length)))) best = Math.max(best, 1.5);
    }
    return best;
  }
  function search(q) {
    var raw = norm(q).replace(/^(?:ايرور|ايرر|ايرو|اير|خطا|كود|عطل|error|err|code|fault)\s*(?:رقم|no|number)?\s*([0-9a-f]{1,2}[0-9a-fx]?)$/i, "er$1").replace(/^(err?|e)\s+([0-9a-f]{1,2})$/i, "$1$2");
    var compact = raw.replace(/\s+/g, "");
    var toks = words(raw);
    if (!toks.length) return [];
    var res = [];
    IDX.forEach(function (it) {
      var s = 0;
      for (var i = 0; i < toks.length; i++) { var k = tokScore(toks[i], it.w, it.tw); if (!k) return; s += k; }
      var t = norm(AR ? it.ar : it.en), nq = norm(raw);
      if (t.indexOf(nq) === 0) s += 6; else if (t.indexOf(nq) > -1) s += 3;
      s += it.b;
      if (it.cv && it.cv.indexOf(compact) > -1) s += 12;
      else if (it.g === "code" && /^(err?|e)?[0-9a-f]{1,2}$/i.test(compact)) s += 2;
      res.push({ it: it, s: s });
    });
    res.sort(function (a, b) { return b.s - a.s; });
    var seen = {}, out = [];
    for (var i = 0; i < res.length && out.length < 12; i++) { var u = res[i].it.u; if (seen[u]) continue; seen[u] = 1; out.push(res[i].it); }
    return out;
  }
  function hl(text, q) {
    var ws = q.trim().split(/\s+/).filter(function (w) { return w.length > 0; }).sort(function (a, b) { return b.length - a.length; });
    var h = esc(text);
    ws.forEach(function (w) {
      var ew = esc(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      try { h = h.replace(new RegExp("(^|[\\s(·/:-])(" + ew + ")", "gi"), "$1<mark>$2</mark>"); } catch (e) {}
    });
    return h;
  }
  function href(u) {
    if (/^https?:/.test(u)) return u;
    if (AR && window.QT_STATIC_AR) {
      var m = u.match(/^([^#?]*)(.*)$/), p = m[1] || "/";
      if (window.QT_STATIC_AR[p]) return window.QT_STATIC_AR[p] + m[2];
    }
    return u;
  }

  /* ---------- UI ---------- */
  var css = document.createElement("style");
  css.textContent =
    ".qs-btn{position:sticky;inset-inline-start:0;z-index:2;flex:none;display:inline-flex;align-items:center;gap:8px;margin:5px 0;margin-inline-end:10px;padding:6px 12px;border:1px solid var(--line-2,#4A443A);border-radius:999px;background:var(--bg,#131210);color:var(--muted,#A79E8F);font-family:inherit;font-weight:600;font-size:.82rem;line-height:1.2;cursor:pointer;white-space:nowrap;box-shadow:-10px 0 0 2px var(--bg,#131210),-20px 0 0 2px var(--bg,#131210),10px 0 10px -4px var(--bg,#131210)}" +
    "html.rtl .qs-btn,[dir=rtl] .qs-btn{box-shadow:10px 0 0 2px var(--bg,#131210),20px 0 0 2px var(--bg,#131210),-10px 0 10px -4px var(--bg,#131210)}" +
    ".qs-btn:hover,.qs-btn:focus-visible{border-color:var(--gold,#E2A63F);color:var(--ink,#EFE8DB)}" +
    ".qs-btn svg{width:16px;height:16px;stroke:var(--gold,#E2A63F);fill:none;stroke-width:2.2;stroke-linecap:round}" +
    ".qs-btn kbd{font:500 .66rem 'JetBrains Mono',monospace;color:var(--dim,#6E675C);border:1px solid var(--line,#36322B);border-radius:3px;padding:1px 5px}" +
    "@media (max-width:760px){.qs-btn kbd{display:none}.qs-btn{padding:6px 10px}}" +
    ".qs-hd{display:none;flex:none;width:40px;height:40px;place-items:center;padding:0;border:1px solid var(--line-2,#4A443A);border-radius:50%;background:transparent;color:var(--gold,#E2A63F);cursor:pointer;-webkit-tap-highlight-color:transparent}" +
    ".qs-hd svg{width:19px;height:19px;stroke:var(--gold,#E2A63F);fill:none;stroke-width:2.2;stroke-linecap:round}" +
    ".qs-hd:active,.qs-hd:focus-visible{border-color:var(--gold,#E2A63F);background:rgba(226,166,63,.12)}" +
    "@media (max-width:760px){html.qs-has-hd .qs-hd{display:inline-grid}html.qs-has-hd .qs-btn{display:none}}" +
    "@media (max-width:380px){.qs-hd{width:36px;height:36px}}" +
    "@media (max-width:760px){html.qs-has-hd header.top .links{gap:10px}}" +
    "html.qs-tight header.top .links .btn{display:none!important}" +
    "#qt-search{position:fixed;inset:0;z-index:400;background:rgba(8,7,6,.72);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);display:flex;justify-content:center;align-items:flex-start;padding:min(10vh,90px) 16px 16px}" +
    "#qt-search[hidden]{display:none}" +
    "#qt-search .qs-p{width:min(680px,100%);max-height:calc(100dvh - min(10vh,90px) - 16px);display:flex;flex-direction:column;background:var(--surface,#201E1A);border:1px solid var(--gold,#E2A63F);border-radius:10px;box-shadow:0 20px 60px rgba(0,0,0,.6),0 0 30px rgba(226,166,63,.12);overflow:hidden}" +
    "#qt-search .qs-f{display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid var(--line,#36322B)}" +
    "#qt-search .qs-f svg{width:20px;height:20px;flex:none;stroke:var(--gold,#E2A63F);fill:none;stroke-width:2.2;stroke-linecap:round}" +
    "#qt-search input{flex:1;min-width:0;border:0;outline:0;background:transparent;color:var(--ink,#EFE8DB);font-family:inherit;font-weight:500;font-size:1.1rem;line-height:1.4;padding:6px 0}" +
    "#qt-search input::-webkit-search-cancel-button{display:none}" +
    "#qt-search .qs-x{border:1px solid var(--line-2,#4A443A);background:transparent;color:var(--muted,#A79E8F);border-radius:4px;font:500 .72rem 'JetBrains Mono',monospace;padding:4px 7px;cursor:pointer}" +
    "#qt-search ul{list-style:none;margin:0;padding:6px;overflow-y:auto;overscroll-behavior:contain}" +
    "#qt-search li a{display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 12px;align-items:center;padding:10px 12px;border-radius:6px;color:var(--ink,#EFE8DB);text-decoration:none}" +
    "#qt-search li a .g{grid-row:span 2;font:600 .62rem/1 'JetBrains Mono',monospace;letter-spacing:.06em;text-transform:uppercase;color:var(--gold-2,#F3C877);border:1px solid rgba(226,166,63,.45);border-radius:3px;padding:4px 6px;min-width:78px;text-align:center}" +
    "html.rtl #qt-search li a .g{font-family:inherit;letter-spacing:0;font-size:.7rem}" +
    "#qt-search li a b{font-weight:600;font-size:.98rem;line-height:1.35;overflow:hidden;text-overflow:ellipsis}" +
    "#qt-search li a small{color:var(--muted,#A79E8F);font-size:.82rem;line-height:1.35;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
    "#qt-search li a mark{background:rgba(226,166,63,.28);color:inherit;border-radius:2px;padding:0 1px}" +
    "#qt-search li[aria-selected=true] a{background:var(--gold-soft,rgba(226,166,63,.12));outline:1px solid rgba(226,166,63,.5)}" +
    "#qt-search .qs-h{padding:10px 12px 4px;font:500 .68rem 'JetBrains Mono',monospace;letter-spacing:.12em;text-transform:uppercase;color:var(--dim,#6E675C)}" +
    "html.rtl #qt-search .qs-h{font-family:inherit;letter-spacing:0;font-size:.78rem}" +
    "#qt-search .qs-chips{display:flex;flex-wrap:wrap;gap:8px;padding:6px 12px 14px}" +
    "#qt-search .qs-chips button{border:1px solid var(--line-2,#4A443A);background:var(--bg-2,#1A1916);color:var(--ink,#EFE8DB);border-radius:999px;padding:7px 12px;font-family:inherit;font-weight:600;font-size:.84rem;cursor:pointer}" +
    "#qt-search .qs-chips button:hover{border-color:var(--gold,#E2A63F)}" +
    "#qt-search .qs-foot{display:flex;justify-content:space-between;gap:10px;padding:8px 14px;border-top:1px solid var(--line,#36322B);font:500 .7rem 'JetBrains Mono',monospace;color:var(--dim,#6E675C)}" +
    "@media (max-width:600px){#qt-search{padding:0}#qt-search .qs-p{border-radius:0;border-width:0 0 1px;max-height:100dvh;height:100dvh}#qt-search .qs-foot{display:none}#qt-search li a .g{min-width:0}}" +
    "html.qs-open{overflow:hidden}";
  document.head.appendChild(css);

  var ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4.2-4.2"/></svg>';
  var mac = /Mac|iPhone|iPad/.test(navigator.platform || "");
  var POP = AR ? [["سعر كاميرات", "كاميرات"], ["Er7", "Er7"], ["قفل مغناطيسي", "قفل مغناطيسي"], ["AnyDesk", "anydesk"], ["ألعاب Steam", "steam"], ["حاسبة التخزين", "تخزين"], ["زيارة مجانية", "زياره"], ["بوابات المواقف", "بوابه"]]
              : [["Camera price", "camera price"], ["Er7", "Er7"], ["Maglock wiring", "maglock"], ["AnyDesk", "anydesk"], ["Steam games", "steam"], ["Storage calculator", "storage"], ["Free site visit", "visit"], ["Gate barrier", "barrier"]];

  var box, inp, list, sel = -1, items = [], lastFocus = null;
  function ui() {
    if (box) return;
    box = document.createElement("div"); box.id = "qt-search"; box.hidden = true;
    box.innerHTML = '<div class="qs-p" role="dialog" aria-modal="true" aria-label="' + esc(L("Search the website", "ابحث في الموقع")) + '">' +
      '<div class="qs-f">' + ICON + '<input id="qs-in" type="search" autocomplete="off" spellcheck="false" enterkeyhint="go" role="combobox" aria-expanded="true" aria-controls="qs-list" aria-autocomplete="list" placeholder="' + esc(L("Search everything: cameras, Er7, maglock, Steam…", "ابحث في كل الموقع: كاميرات، Er7، قفل، Steam…")) + '"><button type="button" class="qs-x" aria-label="' + esc(L("Close", "إغلاق")) + '">Esc</button></div>' +
      '<ul id="qs-list" role="listbox"></ul>' +
      '<div class="qs-foot"><span>↑ ↓ ' + esc(L("to choose", "للاختيار")) + ' · Enter ' + esc(L("to open", "للفتح")) + '</span><span>' + esc(L("Search: / or ", "البحث: / أو ")) + (mac ? "⌘K" : "Ctrl K") + '</span></div></div>';
    box.setAttribute("translate", "no");
    document.body.appendChild(box);
    inp = box.querySelector("input"); list = box.querySelector("ul");
    inp.addEventListener("input", function () { render(); });
    inp.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Enter") { e.preventDefault(); var a = list.querySelector('li[aria-selected=true] a') || list.querySelector("li a"); if (a) a.click(); }
      else if (e.key === "Escape") { e.preventDefault(); close(); }
    });
    box.addEventListener("click", function (e) {
      if (e.target === box || e.target.closest(".qs-x")) { close(); return; }
      var c = e.target.closest("[data-q]"); if (c) { inp.value = c.getAttribute("data-q"); render(); inp.focus(); return; }
      var a = e.target.closest("a[data-u]");
      if (a) {
        try { var r = JSON.parse(localStorage.getItem("qt-search-recent") || "[]"); r = r.filter(function (x) { return x !== inp.value.trim(); }); if (inp.value.trim()) r.unshift(inp.value.trim()); localStorage.setItem("qt-search-recent", JSON.stringify(r.slice(0, 5))); } catch (x) {}
        var same = a.getAttribute("href").split("#")[0] === location.pathname || (a.getAttribute("href").split("#")[0] === "" );
        close(true);
        if (same && a.hash) {
          var hash = a.hash, was = location.hash;
          setTimeout(function () {
            if (/boards\.html$/.test(location.pathname)) { if (was === hash) window.dispatchEvent(new HashChangeEvent("hashchange")); return; }
            var el = null; try { el = document.getElementById(decodeURIComponent(hash.slice(1))); } catch (x) {}
            if (!el) { location.reload(); return; }
            if (el.tagName === "DETAILS") { if (el.hidden || el.offsetParent === null) { var q = document.getElementById("q"); if (q) { q.value = ""; q.dispatchEvent(new Event("input")); el = document.getElementById(hash.slice(1)); } } if (el) el.open = true; }
            if (el) el.scrollIntoView({ block: "start" });
          }, 40);
        }
      }
    });
  }
  function move(d) {
    var lis = list.querySelectorAll("li[role=option]"); if (!lis.length) return;
    sel = (sel + d + lis.length) % lis.length;
    lis.forEach(function (li, i) { li.setAttribute("aria-selected", i === sel ? "true" : "false"); });
    lis[sel].scrollIntoView({ block: "nearest" });
    inp.setAttribute("aria-activedescendant", lis[sel].id);
  }
  function row(it, q, i) {
    var ext = /^https?:/.test(it.u);
    return '<li role="option" id="qs-o' + i + '" aria-selected="' + (i === 0 && q ? "true" : "false") + '"><a data-u="1" href="' + esc(href(it.u)) + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + '><span class="g">' + esc(G[it.g][AR ? 1 : 0]) + '</span><b>' + hl(AR ? it.ar : it.en, q) + '</b><small>' + esc(AR ? it.dar : it.den) + "</small></a></li>";
  }
  function render() {
    var q = inp.value, h = "";
    sel = -1;
    if (!q.trim()) {
      var rec = []; try { rec = JSON.parse(localStorage.getItem("qt-search-recent") || "[]"); } catch (e) {}
      if (rec.length) h += '<li class="qs-h">' + esc(L("Recent", "عمليات بحث سابقة")) + '</li><li><div class="qs-chips">' + rec.map(function (r) { return '<button type="button" data-q="' + esc(r) + '">↺ ' + esc(r) + "</button>"; }).join("") + "</div></li>";
      h += '<li class="qs-h">' + esc(L("Popular", "الأكثر بحثاً")) + '</li><li><div class="qs-chips">' + POP.map(function (p) { return '<button type="button" data-q="' + esc(p[1]) + '">' + esc(p[0]) + "</button>"; }).join("") + "</div></li>";
      list.innerHTML = h; return;
    }
    items = search(q);
    if (extraLoaded !== 2) loadExtra(function () { if (inp.value === q) render(); });
    h = items.map(function (it, i) { return row(it, q, i); }).join("");
    if (!items.length) h = '<li class="qs-h">' + esc(L("No matches. Try another word, or ask us:", "مفيش نتايج. جرّب كلمة تانية، أو اسألنا:")) + "</li>";
    var n = items.length;
    h += '<li role="option" id="qs-o' + n + '" aria-selected="' + (n === 0 ? "true" : "false") + '"><a data-u="1" target="_blank" rel="noopener" href="https://wa.me/' + WA + "?text=" + encodeURIComponent(L("Hello Queen Tech, I'm looking for: ", "مرحباً كوين تك، بدوّر على: ") + q.trim()) + '"><span class="g" style="color:#9EE0BA;border-color:rgba(143,198,163,.5)">WhatsApp</span><b>' + esc(L("Ask us about “" + q.trim() + "”", "اسألنا عن «" + q.trim() + "»")) + "</b><small>" + esc(L("We reply on WhatsApp", "بنرد على واتساب")) + "</small></a></li>";
    list.innerHTML = h;
    if (n) { sel = 0; inp.setAttribute("aria-activedescendant", "qs-o0"); } else sel = 0;
  }
  function open(q) {
    ui(); lastFocus = document.activeElement;
    box.hidden = false; document.documentElement.classList.add("qs-open");
    if (window.QTG && !window.QTG.paused) { window.QTG.paused = true; box._game = 1; }
    inp.value = q || ""; render(); setTimeout(function () { inp.focus(); inp.select(); }, 20);
    loadExtra(function () { if (inp.value) render(); });
  }
  function close(nav) {
    if (!box || box.hidden) return;
    box.hidden = true; document.documentElement.classList.remove("qs-open");
    if (box._game && window.QTG) { window.QTG.paused = false; box._game = 0; }
    if (!nav && lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch (e) {}
  }
  window.QT_SEARCH = { open: open, close: close, search: function (q) { return search(q); }, load: loadExtra };

  function addButton() {
    var inr = document.querySelector(".qt-sec .qt-in");
    if (!inr || inr.querySelector(".qs-btn")) return !!inr;
    var b = document.createElement("button"); b.type = "button"; b.className = "qs-btn";
    b.setAttribute("aria-label", L("Search the website", "ابحث في الموقع"));
    b.innerHTML = ICON + "<span>" + esc(L("Search", "بحث")) + "</span><kbd>" + (mac ? "⌘K" : "Ctrl K") + "</kbd>";
    b.addEventListener("click", function () { open(""); });
    inr.insertBefore(b, inr.firstChild);
    /* phones: a round search button in the header, always visible (the pill in the scrolling bar hides there) */
    var tg = document.querySelector("header.top [data-lang-toggle], header.top .links a.lang, header.top .links .btn"), hd = tg && tg.parentNode;
    if (hd && !hd.querySelector(".qs-hd")) {
      var h = document.createElement("button"); h.type = "button"; h.className = "qs-hd";
      h.setAttribute("aria-label", L("Search the website", "ابحث في الموقع"));
      h.innerHTML = ICON;
      h.addEventListener("click", function () { open(""); });
      hd.insertBefore(h, tg);
      document.documentElement.classList.add("qs-has-hd");
      /* hide the header's gold button only if the header no longer fits */
      var fit = function () {
        var de = document.documentElement, nv = document.querySelector("header.top .nav") || hd;
        de.classList.remove("qs-tight");
        if (getComputedStyle(h).display !== "none" && (nv.scrollWidth > nv.clientWidth + 1 || de.scrollWidth > window.innerWidth + 1)) de.classList.add("qs-tight");
      };
      fit(); window.addEventListener("resize", fit);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    }
    return true;
  }
  if (!addButton()) { var tries = 0, iv = setInterval(function () { if (addButton() || ++tries > 20) clearInterval(iv); }, 150); }
  document.addEventListener("keydown", function (e) {
    var t = e.target, typing = t && (/INPUT|TEXTAREA|SELECT/.test(t.tagName) || t.isContentEditable);
    if ((e.key === "k" || e.key === "K") && (e.ctrlKey || e.metaKey)) { e.preventDefault(); if (box && !box.hidden) close(); else open(""); }
    else if (e.key === "/" && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); open(""); }
  });
  /* ?q=… opens the search (also used by Google's sitelinks search box) */
  var m = location.search.match(/[?&]q=([^&]+)/);
  if (m) { try { open(decodeURIComponent(m[1].replace(/\+/g, " "))); } catch (e) {} }
})();
