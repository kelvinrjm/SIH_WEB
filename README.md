# FARM LINK — Smart Market Linkage for Farmers

### Problem Statement: SIH26132 — Farmer Market Linkage & Price Discovery
**Smart India Hackathon 2026**  
**Theme**: Agriculture, FoodTech & Rural Development  
**Sponsor**: Government of Maharashtra

---

## 1. Project Overview

**FarmLink** connects smallholder farmers directly with institutional and commercial buyers, eliminating exploitative middlemen, reducing post-harvest wastage, and providing fair price discovery backed by real government APMC mandi data.

### Core Objectives
1. **Direct Marketplace**: Enable farmers to list produce lots with verified freshness, grading, geolocation, and harvest dates.
2. **Transparent Price Discovery**: Display government mandi modal rates (AgmarkNet) alongside direct farm-gate pricing.
3. **5-Stage Order Tracking**: Real-time shared order state machine between farmer and buyer (`ORDER PLACED` → `CONFIRMED` → `PREPARING` → `OUT FOR DELIVERY` → `DELIVERED`).
4. **Multilingual Inclusivity**: Full application translation across **English**, **தமிழ் (Tamil)**, and **हिन्दी (Hindi)**.
5. **Farmer-First Design**: Large touch targets, minimal typing, visual grade selection, and mobile-first responsiveness.

---

## 2. Architecture & File Structure

```
FARM-LINK/
│
├── index.html                     # Primary Login Page (Phone + Password)
│
├── pages/
│   ├── welcome.html               # Onboarding & intro
│   ├── role-selection.html        # Role chooser (Farmer / Buyer)
│   ├── registration.html          # 5-field registration (Name, Phone, District, State, Password)
│   ├── otp-verification.html      # Demo OTP verification (Code: 123456)
│   │
│   ├── buyer/                     # 16 Dedicated Buyer/Procurement Pages
│   │   ├── dashboard.html         # Buyer KPI overview, recommendations, quick stats
│   │   ├── marketplace.html       # Browse produce with category & freshness filters
│   │   ├── search.html            # Search with speech-to-text voice capability
│   │   ├── categories.html        # Category browsing (Vegetables, Fruits, Grains, etc.)
│   │   ├── product-details.html   # Detailed produce lot view, seller info, custom offer
│   │   ├── cart.html              # Dynamic cart with stock limits and delivery estimation
│   │   ├── checkout.html          # 3-step delivery address & payment review
│   │   ├── order-success.html     # Confirmation with order ID & tracking CTA
│   │   ├── orders.html            # Buyer order history and status filters
│   │   ├── order-tracking.html    # 5-stage visual progress timeline
│   │   ├── invoice.html           # Print-ready agricultural tax invoice
│   │   ├── favorites.html         # Saved farm lots
│   │   ├── notifications.html     # Real-time transaction alerts
│   │   ├── profile.html           # Merchant profile, procurement preferences
│   │   ├── settings.html          # Notification & security settings
│   │   └── help.html              # Buyer support, disputes & FAQ
│   │
│   └── farmer/                    # 19 Dedicated Farmer/Seller Pages
│       ├── dashboard.html         # Farmer revenue overview, crop list, price snapshot
│       ├── products.html          # Active inventory list with stock management
│       ├── add-product.html       # All-in-one produce publishing form
│       ├── add-product-info.html  # Wizard Step 1: Produce info, pricing & unit
│       ├── add-product-photos.html# Wizard Step 2: Multi-photo upload & preview
│       ├── add-product-location.html # Wizard Step 3: Interactive GPS farm location
│       ├── add-product-review.html# Wizard Step 4: Summary review & publish
│       ├── product-published.html # Instant success confirmation
│       ├── orders.html            # Farmer fulfillment dashboard with status progression
│       ├── buyer-requests.html    # Reverse inquiry board from bulk buyers
│       ├── market-price.html      # Government mandi rate search & filter
│       ├── market-price-results.html # APMC arrivals, min/modal/max rates
│       ├── market-price-details.html # Grading and tare specifications
│       ├── market-price-comparison.html # Mandi vs Direct farm-gate net margin calculator
│       ├── market-price-history.html # Quarterly price trends & seasonal charts
│       ├── notifications.html     # New order alerts & dispatch reminders
│       ├── profile.html           # Farmer profile, farm location & bank info
│       ├── settings.html          # Language preference & SMS alerts
│       └── help.html              # KVK helplines, dispute resolution & FAQs
│
├── public/                        # 8 Informational Public Pages
│   ├── about.html                 # Mission, Govt. of Maharashtra alignment
│   ├── how-it-works.html          # Farmer & buyer workflows explained
│   ├── browse-products.html       # Public guest produce catalog
│   ├── market-prices.html         # Live public APMC mandi price board
│   ├── farmer-info.html           # Benefits and onboarding guide for farmers
│   ├── buyer-info.html            # Quality standards and bulk purchasing guide
│   ├── faq.html                   # Comprehensive platform FAQ
│   └── contact.html               # Maharashtra Agriculture Dept & support contact
│
├── css/                           # Design System & Responsive Stylesheets
│   ├── variables.css              # Kelly Green palette (#2E7D32), typography scale
│   ├── global.css                 # Base resets, typography, and container utilities
│   ├── components.css             # Buttons, badges, cards, modals, toast alerts
│   ├── auth.css                   # Login, register, and OTP verification cards
│   ├── farmer.css                 # Farmer-specific high-contrast cards & actions
│   ├── buyer.css                  # Commercial marketplace cards, cart & invoice
│   ├── layout.css                 # Unified top navbar, side navigation & footers
│   └── responsive.css             # Mobile-first breakpoints (mobile, tablet, desktop)
│
├── js/                            # Modular JavaScript Services
│   ├── config.js                  # Application constants & API base URLs
│   ├── language.js                # Centralized translation dictionary (EN, TA, HI)
│   ├── storage.js                 # Unified storage layer (`FarmStorage`) with seeds
│   ├── auth.js                    # Credential auth (`loginWithCredentials`, `register`)
│   ├── utils.js                   # Currency formatters, date helpers, toast manager
│   ├── validation.js              # Phone, password, and form validation utilities
│   ├── products.js                # Produce lot CRUD & stock checks
│   ├── cart.js                    # Shopping cart calculations & local persistence
│   ├── orders.js                  # Order creation & status transitions
│   ├── market-price.js            # Mandi rate fetching & cache manager
│   ├── location.js                # Geolocation & district/state resolvers
│   ├── notifications.js           # Notification store & badge counter
│   ├── otp.js                     # Demo OTP timer & validation logic
│   ├── profile.js                 # User profile state & sync
│   └── navigation.js              # Role-aware active tab manager
│
├── img/
│   └── logo.png                   # Official FarmLink branding logo
│
├── data/                          # Reference Seed Datasets
│   ├── products.json              # Default produce lots (Tomato, Onion, Banana)
│   ├── users.json                 # Pre-configured demo users
│   ├── orders.json                # Seed fulfillment orders
│   └── mandis.json                # APMC mandi price reference records
│
├── backend/
│   ├── index.js                   # Backend runner entry point
│   └── README.md                  # API documentation & route specifications
│
├── server.js                      # Express API server for local dev & AI services
└── package.json                   # Dependencies & build scripts
```

