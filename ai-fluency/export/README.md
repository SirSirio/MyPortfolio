# Re-exporting the sheets

Use this after any change to the sheets in `../source/`.

1. Serve the sources: `python -m http.server 8765 --bind 127.0.0.1` from `ai-fluency/source`.
2. Install the dependencies in a folder **outside** `06. Job & Applications` (the `&` breaks npm/npx there): copy `export-sheets.js` and `package.json`, run `npm install`.
3. `node export-sheets.js`. It writes `out/v2-sheet-1..5.pdf`, `out/v2-one-page.pdf` and check PNGs (create `out/` first). Optional `SCALE=0.97` (the default) sets the bottom margin: content is scaled from the top, so nothing reflows.
4. Merge and deduplicate with pypdf, then copy into `../downloads/`:

```python
from pypdf import PdfWriter
w = PdfWriter()
for i in range(1, 6): w.append(f"out/v2-sheet-{i}.pdf")
w.compress_identical_objects(remove_duplicates=True, remove_unreferenced=True)
w.write("ai-fluency-cheat-sheet.pdf")
```

The script uses the headless Chromium from `~/AppData/Local/ms-playwright/chromium_headless_shell-1248`. The footer text is the `FOOT` constant at the top.
