/* Queen Tech – barrier board error codes (CAME · BFT · Titan), English + Arabic.
   Taken from the makers' installation manuals (sources listed per board).
   Each fix step: [src, English, Arabic]  src "m" = from the manual, "g" = field tip (general practice).
   Code "c": what the display shows. "x" in a code = any digit/letter (BFT groups, e.g. Er1x = Er10…Er1F).
   "al": other ways technicians type it. Codes are matched case-insensitively; ER/ERR/E prefixes are ignored. */
(function () {
"use strict";

/* ---------- shared steps ---------- */
var OFF = ["m", "Switch off the mains at the isolator and unplug the backup battery before touching the board. A barrier with batteries can still move with the mains off.",
                "افصل الكهرباء من القاطع وافصل بطارية الطوارئ قبل ما تلمس الكارت. البوابة اللي فيها بطارية ممكن تتحرك حتى والكهرباء مفصولة."];
var BAL_CAME = ["m", "Check the spring balance: release the gearmotor and hold the boom at about 45°. Let go: it must stay still. If it rises or falls, adjust the spring until it stays, tighten the lock nut, then lock the release again.",
                     "افحص توازن السوستة: فك الموتور يدوياً (Release) وامسك الذراع عند حوالي 45°. سيبه: لازم يثبت مكانه. لو طلع أو نزل، اضبط السوستة لحد ما يثبت، واربط صامولة التثبيت، وبعدين اقفل الفك اليدوي تاني."];
var BAL_BFT = ["m", "Check the spring balance: engage the manual release and hold the boom at about 45°. Adjust the spring until the boom stays still there (follow the spring figure in your model's manual), then go back to motor operation.",
                    "افحص توازن السوستة: افتح الفك اليدوي وامسك الذراع عند حوالي 45°. اضبط السوستة لحد ما الذراع يثبت مكانه (اتبع رسمة السوستة في دليل الموديل)، وبعدين رجّعه للتشغيل بالموتور."];
var DRAG = ["g", "Move the boom by hand (released) through the whole travel. It must move smoothly: look for a bent boom, a loose boom holder, rubbing skirt or a dry/worn gearbox.",
                 "حرّك الذراع بإيدك (وهو مفكوك) على طول المشوار. لازم يتحرك ناعم: دوّر على ذراع معووج، أو حامل ذراع سايب، أو جيبة (Skirt) بتحك، أو جيربوكس ناشف أو مستهلك."];
var WIND = ["g", "Long booms with skirts, lights or a fork rest add weight and wind load. Make sure the spring and boom length match the manual's table for the accessories fitted.",
                 "الأذرع الطويلة مع الجيبة أو الإضاءة أو الحامل بتزوّد الوزن وضغط الهوا. اتأكد إن السوستة وطول الذراع مطابقين لجدول الدليل حسب الإكسسوارات المركّبة."];
var PHOTO = ["g", "Clean both photocell lenses (dust and sand), check they face each other, and check the receiver LED. Measure 24 V at the transmitter and receiver.",
                  "نضّف عدسات الفوتوسل الاتنين (تراب ورمل)، واتأكد إنهم قصاد بعض، وبص على لمبة الريسيفر. قيس 24 فولت عند الترانسميتر والريسيفر."];
var ONEBYONE = ["g", "To find the faulty device: disconnect the wires from that input one at a time (or bridge it for a short test only) and watch the display.",
                     "عشان تعرف الجهاز اللي فيه العطل: افصل أسلاك المدخل ده واحد واحد (أو اعمل كوبري لاختبار قصير بس) وراقب الشاشة."];
var TEST_SAFE = ["g", "Never leave a safety input bridged after testing. The barrier must not close on a car or a person.",
                      "ما تسيبش مدخل أمان عليه كوبري بعد الاختبار. البوابة لازم ما تنزلش على عربية أو شخص."];

/* ---------- CAME ---------- */
var CAME_SAFETY = [
  ["Switch off the mains and disconnect the backup battery before working on the board.", "افصل الكهرباء وبطارية الطوارئ قبل الشغل على الكارت."],
  ["Release the boom only when it is stopped. If the boom or its mount is damaged, the springs may not hold it and it can swing suddenly.", "ما تفكّش الذراع إلا وهو واقف. لو الذراع أو قاعدته فيهم ضرر، السوستة ممكن ما تمسكهوش ويتحرك فجأة."],
  ["Work on the spring with the boom vertical (spring slack). Never over-tighten parts to make up for a damaged boom.", "اشتغل على السوستة والذراع واقف رأسي (السوستة مرتخية). ما تزوّدش الربط عشان تعوّض ذراع فيه ضرر."],
  ["Keep people and cars away from the boom while you test.", "خلّي الناس والعربيات بعيد عن الذراع وأنت بتختبر."]
];
function C(c, al, t, why, fix) { return { c: c, al: al || [], t: t, why: why, fix: fix }; }

var ZL38 = [
  C("LED fast", ["FAST", "FLASH", "BLINK"], ["Warning LED flashes fast", "لمبة الإشارة بتفلاش بسرعة"],
    ["A normally-closed safety contact is open: 1-2 (stop), 2-C1 or 2-C5 (photocells / safety devices).", "فيه كونتاكت أمان مقفول عادةً (NC) مفتوح: 1-2 (ستوب)، أو 2-C1 أو 2-C5 (فوتوسل / أجهزة أمان)."],
    [OFF, ["m", "Check the stop button on 1-2 and the photocells on 2-C1 / 2-C5.", "افحص زرار الستوب على 1-2 والفوتوسل على 2-C1 / 2-C5."],
     ["m", "Any NC input you don't use must be bridged or disabled on the dip switches.", "أي مدخل NC مش مستخدم لازم يتعمله كوبري أو يتلغي من الـ Dip switch."],
     PHOTO, ["g", "With power off, measure each NC contact with a multimeter: it must read closed (near 0 Ω).", "والكهرباء مفصولة، قيس كل كونتاكت NC بالملتيميتر: لازم يقرا مقفول (قريب من 0 أوم)."], TEST_SAFE]),
  C("LED on", ["ON", "STEADY"], ["Warning LED stays on", "لمبة الإشارة منورة على طول"],
    ["A command button is stuck closed: 2-3, 2-4 or 2-7.", "فيه زرار أمر لازق (مقفول على طول): 2-3 أو 2-4 أو 2-7."],
    [["m", "Check every command device on 2-3, 2-4 and 2-7 (push buttons, key switch, loop detector, access control relay).", "افحص كل أجهزة الأوامر على 2-3 و 2-4 و 2-7 (زراير، مفتاح، لوب ديتكتور، ريلاي الأكسس كنترول)."],
     ONEBYONE, ["g", "A loop detector stuck on 'detect' (damaged loop or wrong sensitivity) is the most common cause.", "أشهر سبب: لوب ديتكتور واقف على Detect (لوب تالف أو حساسية غلط)."]]),
  C("No move", ["NOMOVE", "DEAD", "NOT MOVING"], ["Barrier doesn't open or close", "البوابة مش بتفتح ولا بتقفل"],
    ["From the manual's troubleshooting table.", "من جدول الأعطال في الدليل."],
    [["m", "Check the mains supply and the fuses.", "افحص الكهرباء الداخلة والفيوزات."],
     ["m", "Close the inspection hatch and lock it with the key.", "اقفل باب الصيانة واقفله بالمفتاح."],
     ["m", "Turn off 'maintained action' and master-slave if they are not used.", "اقفل وضع Maintained action و Master-Slave لو مش مستخدمين."],
     BAL_CAME, ["m", "Check the end stops, the slow-down jumper and the direction of movement.", "افحص الـ End stops وجمبر التهدئة (Slow-down) واتجاه الحركة."],
     ["m", "Remote doesn't work: save the remote code again.", "الريموت مش شغال: سجّل كود الريموت تاني."]])
];

var ZL39 = [
  C("Er1", [], ["Travel calibration interrupted by STOP", "معايرة المشوار اتقطعت بسبب الستوب"],
    ["The STOP input (1-2) opened while the board was learning the travel.", "مدخل الستوب (1-2) اتفتح والكارت بيتعلم المشوار."],
    [["g", "Make sure the stop circuit 1-2 is closed (button released, or bridged if not used).", "اتأكد إن دايرة الستوب 1-2 مقفولة (الزرار مش مضغوط، أو عليها كوبري لو مش مستخدمة)."],
     ["g", "Keep the area clear and run the travel calibration again without touching anything.", "فضّي المكان وشغّل معايرة المشوار تاني من غير ما تلمس حاجة."]]),
  C("Er3", [], ["Encoder broken", "الإنكودر عطلان"],
    ["The board gets no signal from the motor encoder.", "الكارت مش واصله إشارة من إنكودر الموتور."],
    [OFF, ["g", "Check the encoder plug on the board and the cable to the motor (look for cuts, water or burnt pins).", "افحص فيشة الإنكودر على الكارت والكابل لحد الموتور (قطع، مية، أو أطراف محروقة)."],
     ["g", "If you have a known-good encoder, swap it to confirm. Then run the travel calibration again.", "لو معاك إنكودر سليم، بدّله عشان تتأكد. وبعدين اعمل معايرة المشوار تاني."]]),
  C("Er4", [], ["Safety devices test failed", "فشل اختبار أجهزة الأمان"],
    ["The board tested the photocells and they didn't answer correctly.", "الكارت اختبر الفوتوسل وماردّش صح."],
    [["m", "Check the photocells' polarity and that they are wired in series as in the manual.", "افحص قطبية الفوتوسل وإنهم متوصلين على التوالي زي الدليل."],
     ["g", "The photocell transmitters must be powered from the board's tested output, otherwise the test always fails.", "الترانسميتر بتاع الفوتوسل لازم يتغذى من مخرج الاختبار في الكارت، وإلا الاختبار هيفشل دايماً."], PHOTO,
     ["g", "If you don't use the test function, turn it off in the menu.", "لو مش مستخدم خاصية الاختبار، اقفلها من القائمة."]]),
  C("Er5", [], ["Not enough working time", "وقت التشغيل مش كفاية"],
    ["The boom didn't reach the end before the working time ran out.", "الذراع ماوصلش للنهاية قبل ما وقت التشغيل يخلص."],
    [BAL_CAME, ["m", "Check the boom length matches the accessories fitted (skirt, lights).", "اتأكد إن طول الذراع مناسب للإكسسوارات المركّبة (جيبة، إضاءة)."], DRAG,
     ["g", "Then increase the working time in the menu a little and test.", "وبعدين زوّد وقت التشغيل من القائمة شوية واختبر."]]),
  C("Er6", [], ["Too many obstacles detected", "اتعدّى الحد الأقصى لاكتشاف العوائق"],
    ["The boom hit (or felt) an obstacle several times in a row.", "الذراع خبط (أو حس) عائق كذا مرة ورا بعض."],
    [["g", "Remove anything in the boom's path, then give an open command to reset.", "شيل أي حاجة في طريق الذراع، وبعدين ادّي أمر فتح عشان يعمل Reset."],
     BAL_CAME, DRAG, ["m", "Adjust the obstacle sensitivity in the menu (less sensitive if it trips by itself in wind).", "اضبط حساسية العوائق من القائمة (قللها لو بيفصل لوحده مع الهوا)."], WIND]),
  C("Er7", [], ["Transformer overheated (GARD 4: also hatch open or boom released)", "الترانس سخن زيادة (في GARD 4: كمان ممكن باب الصيانة مفتوح أو الذراع مفكوك)"],
    ["GARD 8 (G2080EZ) manual: transformer overheating. GARD 4 (G4040EZT) manual: transformer overheating, inspection hatch open, or boom detached from the gearmotor.", "دليل GARD 8 (G2080EZ): الترانس سخن. دليل GARD 4 (G4040EZT): الترانس سخن، أو باب الصيانة مفتوح، أو الذراع مفكوك من الموتور."],
    [["g", "Switch off and let the transformer and motor cool for 20–30 minutes. In UAE summer a closed cabinet in the sun gets very hot.", "افصل الكهرباء وسيب الترانس والموتور يبردوا 20–30 دقيقة. في صيف الإمارات الكابينة المقفولة في الشمس بتسخن جداً."],
     ["m", "Close the inspection hatch and lock it with the key.", "اقفل باب الصيانة واقفله بالمفتاح."],
     ["m", "Make sure the manual release is locked again (boom engaged with the gearmotor).", "اتأكد إن الفك اليدوي مقفول تاني (الذراع متعشّق في الموتور)."],
     BAL_CAME, ["g", "An unbalanced or rubbing boom makes the motor pull more current and overheat. Fix that first.", "الذراع اللي مش متوازن أو بيحك بيخلّي الموتور يسحب تيار أكتر ويسخن. صلّح ده الأول."],
     ["g", "Very heavy traffic: check ventilation, add shade if possible, and space out the cycles.", "لو الحركة كتير جداً: افحص التهوية، اعمل تظليل لو ينفع، وقلل عدد الدورات ورا بعض."],
     ["g", "If Er7 comes back with a cold transformer and the hatch closed, check the hatch microswitch and the thermal contact wiring.", "لو Er7 رجع والترانس بارد وباب الصيانة مقفول، افحص مايكروسويتش الباب وأسلاك الحماية الحرارية."]]),
  C("Er8", [], ["GARD 4: encoder excluded · GARD 8: hatch open", "GARD 4: الإنكودر ملغي · GARD 8: باب الصيانة مفتوح"],
    ["The two manuals give different meanings. G4040EZT (GARD 4): encoder excluded. G2080EZ (GARD 8): inspection hatch open.", "الدليلين بيدّوا معنى مختلف. G4040EZT (جارد 4): الإنكودر ملغي. G2080EZ (جارد 8): باب الصيانة مفتوح."],
    [["m", "GARD 8: close the inspection hatch, lock it, and check its microswitch.", "GARD 8: اقفل باب الصيانة واقفله بالمفتاح وافحص المايكروسويتش بتاعه."],
     ["m", "GARD 4: the encoder is turned off in the settings. Turn the encoder function back on, then run the travel calibration.", "GARD 4: الإنكودر مقفول من الإعدادات. شغّل خاصية الإنكودر تاني، وبعدين اعمل معايرة المشوار."],
     ["g", "Check the model label inside the cabinet to know which meaning applies.", "بص على ليبل الموديل جوه الكابينة عشان تعرف أنهي معنى ينطبق."]]),
  C("C0", [], ["Stop contact 1-2 open", "كونتاكت الستوب 1-2 مفتوح"],
    ["The NC stop circuit is open.", "دايرة الستوب (NC) مفتوحة."],
    [["m", "Check the stop button and its wiring on 1-2, or bridge 1-2 if no stop button is used.", "افحص زرار الستوب وأسلاكه على 1-2، أو اعمل كوبري على 1-2 لو مفيش زرار ستوب."]]),
  C("C1", ["C4", "C5", "C9"], ["Safety contact open (C1 / C4 / C5 / C9)", "كونتاكت أمان مفتوح (C1 / C4 / C5 / C9)"],
    ["A NC safety input is open: photocells or safety edge on that terminal.", "مدخل أمان NC مفتوح: فوتوسل أو سيفتي إيدج على الطرف ده."],
    [PHOTO, ["m", "If nothing is connected to that input, turn the function off in the menu.", "لو مفيش حاجة متوصلة على المدخل ده، اقفل الوظيفة من القائمة."], ONEBYONE, TEST_SAFE]),
  C("LED flash", ["NOT CALIBRATED", "FLASH"], ["Warning LED flashing: not calibrated", "لمبة الإشارة بتفلاش: الكارت مش متعاير"],
    ["The board has not learned the boom travel.", "الكارت لسه ماتعلمش مشوار الذراع."],
    [["m", "Run the travel calibration from the menu (see the manual for your model).", "اعمل معايرة المشوار من القائمة (شوف دليل الموديل)."]])
];

var ZL39B = [
  C("E4", ["ER4"], ["Safety devices test failed", "فشل اختبار أجهزة الأمان"],
    ["The photocell test failed.", "اختبار الفوتوسل فشل."],
    [["g", "Look for something between the photocells.", "دوّر على أي حاجة بين الفوتوسل."], PHOTO,
     ["g", "Check the wiring and that the test function is set for the photocells you have (turn it off if they don't support it).", "افحص التوصيل وإن خاصية الاختبار مظبوطة على نوع الفوتوسل اللي عندك (اقفلها لو مش بيدعمها)."]]),
  C("E6", ["ER6"], ["Too many obstacles detected", "اتعدّى الحد الأقصى لاكتشاف العوائق"],
    ["The boom detected an obstacle too many times in a row.", "الذراع اكتشف عائق كذا مرة ورا بعض."],
    [BAL_CAME, DRAG, ["g", "Adjust the sensitivity, and check wind load on long booms.", "اضبط الحساسية، وخد بالك من ضغط الهوا على الأذرع الطويلة."], WIND]),
  C("E7", ["ER7"], ["Overheating, release open, or thermal contact open", "سخونة، أو الفك اليدوي مفتوح، أو كونتاكت الحماية الحرارية مفتوح"],
    ["Manual: transformer overheating, release mechanism activated, or open contact on the thermal terminal.", "الدليل: سخونة في الترانس، أو الفك اليدوي شغال، أو كونتاكت مفتوح على طرف الحماية الحرارية."],
    [["g", "Let the unit cool for 20–30 minutes.", "سيب الجهاز يبرد 20–30 دقيقة."],
     ["m", "Lock the manual release again.", "اقفل الفك اليدوي تاني."],
     ["g", "Check the wire/link on the thermal terminal is in place and tight.", "اتأكد إن السلك أو الكوبري على طرف الحماية الحرارية موجود ومربوط."], BAL_CAME]),
  C("E8", ["ER8"], ["Both limit switches open", "الليمت سويتش الاتنين مفتوحين"],
    ["The board sees both limit switches open at the same time (on this board E8 is NOT the hatch).", "الكارت شايف الليمت سويتش الاتنين مفتوحين في نفس الوقت (في الكارت ده E8 مش باب الصيانة)."],
    [OFF, ["g", "Check the limit microswitches, their cams and the wiring/plug to the board.", "افحص مايكروسويتشات الليمت والكامات بتاعتها والأسلاك والفيشة للكارت."],
     ["g", "Make sure the boom has not been released and left half way.", "اتأكد إن الذراع مش مفكوك ومتساب في النص."]]),
  C("E15", ["ER15"], ["Remote not compatible", "الريموت مش متوافق"],
    ["The transmitter is not a compatible CAME remote.", "الريموت مش ريموت CAME متوافق."],
    [["g", "Use a CAME remote with the matching coding and save it again.", "استخدم ريموت CAME بنفس نوع الكود وسجّله تاني."]])
];

var GT_CAL = ["m", "Calibrate: set the boom length (A1), run the motor test (A2) and swap the direction with F54 if it moves the wrong way, then start calibration (A3 = ON). The first move after power-up is always an opening.",
                   "اعمل معايرة: اظبط طول الذراع (A1)، واعمل اختبار الموتور (A2) ولو بيتحرك عكس، اعكس الاتجاه من F54، وبعدين شغّل المعايرة (A3 = ON). أول حركة بعد تشغيل الكهربا دايماً فتح."];
var GT = [
  C("E2", [], ["Calibration error", "خطأ في المعايرة"],
    ["The board could not finish learning the boom travel.", "الكارت ماقدرش يكمّل تعلّم مشوار الذراع."],
    [["g", "Clear the area and check nothing stopped the boom during calibration.", "فضّي المكان واتأكد إن مفيش حاجة وقفت الذراع أثناء المعايرة."], BAL_CAME, GT_CAL]),
  C("E3", [], ["Encoder failure", "عطل في الإنكودر"],
    ["No signal or a wrong signal from the encoder.", "مفيش إشارة أو إشارة غلط من الإنكودر."],
    [OFF, ["g", "Check the encoder connector and cable (water, cuts, loose pins).", "افحص فيشة وكابل الإنكودر (مية، قطع، أطراف سايبة)."],
     ["g", "If it stays: replace the encoder or the gearmotor, then calibrate again.", "لو فضل موجود: غيّر الإنكودر أو الموتور، وبعدين اعمل معايرة تاني."], GT_CAL]),
  C("E4", [], ["Safety devices test failed", "فشل اختبار أجهزة الأمان"],
    ["The photocell test (F5) on CX / CY / CZ failed.", "اختبار الفوتوسل (F5) على CX / CY / CZ فشل."],
    [PHOTO, ["m", "Check which inputs are set for testing in F5 and that the photocells are wired for it.", "شوف أنهي مداخل متظبطة للاختبار في F5 وإن الفوتوسل متوصلة بالطريقة دي."], TEST_SAFE]),
  C("E7", [], ["Operating time error", "خطأ في وقت التشغيل"],
    ["The boom took too long to reach the end (on this board E7 is NOT overheating).", "الذراع أخد وقت أطول من اللازم عشان يوصل (في الكارت ده E7 مش سخونة)."],
    [BAL_CAME, DRAG, WIND, GT_CAL]),
  C("E8", [], ["Release hatch open", "باب الفك (Release) مفتوح"],
    ["The release hatch is open or the boom is released.", "باب الفك مفتوح أو الذراع مفكوك."],
    [["m", "Close the hatch, lock the release again and check the hatch microswitch.", "اقفل الباب، واقفل الفك اليدوي تاني، وافحص مايكروسويتش الباب."]]),
  C("E9", [], ["Obstacle while closing", "عائق أثناء القفل"],
    ["The boom detected an obstacle while closing.", "الذراع حس بعائق وهو بيقفل."],
    [["m", "Clear the passage and check the photocells and safety devices.", "فضّي الممر وافحص الفوتوسل وأجهزة الأمان."],
     ["m", "Obstacle sensitivity is F34 (10–100 %, default 100 %).", "حساسية العوائق في F34 (من 10 لـ 100%، الافتراضي 100%)."], BAL_CAME, WIND]),
  C("E10", [], ["Obstacle while opening", "عائق أثناء الفتح"],
    ["The boom detected an obstacle while opening.", "الذراع حس بعائق وهو بيفتح."],
    [["m", "Clear the passage and check the safety devices.", "فضّي الممر وافحص أجهزة الأمان."],
     ["m", "Obstacle sensitivity is F34 (10–100 %, default 100 %).", "حساسية العوائق في F34 (من 10 لـ 100%، الافتراضي 100%)."], BAL_CAME, DRAG]),
  C("E11", [], ["Too many obstacles in a row", "عوائق كتير ورا بعض"],
    ["Maximum number of consecutive obstacles reached.", "وصل للحد الأقصى للعوائق المتتالية."],
    [["m", "Fix the cause as for E9 / E10, then send a command to reset.", "صلّح السبب زي E9 / E10، وبعدين ادّي أمر عشان يعمل Reset."], BAL_CAME, DRAG]),
  C("E12", [], ["No mains supply", "مفيش كهرباء رئيسية"],
    ["Line voltage missing (barrier running on battery or not at all).", "جهد الكهرباء مش موجود (البوابة شغالة على البطارية أو واقفة)."],
    [["m", "Check the mains and the line fuse: 1.6 A fast, or 3.15 A fast on the RGS / RX4 models.", "افحص الكهرباء وفيوز الخط: 1.6 أمبير سريع، أو 3.15 أمبير سريع في موديلات RGS / RX4."],
     ["g", "Check the breaker in the DB and the cable to the barrier.", "افحص القاطع في لوحة الكهرباء والكابل للبوابة."]]),
  C("E14", [], ["Serial communication error", "خطأ في الاتصال (Serial)"],
    ["The board can't talk to the connected card/barrier.", "الكارت مش قادر يتواصل مع الكارت أو البوابة التانية."],
    [["g", "Check the RSE card is in the right port and the cable between paired (opposite) barriers.", "اتأكد إن كارت RSE في المنفذ الصح، وافحص الكابل بين البوابتين المتقابلتين."]]),
  C("E15", [], ["Remote not compatible", "الريموت مش متوافق"],
    ["The transmitter is not compatible.", "الريموت مش متوافق."],
    [["g", "Save a CAME remote with the matching coding.", "سجّل ريموت CAME بنفس نوع الكود."]]),
  C("E16", [], ["Slave barrier hatch open", "باب البوابة التانية (Slave) مفتوح"],
    ["In a master/slave pair, the slave's hatch is open.", "في بوابتين Master/Slave، باب البوابة الـ Slave مفتوح."],
    [["m", "Close and lock the slave barrier's hatch.", "اقفل باب البوابة الـ Slave بالمفتاح."]]),
  C("E24", [], ["BUS device communication error (GT4 / GT8)", "خطأ اتصال مع جهاز BUS (GT4 / GT8)"],
    ["A BUS safety device is not answering.", "جهاز أمان على الـ BUS مش بيرد."],
    [["g", "Check the BUS wiring and power to the BUS photocells/devices.", "افحص أسلاك الـ BUS والكهرباء للفوتوسل أو الأجهزة على الـ BUS."]]),
  C("E25", [], ["BUS address conflict (GT4 / GT8)", "تعارض عناوين BUS (GT4 / GT8)"],
    ["Two BUS devices have the same address.", "جهازين على الـ BUS ليهم نفس العنوان."],
    [["g", "Give each BUS device its own address, then let the board scan the devices again.", "ادّي كل جهاز BUS عنوان مختلف، وبعدين خلّي الكارت يدوّر على الأجهزة تاني."]]),
  C("C0", [], ["Stop contact 1-2 open", "كونتاكت الستوب 1-2 مفتوح"],
    ["The NC stop circuit is open.", "دايرة الستوب (NC) مفتوحة."],
    [["m", "Check the stop button and wiring on 1-2, or bridge it if not used.", "افحص زرار الستوب وأسلاكه على 1-2، أو اعمله كوبري لو مش مستخدم."]]),
  C("i3", ["I3P", "I4", "I7"], ["Command contact held closed (i3 / i3P / i4 / i7)", "كونتاكت أمر مقفول على طول (i3 / i3P / i4 / i7)"],
    ["A NO command contact (2-3, 2-3P, 2-4 or 2-7) is stuck closed.", "كونتاكت أمر NO (2-3 أو 2-3P أو 2-4 أو 2-7) لازق مقفول."],
    [ONEBYONE, ["g", "Usual causes: loop detector stuck, push button jammed, access control relay stuck.", "الأسباب المعتادة: لوب ديتكتور لازق، زرار عالق، ريلاي أكسس كنترول لازق."]]),
  C("A3", ["NOT CALIBRATED"], ["A3 flashing: board not calibrated", "A3 بيفلاش: الكارت مش متعاير"],
    ["The board needs a travel calibration.", "الكارت محتاج معايرة المشوار."], [GT_CAL]),
  C("SEr", ["SER", "SERVICE"], ["Maintenance due", "ميعاد الصيانة"],
    ["The maintenance counter (F58) has been reached.", "عداد الصيانة (F58) وصل للحد."],
    [["m", "Do the service (springs, grease, bolts, safety devices), then clear it with A5.", "اعمل الصيانة (السوست، الشحم، المسامير، أجهزة الأمان)، وبعدين امسحه من A5."],
     ["m", "Spring replacement: GT4 every 1,000,000 cycles or 24 months; GT8 every 500,000 cycles or 24 months (250,000 for long or skirted booms).", "تغيير السوستة: GT4 كل مليون دورة أو 24 شهر؛ GT8 كل 500 ألف دورة أو 24 شهر (250 ألف للأذرع الطويلة أو اللي عليها جيبة)."]])
];
function pick(list, codes) { return list.filter(function (x) { return codes.indexOf(x.c) > -1; }); }
var PT = pick(GT, ["E2", "E3", "E4", "E7", "E8", "E9", "E10", "E11", "E14", "E15", "E16", "C0"]).concat([
  C("E20", [], ["Boom drop-down error (ARM connector)", "خطأ نزول الذراع (فيشة ARM)"],
    ["Fault reported on the ARM connector.", "عطل على فيشة الـ ARM."],
    [OFF, ["g", "Check the ARM connector and cable, then the boom holder and boom.", "افحص فيشة وكابل الـ ARM، وبعدين حامل الذراع والذراع."]]),
  C("E22", [], ["USB device error", "خطأ في جهاز الـ USB"],
    ["The USB stick/device was not read.", "الكارت ماقراش الفلاشة أو جهاز الـ USB."],
    [["g", "Use a FAT32 USB stick and try again.", "استخدم فلاشة FAT32 وجرب تاني."]]),
  C("E23", [], ["Boom drop-down error (MOTOR BLOCK connector)", "خطأ نزول الذراع (فيشة MOTOR BLOCK)"],
    ["Fault reported on the MOTOR BLOCK connector.", "عطل على فيشة الـ MOTOR BLOCK."],
    [OFF, ["g", "Check the MOTOR BLOCK connector and cable.", "افحص فيشة وكابل الـ MOTOR BLOCK."]]),
  C("C1", ["C4", "C5", "C7", "R7", "C9"], ["Safety contact open (C1 / C4 / C5 / C7 / r7 / C9)", "كونتاكت أمان مفتوح (C1 / C4 / C5 / C7 / r7 / C9)"],
    ["A NC safety input is open.", "مدخل أمان NC مفتوح."],
    [PHOTO, ["m", "Turn the function off in the menu if nothing is connected to that input.", "اقفل الوظيفة من القائمة لو مفيش حاجة متوصلة على المدخل."], TEST_SAFE]),
  C("C10", [], ["NO contact closed", "كونتاكت NO مقفول"],
    ["A normally-open input is held closed.", "مدخل مفتوح عادةً (NO) مقفول على طول."], [ONEBYONE])
]);

var PX = [
  C("Calibration error", ["CALIBRATION"], ["Calibration error", "خطأ في المعايرة"],
    ["Obstacle during travel calibration, or the encoder is disconnected or broken.", "عائق أثناء معايرة المشوار، أو الإنكودر مفصول أو عطلان."],
    [["g", "Clear the area and check the encoder cable, then run the calibration again.", "فضّي المكان وافحص كابل الإنكودر، وبعدين اعمل المعايرة تاني."], BAL_CAME]),
  C("Service test failure", ["SERVICE TEST", "TEST"], ["Service test failure", "فشل اختبار أجهزة الأمان"],
    ["Obstacle between the photocells, or photocells wrongly wired, set or faulty.", "عائق بين الفوتوسل، أو الفوتوسل متوصلة أو متظبطة غلط أو عطلانة."], [PHOTO, TEST_SAFE]),
  C("Work time expired", ["WORK TIME", "TIME"], ["Work time expired", "وقت التشغيل خلص"],
    ["The maximum work time was reached before the end.", "وصل لأقصى وقت تشغيل قبل ما يوصل للنهاية."], [BAL_CAME, DRAG]),
  C("Door lock open", ["DOOR", "LOCK", "RELEASE"], ["Door lock open", "قفل الباب مفتوح"],
    ["The operator is released.", "البوابة مفكوكة يدوياً."], [["m", "Lock the release again and close the door.", "اقفل الفك اليدوي تاني واقفل الباب."]]),
  C("Maximum obstacles", ["OBSTACLE", "OBSTACLES"], ["Maximum number of opening / closing obstacles", "اتعدّى الحد الأقصى للعوائق في الفتح / القفل"],
    ["Too many obstacles in a row.", "عوائق كتير ورا بعض."], [BAL_CAME, DRAG, WIND]),
  C("Serial communication error", ["SERIAL", "COMMUNICATION"], ["Serial communication error", "خطأ في الاتصال (Serial)"],
    ["A device is set on the wrong RSE port.", "جهاز متظبط على منفذ RSE غلط."], [["m", "Check which RSE port the device is set to and correct it.", "اتأكد من منفذ RSE المتظبط عليه الجهاز وصلّحه."]]),
  C("Incompatible remote control", ["REMOTE", "INCOMPATIBLE"], ["Incompatible remote control", "ريموت غير متوافق"],
    ["Not a CAME remote, coding mismatch, or TWIN remotes with a different key block.", "ريموت مش CAME، أو نوع كود مختلف، أو ريموت TWIN بـ Key block مختلف."],
    [["g", "Use a CAME remote with the same coding and save it again.", "استخدم ريموت CAME بنفس الكود وسجّله تاني."]])
];

/* ---------- BFT ---------- */
var BFT_SAFETY = [
  ["Switch off the mains (and battery) before any work.", "افصل الكهرباء (والبطارية) قبل أي شغل."],
  ["Unload the spring with the boom vertical before opening the barrier door or removing the spring.", "فك شد السوستة والذراع واقف رأسي قبل ما تفتح باب البوابة أو تشيل السوستة."],
  ["Without a boom, the spring must not be compressed: keep the mechanism in the open position.", "من غير ذراع، السوستة لازم ماتكونش مضغوطة: خلّي الميكانيزم في وضع الفتح."],
  ["Hold a long boom before pulling the manual release if it may be out of balance.", "امسك الذراع الطويل قبل ما تفك يدوي لو ممكن يكون مش متوازن."],
  ["Keep pedestrians out of the boom's swing area.", "خلّي المشاة بعيد عن مجال حركة الذراع."]
];
var LEOMVD = [
  C("STRT", ["START"], ["START input active", "مدخل START شغال"],
    ["The display shows which input is active. If STRT stays on, a start command is stuck.", "الشاشة بتوضح المدخل الشغال. لو STRT فضلت ظاهرة يبقى فيه أمر Start لازق."],
    [["m", "Look for a stuck remote or push button.", "دوّر على ريموت أو زرار لازق."], ONEBYONE]),
  C("STOP", [], ["STOP input active", "مدخل STOP شغال"],
    ["The stop circuit is open.", "دايرة الستوب مفتوحة."], [["g", "Check the stop button and wiring, or bridge STOP if not used.", "افحص زرار الستوب وأسلاكه، أو اعمل كوبري لو مش مستخدم."]]),
  C("PHOT", ["PHOTO"], ["Photocell input active", "مدخل الفوتوسل شغال"],
    ["The photocells see an obstacle (or are dirty / misaligned).", "الفوتوسل شايفة عائق (أو متسخة / مش مظبوطة)."], [["m", "Clean and align the photocells.", "نضّف واظبط الفوتوسل."], PHOTO]),
  C("FLT", ["FAULT"], ["FAULT input active (tested photocells)", "مدخل FAULT شغال (فوتوسل بالاختبار)"],
    ["The photocell test input reports a fault.", "مدخل اختبار الفوتوسل بيقول فيه عطل."], [PHOTO, ["g", "Check the FAULT wire from the photocells with test output.", "افحص سلك الـ FAULT من الفوتوسل اللي فيها خاصية الاختبار."]]),
  C("SWO", [], ["Opening limit switch active", "ليمت سويتش الفتح شغال"],
    ["Normal when the boom is fully open. If shown elsewhere, the switch or cam is wrong.", "طبيعي لما الذراع يكون مفتوح على الآخر. لو ظاهر في مكان تاني يبقى السويتش أو الكامة غلط."],
    [["m", "Set the opening cam so the boom stops about 2° past vertical, with about 1° before the mechanical stop.", "اظبط كامة الفتح بحيث الذراع يقف بعد الرأسي بحوالي 2°، ويفضل حوالي 1° قبل الـ Stop الميكانيكي."]]),
  C("SWC", [], ["Closing limit switch active", "ليمت سويتش القفل شغال"],
    ["Normal when the boom is closed. If shown elsewhere, the switch or cam is wrong.", "طبيعي لما الذراع مقفول. لو ظاهر في مكان تاني يبقى السويتش أو الكامة غلط."],
    [["m", "Set the closing cam so the boom stops a few mm before the rest fork.", "اظبط كامة القفل بحيث الذراع يقف قبل الحامل (Fork) بكام مللي."]]),
  C("OPEN", [], ["OPEN input active", "مدخل OPEN شغال"], ["An open command is present.", "فيه أمر فتح."], [ONEBYONE]),
  C("CLS", ["CLOSE"], ["CLOSE input active", "مدخل CLOSE شغال"], ["A close command is present.", "فيه أمر قفل."], [ONEBYONE]),
  C("BAR", [], ["Safety edge active / obstacle reversal", "السيفتي إيدج شغال / رجوع بسبب عائق"],
    ["The safety edge is pressed, or the boom reversed on an obstacle.", "السيفتي إيدج مضغوط، أو الذراع رجع بسبب عائق."], [["g", "Check the edge and its cable; clear the path.", "افحص الإيدج والكابل بتاعه؛ وفضّي الطريق."], BAL_BFT]),
  C("TIME", [], ["TIMER input active", "مدخل TIMER شغال"], ["The timer input is closed (barrier stays open).", "مدخل التايمر مقفول (البوابة هتفضل مفتوحة)."], [["g", "Check the timer/clock device on that input.", "افحص جهاز التايمر على المدخل ده."]]),
  C("Motor not turning", ["NO MOVE", "NOMOVE", "DEAD"], ["Boom doesn't open and the motor doesn't turn", "الذراع مش بيفتح والموتور مش بيلف"],
    ["From the manual's troubleshooting list.", "من قائمة الأعطال في الدليل."],
    [["m", "Check the photocells and safety edge.", "افحص الفوتوسل والسيفتي إيدج."], ["m", "Check the motor and capacitor wiring.", "افحص توصيل الموتور والمكثف."],
     ["m", "Check the power supply and fuses.", "افحص الكهرباء والفيوزات."], ["m", "If the motor is hot, wait for the thermal cut-out to reset.", "لو الموتور سخن، استنى الحماية الحرارية ترجع."],
     ["m", "Use the input display to look for a stuck start command.", "استخدم شاشة المداخل عشان تدوّر على أمر Start لازق."], ["m", "Lubricate the cam-holder bars.", "شحّم عمدان حامل الكامات."],
     ["m", "If none of this helps, replace the board.", "لو ولا حاجة نفعت، غيّر الكارت."]]),
  C("Motor runs, boom still", ["SLIP", "RELEASE"], ["Motor runs but the boom doesn't move", "الموتور بيلف والذراع مش بيتحرك"],
    ["The manual release is still engaged, or the gearbox is damaged.", "الفك اليدوي لسه مفتوح، أو الجيربوكس فيه ضرر."],
    [["m", "Put the release back to motor operation.", "رجّع الفك اليدوي لوضع التشغيل بالموتور."], ["m", "If it already is, check the gearbox.", "لو هو أصلاً كده، افحص الجيربوكس."]])
];

var CAL_LIBRA = ["m", "End positions: 'Calibration Opening' (default 80) and 'Calibration Closing' (default 25). Raising either value moves that end toward open. Leave about 1° before each mechanical stop and run several full cycles to check.",
                      "نهايات المشوار: 'Calibration Opening' (الافتراضي 80) و 'Calibration Closing' (الافتراضي 25). زيادة أي قيمة بتحرك النهاية دي ناحية الفتح. سيب حوالي 1° قبل كل Stop ميكانيكي واعمل كذا دورة كاملة للتأكد."];
function bftCore(cal) {
  return [
    C("Er01", ["ER01"], ["Photocell test failed", "فشل اختبار الفوتوسل"],
      ["The board tested the photocells and they didn't answer.", "الكارت اختبر الفوتوسل وماردّتش."],
      [["m", "Check the photocell wiring and the photocell-test logic setting.", "افحص توصيل الفوتوسل وإعداد اختبار الفوتوسل في الـ Logic."], ["g", "If your photocells don't support testing, turn the test off.", "لو الفوتوسل عندك مش بتدعم الاختبار، اقفله."], PHOTO]),
    C("Er1x", [], ["Board hardware test failed", "فشل اختبار الهاردوير في الكارت"],
      ["Er10–Er1F: the board's motor-control test failed.", "Er10 لـ Er1F: اختبار التحكم في الموتور فشل."],
      [OFF, ["m", "Check the motor connections.", "افحص توصيلات الموتور."], ["g", "If it stays after a power off/on, the board is most likely faulty.", "لو فضل بعد ما تطفي وتشغّل، الغالب إن الكارت نفسه عطلان."]]),
    C("Er2x", [], ["Encoder error", "خطأ في الإنكودر"],
      ["Motor or encoder wires are swapped or disconnected.", "أسلاك الموتور أو الإنكودر معكوسة أو مفصولة."],
      [OFF, ["m", "Check the motor power wires and the encoder wires/connector.", "افحص أسلاك كهرباء الموتور وأسلاك وفيشة الإنكودر."], cal]),
    C("Er3x", [], ["Reversed on an obstacle", "رجع بسبب عائق"],
      ["The boom met an obstacle (motor torque too high) and reversed.", "الذراع قابل عائق (عزم الموتور زاد) ورجع."],
      [["m", "Check the boom's path.", "افحص طريق الذراع."], BAL_BFT, DRAG, ["g", "Then check the torque and speed settings.", "وبعدين راجع إعدادات العزم والسرعة."]]),
    C("Er4x", [], ["Thermal cut-out", "الحماية الحرارية فصلت"],
      ["The motor got too hot.", "الموتور سخن زيادة."],
      [["m", "Let the motor cool down.", "سيب الموتور يبرد."], BAL_BFT, ["g", "Too many cycles in a row or an unbalanced boom cause this, especially in summer.", "كتر الدورات ورا بعض أو ذراع مش متوازن بيعملوا كده، خصوصاً في الصيف."]])
  ];
}
var LIBRA_G = bftCore(CAL_LIBRA).concat([
  C("Er5x", [], ["Communication fault with a remote device", "عطل اتصال مع جهاز خارجي"],
    ["Problem on the serial link (Scs1), used for opposite barriers.", "مشكلة في خط الاتصال (Scs1) المستخدم للبوابتين المتقابلتين."],
    [["m", "Check the Scs1 serial wiring between the barriers.", "افحص أسلاك Scs1 بين البوابتين."]]),
  C("Er61", [], ["Running on battery", "شغالة على البطارية"],
    ["Mains is missing; the barrier is on battery.", "الكهرباء مقطوعة والبوابة شغالة على البطارية."],
    [["g", "Check the mains supply, breaker and fuses.", "افحص الكهرباء والقاطع والفيوزات."]]),
  C("ErFx", ["ERF"], ["Limit switch error", "خطأ في الليمت سويتش"],
    ["Limit switch fault (on GIOTTO 30-50: both position references active).", "عطل في الليمت سويتش (في GIOTTO 30-50: إشارتين المكان شغالين مع بعض)."],
    [OFF, ["m", "Check the limit switch connections.", "افحص توصيلات الليمت سويتش."], CAL_LIBRA])
]);

var CAL_MV = ["m", "Stroke: Calibration Opening (default 150.0) and Closing (default 050.0), range 0–200. Direction Reversal must be ON for a right-hand barrier and OFF for left-hand, otherwise the limits fail or ER2X appears.",
                   "المشوار: Calibration Opening (الافتراضي 150.0) و Closing (الافتراضي 050.0)، من 0 لـ 200. Direction Reversal لازم ON للبوابة اليمين و OFF للشمال، وإلا الليمتات هتفشل أو هيظهر ER2X."];
var LIBRA_MV = [
  C("ER0x", ["ER01", "ER00"], ["Safety device test failed", "فشل اختبار أجهزة الأمان"],
    ["The photocell / safety test failed.", "اختبار الفوتوسل / الأمان فشل."], [PHOTO, ["g", "Check the test logic setting matches your devices.", "اتأكد إن إعداد الاختبار مناسب لأجهزتك."]]),
  C("ER1x", [], ["Motor-control test failed", "فشل اختبار التحكم في الموتور"],
    ["The board's motor-control test failed.", "اختبار التحكم في الموتور فشل."], [OFF, ["g", "Check the motor wiring; if it stays, the board is likely faulty.", "افحص أسلاك الموتور؛ لو فضل، الغالب الكارت عطلان."]]),
  C("ER2x", [], ["Encoder direction wrong", "اتجاه الإنكودر غلط"],
    ["Motor or encoder wires reversed, or Direction Reversal set wrong.", "أسلاك الموتور أو الإنكودر معكوسة، أو Direction Reversal متظبط غلط."], [CAL_MV]),
  C("ER4x", [], ["Overload", "حِمل زيادة"],
    ["Overload; new movements are blocked while it lasts.", "حمل زيادة؛ الحركة متوقفة لحد ما يروح."], [BAL_BFT, DRAG, ["g", "Let the motor cool.", "سيب الموتور يبرد."]]),
  C("ErFx", ["ERIF", "ERF", "IF"], ["Both position references active", "إشارتين المكان شغالين مع بعض"],
    ["Both reference (limit) microswitches are active. Some manuals print it as ERIF.", "مايكروسويتشات المكان الاتنين شغالين. بعض الأدلة كاتباه ERIF."],
    [OFF, ["m", "Check the reference microswitches using the input display (RIFO / RIFC).", "افحص مايكروسويتشات المكان من شاشة المداخل (RIFO / RIFC)."], CAL_MV])
];

var CAL_MERAK = ["m", "Set speed, slow-down and acceleration first (the closing position depends on speed), then the end positions. 'Open in other direction' must be OFF for left-hand and ON for right-hand barriers, or you get limit faults or an encoder error.",
                      "اظبط السرعة والتهدئة والتسارع الأول (مكان القفل بيعتمد على السرعة)، وبعدين النهايات. 'Open in other direction' لازم OFF للبوابة الشمال و ON لليمين، وإلا هيطلع عطل ليمت أو خطأ إنكودر."];
var MERAK_BM = bftCore(CAL_MERAK).concat([
  C("ER02", [], ["Safety edge test failed", "فشل اختبار السيفتي إيدج"], ["The safety edge test failed.", "اختبار السيفتي إيدج فشل."], [["m", "Check the edge wiring and the logic settings.", "افحص توصيل الإيدج وإعدادات الـ Logic."]]),
  C("ER03", [], ["Opening photocell test failed", "فشل اختبار فوتوسل الفتح"], ["The opening photocell test failed.", "اختبار فوتوسل الفتح فشل."], [["m", "Check wiring and parameter/logic settings.", "افحص التوصيل وإعدادات الـ Parameters / Logic."], PHOTO]),
  C("ER04", [], ["Closing photocell test failed", "فشل اختبار فوتوسل القفل"], ["The closing photocell test failed.", "اختبار فوتوسل القفل فشل."], [["m", "Check wiring and parameter/logic settings.", "افحص التوصيل وإعدادات الـ Parameters / Logic."], PHOTO]),
  C("ER05", [], ["Slave barrier safety edge test failed", "فشل اختبار إيدج البوابة التانية (Slave)"], ["The slave barrier's edge test failed.", "اختبار الإيدج في البوابة الـ Slave فشل."], [["m", "Check wiring and parameter/logic settings.", "افحص التوصيل وإعدادات الـ Parameters / Logic."]]),
  C("ER06", [], ["8K2 safety edge test failed", "فشل اختبار إيدج 8K2"], ["The 8.2 kΩ safety edge test failed.", "اختبار إيدج 8.2 كيلو أوم فشل."], [["m", "Check wiring and parameter/logic settings.", "افحص التوصيل وإعدادات الـ Parameters / Logic."], ["g", "Measure the edge: about 8.2 kΩ when free.", "قيس الإيدج: حوالي 8.2 كيلو أوم وهو مش مضغوط."]]),
  C("ER5x", [], ["Communication error", "خطأ في الاتصال"], ["Problem with serial accessories or expansion boards.", "مشكلة مع إكسسوارات الاتصال أو كروت التوسعة."], [["m", "Check the serial accessories and expansion boards.", "افحص إكسسوارات الاتصال وكروت التوسعة."]]),
  C("ER7x", [], ["Internal supervision error", "خطأ مراقبة داخلي"], ["Internal board error.", "خطأ داخلي في الكارت."], [["m", "Switch off and on again. If it stays, call technical support / replace the board.", "اطفي وشغّل تاني. لو فضل، كلّم الدعم الفني / غيّر الكارت."]]),
  C("ErFx", ["ERF"], ["Limit switch error", "خطأ في الليمت سويتش"], ["Limit switch fault.", "عطل في الليمت سويتش."], [OFF, ["m", "Check the limit switch connections.", "افحص توصيلات الليمت سويتش."], CAL_MERAK]),
  C("STAT", ["HISTORY"], ["STAT menu: last 30 errors", "قائمة STAT: آخر 30 خطأ"],
    ["The board stores the last 30 errors.", "الكارت بيحفظ آخر 30 خطأ."],
    [["m", "Open STAT: entry 01 is the newest. First two digits = position, last two = the error code. Default password 1234.", "افتح STAT: رقم 01 هو الأحدث. أول رقمين = الترتيب، وآخر رقمين = كود الخطأ. الباسورد الافتراضي 1234."]])
]);
var MERAK = MERAK_BM.filter(function (x) { return x.c !== "ER7x"; }).concat([
  C("ER70", ["ER71", "ER74", "ER75"], ["Internal supervision error (ER70 / 71 / 74 / 75)", "خطأ مراقبة داخلي (ER70 / 71 / 74 / 75)"],
    ["Internal board error.", "خطأ داخلي في الكارت."], [["m", "Switch off and on. If it stays, call technical support.", "اطفي وشغّل. لو فضل، كلّم الدعم الفني."]]),
  C("ER72", [], ["Parameter / logic mismatch", "تعارض في الـ Parameters / Logic"],
    ["Parameters and logics are not consistent.", "الـ Parameters والـ Logic مش متوافقين."], [["m", "Press OK to keep running, then check the Parameters and Logics menus.", "اضغط OK عشان يكمّل، وبعدين راجع قوائم Parameters و Logics."]]),
  C("ER73", [], ["D-track parameter error", "خطأ في إعدادات D-track"],
    ["The D-track settings are invalid; the board uses the default.", "إعدادات الـ D-track مش سليمة؛ الكارت هيستخدم الافتراضي."], [["m", "Press OK (the board runs with the default D-track), then run an AUTOSET.", "اضغط OK (الكارت هيشتغل بالـ D-track الافتراضي)، وبعدين اعمل AUTOSET."]]),
  C("ERf3", ["ERF3"], ["SAFE input setting error", "خطأ في إعداد مدخل SAFE"],
    ["The SAFE inputs are set wrong.", "مداخل SAFE متظبطة غلط."], [["m", "With opposite barriers, SAFE2 must be set as the safety edge.", "في البوابتين المتقابلتين، SAFE2 لازم يتظبط كسيفتي إيدج."]]),
  C("RST", ["RESET", "FACTORY"], ["Factory reset (how to)", "ضبط المصنع (الطريقة)"],
    ["Use only if the settings are corrupted. It erases all stored remotes.", "استخدمه بس لو الإعدادات باظت. هيمسح كل الريموتات المتسجلة."],
    [["m", "Switch off, open the STOP input, hold − and OK, switch on. When 'RST' appears, press OK within 3 seconds.", "اطفي الكهرباء، افتح مدخل STOP، اضغط − و OK مع بعض، وشغّل الكهرباء. لما يظهر 'RST' اضغط OK خلال 3 ثواني."],
     ["m", "Then run AUTOSET again and save the remotes again.", "وبعدين اعمل AUTOSET تاني وسجّل الريموتات تاني."]]),
  C("BLOC", [], ["Menu locked", "القائمة مقفولة"],
    ["10 wrong passwords: locked for 3 minutes.", "10 مرات باسورد غلط: مقفولة 3 دقايق."], [["m", "Wait 3 minutes. Default password: 1234.", "استنى 3 دقايق. الباسورد الافتراضي: 1234."]])
]);

/* ---------- Titan (no published codes) ---------- */
var TITAN_GENERIC = [
  C("No display", ["NODISPLAY", "DEAD", "OFF"], ["No display or LEDs", "مفيش شاشة ولا لمبات"],
    ["The board gets no power.", "الكارت مش واصله كهرباء."],
    [["g", "Check 220 V at the terminals, the fuse(s), the transformer / power supply output (24 V DC) and the battery.", "افحص 220 فولت على الأطراف، والفيوزات، وخرج الترانس / الباور سبلاي (24 فولت DC)، والبطارية."]]),
  C("No move", ["NOMOVE", "NOT MOVING"], ["Board is on, but the boom doesn't move", "الكارت شغال بس الذراع مش بيتحرك"],
    ["A safety or command input is wrong, or the motor circuit is open.", "مدخل أمان أو أمر فيه مشكلة، أو دايرة الموتور مفتوحة."],
    [["g", "Check the STOP input (normally closed, may need a bridge).", "افحص مدخل STOP (مقفول عادةً، ممكن يحتاج كوبري)."], ["g", "Look for a stuck open/close command contact.", "دوّر على كونتاكت فتح/قفل لازق."], ["g", "Check the motor connector and measure the motor winding.", "افحص فيشة الموتور وقيس ملفات الموتور."]]),
  C("Won't close", ["REOPEN", "NOT CLOSING"], ["Won't close or opens again by itself", "مش بيقفل أو بيفتح لوحده"],
    ["Usually a photocell, loop detector or anti-smash input.", "غالباً فوتوسل أو لوب ديتكتور أو مدخل منع الخبط."],
    [PHOTO, ["g", "Check the loop detector ('ground sense'): damaged loop or wrong sensitivity keeps it detecting.", "افحص اللوب ديتكتور: لوب تالف أو حساسية غلط بيخلّيه شايف عربية على طول."], ["g", "Anti-smash / obstacle detection may be set too sensitive.", "ممكن حساسية منع الخبط / العوائق تكون عالية زيادة."]]),
  C("Reverses", ["STOPS", "OVERCURRENT"], ["Stops half way or reverses", "بيقف في النص أو بيرجع"],
    ["Over-current protection on DC boards.", "حماية التيار الزيادة في كروت الـ DC."],
    [["g", "Check the spring balance: released at 45°, the boom should stay still.", "افحص توازن السوستة: وهو مفكوك عند 45° لازم يثبت."], DRAG, ["g", "Check the boom length/weight against the spring rating, then learn the travel again.", "قارن طول ووزن الذراع بالسوستة، وبعدين علّم المشوار تاني."]]),
  C("Wrong end", ["OVERSHOOT", "LIMIT"], ["Wrong end positions or overshoot", "نهايات غلط أو بيعدّي النهاية"],
    ["Limit switch or encoder/magnet sensor problem.", "مشكلة في الليمت سويتش أو حساس الإنكودر / المغناطيس."],
    [["g", "Check the limit switches or sensor and their wiring, then learn the limits again.", "افحص الليمت سويتش أو الحساس والأسلاك، وبعدين علّم النهايات تاني."]]),
  C("Remote", ["RF"], ["Remote not working", "الريموت مش شغال"], ["Receiver, antenna or remote battery.", "الريسيفر أو الأنتنا أو بطارية الريموت."],
    [["g", "Check the receiver and antenna, change the remote battery, then pair the remote again.", "افحص الريسيفر والأنتنا، غيّر بطارية الريموت، وبعدين اعمل Pair للريموت تاني."]]),
  C("Intermittent", ["RANDOM"], ["Random faults", "أعطال بتيجي وتروح"], ["Low voltage under load, water, insects or corroded terminals.", "جهد واطي مع الحمل، أو مية، أو حشرات، أو أطراف مصدّية."],
    [["g", "Measure the voltage while the motor runs. Check the battery. Look for water, insects and rust on terminals.", "قيس الجهد والموتور شغال. افحص البطارية. دوّر على مية وحشرات وصدأ على الأطراف."]])
];

window.QT_BOARDS = [
  { id: "came", name: "CAME", sub: ["Italy · GARD series", "إيطاليا · سلسلة GARD"], safety: CAME_SAFETY, boards: [
    { id: "zl392", name: "ZL392 / ZL392B / ZL392C", models: "GARD GT4 · GARD GT8 · GARD LS (LS4 / LS6)", display: ["E2 … E25 on the display", "E2 … E25 على الشاشة"], codes: GT,
      note: ["E24 / E25 are only on GT4 / GT8. On this board E7 = operating time and E8 = release hatch.", "E24 / E25 في GT4 / GT8 بس. في الكارت ده E7 = وقت التشغيل و E8 = باب الفك."],
      manual: [["GARD GT4 manual (FA01749)", "https://krisdeir-alpha-automation-odoo.odoo.com/manuals/GARD-GT4.pdf"], ["GARD GT8 manual (FA02149)", "https://came.com.ua/wp-content/uploads/2024/09/instruktsiia-z-montazhu-shlahbaumu-gard-gt8-en.pdf"], ["GARD LS manual (FA02058)", "https://www.manualslib.com/manual/3765290/Came-Gls60ags.html?page=46"]],
      videos: [["CAME GT4 ZL392 board: wiring & terminals", "nNQP25UE8XE"], ["Installing the CAME GARD GT4", "LQ1sTrRVQlY"], ["Configure GARD LS4 / LS6 (CAME)", "szqigiSgDHQ"]] },
    { id: "zl39", name: "ZL39", models: "GARD 4 (G4040EZT) · GARD 8 (G2080EZ)", display: ["Er1 … Er8 on a 2-digit display", "Er1 … Er8 على شاشة رقمين"], codes: ZL39,
      note: ["Er7 and Er8 mean different things on GARD 4 and GARD 8. Check the model label.", "Er7 و Er8 معناهم مختلف بين GARD 4 و GARD 8. بص على ليبل الموديل."],
      manual: [["G4040EZT manual – error table", "https://www.manualslib.com/manual/2186719/Came-G4040ezt.html?page=60"], ["GARD 8 G2080EZ manual", "https://doorentrydirect.com/media/product_attach_files/CAME_GARD8.pdf"]],
      videos: [["Automatic boom barrier GARD 8 (CAME)", "qIaEwlI_BLg"], ["CAME barrier troubleshooting", "8vm0lvqx4wY"]] },
    { id: "zl39b", name: "ZL39B", models: "GARD G6000 / G6001 / G6010 · G3250 · G3750", display: ["E4 · E6 · E7 · E8 · E15", "E4 · E6 · E7 · E8 · E15"], codes: ZL39B,
      note: ["On this board E8 = both limit switches open (not the hatch).", "في الكارت ده E8 = الليمت سويتش الاتنين مفتوحين (مش باب الصيانة)."],
      manual: [["G6000 manual – error table", "https://www.manualslib.com/manual/3401690/Came-G6000.html?page=31"], ["G3250 manual – error table", "https://www.manualslib.com/manual/3104717/Came-G3250.html?page=32"]],
      videos: [["CAME G3250 / G3750 barrier", "niJNNm9iqcE"]] },
    { id: "zl371", name: "ZL371", models: "CAME barriers with the ZL371 board (check the board label)", display: ["E4 · E6 · E8 · E15", "E4 · E6 · E8 · E15"], codes: pick(ZL39B, ["E4", "E6", "E8", "E15"]),
      manual: [["ZL371 manual – error table", "https://www.manualslib.com/manual/3424543/Came-Zl371.html?page=27"]], videos: [] },
    { id: "gardpt", name: "GARD PT board", models: "GARD PT (GPT40AGS / GPT40RGS)", display: ["E2 … E23 and C codes", "E2 … E23 وأكواد C"], codes: PT,
      manual: [["GARD PT manual – error table", "https://www.manualslib.com/manual/1852920/Came-Gard-Pt-Series.html?page=30"]],
      videos: [["Springs & setup: CAME GARD PT", "HGOzhhnFBgw"]] },
    { id: "zlb30", name: "ZLB30", models: "GARD PX (GPX40…)", display: ["Text messages on a graphic display", "رسايل مكتوبة على شاشة جرافيك"], codes: PX, text: true,
      manual: [["GARD PX manual – error messages", "https://www.manualslib.com/manual/3770305/Came-Gard-Px.html?page=35"]],
      videos: [["GARD PX brushless barrier (CAME)", "puCPmrnUixY"]] },
    { id: "zl38", name: "ZL38", models: "GARD G4000 / G4001 · G6000 / G6001 (older 230 V)", display: ["No display: LED only", "مفيش شاشة: لمبات بس"], codes: ZL38, text: true,
      manual: [["G4000 / G4001 manual", "https://www.manualslib.com/manual/2739109/Came-Gard-G4001.html"], ["GARD 4 manual (ZL38)", "https://ismartgate.com/manuals/CAME_Gard4_manual.pdf"]],
      videos: [["CAME G4000 barrier installation", "x02DIg9hnJ4"]] }
  ]},
  { id: "bft", name: "BFT", sub: ["Italy · MOOVI · GIOTTO · MICHELANGELO", "إيطاليا · MOOVI · GIOTTO · MICHELANGELO"], safety: BFT_SAFETY, boards: [
    { id: "merak", name: "MERAK (BG)", models: "GIOTTO BT A ULTRA 36 / 36 XL · GIOTTO BT B ULTRA 36 · GIOTTO BT A 30/60S U", display: ["ER01 … ER7x, ERFx", "ER01 … ER7x، ERFx"], codes: MERAK,
      note: ["x = any digit, for example ER31 or ER3A both mean 'ER3x'.", "x = أي رقم، مثلاً ER31 أو ER3A الاتنين معناهم 'ER3x'."],
      manual: [["GIOTTO ULTRA 36 manual (D814017)", "https://bftgateopeners.com/store/media/pdfs/BFT-Giotto-Ultra-36-Automatic-Barrier-Opener_Installation-Manual.pdf"], ["GIOTTO BT A 30/60S U manual", "https://www.manualslib.com/manual/2401564/Bft-Giotto-Bt-A-30-60s-U.html?page=40"]],
      videos: [["Programming BFT Giotto BT A 60S U", "JRp9LnCypw4"], ["GIOTTO BT A30 / A60 S U", "RxEaWLLbRKI"], ["Giotto BT A 30 U with loop & photocell", "3Kb2Qnwn_TA"]] },
    { id: "merakbm", name: "MERAK BM6 / BM8", models: "MICHELANGELO BT A 60 / 80", display: ["ER01 … ER7x, ERFx", "ER01 … ER7x، ERFx"], codes: MERAK_BM,
      manual: [["MICHELANGELO BT A manual (D812218)", "https://bftgateopeners.com/store/media/pdfs/michelangelo_manual.pdf"]],
      videos: [["Michelangelo 80 installation (BFT)", "rTdoutMutt4"], ["BFT Michelangelo barrier operator", "7j4wPbLAAqo"]] },
    { id: "libracg", name: "LIBRA-C-G / GS · LIBRA C MO", models: "GIOTTO 30-60 BT / S BT · GIOTTO 30-50 BT · MOOVI BT 30-50", display: ["Er01 … ErFx", "Er01 … ErFx"], codes: LIBRA_G,
      note: ["The display can also show a torque reading like 35.40 (set limit . measured).", "الشاشة ممكن كمان تعرض قراءة عزم زي 35.40 (الحد المظبوط . المقاس)."],
      manual: [["GIOTTO 30-60 S BT manual (D811999)", "https://bftgateopeners.com/store/media/pdfs/bft-giotto-30-60-s-bt-manual.pdf"], ["MOOVI BT manual (D811701)", "https://bftgateopeners.com/store/media/pdfs/bft-moovi-bt-manual.pdf"]],
      videos: [["BFT Giotto 30 BT / 60 S BT installation", "EbUbcQkWEKA"], ["BFT Giotto 50 BT", "DBmYlfLcEZA"]] },
    { id: "libracmv", name: "LIBRA C MV", models: "MICHELANGELO 60 / 80 (older 230 V)", display: ["ER0X … ER4X, ErFx", "ER0X … ER4X، ErFx"], codes: LIBRA_MV,
      manual: [["MICHELANGELO manual (D811528)", "https://mhz.pt/wp-content/uploads/2014/11/MANUAL-BARREIRA-BFT-MICHELANGELO.pdf"]],
      videos: [["BFT Michelangelo barrier operator", "7j4wPbLAAqo"]] },
    { id: "leomvd", name: "LEO MV D", models: "MOOVI 30S · 30RMM · 50RMM (230 V)", display: ["Input status (STRT, PHOT, SWO…)", "حالة المداخل (STRT، PHOT، SWO…)"], codes: LEOMVD,
      note: ["This board has no error numbers: the display shows which input is active.", "الكارت ده مفهوش أرقام أخطاء: الشاشة بتوضح المدخل الشغال."],
      manual: [["MOOVI manual (D811480)", "https://www.intelligentsecurity.org/resources/gates/BFT-Moovi-Manual_Watermark.pdf"], ["LEO MV D board manual", "https://www.manualslib.com/manual/1375043/Bft-Leo-Mv-D.html"]],
      videos: [["BFT MOOVI 30 & 60 tutorial", "ryqbwWsgcd4"], ["BFT MOOVI 60 installed in Dubai", "aIVl8_U9Gt0"]] }
  ]},
  { id: "titan", name: "Titan", sub: ["TitanHz barriers", "بوابات TitanHz"], safety: [
      ["Switch off 220 V and unplug the battery: DC boards stay live from the battery.", "افصل 220 فولت وافصل البطارية: كروت الـ DC بتفضل شغالة من البطارية."],
      ["Put the boom in its spring-neutral position (usually vertical) before removing or changing it.", "حط الذراع في وضع السوستة المرتخية (غالباً رأسي) قبل ما تشيله أو تغيّره."],
      ["After any change to boom, spring or limits, check the balance and learn the travel again.", "بعد أي تغيير في الذراع أو السوستة أو الليمتات، افحص التوازن وعلّم المشوار تاني."]], boards: [
    { id: "titan", name: "Titan barrier board", models: "RFJ13-PLUS · RFJ10 · MQC-800 · MQC-801", display: ["4-digit LED display", "شاشة LED أربع أرقام"], codes: TITAN_GENERIC, text: true, pending: true,
      note: ["Titan has not published its error-code list. Pick what you see below, or send us a photo of the display and the board on WhatsApp and we'll tell you the fix.", "تيتان مانشرتش قائمة أكواد الأخطاء. اختار اللي شايفه تحت، أو ابعتلنا صورة الشاشة والكارت على واتساب وهنقولك الحل."],
      manual: [["TitanHz barrier products", "https://www.titanhz.com/titanhz-intelligent-high-speed-barrier-gate.aspx"]], videos: [] }
  ]}
];
})();
