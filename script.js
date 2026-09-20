// COMPLETE script.js — FINAL FIX (File Protocol & Location-Based Market Search)

/* ============================ LANGUAGE ============================ */
const translations = {
    en: {},
    ta: {
        'Language':'மொழி','Dashboard':'முகப்பு','My Products':'என் விளைபொருட்கள்','Add Product':'விளைபொருளைச் சேர்','Buyer Requests':'வாங்குபவர் கோரிக்கைகள்','Price Discovery':'விலை தகவல்','Cart':'சேமித்தவை','Profile':'சுயவிவரம்','Settings':'அமைப்புகள்','Logout':'வெளியேறு','Search your products...':'உங்கள் விளைபொருட்களைத் தேடுங்கள்...','Notifications':'அறிவிப்புகள்','Mark all read':'அனைத்தையும் படித்ததாகக் குறி','Farmer':'விவசாயி','Seller Account':'விற்பனையாளர் கணக்கு','Good Morning, Farmer!':'வணக்கம், விவசாயியே!','Manage your produce and connect with better market opportunities.':'உங்கள் விளைபொருட்களை நிர்வகித்து நல்ல சந்தை வாய்ப்புகளுடன் இணையுங்கள்.','Total Products Listed':'மொத்த பட்டியல்கள்','Currently Available':'தற்போது உள்ளது','Sold Out':'விற்றுத் தீர்ந்தது','Estimated Inventory Value':'மதிப்பிடப்பட்ட இருப்பு மதிப்பு','Best Selling Opportunity':'சிறந்த விற்பனை வாய்ப்பு','Market Price Snapshot':'சந்தை விலை நிலவரம்','Recent Products':'சமீபத்திய விளைபொருட்கள்','View All →':'அனைத்தையும் பார் →','View Full Price Discovery →':'முழு விலை விவரத்தைப் பார் →','Manage all your listed agricultural produce.':'உங்கள் பட்டியலிடப்பட்ட விளைபொருட்களை நிர்வகியுங்கள்.','Status':'நிலை','Grade':'தரம்','Sort By':'வரிசைப்படுத்து','All':'அனைத்தும்','Available':'கிடைக்கிறது','Grade A':'தரம் A','Grade B':'தரம் B','Grade C':'தரம் C','Premium':'உயர்தரம்','Standard':'சாதாரணம்','Newest Added':'புதிதாக சேர்க்கப்பட்டது','Oldest Added':'முதலில் சேர்க்கப்பட்டது','Highest Quantity':'அதிக அளவு','Lowest Quantity':'குறைந்த அளவு','Highest Price':'அதிக விலை','Lowest Price':'குறைந்த விலை','Clear Filters':'வடிகட்டிகளை நீக்கு','Connect with buyers looking for your produce.':'உங்கள் விளைபொருளைத் தேடும் வாங்குபவர்களுடன் இணையுங்கள்.','Compare your prices with current market rates to make informed decisions.':'சரியான முடிவுக்காக உங்கள் விலையை சந்தை விலையுடன் ஒப்பிடுங்கள்.','Market Price Comparison':'சந்தை விலை ஒப்பீடு','Crop':'பயிர்','Market':'சந்தை','Your Price':'உங்கள் விலை','Current Market Price':'தற்போதைய சந்தை விலை','Difference':'வித்தியாசம்','Saved Opportunities':'சேமித்த வாய்ப்புகள்','Buyer requests and marketplace opportunities you\'ve saved.':'நீங்கள் சேமித்த வாங்குபவர் கோரிக்கைகள் மற்றும் சந்தை வாய்ப்புகள்.','Manage your farmer profile information.':'உங்கள் விவசாயி சுயவிவரத்தை நிர்வகியுங்கள்.','Low Stock Threshold':'குறைந்த இருப்பு எச்சரிக்கை அளவு','Warn when product quantity falls below this value (kg).':'இந்த அளவுக்கு கீழ் இருப்பு சென்றால் எச்சரிக்கை செய்யப்படும் (கிலோ).','Enable buyer request and price alerts.':'வாங்குபவர் கோரிக்கை மற்றும் விலை எச்சரிக்கைகளை இயக்கவும்.','Auto-refresh Prices':'விலைகளைத் தானாகப் புதுப்பி','Update market prices automatically every hour.':'ஒவ்வொரு மணி நேரமும் சந்தை விலைகளைப் புதுப்பிக்கவும்.','Product Photos':'விளைபொருள் படங்கள்','Click to upload product photos':'படங்களைப் பதிவேற்ற கிளிக் செய்யவும்','PNG, JPG up to 2MB each · Max 6 images':'PNG, JPG ஒவ்வொன்றும் 2MB வரை · அதிகபட்சம் 6 படங்கள்','Item / Product Name':'பொருளின் பெயர்','Grade / Quality':'தரம் / தரநிலை','Quantity':'அளவு','Unit':'அலகு','kg':'கிலோ','gram':'கிராம்','Farm / Pickup Location':'பண்ணை / எடுத்துச் செல்லும் இடம்','Select on Map':'வரைபடத்தில் தேர்வு செய்','Select Location on Map':'வரைபடத்தில் இடத்தைத் தேர்ந்தெடுக்கவும்','Confirm Location':'இடத்தை உறுதிப்படுத்து','Search for a location...':'இடத்தைத் தேடுங்கள்...','Search':'தேடு','Click on the map to select a location':'இடத்தைத் தேர்வு செய்ய வரைபடத்தைக் கிளிக் செய்யவும்','Contact Number':'தொடர்பு எண்','Date of Harvesting':'அறுவடை தேதி','Expiry Date':'காலாவதி தேதி','Availability Status':'கிடைக்கும் நிலை','Expected Selling Price (₹/kg)':'எதிர்பார்க்கும் விற்பனை விலை (₹/கிலோ)','Minimum Acceptable Price (₹/kg)':'குறைந்தபட்ச ஏற்கத்தக்க விலை (₹/கிலோ)','Current Market Price (₹/kg)':'தற்போதைய சந்தை விலை (₹/கிலோ)','Description':'விளக்கம்','Cancel':'ரத்து செய்','Delete Product':'விளைபொருளை நீக்கு','Are you sure you want to delete this product?':'இந்த விளைபொருளை நீக்க விரும்புகிறீர்களா?','Delete':'நீக்கு','No products found':'விளைபொருட்கள் இல்லை','No products added yet':'இன்னும் விளைபொருட்கள் சேர்க்கப்படவில்லை','Try adjusting your filters or search terms.':'உங்கள் வடிகட்டிகள் அல்லது தேடல் சொற்களை மாற்றிப் பாருங்கள்.','Start listing your produce and connect with potential buyers.':'உங்கள் விளைபொருளைப் பட்டியலிட்டு வாங்குபவர்களுடன் இணையுங்கள்.','Edit':'திருத்து','Mark Sold':'விற்றதாகக் குறி','Mark Available':'கிடைக்கிறது எனக் குறி','Low stock — consider updating your listing.':'குறைந்த இருப்பு — உங்கள் பட்டியலைப் புதுப்பிக்கவும்.','Wants:':'தேவை:','Quality:':'தரம்:','Location:':'இடம்:','Offer Price':'சலுகை விலை','Save to Cart':'சேமி','View Request':'கோரிக்கையைப் பார்','Good':'நல்லது','Review':'மதிப்பாய்வு செய்','Low':'குறைவு','Market Price':'சந்தை விலை','Above Market':'சந்தை விலையை விட அதிகம்','Below Market':'சந்தை விலையை விட குறைவு','Competitive':'போட்டி விலை','Already in cart':'ஏற்கனவே சேமிக்கப்பட்டுள்ளது','Your cart is empty':'சேமித்தவை காலியாக உள்ளன','Browse Buyer Requests':'வாங்குபவர் கோரிக்கைகளைப் பார்','Remove':'நீக்கு','View':'பார்','Not Set':'அமைக்கப்படவில்லை','No notifications':'அறிவிப்புகள் இல்லை','Expired':'காலாவதியானது','Expires today':'இன்று காலாவதியாகும்','Expires tomorrow':'நாளை காலாவதியாகும்','Expiring soon':'விரைவில் காலாவதியாகிறது','Expires in':'காலாவதி நாட்கள்','Expiry date must be after harvest date':'காலாவதி தேதி அறுவடை தேதிக்குப் பிறகு இருக்க வேண்டும்','Maximum 6 images allowed':'அதிகபட்சம் 6 படங்கள் மட்டுமே அனுமதிக்கப்படும்','days':'நாட்கள்',
        'Latest Available Market Price':'சமீபத்திய சந்தை விலை','Minimum Price':'குறைந்தபட்ச விலை','Modal Price':'நடுத்தர விலை','Maximum Price':'அதிகபட்ச விலை','Estimated Market Value':'மதிப்பிடப்பட்ட சந்தை மதிப்பு','Nearby Market Prices':'அருகிலுள்ள சந்தை விலைகள்','Last Updated':'கடைசியாக புதுப்பிக்கப்பட்டது','Fetching Latest Market Price':'சமீபத்திய சந்தை விலையைப் பெறுகிறது','Market Price Temporarily Unavailable':'சந்தை விலை தற்காலிகமாக கிடைக்கவில்லை.','No Current Market Price Found':'இந்தப் பயிருக்கான தற்போதைய சந்தை விலை இல்லை.',
        'Photo Verification':'புகைப்பட சரிபார்ப்பு',
        'Verifying Produce':'விளைபொருள் சரிபார்க்கப்படுகிறது...',
        'Verified':'✓ சரிபார்க்கப்பட்டது',
        'Photo Verification Failed':'புகைப்பட சரிபார்ப்பு தோல்வியுற்றது',
        'Only fruits and vegetables are allowed':'பழங்கள் மற்றும் காய்கறிகள் மட்டுமே அனுமதிக்கப்படும்',
        'Image does not match the selected product':'பதிவேற்றப்பட்ட படம் தேர்ந்தெடுக்கப்பட்ட விளைபொருளுடன் பொருந்தவில்லை',
        'Upload a clear photo':'பழம் அல்லது காய்கறியின் தெளிவான புகைப்படத்தைப் பதிவேற்றவும்',
        'Nearby Markets':'அருகிலுள்ள சந்தைகள்',
        'Market Information Unavailable':'சந்தை விலை தகவல் தற்காலிகமாக கிடைக்கவில்லை',
        'Market Price Dashboard':'சந்தை விலை தகவல் பலகை',
        'Sources':'ஆதாரங்கள்',
        'Please enter a district or market.':'தயவுசெய்து ஒரு மாவட்டம் அல்லது சந்தையை உள்ளிடவும்.',
        'Use product locations':'தயாரிப்பு இடங்களைப் பயன்படுத்து',
        'Not verified':'சரிபார்க்கப்படவில்லை',
        'All Requests':'அனைத்து கோரிக்கைகளும்',
        'Active':'செயலில் உள்ளது',
        'Cancelled':'ரத்து செய்யப்பட்டது',
        'Cancelled Requests':'ரத்து செய்யப்பட்ட கோரிக்கைகள்',
        'Restore Request':'மீண்டும் கொண்டுவா',
        'Request Restored':'கோரிக்கை மீண்டும் சேர்க்கப்பட்டது',
        'Request Cancelled':'கோரிக்கை ரத்து செய்யப்பட்டது',
        'Delete Permanently':'நிரந்தரமாக நீக்கு',
        'Cancel Request':'கோரிக்கையை ரத்து செய்',
        'No cancelled requests':'ரத்து செய்யப்பட்ட கோரிக்கைகள் இல்லை',
        'Cancelled requests will appear here.':'ரத்து செய்யப்பட்ட கோரிக்கைகள் இங்கு தோன்றும்.'
    },
    hi: {
        'Language':'भाषा','Dashboard':'डैशबोर्ड','My Products':'मेरी उपज','Add Product':'उपज जोड़ें','Buyer Requests':'खरीदार अनुरोध','Price Discovery':'मूल्य जानकारी','Cart':'सहेजे गए','Profile':'प्रोफ़ाइल','Settings':'सेटिंग्स','Logout':'लॉग आउट','Search your products...':'अपनी उपज खोजें...','Notifications':'सूचनाएँ','Mark all read':'सभी को पढ़ा हुआ करें','Farmer':'किसान','Seller Account':'विक्रेता खाता','Good Morning, Farmer!':'नमस्ते, किसान!','Manage your produce and connect with better market opportunities.':'अपनी उपज सँभालें और बेहतर बाज़ार अवसरों से जुड़ें।','Total Products Listed':'कुल सूचीबद्ध उपज','Currently Available':'अभी उपलब्ध','Sold Out':'बिक गया','Estimated Inventory Value':'अनुमानित स्टॉक मूल्य','Best Selling Opportunity':'सबसे अच्छा बिक्री अवसर','Market Price Snapshot':'बाज़ार मूल्य स्थिति','Recent Products':'हाल की उपज','View All →':'सभी देखें →','View Full Price Discovery →':'पूरी मूल्य जानकारी देखें →','Manage all your listed agricultural produce.':'अपनी सभी सूचीबद्ध कृषि उपज सँभालें।','Status':'स्थिति','Grade':'ग्रेड','Sort By':'क्रमबद्ध करें','All':'सभी','Available':'उपलब्ध','Grade A':'ग्रेड A','Grade B':'ग्रेड B','Grade C':'ग्रेड C','Premium':'प्रीमियम','Standard':'मानक','Newest Added':'हाल में जोड़ा','Oldest Added':'पहले जोड़ा','Highest Quantity':'सबसे अधिक मात्रा','Lowest Quantity':'सबसे कम मात्रा','Highest Price':'सबसे अधिक कीमत','Lowest Price':'सबसे कम कीमत','Clear Filters':'फ़िल्टर हटाएँ','Connect with buyers looking for your produce.':'आपकी उपज खोज रहे खरीदारों से जुड़ें।','Compare your prices with current market rates to make informed decisions.':'सही निर्णय के लिए अपनी कीमतों की मौजूदा बाज़ार दरों से तुलना करें।','Market Price Comparison':'बाज़ार मूल्य तुलना','Crop':'फसल','Market':'बाज़ार','Your Price':'आपकी कीमत','Current Market Price':'वर्तमान बाज़ार मूल्य','Difference':'अंतर','Saved Opportunities':'सहेजे गए अवसर','Buyer requests and marketplace opportunities you\'ve saved.':'आपके सहेजे हुए खरीदार अनुरोध और बाज़ार अवसर।','Manage your farmer profile information.':'अपनी किसान प्रोफ़ाइल जानकारी सँभालें।','Low Stock Threshold':'कम स्टॉक चेतावनी सीमा','Warn when product quantity falls below this value (kg).':'उत्पाद की मात्रा इस सीमा से कम होने पर चेतावनी दें (किलो)।','Enable buyer request and price alerts.':'खरीदार अनुरोध और मूल्य अलर्ट चालू करें।','Auto-refresh Prices':'कीमतें अपने-आप ताज़ा करें','Update market prices automatically every hour.':'हर घंटे बाज़ार कीमतें अपने-आप अपडेट करें।','Product Photos':'उत्पाद फ़ोटो','Click to upload product photos':'फ़ोटो अपलोड करने के लिए क्लिक करें','PNG, JPG up to 2MB each · Max 6 images':'PNG, JPG 2MB तक · अधिकतम 6 छवियाँ','Item / Product Name':'उपज / उत्पाद का नाम','Grade / Quality':'ग्रेड / गुणवत्ता','Quantity':'मात्रा','Unit':'इकाई','kg':'किलो','gram':'ग्राम','Farm / Pickup Location':'खेत / पिकअप स्थान','Select on Map':'नक्शे पर चुनें','Select Location on Map':'नक्शे पर स्थान चुनें','Confirm Location':'स्थान की पुष्टि करें','Search for a location...':'स्थान खोजें...','Search':'खोज','Click on the map to select a location':'स्थान चुनने के लिए नक्शे पर क्लिक करें','Contact Number':'संपर्क नंबर','Date of Harvesting':'कटाई की तारीख','Expiry Date':'समाप्ति तिथि','Availability Status':'उपलब्धता स्थिति','Expected Selling Price (₹/kg)':'अपेक्षित बिक्री मूल्य (₹/किलो)','Minimum Acceptable Price (₹/kg)':'न्यूनतम स्वीकार्य मूल्य (₹/किलो)','Current Market Price (₹/kg)':'वर्तमान बाज़ार मूल्य (₹/किलो)','Description':'विवरण','Cancel':'रद्द करें','Delete Product':'उत्पाद हटाएँ','Are you sure you want to delete this product?':'क्या आप इस उत्पाद को हटाना चाहते हैं?','Delete':'हटाएँ','No products found':'कोई उपज नहीं मिली','No products added yet':'अभी कोई उपज नहीं जोड़ी गई','Try adjusting your filters or search terms.':'फ़िल्टर या खोज शब्द बदलकर देखें।','Start listing your produce and connect with potential buyers.':'अपनी उपज सूचीबद्ध करें और संभावित खरीदारों से जुड़ें।','Edit':'संपादित करें','Mark Sold':'बिक गया चिह्नित करें','Mark Available':'उपलब्ध चिह्नित करें','Low stock — consider updating your listing.':'कम स्टॉक — अपनी सूची अपडेट करने पर विचार करें।','Wants:':'चाहिए:','Quality:':'गुणवत्ता:','Location:':'स्थान:','Offer Price':'प्रस्ताव मूल्य','Save to Cart':'सहेजें','View Request':'अनुरोध देखें','Good':'अच्छा','Review':'समीक्षा करें','Low':'कम','Market Price':'बाज़ार मूल्य','Above Market':'बाज़ार से अधिक','Below Market':'बाज़ार से कम','Competitive':'प्रतिस्पर्धी','Already in cart':'पहले से सहेजा गया है','Your cart is empty':'आपके सहेजे गए अवसर खाली हैं','Browse Buyer Requests':'खरीदार अनुरोध देखें','Remove':'हटाएँ','View':'देखें','Not Set':'निर्धारित नहीं','No notifications':'कोई सूचना नहीं','Expired':'समाप्त हो गया','Expires today':'आज समाप्त होगा','Expires tomorrow':'कल समाप्त होगा','Expiring soon':'जल्द समाप्त हो रहा है','Expires in':'समाप्ति के दिन','Expiry date must be after harvest date':'समाप्ति तिथि कटाई की तारीख के बाद होनी चाहिए','Maximum 6 images allowed':'अधिकतम 6 छवियाँ ही अनुमत हैं','days':'दिन',
        'Latest Available Market Price':'नवीनतम उपलब्ध बाज़ार मूल्य','Minimum Price':'न्यूनतम मूल्य','Modal Price':'मध्य मूल्य','Maximum Price':'अधिकतम मूल्य','Estimated Market Value':'अनुमानित बाज़ार मूल्य','Nearby Market Prices':'पास के बाज़ार मूल्य','Last Updated':'अंतिम अपडेट','Fetching Latest Market Price':'नवीनतम बाज़ार मूल्य प्राप्त किया जा रहा है...','Market Price Temporarily Unavailable':'बाज़ार मूल्य अस्थायी रूप से उपलब्ध नहीं है।','No Current Market Price Found':'इस फसल के लिए कोई वर्तमान बाज़ार मूल्य नहीं मिला।',
        'Photo Verification':'फोटो सत्यापन',
        'Verifying Produce':'उपज का सत्यापन किया जा रहा है...',
        'Verified':'✓ सत्यापित',
        'Photo Verification Failed':'फोटो सत्यापन विफल',
        'Only fruits and vegetables are allowed':'केवल फलों और सब्जियों की अनुमति है',
        'Image does not match the selected product':'अपलोड की गई छवि चयनित उत्पाद से मेल नहीं खाती',
        'Upload a clear photo':'कृपया फल या सब्जी की एक स्पष्ट फोटो अपलोड करें',
        'Nearby Markets':'पास के बाज़ार',
        'Market Information Unavailable':'बाज़ार की जानकारी उपलब्ध नहीं है',
        'Market Price Dashboard':'बाज़ार मूल्य डैशबोर्ड',
        'Sources':'स्रोत',
        'Please enter a district or market.':'कृपया एक जिला या बाज़ार दर्ज करें।',
        'Use product locations':'उत्पाद स्थानों का उपयोग करें',
        'Not verified':'सत्यापित नहीं',
        'All Requests':'सभी अनुरोध',
        'Active':'सक्रिय',
        'Cancelled':'रद्द किया गया',
        'Cancelled Requests':'रद्द किए गए अनुरोध',
        'Restore Request':'पुनर्स्थापित करें',
        'Request Restored':'अनुरोध पुनर्स्थापित किया गया',
        'Request Cancelled':'अनुरोध रद्द कर दिया गया',
        'Delete Permanently':'स्थायी रूप से हटाएं',
        'Cancel Request':'अनुरोध रद्द करें',
        'No cancelled requests':'कोई रद्द किया गया अनुरोध नहीं',
        'Cancelled requests will appear here.':'रद्द किए गए अनुरोध यहाँ दिखाई देंगे।'
    }
};