---

## 3. Demo Credentials

| Role | Mobile Number | Password | Name | Location |
| :--- | :--- | :--- | :--- | :--- |
| **Farmer / Seller** | `9876543210` | `farmer123` | Ramesh Patel | Nashik, Maharashtra |
| **Buyer / Merchant** | `9876501234` | `buyer123` | Priya Sharma | Thane, Maharashtra |
| **Demo OTP** | `123456` | *(Any registration)* | — | — |

---

## 4. Authentication Flow

1. **Login**:
   - Access `index.html`.
   - Enter **10-digit mobile number** and **password**.
   - System authenticates credentials, identifies the registered role, and routes to:
     - Farmer → `pages/farmer/dashboard.html`
     - Buyer → `pages/buyer/dashboard.html`

2. **Registration**:
   - Navigate to `pages/registration.html`.
   - Enter all 5 mandatory fields: **Full Name**, **Mobile Number**, **District**, **State**, and **Password**.
   - Select role (Farmer or Buyer).
   - Click **Continue to Verification** → Redirects to `pages/otp-verification.html`.
   - Enter demo code `123456`.
   - Account is created and user is redirected back to `index.html`.
   - User logs in with their newly created phone number and password.

---

## 5. Verification & Testing

To run syntax and server checks:
```bash
# Check syntax of server and core scripts
node --check server.js
node --check js/auth.js
node --check js/storage.js
node --check js/language.js
node --check js/utils.js

# Launch backend server
npm start
```
