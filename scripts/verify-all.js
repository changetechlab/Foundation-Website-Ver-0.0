import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const testResults = [];
function test(name, fn) {
    try {
        fn();
        testResults.push({ name, status: 'PASS' });
        console.log(`✓ PASS: ${name}`);
    } catch (err) {
        testResults.push({ name, status: 'FAIL', error: err.message });
        console.error(`✗ FAIL: ${name}\n  Error: ${err.message}`);
    }
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}

console.log('====================================================');
console.log('   CHANGE FOUNDATION — INDEPENDENT QA VERIFIER     ');
console.log('====================================================\n');

// 1. Constants Verification
test('constants.js: Live 80G Google Form link', () => {
    const content = fs.readFileSync(path.join(root, 'src/lib/constants.js'), 'utf8');
    assert(content.includes('export const DONATION_RECEIPT_FORM_URL = "https://forms.gle/9JjzySaY7cpdsxqd8";'), 'DONATION_RECEIPT_FORM_URL must match live form link');
});

test('constants.js: Official registered contact info', () => {
    const content = fs.readFileSync(path.join(root, 'src/lib/constants.js'), 'utf8');
    assert(content.includes('Badshahi Thaul'), 'Missing Badshahi Thaul');
    assert(content.includes('"Block Chamba"'), 'Missing Block Chamba');
    assert(content.includes('"Tehri Garhwal"'), 'Missing Tehri Garhwal');
    assert(content.includes('"249199"'), 'Missing 249199');
    assert(content.includes('"thechangeuttarakhand@gmail.com"'), 'Missing primary email');
    assert(content.includes('"changetechlab@gmail.com"'), 'Missing TechLab email');
    assert(content.includes('"+91-9690720525"'), 'Missing primary phone');
    assert(content.includes('"+91-9760325927"'), 'Missing secondary phone');
});

test('constants.js: Corporate credentials', () => {
    const content = fs.readFileSync(path.join(root, 'src/lib/constants.js'), 'utf8');
    assert(content.includes('"U94990UT2026NPL020676"'), 'CIN mismatch');
    assert(content.includes('"AANCC4675P"'), 'PAN mismatch');
    assert(content.includes('"MRTC08215E"'), 'TAN mismatch');
    assert(content.includes('"HDFC0000472"'), 'IFSC mismatch');
    assert(content.includes('"50200123157375"'), 'Account number mismatch');
});

// 2. Header Verification
test('Header.jsx: Clean TechLab label and no corrupt UTF-8 bytes', () => {
    const content = fs.readFileSync(path.join(root, 'src/components/Header.jsx'), 'utf8');
    assert(!content.includes('sT,?'), 'Corrupted byte sequence found');
    assert(!content.includes('\ufffd'), 'Replacement character found');
    assert(content.includes('🔬 TechLab'), 'Missing TechLab link');
    assert(content.includes('href="https://change-techlab.onrender.com"'), 'Missing TechLab URL');
    assert(content.includes('rel="noopener noreferrer"'), 'Missing secure rel attribute');
});

// 3. Footer Verification
test('Footer.jsx: Registered office, phone lines, TechLab badge, legal links', () => {
    const content = fs.readFileSync(path.join(root, 'src/components/Footer.jsx'), 'utf8');
    assert(content.includes('legalData.registeredOffice.block'), 'Footer must display registered office block');
    assert(content.includes('legalData.contact.phones'), 'Footer must render phone numbers');
    assert(content.includes('Website Managed and Maintained by'), 'Footer must render maintenance attribution');
    assert(content.includes('CHANGE TechLab'), 'Footer must name CHANGE TechLab');
    assert(content.includes('techLabLogo'), 'Footer must import and render TechLab logo');
    assert(!content.includes('href="#"'), 'Footer must not contain dead href="#" links');
});

// 4. Contact Page Verification
test('Contact.jsx: Form fields and standardized address', () => {
    const content = fs.readFileSync(path.join(root, 'src/pages/Contact.jsx'), 'utf8');
    assert(content.includes('legalData.registeredOffice.block'), 'Contact page must display office block');
    assert(content.includes('name="name"'), 'Missing name input');
    assert(content.includes('name="email"'), 'Missing email input');
    assert(content.includes('name="subject"'), 'Missing subject input');
    assert(content.includes('name="message"'), 'Missing message input');
    assert(content.includes('legalData.contact.phones'), 'Contact page must render phone numbers');
});