Object.assign(translations.en, {
    'Expired':'Expired', 'Expires today':'Expires today', 'Expires tomorrow':'Expires tomorrow', 'Expiring soon':'Expiring soon', 'Expires in':'Expires in', 'days':'days', 'Expiry date must be after harvest date':'Expiry date must be after harvest date', 'Maximum 6 images allowed':'Maximum 6 images allowed',
    'All Requests':'All Requests', 'Active':'Active', 'Cancelled':'Cancelled', 'Cancelled Requests':'Cancelled Requests', 'Restore Request':'Restore Request', 'Request Restored':'Request Restored', 'Request Cancelled':'Request Cancelled', 'Delete Permanently':'Delete Permanently', 'Cancel Request':'Cancel Request', 'No cancelled requests':'No cancelled requests', 'Cancelled requests will appear here.':'Cancelled requests will appear here.',
    'Latest Available Market Price':'Latest Available Market Price','Minimum Price':'Minimum Price','Modal Price':'Modal Price','Maximum Price':'Maximum Price','Estimated Market Value':'Estimated Market Value','Nearby Market Prices':'Nearby Market Prices','Last Updated':'Last Updated','Fetching Latest Market Price':'Fetching latest market price','Market Price Temporarily Unavailable':'Market price temporarily unavailable.','No Current Market Price Found':'No current market price found for this crop.',
    'Photo Verification':'Photo Verification',
    'Verifying Produce':'Verifying produce...',
    'Verified':'✓ Verified',
    'Photo Verification Failed':'Photo Verification Failed',
    'Only fruits and vegetables are allowed':'Only fruits and vegetables are allowed',
    'Image does not match the selected product':'The uploaded image does not match the selected product',
    'Upload a clear photo':'Please upload a clear photo of the fruit or vegetable',
    'Nearby Markets':'Nearby Markets',
    'Market Information Unavailable':'Market information is temporarily unavailable.',
    'Market Price Dashboard':'Market Price Dashboard',
    'Sources':'Sources',
    'Please enter a district or market.':'Please enter a district or market.',
    'Use product locations':'Use product locations',
    'Not verified':'Not verified'
});
Object.assign(translations.ta, { 'Unknown':'தெரியவில்லை', 'Harvested today':'இன்று அறுவடை செய்யப்பட்டது', 'Very Fresh':'மிகப் புதியது', 'Fresh':'புதியது', 'Aging':'பழையதாகிறது', 'Needs Attention':'கவனம் தேவை' });
Object.assign(translations.hi, { 'Unknown':'अज्ञात', 'Harvested today':'आज कटाई की गई', 'Very Fresh':'बहुत ताज़ा', 'Fresh':'ताज़ा', 'Aging':'पुराना हो रहा है', 'Needs Attention':'ध्यान दें' });

const cropTranslations = {
    ta: { Tomato: 'தக்காளி', Onion: 'வெங்காயம்', Banana: 'வாழைப்பழம்', Paddy: 'நெல்', Brinjal: 'கத்தரிக்காய்', Chilli: 'மிளகாய்', Coconut: 'தேங்காய்', Rice: 'அரிசி' },
    hi: { Tomato: 'टमाटर', Onion: 'प्याज़', Banana: 'केला', Paddy: 'धान', Brinjal: 'बैंगन', Chilli: 'मिर्च', Coconut: 'नारियल', Rice: 'चावल' }
};
function productName(name) { return cropTranslations[selectedLanguage]?.[name] || name; }

let selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
let languageReady = false;
const originalText = new WeakMap();

function t(key) { return translations[selectedLanguage]?.[key] || translations.en[key] || key; }

function translateVisibleText() {
    document.querySelectorAll('body *').forEach(element => {
        if (['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA'].includes(element.tagName)) return;
        element.childNodes.forEach(node => {
            if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) return;
            if (!originalText.has(node)) originalText.set(node, node.textContent);
            const source = originalText.get(node); const match = source.trim();
            node.textContent = source.replace(match, t(match));
        });
        if (element.placeholder) {
            if (!element.dataset.originalPlaceholder) element.dataset.originalPlaceholder = element.placeholder;
            element.placeholder = t(element.dataset.originalPlaceholder);
        }
    });
    document.querySelectorAll('option[value="available"], option[value="sold-out"], option[value="expired"]').forEach(option => {
        if (option.value === 'available') option.textContent = t('Available');
        else if (option.value === 'sold-out') option.textContent = t('Sold Out');
        else if (option.value === 'expired') option.textContent = t('Expired');
    });
    document.querySelectorAll('.status-badge').forEach(badge => {
        if (badge.classList.contains('available')) badge.textContent = t('Available');
        else if (badge.classList.contains('sold-out')) badge.textContent = t('Sold Out');
        else if (badge.classList.contains('expired')) badge.textContent = t('Expired');
    });
}

function setLanguage(language) {
    const nextLanguage = translations[language] ? language : 'en';
    if (languageReady && nextLanguage === selectedLanguage && document.documentElement.lang === nextLanguage) return;
    selectedLanguage = nextLanguage;
    localStorage.setItem('selectedLanguage', selectedLanguage);
    document.documentElement.lang = selectedLanguage;
    const selector = document.getElementById('languageSelect');
    if (selector) selector.value = selectedLanguage;
    renderAll(!languageReady);
    languageReady = true;
}

/* ============================ STATE ============================ */
let products = [];
let cart = [];
let editingId = null;
let deletingId = null;
let currentPage = 'dashboard';
let filters = { search: '', status: 'all', grade: 'all', sort: 'newest' };
let lowStockThreshold = localStorage.getItem('lowStockThreshold') ? parseInt(localStorage.getItem('lowStockThreshold')) : 50;
let tempImages = [];
let mapInstance = null;
let mapMarker = null;
let tempLocation = { name: '', lat: null, lng: null };
let galleryImages = [];
let galleryIndex = 0;
let priceDiscoveryLocation = '';
let marketRenderVersion = 0;

let currentBuyerRequestFilter = 'all';

