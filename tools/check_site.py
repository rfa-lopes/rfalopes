#!/usr/bin/env python3
"""Checks a built copy of the site (no dependencies, Python 3).

  python tools/check_site.py [built_site_dir] [baseurl]

Defaults: built_site_dir = _site, baseurl = "" (same as _config.yml, site at the root).
It looks for Liquid errors left in the HTML and for broken internal links, images,
videos and posters. Exit code 0 = all good, 1 = problems found.
"""
import glob
import os
import re
import sys

root = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else "_site")
baseurl = (sys.argv[2] if len(sys.argv) > 2 else "").rstrip("/")

if not os.path.isdir(root):
    sys.exit(f"Folder not found: {root}  (build the site first: bundle exec jekyll build)")

pages = glob.glob(os.path.join(root, "**", "*.html"), recursive=True)
ref_re = re.compile(r'(?:href|src|poster)="(%s/[^"#?]*)' % re.escape(baseurl))
problems, checked = [], 0

for page in pages:
    html = open(page, encoding="utf-8", errors="replace").read()
    rel = os.path.relpath(page, root)
    if "Liquid error" in html or "Liquid Exception" in html:
        problems.append((rel, "Liquid error in the page"))
    for match in ref_re.finditer(html):
        checked += 1
        target = match.group(1)[len(baseurl):].lstrip("/")
        path = os.path.join(root, target.replace("/", os.sep))
        if not (os.path.isfile(path) or os.path.isfile(os.path.join(path, "index.html"))):
            problems.append((rel, "missing: " + match.group(1)))

print(f"{len(pages)} pages, {checked} internal references checked, {len(problems)} problem(s)")
for rel, msg in problems[:50]:
    print(f"  {rel}: {msg}")
sys.exit(1 if problems else 0)
