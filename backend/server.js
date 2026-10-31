const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Security: Enforce request body limits to prevent payload exhaustion attacks
app.use(cors({
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10kb' }));

// Security Headers middleware
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Basic sliding-window rate limiter (in-memory)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 15;

const rateLimiter = (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    const timestamps = (rateLimitMap.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);

    if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
        return res.status(429).json({
            error: 'Too many requests. Please wait a moment before trying again.'
        });
    }

    timestamps.push(now);
    rateLimitMap.set(ip, timestamps);
    next();
};

app.use('/api/', rateLimiter);

// 1. Health Status Endpoint
app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        service: 'CHANGE Foundation Backend API',
        legalEntity: 'Centre for Himalayan Agriculture and Nature Foundation',
        timestamp: new Date().toISOString()
    });
});

// 2. Newsletter Subscription Endpoint
app.post('/api/subscribe', (req, res) => {
    const { email } = req.body || {};
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
        return res.status(400).json({ error: 'A valid email address is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    // Log for audit tracking (without exposing secrets)
    console.log(`[Subscription] Valid email registered: ${cleanEmail}`);

    return res.status(200).json({
        success: true,
        message: 'Successfully subscribed to the CHANGE Foundation newsletter!',
        email: cleanEmail
    });
});

// 3. Contact Form Submission Endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message, website_url } = req.body || {};

    // Bot trap / honeypot check: If the hidden honeypot field is populated, silently reject
    if (website_url) {
        return res.status(200).json({ success: true, message: 'Message received.' });
    }

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ error: 'Name is required.' });
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
        return res.status(400).json({ error: 'A valid email address is required.' });
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
        return res.status(400).json({ error: 'Subject is required.' });
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return res.status(400).json({ error: 'Message content is required.' });
    }

    // Input length caps
    if (name.length > 120 || subject.length > 200 || message.length > 3000) {
        return res.status(400).json({ error: 'Payload exceeds maximum allowed length.' });
    }

    console.log(`[Contact] Received inquiry from ${name.trim()} (${email.trim()}): ${subject.trim()}`);

    return res.status(200).json({
        success: true,
        message: 'Thank you! Your inquiry has been delivered to the Foundation team.'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('[Error] Uncaught server error:', err.message);
    res.status(500).json({ error: 'Internal server error.' });
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