let buyerRequests = [
    { id: 'br1', buyer: 'FreshMart', crop: 'Tomato', quantity: 300, unit: 'kg', grade: 'Grade A', offer: 26, location: 'Madurai', time: '2 hours ago', status: 'active' },
    { id: 'br2', buyer: 'ABC Foods', crop: 'Onion', quantity: 500, unit: 'kg', grade: 'Premium', offer: 30, location: 'Chennai', time: '5 hours ago', status: 'active' },
    { id: 'br3', buyer: 'GreenGrocer', crop: 'Banana', quantity: 200, unit: 'kg', grade: 'Grade A', offer: 34, location: 'Coimbatore', time: '1 day ago', status: 'active' },
    { id: 'br4', buyer: 'Hotel Supreme', crop: 'Chilli', quantity: 100, unit: 'kg', grade: 'Premium', offer: 80, location: 'Madurai', time: '1 day ago', status: 'active' },
    { id: 'br5', buyer: 'Kisan Retail', crop: 'Paddy', quantity: 800, unit: 'kg', grade: 'Standard', offer: 24, location: 'Tirunelveli', time: '2 days ago', status: 'cancelled' }
];

let notifications = [];

// ===== MARKET PRICE =====
const marketPriceAPICache = new Map();
const API_CACHE_TTL = 30 * 60 * 1000;
const inflightMarketRequests = new Map();
const FRONTEND_FETCH_TIMEOUT = 60000; // 60s timeout to kill infinite loading
const marketPriceApiBase = (() => {
    const isLocalHost = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
    const isLocalFile = window.location.protocol === 'file:';
    return (isLocalHost && window.location.port !== '5000') || isLocalFile ? 'http://localhost:5000' : '';
})();

/* ============================ INIT ============================ */
document.addEventListener('DOMContentLoaded', init);

function init() {
    loadProducts();
    loadCart();
    loadBuyerRequests();
    if (products.length === 0) initializeSampleData();
    generateNotifications();
    attachEventListeners();
    setLanguage(selectedLanguage);
    setInterval(checkExpiredProducts, 3600000);
}

/* ============================ STORAGE ============================ */
function saveProducts() { localStorage.setItem('farmerProducts', JSON.stringify(products)); }
function loadProducts() {
    const stored = localStorage.getItem('farmerProducts');
    if (stored) {
        try {
            products = JSON.parse(stored);
            products.forEach(p => {
                if (!p.images) p.images = p.image ? [p.image] : [];
                if (!p.latitude) p.latitude = null;
                if (!p.longitude) p.longitude = null;
                if (!p.expiryDate) p.expiryDate = '';
            });
        } catch { products = []; }
    }
}
function saveCart() { localStorage.setItem('farmerCart', JSON.stringify(cart)); }
function loadCart() {
    const stored = localStorage.getItem('farmerCart');
    if (stored) { try { cart = JSON.parse(stored); } catch { cart = []; } }
}
function saveBuyerRequests() { localStorage.setItem('farmerBuyerRequests', JSON.stringify(buyerRequests)); }
function loadBuyerRequests() {
    const stored = localStorage.getItem('farmerBuyerRequests');
    if (stored) {
        try {
            buyerRequests = JSON.parse(stored);
            buyerRequests.forEach(br => { if (!br.status) br.status = 'active'; });
        } catch { }
    }
}

/* ============================ SAMPLE DATA ============================ */
function initializeSampleData() {
    const today = new Date();
    const daysAgo = (d) => { const dt = new Date(today); dt.setDate(dt.getDate() - d); return dt.toISOString().split('T')[0]; };
    const daysAhead = (d) => { const dt = new Date(today); dt.setDate(dt.getDate() + d); return dt.toISOString().split('T')[0]; };
    products = [
        { id: generateId(), image: '', images: [], name: 'Tomato', quantity: 500, unit: 'kg', location: 'Srivilliputtur, Tamil Nadu', latitude: 9.512, longitude: 77.633, phone: '+91 98765 43210', grade: 'Grade A', harvestDate: daysAgo(3), expiryDate: daysAhead(4), status: 'available', expectedPrice: 25, minimumPrice: 22, description: 'Fresh Grade A tomatoes harvested from our farm. Suitable for wholesale buyers.', createdAt: Date.now() - 3000 },
        { id: generateId(), image: '', images: [], name: 'Onion', quantity: 300, unit: 'kg', location: 'Virudhunagar, Tamil Nadu', latitude: 9.580, longitude: 77.960, phone: '+91 98765 43210', grade: 'Premium', harvestDate: daysAgo(1), expiryDate: daysAhead(10), status: 'available', expectedPrice: 28, minimumPrice: 25, description: 'Premium quality onions, freshly harvested.', createdAt: Date.now() - 2000 },
        { id: generateId(), image: '', images: [], name: 'Banana', quantity: 200, unit: 'kg', location: 'Madurai, Tamil Nadu', latitude: 9.925, longitude: 78.119, phone: '+91 98765 43210', grade: 'Grade A', harvestDate: daysAgo(5), expiryDate: daysAhead(2), status: 'available', expectedPrice: 32, minimumPrice: 28, description: 'Ripe bananas ready for market.', createdAt: Date.now() - 1000 },
        { id: generateId(), image: '', images: [], name: 'Paddy', quantity: 1000, unit: 'kg', location: 'Srivilliputtur, Tamil Nadu', latitude: 9.512, longitude: 77.633, phone: '+91 98765 43210', grade: 'Grade A', harvestDate: daysAgo(0), expiryDate: daysAhead(30), status: 'available', expectedPrice: 30, minimumPrice: 27, description: 'High-quality paddy, freshly harvested.', createdAt: Date.now() - 500 },
        { id: generateId(), image: '', images: [], name: 'Brinjal', quantity: 30, unit: 'kg', location: 'Srivilliputtur, Tamil Nadu', latitude: 9.512, longitude: 77.633, phone: '+91 98765 43210', grade: 'Grade B', harvestDate: daysAgo(12), expiryDate: daysAgo(1), status: 'sold-out', expectedPrice: 18, minimumPrice: 15, description: '', createdAt: Date.now() - 400 }
    ];
    saveProducts();
}
function generateId() { return 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6); }

/* ============================ EXPIRY LOGIC ============================ */
function checkExpiredProducts() {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    let changed = false;
    products.forEach(p => {
        if (p.expiryDate && p.status !== 'sold-out' && p.status !== 'expired') {
            const expiry = new Date(p.expiryDate); expiry.setHours(0, 0, 0, 0);
            if (today >= expiry) { p.status = 'expired'; changed = true; }
        }
    });
    if (changed) { saveProducts(); renderAll(); showToast('Some products have expired and been moved to history.', 'warning'); }
}
function getExpiryInfo(p) {
    if (!p.expiryDate) return { label: '', class: '', days: null };
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const expiry = new Date(p.expiryDate); expiry.setHours(0, 0, 0, 0);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return { label: t('Expired'), class: 'expiry-expired', days: diffDays };
    if (diffDays === 0) return { label: t('Expires today'), class: 'expiry-today', days: 0 };
    if (diffDays === 1) return { label: t('Expires tomorrow'), class: 'expiry-soon', days: 1 };
    if (diffDays <= 3) return { label: `${t('Expires in')} ${diffDays} ${t('days')}`, class: 'expiry-soon', days: diffDays };
    return { label: `${t('Expires in')} ${diffDays} ${t('days')}`, class: 'expiry-normal', days: diffDays };
}

/* ============================ NOTIFICATIONS ============================ */
function generateNotifications() {
    notifications = [
        { id: 'n1', icon: 'bell', title: 'New Buyer Request', text: 'FreshMart offered ₹26/kg for your tomato.', time: '2 hours ago', read: false, type: 'info' },
        { id: 'n2', icon: 'trending-up', title: 'Price Alert', text: 'Tomato market price increased to ₹25/kg.', time: '5 hours ago', read: false, type: 'success' },
        { id: 'n3', icon: 'alert-triangle', title: 'Freshness Alert', text: 'Your brinjal listing has been available for 12 days.', time: '1 day ago', read: false, type: 'warning' },
        { id: 'n4', icon: 'alert-triangle', title: 'Low Stock', text: 'Your brinjal stock is running low (30 kg).', time: '1 day ago', read: true, type: 'warning' }
    ];
    updateNotificationDot();
}
function updateNotificationDot() {
    const dot = document.getElementById('notifDot');
    const unread = notifications.filter(n => !n.read);
    if (unread.length > 0) dot.classList.remove('hidden'); else dot.classList.add('hidden');
}
function renderNotifications() {
    const list = document.getElementById('notifList');
    if (notifications.length === 0) { list.innerHTML = `<div style="padding:24px;text-align:center;color:var(--text-muted);">${t('No notifications')}</div>`; return; }
    list.innerHTML = notifications.map(n => `
        <div class="notif-item ${n.read ? '' : 'unread'}" data-id="${n.id}">
            <span class="notif-icon-sm"><i data-lucide="${n.icon}"></i></span>
            <div class="notif-content">
                <div class="notif-title">${n.title}</div>
                <div class="notif-text">${n.text}</div>
                <div class="notif-time">${n.time}</div>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
    list.querySelectorAll('.notif-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = item.dataset.id;
            const notif = notifications.find(n => n.id === id);
            if (notif) { notif.read = true; updateNotificationDot(); renderNotifications(); }
        });
    });
}

/* ============================ RENDER ALL ============================ */
function renderAll(refreshMarketPrices = true) {
    checkExpiredProducts();
    renderStats();
    renderProducts();
    renderDashboardProducts();
    renderBuyerRequests();
    renderBuyerRequestsPreview();
    renderPriceDiscovery(refreshMarketPrices);
    renderPriceSnapshot();
    renderBestOpportunity();
    renderLogistics();
    renderCart();
    renderNotifications();
    updateCartCount();
    updateBuyerRequestCount();
    translateVisibleText();
    lucide.createIcons();
}

/* ============================ STATS ============================ */
function calculateStats() {
    const total = products.length;
    const available = products.filter(p => p.status === 'available').length;
    const soldOut = products.filter(p => p.status === 'sold-out').length;
    let totalValue = 0; let hasUnpriced = false;
    products.forEach(p => {
        if (p.status !== 'expired') {
            if (p.expectedPrice && p.expectedPrice > 0) totalValue += p.expectedPrice * p.quantity;
            else hasUnpriced = true;
        }
    });
    return { total, available, soldOut, totalValue, hasUnpriced };
}
function renderStats() {
    const stats = calculateStats();
    const grid = document.getElementById('statsGrid');
    grid.innerHTML = `
        <div class="stat-card"><div class="stat-icon"><i data-lucide="package"></i></div><div class="stat-value">${stats.total}</div><div class="stat-label">${t('Total Products Listed')}</div></div>
        <div class="stat-card"><div class="stat-icon"><i data-lucide="check-circle"></i></div><div class="stat-value">${stats.available}</div><div class="stat-label">${t('Currently Available')}</div></div>
        <div class="stat-card danger"><div class="stat-icon"><i data-lucide="x-circle"></i></div><div class="stat-value">${stats.soldOut}</div><div class="stat-label">${t('Sold Out')}</div></div>
        <div class="stat-card info"><div class="stat-icon"><i data-lucide="indian-rupee"></i></div><div class="stat-value">${stats.hasUnpriced && stats.totalValue === 0 ? t('Not Set') : '₹' + stats.totalValue.toLocaleString('en-IN')}</div><div class="stat-label">${t('Estimated Inventory Value')}</div></div>
    `;
}

/* ============================ FRESHNESS ============================ */
function calculateFreshness(harvestDate) {
    if (!harvestDate) return { label: t('Unknown'), class: 'freshness-aging', days: -1 };
    const harvest = new Date(harvestDate);
    const now = new Date();
    const diffTime = now - harvest;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return { label: t('Harvested today'), badge: t('Very Fresh'), class: 'freshness-very-fresh', days: 0 };
    const daysLabel = selectedLanguage === 'ta' ? `${diffDays} நாட்களுக்கு முன் அறுவடை` : selectedLanguage === 'hi' ? `${diffDays} दिन पहले कटाई` : `Harvested ${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffDays <= 3) return { label: daysLabel, badge: t('Fresh'), class: 'freshness-fresh', days: diffDays };
    if (diffDays <= 7) return { label: daysLabel, badge: t('Aging'), class: 'freshness-aging', days: diffDays };
    return { label: daysLabel, badge: t('Needs Attention'), class: 'freshness-attention', days: diffDays };
}

/* ============================ PRODUCT RENDERING ============================ */
function renderProductCard(p) {
    const freshness = calculateFreshness(p.harvestDate);
    const expiry = getExpiryInfo(p);
    const isLowStock = p.status === 'available' && p.quantity < lowStockThreshold;
    const mainImage = p.images && p.images.length > 0 ? p.images[0] : '';
    const imageHTML = mainImage ? `<img src="${mainImage}" class="product-image" alt="${productName(p.name)}" onclick="openGallery('${p.id}')">` : `<div class="product-image-placeholder"><i data-lucide="image"></i></div>`;
    const statusBadge = p.status === 'available' ? t('Available') : p.status === 'sold-out' ? t('Sold Out') : t('Expired');
    const statusClass = p.status;
    const freshnessPct = p.freshnessScore || Math.max(20, 100 - (freshness.days || 1) * 8);
    const shelfLifeLeft = p.estimatedShelfLifeDays || Math.max(1, 8 - (freshness.days || 1));
    const clockClass = freshnessPct > 80 ? '' : freshnessPct > 50 ? 'aging' : 'spoilage-risk';

    return `
        <div class="product-card" data-id="${p.id}">
            <div class="product-image-wrapper">
                ${imageHTML}
                <span class="status-badge ${statusClass}">${statusBadge}</span>
                <span class="freshness-badge ${freshness.class}">${freshness.badge}</span>
                ${p.images && p.images.length > 1 ? `<span class="image-count-badge"><i data-lucide="images"></i> ${p.images.length}</span>` : ''}
            </div>
            <div class="product-body">
                <h3 class="product-name">${escapeHtml(productName(p.name))}</h3>
                <div class="product-location"><i data-lucide="map-pin"></i> ${escapeHtml(p.location)}</div>
                <div class="product-details">
                    <div class="detail-item"><i data-lucide="package"></i> <strong>${p.quantity} ${p.unit}</strong></div>
                    <div class="detail-item"><i data-lucide="star"></i> <strong>${p.grade}</strong></div>
                    <div class="detail-item"><i data-lucide="calendar"></i> <strong>${freshness.label}</strong></div>
                    <div class="detail-item"><i data-lucide="phone"></i> <strong>${escapeHtml(p.phone)}</strong></div>
                </div>
                <div class="freshness-clock-badge ${clockClass}">
                    <i data-lucide="clock"></i> AI Freshness: <strong>${freshnessPct}%</strong> (${shelfLifeLeft}d shelf-life)
                </div>
                ${expiry.label ? `<div class="expiry-indicator ${expiry.class}"><i data-lucide="clock"></i> ${expiry.label}</div>` : ''}
                <div class="product-price-row"><div><div class="product-price">₹${p.expectedPrice}/${p.unit === 'kg' ? 'kg' : 'unit'}</div></div></div>
                ${isLowStock ? `<div class="low-stock-warning"><i data-lucide="alert-triangle"></i> ${t('Low stock — consider updating your listing.')}</div>` : ''}
            </div>
            <div class="product-actions">
                <button class="btn btn-ghost btn-sm" onclick="openEditModal('${p.id}')"><i data-lucide="pencil"></i> ${t('Edit')}</button>
                ${p.status === 'available' ? `<button class="btn btn-warning btn-sm" onclick="markAsSold('${p.id}')">${t('Mark Sold')}</button>` : p.status === 'sold-out' || p.status === 'expired' ? `<button class="btn btn-primary btn-sm" onclick="markAsAvailable('${p.id}')">${t('Mark Available')}</button>` : ''}
                <button class="btn btn-danger btn-sm btn-icon-only" onclick="openDeleteModal('${p.id}')" title="Delete"><i data-lucide="trash-2"></i></button>
            </div>
        </div>
    `;
}
function escapeHtml(str) { if (!str) return ''; const div = document.createElement('div'); div.textContent = str; return div.innerHTML; }

/* ============================ PRODUCTS PAGE ============================ */
function getFilteredProducts() {
    let result = [...products];
    if (filters.search) {
        const q = filters.search.toLowerCase();
        result = result.filter(p => (p.name && (p.name.toLowerCase().includes(q) || productName(p.name).toLowerCase().includes(q))) || (p.location && p.location.toLowerCase().includes(q)) || (p.grade && p.grade.toLowerCase().includes(q)));
    }
    if (filters.status !== 'all') result = result.filter(p => p.status === filters.status);
    else result = result.filter(p => p.status !== 'expired');
    if (filters.grade !== 'all') result = result.filter(p => p.grade === filters.grade);
    switch (filters.sort) {
        case 'newest': result.sort((a, b) => b.createdAt - a.createdAt); break;
        case 'oldest': result.sort((a, b) => a.createdAt - b.createdAt); break;
        case 'qty-high': result.sort((a, b) => b.quantity - a.quantity); break;
        case 'qty-low': result.sort((a, b) => a.quantity - b.quantity); break;
        case 'price-high': result.sort((a, b) => (b.expectedPrice || 0) - (a.expectedPrice || 0)); break;
        case 'price-low': result.sort((a, b) => (a.expectedPrice || 0) - (b.expectedPrice || 0)); break;
    }
    return result;
}
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const filtered = getFilteredProducts();
    if (filtered.length === 0) {
        grid.innerHTML = `<div class="empty-state"><div class="empty-icon"><i data-lucide="sprout"></i></div><div class="empty-title">${t('No products found')}</div><div class="empty-text">${filters.search || filters.status !== 'all' || filters.grade !== 'all' ? t('Try adjusting your filters or search terms.') : t('Start listing your produce and connect with potential buyers.')}</div>${!filters.search && filters.status === 'all' && filters.grade === 'all' ? `<button class="btn btn-primary btn-lg" onclick="openAddModal()"><i data-lucide="plus"></i> ${t('Add Product')}</button>` : ''}</div>`;
    } else { grid.innerHTML = filtered.map(p => renderProductCard(p)).join(''); }
    lucide.createIcons();
}

