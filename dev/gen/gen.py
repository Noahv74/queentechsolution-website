import os, json, sys
G = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
CURSOR = open(os.path.join(G, "cursor.txt")).read().strip()
WAF = open(os.path.join(G, "wa.txt")).read().strip()
ADS = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5383296169254857" crossorigin="anonymous"></script>'
CROWN = '<svg class="crown" viewBox="0 0 36 36" aria-hidden="true"><rect x=".5" y=".5" width="35" height="35" rx="5" fill="none" stroke="var(--gold)"/><path d="M8 23.5 L9.6 12.5 L14.4 17.6 L18 10 L21.6 17.6 L26.4 12.5 L28 23.5 Z" fill="var(--gold)"/><rect x="8" y="25.2" width="20" height="2.4" rx="1" fill="var(--gold)"/></svg>'
BIZ = {"@type": "LocalBusiness", "name": "Queen Tech Solutions", "telephone": "+971557971520",
       "address": {"@type": "PostalAddress", "addressLocality": "Dubai", "addressCountry": "AE"},
       "areaServed": ["Dubai", "Abu Dhabi"]}
FOOT = ('<footer class="pfoot wrap">Queen Tech Solutions · Dubai and Abu Dhabi · <a href="/">Home</a> · '
        '<a href="/services.html">Services</a> · <a href="/express.html">ExpressFix</a> · <a href="/track.html">Track a repair</a> · '
        '<a href="/care.html">CCTV Care Plan</a> · <a href="/it-plans.html">IT Support Plans</a> · <a href="/wifi-check.html">Wi-Fi Checkup</a> · '
        '<a href="/contact.html">Contact</a> · <span>Brand names belong to their owners.</span></footer>')


def page(slug, title, desc, ogt, sub, cta, body, script, ld=None, admin=False, module=False, extra_ar=(), ads=False):
    url = "https://queentechsolution.info/%s.html" % slug
    h = ['<!doctype html>', '<html lang="en">', '<head>', '<meta charset="utf-8">', CURSOR,
         '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">']
    if admin:
        h.append('<meta name="robots" content="noindex, nofollow">')
    else:
        h += ['<script src="/i18n.js"></script>', '<script src="/i18n/ar-common.js"></script>',
              '<script src="/i18n/ar-book.js"></script>'] + ['<script src="/i18n/ar-%s.js"></script>' % x for x in extra_ar] + ['<script src="/i18n/ar-%s.js"></script>' % slug]
    h += ['<title>%s</title>' % title, '<meta name="description" content="%s">' % desc]
    if not admin:
        h += ['<link rel="canonical" href="%s">' % url, '<meta property="og:type" content="website">',
              '<meta property="og:title" content="%s">' % ogt, '<meta property="og:description" content="%s">' % desc,
              '<meta property="og:url" content="%s">' % url, '<meta property="og:image" content="https://queentechsolution.info/og-image.png">',
              '<meta name="twitter:card" content="summary_large_image">']
    h += ['<meta name="theme-color" content="#131210">', '<link rel="manifest" href="/manifest.webmanifest?v=3">',
          '<link rel="icon" href="/favicon.ico?v=3" sizes="any">', '<link rel="icon" href="/icon.svg?v=3" type="image/svg+xml">',
          '<link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3">']
    if ld:
        h.append('<script type="application/ld+json">\n' + json.dumps(ld, ensure_ascii=False) + '\n</script>')
    h += ['<link rel="preconnect" href="https://fonts.googleapis.com">', '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
          '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;800;900&family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">',
          '<link rel="stylesheet" href="/pages.css">', '<link rel="stylesheet" href="/book.css">']
    if ads and not admin:  # ads stay off pages where customers decide to buy
        h.append(ADS)
    h += ['</head>', '<body>', '<header class="top">', '  <div class="wrap nav">',
          '    <a class="brand" href="/" aria-label="Queen Tech Solutions home">',
          '      ' + CROWN, '      <span><b>Queen Tech</b><small>%s</small></span>' % sub, '    </a>',
          '    <nav class="links" aria-label="Main">']
    if not admin:
        h.append('      <a class="lang-tg" data-lang-toggle href="?lang=ar">العربية</a>')
    h += ['      <a class="btn btn-gold" href="%s">%s</a>' % cta, '    </nav>', '  </div>', '</header>', '',
          '<main class="wrap">', body.strip('\n'), '</main>', '', FOOT, '']
    if not admin:
        h.append(WAF)
    if script:
        h.append(script.strip('\n'))
    h += ['</body>', '</html>', '']
    open(os.path.join(OUT, slug + ".html"), "w").write("\n".join(h))


def ld_service(name, desc, slug, extra=None):
    d = {"@context": "https://schema.org", "@type": "Service", "name": name, "description": desc,
         "url": "https://queentechsolution.info/%s.html" % slug, "provider": BIZ, "areaServed": ["Dubai", "Abu Dhabi"]}
    if extra:
        d.update(extra)
    return d


for f in sys.argv[1:]:
    exec(open(os.path.join(G, f)).read())
