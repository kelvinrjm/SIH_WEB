/* FarmLink Global Voice Chatbot Integration */

class FarmChatbot {
    constructor() {
        this.isOpen = false;
        this.recognition = null;
        this.isListening = false;
        this.lastInputWasVoice = false;
        this.init();
    }

    init() {
        this.ensureStylesLoaded();

        // Inject HTML
        const container = document.createElement('div');
        container.id = 'farmBotContainer';
        container.innerHTML = `
            <div id="farmBotWindow" class="hidden">
                <div class="bot-header">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <i data-lucide="bot" style="width:20px;height:20px;"></i>
                        <h3 data-i18n="FarmLink Assistant">FarmLink Assistant</h3>
                    </div>
                    <button class="bot-close" id="botCloseBtn"><i data-lucide="x" style="width:20px;height:20px;"></i></button>
                </div>
                <div class="bot-messages" id="botMessages">
                    <div class="msg-bubble msg-bot">${window.t ? window.t("Hello! I'm your FarmLink Assistant. You can speak to me or type your question. I support English, Hindi, and Tamil!") : "Hello! I'm your FarmLink Assistant. You can speak to me or type your question. I support English, Hindi, and Tamil!"}</div>
                </div>
                <div class="bot-input-area">
                    <button class="bot-action-btn" id="botMicBtn" title="Speak to assistant" data-i18n="Speak to Assistant (Voice)">
                        <i data-lucide="mic" style="width:20px;height:20px;"></i>
                    </button>
                    <input type="text" id="botInput" placeholder="${window.t ? window.t('Type or speak a message...') : 'Type or speak a message...'}" autocomplete="off">
                    <button class="bot-action-btn" id="botSendBtn" title="Send message">
                        <i data-lucide="send" style="width:20px;height:20px;"></i>
                    </button>
                </div>
            </div>
            <button id="farmBotToggle" title="Open AI Assistant" data-i18n="Speak to Assistant (Voice)">
                <i data-lucide="mic" style="width:28px;height:28px;"></i>
            </button>
        `;
        document.body.appendChild(container);

        if (window.lucide) {
            lucide.createIcons();
        }

        // Event Listeners
        document.getElementById('farmBotToggle').addEventListener('click', () => this.toggleWindow());
        document.getElementById('botCloseBtn').addEventListener('click', () => this.toggleWindow(false));
        document.getElementById('botSendBtn').addEventListener('click', () => this.handleSend());
        document.getElementById('botInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSend();
        });
        document.getElementById('botMicBtn').addEventListener('click', () => this.toggleVoice());

        // Setup Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            
            this.recognition.onstart = () => {
                this.isListening = true;
                document.getElementById('botMicBtn').classList.add('active-mic');
                document.getElementById('botInput').placeholder = window.t ? window.t("Listening...") : "Listening...";
                document.getElementById('farmBotToggle').classList.add('voice-pulsing');
            };

            this.recognition.onresult = (event) => {
                const text = event.results[0][0].transcript;
                this.lastInputWasVoice = true;
                this.addMessage(text, 'user');
                this.processQuery(text);
            };

            this.recognition.onend = () => {
                this.isListening = false;
                document.getElementById('botMicBtn').classList.remove('active-mic');
                document.getElementById('botInput').placeholder = window.t ? window.t("Type or speak a message...") : "Type or speak a message...";
                document.getElementById('farmBotToggle').classList.remove('voice-pulsing');
            };

