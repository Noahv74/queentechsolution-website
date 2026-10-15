#!/usr/bin/env python3
"""Builds the neighbourhood pages (EN + AR) with the same template as the service pages."""
import os, sys, html
sys.path.insert(0, os.path.dirname(__file__))
import build
from area_content import AREA_PAGES

_orig = build.areas_for
def areas_for(pg, lang):
    if "near" not in pg:
        return _orig(pg, lang)
    i = 0 if lang == "en" else 1
    chips = "".join(f'<span class="chip">{html.escape(a[i])}</span>' for a in pg["near"])
    return f'<div class="chips">{chips}</div>'
build.areas_for = areas_for

def main():
    root = build.ROOT
    for pg in AREA_PAGES:
        if "extra_rel" in pg["en"]:
            pg["extra_rel"] = pg["en"].pop("extra_rel")
        for lang in ("en", "ar"):
            path = os.path.join(root, build.url(pg["slug"], lang).lstrip("/"))
            out = build.build(pg, lang)
            if lang == "ar":
                for rt in ("/access-planner.html", "/planner.html", "/wifi-check.html", "/it-plans.html", "/express.html", "/care.html", "/price.html", "/rescue.html"):
                    out = out.replace(f'href="{rt}"', f'href="{rt}?lang=ar"').replace(f'href="{rt}#', f'href="{rt}?lang=ar#')
            open(path, "w").write(out)
            print("wrote", path)

if __name__ == "__main__":
    main()
