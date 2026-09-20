/* ===================================================================
   FARM LINK — SEARCHABLE CROP AUTOCOMPLETE COMPONENT
   SIH26132 — Farmer Market Linkage & Price Discovery | Govt. of Maharashtra
   =================================================================== */

(function(window) {
    'use strict';

    // Comprehensive Multilingual Crops & Varieties Catalogue
    const CROP_CATALOGUE = [
        // Vegetables
        {
            id: 'tomato',
            category: 'vegetable',
            en: 'Tomato',
            hi: 'टमाटर',
            ta: 'தக்காளி',
            varieties: ['Tomato (Local Desi)', 'Tomato (Hybrid)', 'Tomato (Cherry)', 'Tomato (Vaishali)', 'Tomato (Abhinav)'],
            keywords: ['tomato', 'tomatoes', 'tamatar', 'thakkali', 'cherry', 'desi', 'red tomato']
        },
        {
            id: 'onion',
            category: 'vegetable',
            en: 'Onion',
            hi: 'प्याज़',
            ta: 'வெங்காயம்',
            varieties: ['Nashik Red Onion', 'White Onion', 'Garwa Onion', 'Fursungi Onion'],
            keywords: ['onion', 'onions', 'pyaz', 'kanda', 'vengayam', 'red onion', 'white onion']
        },
        {
            id: 'potato',
            category: 'vegetable',
            en: 'Potato',
            hi: 'आलू',
            ta: 'உருளைக்கிழங்கு',
            varieties: ['Jyoti Potato', 'Kufri Pukhraj', 'Kufri Chipsona', 'Baby Potato'],
            keywords: ['potato', 'potatoes', 'aloo', 'alu', 'urulai', 'urulaikizhangu', 'jyoti']
        },
        {
            id: 'brinjal',
            category: 'vegetable',
            en: 'Brinjal',
            hi: 'बैंगन',
            ta: 'கத்தரிக்காய்',
            varieties: ['Round Purple Brinjal', 'Long Green Brinjal', 'Vatari Brinjal', 'Striped Brinjal'],
            keywords: ['brinjal', 'eggplant', 'aubergine', 'baingan', 'kathirikai', 'vange']
        },
        {
            id: 'carrot',
            category: 'vegetable',
            en: 'Carrot',
            hi: 'गाजर',
            ta: 'கேரட்',
            varieties: ['Red Delhi Carrot', 'Orange Hybrid Carrot', 'Nantes Carrot'],
            keywords: ['carrot', 'carrots', 'gajar', 'kerat', 'red carrot']
        },
        {
            id: 'chilli',
            category: 'vegetable',
            en: 'Chilli',
            hi: 'मिर्च',
            ta: 'மிளகாய்',
            varieties: ['Guntur Green Chilli', 'Jwala Chilli', 'Lavangi Spicy Chilli', 'Sannam Chilli'],
            keywords: ['chilli', 'chillies', 'mirch', 'mirchi', 'milagai', 'green chilli']
        },
        {
            id: 'capsicum',
            category: 'vegetable',
            en: 'Capsicum',
            hi: 'शिमला मिर्च',
            ta: 'குடைமிளகாய்',
            varieties: ['Green Bell Pepper', 'Red Capsicum', 'Yellow Bell Pepper'],
            keywords: ['capsicum', 'bell pepper', 'shimla mirch', 'kudaimilagai']
        },
        {
            id: 'cabbage',
            category: 'vegetable',
            en: 'Cabbage',
            hi: 'पत्ता गोभी',
            ta: 'முட்டைக்கோஸ்',
            varieties: ['Green Ball Cabbage', 'Golden Acre Cabbage'],
            keywords: ['cabbage', 'patta gobhi', 'gobhi', 'muttaikose', 'kobi']
        },
        {
            id: 'cauliflower',
            category: 'vegetable',
            en: 'Cauliflower',
            hi: 'फूलगोभी',
            ta: 'காலிஃபிளவர்',
            varieties: ['Snowball Cauliflower', 'Pusa Deepali'],
            keywords: ['cauliflower', 'phool gobhi', 'gobhi', 'kaliflavar']
        },
        {
            id: 'okra',
            category: 'vegetable',
            en: 'Okra (Bhindi)',
            hi: 'भिंडी',
            ta: 'வெண்டைக்காய்',
            varieties: ['Pusa Sawani Okra', 'Radhika Hybrid Bhindi'],
            keywords: ['okra', 'bhindi', 'ladies finger', 'vendaikkai', 'bhendi']
        },
        {
            id: 'spinach',
            category: 'vegetable',
            en: 'Spinach',
            hi: 'पालक',
            ta: 'பசலைக்கீரை',
            varieties: ['All Green Spinach', 'Pusa Bharati'],
            keywords: ['spinach', 'palak', 'keerai', 'pasalaikeerai']
        },
        {
            id: 'cucumber',
            category: 'vegetable',
            en: 'Cucumber',
            hi: 'खीरा',
            ta: 'வெள்ளரிக்காய்',
            varieties: ['Polyhouse English Cucumber', 'Desi Green Kheera'],
            keywords: ['cucumber', 'kheera', 'kakdi', 'vellarikkai']
        },
        {
            id: 'garlic',
            category: 'vegetable',
            en: 'Garlic',
            hi: 'लहसुन',
            ta: 'பூண்டு',
            varieties: ['Yamuna Safed Garlic', 'G-282 Garlic'],
            keywords: ['garlic', 'lahsun', 'poondu', 'lasun']
        },
        {
            id: 'ginger',
            category: 'vegetable',
            en: 'Ginger',
            hi: 'अदरक',
            ta: 'இஞ்சி',
            varieties: ['Mahim Fresh Ginger', 'Varada Ginger'],
            keywords: ['ginger', 'adrak', 'inji', 'ale']
        },

        // Fruits
        {
            id: 'banana',
            category: 'fruit',
            en: 'Banana',
            hi: 'केला',
            ta: 'வாழைப்பழம்',
            varieties: ['Grand Naine Banana', 'Robusta Banana', 'Elakki Banana', 'Red Banana'],
            keywords: ['banana', 'bananas', 'kela', 'valhaipalam', 'kele']
        },
        {
            id: 'mango',
            category: 'fruit',
            en: 'Mango',
            hi: 'आम',
            ta: 'மாம்பழம்',
            varieties: ['Ratnagiri Alphonso (Hapus)', 'Kesar Mango', 'Dasheri Mango', 'Banganapalli Mango'],
            keywords: ['mango', 'mangoes', 'aam', 'mambalam', 'hapus', 'alphonso', 'kesar']
        },
        {
            id: 'pomegranate',
            category: 'fruit',
            en: 'Pomegranate',
            hi: 'अनार',
            ta: 'மாதுளை',
            varieties: ['Bhagwa Pomegranate', 'Arakta Ruby Red', 'Ganesh Pomegranate'],
            keywords: ['pomegranate', 'anar', 'anaar', 'madhulai', 'dalimb']
        },
        {
            id: 'grapes',
            category: 'fruit',
            en: 'Grapes',
            hi: 'अंगूर',
            ta: 'திராட்சை',
            varieties: ['Thompson Seedless White', 'Sharad Seedless Black', 'Flame Seedless Red'],
            keywords: ['grapes', 'grape', 'angoor', 'thiratsai', 'draksha']
        },
        {
            id: 'watermelon',
            category: 'fruit',
            en: 'Watermelon',
            hi: 'तरबूज',
            ta: 'தர்பூசணி',
            varieties: ['Sugar Baby Watermelon', 'Black Beauty Hybrid'],
            keywords: ['watermelon', 'tarbooj', 'tarbuz', 'tharboosani', 'kalingad']
        },
        {
            id: 'papaya',
            category: 'fruit',
            en: 'Papaya',
            hi: 'पपीता',
            ta: 'பப்பாளி',
            varieties: ['Red Lady 786 Papaya', 'Taiwan Hybrid Papaya'],
            keywords: ['papaya', 'papita', 'pappali']
        },
        {
            id: 'guava',
            category: 'fruit',
            en: 'Guava',
            hi: 'अमरूद',
            ta: 'கொய்யா',
            varieties: ['Sardar (Lucknow 49) Guava', 'Allahabad Safeda'],
            keywords: ['guava', 'amrud', 'koyya', 'peru']
        },
        {
            id: 'orange',
            category: 'fruit',
            en: 'Orange',
            hi: 'संतरा',
            ta: 'ஆரஞ்சு',
            varieties: ['Nagpur Mandarin Orange', 'Mosambi Sweet Lime'],
            keywords: ['orange', 'santara', 'mosambi', 'sweet lime', 'aranju']
        },
        {
            id: 'apple',
            category: 'fruit',
            en: 'Apple',
            hi: 'सेब',
            ta: 'ஆப்பிள்',
            varieties: ['Royal Delicious Apple', 'Himachal Red Apple'],
            keywords: ['apple', 'seb', 'appil']
        },
        {
            id: 'coconut',
            category: 'fruit',
            en: 'Coconut',
            hi: 'नारियल',
            ta: 'தேங்காய்',
            varieties: ['West Coast Tall Coconut', 'Tender Green Coconut'],
            keywords: ['coconut', 'nariyal', 'thengai', 'naral']
        },

        // Grains & Cash Crops
        {
            id: 'wheat',
            category: 'grain',
            en: 'Wheat',
            hi: 'गेहूं',
            ta: 'கோதுமை',
            varieties: ['Sharbati Wheat', 'Lokwan Golden Wheat', 'Sihar Wheat'],
            keywords: ['wheat', 'gehun', 'gehu', 'gothumai']
        },
        {
            id: 'rice',
            category: 'grain',
            en: 'Paddy / Rice',
            hi: 'चावल / धान',
            ta: 'அரிசி / நெல்',
            varieties: ['Indrayani Fragrant Rice', 'Basmati Premium', 'Kolam Rice', 'Common Paddy'],
            keywords: ['rice', 'paddy', 'chawal', 'dhan', 'arisi', 'nel']
        },
        {
            id: 'maize',
            category: 'grain',
            en: 'Maize (Corn)',
            hi: 'मक्का',
            ta: 'மக்காச்சோளம்',
            varieties: ['Sweet Corn', 'Yellow Hybrid Maize'],
            keywords: ['maize', 'corn', 'makka', 'makkacholam', 'bhutta']
        }
    ];

    class CropAutocomplete {
        /**
         * @param {HTMLElement|string} targetElement - Container or input element to transform
         * @param {Object} options - Configuration options
         */
        constructor(targetElement, options = {}) {
            this.target = typeof targetElement === 'string' ? document.querySelector(targetElement) : targetElement;
            if (!this.target) return;

            this.options = {
                placeholder: 'Type crop or produce name...',
                initialValue: '',
                onSelect: null,
                allowCustom: true,
                ...options
            };

            this.selectedItem = null;
            this.highlightedIndex = -1;
            this.matchingResults = [];
            this.isOpen = false;

            this.init();
        }

        init() {
            // If target is a <select>, hide it and insert our autocomplete wrapper right after it
            if (this.target.tagName === 'SELECT') {
                this.selectEl = this.target;
                this.selectEl.style.display = 'none';
                this.container = document.createElement('div');
                this.container.className = 'crop-autocomplete-wrap';
                this.selectEl.parentNode.insertBefore(this.container, this.selectEl.nextSibling);
            } else if (this.target.tagName === 'INPUT') {
                this.inputEl = this.target;
                this.container = document.createElement('div');
                this.container.className = 'crop-autocomplete-wrap';
                this.inputEl.parentNode.insertBefore(this.container, this.inputEl);
                this.container.appendChild(this.inputEl);
            } else {
                this.container = this.target;
                this.container.className = 'crop-autocomplete-wrap';
            }

            this.renderDOM();
            this.bindEvents();

            if (this.options.initialValue) {
                this.setValue(this.options.initialValue);
            } else if (this.selectEl && this.selectEl.value) {
                this.setValue(this.selectEl.value);
            }
        }

        renderDOM() {
            if (!this.inputEl) {
                this.inputEl = document.createElement('input');
                this.inputEl.type = 'text';
                this.inputEl.className = 'form-control crop-autocomplete-input';
                this.inputEl.autocomplete = 'off';
                this.inputEl.spellcheck = false;
                this.inputEl.setAttribute('role', 'combobox');
                this.inputEl.setAttribute('aria-autocomplete', 'list');
                this.inputEl.setAttribute('aria-expanded', 'false');
                this.container.appendChild(this.inputEl);
            }

            this.inputEl.placeholder = this.getLocalizedPlaceholder();
            this.inputEl.setAttribute('data-i18n-placeholder', 'Type crop or produce name...');

            // Clear Button
            this.clearBtn = document.createElement('button');
            this.clearBtn.type = 'button';
            this.clearBtn.className = 'crop-clear-btn';
            this.clearBtn.innerHTML = '×';
            this.clearBtn.title = 'Clear crop selection';
            this.clearBtn.style.display = 'none';
            this.container.appendChild(this.clearBtn);

            // Suggestions Dropdown Panel
            this.dropdown = document.createElement('div');
            this.dropdown.className = 'crop-suggestions-panel';
            this.dropdown.setAttribute('role', 'listbox');
            this.container.appendChild(this.dropdown);
        }

        getLanguage() {
            if (window.Language && typeof window.Language.getCurrentLanguage === 'function') {
                return window.Language.getCurrentLanguage();
            }
            return localStorage.getItem('farmlink_lang') || 'en';
        }

        getLocalizedPlaceholder() {
            const lang = this.getLanguage();
            if (lang === 'ta') return 'பயிர் / விளைபொருளின் பெயரை தட்டச்சு செய்க...';
            if (lang === 'hi') return 'फसल / उपज का नाम टाइप करें...';
            return 'Type crop or produce name...';
        }

        bindEvents() {
            this.inputEl.addEventListener('input', () => {
                const query = this.inputEl.value.trim();
                this.clearBtn.style.display = query ? 'flex' : 'none';
                this.filterCrops(query);
            });

            this.inputEl.addEventListener('focus', () => {
                const query = this.inputEl.value.trim();
                this.filterCrops(query);
            });

            this.clearBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.clear();
                this.inputEl.focus();
            });

            // Keyboard Navigation
            this.inputEl.addEventListener('keydown', (e) => {
                if (!this.isOpen) {
                    if (e.key === 'ArrowDown' || e.key === 'Enter') {
                        this.filterCrops(this.inputEl.value.trim());
                    }
                    return;
                }

                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.highlightNext();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.highlightPrev();
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    if (this.highlightedIndex >= 0 && this.matchingResults[this.highlightedIndex]) {
                        this.selectCrop(this.matchingResults[this.highlightedIndex]);
                    } else if (this.options.allowCustom && this.inputEl.value.trim()) {
                        this.selectCustom(this.inputEl.value.trim());
                    }
                } else if (e.key === 'Escape') {
                    this.closeDropdown();
                }
            });

            // Close when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.container.contains(e.target)) {
                    this.closeDropdown();
                }
            });

            // React to app language changes
            window.addEventListener('languageChanged', () => {
                this.inputEl.placeholder = this.getLocalizedPlaceholder();
                if (this.selectedItem) {
                    this.updateDisplayLabel();
                }
            });
        }

        filterCrops(query) {
            const raw = query.toLowerCase();
            const lang = this.getLanguage();

            if (!raw) {
                // Show popular recommendation list
                this.matchingResults = CROP_CATALOGUE.slice(0, 10).map(crop => ({
                    ...crop,
                    displayName: this.getDisplayName(crop, lang),
                    selectedVariety: crop.en
                }));
            } else {
                const results = [];
                for (const crop of CROP_CATALOGUE) {
                    let matched = false;
                    let matchVariety = null;

                    // Direct name or keyword match
                    if (crop.en.toLowerCase().includes(raw) ||
                        crop.hi.includes(raw) ||
                        crop.ta.includes(raw) ||
                        crop.keywords.some(k => k.includes(raw))) {
                        matched = true;
                    }

                    // Check specific varieties
                    if (crop.varieties) {
                        const vMatch = crop.varieties.find(v => v.toLowerCase().includes(raw));
                        if (vMatch) {
                            matched = true;
                            matchVariety = vMatch;
                        }
                    }

                    if (matched) {
                        results.push({
                            ...crop,
                            displayName: this.getDisplayName(crop, lang),
                            selectedVariety: matchVariety || crop.en
                        });

                        // Also include individual matching varieties as separate suggestions if helpful
                        if (crop.varieties && crop.varieties.length > 1) {
                            for (const v of crop.varieties) {
                                if (v.toLowerCase().includes(raw) && v !== matchVariety) {
                                    results.push({
                                        ...crop,
                                        displayName: `${v} (${this.getLocalizedCropName(crop, lang)})`,
                                        selectedVariety: v
                                    });
                                }
                            }
                        }
                    }
                }

                this.matchingResults = results;
            }

            this.renderDropdown(raw);
        }

        getLocalizedCropName(crop, lang) {
            if (lang === 'ta') return crop.ta;
            if (lang === 'hi') return crop.hi;
            return crop.en;
        }

        getDisplayName(crop, lang) {
            if (lang === 'ta') {
                return `${crop.ta} (${crop.en})`;
            }
            if (lang === 'hi') {
                return `${crop.hi} (${crop.en})`;
            }
            return crop.en;
        }

        renderDropdown(query) {
            this.dropdown.innerHTML = '';
            this.highlightedIndex = -1;

            if (this.matchingResults.length === 0) {
                const lang = this.getLanguage();
                const noResultText = lang === 'ta' ? 'பொருந்தும் விளைபொருட்கள் இல்லை' :
                                     lang === 'hi' ? 'कोई फसल नहीं मिली' : 'No matching produce found';

                const noResult = document.createElement('div');
                noResult.className = 'crop-no-result';
                noResult.textContent = noResultText;
                this.dropdown.appendChild(noResult);

                if (this.options.allowCustom && query) {
                    const customBtn = document.createElement('div');
                    customBtn.className = 'crop-suggestion-item crop-custom-option';
                    customBtn.innerHTML = `
                        <span class="crop-custom-badge">Custom</span>
                        <span>Use <strong>"${this.escapeHtml(query)}"</strong> as produce</span>
                    `;
                    customBtn.addEventListener('click', () => {
                        this.selectCustom(query);
                    });
                    this.dropdown.appendChild(customBtn);
                }
            } else {
                this.matchingResults.slice(0, 8).forEach((item, idx) => {
                    const el = document.createElement('div');
                    el.className = 'crop-suggestion-item';
                    el.setAttribute('role', 'option');
                    el.setAttribute('data-idx', idx);

                    const categoryBadgeClass = item.category === 'fruit' ? 'badge-fruit' : item.category === 'grain' ? 'badge-grain' : 'badge-vegetable';
                    const categoryLabel = item.category ? item.category.toUpperCase() : 'PRODUCE';

                    el.innerHTML = `
                        <div class="crop-item-main">
                            <span class="crop-item-name">${this.highlightMatch(item.displayName, query)}</span>
                            ${item.selectedVariety && item.selectedVariety !== item.en ? `<span class="crop-variety-tag">${item.selectedVariety}</span>` : ''}
                        </div>
                        <span class="crop-category-badge ${categoryBadgeClass}">${categoryLabel}</span>
                    `;

                    el.addEventListener('click', () => {
                        this.selectCrop(item);
                    });

                    this.dropdown.appendChild(el);
                });
            }

            this.openDropdown();
        }

        highlightMatch(text, query) {
            if (!query) return this.escapeHtml(text);
            const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escapedQuery})`, 'gi');
            return this.escapeHtml(text).replace(regex, '<span class="crop-highlight">$1</span>');
        }

        escapeHtml(str) {
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
        }

        openDropdown() {
            this.dropdown.classList.add('show');
            this.inputEl.setAttribute('aria-expanded', 'true');
            this.isOpen = true;
        }

        closeDropdown() {
            this.dropdown.classList.remove('show');
            this.inputEl.setAttribute('aria-expanded', 'false');
            this.isOpen = false;
            this.highlightedIndex = -1;
        }

        highlightNext() {
            const items = this.dropdown.querySelectorAll('.crop-suggestion-item');
            if (!items.length) return;
            this.highlightedIndex = (this.highlightedIndex + 1) % items.length;
            this.updateHighlight(items);
        }

        highlightPrev() {
            const items = this.dropdown.querySelectorAll('.crop-suggestion-item');
            if (!items.length) return;
            this.highlightedIndex = (this.highlightedIndex - 1 + items.length) % items.length;
            this.updateHighlight(items);
        }

        updateHighlight(items) {
            items.forEach((item, idx) => {
                if (idx === this.highlightedIndex) {
                    item.classList.add('active');
                    item.scrollIntoView({ block: 'nearest' });
                } else {
                    item.classList.remove('active');
                }
            });
        }

        selectCrop(item) {
            this.selectedItem = item;
            const chosenValue = item.selectedVariety || item.en;
            this.inputEl.value = chosenValue;
            this.clearBtn.style.display = 'flex';

            if (this.selectEl) {
                // Ensure the underlying select has this option
                let opt = Array.from(this.selectEl.options).find(o => o.value.toLowerCase() === item.en.toLowerCase());
                if (!opt) {
                    opt = new Option(chosenValue, item.en);
                    this.selectEl.add(opt);
                }
                this.selectEl.value = item.en;
                this.selectEl.dispatchEvent(new Event('change', { bubbles: true }));
            }

            this.closeDropdown();

            if (typeof this.options.onSelect === 'function') {
                this.options.onSelect({
                    id: item.id,
                    name: chosenValue,
                    baseCrop: item.en,
                    category: item.category,
                    isCustom: false
                });
            }

            this.inputEl.dispatchEvent(new CustomEvent('cropSelected', {
                bubbles: true,
                detail: {
                    id: item.id,
                    name: chosenValue,
                    baseCrop: item.en,
                    category: item.category,
                    isCustom: false
                }
            }));
        }

        selectCustom(customName) {
            const trimmed = customName.trim();
            if (!trimmed) return;

            this.selectedItem = {
                id: trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                en: trimmed,
                displayName: trimmed,
                category: 'vegetable',
                isCustom: true
            };

            this.inputEl.value = trimmed;
            this.clearBtn.style.display = 'flex';

            if (this.selectEl) {
                let opt = Array.from(this.selectEl.options).find(o => o.value === trimmed);
                if (!opt) {
                    opt = new Option(trimmed, trimmed);
                    this.selectEl.add(opt);
                }
                this.selectEl.value = trimmed;
                this.selectEl.dispatchEvent(new Event('change', { bubbles: true }));
            }

            this.closeDropdown();

            if (typeof this.options.onSelect === 'function') {
                this.options.onSelect({
                    id: this.selectedItem.id,
                    name: trimmed,
                    baseCrop: trimmed,
                    category: 'vegetable',
                    isCustom: true
                });
            }

            this.inputEl.dispatchEvent(new CustomEvent('cropSelected', {
                bubbles: true,
                detail: {
                    id: this.selectedItem.id,
                    name: trimmed,
                    baseCrop: trimmed,
                    category: 'vegetable',
                    isCustom: true
                }
            }));
        }

        setValue(value) {
            if (!value) {
                this.clear();
                return;
            }

            const lower = String(value).trim().toLowerCase();
            const matched = CROP_CATALOGUE.find(c =>
                c.en.toLowerCase() === lower ||
                c.id.toLowerCase() === lower ||
                c.hi === value ||
                c.ta === value ||
                c.keywords.some(k => k === lower)
            );

            if (matched) {
                this.selectCrop({
                    ...matched,
                    displayName: this.getDisplayName(matched, this.getLanguage()),
                    selectedVariety: matched.en
                });
            } else {
                this.selectCustom(value);
            }
        }

        getValue() {
            return this.inputEl.value.trim();
        }

        getSelected() {
            return this.selectedItem;
        }

        clear() {
            this.selectedItem = null;
            this.inputEl.value = '';
            this.clearBtn.style.display = 'none';
            if (this.selectEl) {
                this.selectEl.value = '';
                this.selectEl.dispatchEvent(new Event('change', { bubbles: true }));
            }
            this.closeDropdown();
        }

        updateDisplayLabel() {
            if (!this.selectedItem) return;
            // Retain user-selected variety or localized crop name
            if (this.selectedItem.isCustom) return;
        }
    }

    // Export globally
    window.CropAutocomplete = CropAutocomplete;
    window.CROP_CATALOGUE = CROP_CATALOGUE;

})(window);
