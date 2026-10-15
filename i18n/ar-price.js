/* Arabic text for price.html (instant price check). Uses the shared words in ar-common.js. */
(function(){
var T=function(s){return window.t?window.t(s):s};
/* Arabic counted nouns: 1, 2, 3-10, 11+ */
function cnt(n,w){n=+n;var f=n===1?w[0]:n===2?w[1]:(n%100>=3&&n%100<=10)?w[2]:w[3];return n===1||n===2?f:n+" "+f}
var U={
  camera:["كاميرا واحدة","كاميرتان","كاميرات","كاميرا"],
  system:["نظام واحد","نظامان","أنظمة","نظاماً"],
  door:["باب واحد","بابان","أبواب","باباً"],
  unit:["وحدة واحدة","وحدتان","وحدات","وحدة"],
  point:["نقطة واحدة","نقطتان","نقاط","نقطة"],
  "access point":["نقطة وصول واحدة","نقطتا وصول","نقاط وصول","نقطة وصول"],
  barrier:["حاجز واحد","حاجزان","حواجز","حاجزاً"],
  loop:["حلقة واحدة","حلقتان","حلقات","حلقة"],
  reader:["قارئ واحد","قارئان","قارئات","قارئاً"],
  day:["يوم واحد","يومان","أيام","يوماً"],
  item:["عنصر واحد","عنصران","عناصر","عنصراً"],
  pc:["قطعة واحدة","قطعتان","قطع","قطعة"],
  bay:["فتحة واحدة","فتحتين","فتحات","فتحة"]
};
var MON={Jan:"يناير",Feb:"فبراير",Mar:"مارس",Apr:"أبريل",May:"مايو",Jun:"يونيو",Jul:"يوليو",Aug:"أغسطس",Sep:"سبتمبر",Oct:"أكتوبر",Nov:"نوفمبر",Dec:"ديسمبر"};
function date(s){return s.replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/,function(m){return MON[m]})}
/* English words inside model and shop names */
var FRAG=[
  ["Standalone RFID keypad, 2,000 users","لوحة مفاتيح RFID مستقلة، 2,000 مستخدم"],
  ["kit (incl. photocells, light, 2 remotes)","طقم (يشمل حساسات ضوئية وضوء تحذير وجهازي تحكم عن بُعد)"],
  ["(eyeball)","(كروية)"],["(needs controller)","(يحتاج وحدة تحكم)"],["(with attendance)","(مع الحضور والانصراف)"],
  ["EM lock 600 lbs","قفل مغناطيسي EM 600 lbs"],["ZKTeco metal exit button","زر خروج معدني ZKTeco"],
  ["Oshtraco wireless set","طقم لاسلكي Oshtraco"],["VK07-A51L kit","طقم VK07-A51L"],
  ["PD-132 single channel","PD-132 قناة واحدة"],["Loop detector cable","كابل كاشف الحلقة"],
  ["(2 lanes)","(مساران)"],["(4 lanes)","(4 مسارات)"],["(from 50-pack)","(من عبوة 50 قطعة)"],["(from 10-pack)","(من عبوة 10 قطع)"],
  ["Kuwes 1-port","Kuwes بمنفذ واحد"],["(2MP full colour)","(2MP ألوان كاملة)"],["(via Pricena)","(عبر Pricena)"]
];
var FRX=new RegExp("("+FRAG.map(function(f){return f[0].replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}).join("|")+")");
function frag(s){FRAG.forEach(function(f){s=s.split(f[0]).join(f[1])});return s}

QT_AR.add({
  "Instant Price Check: CCTV, Access Control, Gate Barrier & WiFi | Queen Tech Dubai":"فحص السعر الفوري: كاميرات المراقبة، التحكم بالدخول، حواجز البوابات والواي فاي | كوين تك دبي",
  /* offer bar */
  "Limited offer:":"عرض لفترة محدودة:","50% off":"خصم 50%","all installation":"على جميع أعمال التركيب","installation labour":"على أجرة التركيب",
  ". Cameras only":". تركيب الكاميرا بـ","each instead of AED 150.":"فقط بدلاً من 150 درهم.",". Camera installation":". تركيب الكاميرا بـ","each instead of AED 150, camera hardware extra.":"بدلاً من 150 درهم، وسعر الكاميرا نفسها منفصل.","Ends 1 December 2026.":"ينتهي 1 ديسمبر 2026.",
  /* head */
  "Instant price check · Dubai & Abu Dhabi":"فحص السعر الفوري · دبي وأبوظبي",
  "Your price,":"سعرك،","in 30":"خلال 30","seconds.":"ثانية.",
  "Pick what you need and answer a few questions. You'll see every item at the":"اختر ما تحتاجه وأجب عن بضعة أسئلة. سترى كل قطعة",
  "lowest price we found at UAE online shops":"بأقل سعر وجدناه في المتاجر الإلكترونية في الإمارات",
  ", with a link to buy it, plus our installation price.":"، مع رابط للشراء، إضافة إلى سعر التركيب لدينا.",
  /* modes, goals, brands */
  "View":"طريقة العرض","Price for customer":"السعر للعميل","Hardware list only · technicians":"قائمة الأجهزة فقط · للفنيين",
  "What do you need?":"ماذا تحتاج؟",
  "Secure my office / shop":"تأمين مكتبي / متجري","CCTV cameras, recorder and phone viewing":"كاميرات مراقبة ومسجّل ومشاهدة من الهاتف",
  "Control door access":"التحكم بالدخول للأبواب","Fingerprint, face or card entry, door bell":"دخول بالبصمة أو الوجه أو البطاقة، وجرس الباب",
  "Secure my home / villa":"تأمين منزلي / فيلتي","Home cameras and video doorbell":"كاميرات منزلية وجرس باب بالفيديو",
  "Office network & WiFi":"شبكة المكتب والواي فاي","WiFi in every room, network points":"واي فاي في كل غرفة، ونقاط شبكة",
  "Gate barrier & ANPR":"حاجز البوابة و ANPR","Parking barrier, number-plate camera, QR":"حاجز مواقف، كاميرا قراءة اللوحات، QR",
  "Hardware brand":"العلامة التجارية للأجهزة","Recommended for my site":"الأنسب لموقعي","Other brand":"علامة أخرى",
  /* questions */
  "Your questions":"أسئلتك",
  "Rooms or areas inside":"الغرف أو المناطق الداخلية","Offices, shop floor, till, store room":"المكاتب، صالة المتجر، الكاشير، المخزن",
  "Entrances & outside areas":"المداخل والمناطق الخارجية","Doors, parking, back side":"الأبواب، المواقف، الجهة الخلفية",
  "Picture quality":"جودة الصورة","Standard":"عادية","Sharp":"واضحة","4MP · recommended":"4MP · موصى بها",
  "Colour at night":"ألوان في الليل","4MP colour outside":"4MP ملونة للخارج",
  "How many days of recording to keep?":"كم يوماً تريد الاحتفاظ بالتسجيل؟",
  "7 days":"7 أيام","15 days":"15 يوماً","30 days":"30 يوماً","60 days":"60 يوماً","most common":"الأكثر طلباً",
  "How big is the place?":"ما حجم المكان؟","For cable length":"لحساب طول الكابلات",
  "Small":"صغير","shop / small office":"متجر / مكتب صغير","Medium":"متوسط","office floor":"طابق مكاتب","Large":"كبير","warehouse / villa":"مستودع / فيلا",
  "Do you want a screen on site to watch the cameras?":"هل تريد شاشة في الموقع لمشاهدة الكاميرات؟",
  "Yes, add a monitor":"نعم، أضف شاشة","No, phone only":"لا، الهاتف فقط",
  "More than 16 cameras needs a bigger recorder and a site plan. The list covers 16 cameras; book a free visit for the full design.":"أكثر من 16 كاميرا يحتاج إلى مسجّل أكبر ومخطط للموقع. القائمة تغطي 16 كاميرا؛ احجز زيارة مجانية للتصميم الكامل.",
  "How many doors?":"كم عدد الأبواب؟","Each door gets a reader, magnetic lock, exit button and power supply":"كل باب يحصل على قارئ وقفل مغناطيسي وزر خروج ومزوّد طاقة",
  "How will people open the door?":"كيف سيفتح الأشخاص الباب؟","Card or PIN":"بطاقة أو رمز PIN","budget":"اقتصادي",
  "Fingerprint":"بصمة الإصبع","+ card + PIN":"+ بطاقة + PIN","Face recognition":"التعرف على الوجه","+ fingerprint + card":"+ بصمة + بطاقة",
  "Do you need a door bell?":"هل تحتاج جرس باب؟","No":"لا","Yes":"نعم","Simple bell":"جرس بسيط","Video intercom":"إنتركم مرئي","see & talk to visitors":"شاهد الزوار وتحدث معهم",
  "How many staff need a card?":"كم موظفاً يحتاج بطاقة؟","Cards come in packs of 50":"البطاقات تأتي في عبوات من 50",
  "What type of system?":"ما نوع النظام؟","Wi-Fi cameras":"كاميرات Wi-Fi","quick, no cabling":"سريعة، بدون كابلات",
  "Wired system":"نظام سلكي","most reliable, records 24/7":"الأكثر موثوقية، يسجّل 24/7",
  "Cameras inside":"كاميرات داخلية","Living room, entrance hall, kids' room":"غرفة المعيشة، المدخل، غرفة الأطفال",
  "Cameras outside":"كاميرات خارجية","Gate, garden, parking":"البوابة، الحديقة، المواقف",
  "Doorbell":"جرس الباب","Video doorbell":"جرس باب بالفيديو","see visitors on your phone":"شاهد الزوار على هاتفك","screen inside the villa":"شاشة داخل الفيلا",
  "Days of recording":"أيام التسجيل",
  "Office size (m²)":"مساحة المكتب (م²)","Roughly, all rooms together":"تقريباً، لكل الغرف معاً",
  "Wired network points":"نقاط شبكة سلكية","Desks, printers, TVs that need a cable":"المكاتب والطابعات والشاشات التي تحتاج كابل",
  "WiFi type":"نوع الواي فاي","faster, newer":"أسرع وأحدث",
  "Add a business router / firewall?":"إضافة راوتر أعمال / جدار حماية؟","VPN, two internet lines":"VPN، خطّا إنترنت","No, keep my ISP router":"لا، سأبقي راوتر مزوّد الخدمة",
  "Add a wall network cabinet?":"إضافة خزانة شبكة جدارية؟","neat and safe":"مرتبة وآمنة",
  "How many barriers?":"كم عدد الحواجز؟","One per entry or exit lane":"حاجز لكل مسار دخول أو خروج",
  "How wide is the lane?":"ما عرض المسار؟","Up to 4 m":"حتى 4 م","standard arm":"ذراع قياسية","Wider than 4 m":"أعرض من 4 م","longer arm, site visit":"ذراع أطول، زيارة للموقع",
  "How will cars get in?":"كيف ستدخل السيارات؟","Choose one or more":"اختر طريقة أو أكثر",
  "Number plate (ANPR)":"لوحة السيارة (ANPR)","camera reads the plate":"الكاميرا تقرأ اللوحة","QR code":"رمز QR","for visitors":"للزوار",
  "UHF tag":"ملصق UHF","sticker on residents' cars":"ملصق على سيارات السكان","Remote control":"جهاز تحكم عن بُعد","for staff / guards":"للموظفين / الحراس",
  "Residents' cars (UHF tags)":"سيارات السكان (ملصقات UHF)","One tag per car":"ملصق واحد لكل سيارة",
  "Open automatically when a car leaves?":"فتح تلقائي عند خروج السيارة؟","Adds an exit loop in the road":"يضيف حلقة خروج في الطريق",
  "exit loop":"حلقة خروج","exit by reader / remote":"الخروج بالقارئ / جهاز التحكم",
  "Every barrier includes a safety loop detector and a photocell, so the arm never closes on a car.":"كل حاجز يشمل كاشف حلقة أمان وحساساً ضوئياً، حتى لا تنغلق الذراع على أي سيارة.",
  /* quote panel */
  "Estimated total":"الإجمالي التقديري","Items in this list":"عدد العناصر في القائمة",
  "Book this on WhatsApp":"احجز عبر واتساب","Send list on WhatsApp":"أرسل القائمة عبر واتساب","Include tools checklist":"تضمين قائمة العدّة",
  "Equipment":"المعدات","Hardware needed":"الأجهزة المطلوبة","Installation by Queen Tech":"التركيب من كوين تك",
  "Tools & consumables":"العدّة والمستهلكات","optional":"اختياري",
  "Lowest price we found online. Tap a shop to buy. Change, remove or add items as needed.":"أقل سعر وجدناه على الإنترنت. اضغط على اسم المتجر للشراء. يمكنك تعديل العناصر أو حذفها أو إضافة غيرها حسب الحاجة.",
  "Quantities and models for this job. Change, remove or add items as needed.":"الكميات والطرازات لهذا العمل. يمكنك تعديل العناصر أو حذفها أو إضافة غيرها حسب الحاجة.",
  "Included":"مشمول","with barrier kit":"مع طقم الحاجز","On request":"عند الطلب",
  "Add an item":"إضافة عنصر","+ Add an item…":"+ إضافة عنصر…","Reset to suggested":"العودة إلى المقترح",
  "Removed:":"المحذوف:","add back":"إرجاع",
  "Models follow the brand you chose. Check compatibility on site before ordering.":"الطرازات حسب العلامة التي اخترتها. تأكد من التوافق في الموقع قبل الطلب.",
  "Wi-Fi cameras record to a memory card or the EZVIZ cloud (not included).":"كاميرات Wi-Fi تسجّل على بطاقة ذاكرة أو على سحابة EZVIZ (غير مشمولة).",
  "Lanes wider than 4 m need a longer arm; we'll confirm the model after a site visit.":"المسارات الأعرض من 4 م تحتاج ذراعاً أطول؛ سنؤكد الطراز بعد زيارة الموقع.",
  /* line notes */
  "Inside":"داخلي","Outside":"خارجي","Added":"مُضاف","Required for fire safety":"مطلوب للسلامة من الحريق",
  "About 20 m per door":"حوالي 20 م لكل باب","About 1 per 120 m²":"حوالي واحدة لكل 120 م²","About 25 m per point":"حوالي 25 م لكل نقطة",
  "Safety + exit loop per barrier":"حلقة أمان + حلقة خروج لكل حاجز","Safety loop per barrier":"حلقة أمان لكل حاجز",
  "About 30 m per loop":"حوالي 30 م لكل حلقة","Safety beam":"حزمة أمان","Data cable to camera / readers":"كابل بيانات للكاميرا / القارئات",
  /* why text */
  "Showing":"نعرض منتجات",
  "cameras and recorder are the best value for your setup right now. One brand for cameras and recorder means smooth setup and one phone app.":"تقدّم أفضل قيمة لكاميرات ومسجّل نظامك حالياً. علامة واحدة للكاميرات والمسجّل تعني إعداداً سلساً وتطبيقاً واحداً على الهاتف.",
  "gives the best value for a wired home system, with a free phone app.":"تقدّم أفضل قيمة لنظام منزلي سلكي، مع تطبيق مجاني على الهاتف.",
  "For Wi-Fi cameras we recommend":"لكاميرات Wi-Fi ننصح بـ","(made by Hikvision): no cabling, easy phone app.":"(من صنع Hikvision): بدون كابلات، وتطبيق سهل على الهاتف.",
  "Fingerprint:":"البصمة:","(includes staff attendance). Face:":"(يشمل حضور وانصراف الموظفين). الوجه:",
  ". Card: a standalone keypad. Video intercom:":". البطاقة: لوحة مفاتيح مستقلة. الإنتركم المرئي:",
  "barrier kit (comes with photocells, warning light and remotes) with a":": طقم حاجز (يأتي مع حساسات ضوئية وضوء تحذير وأجهزة تحكم عن بُعد) مع كاميرا",
  "camera, the best-priced ANPR available in the UAE.":"، وهي الأفضل سعراً بين كاميرات ANPR المتوفرة في الإمارات.",
  "We use":"نستخدم نقاط الوصول والمحوّلات من","access points and switches: reliable, one app for the whole network.":": موثوقة، وتطبيق واحد للشبكة بالكامل.",
  /* how it works */
  "How the price works":"كيف نحسب السعر","Honest numbers, no surprises.":"أرقام واضحة، بلا مفاجآت.",
  "01 · Equipment":"01 · المعدات","Lowest online price":"أقل سعر على الإنترنت",
  "We check UAE online shops and show the lowest price we found for each item, with a link to the shop. Buy it yourself, or ask us to supply it.":"نبحث في المتاجر الإلكترونية في الإمارات ونعرض أقل سعر وجدناه لكل قطعة، مع رابط للمتجر. اشترِها بنفسك أو اطلب منا توريدها.",
  "02 · Installation":"02 · التركيب","Fixed, clear rates":"أسعار ثابتة وواضحة",
  "Per camera, per door or per point, with the current 50% offer applied to all installation. Cabling, mounting, setup and the phone app are included.":"لكل كاميرا أو باب أو نقطة، مع تطبيق عرض الخصم 50% الحالي على جميع أعمال التركيب. يشمل السعر تمديد الكابلات والتثبيت والإعداد وتطبيق الهاتف.",
  "03 · Confirmation":"03 · التأكيد","Free site visit":"زيارة مجانية للموقع",
  "Every building is different. We confirm the final quantities and price after a free visit, before any work starts.":"كل مبنى مختلف. نؤكد الكميات والسعر النهائي بعد زيارة مجانية، قبل بدء أي عمل.",

  /* items (prices.js) */
  "2MP IP dome camera":"كاميرا IP قبّة بدقة 2MP","2MP IP bullet camera":"كاميرا IP أسطوانية بدقة 2MP",
  "4MP IP dome camera":"كاميرا IP قبّة بدقة 4MP","4MP IP bullet camera":"كاميرا IP أسطوانية بدقة 4MP",
  "4MP colour-at-night camera":"كاميرا ملونة ليلاً بدقة 4MP",
  "4-channel PoE recorder (NVR)":"مسجّل PoE بـ 4 قنوات (NVR)","8-channel PoE recorder (NVR)":"مسجّل PoE بـ 8 قنوات (NVR)","16-channel PoE recorder (NVR)":"مسجّل PoE بـ 16 قناة (NVR)",
  "Surveillance hard disk 1TB":"قرص صلب للمراقبة 1TB","Surveillance hard disk 2TB":"قرص صلب للمراقبة 2TB","Surveillance hard disk 4TB":"قرص صلب للمراقبة 4TB","Surveillance hard disk 8TB":"قرص صلب للمراقبة 8TB",
  "Cat6 solid-copper cable, 305 m box":"كابل Cat6 نحاس صلب، كرتونة 305 م",
  "22\" monitor for the recorder":"شاشة 22\" للمسجّل",
  "Card + PIN access reader":"قارئ دخول بالبطاقة + PIN","Fingerprint + card + PIN terminal":"جهاز بصمة + بطاقة + PIN","Face recognition terminal":"جهاز التعرف على الوجه",
  "Magnetic door lock 600 lbs (280 kg)":"قفل باب مغناطيسي 600 lbs (280 كغ)","ZL bracket for magnetic lock":"حامل ZL للقفل المغناطيسي",
  "Door exit push button":"زر خروج للباب","12V 5A power supply with battery backup":"مزوّد طاقة 12V 5A مع بطارية احتياطية",
  "Emergency break glass (fire safety)":"زر كسر الزجاج للطوارئ (السلامة من الحريق)","RFID cards / key fobs, 50 pcs":"بطاقات / ميداليات RFID، 50 قطعة",
  "Wireless door bell (chime + button)":"جرس باب لاسلكي (جرس + زر)","Video intercom kit (door station + indoor screen)":"طقم إنتركم مرئي (وحدة الباب + شاشة داخلية)",
  "Wi-Fi indoor camera (pan/tilt)":"كاميرا Wi-Fi داخلية (دوّارة)","Wi-Fi outdoor camera":"كاميرا Wi-Fi خارجية","Video doorbell with chime":"جرس باب بالفيديو مع جرس داخلي",
  "Automatic boom barrier, 4 m arm":"حاجز بوابة أوتوماتيكي، ذراع 4 م","ANPR number-plate camera":"كاميرا ANPR لقراءة اللوحات",
  "Vehicle loop detector":"كاشف حلقة المركبات","Loop cable, 100 m roll":"كابل الحلقة، لفة 100 م","Photocell safety beam (pair)":"حساس ضوئي للأمان (زوج)",
  "QR code reader for visitors":"قارئ رموز QR للزوار","Access controller for the barrier":"وحدة تحكم بالدخول للحاجز",
  "UHF long-range tag reader (residents' cars)":"قارئ ملصقات UHF بعيد المدى (سيارات السكان)","UHF windshield tag (per car)":"ملصق UHF للزجاج الأمامي (لكل سيارة)",
  "Remote control kit (receiver + 3 remotes)":"طقم تحكم عن بُعد (مستقبِل + 3 أجهزة تحكم)",
  "Ceiling Wi-Fi 5 access point":"نقطة وصول Wi-Fi 5 للسقف","Ceiling Wi-Fi 6 access point":"نقطة وصول Wi-Fi 6 للسقف",
  "10-port switch with 8 PoE ports":"سويتش 10 منافذ منها 8 PoE","16-port PoE switch":"سويتش PoE بـ 16 منفذاً","24-port gigabit switch":"سويتش جيجابت بـ 24 منفذاً",
  "Business router (VPN, multi-WAN)":"راوتر أعمال (VPN، عدة خطوط WAN)","24-port Cat6 patch panel (loaded)":"لوحة توصيل Cat6 بـ 24 منفذاً (مجهزة)",
  "6U wall-mount network cabinet":"خزانة شبكة جدارية 6U","Cat6 keystone jack":"مقبس Keystone Cat6","Network wall faceplate":"واجهة مقبس شبكة جدارية",
  /* labour */
  "Camera installation (cabling, mounting, testing)":"تركيب كاميرا (تمديد كابلات، تثبيت، اختبار)",
  "Recorder setup + phone app + handover":"إعداد المسجّل + تطبيق الهاتف + التسليم",
  "Wi-Fi camera mounting + app setup":"تثبيت كاميرا Wi-Fi + إعداد التطبيق",
  "Access control door installation (reader, lock, button, cabling)":"تركيب نظام الدخول على الباب (قارئ، قفل، زر، كابلات)",
  "Video intercom / doorbell installation":"تركيب الإنتركم المرئي / جرس الباب",
  "Network point (Cat6 cabling + termination)":"نقطة شبكة (تمديد Cat6 + تركيب الأطراف)",
  "Wi-Fi access point installation + setup":"تركيب وإعداد نقطة وصول Wi-Fi",
  "Network cabinet, switch & router setup":"إعداد خزانة الشبكة والسويتش والراوتر",
  "Barrier installation (anchoring, wiring, arm, testing)":"تركيب الحاجز (التثبيت، التوصيلات، الذراع، الاختبار)",
  "Loop cutting in the road + sealing + tuning":"قصّ الحلقة في الطريق + العزل + الضبط",
  "ANPR camera mounting + plate list setup":"تثبيت كاميرا ANPR + إعداد قائمة اللوحات",
  "Reader / controller wiring + programming":"توصيل وبرمجة القارئ / وحدة التحكم",
  /* tools */
  "Hammer drill + masonry bits (6/8/10 mm)":"دريل هيلتي + لقم خرسانة (6/8/10 مم)","Wall plugs, screws & anchors":"فيشر ومسامير وبراغي تثبيت","Ladder":"سلّم",
  "Screwdriver set (flat, Phillips, precision)":"طقم مفكات (مسطح، فيليبس، دقيق)","Multimeter":"ملتيميتر","Wire stripper & side cutter":"مقشرة أسلاك وقطّاعة جانبية",
  "Cable ties, clips & labels":"أربطة كابلات ومشابك وملصقات","Laptop with the device software":"لابتوب عليه برنامج الأجهزة","Safety gear: gloves, goggles":"معدات السلامة: قفازات ونظارات",
  "RJ45 crimping tool + Cat6 connectors":"كبّاسة RJ45 + رؤوس Cat6","Network cable tester":"فاحص كابلات الشبكة","CCTV / IPC tester monitor (PoE)":"شاشة فحص كاميرات CCTV / IPC (PoE)",
  "Fish tape / draw wire":"سلك سحب الكابلات","PVC conduit or trunking + accessories":"مواسير PVC أو ترنكات + ملحقاتها","Outdoor junction boxes for cameras":"علب توصيل خارجية للكاميرات",
  "HDMI cable + mouse for the recorder":"كابل HDMI + ماوس للمسجّل","SADP / ConfigTool to find cameras":"SADP / ConfigTool للعثور على الكاميرات",
  "Wood / metal drill bits for door frames":"لقم خشب / حديد لإطارات الأبواب","Hole saw for exit button box":"منشار ثقوب لعلبة زر الخروج","6-core / 8-core alarm cable":"كابل إنذار 6 / 8 أسلاك",
  "Cable ferrules + crimper":"أطراف أسلاك (فيرول) + كبّاسة","Back boxes for reader and button":"علب خلفية للقارئ والزر","Silicone sealant (outdoor readers)":"سيليكون عازل (للقارئات الخارجية)",
  "Access software (iVMS-4200 / ZKBio / SmartPSS)":"برنامج الدخول (iVMS-4200 / ZKBio / SmartPSS)",
  "Phone with the EZVIZ / Hik-Connect app":"هاتف عليه تطبيق EZVIZ / Hik-Connect","MicroSD cards for Wi-Fi cameras":"بطاقات MicroSD لكاميرات Wi-Fi",
  "Extension cord + power adapters":"توصيلة كهرباء + محولات طاقة","Outdoor silicone sealant":"سيليكون عازل للخارج",
  "Road / concrete cutter with diamond blade (5–6 mm loop slots)":"قطّاعة طرق / خرسانة بشفرة ماسية (شقوق حلقة 5–6 مم)","Loop sealant / epoxy":"مادة عزل الحلقة / إيبوكسي",
  "M12 anchor bolts + chemical anchor":"براغي تثبيت M12 + مثبّت كيميائي","Spirit level + measuring tape":"ميزان ماء + شريط قياس","Armoured power cable (outdoor)":"كابل كهرباء مدرّع (للخارج)",
  "Underground conduit + draw pit":"مواسير أرضية + غرفة سحب","Traffic cones & warning signs":"أقماع مرورية ولوحات تحذير","High-visibility vest":"سترة عاكسة",
  "Punch-down tool":"أداة Punch-down","RJ45 crimper + Cat6 connectors":"كبّاسة RJ45 + رؤوس Cat6","Cable tester / certifier":"فاحص / جهاز اعتماد الكابلات","Label maker":"طابعة ملصقات",
  "Patch cords 0.5 m / 1 m":"كابلات باتش 0.5 م / 1 م","Cable management panel + velcro ties":"لوحة تنظيم كابلات + أربطة فيلكرو","Console cable":"كابل Console","Controller software (Omada)":"برنامج وحدة التحكم (Omada)",
  /* offer label */
  "Limited offer · 50% off all installation":"عرض لفترة محدودة · خصم 50% على جميع أعمال التركيب"
});

/* a pattern only "matches" when it really changes the text, so unchanged text is never rewritten
   (rewriting a node with the same text would wake the page's change watcher again and again) */
function G(re,fn){var t0=RegExp.prototype.test;re.test=function(s){return t0.call(re,s)&&s.replace(re,fn)!==s};return [re,fn]}
QT_AR.rx([
  G(/^where it makes the item\. Where (.+) has no matching product, our recommended brand is shown and marked\.$/, function(m,b){return "حيثما تتوفر. وإذا لم يتوفر لدى "+b+" منتج مناسب، نعرض العلامة التي نوصي بها مع الإشارة إلى ذلك."}),
  G(/^Keeps about (\d+) days$/, function(m,d){return "يحفظ التسجيل حوالي "+cnt(d,U.day)}),
  [/^About (\d+) m per camera$/, "حوالي $1 م لكل كاميرا"],
  G(/^(\d+) (camera|system|door|unit|point|access point|barrier|loop|reader)s? × AED$/, function(m,n,u){return cnt(n,U[u])+" × درهم"}),
  G(/^(\d+) pcs?$/, function(m,n){return cnt(n,U.pc)}),
  G(/^(\d+) items?$/, function(m,n){return cnt(n,U.item)}),
  G(/^(\d+) × (.*[A-Za-z].*)$/, function(m,n,s){return n+" × "+T(s)}),
  G(/^No (.+?) model; (.+) shown$/, function(m,a,b){return "لا يوجد طراز من "+a+"؛ معروض "+T(b)}),
  G(/^Comes with the (.*?)barrier kit$/, function(m,b){return "ضمن طقم حاجز "+b.trim()}),
  G(/^(\S+) dealer( ↗)?$/, function(m,b,a){return "وكيل "+b+(a||"")}),
  G(/^This much recording needs a recorder with (\d+) disk bays; we'll advise on the right model\.$/, function(m,n){return "هذه المدة من التسجيل تحتاج مسجّلاً بعدد "+cnt(n,U.bay)+" للأقراص؛ سننصحك بالطراز المناسب."}),
  [/^Equipment prices are the lowest we found at UAE online shops and dealers on (.+?) \(prices and stock change; delivery may be extra\)\.(?: (\d+) items? (?:are|is) priced on request and not included in the total\.)? Installation by Queen Tech; VAT may apply\. Final price confirmed after a free site visit\.$/,
    function(m,d,p){return "أسعار المعدات هي أقل ما وجدناه في المتاجر الإلكترونية والموزعين في الإمارات بتاريخ "+date(d)+" (الأسعار والتوفر قد يتغيران؛ وقد يُضاف التوصيل)."+(p?" "+(p==="1"?"عنصر واحد سعره":p==="2"?"عنصران سعرهما":cnt(p,U.item)+" أسعارها")+" عند الطلب وغير مشمولة في الإجمالي.":"")+" التركيب من كوين تك؛ وقد تُطبَّق ضريبة القيمة المضافة. يتم تأكيد السعر النهائي بعد زيارة مجانية للموقع."}],
  /* "model · note" lines under each item */
  G(/^(.+) · ([^·]+)$/, function(m,a,b){return T(a)+" · "+T(b)}),
  /* English words inside model / shop names */
  G(new RegExp("^(?=[\\s\\S]*"+FRX.source+")[\\s\\S]+$"), function(m){return frag(m)}),
]);
})();