/* ============================ DASHBOARD PRODUCTS ============================ */
function renderDashboardProducts() {
    const grid = document.getElementById('dashboardProducts');
    let recent = [...products].filter(p => p.status !== 'expired').sort((a, b) => b.createdAt - a.createdAt).slice(0, 4);
    if (recent.length === 0) {
        grid.innerHTML = `<div class="empty-state"><div class="empty-icon"><i data-lucide="sprout"></i></div><div class="empty-title">${t('No products added yet')}</div><div class="empty-text">${t('Start listing your produce and connect with potential buyers.')}</div><button class="btn btn-primary btn-lg" onclick="openAddModal()"><i data-lucide="plus"></i> ${t('Add Product')}</button></div>`;
    } else { grid.innerHTML = recent.map(p => renderProductCard(p)).join(''); }
    lucide.createIcons();
}

/* ============================ BUYER REQUESTS ============================ */
function renderBuyerRequestCard(br) {
    const isSaved = cart.some(item => item.requestId === br.id);
    const isCancelled = br.status === 'cancelled';
    const cardClass = isCancelled ? 'buyer-card cancelled' : 'buyer-card';
    const statusBadge = isCancelled
        ? `<span class="buyer-status-badge cancelled"><i data-lucide="x-circle"></i> ${t('Cancelled')}</span>`
        : `<span class="buyer-status-badge active"><i data-lucide="check-circle"></i> ${t('Active')}</span>`;

    let actionsHTML = '';
    if (isCancelled) {
        actionsHTML = `
            <button class="btn btn-warning btn-sm" onclick="restoreRequest('${br.id}')"><i data-lucide="rotate-ccw"></i> ${t('Restore Request')}</button>
            <button class="btn btn-danger btn-sm btn-icon-only" onclick="deleteBuyerRequestPermanently('${br.id}')" title="${t('Delete Permanently')}"><i data-lucide="trash-2"></i></button>
            <button class="btn btn-ghost btn-sm" onclick="viewRequest('${br.id}')">${t('View Request')}</button>
        `;
    } else {
        actionsHTML = `
            ${isSaved ? `<button class="btn btn-danger btn-sm" onclick="cancelSavedRequest('${br.id}')">${t('Cancel Request')}</button>` : `<button class="btn btn-primary btn-sm" onclick="addToCart('${br.id}')">${t('Save to Cart')}</button>`}
            <button class="btn btn-ghost btn-sm" onclick="viewRequest('${br.id}')">${t('View Request')}</button>
        `;
    }

    return `
        <div class="${cardClass}" data-id="${br.id}">
            <div class="buyer-header">
                <div class="buyer-avatar"><i data-lucide="${isCancelled ? 'x-circle' : 'store'}"></i></div>
                <div><div class="buyer-name">${escapeHtml(br.buyer)}</div><div class="buyer-time">${escapeHtml(br.time)}</div></div>
                ${statusBadge}
            </div>
            <div class="buyer-wants">
                <div class="buyer-want-row"><span>${t('Wants:')}</span><strong>${escapeHtml(productName(br.crop))}</strong></div>
                <div class="buyer-want-row"><span>${t('Quantity')}</span><strong>${br.quantity} ${escapeHtml(br.unit)}</strong></div>
                <div class="buyer-want-row"><span>${t('Quality:')}</span><strong>${escapeHtml(br.grade)}</strong></div>
                <div class="buyer-want-row"><span>${t('Location:')}</span><strong>${escapeHtml(br.location)}</strong></div>
            </div>
            <div class="buyer-offer"><div><div class="offer-label">${t('Offer Price')}</div></div><div class="offer-value">₹${br.offer}/kg</div></div>
            <div class="buyer-actions">
                ${actionsHTML}
            </div>
        </div>
    `;
}
function renderBuyerRequests() {
    const grid = document.getElementById('buyerRequestsGrid');
    if (!grid) return;

    const totalCount = buyerRequests.length;
    const activeCount = buyerRequests.filter(br => br.status !== 'cancelled').length;
    const cancelledCount = buyerRequests.filter(br => br.status === 'cancelled').length;

    const tabsEl = document.getElementById('buyerRequestTabs');
    if (tabsEl) {
        const allTab = tabsEl.querySelector('[data-request-filter="all"]');
        const activeTab = tabsEl.querySelector('[data-request-filter="active"]');
        const cancelledTab = tabsEl.querySelector('[data-request-filter="cancelled"]');
        if (allTab) allTab.innerHTML = `${t('All Requests')} (<span id="countAllRequests">${totalCount}</span>)`;
        if (activeTab) activeTab.innerHTML = `${t('Active')} (<span id="countActiveRequests">${activeCount}</span>)`;
        if (cancelledTab) cancelledTab.innerHTML = `${t('Cancelled')} (<span id="countCancelledRequests">${cancelledCount}</span>)`;
    } else {
        const countAllEl = document.getElementById('countAllRequests');
        const countActiveEl = document.getElementById('countActiveRequests');
        const countCancelledEl = document.getElementById('countCancelledRequests');
        if (countAllEl) countAllEl.textContent = totalCount;
        if (countActiveEl) countActiveEl.textContent = activeCount;
        if (countCancelledEl) countCancelledEl.textContent = cancelledCount;
    }

    let filtered = [...buyerRequests];
    if (currentBuyerRequestFilter === 'active') {
        filtered = filtered.filter(br => br.status !== 'cancelled');
    } else if (currentBuyerRequestFilter === 'cancelled') {
        filtered = filtered.filter(br => br.status === 'cancelled');
    }

    grid.innerHTML = filtered.length ? filtered.map(br => renderBuyerRequestCard(br)).join('') : `<div class="empty-state"><div class="empty-icon"><i data-lucide="inbox"></i></div><div class="empty-title">${currentBuyerRequestFilter === 'cancelled' ? t('No cancelled requests') : t('No buyer requests')}</div><div class="empty-text">${currentBuyerRequestFilter === 'cancelled' ? t('Cancelled requests will appear here.') : t('Connect with buyers looking for your produce.')}</div></div>`;
    lucide.createIcons();
}
function renderBuyerRequestsPreview() {
    const grid = document.getElementById('dashboardBuyerRequests');
    if (!grid) return;
    const activeRequests = buyerRequests.filter(br => br.status !== 'cancelled');
    grid.innerHTML = activeRequests.slice(0, 2).map(br => renderBuyerRequestCard(br)).join('');
    lucide.createIcons();
}

