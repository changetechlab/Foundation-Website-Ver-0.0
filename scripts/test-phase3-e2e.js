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

async function asyncTest(name, fn) {
    try {
        await fn();
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
console.log('   CHANGE FOUNDATION — PHASE 3 E2E & SECURITY SUITE ');
console.log('====================================================\n');

// 1. Supabase SQL Schema & RLS Policies
test('Database Schema: contacts table & security definitions', () => {
    const sql = fs.readFileSync(path.join(root, 'supabase/schema.sql'), 'utf8');
    assert(sql.includes('CREATE TABLE IF NOT EXISTS public.contacts'), 'Missing contacts table');
    assert(sql.includes('ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;'), 'RLS must be enabled on contacts');
    assert(sql.includes('CREATE POLICY "Allow anonymous submission"'), 'Missing anon insert policy');
    assert(sql.includes('CREATE POLICY "Deny public read access"'), 'Missing anon read denial policy');
    assert(sql.includes('USING (false);'), 'Read access must be strictly denied to public anon users');
});

test('Database Schema: newsletter_subscribers table & RLS policies', () => {
    const sql = fs.readFileSync(path.join(root, 'supabase/schema.sql'), 'utf8');
    assert(sql.includes('CREATE TABLE IF NOT EXISTS public.newsletter_subscribers'), 'Missing subscribers table');
    assert(sql.includes('ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;'), 'RLS must be enabled on subscribers');
    assert(sql.includes('CREATE POLICY "Allow anonymous newsletter subscription"'), 'Missing anon newsletter insert policy');
    assert(sql.includes('CREATE POLICY "Deny public subscriber reads"'), 'Missing anon subscriber read denial policy');
});

// 2. Environment Variables Specification
test('Config: .env.example defines all required backend & API keys', () => {
    const envExample = fs.readFileSync(path.join(root, '.env.example'), 'utf8');
    assert(envExample.includes('VITE_SUPABASE_URL='), 'Missing VITE_SUPABASE_URL template');
    assert(envExample.includes('VITE_SUPABASE_ANON_KEY='), 'Missing VITE_SUPABASE_ANON_KEY template');
    assert(envExample.includes('VITE_GEMINI_API_KEY='), 'Missing VITE_GEMINI_API_KEY template');
    assert(envExample.includes('PORT='), 'Missing PORT template');
});

// 3. Client-Side Anti-Spam & Sanitization
test('Contact.jsx: Invisible honeypot bot trap field implemented', () => {
    const contactCode = fs.readFileSync(path.join(root, 'src/pages/Contact.jsx'), 'utf8');
    assert(contactCode.includes('bot_trap'), 'Honeypot field bot_trap must be in form state');
    assert(contactCode.includes('if (formData.bot_trap)'), 'Submission must intercept bot submissions');
    assert(contactCode.includes('tabIndex={-1}'), 'Honeypot input must be excluded from keyboard navigation');
});

test('Contact.jsx: Character length limits and trimming enforced', () => {
    const contactCode = fs.readFileSync(path.join(root, 'src/pages/Contact.jsx'), 'utf8');
    assert(contactCode.includes('maxLength={100}'), 'Name field must have maxLength 100');
    assert(contactCode.includes('maxLength={150}'), 'Subject field must have maxLength 150');
    assert(contactCode.includes('maxLength={2000}'), 'Message field must have maxLength 2000');
    assert(contactCode.includes('formData.name.trim()'), 'Name input must be trimmed');
    assert(contactCode.includes('formData.email.trim()'), 'Email input must be trimmed');
});

test('Contact.jsx: Human fallback notice configured when offline/unconfigured', () => {
    const contactCode = fs.readFileSync(path.join(root, 'src/pages/Contact.jsx'), 'utf8');
    assert(contactCode.includes('legalData.contact.email'), 'Fallback error must provide direct email');
    assert(contactCode.includes('legalData.contact.phones'), 'Fallback error must provide phone numbers');
});

// 4. Security Headers Configuration
test('Security Headers: public/_headers defines strict policies', () => {
    const headers = fs.readFileSync(path.join(root, 'public/_headers'), 'utf8');
    assert(headers.includes('X-Frame-Options: DENY'), 'Missing X-Frame-Options: DENY in _headers');
    assert(headers.includes('X-Content-Type-Options: nosniff'), 'Missing X-Content-Type-Options in _headers');
    assert(headers.includes('Referrer-Policy: strict-origin-when-cross-origin'), 'Missing Referrer-Policy in _headers');
    assert(headers.includes('Content-Security-Policy:'), 'Missing Content-Security-Policy in _headers');
});

test('Security Headers: vercel.json defines production security headers', () => {
    const vercel = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
    assert(Array.isArray(vercel.headers), 'vercel.json must have headers array');
    const headerKeys = vercel.headers[0].headers.map(h => h.key);
    assert(headerKeys.includes('X-Frame-Options'), 'Missing X-Frame-Options in vercel.json');
    assert(headerKeys.includes('X-Content-Type-Options'), 'Missing X-Content-Type-Options in vercel.json');
    assert(headerKeys.includes('Content-Security-Policy'), 'Missing CSP in vercel.json');
});

// 5. Backend Express Service Hardening
test('Backend Express: server.js security, limits, and endpoints', () => {
    const serverCode = fs.readFileSync(path.join(root, 'backend/server.js'), 'utf8');
    assert(serverCode.includes("express.json({ limit: '10kb' })"), 'Body size limit must be enforced');
    assert(serverCode.includes('rateLimiter'), 'Rate limiter middleware must be present');
    assert(serverCode.includes('/api/status'), 'Health status endpoint must be registered');
    assert(serverCode.includes('/api/subscribe'), 'Subscription endpoint must be registered');
    assert(serverCode.includes('/api/contact'), 'Contact submission endpoint must be registered');
    assert(serverCode.includes('website_url'), 'Backend must check for honeypot bot trap');
});

console.log('\n----------------------------------------------------');
const total = testResults.length;
const passed = testResults.filter(t => t.status === 'PASS').length;
const failed = testResults.filter(t => t.status === 'FAIL').length;
console.log(`TOTAL PHASE 3 TESTS: ${total} | PASSED: ${passed} | FAILED: ${failed}`);
console.log('----------------------------------------------------\n');

if (failed > 0) {
    process.exit(1);
} else {
    process.exit(0);
}

