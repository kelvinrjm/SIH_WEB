# FarmLink Backend Services (SIH26132)

**Theme**: Agriculture, FoodTech & Rural Development  
**Sponsor**: Government of Maharashtra | Smart India Hackathon 2026

---

## Architecture Overview

The backend is built with Node.js and Express, supporting both standalone API consumption and server-side operations for the FarmLink web application.

### Key Capabilities

1. **Authentication API**:
   - `POST /api/auth/login`: Authenticate with 10-digit mobile number and password. Identifies role and returns user session.
   - `POST /api/auth/register`: Register with mandatory fields: `name`, `phone`, `district`, `state`, `password`, `role`.
   - `POST /api/auth/verify-otp`: Validate 6-digit verification code (`123456` development/demo OTP).

2. **Products & Inventory API**:
   - `GET /api/products`: Retrieve all active produce lots with optional filtering (`category`, `status`, `sellerId`).
   - `POST /api/products`: Publish a new produce lot with freshness score, harvest date, grading, and location.
   - `PUT /api/products/:id/stock`: Update available inventory after buyer procurement.

3. **Shared Order Management API**:
   - `GET /api/orders`: Query orders by buyer or seller ID.
   - `POST /api/orders`: Create multi-item order with address, delivery fee, and COD payment method.
   - `PUT /api/orders/:id/status`: Transition order status through the 5-stage pipeline (`ORDER PLACED` -> `CONFIRMED` -> `PREPARING` -> `OUT FOR DELIVERY` -> `DELIVERED`).

4. **Market Price Discovery & AI Advice**:
   - `GET /api/market-prices`: AgmarkNet / government mandi rate fetcher with modal, min, and max rates per quintal/kg.
   - `POST /api/ai/harvest-advice`: AI-powered optimal harvest timing guidance.

---

## Running the Server

```bash
# Install dependencies
npm install

# Run backend
npm start
# Server listens at http://localhost:5000
```