/* ============================ PRICE DISCOVERY ============================ */
function renderPriceSnapshot() {
    const tbody = document.getElementById('priceSnapshotBody');
    const recentProducts = [...products].filter(p => p.status !== 'expired').sort((a, b) => b.createdAt - a.createdAt);
    const cropNames = [...new Set(recentProducts.map(p => p.name))].slice(0, 4);
    if (cropNames.length === 0) { tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:20px;color:var(--text-muted);">Add products to see price comparison</td></tr>`; return; }
    tbody.innerHTML = cropNames.map(name => {
        const product = recentProducts.find(p => p.name === name);
        const priceState = getMarketPriceState(product, priceDiscoveryLocation || product.location);
        const yourPrice = product.expectedPrice || 0;
        const marketPrice = priceState.price;
        const difference = marketPrice === null ? null : yourPrice - marketPrice;
        
        let status, label, priceLabel;
        if (priceState.pending) {
            status = 'review';
            label = t('Loading');
            priceLabel = t('Loading…');
        } else if (priceState.error) {
            status = 'low';
            label = t('Not verified');
            priceLabel = t('Not verified');
        } else if (marketPrice === null) {
            status = 'low';
            label = t('Not verified');
            priceLabel = t('Not verified');
        } else {
            status = difference >= 0 ? 'good' : 'low';
            label = difference >= 0 ? t('Good') : t('Low');
            priceLabel = `₹${marketPrice}/kg`;
        }
        return `<tr><td class="crop-name">${productName(name)}</td><td>${priceLabel}</td><td class="your-price">₹${yourPrice}/kg</td><td><span class="status-pill status-${status}">${label}</span></td></tr>`;
    }).join('');
}
function getMarketPriceState(product, location = product.location) {
    const cacheKey = getMarketCacheKey(product.name, location);
    const cached = marketPriceAPICache.get(cacheKey);
    if (cached) {
        const age = Date.now() - cached.timestamp;
        const ttl = cached.isError ? 10 * 1000 : API_CACHE_TTL; // 10s for errors, 30m for success
        if (age >= ttl) {
            marketPriceAPICache.delete(cacheKey);
            return { price: null, pending: true, error: false };
        }
        return { price: cached.data?.found ? cached.data.price?.value : null, pending: false, error: !!cached.data?.error };
    }
    return { price: null, pending: true, error: false };
}
function renderMarketComparisonDashboard() {
    const tbody = document.getElementById('governmentComparisonBody');
    if (!tbody) return;
    const recentProducts = [...products].filter(p => p.status !== 'expired').sort((a, b) => b.createdAt - a.createdAt);
    const cropNames = [...new Set(recentProducts.map(p => p.name))];
    tbody.innerHTML = cropNames.map(name => {
        const product = recentProducts.find(p => p.name === name);
        const priceState = getMarketPriceState(product, priceDiscoveryLocation || product.location);
        const marketPrice = priceState.price;
        const yourPrice = product.expectedPrice || 0;
        const difference = marketPrice === null ? null : yourPrice - marketPrice;
        
        let priceLabel, result, resultClass;
        if (priceState.pending) {
            priceLabel = t('Loading…');
            result = t('Loading…');
            resultClass = '';
        } else if (priceState.error || marketPrice === null) {
            priceLabel = t('Not verified');
            result = t('Not verified');
            resultClass = 'red';
        } else {
            priceLabel = `₹${marketPrice}/kg`;
            result = difference >= 0 ? `+₹${difference} Profit` : `−₹${Math.abs(difference)} Loss`;
            resultClass = difference >= 0 ? 'green' : 'red';
        }
        return `<tr><td class="crop-name">${productName(name)}</td><td>${priceLabel}</td><td class="your-price">₹${yourPrice}/kg</td><td class="${resultClass}">${result}</td></tr>`;
    }).join('');
}
function renderPriceDiscovery(refreshMarketPrices = true) {
    const renderVersion = ++marketRenderVersion;
    const cardsGrid = document.getElementById('priceCardsGrid');
    const recentProducts = [...products].filter(p => p.status !== 'expired').sort((a, b) => b.createdAt - a.createdAt);
    const cropNames = [...new Set(recentProducts.map(p => p.name))];
    if (cropNames.length === 0) {
        renderMarketComparisonDashboard();
        cardsGrid.innerHTML = `<div class="empty-state"><div class="empty-title">No crops available</div><div class="empty-text">Add a product to view its market price.</div></div>`;
        return;
    }
    renderMarketComparisonDashboard();
    cardsGrid.innerHTML = cropNames.map(name => {
        const product = recentProducts.find(p => p.name === name);
        const location = priceDiscoveryLocation || product.location;
        const cached = marketPriceAPICache.get(getMarketCacheKey(name, location));
        return renderMarketPriceCard(name, product, cached?.data || null, location);
    }).join('');
    lucide.createIcons();
    if (refreshMarketPrices) {
        cropNames.forEach(name => {
            const product = recentProducts.find(p => p.name === name);
            loadMarketPriceForCard(name, product, priceDiscoveryLocation || product.location, renderVersion);
        });
    }
}

/* ============================ MARKET PRICE ============================ */
function getMarketCacheKey(commodity, location = '') {
    const normalise = value => String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\b(dist\.?|district|state|india)\b/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
    return `${normalise(commodity)}|${String(location || '').split(',').map(normalise).filter(Boolean).join('|')}`;
}
function parseMarketLocation(location = '') {
    const parts = location.split(',').map(part => part.trim()).filter(Boolean);
    if (parts.length >= 2) return { district: parts[0], state: parts[parts.length - 1] };
    return { district: parts[0] || '', state: '' };
}
async function fetchMarketPrice(commodity, location = '', product = {}) {
    if (!commodity) return null;
    const cacheKey = getMarketCacheKey(commodity, location);
    const cached = marketPriceAPICache.get(cacheKey);
    if (cached) {
        const age = Date.now() - cached.timestamp;
        const ttl = cached.isError ? 10 * 1000 : API_CACHE_TTL; // 10s for errors, 30m for success
        if (age < ttl) return cached.data;
    }
    if (inflightMarketRequests.has(cacheKey)) return inflightMarketRequests.get(cacheKey);

    const promise = (async () => {
        const params = new URLSearchParams({ product: commodity, location, quantity: product.quantity || 0, unit: product.unit || 'kg', expectedPrice: product.expectedPrice || 0 });
        const url = `${marketPriceApiBase}/api/market-discovery?${params.toString()}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), FRONTEND_FETCH_TIMEOUT);
        try {
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);
            if (!response.ok) {
                let error = null;
                try { error = await response.json(); } catch { }
                throw new Error(error?.error || `Server responded with ${response.status}`);
            }
            let data;
            try { data = await response.json(); } catch { throw new Error('Server returned an invalid response'); }
            if (!data?.error && (data?.found || data?.price?.value === null)) {
                marketPriceAPICache.set(cacheKey, { timestamp: Date.now(), data });
            } else if (data?.error) {
                marketPriceAPICache.set(cacheKey, { timestamp: Date.now(), data, isError: true });
            }
            return data;
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    })().catch(error => {
        console.error('Failed to fetch market price:', error.message);
        const errData = { error: true, product: commodity, message: error.message };
        marketPriceAPICache.set(cacheKey, { timestamp: Date.now(), data: errData, isError: true });
        return errData;
    });

    inflightMarketRequests.set(cacheKey, promise);
    try { return await promise; } finally { inflightMarketRequests.delete(cacheKey); }
}
function normaliseMarketDiscoveryData(data) {
    if (!data || !data.price) return data;
    const mainPrice = data.price.value;
    const nearbyMarkets = (data.nearbyMarkets || []).map(market => ({
        market: market.name, district: market.location || '', state: '', modalPrice: market.price, minPrice: market.price, maxPrice: market.price, date: market.date || ''
    }));
    return {
        ...data,
        found: Boolean(data.found && mainPrice),
        latestAvailablePrice: mainPrice,
        modalPrice: data.modalPrice || mainPrice,
        minimumPrice: data.minimumPrice || null,
        maximumPrice: data.maximumPrice || null,
        market: data.matchedLocation || data.bestMarket?.name || nearbyMarkets[0]?.market || '',
        state: data.location || '',
        district: data.location || '',
        requestedLocation: data.requestedLocation || data.location || '',
        matchedLocation: data.matchedLocation || '',
        isExactLocation: data.isExactLocation !== undefined ? data.isExactLocation : true,
        lastUpdated: data.price.date || data.bestMarket?.date || '',
        nearbyMarkets,
        bestMarket: data.bestMarket ? { market: data.bestMarket.name, district: data.bestMarket.location || '', modalPrice: data.bestMarket.price } : null,
        recommendation: data.recommendation || null
    };
}
function renderMarketPriceCard(name, product, data, location) {
    const cardId = `mp-${name.replace(/\s+/g, '-').toLowerCase()}`;
    if (data && !data.error) data = normaliseMarketDiscoveryData(data);

    // Loading state
    if (!data) {
        return `
            <div class="market-price-card" id="${cardId}">
                <div class="mpc-header"><h3 class="mpc-crop-title">${productName(name)}</h3><span class="mpc-badge">${t('Market Price')}</span></div>
                <div class="mpc-loading"><div class="mpc-spinner"></div><span>${t('Fetching Latest Market Price')} ${location ? `for ${escapeHtml(location)}...` : '...'}</span></div>
            </div>
        `;
    }
    // Error state
    if (data.error) {
        return `
            <div class="market-price-card mpc-error" id="${cardId}">
                <div class="mpc-header"><h3 class="mpc-crop-title">${productName(name)}</h3><span class="mpc-badge">${t('Market Price')}</span></div>
                <div class="mpc-error-msg"><i data-lucide="wifi-off"></i> ${escapeHtml(data.message || t('Market Price Temporarily Unavailable'))}</div>
            </div>
        `;
    }
    // Not found state
    if (!data.found) {
        return `
            <div class="market-price-card mpc-not-found" id="${cardId}">
                <div class="mpc-header"><h3 class="mpc-crop-title">${productName(name)}</h3><span class="mpc-badge">${t('Market Price')}</span></div>
                <div class="mpc-error-msg"><i data-lucide="search-x"></i> ${escapeHtml(data.message || t('No Current Market Price Found'))}</div>
            </div>
        `;
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        const parts = dateStr.split(/[\/\-]/);
        if (parts.length === 3) {
            const day = parts[0].padStart(2, '0'); const month = parts[1].padStart(2, '0'); const year = parts[2].length === 2 ? '20' + parts[2] : parts[2];
            return `${day}/${month}/${year}`;
        }
        return dateStr;
    };

    const quantityKg = product.unit === 'gram' ? (Number(product.quantity) || 0) / 1000 : Number(product.quantity) || 0;
    const estimatedMarketValue = quantityKg * data.modalPrice;
    const expectedPrice = Number(product.expectedPrice) || 0;
    const priceDifference = expectedPrice - data.modalPrice;
    const potentialDifference = quantityKg * priceDifference;
    const locationLabel = data.requestedLocation || location || product.location || '';
    const matchLabel = data.matchedLocation || data.market || '';
    const exactStatus = data.isExactLocation ? 'Exact location' : 'Nearby market';

    // Fallback note if exact location isn't found
    let fallbackNoteHTML = '';
    if (data.isExactLocation === false && data.found) {
        fallbackNoteHTML = `
            <div class="mpc-error-msg" style="background:#fff3cd;color:#856404;border:none;margin:10px 0;">
                <i data-lucide="info"></i> 
                No current price was found for ${escapeHtml(data.requestedLocation)}. Showing the latest available nearby market information: ${escapeHtml(data.matchedLocation || 'Nearby')}.
            </div>
        `;
    }

    let nearbyHTML = '';
    if (data.nearbyMarkets && data.nearbyMarkets.length) {
        nearbyHTML = `
            <div class="mpc-nearby">
                <div class="mpc-nearby-title"><i data-lucide="map-pin"></i> ${t('Nearby Market Prices')}</div>
                ${data.nearbyMarkets.slice(0, 5).map(m => `
                    <div class="mpc-nearby-row">
                        <span class="mpc-nearby-market">${escapeHtml(m.market || m.district || '-')}${m.district && m.market && m.market !== m.district ? ', ' + escapeHtml(m.district) : ''}</span>
                        <span class="mpc-nearby-price">₹${m.modalPrice}/kg</span>
                    </div>
                `).join('')}
                ${data.bestMarket ? `<div class="mpc-nearby-row"><span class="mpc-nearby-market">Best available market: ${escapeHtml(data.bestMarket.market || data.bestMarket.district || '-')}</span><span class="mpc-nearby-price">₹${data.bestMarket.modalPrice}/kg</span></div>` : ''}
            </div>
        `;
    }

    let sourcesHTML = '';
    if (data.sources && data.sources.length) {
        sourcesHTML = `
            <div class="mpc-nearby" style="border-top:1px solid rgba(0,0,0,0.08);padding-top:10px;margin-top:8px;">
                <div class="mpc-nearby-title"><i data-lucide="external-link"></i> ${t('Sources')}</div>
                ${data.sources.slice(0, 5).map(s => `<div class="mpc-nearby-row"><a href="${escapeHtml(s.url)}" target="_blank" rel="noopener" style="color:#2563eb;text-decoration:none;font-size:0.85rem;word-break:break-all;">${escapeHtml(s.title || s.url)}</a></div>`).join('')}
            </div>
        `;
    }

    let trendHTML = '';
    if (data.trend) {
        const isUp = data.trend.direction === 'UPWARD';
        const isDown = data.trend.direction === 'DOWNWARD';
        const cls = isUp ? 'trend-up' : isDown ? 'trend-down' : 'trend-stable';
        const icon = isUp ? 'trending-up' : isDown ? 'trending-down' : 'minus';
        trendHTML = `<span class="trend-badge ${cls}"><i data-lucide="${icon}"></i> 7D: ${isUp ? '+' : ''}${data.trend.forecastPercentage}%</span>`;
    }

    return `
        <div class="market-price-card" id="${cardId}">
            <div class="mpc-header">
                <h3 class="mpc-crop-title">${productName(name)}</h3>
                <div style="display:flex;align-items:center;gap:6px;">
                    ${trendHTML}
                    <span class="mpc-badge">${t('Market Price')}</span>
                </div>
            </div>
            ${locationLabel ? `<div class="mpc-footer"><span><i data-lucide="map-pin"></i> Requested: ${escapeHtml(locationLabel)}</span></div>` : ''}
            ${fallbackNoteHTML}
            <div class="mpc-grid">
                <div class="mpc-item mpc-primary"><span class="mpc-label">${t('Latest Available Market Price')}</span><strong class="mpc-value">₹${data.latestAvailablePrice}/kg</strong></div>
                <div class="mpc-item"><span class="mpc-label">${t('Minimum Price')}</span><strong class="mpc-value mpc-min">₹${data.minimumPrice || '-'}/kg</strong></div>
                <div class="mpc-item mpc-modal"><span class="mpc-label">${t('Modal Price')}</span><strong class="mpc-value">₹${data.modalPrice}/kg</strong></div>
                <div class="mpc-item"><span class="mpc-label">${t('Maximum Price')}</span><strong class="mpc-value mpc-max">₹${data.maximumPrice || '-'}/kg</strong></div>
            </div>
            <div class="mpc-estimate">
                <span class="mpc-label">${t('Estimated Market Value')}</span>
                <strong class="mpc-estimate-value">₹${estimatedMarketValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>
                <span class="mpc-estimate-calc">${quantityKg.toLocaleString('en-IN', { maximumFractionDigits: 2 })} kg × ₹${data.modalPrice}/kg</span>
                <span class="mpc-estimate-calc">Your price: ₹${expectedPrice}/kg · Difference: ${priceDifference >= 0 ? '+' : '−'}₹${Math.abs(priceDifference)}/kg · Potential difference: ${priceDifference >= 0 ? '+' : '−'}₹${Math.abs(potentialDifference).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            ${data.trend?.advice ? `<div class="mpc-nearby" style="background:#f0fdf4;border:1px solid #bbf7d0;"><div class="mpc-nearby-title" style="color:#15803d;"><i data-lucide="sparkles"></i> Predictive Trend Advice</div><div class="mpc-nearby-market" style="font-weight:600;color:#166534;">${escapeHtml(data.trend.advice)}</div></div>` : ''}
            ${nearbyHTML}
            ${data.recommendation ? `<div class="mpc-nearby"><div class="mpc-nearby-title"><i data-lucide="badge-check"></i> Recommended option</div><div class="mpc-nearby-market">${escapeHtml(data.recommendation)}</div></div>` : ''}
            ${sourcesHTML}
            <div class="mpc-footer">
                <span><i data-lucide="calendar"></i> ${t('Last Updated')}: ${formatDate(data.lastUpdated)}</span>
                ${matchLabel ? `<span><i data-lucide="map-pin"></i> Matched: ${escapeHtml(matchLabel)} · ${exactStatus}</span>` : ''}
            </div>
        </div>
    `;
}
async function loadMarketPriceForCard(name, product, location = product.location, renderVersion = marketRenderVersion) {
    const cardId = `mp-${name.replace(/\s+/g, '-').toLowerCase()}`;
    const cardEl = document.getElementById(cardId);
    if (!cardEl || renderVersion !== marketRenderVersion) return;
    
    // Render loading state immediately with location text
    const loadingWrapper = document.createElement('div');
    loadingWrapper.innerHTML = renderMarketPriceCard(name, product, null, location);
    cardEl.replaceWith(loadingWrapper.firstElementChild);

    const cacheKey = getMarketCacheKey(name, location);
    const cached = marketPriceAPICache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < API_CACHE_TTL) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = renderMarketPriceCard(name, product, cached.data, location);
        if (renderVersion === marketRenderVersion) document.getElementById(cardId)?.replaceWith(wrapper.firstElementChild);
        lucide.createIcons();
        renderPriceSnapshot();
        renderMarketComparisonDashboard();
        return;
    }

    let data;
    try {
        data = await fetchMarketPrice(name, location, product);
    } catch (error) {
        data = { error: true, product: name };
    } finally {
        // Always clear loading state and render the final card
        const newCardEl = document.getElementById(cardId);
        if (newCardEl && renderVersion === marketRenderVersion) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = renderMarketPriceCard(name, product, data, location);
            newCardEl.replaceWith(wrapper.firstElementChild);
            lucide.createIcons();
            renderPriceSnapshot();
            renderMarketComparisonDashboard();
        }
    }
}
function invalidateMarketPriceCache(commodity, location = '') {
    marketPriceAPICache.delete(getMarketCacheKey(commodity, location));
}

/* ============================ BEST OPPORTUNITY ============================ */
function renderBestOpportunity() {
    const container = document.getElementById('bestOpportunity');
    const activeRequests = buyerRequests.filter(br => br.status !== 'cancelled');
    if (activeRequests.length === 0) { container.innerHTML = '<div style="padding:24px;text-align:center;color:#fff;">No active opportunities available right now.</div>'; return; }
    const best = [...activeRequests].sort((a, b) => b.offer - a.offer)[0];
    const revenue = best.offer * best.quantity;
    container.innerHTML = `
        <div class="opportunity-badge">🏆 ${t('Best Selling Opportunity')}</div>
        <div class="opportunity-crop">${productName(best.crop)}</div>
        <div class="opportunity-detail">Buyer: <strong>${best.buyer}</strong></div>
        <div class="opportunity-detail">Current best offer: <strong>₹${best.offer}/kg</strong></div>
        <div class="opportunity-detail">Quantity requested: <strong>${best.quantity} ${best.unit}</strong></div>
        <div class="opportunity-revenue"><div class="opportunity-revenue-label">Estimated Revenue</div><div class="opportunity-revenue-value">₹${revenue.toLocaleString('en-IN')}</div></div>
        <button class="btn btn-white btn-sm" onclick="viewRequest('${best.id}')">View Opportunity →</button>
    `;
}

/* ============================ CART & REQUEST ACTIONS ============================ */
function addToCart(requestId) {
    const request = buyerRequests.find(br => br.id === requestId);
    if (!request || request.status === 'cancelled') return;
    if (cart.find(item => item.requestId === requestId)) { showToast(t('Already in cart'), 'warning'); return; }
    cart.push({ id: 'c_' + Date.now(), requestId: requestId, buyer: request.buyer, crop: request.crop, quantity: request.quantity, unit: request.unit, grade: request.grade, offer: request.offer, location: request.location, time: request.time, status: 'Pending' });
    saveCart(); renderCart(); renderBuyerRequests(); renderBuyerRequestsPreview(); updateCartCount();
    showToast(`${productName(request.crop)} ${t('Save to Cart')}`, 'success');
}
function cancelSavedRequest(requestId) {
    const br = buyerRequests.find(item => item.id === requestId);
    if (br) {
        br.status = 'cancelled';
    }
    cart = cart.filter(item => item.requestId !== requestId);
    saveCart();
    saveBuyerRequests();
    closeModal('buyerRequestModal');
    renderAll();
    showToast(t('Request Cancelled'), 'warning');
}
function restoreRequest(requestId) {
    const br = buyerRequests.find(item => item.id === requestId);
    if (br) {
        br.status = 'active';
        saveBuyerRequests();
        closeModal('buyerRequestModal');
        renderAll();
        showToast(t('Request Restored'), 'success');
    }
}
function deleteBuyerRequestPermanently(requestId) {
    buyerRequests = buyerRequests.filter(br => br.id !== requestId);
    cart = cart.filter(item => item.requestId !== requestId);
    saveCart();
    saveBuyerRequests();
    closeModal('buyerRequestModal');
    renderAll();
    showToast('Request deleted permanently', 'info');
}
function removeFromCart(itemId) { const item = cart.find(cartItem => cartItem.id === itemId); if (item) cancelSavedRequest(item.requestId); }
function renderCart() {
    const container = document.getElementById('cartItems');
    if (cart.length === 0) {
        container.innerHTML = `<div class="empty-state"><div class="empty-icon"><i data-lucide="shopping-cart"></i></div><div class="empty-title">${t('Your cart is empty')}</div><div class="empty-text">Save buyer requests here to review later and connect with buyers.</div><button class="btn btn-primary btn-lg" data-page-link="buyer-requests">${t('Browse Buyer Requests')}</button></div>`;
        attachPageLinks(container);
    } else {
        container.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-icon"><i data-lucide="package"></i></div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${productName(item.crop)} — ${item.buyer}</div>
                    <div class="cart-item-meta">
                        <span><i data-lucide="package"></i> ${item.quantity} ${item.unit}</span>
                        <span><i data-lucide="star"></i> ${item.grade}</span>
                        <span><i data-lucide="map-pin"></i> ${item.location}</span>
                        <span><i data-lucide="clock"></i> ${item.time}</span>
                        <span class="status-pill status-good">${item.status}</span>
                    </div>
                </div>
                <div class="cart-item-price"><div class="cart-item-price-value">₹${item.offer}/kg</div><div class="cart-item-price-label">Est. ₹${(item.offer * item.quantity).toLocaleString('en-IN')}</div></div>
                <div class="cart-item-actions">
                    <button class="btn btn-ghost btn-sm" onclick="viewSavedRequest('${item.id}')">${t('View')}</button>
                    <button class="btn btn-danger btn-sm" onclick="cancelSavedRequest('${item.requestId}')">Cancel Request</button>
                </div>
            </div>
        `).join('');
    }
    lucide.createIcons();
}
function updateCartCount() { document.getElementById('cartBadge').textContent = cart.length; }
function updateBuyerRequestCount() { const badge = document.getElementById('buyerBadge'); if (badge) badge.textContent = buyerRequests.length; }

/* ============================ MODAL ============================ */
function openAddModal() { editingId = null; document.getElementById('modalTitle').textContent = t('Add Product'); document.getElementById('modalSubmit').textContent = t('Add Product'); resetForm(); openModal('productModal'); }
function openEditModal(id) {
    const product = products.find(p => p.id === id); if (!product) return;
    editingId = id; document.getElementById('modalTitle').textContent = t('Edit Product'); document.getElementById('modalSubmit').textContent = t('Update Product'); fillForm(product); openModal('productModal');
}
function openModal(modalId) { document.getElementById(modalId).classList.add('show'); document.body.style.overflow = 'hidden'; if (modalId === 'mapModal') setTimeout(initMap, 100); }
function closeModal(modalId) { document.getElementById(modalId).classList.remove('show'); document.body.style.overflow = ''; }
function resetForm() { document.getElementById('productForm').reset(); tempImages = []; document.getElementById('productLatitude').value = ''; document.getElementById('productLongitude').value = ''; renderImagePreviews(); clearErrors(); }
function fillForm(p) {
    document.getElementById('productName').value = p.name || ''; document.getElementById('productQty').value = p.quantity || ''; document.getElementById('productUnit').value = p.unit || 'kg'; document.getElementById('productLocation').value = p.location || ''; document.getElementById('productLatitude').value = p.latitude || ''; document.getElementById('productLongitude').value = p.longitude || ''; document.getElementById('productPhone').value = p.phone || ''; document.getElementById('productGrade').value = p.grade || ''; document.getElementById('productHarvestDate').value = p.harvestDate || ''; document.getElementById('productExpiryDate').value = p.expiryDate || ''; document.getElementById('productStatus').value = p.status || 'available'; document.getElementById('productExpectedPrice').value = p.expectedPrice || ''; document.getElementById('productMinPrice').value = p.minimumPrice || ''; document.getElementById('productDescription').value = p.description || '';
    tempImages = p.images && p.images.length > 0 ? [...p.images] : (p.image ? [p.image] : []); renderImagePreviews(); clearErrors();
}
function clearErrors() { document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(el => el.classList.remove('error')); const errBox = document.getElementById('formErrors'); errBox.classList.remove('show'); errBox.innerHTML = ''; }

/* ============================ FORM VALIDATION & SUBMIT ============================ */
function validateForm() {
    const errors = []; clearErrors();
    const name = document.getElementById('productName').value.trim(); const qty = document.getElementById('productQty').value; const unit = document.getElementById('productUnit').value; const location = document.getElementById('productLocation').value.trim(); const phone = document.getElementById('productPhone').value.trim(); const grade = document.getElementById('productGrade').value; const harvestDate = document.getElementById('productHarvestDate').value; const expiryDate = document.getElementById('productExpiryDate').value; const status = document.getElementById('productStatus').value; const expectedPrice = document.getElementById('productExpectedPrice').value;
    if (!name) { errors.push('Please enter a product name.'); document.getElementById('productName').classList.add('error'); }
    if (!qty || qty <= 0) { errors.push('Please enter a valid quantity.'); document.getElementById('productQty').classList.add('error'); }
    if (!unit) { errors.push('Please select a unit.'); document.getElementById('productUnit').classList.add('error'); }
    if (!location) { errors.push('Please enter a pickup location.'); document.getElementById('productLocation').classList.add('error'); }
    if (!phone) { errors.push('Please enter a contact number.'); document.getElementById('productPhone').classList.add('error'); } else { const cleanPhone = phone.replace(/[\s\-\+]/g, ''); if (!/^[6-9]\d{9}$/.test(cleanPhone) && !/^91[6-9]\d{9}$/.test(cleanPhone)) { errors.push('Please enter a valid Indian phone number.'); document.getElementById('productPhone').classList.add('error'); } }
    if (!grade) { errors.push('Please select a grade.'); document.getElementById('productGrade').classList.add('error'); }
    if (!harvestDate) { errors.push('Please select a harvest date.'); document.getElementById('productHarvestDate').classList.add('error'); }
    if (!expiryDate) { errors.push('Please select an expiry date.'); document.getElementById('productExpiryDate').classList.add('error'); }
    if (harvestDate && expiryDate && new Date(expiryDate) <= new Date(harvestDate)) { errors.push(t('Expiry date must be after harvest date')); document.getElementById('productExpiryDate').classList.add('error'); }
    if (!status) { errors.push('Please select availability status.'); document.getElementById('productStatus').classList.add('error'); }
    if (!expectedPrice || expectedPrice <= 0) { errors.push('Please enter a valid expected selling price.'); document.getElementById('productExpectedPrice').classList.add('error'); }
    return errors;
}
async function handleProductSubmit(e) {
    e.preventDefault(); const errors = validateForm();
    if (errors.length > 0) { const errBox = document.getElementById('formErrors'); errBox.innerHTML = '<strong>Please fix the following:</strong><ul>' + errors.map(e => `<li>${e}</li>`).join('') + '</ul>'; errBox.classList.add('show'); return; }
    const productData = { images: [...tempImages], image: tempImages[0] || '', name: document.getElementById('productName').value.trim(), quantity: parseInt(document.getElementById('productQty').value), unit: document.getElementById('productUnit').value, location: document.getElementById('productLocation').value.trim(), latitude: parseFloat(document.getElementById('productLatitude').value) || null, longitude: parseFloat(document.getElementById('productLongitude').value) || null, phone: document.getElementById('productPhone').value.trim(), grade: document.getElementById('productGrade').value, harvestDate: document.getElementById('productHarvestDate').value, expiryDate: document.getElementById('productExpiryDate').value, status: document.getElementById('productStatus').value, expectedPrice: parseFloat(document.getElementById('productExpectedPrice').value), minimumPrice: parseFloat(document.getElementById('productMinPrice').value) || 0, description: document.getElementById('productDescription').value.trim() };
    if (tempImages.length) {
        const submitButton = document.getElementById('modalSubmit'); submitButton.disabled = true; submitButton.textContent = t('Verifying Produce');
        const controller = new AbortController(); const timeoutId = setTimeout(() => controller.abort(), FRONTEND_FETCH_TIMEOUT);
        try {
            const response = await fetch(`${marketPriceApiBase}/api/verify-produce`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ product: productData.name, images: tempImages }), signal: controller.signal });
            clearTimeout(timeoutId);
            let verification; try { verification = await response.json(); } catch { throw new Error('Server returned an invalid response. Please ensure the backend is running and try again.'); }
            if (!response.ok) throw new Error(verification?.error || 'Photo verification is temporarily unavailable. Please try again.');
            if (!verification.valid) { const message = verification.uncertain ? 'Unable to confidently verify this image. Please upload a clearer photo of your produce.' : (verification.message || `Image verification failed. The uploaded image does not appear to match ${productData.name}.`); document.getElementById('formErrors').innerHTML = `<strong>${escapeHtml(message)}</strong>`; document.getElementById('formErrors').classList.add('show'); return; }
            showToast(t('Verified'), 'success');
            productData.freshnessScore = verification.freshnessScore;
            productData.estimatedShelfLifeDays = verification.estimatedShelfLifeDays;
            if (verification.qualityGrade) productData.grade = verification.qualityGrade;
        } catch (error) {
            clearTimeout(timeoutId); let message = error.message;
            if (error.name === 'AbortError') message = 'Photo verification is taking too long. Please try again.';
            else if (message === 'Failed to fetch' || message.includes('NetworkError') || message.includes('Load failed')) message = 'Cannot connect to the verification service. Please ensure the backend server is running on port 5000 and try again.';
            document.getElementById('formErrors').innerHTML = `<strong>${escapeHtml(message)}</strong>`; document.getElementById('formErrors').classList.add('show'); return;
        } finally { submitButton.disabled = false; submitButton.textContent = editingId ? t('Update Product') : t('Add Product'); }
    }
    if (editingId) {
        const idx = products.findIndex(p => p.id === editingId); const oldProduct = idx !== -1 ? products[idx] : null;
        if (idx !== -1) products[idx] = { ...products[idx], ...productData };
        saveProducts(); renderAll(); showToast('✓ Product updated successfully!', 'success');
        if (oldProduct && (oldProduct.name !== productData.name || oldProduct.location !== productData.location)) { invalidateMarketPriceCache(productData.name, productData.location); if (oldProduct.name !== productData.name) invalidateMarketPriceCache(oldProduct.name, oldProduct.location); }
    } else { productData.id = generateId(); productData.createdAt = Date.now(); products.push(productData); saveProducts(); renderAll(); showToast('✓ Product added successfully!', 'success'); }
    closeModal('productModal'); resetForm();
}

