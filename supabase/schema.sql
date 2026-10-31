-- ==============================================================================
-- CHANGE Foundation (Centre for Himalayan Agriculture and Nature Foundation)
-- Supabase PostgreSQL Production Schema & Row Level Security (RLS)
-- Entity: Section 8 Company (CIN: U94990UT2026NPL020676)
-- ==============================================================================

-- 1. Contacts Table (Public inquiries, volunteer requests, CSR proposals)
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'in_progress', 'resolved', 'archived')),
    ip_hash VARCHAR(64) DEFAULT NULL,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Index for searching and filtering inquiries
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON public.contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON public.contacts(email);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Security Policy: Anyone (anon) can insert inquiries
CREATE POLICY "Allow anonymous submission"
    ON public.contacts
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        length(trim(name)) > 0 AND
        length(trim(email)) > 0 AND
        length(trim(message)) > 0
    );

-- Security Policy: Deny public reading of inquiries (Prevents data harvesting)
CREATE POLICY "Deny public read access"
    ON public.contacts
    FOR SELECT
    TO anon
    USING (false);

-- Only authenticated staff/admin can read inquiries
CREATE POLICY "Allow authenticated staff read"
    ON public.contacts
    FOR SELECT
    TO authenticated
    USING (true);

-- Only authenticated staff/admin can update inquiry status
CREATE POLICY "Allow authenticated staff update"
    ON public.contacts
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);


-- ==============================================================================
-- 2. Newsletter Subscribers Table
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscribed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    email VARCHAR(255) NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    source VARCHAR(50) DEFAULT 'website_footer'
);

-- Index for subscriber email lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_is_active ON public.newsletter_subscribers(is_active);

-- Enable Row Level Security (RLS)
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Security Policy: Anyone can subscribe
CREATE POLICY "Allow anonymous newsletter subscription"
    ON public.newsletter_subscribers
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        length(trim(email)) > 0 AND
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    );

-- Security Policy: Deny public read access to subscriber list
CREATE POLICY "Deny public subscriber reads"
    ON public.newsletter_subscribers
    FOR SELECT
    TO anon
    USING (false);

-- Only authenticated staff can view the newsletter subscriber list
CREATE POLICY "Allow authenticated staff subscriber reads"
    ON public.newsletter_subscribers
    FOR SELECT
    TO authenticated
    USING (true);

