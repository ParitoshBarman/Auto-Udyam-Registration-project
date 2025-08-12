# UDYAM Registration Form Scraper

This project scrapes the UDYAM Registration form from the MSME website in two steps and extracts form field metadata into structured JSON schemas.

## 📂 Folder Structure

```
scraper
├── README.md
├── fetch_html.py              # Fetches HTML content from the target website
├── output                     # Output folder containing scraped JSON schemas
│   ├── step1_schema.json      # Schema for Step 1 of the form
│   └── step2_schema.json      # Schema for Step 2 of the form
├── parse_helpers.py           # Helper functions to parse HTML
├── requirements.txt           # Python dependencies
├── scrape_step1.py            # Scraper script for Step 1
├── scrape_step2.py            # Scraper script for Step 2
```

## 📜 Description

The scraper performs the following tasks:

1. **Step 1 Scraper (`scrape_step1.py`)**
   - Fetches the Step 1 form HTML
   - Parses form fields and metadata
   - Saves them into `output/step1_schema.json`

2. **Step 2 Scraper (`scrape_step2.py`)**
   - Fetches the Step 2 form HTML
   - Parses form fields and metadata
   - Saves them into `output/step2_schema.json`

### Example Output

**`output/step1_schema.json`**
```json
{
  "title": "UDYAM REGISTRATION FORM - For New Enterprise who are not Registered yet as MSME",
  "url_present": true,
  "fields": [
    {
      "tag": "input",
      "name": "ctl00$ContentPlaceHolder1$txtadharno",
      "id": "ctl00_ContentPlaceHolder1_txtadharno",
      "type": "text",
      "placeholder": "Your Aadhaar No",
      "required": false,
      "maxlength": "12",
      "pattern": null,
      "label": "1. Aadhaar Number/ आधार संख्या",
      "format_hint": "12 digits"
    },
    {
      "tag": "input",
      "name": "ctl00$ContentPlaceHolder1$txtownername",
      "id": "ctl00_ContentPlaceHolder1_txtownername",
      "type": "text",
      "placeholder": "Name as per Aadhaar",
      "required": false,
      "maxlength": "100",
      "pattern": null,
      "label": "2. Name of Entrepreneur / उद्यमी का नाम"
    },
    {
      "tag": "input",
      "name": "ctl00$ContentPlaceHolder1$chkDecarationA",
      "id": "ctl00_ContentPlaceHolder1_chkDecarationA",
      "type": "checkbox",
      "placeholder": null,
      "required": false,
      "maxlength": null,
      "pattern": null,
      "label": null
    }
  ],
  "step": 1
}
```

**`output/step2_schema.json`**
```json
{
  "step": 2,
  "title": "UDYAM REGISTRATION FORM - For New Enterprise who are not Registered yet as MSME",
  "fields": [
    {
      "tag": "input",
      "name": "ctl00$ContentPlaceHolder1$txtadharno",
      "id": "ctl00_ContentPlaceHolder1_txtadharno",
      "type": "text",
      "placeholder": "Your Aadhaar No",
      "required": false,
      "maxlength": "12",
      "pattern": null,
      "label": "1. Aadhaar Number/ आधार संख्या",
      "format_hint": "12 digits"
    },
    {
      "tag": "input",
      "name": "ctl00$ContentPlaceHolder1$txtownername",
      "id": "ctl00_ContentPlaceHolder1_txtownername",
      "type": "text",
      "placeholder": "Name as per Aadhaar",
      "required": false,
      "maxlength": "100",
      "pattern": null,
      "label": "2. Name of Entrepreneur / उद्यमी का नाम"
    },
    {
      "tag": "input",
      "name": "ctl00$ContentPlaceHolder1$chkDecarationA",
      "id": "ctl00_ContentPlaceHolder1_chkDecarationA",
      "type": "checkbox",
      "placeholder": null,
      "required": false,
      "maxlength": null,
      "pattern": null,
      "label": null
    }
  ],
  "note": "No explicit PAN-labeled fields found by heuristic"
}
```

## 🚀 Installation

1. Clone the repository:
```bash
git clone this_repo_link
cd scraper
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## ▶️ Usage

### Step 1:
```bash
python scrape_step1.py --url "https://udyamregistration.gov.in/UdyamRegistration.aspx" --out output/step1_schema.json
```

### Step 2:
```bash
python scrape_step2.py --url "https://udyamregistration.gov.in/UdyamRegistration.aspx" --out output/step2_schema.json
```

The extracted schemas will be saved inside the `output` folder.

## 🛠 Dependencies
- `requests`
- `beautifulsoup4`

## 📌 Notes
- Ensure you have Python 3.10+ installed.
- Internet connection is required to fetch form data.
