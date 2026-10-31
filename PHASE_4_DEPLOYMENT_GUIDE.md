# Phase 4: Domain, Hosting, HTTPS & Production Deployment Guide

**Organization:** Centre for Himalayan Agriculture and Nature Foundation (CHANGE)  
**Corporate Identification Number (CIN):** U94990UT2026NPL020676  
**Section 8 Non-Profit Registration:** Ministry of Corporate Affairs, Government of India  
**Target Domains:** `change-uttarakhand.org` / `changefoundation.in`  
**Date:** October 31, 2026  
**Status:** **DEPLOYMENT READY**

---

## 1. Executive Summary

Phase 4 prepares the CHANGE Foundation platform for public web launch on institutional custom domains with automated SSL/HTTPS encryption, single-page application (SPA) routing, and production security headers.

All deployment configurations have been built into the project:
- ✅ **SPA Routing & Redirects:** [`public/_redirects`](file:///c:/Users/admin/Foundation-Website-Ver-0.0/public/_redirects) and [`netlify.toml`](file:///c:/Users/admin/Foundation-Website-Ver-0.0/netlify.toml)
- ✅ **Vercel Rewrites & Headers:** [`vercel.json`](file:///c:/Users/admin/Foundation-Website-Ver-0.0/vercel.json)
- ✅ **GitHub Actions CI/CD Workflow:** [`.github/workflows/deploy.yml`](file:///c:/Users/admin/Foundation-Website-Ver-0.0/.github/workflows/deploy.yml)
- ✅ **Dynamic Base Path Adaptation:** [`vite.config.js`](file:///c:/Users/admin/Foundation-Website-Ver-0.0/vite.config.js) supports custom domain root (`/`) or GitHub Pages subpath.

---

## 2. Recommended Hosting Platforms Comparison

For a Section 8 Non-Profit organization, the following three hosting options provide free-tier enterprise reliability with zero hosting fees:

| Platform | Cost | SSL / HTTPS | Build Integration | Recommendation |
|:---|:---|:---|:---|:---|
| **Vercel** | **Free ($0/mo)** | Automated 1-Click | Native Vite detector, 30s deployments | **Top Pick (Easiest)** |
| **Cloudflare Pages** | **Free ($0/mo)** | Automated Edge SSL | Unlimited bandwidth, built-in DDoS shield | **Best for High Traffic** |
| **Netlify** | **Free ($0/mo)** | Automated Let's Encrypt | Pre-configured via `netlify.toml` | **Excellent Alternative** |
| **GitHub Pages** | **Free ($0/mo)** | Automated GitHub SSL | Pre-configured via `.github/workflows/deploy.yml` | **Standard Fallback** |

---

## 3. Step-by-Step Deployment Blueprints

### Blueprint A: Deploying via Vercel (Recommended — ~2 Minutes)

1. **Sign In to Vercel:** Go to [vercel.com](https://vercel.com) and sign in using your GitHub account.
2. **Import Repository:**
   - Click **"Add New..."** -> **"Project"**.
   - Select your repository (`Foundation-Website-Ver-0.0`).
3. **Configure Project Settings:**
   - **Framework Preset:** Vite (detected automatically).
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. **Configure Environment Variables:**
   Under **"Environment Variables"**, add:
   - `VITE_BASE_PATH`: `/`
   - `VITE_SUPABASE_URL`: `https://your-project.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `your-anon-key`
   - `VITE_GEMINI_API_KEY`: `your-gemini-key`
5. **Deploy:** Click **"Deploy"**. Vercel will build and assign an instant production URL (e.g. `change-foundation.vercel.app`) with automatic HTTPS.

---

### Blueprint B: Deploying via Cloudflare Pages

1. **Log in to Cloudflare Dashboard:** Go to [dash.cloudflare.com](https://dash.cloudflare.com/) -> **Workers & Pages**.
2. **Create Application:** Click **"Create Application"** -> **"Pages"** -> **"Connect to Git"**.
3. **Select Repository:** Choose your Foundation repository.
4. **Build Settings:**
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variables:**
     - `VITE_BASE_PATH` = `/`
     - `NODE_VERSION` = `20`
5. **Save & Deploy:** Cloudflare distributes your static build to 300+ global edge data centers.

---

### Blueprint C: Deploying via Netlify

1. **Log in to Netlify:** Go to [netlify.com](https://www.netlify.com/).
2. **Import from Git:** Click **"Add new site"** -> **"Import an existing project"**.
3. **Zero Configuration:** Netlify will automatically detect [`netlify.toml`](file:///c:/Users/admin/Foundation-Website-Ver-0.0/netlify.toml), setting build command to `npm run build` and publish directory to `dist`.
4. **Environment Variables:** In **Site configuration** -> **Environment variables**, set `VITE_BASE_PATH` to `/`.
5. **Deploy Site:** Click **"Deploy"**.

---

### Blueprint D: GitHub Pages (Current Configuration)

1. In your GitHub repository, navigate to **Settings** -> **Pages**.
2. Under **"Build and deployment"** -> **Source**, choose **"GitHub Actions"**.
3. Under **Settings** -> **Secrets and variables** -> **Actions**, add repository secrets:
   - `VITE_GEMINI_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Push to branch `main`: `.github/workflows/deploy.yml` automatically builds and deploys to `https://<username>.github.io/Foundation-Website-Ver-0.0/`.

---

## 4. Custom Domain & DNS Configuration (GoDaddy, Namecheap, Google Domains)

To connect `www.change-uttarakhand.org` or `changefoundation.in` to your hosting platform, add the following DNS records in your domain registrar's DNS Management panel:

### If Hosting on Vercel:
| Type | Name / Host | Value / Target | TTL |
|:---|:---|:---|:---|
| **A** | `@` (apex) | `76.76.21.21` | Automatic / 300 |
| **CNAME** | `www` | `cname.vercel-dns.com` | Automatic / 300 |

### If Hosting on Cloudflare Pages:
| Type | Name / Host | Value / Target | TTL |
|:---|:---|:---|:---|
| **CNAME** | `www` | `<your-project>.pages.dev` | Proxied |
| **CNAME** | `@` | `<your-project>.pages.dev` | Proxied (Flattened) |

### If Hosting on Netlify:
| Type | Name / Host | Value / Target | TTL |
|:---|:---|:---|:---|
| **A** | `@` (apex) | `75.2.60.5` | Automatic / 300 |
| **CNAME** | `www` | `<your-site-name>.netlify.app` | Automatic / 300 |

---

## 5. Official Email DNS Records (Google Workspace / Zoho Mail)

To ensure high deliverability and avoid spam filters when sending or receiving from `thechangeuttarakhand@gmail.com` or custom domain email:

### SPF Record:
- **Type:** `TXT`
- **Host:** `@`
- **Value:** `v=spf1 include:_spf.google.com ~all`

### DMARC Policy Record:
- **Type:** `TXT`
- **Host:** `_dmarc`
- **Value:** `v=DMARC1; p=none; rua=mailto:thechangeuttarakhand@gmail.com`

---

## 6. SSL / HTTPS Certificate Enforcement

All recommended providers (Vercel, Cloudflare, Netlify) automatically issue and renew free Let's Encrypt / DigiCert SSL certificates:
1. **Force HTTPS Redirect:** Ensure the **"Always Use HTTPS"** or **"Enforce HTTPS"** toggle is enabled in your hosting dashboard.
2. **Canonical Domain Redirection:** Configure automatic redirection from root domain (`change-uttarakhand.org`) to `www.change-uttarakhand.org` (or vice versa) to prevent duplicate content SEO penalties.

---

## 7. Pre-Go-Live Smoke Test Checklist

Once the domain DNS has propagated (typically 5 to 30 minutes):

- [ ] **HTTPS Padlock:** Open `https://www.change-uttarakhand.org` and verify valid SSL certificate.
- [ ] **Apex Redirect:** Open `http://change-uttarakhand.org` and confirm it redirects securely to `https://www.change-uttarakhand.org`.
- [ ] **Route Direct Navigation:** Directly visit `https://www.change-uttarakhand.org/#/donate` and refresh the page to confirm zero 404 errors.
- [ ] **Google Form Link:** Click "Fill Receipt Request Form" and confirm live form opens in new tab.
- [ ] **Phone & Email Links:** Click telephone numbers on a mobile device to verify instant dialer prompt.
- [ ] **404 Catch-All:** Type `https://www.change-uttarakhand.org/#/non-existent-page` and verify the institutional 404 page renders cleanly.

