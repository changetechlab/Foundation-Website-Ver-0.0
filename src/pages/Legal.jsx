import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { legalData } from '../lib/constants';

const Legal = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [hash]);

    return (
        <div className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen">
            <Helmet>
                <title>Legal & Privacy Policy | CHANGE Foundation</title>
                <meta name="description" content="Review our Terms of Use, Privacy Policy, and Governance structure. We are committed to transparency and compliance as a Section 8 Non-Profit." />
                <link rel="canonical" href="https://www.changefoundation.in/legal" />
            </Helmet>
            <div className="container mx-auto px-4 max-w-4xl">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Legal & Governance</h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 font-light">Transparency and compliance are the foundation of our impact.</p>
                    <div className="w-24 h-1 bg-emerald-600 dark:bg-emerald-500 mx-auto rounded-full mt-6"></div>
                </header>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-400 mb-6 uppercase tracking-wider">Legal Entity Details</h2>
                    <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Corporate Name</h4>
                                <p className="text-lg font-bold text-slate-900 dark:text-white">Centre for Himalayan Agriculture and Nature Foundation</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Entity Type</h4>
                                <p className="text-lg font-bold text-slate-900 dark:text-white">Section 8 Company (Limited by Guarantee)</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">CIN (Corporate Identity Number)</h4>
                                <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">U94990UT2026NPL020676</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date of Incorporation</h4>
                                <p className="text-lg font-bold text-slate-900 dark:text-white">January 20, 2026</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Permanent Account Number (PAN)</h4>
                                <p className="text-lg font-bold text-slate-900 dark:text-white">AANCC4675P</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tax Deduction Account Number (TAN)</h4>
                                <p className="text-lg font-bold text-slate-900 dark:text-white">MRTC08215E</p>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                            <p className="text-slate-600 dark:text-slate-400 italic text-sm leading-relaxed">
                                Incorporated under the Companies Act, 2013, Ministry of Corporate Affairs, Government of India. The organisation works exclusively for public benefit as per its Memorandum of Association (MoA).
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-400 mb-6 uppercase tracking-wider">Governance & Audits</h2>
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg">
                        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                            The organisation is governed by a Board of Directors committed to high ethical standards and statutory compliance.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <span className="font-medium text-slate-700 dark:text-slate-200">12AA & 80G Certification (Applied/In-Process)</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <span className="font-medium text-slate-700 dark:text-slate-200">Annual Financial Statements Audited by Statutory Auditors</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <span className="font-medium text-slate-700 dark:text-slate-200">Strict Adherence to Section 8 Non-Profit Utilization Norms</span>
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="mb-16 pt-8 border-t border-slate-100 dark:border-slate-800">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-sm">Brand Identity Policy</h2>
                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-4 text-sm">
                        <p>
                            <strong>"CHANGE"</strong> is the registered public brand identity of the legal entity <strong>Centre for Himalayan Agriculture and Nature Foundation</strong>. All public-facing communications, websites, and digital assets under the "CHANGE" brand are the intellectual property of the Foundation.
                        </p>
                        <p>
                            Unauthorized use of the logo, mission statements, or proprietary data models (including FarmerBook metrics) is strictly prohibited and subject to legal action under intellectual property laws of India.
                        </p>
                    </div>
                </section>

                {/* Privacy Policy Section */}
                <section id="privacy" className="mb-16 pt-12 border-t-4 border-slate-100 dark:border-slate-800 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Privacy Policy</h2>
                    <p className="text-emerald-700 dark:text-emerald-400 font-bold text-sm uppercase tracking-widest mb-8">For CHANGE Website</p>

                    <div className="bg-slate-50 dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-slate-800 space-y-8">

                        <div className="flex flex-col md:flex-row gap-8 text-sm border-b border-slate-200 dark:border-slate-700 pb-8 mb-8">
                            <div>
                                <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Effective Date</span>
                                <span className="font-bold text-slate-900 dark:text-white">January 20, 2026</span>
                            </div>
                            <div>
                                <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Last Updated</span>
                                <span className="font-bold text-slate-900 dark:text-white">January 20, 2026</span>
                            </div>
                        </div>

                        <p className="font-medium text-lg">
                            CHANGE ("we", "our", "us") is a Section 8 not-for-profit organization registered in India. We respect your privacy and are committed to protecting the personal information shared with us through our website.
                        </p>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Information We Collect</h3>
                            <p className="mb-2">We may collect the following information when you use our website:</p>
                            <ul className="list-disc pl-5 space-y-1 marker:text-emerald-500">
                                <li>Name, email address, phone number</li>
                                <li>Organization or affiliation (if provided)</li>
                                <li>Donation or volunteer-related details</li>
                                <li>Any information submitted via forms, email, or subscriptions</li>
                            </ul>
                            <p className="mt-2 italic text-sm text-slate-500">We do not intentionally collect sensitive personal data unless explicitly required and consented.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. How We Use Information</h3>
                            <p className="mb-2">Your information is used only to:</p>
                            <ul className="list-disc pl-5 space-y-1 marker:text-emerald-500">
                                <li>Respond to queries or requests</li>
                                <li>Process donations or participation</li>
                                <li>Share updates, reports, or newsletters (opt-in only)</li>
                                <li>Improve website functionality and outreach</li>
                            </ul>
                            <p className="mt-2 font-bold text-emerald-700 dark:text-emerald-400">We do not sell, rent, or trade your personal data.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Data Sharing & Disclosure</h3>
                            <p className="mb-2">Information may be shared only with:</p>
                            <ul className="list-disc pl-5 space-y-1 marker:text-emerald-500">
                                <li>Authorized internal team members</li>
                                <li>Trusted service providers (email, payment gateways, analytics)</li>
                                <li>Government or legal authorities if required by law</li>
                            </ul>
                            <p className="mt-2 text-sm text-slate-500">All third parties are expected to maintain confidentiality.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Cookies & Analytics</h3>
                            <p>Our website may use cookies or analytics tools to understand visitor behavior and improve content and user experience. You may disable cookies through your browser settings.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Data Security</h3>
                            <p>We take reasonable administrative and technical measures to protect data from unauthorized access, loss, or misuse. However, no online system is 100% secure.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">6. External Links</h3>
                            <p>Our website may contain links to third-party websites. We are not responsible for their privacy practices or content.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">7. Your Rights</h3>
                            <p className="mb-2">You may:</p>
                            <ul className="list-disc pl-5 space-y-1 marker:text-emerald-500">
                                <li>Request access, correction, or deletion of your data</li>
                                <li>Opt out of communications at any time</li>
                            </ul>
                            <p className="mt-2">Requests can be sent to: <a href={`mailto:${legalData.contact.email}`} className="text-emerald-600 hover:underline">{legalData.contact.email}</a></p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">8. Policy Updates</h3>
                            <p>This policy may be updated periodically. Continued use of the website implies acceptance of the revised policy.</p>
                        </div>

                        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                            <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-400 mb-4">9. Contact Us</h3>
                            <p className="mb-1 text-sm font-bold uppercase tracking-wider text-slate-500">For privacy-related concerns:</p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">CHANGE Foundation</p>
                            <p className="mt-2"><span className="font-bold">Email:</span> <a href={`mailto:${legalData.contact.email}`} className="text-emerald-600 hover:underline">{legalData.contact.email}</a></p>
                            <p className="mt-1"><span className="font-bold">Address:</span> {legalData.registeredOffice.address}, {legalData.registeredOffice.block}, {legalData.registeredOffice.district}, {legalData.registeredOffice.state} - {legalData.registeredOffice.pincode}</p>
                        </div>

                    </div>
                </section>

                {/* Terms of Use Section */}
                <section id="terms" className="mb-16 pt-12 border-t-4 border-slate-100 dark:border-slate-800 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Terms of Use</h2>
                    <p className="text-emerald-700 dark:text-emerald-400 font-bold text-sm uppercase tracking-widest mb-8">For CHANGE Website</p>

                    <div className="bg-slate-50 dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-slate-800 space-y-8">

                        <p className="font-medium text-lg">
                            By accessing or using the CHANGE website, you agree to the following terms.
                        </p>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Purpose of Website</h3>
                            <p className="mb-2">This website is intended to:</p>
                            <ul className="list-disc pl-5 space-y-1 marker:text-emerald-500">
                                <li>Share information about CHANGE’s programs, impact, and initiatives</li>
                                <li>Enable communication, donations, and participation</li>
                            </ul>
                            <p className="mt-2 text-sm italic">Content is provided for informational purposes only.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Intellectual Property</h3>
                            <p>All content including text, graphics, logos, photos, and reports are the property of CHANGE unless stated otherwise. Unauthorized copying, commercial use, or redistribution is prohibited without written permission.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. User Responsibilities</h3>
                            <p className="mb-2">You agree not to:</p>
                            <ul className="list-disc pl-5 space-y-1 marker:text-emerald-500">
                                <li>Submit false, misleading, or unlawful information</li>
                                <li>Attempt to damage, hack, or disrupt the website</li>
                                <li>Use content in a way that harms CHANGE’s reputation or stakeholders</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Donations & Payments</h3>
                            <p className="mb-2">All donations made through the website are:</p>
                            <ul className="list-disc pl-5 space-y-1 marker:text-emerald-500">
                                <li>Voluntary</li>
                                <li>Non-refundable unless legally required</li>
                                <li>Used strictly for programmatic or operational purposes</li>
                            </ul>
                            <p className="mt-2 text-sm">Receipts will be issued as per applicable laws.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Limitation of Liability</h3>
                            <p className="mb-2">CHANGE shall not be liable for:</p>
                            <ul className="list-disc pl-5 space-y-1 marker:text-emerald-500">
                                <li>Any indirect or consequential loss</li>
                                <li>Website downtime or technical issues</li>
                                <li>Decisions taken based on website information</li>
                            </ul>
                            <p className="mt-2 font-bold text-emerald-700 dark:text-emerald-400">Use the website at your own discretion.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">6. External Links</h3>
                            <p>Links to third-party sites are provided for convenience. CHANGE does not endorse or control their content.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">7. Termination of Access</h3>
                            <p>CHANGE reserves the right to restrict or terminate access to the website without notice if misuse is detected.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">8. Governing Law</h3>
                            <p>These terms shall be governed by the laws of India. Any disputes shall fall under the jurisdiction of Indian courts.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">9. Updates</h3>
                            <p>Terms may be revised at any time. Continued use indicates acceptance of updated terms.</p>
                        </div>

                    </div>
                </section>

                <div className="text-center">
                    <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Document Last Updated: January 20, 2026</p>
                </div>
            </div>
        </div>
    );
};

export default Legal;
