#!/usr/bin/env python3
"""Builds the service & area landing pages (English + Arabic) for queentechsolution.info."""
import json, html, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from content import PAGES, NAMES, DUBAI_AREAS, AD_AREAS

ROOT = sys.argv[1] if len(sys.argv) > 1 else os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
SITE = "https://queentechsolution.info"
D = json.load(open(os.path.join(os.path.dirname(__file__), "prices.json")))
P, AR = D["P"], D["AR"]
e = lambda s: html.escape(s, quote=True)

WA_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.3Z"/></svg>'
TEL_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>'
CROWN = '<svg class="crown" viewBox="0 0 36 36" aria-hidden="true"><rect x=".5" y=".5" width="35" height="35" rx="5" fill="none" stroke="var(--gold)"/><path d="M8 23.5 L9.6 12.5 L14.4 17.6 L18 10 L21.6 17.6 L26.4 12.5 L28 23.5 Z" fill="var(--gold)"/><rect x="8" y="25.2" width="20" height="2.4" rx="1" fill="var(--gold)"/></svg>'

UI = {
 "en": {"home": "Home", "services": "Services", "prices": "Prices", "tools": "Free tools", "visit": "Free site visit",
        "brand_small": "Solutions · Dubai · Abu Dhabi", "wa_btn": "WhatsApp us", "call": "Call", "arrow": "→", "t_what": "Included", "t_who": "Who it's for", "t_area": "Areas", "t_price": "Pricing",
        "how": "How it works", "t_how": "Process", "faq": "Questions", "faq_h": "Common questions.", "related": "Related", "related_h": "You may also need.",
        "cta_tag": "Free site visit", "cta_h": "Tell us what you need.", "cta_p": "Message us on WhatsApp with a short description and a photo or two. We reply the same day with next steps, and confirm the price in writing before any work starts.",
        "book": "Book a free site visit", "addr": "Dubai and Abu Dhabi · +971 55 797 1520 · noah@queentechsolution.info · Open every day 10am–10pm",
        "from": "From", "install": "Installation", "per": {"camera": "per camera", "system": "per system", "door": "per door", "unit": "per unit", "point": "per point", "access point": "per access point", "barrier": "per barrier", "loop": "per loop", "reader": "per reader"},
        "equip": "Equipment", "fine": "Equipment prices are the lowest we found at UAE shops on {d}. Final price confirmed after a free site visit.",
        "offer": "Limited offer: 50% off all installation until 1 December 2026.", "see_prices": "See all prices", "planner": "Plan your cameras",
        "planner_rel": ("Camera planner", "Cameras, recorder, storage and price for your property in one minute."),
        "price_rel": ("Instant price check", "Compare brands and see installation prices."),
        "foot_svc": "Services", "rights": "© 2026 Queen Tech Solutions", "lang_name": "العربية", "lang_code": "ar",
        "skip_areas": "", "dubai": "Dubai", "abudhabi": "Abu Dhabi", "office_note": "No office visit needed: we come to you anywhere in Dubai and Abu Dhabi."},
 "ar": {"home": "الرئيسية", "services": "الخدمات", "prices": "الأسعار", "tools": "أدوات مجانية", "visit": "زيارة مجانية للموقع",
        "brand_small": "حلول تقنية · دبي · أبوظبي", "wa_btn": "راسلنا على واتساب", "call": "اتصل", "arrow": "←", "t_what": "يشمل", "t_who": "لمن", "t_area": "المناطق", "t_price": "التسعير",
        "how": "كيف نعمل", "t_how": "الخطوات", "faq": "أسئلة", "faq_h": "أسئلة شائعة.", "related": "ذات صلة", "related_h": "قد تحتاج أيضاً.",
        "cta_tag": "زيارة مجانية للموقع", "cta_h": "أخبرنا بما تحتاجه.", "cta_p": "راسلنا على واتساب بوصف قصير وصورة أو صورتين. نرد في نفس اليوم بالخطوات التالية، ونؤكد السعر كتابياً قبل بدء أي عمل.",
        "book": "احجز زيارة مجانية", "addr": "دبي وأبوظبي · ‎+971 55 797 1520 · noah@queentechsolution.info · مفتوحين يومياً من 10 صباحاً لـ 10 مساءً",
        "from": "ابتداءً من", "install": "التركيب", "per": {"camera": "لكل كاميرا", "system": "لكل نظام", "door": "لكل باب", "unit": "لكل وحدة", "point": "لكل نقطة", "access point": "لكل نقطة وصول", "barrier": "لكل بوابة", "loop": "لكل حساس", "reader": "لكل قارئ"},
        "equip": "الأجهزة", "fine": "أسعار الأجهزة هي أقل ما وجدناه في متاجر الإمارات بتاريخ {d}. يتم تأكيد السعر النهائي بعد زيارة مجانية للموقع.",
        "offer": "عرض لفترة محدودة: خصم 50% على كل أعمال التركيب حتى 1 ديسمبر 2026.", "see_prices": "كل الأسعار", "planner": "خطّط كاميراتك",
        "planner_rel": ("مخطط الكاميرات", "الكاميرات وجهاز التسجيل والتخزين والسعر لعقارك في دقيقة."),
        "price_rel": ("فحص السعر الفوري", "قارن الماركات واطّلع على أسعار التركيب."),
        "foot_svc": "الخدمات", "rights": "© 2026 كوين تك للحلول التقنية", "lang_name": "English", "lang_code": "en",
        "dubai": "دبي", "abudhabi": "أبوظبي", "office_note": "لا داعي لزيارة مكتب: نأتي إليك في أي مكان في دبي وأبوظبي."},
}

