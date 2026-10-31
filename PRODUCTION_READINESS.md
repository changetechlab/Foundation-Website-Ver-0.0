# Production Readiness & Go-Live Checklist

**Organization:** Centre for Himalayan Agriculture and Nature Foundation (CHANGE)  
**Corporate Identity Number (CIN):** U94990UT2026NPL020676  
**Audited Date:** October 31, 2026 (Phase 2 Independent QA Verification)  
**Overall Readiness Verdict:** **READY WITH CONDITIONS**

---

## 1. Readiness Status by Feature

| Area | Production Status | Details | Action Required for Go-Live |
|:---|:---|:---|:---|
| **Core Website & Branding** | **Ready** | Full Section 8 company profile, CIN, PAN, TAN, Registered Office details verified across all pages. | None |
| **80G Donation Flow** | **Ready** | Live Google Form (`https://forms.gle/9JjzySaY7cpdsxqd8`), verified HDFC institutional bank account, 1-click copy widgets, official receipt mailto fallback. | None |
| **Header & Footer** | **Ready** | Clean TechLab badge, official phone lines, linked legal documents, CHANGE TechLab maintenance credit, zero dead `#` links. | None |
| **Styling & Responsive Layout** | **Ready** | Complete Tailwind primary color spectrum restored; tested across mobile, tablet, and desktop viewports. | None |
| **Routing & 404 Resilience** | **Ready** | Dedicated `NotFound` component registered as catch-all route; all internal routes verified. | None |
| **SEO & Social Cards** | **Ready** | OpenGraph tags, Twitter Cards, Sitemap with `/donate`, Robots.txt configured. | None |
| **Code Stability** | **Ready** | 0 ESLint errors, 0 build errors. | None |
| **Contact Form Submissions** | **Pending Backend** | Client form handles uninitialized client safely. Requires Supabase project keys in production `.env`. | Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to production hosting environment. |
| **AI ChatBot** | **Pending Backend** | Multilingual assistant UI ready; requires Gemini API key in production `.env` to converse. | Add `VITE_GEMINI_API_KEY` to production hosting environment. |
| **Web Analytics** | **Optional** | Google Analytics placeholder safely commented out. | Replace `G-XXXXXXXXXX` with active GA4 Measurement ID in `index.html` when ready. |

---

## 2. Environment Variables Specification for Production

When deploying to your hosting provider (Vercel, Netlify, Cloudflare Pages, or Render), configure the following environment variables:

```bash
# Supabase Configuration (for Contact Form storage)
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-public-key"

# Google Gemini API (for AI ChatBot assistant)
VITE_GEMINI_API_KEY="your-gemini-api-key"
```

---

## 3. Go-Live Conditions & Recommendation

### Recommendation: **READY WITH CONDITIONS**

The website is **READY** to be deployed immediately for all core informational, corporate compliance, and donation collection purposes.

**Conditions for Full Feature Completeness:**
1. **Contact Form Database:** To receive contact form inquiries via the database, configure Supabase credentials in the hosting environment. (Until configured, users can reach the team directly via the verified phone numbers and emails displayed alongside the form).
2. **AI ChatBot Responses:** To activate the AI assistant, supply a Google Gemini API key. (Until configured, the chatbot politely notifies the user of the system status).
3. **Domain Base Path:** Ensure `vite.config.js` `base` is configured according to the hosting environment (`/` for custom apex domain, or subpath if hosted on GitHub Pages subfolder).