/* ============================ MULTI-IMAGE UPLOAD ============================ */
function handleImageUpload(input) {
    const files = Array.from(input.files); if (!files.length) return;
    if (tempImages.length + files.length > 6) { showToast(t('Maximum 6 images allowed'), 'warning'); return; }
    const acceptedFiles = [];
    for (const file of files) {
        if (file.size > 2 * 1024 * 1024) {
            showToast('Image size exceeds 2MB', 'error');
            continue;
        }
        const type = (file.type || '').toLowerCase();
        const name = (file.name || '').toLowerCase();
        if (type && !type.startsWith('image/')) {
            showToast('Each image must be a valid image file.', 'error');
            continue;
        }
        acceptedFiles.push(file);
    }
    if (acceptedFiles.length === 0) {
        input.value = '';
        return;
    }
    let loadedCount = 0;
    acceptedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            tempImages.push(e.target.result);
            loadedCount++;
            if (loadedCount === acceptedFiles.length) renderImagePreviews();
        };
        reader.readAsDataURL(file);
    });
    input.value = '';
}
function removeImage(index) { tempImages.splice(index, 1); renderImagePreviews(); }
function renderImagePreviews() {
    const grid = document.getElementById('imagePreviewGrid');
    if (tempImages.length === 0) { grid.innerHTML = ''; return; }
    grid.innerHTML = tempImages.map((img, idx) => `<div class="image-preview-item"><img src="${img}" alt="Preview ${idx + 1}"><button type="button" class="image-remove-btn" onclick="removeImage(${idx})"><i data-lucide="x"></i></button></div>`).join('');
    lucide.createIcons();
}

