# Comprehensive Test Report

**Project:** CHANGE Foundation Web Platform  
**Target URL:** `http://localhost:5173/Foundation-Website-Ver-0.0/#/`  
**Execution Date:** October 31, 2026 (Phase 2 Independent QA Run)  
**Status:** PASSING (0 Errors, 0 Warnings across all test suites)

---

## 1. Automated Build & Linter Results

### ESLint Verification
- **Command:** `npm run lint`
- **Result:** **0 Errors, 0 Warnings** (Checked all `.js`, `.jsx` files).

### Production Build Verification
- **Command:** `npm run build`
- **Result:** **Exit Code 0 (Success)**
  - Modules Transformed: 1,784
  - Build Duration: ~7.42s
  - Output Artifacts:
    - `dist/index.html`: 3.05 kB (gzip: 1.08 kB)
    - `dist/assets/index-lMhUticD.css`: 47.11 kB (gzip: 7.94 kB)
    - `dist/assets/index-BTjMWnPl.js`: 597.13 kB (gzip: 154.91 kB)
    - Bundled Assets: `techlab-logo-CEw_QZ99.jpg`, `foundation-logo-C91oTtTN.png`, `dry-orange-eZtU6sTE.jpg`, `orange-half-Bt_JiWT_.jpg`, `solar-dryer-EhTAePE7.jpg`, `turmeric-sorting-C85uTdsr.jpg`.

---

## 2. Independent Automated Test Suite (`scripts/verify-all.js`)

An automated node test runner was executed covering 13 structural and semantic assertions:

| Test Case | Description | Result |
|:---|:---|:---|
| **TC-01** | `constants.js`: Live 80G Google Form URL verification | **PASS** |
| **TC-02** | `constants.js`: Official registered contact info (Badshahi Thaul, Block Chamba, Tehri Garhwal, 249199, emails, phones) | **PASS** |
| **TC-03** | `constants.js`: Statutory credentials (CIN, PAN, TAN, HDFC Bank, IFSC) | **PASS** |
| **TC-04** | `Header.jsx`: Clean TechLab label and zero corrupted UTF-8 bytes | **PASS** |
| **TC-05** | `Footer.jsx`: Registered office, phone lines, TechLab badge, zero dead `#` links | **PASS** |
| **TC-06** | `Contact.jsx`: All 4 form inputs, phone links, and standardized office address | **PASS** |
| **TC-07** | `Donate.jsx`: Live Google Form CTA, copy widgets, official fallback email | **PASS** |
| **TC-08** | `About.jsx`: Section 8 credentials and full address including Block Chamba | **PASS** |
| **TC-09** | `Legal.jsx`: RoC jurisdiction, official privacy email, and address | **PASS** |
| **TC-10** | `Home.jsx`: Initiative explore links active and newsletter feedback active | **PASS** |
| **TC-11** | `App.jsx`: Complete route tree including 404 catch-all (`NotFound`) | **PASS** |
| **TC-12** | `tailwind.config.js`: Complete 11-step primary color spectrum (50–950) | **PASS** |
| **TC-13** | `index.html` & `sitemap.xml`: Complete metadata and `/donate` route presence | **PASS** |

**Summary: 13 Tests Executed | 13 Passed | 0 Failed**

---

## 3. Route Testing Matrix

| Route | Component | Verification Evidence | Result |
|:---|:---|:---|:---|
| `#/` | `Home.jsx` | Hero banner, Strategic Pillars with active `/portfolio` links, Focus Areas, Impact Gallery, Newsletter | **PASS** |
| `#/about` | `About.jsx` | Identity card, Section 8 status, Incorporation date, Registered Office with Block Chamba, CIN/PAN | **PASS** |
| `#/portfolio` | `Portfolio.jsx` | Initiatives list, Category badges, Status tags (Ongoing/Completed/Planning) | **PASS** |
| `#/legal` | `Legal.jsx` | Hash navigation (`#privacy`, `#terms`), Section 8 disclosures, RoC Uttarakhand jurisdiction | **PASS** |
| `#/contact` | `Contact.jsx` | Form inputs, submit button, click-to-call links (`+91-9690720525`, `+91-9760325927`), emails | **PASS** |
| `#/donate` | `Donate.jsx` | Verified HDFC details, 1-click copy widgets, live Google Form link, official fallback mailto | **PASS** |
| `#/404-test` | `NotFound.jsx` | Error 404 badge, institutional explanation, "Go to Homepage" and "Contact Us" CTAs | **PASS** |

---

## 4. Tests That Could Not Be Executed & Explanations

1. **Lighthouse Automated CI Benchmark:**
   - *Status:* Skipped.
   - *Reason:* Google Chrome was present, but running Lighthouse in automated headless sandboxed mode requires a dedicated Lighthouse CLI package and Chromium flag configurations that were not pre-installed.
2. **End-to-End Live Supabase Database Ingestion:**
   - *Status:* Skipped.
   - *Reason:* No `.env` credentials provided for Supabase. The client gracefully handles this unconfigured state without throwing fatal runtime errors.
3. **Live Gemini AI Chat Responses:**
   - *Status:* Skipped.
   - *Reason:* No `VITE_GEMINI_API_KEY` provided. The assistant UI gracefully catches the missing key and displays friendly status messages.