def money(v, lang):
    s = f"{v:,.2f}".rstrip("0").rstrip(".")
    return f"AED {s}" if lang == "en" else f"{s} درهم"

def price_chip(kind, key, lang):
    u = UI[lang]
    if kind == "lab":
        L = P["labour"][key]
        name = L["name"] if lang == "en" else AR.get(L["name"], L["name"])
        per = u["per"].get(L["per"], L["per"])
        was = f'<s>{e(money(L["was"], lang))}</s>' if L.get("was") and L["was"] > L["price"] else ""
        return (f'<div class="pchip" data-p="lab:{key}"><span class="k">{e(u["install"])}</span>'
                f'<span class="v"><span data-v>{e(money(L["price"], lang))}</span>{was}</span>'
                f'<small>{e(name)} · {e(per)}</small></div>')
    keys = key.split(",")
    best, label = None, None
    for k in keys:
        it = P["items"][k]
        for b, x in it["v"].items():
            if x.get("price") is not None and (best is None or x["price"] < best):
                best, label = x["price"], it["label"]
    if label is None:
        label = P["items"][keys[0]]["label"]
    name = label if lang == "en" else AR.get(label, label)
    val = f'{u["from"]} {money(best, lang)}' if best is not None else ("On request" if lang == "en" else "عند الطلب")
    return (f'<div class="pchip" data-p="from:{key}"><span class="k">{e(u["equip"])}</span>'
            f'<span class="v"><span data-v>{e(val)}</span></span><small>{e(name)}</small></div>')

def areas_for(pg, lang):
    i = 0 if lang == "en" else 1
    if pg["city"] == "dubai": groups = [("dubai", DUBAI_AREAS)]
    elif pg["city"] == "abudhabi": groups = [("abudhabi", AD_AREAS)]
    else: groups = [("dubai", DUBAI_AREAS[:9]), ("abudhabi", AD_AREAS)]
    out = []
    for g, lst in groups:
        chips = "".join(f'<span class="chip">{e(a[i])}</span>' for a in lst)
        head = f'<div class="lbl" style="margin:14px 0 10px">{e(UI[lang][g])}</div>' if len(groups) > 1 else ""
        out.append(head + f'<div class="chips">{chips}</div>')
    return "".join(out)

def url(slug, lang):
    return f"/{slug}.html" if lang == "en" else f"/ar/{slug}.html"

# Real job photos (files in /work, page /work.html). A page lists the keys it shows in pg["work"].
WORK = {
    "wall": ("Control-room video wall", "شاشات غرفة التحكم"),
    "rack-sr6": ("Network room · recorders + UPS", "غرفة شبكة · أجهزة تسجيل وUPS"),
    "rack-honeywell": ("Honeywell recorders", "أجهزة تسجيل Honeywell"),
    "rack-gr6": ("Three recorders, labelled", "ثلاث أجهزة تسجيل مرقّمة"),
    "barrier-came": ("CAME barrier: spring and arm service", "بوابة CAME: صيانة الياي والذراع"),
    "barrier-tech": ("Barrier service on site", "صيانة البوابة في الموقع"),
}
WORK_UI = {"en": ("Our work", "Real jobs, real photos.", "From our maintenance work at a residential community on Saadiyat Island, Abu Dhabi.", "See all photos →"),
           "ar": ("شغلنا", "مشاريع حقيقية، صور حقيقية.", "من شغل الصيانة في مجمّع سكني بجزيرة السعديات، أبوظبي.", "شوف كل الصور ←")}