// 5. Donate Page Verification
test('Donate.jsx: Live Google Form CTA, copy widgets, fallback email', () => {
    const content = fs.readFileSync(path.join(root, 'src/pages/Donate.jsx'), 'utf8');
    assert(content.includes('href={DONATION_RECEIPT_FORM_URL}'), 'Donate page must link to DONATION_RECEIPT_FORM_URL');
    assert(content.includes('legalData.contact.email'), 'Fallback email must use official legalData email');
    assert(!content.includes('anupamrayal@gmail.com'), 'Must not contain personal fallback email');
    assert(content.includes('handleCopy'), 'Copy to clipboard handler must exist');
    assert(content.includes('bankDetails.ifscCode'), 'IFSC must be displayed');
    assert(content.includes('bankDetails.accountNumber'), 'Account number must be displayed');
});

// 6. About Page Verification
test('About.jsx: Section 8 credentials and full address with Block Chamba', () => {
    const content = fs.readFileSync(path.join(root, 'src/pages/About.jsx'), 'utf8');
    assert(content.includes('legalData.registeredOffice.block'), 'About page must display Block Chamba');
    assert(content.includes('legalData.cin'), 'About page must display CIN');
    assert(content.includes('legalData.pan'), 'About page must display PAN');
    assert(content.includes('legalData.legalStatus'), 'About page must display Section 8 status');
});

// 7. Legal Page Verification
test('Legal.jsx: RoC jurisdiction, privacy email, and address', () => {
    const content = fs.readFileSync(path.join(root, 'src/pages/Legal.jsx'), 'utf8');
    assert(content.includes('legalData.contact.email'), 'Privacy contact must use legalData email');
    assert(!content.includes('info@change-uttarakhand.org'), 'Must not contain stale email');
    assert(content.includes('legalData.registeredOffice.block'), 'Legal page must display Block Chamba');
});

// 8. Home Page Verification
test('Home.jsx: Initiative explore links and newsletter feedback', () => {
    const content = fs.readFileSync(path.join(root, 'src/pages/Home.jsx'), 'utf8');
    assert(content.includes('<Link to="/portfolio"'), 'Pillars must link to /portfolio');
    assert(!content.includes('<button className="flex items-center text-gray-700 hover:text-gray-900 font-medium group">\n                                        Explore Initiative'), 'Unbound button must be replaced');
});

// 9. App.jsx Route Integrity & 404
test('App.jsx: Complete route tree including 404 catch-all', () => {
    const content = fs.readFileSync(path.join(root, 'src/App.jsx'), 'utf8');
    assert(content.includes('path="/"'), 'Home route missing');
    assert(content.includes('path="/about"'), 'About route missing');
    assert(content.includes('path="/portfolio"'), 'Portfolio route missing');
    assert(content.includes('path="/legal"'), 'Legal route missing');
    assert(content.includes('path="/contact"'), 'Contact route missing');
    assert(content.includes('path="/donate"'), 'Donate route missing');
    assert(content.includes('path="*"'), '404 catch-all route missing');
    assert(content.includes('NotFound'), 'NotFound component must be registered');
});

// 10. Tailwind Configuration
test('tailwind.config.js: Complete 11-step primary color spectrum', () => {
    const content = fs.readFileSync(path.join(root, 'tailwind.config.js'), 'utf8');
    const requiredShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
    for (const shade of requiredShades) {
        assert(content.includes(`${shade}:`), `Missing primary shade ${shade}`);
    }
});

// 11. SEO & Metadata
test('index.html & sitemap.xml: Complete metadata and routes', () => {
    const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    assert(indexHtml.includes('property="og:title"'), 'Missing og:title');
    assert(indexHtml.includes('name="twitter:card"'), 'Missing twitter:card');
    assert(indexHtml.includes('name="description"'), 'Missing meta description');
    assert(indexHtml.includes('<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX">'), 'GA4 tag must be commented out');
    assert(indexHtml.includes('<!-- <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" /> -->'), 'Verification code must be commented out');

    const sitemap = fs.readFileSync(path.join(root, 'public/sitemap.xml'), 'utf8');
    assert(sitemap.includes('/donate</loc>'), 'Sitemap must include /donate route');
});

console.log('\n----------------------------------------------------');
const total = testResults.length;
const passed = testResults.filter(t => t.status === 'PASS').length;
const failed = testResults.filter(t => t.status === 'FAIL').length;
console.log(`TOTAL TESTS: ${total} | PASSED: ${passed} | FAILED: ${failed}`);
console.log('----------------------------------------------------\n');

if (failed > 0) {
    process.exit(1);
} else {
    process.exit(0);
}
