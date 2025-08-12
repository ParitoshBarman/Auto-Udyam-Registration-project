import requests
from typing import Optional

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}

def fetch(url: str, timeout: int = 15) -> Optional[str]:
    """
    Fetch page HTML using requests. Returns HTML string or None on failure.
    """
    try:
        resp = requests.get(url, headers=HEADERS)
        resp.raise_for_status()
        return resp.text
    except Exception as e:
        print(f"[fetch] error fetching {url}: {e}")
        return None

if __name__ == "__main__":
    import sys
    url = sys.argv[1] if len(sys.argv) > 1 else "https://udyamregistration.gov.in/UdyamRegistration.aspx"
    print("Please wait")
    print("Fetching the data...")
    html = fetch(url)
    print(html[:1000] if html else "No HTML fetched")