def work_sec(pg, lang):
    keys = pg.get("work") or []
    if not keys:
        return ""
    t, h, p, more = WORK_UI[lang]
    q = "" if lang == "en" else "?lang=ar"
    items = "".join(f'<a href="/work.html{q}"><img src="/work/{k}-s.webp" alt="{e(WORK[k][0 if lang == "en" else 1])}" loading="lazy" decoding="async" width="560" height="420"><span>{e(WORK[k][0 if lang == "en" else 1])}</span></a>' for k in keys)
    return (f'  <section class="sec" id="work">\n    <div class="sec-head"><span class="tag">{e(t)}</span><h2>{e(h)}</h2><p>{e(p)}</p></div>\n'
            f'    <div class="work-strip">{items}</div>\n    <p class="fine"><a href="/work.html{q}">{e(more)}</a></p>\n  </section>\n\n')


def build(pg, lang):
    c, u, slug = pg[lang], UI[lang], pg["slug"]
    other = "ar" if lang == "en" else "en"
    canon = SITE + url(slug, lang)
    pre = "" if lang == "en" else "/ar"
    wa = "https://wa.me/971557971520?text=" + __import__("urllib.parse").parse.quote(c["wa"])
    fonts = ("family=Big+Shoulders+Display:wght@600;800;900&family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500"
             if lang == "en" else
             "family=Big+Shoulders+Display:wght@900&family=Noto+Kufi+Arabic:wght@500;700;800;900&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500")
    area_served = {"dubai": [{"@type": "City", "name": "Dubai"}], "abudhabi": [{"@type": "City", "name": "Abu Dhabi"}],
                   "both": [{"@type": "City", "name": "Dubai"}, {"@type": "City", "name": "Abu Dhabi"}]}[pg["city"]]
    biz = {"@type": "LocalBusiness", "@id": SITE + "/#business", "name": "Queen Tech Solutions", "url": SITE + "/",
           "telephone": "+971557971520", "email": "noah@queentechsolution.info", "image": SITE + "/og-image.png",
           "address": {"@type": "PostalAddress", "addressLocality": "Dubai", "addressRegion": "Dubai", "addressCountry": "AE"},
           "openingHoursSpecification": [{"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "10:00", "closes": "22:00"}]}
    graph = [
        {"@type": "Service", "name": c["crumb"], "serviceType": c["crumb"], "description": c["desc"], "url": canon,
         "areaServed": area_served, "provider": biz, "inLanguage": lang},
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": u["home"], "item": SITE + (pre + "/" if lang == "ar" else "/")},
            {"@type": "ListItem", "position": 2, "name": u["services"], "item": SITE + pre + "/services.html"},
            {"@type": "ListItem", "position": 3, "name": c["crumb"], "item": canon}]},
        {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in c["faq"]]},
    ]
    schema = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False).replace("</", "<\\/")

    what = "".join(f'<div class="card"><h3>{e(h)}</h3><p>{e(p)}</p></div>' for h, p in c["what"])
    who = "".join(f'<div class="card"><h3>{e(h)}</h3><p>{e(p)}</p></div>' for h, p in c["who"])
    facts = "".join(f"<li>{e(f)}</li>" for f in c["facts"])
    steps = "".join(f"<li><b>{e(h)}</b><span>{e(p)}</span></li>" for h, p in c["steps"])
    faq = "".join(f"<details><summary>{e(q)}</summary><p>{e(a)}</p></details>" for q, a in c["faq"])

    if pg["prices"]:
        chips = "".join(price_chip(k, v, lang) for k, v in pg["prices"])
        pbtn = (f'<div class="cta-row"><a class="btn btn-gold" href="/price.html{"#cctv" if pg["kind"]=="cctv" else ""}">{e(u["see_prices"])} {u["arrow"]}</a>'
                + (f'<a class="btn btn-line" href="/planner.html">{e(u["planner"])}</a>' if pg["kind"] == "cctv" else "") + "</div>")
        price_sec = (f'<section class="sec" id="prices"><div class="sec-head"><span class="tag">{e(u["t_price"])}</span>'
                     f'<h2>{e(c["price_h"])}</h2><p>{e(c["price_p"])}</p><p data-offer-only style="color:var(--gold-2)">{e(u["offer"])}</p></div>'
                     f'<div class="prices">{chips}</div><p class="fine">{e(u["fine"].format(d=P["checked"]))}</p>{pbtn}</section>')
    else:
        cards = "".join(f'<div class="card"><h3>{e(h)}</h3><p>{e(p)}</p></div>' for h, p in c["price_cards"])
        price_sec = f'<section class="sec" id="prices"><div class="sec-head"><span class="tag">{e(u["t_price"])}</span><h2>{e(c["price_h"])}</h2></div><div class="grid">{cards}</div></section>'

    rel = []
    if pg["kind"] == "cctv":
        rel.append(("/planner.html", *u["planner_rel"]))
    if pg["prices"]:
        rel.append(("/price.html", *u["price_rel"]))
    for href, en_t, en_d, ar_t, ar_d in pg.get("extra_rel", []):
        rel.append((href, en_t if lang == "en" else ar_t, en_d if lang == "en" else ar_d))
    for s in pg["related"]:
        n = NAMES[s]
        rel.append((url(s, lang), n[0] if lang == "en" else n[2], n[1] if lang == "en" else n[3]))
    rel_html = "".join(f'<a class="rel" href="{h}"><b>{e(t)}</b><span>{e(d)}</span></a>' for h, t, d in rel[:6])

    foot_links = "".join(f'<a href="{url(s, lang)}">{e(n[0] if lang=="en" else n[2])}</a>' for s, n in NAMES.items())
    foot_links += f'<a href="/planner.html">{e(u["planner_rel"][0])}</a><a href="/rescue.html">{"Game error rescue" if lang=="en" else "إنقاذ أخطاء الألعاب"}</a>'

    h1 = f'{e(c["h1"])} <em>{e(c["h1em"])}</em>'
    alt_en, alt_ar = SITE + url(slug, "en"), SITE + url(slug, "ar")
    dir_attr = ' dir="rtl"' if lang == "ar" else ""
    home = "/" if lang == "en" else "/ar/"
    svcs = "/services.html" if lang == "en" else "/ar/services.html"
    contact = "/contact.html" if lang == "en" else "/ar/contact.html"
    tools = "/tools.html" if lang == "en" else "/ar/tools.html"

    return f'''<!doctype html>
<html lang="{lang}"{dir_attr} data-i18n-static>
<head>
<meta charset="utf-8">
<style id="qt-cursor">@media (pointer:fine){{html,body{{cursor:url(/cursor.png) 9 8,auto;cursor:-webkit-image-set(url(/cursor.png) 1x,url(/cursor@2x.png) 2x) 9 8,auto;cursor:image-set(url(/cursor.png) 1x,url(/cursor@2x.png) 2x) 9 8,auto}}:is(a[href],button,[role=button],summary,label[for],select,.btn,input[type=checkbox],input[type=radio],input[type=submit],input[type=button]):not(:disabled){{cursor:url(/cursor-link.png) 9 8,pointer!important;cursor:-webkit-image-set(url(/cursor-link.png) 1x,url(/cursor-link@2x.png) 2x) 9 8,pointer!important;cursor:image-set(url(/cursor-link.png) 1x,url(/cursor-link@2x.png) 2x) 9 8,pointer!important}}}}</style><link rel="preload" href="/cursor.png" as="image"><link rel="preload" href="/cursor-link.png" as="image">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(c["title"])}</title>
<meta name="description" content="{e(c["desc"])}">
<meta name="keywords" content="{e(c["keywords"])}">
<link rel="canonical" href="{canon}">
<link rel="alternate" hreflang="en" href="{alt_en}">
<link rel="alternate" hreflang="ar" href="{alt_ar}">
<link rel="alternate" hreflang="x-default" href="{alt_en}">
<meta property="og:type" content="website">
<meta property="og:title" content="{e(c["title"])}">
<meta property="og:description" content="{e(c["desc"])}">
<meta property="og:url" content="{canon}">
<meta property="og:image" content="{SITE}/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="Queen Tech Solutions">
<meta property="og:locale" content="{"en_AE" if lang=="en" else "ar_AE"}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#131210">
<link rel="manifest" href="/manifest.webmanifest?v=3">
<link rel="icon" href="/favicon.ico?v=3" sizes="any">
<link rel="icon" href="/icon.svg?v=3" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3">
<script type="application/ld+json">
{schema}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?{fonts}&display=swap">
<link rel="stylesheet" href="/pages.css">
<script src="/i18n.js"></script>
<script src="/site-config.js" defer></script>
</head>
<body>
<header class="top">
  <div class="wrap nav">
    <a class="brand" href="{home}" aria-label="{"Queen Tech Solutions home" if lang=="en" else "الصفحة الرئيسية لكوين تك"}">
      {CROWN}
      <span><b>Queen Tech</b><small>{e(u["brand_small"])}</small></span>
    </a>
    <nav class="links" aria-label="{"Main" if lang=="en" else "القائمة الرئيسية"}">
      <a class="hide-sm" href="{svcs}">{e(u["services"])}</a>
      <a class="hide-sm" href="/price.html">{e(u["prices"])}</a>
      <a class="hide-sm" href="{tools}">{e(u["tools"])}</a>
      <a class="lang" href="{url(slug, other)}" hreflang="{other}" lang="{other}">{e(u["lang_name"])}</a>
      <a class="btn btn-gold" href="{contact}">{e(u["visit"])}</a>
    </nav>
  </div>
</header>

<main class="wrap">
  <section class="phead">
    <nav class="crumbs" aria-label="{"Breadcrumb" if lang=="en" else "مسار التنقل"}"><a href="{home}">{e(u["home"])}</a><span>/</span><a href="{svcs}">{e(u["services"])}</a><span>/</span><span>{e(c["crumb"])}</span></nav>
    <span class="tag">{e(c["tag"])}</span>
    <h1>{h1}</h1>
    <p class="lede">{e(c["lede"])}</p>
    <div class="cta-row">
      <a class="btn btn-wa" href="{e(wa)}" target="_blank" rel="noopener">{WA_SVG}<span>{e(u["wa_btn"])}</span></a>
      <a class="btn btn-line" href="tel:+971557971520">{TEL_SVG}<span>{e(u["call"])} <span dir="ltr">+971 55 797 1520</span></span></a>
    </div>
    <ul class="facts">{facts}</ul>
  </section>

  <section class="sec">
    <div class="sec-head"><span class="tag">{e(u["t_what"])}</span><h2>{e(c["what_h"])}</h2><p>{e(c["what_p"])}</p></div>
    <div class="grid">{what}</div>
  </section>

  <section class="sec">
    <div class="sec-head"><span class="tag">{e(u["t_who"])}</span><h2>{e(c["who_h"])}</h2></div>
    <div class="grid">{who}</div>
  </section>

  {price_sec}

  <section class="sec" id="areas">
    <div class="sec-head"><span class="tag">{e(u["t_area"])}</span><h2>{e(c["areas_h"])}</h2><p>{e(c["areas_p"])}</p></div>
    {areas_for(pg, lang)}
    <p class="fine">{e(u["office_note"])}</p>
  </section>

  <section class="sec">
    <div class="sec-head"><span class="tag">{e(u["t_how"])}</span><h2>{e(u["how"])}</h2></div>
    <ol class="steps">{steps}</ol>
  </section>

{work_sec(pg, lang)}  <section class="sec faq" id="faq">
    <div class="sec-head"><span class="tag">{e(u["faq"])}</span><h2>{e(u["faq_h"])}</h2></div>
    {faq}
  </section>

  <section class="sec">
    <div class="sec-head"><span class="tag">{e(u["related"])}</span><h2>{e(u["related_h"])}</h2></div>
    <div class="related">{rel_html}</div>
  </section>

  <section class="sec">
    <div class="cta-box">
      <div>
        <span class="tag">{e(u["cta_tag"])}</span>
        <h2 style="margin-top:10px">{e(u["cta_h"])}</h2>
        <p>{e(u["cta_p"])}</p>
      </div>
      <div class="acts">
        <a class="btn btn-wa" href="{e(wa)}" target="_blank" rel="noopener">{WA_SVG}<span>{e(u["wa_btn"])}</span></a>
        <a class="btn btn-gold" href="{contact}">{e(u["book"])}</a>
        <p class="addr">{e(u["addr"])}</p>
      </div>
    </div>
  </section>
</main>

<footer class="pfoot wrap">
  <nav class="svc-links" aria-label="{e(u["foot_svc"])}">{foot_links}</nav>
  <div>{e(u["rights"])} · {e(u["addr"])} · <a href="{home}">{e(u["home"])}</a> · <a href="{contact}">{"Contact" if lang=="en" else "تواصل معنا"}</a> · <a href="/privacy.html">{"Privacy" if lang=="en" else "الخصوصية"}</a></div>
</footer>

<a class="wa-float" href="{e(wa)}" target="_blank" rel="noopener" aria-label="{"Chat on WhatsApp" if lang=="en" else "تحدث معنا على واتساب"}"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.3Z"/></svg></a>
{"<script src=\"/prices.js\"></script><script src=\"/svc-prices.js\"></script>" if pg["prices"] else ""}
</body>
</html>
'''

def main():
    os.makedirs(os.path.join(ROOT, "ar"), exist_ok=True)
    for pg in PAGES:
        for lang in ("en", "ar"):
            path = os.path.join(ROOT, url(pg["slug"], lang).lstrip("/"))
            open(path, "w").write(build(pg, lang))
            print("wrote", path)

if __name__ == "__main__":
    main()