            this.recognition.onerror = () => {
                this.addMessage(window.t ? window.t("Sorry, I couldn't hear that clearly. Please try again.") : "Sorry, I couldn't hear that clearly. Please try again.", 'bot');
            };
        } else {
            console.warn("Speech recognition not supported in this browser.");
            document.getElementById('botMicBtn').style.display = 'none';
        }
    }

    ensureStylesLoaded() {
        // Most dashboard pages include this stylesheet in their <head>. Some
        // secondary pages only load the component script, so make the widget
        // self-contained and keep its position/appearance consistent there too.
        if (document.querySelector('link[href*="chatbot.css"]')) return;

        const chatbotScript = Array.from(document.scripts).find((script) =>
            script.src && /\/js\/chatbot\.js(?:\?|$)/.test(script.src)
        );
        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = chatbotScript
            ? new URL('../css/chatbot.css', chatbotScript.src).href
            : '../../css/chatbot.css';
        document.head.appendChild(stylesheet);
    }

    toggleWindow(forceState = null) {
        const win = document.getElementById('farmBotWindow');
        this.isOpen = forceState !== null ? forceState : !this.isOpen;
        if (this.isOpen) {
            win.classList.remove('hidden');
            document.getElementById('botInput').focus();
        } else {
            win.classList.add('hidden');
        }
    }

    toggleVoice() {
        if (!this.recognition) return;
        
        // Always ensure window is open if they clicked the toggle or mic
        this.toggleWindow(true);

        if (this.isListening) {
            this.recognition.stop();
        } else {
            // Set lang based on global selector if exists
            const currentLang = (window.Language && window.Language.getLanguage && window.Language.getLanguage()) || (typeof window.currentLanguage !== 'undefined' ? window.currentLanguage : 'en');
            this.recognition.lang = currentLang === 'ta' ? 'ta-IN' : currentLang === 'hi' ? 'hi-IN' : 'en-US';
            this.recognition.start();
        }
    }

    handleSend() {
        const input = document.getElementById('botInput');
        const text = input.value.trim();
        if (!text) return;

        input.value = '';
        this.lastInputWasVoice = false;
        this.addMessage(text, 'user');
        this.processQuery(text);
    }

    addMessage(text, sender) {
        const msgs = document.getElementById('botMessages');
        const div = document.createElement('div');
        div.className = `msg-bubble msg-${sender}`;
        div.textContent = text;
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;

        if (sender === 'bot' && this.lastInputWasVoice && window.speechSynthesis) {
            const utterance = new SpeechSynthesisUtterance(text);
            const currentLang = (window.Language && window.Language.getLanguage && window.Language.getLanguage()) || (typeof window.currentLanguage !== 'undefined' ? window.currentLanguage : 'en');
            utterance.lang = currentLang === 'ta' ? 'ta-IN' : currentLang === 'hi' ? 'hi-IN' : 'en-US';
            window.speechSynthesis.speak(utterance);
        }
    }

    processQuery(text) {
        // Simulated local fallback for chatbot logic
        const lower = text.toLowerCase();
        setTimeout(() => {
            let reply = window.t ? window.t("I can help you list products, check mandi prices, or find verified farmers. What would you like to do?") : "I can help you list products, check mandi prices, or find verified farmers. What would you like to do?";
            if (lower.includes('price') || lower.includes('mandi') || lower.includes('rate')) {
                reply = window.t ? window.t("You can check live Mandi prices by going to the 'Market Price' section from your dashboard. It uses AgmarkNet data.") : "You can check live Mandi prices by going to the 'Market Price' section from your dashboard. It uses AgmarkNet data.";
            } else if (lower.includes('verify') || lower.includes('ai')) {
                reply = window.t ? window.t("Our AI Vision tool automatically verifies product freshness when farmers upload photos during listing.") : "Our AI Vision tool automatically verifies product freshness when farmers upload photos during listing.";
            } else if (lower.includes('officer') || lower.includes('field')) {
                reply = window.t ? window.t("Field Officers perform physical verification. You can see the 'FIELD VERIFIED' badge on products that passed physical inspection.") : "Field Officers perform physical verification. You can see the 'FIELD VERIFIED' badge on products that passed physical inspection.";
            } else if (lower.includes('return') || lower.includes('refund')) {
                reply = window.t ? window.t("You can request a return from the 'My Orders' section for any delivered orders if there are quality issues.") : "You can request a return from the 'My Orders' section for any delivered orders if there are quality issues.";
            } else if (lower.includes('hello') || lower.includes('hi')) {
                reply = window.t ? window.t("Hello! How can I assist you with FarmLink today?") : "Hello! How can I assist you with FarmLink today?";
            }
            this.addMessage(reply, 'bot');
        }, 600);
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.farmBotInstance = new FarmChatbot();
});
