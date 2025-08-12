import os
from fetch_html import fetch
from parse_helpers import extract_form_fields, save_schema
import argparse

DEFAULT_URL = "https://udyamregistration.gov.in/UdyamRegistration.aspx"

def main(url: str, out_path: str):
    print(f"[scrape_step2] fetching {url}")
    html = fetch(url)
    if not html:
        print("[scrape_step2] failed to fetch HTML")
        return

    # The second step might be in a different form or part of the same
    # page; we'll attempt to find PAN-related inputs by heuristics if specific selector fails.
    schema = extract_form_fields(html, None)
    # filter fields that look like PAN/related
    pan_fields = [f for f in schema.get("fields", []) if (f.get("name") or "").lower().find("pan") != -1
                  or (f.get("label") or "").lower().find("pan") != -1]
    if pan_fields:
        out = {
            "step": 2,
            "title": schema.get("title"),
            "fields": pan_fields
        }
    else:
        # no direct pan-labeled fields; still save full schema for manual inspection
        out = {"step": 2, "title": schema.get("title"), "fields": schema.get("fields", []), "note": "No explicit PAN-labeled fields found by heuristic"}
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    save_schema(out, out_path)
    print(f"[scrape_step2] saved schema to {out_path}")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default=DEFAULT_URL, help="Page URL to scrape")
    parser.add_argument("--out", default="output/step2_schema.json", help="Output JSON path")
    args = parser.parse_args()
    main(args.url, args.out)
