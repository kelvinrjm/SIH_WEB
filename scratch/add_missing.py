import json
import os

file_path = 'js/language.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will just write a python script that will insert the missing translations 
# right before the end of the en, ta, and hi blocks.

en_new = """
        'Chats': 'Chats',
        'Track incoming orders from buyers and update fulfillment status in real-time.': 'Track incoming orders from buyers and update fulfillment status in real-time.',
        'Tomato': 'Tomato',
        'Onion': 'Onion',
        'Banana': 'Banana',
        'Paddy': 'Paddy',
        'Brinjal': 'Brinjal',
        'Potato': 'Potato',
        'Cotton': 'Cotton',
        'Wheat': 'Wheat',
        'Sugarcane': 'Sugarcane',
        'Mango': 'Mango'
"""

ta_new = """
        'Chats': 'சாட்கள்',
        'Track incoming orders from buyers and update fulfillment status in real-time.': 'வாங்குபவர்களின் ஆர்டர்களைக் கண்காணித்து, நிகழ்நேரத்தில் நிலையைப் புதுப்பிக்கவும்.',
        'Tomato': 'தக்காளி',
        'Onion': 'வெங்காயம்',
        'Banana': 'வாழைப்பழம்',
        'Paddy': 'நெல்',
        'Brinjal': 'கத்தரிக்காய்',
        'Potato': 'உருளைக்கிழங்கு',
        'Cotton': 'பருத்தி',
        'Wheat': 'கோதுமை',
        'Sugarcane': 'கரும்பு',
        'Mango': 'மாம்பழம்'
"""

hi_new = """
        'Chats': 'चैट्स',
        'Track incoming orders from buyers and update fulfillment status in real-time.': 'खरीदारों से आने वाले ऑर्डर ट्रैक करें और रीयल-टाइम में पूर्ति स्थिति अपडेट करें।',
        'Tomato': 'टमाटर',
        'Onion': 'प्याज',
        'Banana': 'केला',
        'Paddy': 'धान',
        'Brinjal': 'बैंगन',
        'Potato': 'आलू',
        'Cotton': 'कपास',
        'Wheat': 'गेहूं',
        'Sugarcane': 'गन्ना',
        'Mango': 'आम'
"""

import re

# insert at the end of each block
# find the last key in 'en'
def insert_before_brace(text, lang, insert_text):
    # Regex to find the end of a language block:
    # It looks for the start of the block `lang: {` and then the closing `},`
    pattern = r"('" + lang + r"'\s*:\s*\{.*?)(?=\s*\},)"
    if lang == 'hi':
        pattern = r"('" + lang + r"'\s*:\s*\{.*?)(?=\s*\}(?:\s*,\s*|(?=\s*\})))" # hi might be the last one
    
    match = re.search(pattern, text, re.DOTALL)
    if match:
        if lang == 'hi':
            # handle the end of the hi block which might just be }
            pattern2 = r"(" + lang + r"\s*:\s*\{.*?)(?=\s*\}(?:\s*,|\s*\}))"
            match2 = re.search(pattern2, text, re.DOTALL)
            if match2:
                return text[:match2.end()] + ",\n" + insert_text + text[match2.end():]

        return text[:match.end()] + ",\n" + insert_text + text[match.end():]
    
    # fallback if single quote is not used for lang key
    pattern = r"(" + lang + r"\s*:\s*\{.*?)(?=\s*\},)"
    match = re.search(pattern, text, re.DOTALL)
    if match:
        return text[:match.end()] + ",\n" + insert_text + text[match.end():]

    # another fallback for hi
    if lang == 'hi':
        pattern = r"(" + lang + r"\s*:\s*\{.*?)(?=\s*\}\s*\})"
        match = re.search(pattern, text, re.DOTALL)
        if match:
            return text[:match.end()] + ",\n" + insert_text + text[match.end():]

    print("Failed to find", lang)
    return text

content = insert_before_brace(content, 'en', en_new)
content = insert_before_brace(content, 'ta', ta_new)
content = insert_before_brace(content, 'hi', hi_new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated js/language.js")

