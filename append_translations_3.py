import json

file_path = '/var/www/html/html_bkp/SIH_main/sih-k/js/language.js'
translations = [
  {
    "en": "Inventory Thresholds",
    "ta": "சரக்கு வரம்புகள்",
    "hi": "इन्वेंट्री सीमाएँ"
  },
  {
    "en": "You can speak in English, Tamil (தமிழ்), or Hindi (हिन्दी) to add your produce or check market rates. Click the microphone icon next to any input in the Add Product page or speak:",
    "ta": "உங்கள் விளைபொருட்களைச் சேர்க்க அல்லது சந்தை விலைகளை சரிபார்க்க நீங்கள் ஆங்கிலம், தமிழ் (தமிழ்) அல்லது இந்தி (हिन्दी) ஆகிய மொழிகளில் பேசலாம். தயாரிப்பைச் சேர் பக்கத்தில் உள்ள மைக்ரோஃபோன் ஐகானைக் கிளிக் செய்யவும் அல்லது பேசவும்:",
    "hi": "आप अपनी उपज जोड़ने या बाजार दर की जांच करने के लिए अंग्रेजी, तमिल (தமிழ்) या हिंदी (हिन्दी) में बोल सकते हैं। उत्पाद जोड़ें पृष्ठ में किसी भी इनपुट के आगे माइक्रोफ़ोन आइकन पर क्लिक करें या बोलें:"
  },
  {
    "en": "e.g. Question regarding Nashik APMC price",
    "ta": "எ.கா. நாசிக் APMC விலை தொடர்பான கேள்வி",
    "hi": "उदा. नासिक APMC मूल्य से संबंधित प्रश्न"
  },
  {
    "en": "Describe the issue you are facing...",
    "ta": "நீங்கள் எதிர்கொள்ளும் சிக்கலை விவரிக்கவும்...",
    "hi": "आप जिस समस्या का सामना कर रहे हैं उसका वर्णन करें..."
  },
  {
    "en": "Submit Support Request",
    "ta": "ஆதரவு கோரிக்கையை சமர்ப்பிக்கவும்",
    "hi": "समर्थन अनुरोध सबमिट करें"
  },
  {
    "en": "Notify on 5% change",
    "ta": "5% மாற்றத்தில் அறிவிக்கவும்",
    "hi": "5% परिवर्तन पर सूचित करें"
  },
  {
    "en": "Notify on 10% change",
    "ta": "10% மாற்றத்தில் அறிவிக்கவும்",
    "hi": "10% परिवर्तन पर सूचित करें"
  },
  {
    "en": "Notify on 15% change",
    "ta": "15% மாற்றத்தில் அறிவிக்கவும்",
    "hi": "15% परिवर्तन पर सूचित करें"
  },
  {
    "en": "Notify on 20% change",
    "ta": "20% மாற்றத்தில் அறிவிக்கவும்",
    "hi": "20% परिवर्तन पर सूचित करें"
  },
  {
    "en": "Pune Market Yard",
    "ta": "புனே மார்க்கெட் யார்டு",
    "hi": "पुणे मार्केट यार्ड"
  },
  {
    "en": "Nashik APMC (Maharashtra)",
    "ta": "நாசிக் APMC (மகாராஷ்டிரா)",
    "hi": "नासिक APMC (महाराष्ट्र)"
  },
  {
    "en": "Vashi APMC Navi Mumbai",
    "ta": "வாஷி APMC நவி மும்பை",
    "hi": "वाशी APMC नवी मुंबई"
  },
  {
    "en": "Nagpur APMC",
    "ta": "நாக்பூர் APMC",
    "hi": "नागपुर APMC"
  },
  {
    "en": "Kolhapur APMC",
    "ta": "கோலாப்பூர் APMC",
    "hi": "कोल्हापुर APMC"
  }
]

en_add = "\n"
ta_add = "\n"
hi_add = "\n"

for t in translations:
    en_key = t["en"].replace('"', '\\"')
    en_val = t["en"].replace('"', '\\"')
    ta_val = t["ta"].replace('"', '\\"')
    hi_val = t["hi"].replace('"', '\\"')
    
    en_add += f'        "{en_key}": "{en_val}",\n'
    ta_add += f'        "{en_key}": "{ta_val}",\n'
    hi_add += f'        "{en_key}": "{hi_val}",\n'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("en: {", "en: {" + en_add, 1)
content = content.replace("ta: {", "ta: {" + ta_add, 1)
content = content.replace("hi: {", "hi: {" + hi_add, 1)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated js/language.js successfully!")
