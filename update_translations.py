import re

file_path = '/var/www/html/html_bkp/SIH_main/sih-k/js/language.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

en_add = """
        "Hello! I'm your FarmLink Assistant. You can speak to me or type your question. I support English, Hindi, and Tamil!": "Hello! I'm your FarmLink Assistant. You can speak to me or type your question. I support English, Hindi, and Tamil!",
        "Sorry, I couldn't hear that clearly. Please try again.": "Sorry, I couldn't hear that clearly. Please try again.",
        "I can help you list products, check mandi prices, or find verified farmers. What would you like to do?": "I can help you list products, check mandi prices, or find verified farmers. What would you like to do?",
        "You can check live Mandi prices by going to the 'Market Price' section from your dashboard. It uses AgmarkNet data.": "You can check live Mandi prices by going to the 'Market Price' section from your dashboard. It uses AgmarkNet data.",
        "Our AI Vision tool automatically verifies product freshness when farmers upload photos during listing.": "Our AI Vision tool automatically verifies product freshness when farmers upload photos during listing.",
        "Field Officers perform physical verification. You can see the 'FIELD VERIFIED' badge on products that passed physical inspection.": "Field Officers perform physical verification. You can see the 'FIELD VERIFIED' badge on products that passed physical inspection.",
        "You can request a return from the 'My Orders' section for any delivered orders if there are quality issues.": "You can request a return from the 'My Orders' section for any delivered orders if there are quality issues.",
        "Hello! How can I assist you with FarmLink today?": "Hello! How can I assist you with FarmLink today?",
        "Type or speak a message...": "Type or speak a message...",
        "Listening...": "Listening...",
"""

ta_add = """
        "Hello! I'm your FarmLink Assistant. You can speak to me or type your question. I support English, Hindi, and Tamil!": "வணக்கம்! நான் உங்கள் ஃபார்ம்லிங்க் உதவியாளர். நீங்கள் என்னுடன் பேசலாம் அல்லது உங்கள் கேள்வியைத் தட்டச்சு செய்யலாம். நான் ஆங்கிலம், இந்தி மற்றும் தமிழை ஆதரிக்கிறேன்!",
        "Sorry, I couldn't hear that clearly. Please try again.": "மன்னிக்கவும், எனக்கு அது தெளிவாகக் கேட்கவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
        "I can help you list products, check mandi prices, or find verified farmers. What would you like to do?": "தயாரிப்புகளைப் பட்டியலிடவும், மண்டி விலைகளைச் சரிபார்க்கவும் அல்லது சரிபார்க்கப்பட்ட விவசாயிகளைக் கண்டறியவும் நான் உங்களுக்கு உதவ முடியும். நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?",
        "You can check live Mandi prices by going to the 'Market Price' section from your dashboard. It uses AgmarkNet data.": "உங்கள் டாஷ்போர்டில் உள்ள 'சந்தை விலை' பகுதிக்குச் சென்று நேரடி மண்டி விலைகளை நீங்கள் சரிபார்க்கலாம். இது AgmarkNet தரவைப் பயன்படுத்துகிறது.",
        "Our AI Vision tool automatically verifies product freshness when farmers upload photos during listing.": "விவசாயிகள் பட்டியலிடும் போது புகைப்படங்களைப் பதிவேற்றும்போது எங்கள் AI விஷன் கருவி தானாகவே தயாரிப்புகளின் புதிய தன்மையைச் சரிபார்க்கிறது.",
        "Field Officers perform physical verification. You can see the 'FIELD VERIFIED' badge on products that passed physical inspection.": "கள அதிகாரிகள் நேரடி சரிபார்ப்பைச் செய்கிறார்கள். உடல் பரிசோதனையில் தேர்ச்சி பெற்ற தயாரிப்புகளில் 'களத்தில் சரிபார்க்கப்பட்டது' பேட்ஜைக் காணலாம்.",
        "You can request a return from the 'My Orders' section for any delivered orders if there are quality issues.": "தரச் சிக்கல்கள் ஏதேனும் இருந்தால் விநியோகிக்கப்பட்ட ஆர்டர்களுக்கு 'என் ஆர்டர்கள்' பகுதியிலிருந்து திரும்புமாறு நீங்கள் கோரலாம்.",
        "Hello! How can I assist you with FarmLink today?": "வணக்கம்! இன்று ஃபார்ம்லிங்கில் நான் உங்களுக்கு எப்படி உதவ முடியும்?",
        "Type or speak a message...": "ஒரு செய்தியைத் தட்டச்சு செய்யவும் அல்லது பேசவும்...",
        "Listening...": "கேட்கிறது...",
"""

hi_add = """
        "Hello! I'm your FarmLink Assistant. You can speak to me or type your question. I support English, Hindi, and Tamil!": "नमस्ते! मैं आपका फार्मलिंक सहायक हूँ। आप मुझसे बात कर सकते हैं या अपना प्रश्न टाइप कर सकते हैं। मैं अंग्रेजी, हिंदी और तमिल का समर्थन करता हूँ!",
        "Sorry, I couldn't hear that clearly. Please try again.": "क्षमा करें, मैं उसे स्पष्ट रूप से नहीं सुन सका। कृपया पुनः प्रयास करें।",
        "I can help you list products, check mandi prices, or find verified farmers. What would you like to do?": "मैं आपको उत्पाद सूचीबद्ध करने, मंडी की कीमतों की जांच करने या सत्यापित किसानों को खोजने में मदद कर सकता हूँ। आप क्या करना चाहेंगे?",
        "You can check live Mandi prices by going to the 'Market Price' section from your dashboard. It uses AgmarkNet data.": "आप अपने डैशबोर्ड से 'बाज़ार मूल्य' अनुभाग पर जाकर लाइव मंडी की कीमतों की जांच कर सकते हैं। यह AgmarkNet डेटा का उपयोग करता है।",
        "Our AI Vision tool automatically verifies product freshness when farmers upload photos during listing.": "जब किसान सूचीकरण के दौरान तस्वीरें अपलोड करते हैं तो हमारा एआई विजन टूल स्वचालित रूप से उत्पाद की ताजगी की पुष्टि करता है।",
        "Field Officers perform physical verification. You can see the 'FIELD VERIFIED' badge on products that passed physical inspection.": "फील्ड अधिकारी भौतिक सत्यापन करते हैं। आप भौतिक निरीक्षण में उत्तीर्ण उत्पादों पर 'फील्ड सत्यापित' बैज देख सकते हैं।",
        "You can request a return from the 'My Orders' section for any delivered orders if there are quality issues.": "यदि गुणवत्ता संबंधी समस्याएं हैं, तो आप किसी भी वितरित आदेश के लिए 'मेरे आदेश' अनुभाग से वापसी का अनुरोध कर सकते हैं।",
        "Hello! How can I assist you with FarmLink today?": "नमस्ते! मैं आज फार्मलिंक में आपकी कैसे सहायता कर सकता हूँ?",
        "Type or speak a message...": "कोई संदेश टाइप करें या बोलें...",
        "Listening...": "सुन रहा है...",
"""

content = content.replace("'en': {", "'en': {" + en_add, 1)
content = content.replace("'ta': {", "'ta': {" + ta_add, 1)
content = content.replace("'hi': {", "'hi': {" + hi_add, 1)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated js/language.js")
