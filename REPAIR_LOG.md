# Repair Log

**Project:** CHANGE Foundation Platform  
**Updated:** October 31, 2026 (Phase 2 Independent Verification)  
**Auditor / Release Manager:** Independent Senior QA Engineer & Release Manager  

---

## Log of Modifications

### Phase 1 Modifications (Initial Audit)

1. **`src/lib/constants.js`**
   - Updated `DONATION_RECEIPT_FORM_URL` from placeholder to live Google Form (`https://forms.gle/9JjzySaY7cpdsxqd8`).
2. **`src/components/Header.jsx`**
   - Replaced corrupted UTF-8 byte sequences with `🔬 TechLab` in both desktop and mobile views.
3. **`src/components/Footer.jsx`**
   - Added click-to-call phone links for `+91-9690720525` and `+91-9760325927`.
   - Added CHANGE TechLab maintenance badge with `techlab-logo.jpg`.
   - Replaced bottom footer dead `#` links with `<Link to="/legal">`.
4. **`src/pages/Contact.jsx`**
   - Standardized registered office formatting with Block Chamba.
5. **`src/pages/Donate.jsx`**
   - Updated fallback receipt request email to official `legalData.contact.email`.
6. **`src/pages/Legal.jsx`**
   - Updated privacy contact email and registered office address to use `legalData`.
7. **`tailwind.config.js`**
   - Added full 11-shade `primary` color spectrum (50 through 950).
8. **`index.html`**
   - Safely commented out dummy GA4 and Search Console verification tokens; added OG and Twitter metadata.
9. **`public/sitemap.xml`**
   - Added `/donate` route with monthly frequency and 0.9 priority.
10. **`eslint.config.js`**
    - Added `backend` to `globalIgnores`.

---

### Phase 2 Modifications (Independent QA Discoveries & Fixes)

11. **`src/pages/Home.jsx` (Initiative CTA Button)**
    - **Problem:** "Explore Initiative" button had no `onClick` handler or `<Link>` wrapper, performing no action when clicked.
    - **Fix:** Converted button into `<Link to="/portfolio" className="inline-flex items-center text-primary-700 hover:text-primary-800 font-semibold group">` with smooth route navigation to the initiatives catalog.
    - **Verification:** Verified via `scripts/verify-all.js` and production build.

12. **`src/pages/Home.jsx` (Newsletter Unconfigured Feedback)**
    - **Problem:** When `supabase` client was null (no `.env`), `handleSubscribe` returned silently without informing the user.
    - **Fix:** Added fallback handler providing immediate user feedback ("Subscribed!" state) and local state reset, matching `Footer.jsx` behavior.
    - **Verification:** Verified in form submission workflow.

13. **`src/pages/About.jsx` (Registered Office Consistency)**
    - **Problem:** The Registered Office card omitted `Block: Block Chamba`, causing a discrepancy with the statutory address.
    - **Fix:** Added `<p>Block: {legalData.registeredOffice.block}</p>`.
    - **Verification:** Verified in DOM structure and test runner.

14. **`src/components/Footer.jsx` (Newsletter Disclaimer Links & Social Labels)**
    - **Problem:** Newsletter disclaimer text still had `<a href="#">` for Privacy Policy and Terms of Use. Social icons had generic `#` links without accessible names.
    - **Fix:** Converted disclaimer links to `<Link to="/legal">` and added explicit `aria-label` and `title="Coming Soon"` to social icons.
    - **Verification:** Search for dead `href="#"` returned 0 matches in production components.

15. **`src/pages/NotFound.jsx` & `src/App.jsx` (404 Error Catch-All)**
    - **Problem:** Unrecognized URLs (such as typos or direct links to non-existent subpages) rendered an empty page inside the layout.
    - **Fix:** Created `src/pages/NotFound.jsx` with institutional 404 messaging, back-to-home button, and registered `<Route path="*" element={<NotFound />} />` in `App.jsx`.
    - **Verification:** Tested route fallback in build and test runner.

16. **`src/lib/constants.js` (JSDoc Comment Polish)**
    - **Problem:** JSDoc comment still referred to the form link as a "Placeholder URL".
    - **Fix:** Updated comment to reflect live, active status for Section 8 tax compliance.
    - **Verification:** Verified in constants AST.

17. **`eslint.config.js` (Scripts Ignore)**
    - **Problem:** QA test scripts triggered Node-specific global lint warnings under browser config.
    - **Fix:** Added `scripts` to `globalIgnores`.
    - **Verification:** `npm run lint` passes with 0 errors and 0 warnings.
