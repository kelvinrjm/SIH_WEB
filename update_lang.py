import json
import re

file_path = "/var/www/html/html_bkp/SIH_main/sih-k/js/language.js"
with open(file_path, "r") as f:
    content = f.read()

# We will inject some new keys into the TRANSLATIONS dict.
new_keys_ta = """
        "Direct From Certified Farmers": "சான்றளிக்கப்பட்ட விவசாயிகளிடமிருந்து நேரடியாக",
        "Eliminate middleman markups. Buy directly from verified farmers in Maharashtra with guaranteed quality and fair pricing.": "இடைத்தரகர் இல்லை. மகாராஷ்டிராவின் சரிபார்க்கப்பட்ட விவசாயிகளிடமிருந்து உத்தரவாதமான தரம் மற்றும் நியாயமான விலையில் நேரடியாக வாங்கவும்.",
        "Direct harvest lots ready for immediate dispatch": "உடனடி அனுப்புதலுக்கு தயாராக உள்ள நேரடி அறுவடை",
        "View All Orders": "அனைத்து ஆர்டர்களையும் காண்க",
        "Search tomatoes, onions, wheat, cotton...": "தக்காளி, வெங்காயம், கோதுமை, பருத்தி ஆகியவற்றை தேடுங்கள்...",
        "100% Certified Farmers": "100% சான்றளிக்கப்பட்ட விவசாயிகள்",
        "Every seller is identity-verified with Aadhaar/7-12 land records.": "ஒவ்வொரு விற்பனையாளரும் ஆதார்/7-12 நில ஆவணங்களுடன் அடையாளம் சரிபார்க்கப்பட்டுள்ளனர்.",
        "Direct Farm Logistics": "நேரடி பண்ணை தளவாடங்கள்",
        "Transparent pickup and dispatch directly from farm gates.": "பண்ணை வாயில்களிலிருந்து நேரடியாக வெளிப்படையான பிக்-அப் மற்றும் அனுப்புதல்.",
        "Mandi-Benchmarked Rates": "மண்டி-தரப்படுத்தப்பட்ட விலைகள்",
        "Fair pricing aligned with official APMC AgmarkNet indices.": "அதிகாரப்பூர்வ APMC AgmarkNet குறியீடுகளுடன் சீரமைக்கப்பட்ட நியாயமான விலை.",
        "Buyer Tutorials": "கையேடுகள்",
        "Learn how to source effectively on FarmLink": "FarmLink இல் எவ்வாறு திறம்பட ஆதாரங்களை பெறுவது என்பதை அறிக",
"""

new_keys_hi = """
        "Direct From Certified Farmers": "प्रमाणित किसानों से सीधे",
        "Eliminate middleman markups. Buy directly from verified farmers in Maharashtra with guaranteed quality and fair pricing.": "बिचौलिए का मार्कअप खत्म करें। गारंटीड गुणवत्ता और उचित मूल्य निर्धारण के साथ सीधे महाराष्ट्र के सत्यापित किसानों से खरीदें।",
        "Direct harvest lots ready for immediate dispatch": "तत्काल प्रेषण के लिए तैयार सीधे फसल लॉट",
        "View All Orders": "सभी ऑर्डर देखें",
        "Search tomatoes, onions, wheat, cotton...": "टमाटर, प्याज, गेहूं, कपास खोजें...",
        "100% Certified Farmers": "100% प्रमाणित किसान",
        "Every seller is identity-verified with Aadhaar/7-12 land records.": "प्रत्येक विक्रेता को आधार/7-12 भूमि रिकॉर्ड के साथ पहचान-सत्यापित किया गया है।",
        "Direct Farm Logistics": "सीधे फार्म रसद",
        "Transparent pickup and dispatch directly from farm gates.": "खेत के फाटकों से सीधे पारदर्शी पिकअप और प्रेषण।",
        "Mandi-Benchmarked Rates": "मंडी-बेंचमार्क दरें",
        "Fair pricing aligned with official APMC AgmarkNet indices.": "आधिकारिक एपीएमसी एगमार्कनेट सूचकांकों के साथ संरेखित उचित मूल्य निर्धारण।",
        "Buyer Tutorials": "खरीदार ट्यूटोरियल",
        "Learn how to source effectively on FarmLink": "FarmLink पर प्रभावी ढंग से स्रोत कैसे करें सीखें",
"""

content = content.replace('"Buyer Portal": "வாங்குபவர் தளம்",', '"Buyer Portal": "வாங்குபவர் தளம்",' + new_keys_ta)
content = content.replace('"Buyer Portal": "खरीदार पोर्टल",', '"Buyer Portal": "खरीदार पोर्टल",' + new_keys_hi)

with open(file_path, "w") as f:
    f.write(content)
