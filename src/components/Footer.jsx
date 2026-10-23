import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { legalData } from '../lib/constants';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, MousePointer2 } from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setTimeout(() => setSubscribed(false), 3000);
            setEmail('');
        }
    };

    return (
        <footer className="bg-gray-900 text-white">
            {/* Top Collaboration Banner */}
            <div className="bg-primary-900 py-6 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
                    <p className="text-xl font-medium text-primary-100">
                        Collaborate with us as a donor, CSR partner, or implementation partner.
                    </p>
                    <Link
                        to="/donate"
                        className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold transition-colors shadow-xs shrink-0"
                    >
                        Support Our Mission →
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
                    {/* Brand and Newsletter - 5 columns */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-white">Get In Touch</h2>
                            <h3 className="text-2xl font-bold text-primary-500 mb-4">{legalData.brandName}</h3>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                {legalData.legalName} is a {legalData.legalStatus} empowering rural Uttarakhand through climate-smart innovation and farmer enterprise.
                            </p>
                        </div>

                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                            <h4 className="text-lg font-semibold mb-4 flex items-center">
                                <Mail className="w-5 h-5 mr-2 text-primary-400" />
                                Stay Updated
                            </h4>
                            <form onSubmit={handleSubscribe} className="space-y-4">
                                <div>
                                    <label htmlFor="footer-email" className="sr-only">Email Address</label>
                                    <input
                                        type="email"
                                        id="footer-email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email Address"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                                >
                                    {subscribed ? 'Joined Successfully!' : 'Join'}
                                </button>
                                <p className="text-xs text-gray-400 text-center">
                                    By submitting this form, you agree to our <a href="#" className="underline hover:text-white">Privacy Policy</a> and <a href="#" className="underline hover:text-white">Terms of Use</a>.
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Links and Contact - 7 columns */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Links */}
                        <div>
                            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Connect With Us</h4>
                            <div className="space-y-8">
                                <div>
                                    <h5 className="text-sm font-semibold text-primary-500 mb-4 uppercase">Organisation</h5>
                                    <ul className="space-y-3">
                                        <li><Link to="/about" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">Who We Are</Link></li>
                                        <li><Link to="/portfolio" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">Our Programs</Link></li>
                                        <li><Link to="/legal" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">Legal & Governance</Link></li>
                                        <li><Link to="/contact" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">Contact Us</Link></li>
                                        <li><Link to="/donate" className="text-primary-400 hover:text-primary-300 hover:translate-x-1 transition-all inline-flex items-center font-medium">Donate & Support →</Link></li>
                                    </ul>
                                </div>

                                {/* Social Media placeholders */}
                                <div className="flex space-x-4">
                                    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors"><Facebook className="w-5 h-5" /></a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors"><Twitter className="w-5 h-5" /></a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors"><Instagram className="w-5 h-5" /></a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors"><Linkedin className="w-5 h-5" /></a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Contact Information</h4>
                            <div className="space-y-6">
                                <div>
                                    <h5 className="text-sm font-semibold text-gray-400 mb-2 flex items-center">
                                        <MapPin className="w-4 h-4 mr-2" /> Registered Office
                                    </h5>
                                    <p className="text-gray-300">
                                        {legalData.registeredOffice.address},<br />
                                        {legalData.registeredOffice.district},<br />
                                        {legalData.registeredOffice.state} - {legalData.registeredOffice.pincode}, India
                                    </p>
                                </div>

                                <div>
                                    <h5 className="text-sm font-semibold text-gray-400 mb-2 flex items-center">
                                        <Mail className="w-4 h-4 mr-2" /> Official Email
                                    </h5>
                                    <a href={`mailto:${legalData.contact.email}`} className="text-white hover:text-primary-400 transition-colors">
                                        {legalData.contact.email}
                                    </a>
                                </div>

                                <div>
                                    <h5 className="text-sm font-semibold text-gray-400 mb-2">Corporate Identity Number (CIN)</h5>
                                    <p className="font-mono text-primary-400 bg-gray-800 inline-block px-2 py-1 rounded">
                                        {legalData.cin}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Impact Tracker & Disclaimer */}
                <div className="border-t border-gray-800 pt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                        {/* Impact Tracker */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-widest flex items-center">
                                <MousePointer2 className="w-4 h-4 mr-2" /> Impact Tracker (Visitors)
                            </h4>
                            <div className="flex space-x-2">
                                {['0', '2', '8', '5', '0', '4'].map((digit, idx) => (
                                    <div key={idx} className="w-10 h-14 bg-gray-800 rounded border border-gray-700 flex items-center justify-center text-2xl font-mono font-bold text-white shadow-inner">
                                        {digit}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Legal Disclaimer */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-widest">Legal Disclaimer & Brand Identity Policy</h4>
                            <p className="text-xs text-justify text-gray-500 leading-relaxed">
                                "{legalData.brandName}" is the registered public brand identity of {legalData.legalName}, a {legalData.legalStatus} incorporated under the Companies Act, 2013, Ministry of Corporate Affairs, Government of India. CIN: {legalData.cin}. Any reference to "{legalData.brandName}" in public branding, digital communication, physical assets, or social media refers exclusively to the mission and brand identity of this legal entity. All activities are undertaken on a not-for-profit basis as per our Memorandum of Association (MoA).
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} {legalData.legalName}</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
