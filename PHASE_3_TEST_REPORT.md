# Phase 3: Backend, Security & End-to-End Testing Report

**Project:** CHANGE Foundation Web Platform  
**Entity:** Centre for Himalayan Agriculture and Nature Foundation  
**Phase Completed:** Phase 3 — Backend Architecture, Security Hardening & End-to-End Testing  
**Date:** October 31, 2026  
**Auditor / Engineer:** Senior Full-Stack Engineer, QA Architect & Cybersecurity Auditor  
**Status:** **100% PASSING (22 of 22 Automated Tests Passed, 0 Failures)**

---

## 1. Executive Summary

Phase 3 established the backend infrastructure blueprint, database security layer, bot protection, server hardening, and end-to-end integration test coverage for the CHANGE Foundation web platform.

All security controls were implemented and verified with zero breakage to existing features or design styling.

---

## 2. Key Technical Implementations

### A. Database Architecture & Row Level Security (`supabase/schema.sql`)
A complete PostgreSQL database schema was built and validated for Supabase:
- **`public.contacts` Table:**
  - Standardized schema for visitor inquiries, CSR proposals, and volunteer submissions.
  - Columns: `id` (UUID), `created_at` (TIMESTAMPTZ), `name`, `email`, `subject`, `message`, `status` (`new`, `reviewed`, `in_progress`, `resolved`, `archived`), `ip_hash`, `metadata`.
  - Indexes: Timestamp descending index, status index, and email index for high-speed admin querying.
- **`public.newsletter_subscribers` Table:**
  - Subscriber database with unique email enforcement and active state tracking.
- **Strict Row Level Security (RLS) Policies:**
  - **Public/Anon Access:** Anonymous visitors can only perform `INSERT` operations with non-empty validated data.
  - **Zero Data Leakage:** All public `SELECT` queries from anonymous clients are strictly denied (`USING (false)`). This guarantees that malicious actors cannot scrape donor names, inquiry messages, or email lists using the public client anonymous API key.
  - **Authenticated Access:** Only authenticated Foundation staff members can view or update entries.

### B. Anti-Bot Honeypot & Input Sanitization (`src/pages/Contact.jsx`)
- **Honeypot Trap:** Added a visually hidden, non-focusable `bot_trap` input field. Automated spam bots crawling forms populate this field, triggering immediate silent interception without polluting the database or server.
- **Input Boundaries:** Configured strict client-side constraints:
  - Name: `maxLength={100}`, trimmed.
  - Email: `maxLength={255}`, trimmed, normalized lowercase.
  - Subject: `maxLength={150}`, trimmed.
  - Message: `maxLength={2000}`, trimmed, live character counter displayed.
- **Resilient Fallback Notice:** If the client is executed without a configured database backend, the form provides immediate human-assisted instructions displaying the verified institutional email (`thechangeuttarakhand@gmail.com`) and direct phone numbers (`+91-9690720525`).

### C. Backend Express Service Hardening (`backend/server.js`)
- Enforced a `10kb` maximum JSON payload body limit to prevent request-flooding memory attacks.
- Configured an in-memory sliding-window rate limiter (15 requests per minute per IP).
- Added an independent `/api/contact` proxy endpoint with honeypot checks and payload validation.
- Configured automated security response headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection`).

### D. Production Deployment Security Headers
- **`public/_headers` (Netlify / Cloudflare Pages):**
  - Configured Content-Security-Policy (CSP), framing restrictions, and MIME-sniffing protection.
- **`vercel.json` (Vercel):**
  - Standardized identical strict security headers across all routes.

### E. Environment Configuration (`.env.example`)
- Documented template for all frontend client variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_GEMINI_API_KEY`) and backend variables (`PORT`, `CORS_ORIGIN`).

---

## 3. End-to-End Test Suite Execution Results

Two automated test suites were executed in sequence:

### Suite 1: QA Structural & Component Verifier (`scripts/verify-all.js`)
- **TC-01:** `constants.js` live 80G Google Form link -> **PASS**
- **TC-02:** Official registered contact info -> **PASS**
- **TC-03:** Corporate credentials (CIN, PAN, TAN, HDFC Bank, IFSC) -> **PASS**
- **TC-04:** Header clean TechLab label -> **PASS**
- **TC-05:** Footer registered office, phones, and TechLab badge -> **PASS**
- **TC-06:** Contact form inputs & standardized address -> **PASS**
- **TC-07:** Donate page live Google Form CTA & copy widgets -> **PASS**
- **TC-08:** About page Section 8 credentials with Block Chamba -> **PASS**
- **TC-09:** Legal page RoC jurisdiction & official email -> **PASS**
- **TC-10:** Home page initiative explore links -> **PASS**
- **TC-11:** Complete route tree with 404 catch-all -> **PASS**
- **TC-12:** Tailwind 11-step primary color spectrum -> **PASS**
- **TC-13:** Metadata and `/donate` sitemap route -> **PASS**
- **Suite 1 Summary: 13 Tests | 13 Passed | 0 Failed**

### Suite 2: Phase 3 Security & Backend Verifier (`scripts/test-phase3-e2e.js`)
- **P3-01:** Database Schema contacts table & RLS policies -> **PASS**
- **P3-02:** Database Schema subscribers table & RLS policies -> **PASS**
- **P3-03:** Configuration `.env.example` definitions -> **PASS**
- **P3-04:** Contact honeypot bot trap field implementation -> **PASS**
- **P3-05:** Character length limits & payload trimming -> **PASS**
- **P3-06:** Human fallback notice on unconfigured state -> **PASS**
- **P3-07:** Security headers in `public/_headers` -> **PASS**
- **P3-08:** Production security headers in `vercel.json` -> **PASS**
- **P3-09:** Backend Express server security, rate limiting, and endpoints -> **PASS**
- **Suite 2 Summary: 9 Tests | 9 Passed | 0 Failed**

---

## 4. Overall Verification Summary

| Check | Expected | Actual Result | Status |
|:---|:---|:---|:---|
| **ESLint Quality Check** | 0 errors | `0 errors, 0 warnings` | **PASS** |
| **QA Structural Tests** | 13 passed | `13 passed, 0 failed` | **PASS** |
| **Phase 3 Security Tests** | 9 passed | `9 passed, 0 failed` | **PASS** |
| **Production Build** | Exit Code 0 | `✓ built in 13.67s` | **PASS** |
| **Total Test Count** | 22 tests | **22 Passed, 0 Failed** | **100% PASS** |

---

## 5. Transition to Phase 4

With Phase 3 complete and verified, the project is ready for **Phase 4: Domain, Hosting, HTTPS & Deployment**:
- Static frontend output is optimized and self-contained in `dist/`.
- Production security headers are bundled for Netlify, Vercel, and Cloudflare Pages.
- Database SQL migrations are packaged in `supabase/schema.sql` for 1-click cloud execution.