/* ============================ IMAGE GALLERY ============================ */
function openGallery(productId) {
    const product = products.find(p => p.id === productId); if (!product || !product.images || product.images.length === 0) return;
    galleryImages = product.images; galleryIndex = 0; updateGalleryImage(); document.getElementById('lightbox').classList.add('show'); document.body.style.overflow = 'hidden'; lucide.createIcons();
}
function closeGallery() { document.getElementById('lightbox').classList.remove('show'); document.body.style.overflow = ''; }
function changeGalleryImage(direction) { galleryIndex += direction; if (galleryIndex >= galleryImages.length) galleryIndex = 0; if (galleryIndex < 0) galleryIndex = galleryImages.length - 1; updateGalleryImage(); }
function updateGalleryImage() { document.getElementById('lightboxImage').src = galleryImages[galleryIndex]; document.getElementById('lightboxCounter').textContent = `${galleryIndex + 1} / ${galleryImages.length}`; }

/* ============================ MAP LOGIC ============================ */
function initMap() {
    if (mapInstance) { mapInstance.remove(); mapInstance = null; }
    const defaultLat = 9.9252; const defaultLng = 78.1198;
    mapInstance = L.map('leafletMap').setView([defaultLat, defaultLng], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(mapInstance);
    const lat = parseFloat(document.getElementById('productLatitude').value); const lng = parseFloat(document.getElementById('productLongitude').value);
    if (lat && lng) { mapInstance.setView([lat, lng], 13); mapMarker = L.marker([lat, lng]).addTo(mapInstance); tempLocation = { name: document.getElementById('productLocation').value, lat, lng }; document.getElementById('mapSelectedInfo').innerHTML = `<i data-lucide="map-pin"></i> ${tempLocation.name || 'Location selected'}`; }
    else { document.getElementById('mapSelectedInfo').innerHTML = `<i data-lucide="map-pin"></i> ${t('Click on the map to select a location')}`; }
    mapInstance.on('click', function(e) {
        if (mapMarker) mapInstance.removeLayer(mapMarker);
        mapMarker = L.marker(e.latlng).addTo(mapInstance);
        tempLocation = { name: '', lat: e.latlng.lat, lng: e.latlng.lng };
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`).then(r => r.json()).then(d => { const addr = d.display_name || `${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`; tempLocation.name = addr; document.getElementById('mapSelectedInfo').innerHTML = `<i data-lucide="map-pin"></i> ${addr}`; lucide.createIcons(); }).catch(() => { const addr = `${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`; tempLocation.name = addr; document.getElementById('mapSelectedInfo').innerHTML = `<i data-lucide="map-pin"></i> ${addr}`; lucide.createIcons(); });
    });
    lucide.createIcons();
}
function searchLocation() {
    const query = document.getElementById('mapSearchInput').value.trim(); if (!query) return;
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`).then(r => r.json()).then(d => { if (d && d.length > 0) { const lat = parseFloat(d[0].lat); const lng = parseFloat(d[0].lon); mapInstance.setView([lat, lng], 13); if (mapMarker) mapInstance.removeLayer(mapMarker); mapMarker = L.marker([lat, lng]).addTo(mapInstance); tempLocation = { name: d[0].display_name, lat, lng }; document.getElementById('mapSelectedInfo').innerHTML = `<i data-lucide="map-pin"></i> ${d[0].display_name}`; lucide.createIcons(); } else { showToast('Location not found', 'warning'); } }).catch(() => showToast('Error searching location', 'error'));
}
function confirmLocation() { if (!tempLocation.lat || !tempLocation.lng) { showToast('Please select a location on the map', 'warning'); return; } document.getElementById('productLocation').value = tempLocation.name; document.getElementById('productLatitude').value = tempLocation.lat; document.getElementById('productLongitude').value = tempLocation.lng; closeModal('mapModal'); }

/* ============================ DELETE ============================ */
function openDeleteModal(id) { deletingId = id; const product = products.find(p => p.id === id); document.getElementById('deleteProductName').textContent = product ? product.name : ''; openModal('deleteModal'); }
function confirmDelete() { if (!deletingId) return; products = products.filter(p => p.id !== deletingId); saveProducts(); renderAll(); closeModal('deleteModal'); showToast('✓ Product deleted successfully!', 'success'); deletingId = null; }

/* ============================ STATUS TOGGLE ============================ */
function markAsSold(id) { const product = products.find(p => p.id === id); if (product) { product.status = 'sold-out'; saveProducts(); renderAll(); showToast('✓ Product marked as sold', 'success'); } }
function markAsAvailable(id) { const product = products.find(p => p.id === id); if (product) { product.status = 'available'; saveProducts(); renderAll(); showToast('✓ Product marked as available', 'success'); } }

/* ============================ VIEW REQUEST ============================ */
function viewRequest(id) {
    const request = buyerRequests.find(br => br.id === id); if (!request) return;
    const isSaved = cart.some(item => item.requestId === id);
    const isCancelled = request.status === 'cancelled';

    let statusHeaderHTML = isCancelled
        ? `<div class="status-pill status-low" style="margin-bottom:12px;display:inline-flex;align-items:center;gap:4px;"><i data-lucide="x-circle"></i> ${t('Cancelled')}</div>`
        : `<div class="status-pill status-good" style="margin-bottom:12px;display:inline-flex;align-items:center;gap:4px;"><i data-lucide="check-circle"></i> ${t('Active')}</div>`;

    document.getElementById('buyerRequestDetails').innerHTML = `${statusHeaderHTML}<div class="request-buyer"><i data-lucide="store"></i><div><strong>${escapeHtml(request.buyer)}</strong><span>${escapeHtml(request.time)}</span></div></div><div class="request-detail-row"><span>Product</span><strong>${escapeHtml(productName(request.crop))}</strong></div><div class="request-detail-row"><span>Quantity</span><strong>${request.quantity} ${escapeHtml(request.unit)}</strong></div><div class="request-detail-row"><span>Quality</span><strong>${escapeHtml(request.grade)}</strong></div><div class="request-detail-row"><span>Pickup location</span><strong>${escapeHtml(request.location)}</strong></div><div class="request-total"><span>Offer price</span><strong>₹${request.offer}/kg</strong><small>Estimated value: ₹${(request.offer * request.quantity).toLocaleString('en-IN')}</small></div>`;

    const saveButton = document.getElementById('buyerRequestSave');
    const cancelButton = document.getElementById('buyerRequestCancel');
    const restoreButton = document.getElementById('buyerRequestRestore');

    saveButton.dataset.requestId = id;
    cancelButton.dataset.requestId = id;
    if (restoreButton) restoreButton.dataset.requestId = id;

    if (isCancelled) {
        saveButton.hidden = true;
        cancelButton.hidden = true;
        if (restoreButton) restoreButton.hidden = false;
    } else {
        if (restoreButton) restoreButton.hidden = true;
        saveButton.hidden = isSaved;
        cancelButton.hidden = !isSaved;
    }

    openModal('buyerRequestModal');
    lucide.createIcons();
}
function viewSavedRequest(itemId) { const item = cart.find(cartItem => cartItem.id === itemId); if (item) viewRequest(item.requestId); }

/* ============================ TOAST ============================ */
function showToast(message, type = 'success') {
    message = t(message); const container = document.getElementById('toastContainer'); const toast = document.createElement('div');
    toast.className = `toast ${type}`; const icons = { success: 'check-circle', error: 'x-circle', warning: 'alert-triangle', info: 'info' };
    toast.innerHTML = `<span class="toast-icon"><i data-lucide="${icons[type] || 'check-circle'}"></i></span><span class="toast-content">${message}</span><button class="toast-close"><i data-lucide="x"></i></button>`;
    container.appendChild(toast); lucide.createIcons();
    const removeToast = () => { toast.style.opacity = '0'; toast.style.transform = 'translateX(40px)'; setTimeout(() => toast.remove(), 300); };
    toast.querySelector('.toast-close').addEventListener('click', removeToast); setTimeout(removeToast, 4000);
}

/* ============================ NAVIGATION ============================ */
function switchPage(page) {
    if (page === 'add-product') { openAddModal(); return; }
    currentPage = page; document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + page); if (target) target.classList.add('active');
    document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.page === page));
    document.getElementById('sidebar').classList.remove('open'); document.getElementById('sidebarOverlay').classList.remove('show');
    if (page === 'logistics') renderLogistics();
    window.scrollTo(0, 0); lucide.createIcons();
}

/* ============================ EVENT LISTENERS ============================ */
function attachEventListeners() {
    document.getElementById('languageSelect').addEventListener('change', (e) => setLanguage(e.target.value));
    document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', (e) => { e.preventDefault(); switchPage(item.dataset.page); }));
    attachPageLinks(document);
    document.getElementById('hamburger').addEventListener('click', () => { document.getElementById('sidebar').classList.add('open'); document.getElementById('sidebarOverlay').classList.add('show'); });
    document.getElementById('sidebarClose').addEventListener('click', () => { document.getElementById('sidebar').classList.remove('open'); document.getElementById('sidebarOverlay').classList.remove('show'); });
    document.getElementById('sidebarOverlay').addEventListener('click', () => { document.getElementById('sidebar').classList.remove('open'); document.getElementById('sidebarOverlay').classList.remove('show'); });
    document.getElementById('globalSearch').addEventListener('input', (e) => { filters.search = e.target.value; if (currentPage !== 'products' && e.target.value) { switchPage('products'); setTimeout(() => document.getElementById('globalSearch').focus(), 50); } renderProducts(); });
    document.getElementById('filterStatus').addEventListener('change', (e) => { filters.status = e.target.value; renderProducts(); });
    document.getElementById('filterGrade').addEventListener('change', (e) => { filters.grade = e.target.value; renderProducts(); });
    document.getElementById('filterSort').addEventListener('change', (e) => { filters.sort = e.target.value; renderProducts(); });
    document.getElementById('clearFilters').addEventListener('click', () => { filters = { search: '', status: 'all', grade: 'all', sort: 'newest' }; document.getElementById('filterStatus').value = 'all'; document.getElementById('filterGrade').value = 'all'; document.getElementById('filterSort').value = 'newest'; document.getElementById('globalSearch').value = ''; renderProducts(); });

    const priceLocationInput = document.getElementById('priceDiscoveryLocation');
    const applyPriceLocation = () => {
        const loc = priceLocationInput.value.trim().replace(/\s*,\s*/g, ', ').replace(/\s+/g, ' ');
        if (!loc) {
            showToast(t('Please enter a district or market.'), 'warning');
            return;
        }
        priceDiscoveryLocation = loc;
        priceLocationInput.value = loc;
        renderPriceDiscovery();
    };
    document.getElementById('priceLocationApply').addEventListener('click', applyPriceLocation);
    priceLocationInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); applyPriceLocation(); } });
    document.getElementById('priceLocationClear').addEventListener('click', () => {
        priceDiscoveryLocation = '';
        priceLocationInput.value = '';
        renderPriceDiscovery();
    });

    document.getElementById('welcomeAddBtn').addEventListener('click', openAddModal);
    document.getElementById('productsAddBtn').addEventListener('click', openAddModal);
    document.getElementById('modalClose').addEventListener('click', () => closeModal('productModal'));
    document.getElementById('modalCancel').addEventListener('click', () => closeModal('productModal'));
    document.getElementById('productModal').addEventListener('click', (e) => { if (e.target.id === 'productModal') closeModal('productModal'); });
    document.getElementById('deleteCancel').addEventListener('click', () => closeModal('deleteModal'));
    document.getElementById('deleteConfirm').addEventListener('click', confirmDelete);
    document.getElementById('deleteModal').addEventListener('click', (e) => { if (e.target.id === 'deleteModal') closeModal('deleteModal'); });
    document.getElementById('buyerRequestClose').addEventListener('click', () => closeModal('buyerRequestModal'));
    document.getElementById('buyerRequestDismiss').addEventListener('click', () => closeModal('buyerRequestModal'));
    document.getElementById('buyerRequestSave').addEventListener('click', (e) => { addToCart(e.currentTarget.dataset.requestId); closeModal('buyerRequestModal'); });
    document.getElementById('buyerRequestCancel').addEventListener('click', (e) => cancelSavedRequest(e.currentTarget.dataset.requestId));
    document.getElementById('buyerRequestRestore')?.addEventListener('click', (e) => restoreRequest(e.currentTarget.dataset.requestId));
    document.getElementById('buyerRequestModal').addEventListener('click', (e) => { if (e.target.id === 'buyerRequestModal') closeModal('buyerRequestModal'); });

    document.querySelectorAll('#buyerRequestTabs .request-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('#buyerRequestTabs .request-tab').forEach(t => t.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentBuyerRequestFilter = e.currentTarget.dataset.requestFilter;
            renderBuyerRequests();
        });
    });

    document.getElementById('productForm').addEventListener('submit', handleProductSubmit);
    document.getElementById('imageUploadArea').addEventListener('click', () => document.getElementById('imageInput').click());
    document.getElementById('imageInput').addEventListener('change', (e) => handleImageUpload(e.target));
    document.getElementById('openMapBtn').addEventListener('click', () => openModal('mapModal'));
    document.getElementById('mapModalClose').addEventListener('click', () => closeModal('mapModal'));
    document.getElementById('mapCancel').addEventListener('click', () => closeModal('mapModal'));
    document.getElementById('mapConfirm').addEventListener('click', confirmLocation);
    document.getElementById('mapSearchBtn').addEventListener('click', searchLocation);
    document.getElementById('mapSearchInput').addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); searchLocation(); } });
    document.getElementById('lightboxClose').addEventListener('click', closeGallery);
    document.getElementById('lightboxPrev').addEventListener('click', () => changeGalleryImage(-1));
    document.getElementById('lightboxNext').addEventListener('click', () => changeGalleryImage(1));
    document.getElementById('notifBtn').addEventListener('click', (e) => { e.stopPropagation(); document.getElementById('notifPanel').classList.toggle('show'); });
    document.addEventListener('click', (e) => { const panel = document.getElementById('notifPanel'); if (!panel.contains(e.target) && !document.getElementById('notifBtn').contains(e.target)) { panel.classList.remove('show'); } });
    document.getElementById('notifClear').addEventListener('click', () => { notifications.forEach(n => n.read = true); updateNotificationDot(); renderNotifications(); showToast('All notifications marked as read', 'success'); });
    document.getElementById('logoutBtn').addEventListener('click', (e) => { e.preventDefault(); showToast('Logged out successfully', 'success'); });
    document.getElementById('globalVoiceBtn')?.addEventListener('click', () => startVoiceRecognition('search'));
    document.getElementById('modalVoiceBtn')?.addEventListener('click', () => startVoiceRecognition('modal'));

    document.getElementById('lowStockSetting').value = lowStockThreshold;
    document.getElementById('lowStockSetting').addEventListener('change', (e) => { lowStockThreshold = parseInt(e.target.value) || 50; localStorage.setItem('lowStockThreshold', lowStockThreshold); renderProducts(); renderDashboardProducts(); showToast('Low stock threshold updated', 'success'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeModal('productModal'); closeModal('deleteModal'); closeModal('mapModal'); closeModal('profileModal'); closeGallery(); document.getElementById('notifPanel').classList.remove('show'); } if (document.getElementById('lightbox').classList.contains('show')) { if (e.key === 'ArrowLeft') changeGalleryImage(-1); if (e.key === 'ArrowRight') changeGalleryImage(1); } });
}
function attachPageLinks(container) { container.querySelectorAll('[data-page-link]').forEach(el => el.addEventListener('click', (e) => { e.preventDefault(); switchPage(el.dataset.pageLink); })); }

