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
console.log('   CHANGE FOUNDATION — PHASE 5 LAUNCH SUITE        ');
console.log('====================================================\n');

test('Schema.org JSON-LD Structured Data in index.html', () => {
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    assert(html.includes('<script type="application/ld+json">'), 'Missing application/ld+json tag');

    const jsonMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert(jsonMatch && jsonMatch[1], 'Could not extract JSON-LD body');

    const parsed = JSON.parse(jsonMatch[1]);
    assert(parsed['@context'] === 'https://schema.org', 'Context must be https://schema.org');
    assert(Array.isArray(parsed['@graph']), 'Root graph must be an array');

    const ngo = parsed['@graph'].find(item => item['@type'] && item['@type'].includes('NGO'));
    assert(ngo, 'Missing NGO entity in graph');
    assert(ngo.name === 'Centre for Himalayan Agriculture and Nature Foundation', 'Legal name mismatch');
    assert(ngo.taxID === 'AANCC4675P', 'PAN taxID mismatch');
    assert(ngo.identifier === 'U94990UT2026NPL020676', 'CIN identifier mismatch');
    assert(ngo.address.postalCode === '249199', 'Pincode mismatch');
    assert(ngo.address.streetAddress.includes('Block Chamba'), 'Address missing Block Chamba');

    const website = parsed['@graph'].find(item => item['@type'] === 'WebSite');
    assert(website, 'Missing WebSite entity in graph');
    assert(website.name === 'CHANGE Foundation', 'Website name mismatch');
});

test('Google Search Console & GA4 Verification Tags in index.html', () => {
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    assert(html.includes('google-site-verification'), 'GSC verification placeholder missing');
    assert(html.includes('googletagmanager.com/gtag/js'), 'GA4 tag placeholder missing');
});

test('Sitemap.xml canonical structure & route coverage', () => {
    const sitemap = fs.readFileSync(path.join(root, 'public/sitemap.xml'), 'utf8');
    assert(sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'), 'Invalid sitemap namespace');

    const expectedRoutes = [
        'https://www.change-uttarakhand.org/',
        'https://www.change-uttarakhand.org/about',
        'https://www.change-uttarakhand.org/portfolio',
        'https://www.change-uttarakhand.org/contact',
        'https://www.change-uttarakhand.org/legal',
        'https://www.change-uttarakhand.org/donate'
    ];

    for (const route of expectedRoutes) {
        assert(sitemap.includes(`<loc>${route}</loc>`), `Route ${route} missing from sitemap`);
    }
});

test('Robots.txt integration with sitemap', () => {
    const robots = fs.readFileSync(path.join(root, 'public/robots.txt'), 'utf8');
    assert(robots.includes('User-agent: *'), 'Missing User-agent');
    assert(robots.includes('Allow: /'), 'Missing Allow: /');
    assert(robots.includes('Sitemap: https://www.change-uttarakhand.org/sitemap.xml'), 'Robots.txt sitemap reference incorrect');
});

console.log('\n----------------------------------------------------');
const passed = testResults.filter(t => t.status === 'PASS').length;
console.log(`TOTAL PHASE 5 TESTS: ${testResults.length} | PASSED: ${passed} | FAILED: ${testResults.length - passed}`);
console.log('----------------------------------------------------\n');

if (passed !== testResults.length) {
    process.exit(1);
}
