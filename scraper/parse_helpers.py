from bs4 import BeautifulSoup, Tag
from typing import Dict, List, Optional, Any
import re
import json

def get_label_text(input_tag: Tag, soup: BeautifulSoup) -> Optional[str]:
    """
    Try to find label text for an input/select/textarea.
    Methods:
      1) <label for="id">...</label>
      2) parent <label> wraps the input
      3) preceding sibling <label>
      4) nearby text nodes (heuristic)
    """
    # 1) label with for attribute
    id_attr = input_tag.get("id")
    if id_attr:
        lbl = soup.find("label", attrs={"for": id_attr})
        if lbl and lbl.get_text(strip=True):
            return lbl.get_text(strip=True)

    # 2) parent label
    parent = input_tag.find_parent("label")
    if parent and parent.get_text(strip=True):
        return parent.get_text(strip=True).strip()

    # 3) previous sibling label
    prev = input_tag.find_previous_sibling("label")
    if prev and prev.get_text(strip=True):
        return prev.get_text(strip=True).strip()

    # 4) attempt to find nearest text element in previous siblings
    sib = input_tag
    for _ in range(3):
        if sib is None:
            break
        sib = sib.previous_sibling
        if sib and isinstance(sib, Tag):
            txt = sib.get_text(strip=True)
            if txt and len(txt) < 120:
                return txt
    return None


def parse_input_element(el: Tag, soup: BeautifulSoup) -> Dict[str, Any]:
    """
    Parse a single <input>, <select>, or <textarea> tag into a dict describing
    name, id, type, label, placeholder, required, pattern, maxlength, options.
    """
    tag_name = el.name.lower()
    info: Dict[str, Any] = {}
    info["tag"] = tag_name
    info["name"] = el.get("name")
    info["id"] = el.get("id")
    info["type"] = el.get("type") if tag_name == "input" else tag_name
    info["placeholder"] = el.get("placeholder")
    info["required"] = bool(el.get("required") or el.has_attr("aria-required"))
    info["maxlength"] = el.get("maxlength")
    info["pattern"] = el.get("pattern")

    # label
    info["label"] = get_label_text(el, soup)

    # special handling for select
    if tag_name == "select":
        options = []
        for opt in el.find_all("option"):
            options.append({
                "value": opt.get("value"),
                "text": opt.get_text(strip=True),
                "selected": bool(opt.get("selected"))
            })
        info["options"] = options

    # heuristics: infer patterns for known fields (PAN/Aadhaar/OTP)
    name_or_id = " ".join(filter(None, [info.get("name",""), info.get("id","")])).lower()
    label = (info.get("label") or "").lower()
    # Aadhaar heuristics
    if "aadhaar" in name_or_id or "aadhaar" in label or "aadhar" in name_or_id or "aadhar" in label:
        info.setdefault("pattern", r"^\d{12}$")
        info.setdefault("format_hint", "12 digits")
    # PAN heuristics
    if "pan" in name_or_id or "pan" in label:
        info.setdefault("pattern", r"^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$")
        info.setdefault("format_hint", "5 letters, 4 digits, 1 letter (e.g. ABCDE1234F)")
    # OTP heuristics
    if "otp" in name_or_id or "otp" in label:
        info.setdefault("pattern", r"^\d{4,6}$")
        info.setdefault("format_hint", "4-6 digits")

    return info

def extract_form_fields(html: str, form_selector: Optional[str] = None) -> Dict[str, Any]:
    """
    Parse HTML and extract all input/select/textarea fields. If form_selector is given,
    narrow to that form (CSS selector). Returns a dict with metadata and fields list.
    """
    soup = BeautifulSoup(html, "lxml")
    container = soup.select_one(form_selector) if form_selector else soup
    fields = []
    if not container:
        return {"fields": fields, "note": "form selector not found"}
    for tag in container.find_all(["input", "select", "textarea"]):
        # ignore hidden inputs (unless we want them)
        if tag.name == "input" and tag.get("type", "").lower() in ("hidden", "submit", "button"):
            continue
        parsed = parse_input_element(tag, soup)
        # skip if no name/id/label and it's not meaningful
        if not any([parsed.get("name"), parsed.get("id"), parsed.get("label")]):
            # still include if has placeholder or type=email/tel etc
            if not parsed.get("placeholder") and parsed.get("type") not in ("email", "tel", "text", "number"):
                continue
        fields.append(parsed)
    return {
        "title": soup.title.get_text(strip=True) if soup.title else None,
        "url_present": True,
        "fields": fields
    }

def save_schema(schema: Dict[str, Any], path: str):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(schema, f, indent=2, ensure_ascii=False)
