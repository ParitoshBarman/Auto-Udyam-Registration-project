import os
from fetch_html import fetch
from parse_helpers import extract_form_fields, save_schema
import argparse

DEFAULT_URL = "https://udyamregistration.gov.in/UdyamRegistration.aspx"

def main(url: str, out_path: str):
    print(f"[scrape_step1] fetching {url}")
    html = fetch(url)
    if not html:
        print("[scrape_step1] failed to fetch HTML")
        return
    # Heuristic: the site may not have forms isolated by simple selectors.
    # We'll try a few common containers (change if needed after inspecting page)
    possible_selectors = [
        "#form1",               # common id
        "form",                 # all forms (we can refine)
        ".form-horizontal",     # bootstrap-style
        "#ContentPlaceHolder1"  # asp.net common naming; adjust as needed
    ]
    schema = None
    for sel in possible_selectors:
        res = extract_form_fields(html, sel)
        if res.get("fields"):
            print(f"[scrape_step1] found fields with selector: {sel} (count={len(res['fields'])})")
            schema = res
            break
    if schema is None:
        # fallback: parse entire page
        print("[scrape_step1] no fields found with common selectors, parsing entire page")
        schema = extract_form_fields(html, None)

    schema["step"] = 1
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    save_schema(schema, out_path)
    print(f"[scrape_step1] saved schema to {out_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default=DEFAULT_URL, help="Page URL to scrape")
    parser.add_argument("--out", default="output/step1_schema.json", help="Output JSON path")
    args = parser.parse_args()
    main(args.url, args.out)
