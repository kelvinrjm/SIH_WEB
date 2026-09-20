/**
 * FARM LINK Backend Module Entry
 * SIH26132 — Farmer Market Linkage & Price Discovery
 * Govt. of Maharashtra · SIH 2026
 * 
 * Provides API services for:
 * - Phone + Password Authentication & Demo OTP Verification
 * - Product Lifecycle & Inventory Management
 * - Shared Farmer/Buyer Order State Machine
 * - AgmarkNet Government Mandi Rates & AI Harvest Timing Advice
 */

const path = require('path');

// Forward execution to canonical server.js at workspace root
require(path.join(__dirname, '../server.js'));
