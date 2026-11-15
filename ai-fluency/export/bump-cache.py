"""Set one cache tag (?v=...) on every versioned CSS/JS reference of the site, in one go.

    python bump-cache.py 20261115-2

Why one script: the same i18n.js must be imported with the SAME tag everywhere
(main.js, method.js, ai.js), or the browser loads two copies of the language engine
and the EN/IT toggle silently breaks. Editing tags by hand is how they drift apart.
"""
import re
import sys
from pathlib import Path

SITE = Path(__file__).resolve().parents[2] / "site"
TAG = sys.argv[1] if len(sys.argv) > 1 else sys.exit(__doc__)

RULES = {
    "index.html": [r'(href="\./styles\.css)(\?v=[\w.-]+)?(")', r'(src="\./main\.js)(\?v=[\w.-]+)?(")'],
    "ai.html": [r'(href="\./ai\.css)(\?v=[\w.-]+)?(")', r'(src="\./ai\.js)(\?v=[\w.-]+)?(")'],
    "main.js": [r"(from '\./i18n\.js)(\?v=[\w.-]+)?(')", r"(from '\./method\.js)(\?v=[\w.-]+)?(')"],
    "method.js": [r"(from '\./i18n\.js)(\?v=[\w.-]+)?(')"],
    "ai.js": [r"(from '\./i18n\.js)(\?v=[\w.-]+)?(')"],
}

for name, pats in RULES.items():
    p = SITE / name
    s = p.read_text(encoding="utf-8")
    for pat in pats:
        s, n = re.subn(pat, lambda m: f"{m.group(1)}?v={TAG}{m.group(3)}", s)
        if n != 1:
            sys.exit(f"{name}: expected 1 match for {pat}, found {n}")
    p.write_text(s, encoding="utf-8", newline="\n")
    print(f"{name}: tagged ?v={TAG}")
