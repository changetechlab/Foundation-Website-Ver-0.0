import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { legalData } from '../lib/constants';
import { supabase } from '../lib/supabase';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        bot_trap: '' // Honeypot field for bot mitigation
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        // Honeypot check: If bot filled the hidden field, silently return success without DB write
        if (formData.bot_trap) {
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '', bot_trap: '' });
            setIsSubmitting(false);
            return;
        }

        // Client payload sanitization & trimming
        const cleanPayload = {
            name: formData.name.trim().slice(0, 120),
            email: formData.email.trim().toLowerCase().slice(0, 255),
            subject: formData.subject.trim().slice(0, 200),
            message: formData.message.trim().slice(0, 3000)
        };

        if (!cleanPayload.name || !cleanPayload.email || !cleanPayload.subject || !cleanPayload.message) {
            setSubmitStatus('error');
            setIsSubmitting(false);
            return;
        }

        if (!supabase) {
            console.warn('Supabase client not initialized. Inquiries can also be directed to official email.');
            setSubmitStatus('error');
            setIsSubmitting(false);
            return;
        }

        try {
            const { error } = await supabase
                .from('contacts')
                .insert([cleanPayload]);

            if (error) {
                console.error('Supabase error:', error);
                setSubmitStatus('error');
            } else {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '', bot_trap: '' });
                setTimeout(() => setSubmitStatus(null), 5000);
            }
        } catch (err) {
            console.error('Submit failed:', err);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Helmet>
                <title>Contact Us | CHANGE Foundation</title>
                <meta name="description" content="Get in touch with CHANGE Foundation. Visit our registered office in Tehri Garhwal or send us a message for partnerships and volunteering." />
                <link rel="canonical" href="https://www.changefoundation.in/contact" />
            </Helmet>
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    We'd love to hear from you. Reach out to us for partnerships, volunteering, or general inquiries.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="space-y-8">
                    <div className="bg-primary-50 rounded-2xl p-8 border border-primary-100">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <MapPin className="h-6 w-6 text-primary-600" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">Registered Office</h3>
                                    <p className="mt-1 text-gray-600">
                                        {legalData.registeredOffice.address},<br />
                                        {legalData.registeredOffice.block},<br />
                                        {legalData.registeredOffice.district},<br />
                                        {legalData.registeredOffice.state} - {legalData.registeredOffice.pincode}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Mail className="h-6 w-6 text-primary-600" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                                    <a href={`mailto:${legalData.contact.email}`} className="mt-1 block text-gray-600 hover:text-primary-600 transition-colors">
                                        {legalData.contact.email}
                                    </a>
                                    <a href={`mailto:${legalData.contact.emailAlt}`} className="block text-sm text-gray-500 hover:text-primary-600 transition-colors">
                                        {legalData.contact.emailAlt} <span className="text-xs text-gray-400">(TechLab)</span>
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Phone className="h-6 w-6 text-primary-600" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                                    {legalData.contact.phones.map((phone) => (
                                        <a
                                            key={phone}
                                            href={`tel:${phone.replace(/-/g, '')}`}
                                            className="block mt-1 text-gray-600 hover:text-primary-600 transition-colors"
                                        >
                                            {phone}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Visit Us</h2>
                        <p className="text-gray-600 mb-4">
                            Our office is located in the heart of the Tehri Garhwal district. Visitors are welcome by appointment.
                        </p>
                        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-center space-y-2">
                            <MapPin className="h-8 w-8 text-primary-600 mx-auto" />
                            <h3 className="font-semibold text-gray-900">Tehri Garhwal Office Location</h3>
                            <p className="text-sm text-gray-600 max-w-sm mx-auto">
                                {legalData.registeredOffice.address}, {legalData.registeredOffice.block}, {legalData.registeredOffice.district}, {legalData.registeredOffice.state} - {legalData.registeredOffice.pincode}
                            </p>
                            <p className="text-xs text-gray-400">Coordinates & directions available on request</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>

                    {submitStatus === 'success' && (
                        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                            <span className="mr-2">✓</span> Message sent successfully! We'll get back to you soon.
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg text-sm">
                            <div className="flex items-center mb-1 font-semibold">
                                <span className="mr-2">⚠️</span> Submission Notice
                            </div>
                            <p>
                                Online database form is currently queued. Please email us directly at{' '}
                                <a href={`mailto:${legalData.contact.email}`} className="font-semibold underline">
                                    {legalData.contact.email}
                                </a>{' '}
                                or call{' '}
                                <a href={`tel:${legalData.contact.phones[0].replace(/-/g, '')}`} className="font-semibold underline">
                                    {legalData.contact.phones[0]}
                                </a>.
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Hidden Honeypot Anti-Bot Field */}
                        <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                            <label htmlFor="bot_trap">Do not fill this field</label>
                            <input
                                type="text"
                                id="bot_trap"
                                name="bot_trap"
                                value={formData.bot_trap}
                                onChange={handleChange}
                                tabIndex={-1}
                                autoComplete="off"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    maxLength={100}
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    maxLength={255}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                maxLength={150}
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                placeholder="How can we help?"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                maxLength={2000}
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                placeholder="Tell us more..."
                            ></textarea>
                            <p className="text-xs text-gray-400 text-right mt-1">
                                {formData.message.length} / 2000 characters
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Sending...' : (
                                <>
                                    Send Message <Send className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