/* ============================ FARM-TO-MANDI LOGISTICS POOLING ============================ */
let villageLogisticsPools = [
    { id: 'pool1', route: 'Srivilliputtur ➔ Virudhunagar Mandi', distance: '38 km', filled: 3600, capacity: 5000, savingsPerKg: '₹1.80', departure: 'Tomorrow 6:00 AM', farmersJoined: 3 },
    { id: 'pool2', route: 'Madurai ➔ Chennai Central Wholesale', distance: '460 km', filled: 7200, capacity: 10000, savingsPerKg: '₹4.50', departure: 'Sep 3, 4:00 PM', farmersJoined: 6 },
    { id: 'pool3', route: 'Coimbatore ➔ Bengaluru APMC Market', distance: '360 km', filled: 4100, capacity: 8000, savingsPerKg: '₹3.20', departure: 'Sep 2, 8:00 AM', farmersJoined: 4 }
];

function renderLogistics() {
    const grid = document.getElementById('logisticsGrid');
    if (!grid) return;
    grid.innerHTML = villageLogisticsPools.map(pool => {
        const pct = Math.round((pool.filled / pool.capacity) * 100);
        return `
            <div class="logistics-card">
                <div class="logistics-route"><i data-lucide="truck"></i> ${escapeHtml(pool.route)}</div>
                <div style="font-size:0.82rem;color:var(--text-muted);"><i data-lucide="navigation"></i> Distance: ${pool.distance} · Departs: <strong>${pool.departure}</strong></div>
                <div class="logistics-progress-bar">
                    <div class="logistics-progress-fill" style="width: ${pct}%;"></div>
                </div>
                <div class="logistics-capacity-text">
                    <span><strong>${pool.filled.toLocaleString()} kg</strong> / ${pool.capacity.toLocaleString()} kg (${pct}%)</span>
                    <span class="savings-pill">Save ${pool.savingsPerKg}/kg</span>
                </div>
                <div style="font-size:0.8rem;color:var(--text-secondary);"><i data-lucide="users"></i> <strong>${pool.farmersJoined} farmers</strong> currently sharing load</div>
                <button class="btn btn-primary btn-sm" onclick="joinLogisticsPool('${pool.id}')"><i data-lucide="plus-circle"></i> Reserve Freight Space</button>
            </div>
        `;
    }).join('');
    lucide.createIcons();
}

function joinLogisticsPool(poolId) {
    const pool = villageLogisticsPools.find(p => p.id === poolId);
    if (pool) {
        pool.filled += 200;
        pool.farmersJoined += 1;
        renderLogistics();
        showToast(`Space reserved in freight pool for ${pool.route}! Transport saving: ${pool.savingsPerKg}/kg.`, 'success');
    }
}

/* ============================ KISAN VOICE ASSISTANT ============================ */
function startVoiceRecognition(targetSource = 'search') {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        showToast('Voice Assistant is not supported in this browser. Try Chrome or Edge.', 'warning');
        return;
    }
    const recognition = new SpeechRecognition();
    const langCode = selectedLanguage === 'ta' ? 'ta-IN' : selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
    recognition.lang = langCode;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const btn = targetSource === 'modal' ? document.getElementById('modalVoiceBtn') : document.getElementById('globalVoiceBtn');
    if (btn) btn.classList.add('listening');

    showToast(`Listening in ${selectedLanguage.toUpperCase()}... Speak your produce details.`, 'info');

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        if (btn) btn.classList.remove('listening');
        showToast(`Heard: "${text}"`, 'success');

        if (targetSource === 'modal') {
            parseSpokenProductDetails(text);
        } else {
            document.getElementById('globalSearch').value = text;
            filters.search = text;
            switchPage('products');
            renderProducts();
        }
    };

    recognition.onerror = (event) => {
        if (btn) btn.classList.remove('listening');
        showToast('Voice recognition ended or failed. Try again.', 'warning');
    };

    recognition.onend = () => {
        if (btn) btn.classList.remove('listening');
    };

    recognition.start();
}

/* ============================ EDIT PROFILE ============================ */
const DEFAULT_PROFILE = {
    name: 'Rajesh Kumar',
    location: 'Srivilliputtur, Tamil Nadu',
    phone: '+91 98765 43210',
    farmerId: 'FL-2026-0142',
    crops: 'Tomato, Onion, Paddy'
};

function loadFarmerProfile() {
    const stored = localStorage.getItem('farmerProfile');
    if (stored) {
        try { return Object.assign({}, DEFAULT_PROFILE, JSON.parse(stored)); }
        catch { return { ...DEFAULT_PROFILE }; }
    }
    return { ...DEFAULT_PROFILE };
}

function saveFarmerProfile(data) {
    localStorage.setItem('farmerProfile', JSON.stringify(data));
}

function renderProfileDisplay() {
    const p = loadFarmerProfile();
    const nameEl = document.getElementById('profileDisplayName');
    const locEl  = document.getElementById('profileDisplayLocation');
    const phEl   = document.getElementById('profileDisplayPhone');
    const idEl   = document.getElementById('profileDisplayId');
    const crEl   = document.getElementById('profileDisplayCrops');
    if (nameEl) nameEl.textContent = p.name;
    if (locEl)  locEl.textContent  = p.location;
    if (phEl)   phEl.textContent   = p.phone;
    if (idEl)   idEl.textContent   = p.farmerId;
    if (crEl)   crEl.textContent   = p.crops;
    // Sync sidebar
    const sidebarName = document.querySelector('.profile-name');
    if (sidebarName) sidebarName.textContent = p.name.split(' ')[0] || p.name;
}

function openProfileModal() {
    const p = loadFarmerProfile();
    document.getElementById('profileName').value     = p.name;
    document.getElementById('profileLocation').value = p.location;
    document.getElementById('profilePhone').value    = p.phone;
    document.getElementById('profileFarmerId').value = p.farmerId;
    document.getElementById('profileCrops').value    = p.crops;
    document.getElementById('profileFormErrors').innerHTML = '';
    openModal('profileModal');
}

document.addEventListener('DOMContentLoaded', () => {
    renderProfileDisplay();

    document.getElementById('editProfileBtn')?.addEventListener('click', openProfileModal);
    document.getElementById('profileModalClose')?.addEventListener('click', () => closeModal('profileModal'));
    document.getElementById('profileModalCancel')?.addEventListener('click', () => closeModal('profileModal'));

    document.getElementById('profileForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name     = document.getElementById('profileName').value.trim();
        const location = document.getElementById('profileLocation').value.trim();
        const phone    = document.getElementById('profilePhone').value.trim();
        const farmerId = document.getElementById('profileFarmerId').value.trim();
        const crops    = document.getElementById('profileCrops').value.trim();
        const errEl    = document.getElementById('profileFormErrors');

        if (!name || !location || !phone) {
            errEl.innerHTML = '<p style="color:var(--danger);">Please fill in all required fields.</p>';
            return;
        }
        errEl.innerHTML = '';

        saveFarmerProfile({ name, location, phone, farmerId, crops });
        renderProfileDisplay();
        closeModal('profileModal');
        showToast('Profile updated successfully!', 'success');
    });
});

function parseSpokenProductDetails(text) {
    openAddModal();
    const lower = text.toLowerCase();
    
    // Crop matching
    const crops = ['tomato', 'onion', 'banana', 'paddy', 'brinjal', 'chilli', 'potato', 'carrot'];
    for (const c of crops) {
        if (lower.includes(c) || lower.includes(productName(c).toLowerCase())) {
            document.getElementById('productName').value = c.charAt(0).toUpperCase() + c.slice(1);
            break;
        }
    }

    // Quantity regex
    const qtyMatch = text.match(/(\d+)\s*(kg|kilo|gram|g|quintal)/i) || text.match(/(\d+)/);
    if (qtyMatch) {
        document.getElementById('productQty').value = qtyMatch[1];
    }

    // Price regex
    const priceMatch = text.match(/(?:rupee|rupees|rs|\₹)\s*(\d+)/i) || text.match(/(\d+)\s*(?:rupees|rs)/i);
    if (priceMatch) {
        document.getElementById('productExpectedPrice').value = priceMatch[1];
    }

    // Location matching
    const locs = ['madurai', 'virudhunagar', 'srivilliputtur', 'chennai', 'coimbatore'];
    for (const l of locs) {
        if (lower.includes(l)) {
            document.getElementById('productLocation').value = l.charAt(0).toUpperCase() + l.slice(1) + ', Tamil Nadu';
            break;
        }
    }
}
