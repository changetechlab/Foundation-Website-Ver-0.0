import React, { useState, useRef, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { GoogleGenAI, Modality } from "@google/genai";
import {
    Menu, X, Globe, ArrowRight, Leaf, Users, Award, ShieldCheck,
    Building, MapPin, FileText, Calendar, Sprout, Mountain, Droplets, Shield, CheckCircle, Cpu, Target, Mail, Phone, Send,
    Facebook, Twitter, Instagram, Linkedin, MousePointer2
} from 'lucide-react';

// --- Constants ---
const legalData = {
    legalName: "Centre for Himalayan Agriculture and Nature Foundation",
    brandName: "CHANGE",
    legalStatus: "Section 8 Company (Not-for-Profit)",
    cin: "U94990UT2026NPL020676",
    pan: "AANCC4675P",
    tan: "MRTC08215E",
    incorporationDate: "January 20, 2026",
    registeredOffice: {
        address: "Badshahi Thaul, Near S.R.T. Campus",
        block: "Block Chamba",
        district: "Tehri Garhwal",
        pincode: "249199",
        state: "Uttarakhand"
    },
    jurisdiction: "Registrar of Companies, Uttarakhand",
    contact: {
        email: "thechangeuttarakhand@gmail.com",
        emailAlt: "changetechlab@gmail.com",
        website: "www.change-uttarakhand.org",
        phones: ["+91-9690720525", "+91-9760325927"]
    }
};

const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Legal", path: "/legal" },
    { name: "Contact", path: "/contact" }
];

// --- Components ---

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <Globe className="h-8 w-8 text-primary-500" />
                            <span className="text-xl font-bold text-gray-900 tracking-tight">
                                {legalData.brandName} <span className="text-primary-600">Foundation</span>
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium transition-colors duration-200 ${location.pathname === link.path ? 'text-primary-600' : 'text-gray-500 hover:text-primary-600'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link to="/about" className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
                            Contact Us
                        </Link>
                    </div>
                    <div className="flex items-center md:hidden">
                        <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === link.path ? 'text-primary-600 bg-primary-50' : 'text-gray-500 hover:text-primary-600 hover:bg-gray-50'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-xl font-medium text-primary-100">
                        Collaborate with us as a donor, CSR partner, or implementation partner.
                    </p>
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

// Audio Decoding Utilities (PCM Raw Data)
function decodeBase64(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

async function decodeAudioData(data, ctx, sampleRate, numChannels) {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
            channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
    }
    return buffer;
}

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('chatbot_lang');
        return saved || null;
    });
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const isVoiceEnabled = true;
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

    const scrollRef = useRef(null);
    const audioContextRef = useRef(null);
    const sourceNodeRef = useRef(null);

    // Localization Dictionary
    const labels = useMemo(() => ({
        hi: {
            placeholder: "Apna sawaal yahan likhiye...",
            disclaimer: "Yeh AI sahayak sirf jaankari ke liye hai. Final decisions CHANGE Foundation ki team dwara liye jaate hain.",
            greeting: "Namaste 🙏\nMain CHANGE Foundation ka AI sahayak hoon.\n\nMain aapko in baaton mein madad kar sakta hoon:\n• Volunteering\n• Donation\n• Hamare programs\n• Partnership jaankari",
            stopAudio: "Band karein",
            listen: "Sunein",
            subtitle: "Aapki madad ke liye 24×7",
            typing: "Sahayak likh raha hai...",
            actions: [
                { label: "🌾 Kisan madad", msg: "Main kisan hoon, kheti aur yojna ki jaankari chahiye." },
                { label: "🤝 Donor / CSR", msg: "I want information about CSR and impact reporting." },
                { label: "🌱 Volunteer", msg: "Main volunteer kaise ban sakta hoon?" },
                { label: "📞 Team se baat", msg: "Mujhe team se baat karni hai." }
            ]
        },
        en: {
            placeholder: "Type your question here...",
            disclaimer: "This AI assistant is for informational purposes only. Final decisions are made by the CHANGE Foundation team.",
            greeting: "Namaste 🙏\nI am the AI Assistant for CHANGE Foundation.\n\nI can help you with:\n• Volunteering opportunities\n• Donations and CSR\n• Our programs\n• Partnership details",
            stopAudio: "Stop",
            listen: "Listen",
            subtitle: "Here to help 24/7",
            typing: "Sahayak is typing...",
            actions: [
                { label: "🌾 Farmer Help", msg: "I am a farmer and I need info on crops and schemes." },
                { label: "🤝 Donor / CSR", msg: "I want information about CSR partnership and impact reporting." },
                { label: "🌱 Volunteer", msg: "How can I become a volunteer?" },
                { label: "📞 Contact Team", msg: "I want to talk to the team." }
            ]
        }
    }), []);

    const handleSetLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('chatbot_lang', lang);
        setMessages([{ role: 'model', text: labels[lang].greeting }]);
    };

    useEffect(() => {
        if (language && messages.length === 0) {
            setMessages([{ role: 'model', text: labels[language].greeting }]);
        }
    }, [language, labels, messages.length]);

    // Robust Auto-Scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isLoading, isOpen]);

    const stopAudio = () => {
        if (sourceNodeRef.current) {
            sourceNodeRef.current.stop();
            sourceNodeRef.current = null;
        }
        setCurrentlyPlaying(null);
    };

    const playVoice = async (index, text) => {
        if (currentlyPlaying === index) {
            stopAudio();
            return;
        }
        stopAudio();

        if (messages[index].audioBuffer) {
            startPlayback(index, messages[index].audioBuffer);
            return;
        }

        setMessages(prev => prev.map((m, i) => i === index ? { ...m, isAudioLoading: true } : m));

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) {
                throw new Error("API Key not found");
            }
            const ai = new GoogleGenAI({ apiKey });
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash-exp",
                contents: [{ parts: [{ text: text }] }],
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: { voiceName: 'Kore' },
                        },
                    },
                },
            });

            const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
                if (!audioContextRef.current) {
                    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
                }
                const audioBuffer = await decodeAudioData(
                    decodeBase64(base64Audio),
                    audioContextRef.current,
                    24000,
                    1
                );
                setMessages(prev => prev.map((m, i) => i === index ? { ...m, audioBuffer, isAudioLoading: false } : m));
                startPlayback(index, audioBuffer);
            }
        } catch (error) {
            console.error("Audio generation error:", error);
            setMessages(prev => prev.map((m, i) => i === index ? { ...m, isAudioLoading: false } : m));
        }
    };

    const startPlayback = (index, buffer) => {
        if (!audioContextRef.current) return;
        const source = audioContextRef.current.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContextRef.current.destination);
        source.onended = () => setCurrentlyPlaying(null);
        sourceNodeRef.current = source;
        source.start(0);
        setCurrentlyPlaying(index);
    };

    const handleSend = async (customMessage) => {
        const userText = customMessage || input;
        if (!userText.trim() || isLoading || !language) return;

        const userMessage = userText.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setIsLoading(true);
        stopAudio();

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) {
                throw new Error("API Key not found. Please set VITE_GEMINI_API_KEY in .env");
            }
            const ai = new GoogleGenAI({ apiKey });
            const systemInstruction = `You are "CHANGE Sahayak", the AI assistant for CHANGE Foundation. Respond in ${language === 'hi' ? 'Hindi' : 'English'}. Be helpful, professional, and rural-friendly.`;

            const chat = ai.chats.create({
                model: 'gemini-1.5-flash',
                config: { systemInstruction },
            });

            const responseStream = await chat.sendMessageStream({ message: userMessage });
            let fullResponse = "";
            setMessages(prev => [...prev, { role: 'model', text: '' }]);

            for await (const chunk of responseStream) {
                fullResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { role: 'model', text: fullResponse };
                    return newMessages;
                });
            }

            if (isVoiceEnabled) {
                setMessages(prev => {
                    const lastIdx = prev.length - 1;
                    if (fullResponse.trim()) {
                        setTimeout(() => playVoice(lastIdx, fullResponse), 500);
                    }
                    return prev;
                });
            }
        } catch (error) {
            console.error("Chat error:", error);
            const errorMsg = language === 'hi' ? 'Maaf kijiye, humare system mein kuch samasya hai.' : 'Sorry, our system is experiencing issues.';
            setMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end font-sans">
            {isOpen && (
                <div className="mb-4 w-[360px] md:w-[420px] h-[680px] bg-white rounded-[2.5rem] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.3)] border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-500">

                    {/* Header */}
                    <div className="bg-[#1a5d48] p-6 text-white flex justify-between items-center relative overflow-hidden shrink-0">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-11 h-11 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
                                <Globe className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg leading-none mb-1">CHANGE Sahayak</h3>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-[10px] text-green-200 uppercase tracking-widest font-bold">
                                        {language ? labels[language].subtitle : 'Himalayan AI'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 relative z-10">
                            {language && (
                                <div className="flex bg-black/20 rounded-lg p-1 border border-white/10">
                                    <button onClick={() => handleSetLanguage('hi')} className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${language === 'hi' ? 'bg-white text-[#1a5d48]' : 'text-white/60 hover:text-white'}`}>HI</button>
                                    <button onClick={() => handleSetLanguage('en')} className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${language === 'en' ? 'bg-white text-[#1a5d48]' : 'text-white/60 hover:text-white'}`}>EN</button>
                                </div>
                            )}
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {!language ? (
                        /* Language Selection Splash */
                        <div className="flex-grow flex flex-col items-center justify-center p-10 bg-gray-50 text-center animate-in fade-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-4xl mb-8 shadow-inner ring-8 ring-green-50">🌍</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Language / भाषा</h2>
                            <p className="text-gray-500 mb-10 text-sm leading-relaxed">Choose your language to start the conversation.</p>

                            <div className="grid grid-cols-1 gap-4 w-full max-w-[280px]">
                                <button
                                    onClick={() => handleSetLanguage('hi')}
                                    className="w-full bg-[#1a5d48] hover:bg-green-800 text-white p-5 rounded-2xl font-bold text-lg shadow-lg hover:scale-[1.02] transition-all flex items-center justify-between group"
                                >
                                    <span>Hindi (हिन्दी)</span>
                                    <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                                <button
                                    onClick={() => handleSetLanguage('en')}
                                    className="w-full bg-white text-gray-900 p-5 rounded-2xl font-bold text-lg shadow-lg hover:scale-[1.02] border border-gray-200 transition-all flex items-center justify-between group"
                                >
                                    <span>English</span>
                                    <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Chat Interface */
                        <>
                            <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-6 bg-gray-50 scroll-smooth custom-scrollbar">
                                {messages.map((m, i) => (
                                    <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                        {/* Avatar */}
                                        <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-[10px] font-bold shadow-sm ${m.role === 'user' ? 'bg-green-100 text-green-700' : 'bg-white border border-gray-100 text-gray-500'
                                            }`}>
                                            {m.role === 'user' ? 'ME' : 'AI'}
                                        </div>

                                        <div className={`flex flex-col max-w-[80%] ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                                            <div className={`relative p-4 rounded-[1.5rem] text-[14px] leading-relaxed shadow-sm transition-all ${m.role === 'user'
                                                ? 'bg-[#1a5d48] text-white rounded-tr-none'
                                                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                                }`}>
                                                <div className="whitespace-pre-wrap">{m.text}</div>

                                                {m.role === 'model' && m.text && (
                                                    <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                                                        <button
                                                            onClick={() => playVoice(i, m.text)}
                                                            className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all ${currentlyPlaying === i ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700 hover:bg-green-100'
                                                                }`}
                                                        >
                                                            {m.isAudioLoading ? (
                                                                <div className="w-3 h-3 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                                                            ) : currentlyPlaying === i ? labels[language].stopAudio : labels[language].listen}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex gap-3 animate-in fade-in duration-300">
                                        <div className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center bg-white border border-gray-100">
                                            <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                        <div className="bg-white p-4 rounded-[1.5rem] rounded-tl-none border border-gray-100 shadow-sm">
                                            <div className="flex gap-1.5">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                            </div>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase mt-2 block tracking-widest">{labels[language].typing}</span>
                                        </div>
                                    </div>
                                )}

                                {!isLoading && (
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {labels[language].actions.map((action, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleSend(action.msg)}
                                                className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-[12px] font-bold text-[#1a5d48] hover:bg-green-50 transition-all shadow-sm active:scale-95"
                                            >
                                                {action.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Input Area */}
                            <div className="p-5 bg-white border-t border-gray-100 shrink-0">
                                <div className="flex gap-2 bg-gray-50 p-2 rounded-2xl shadow-inner focus-within:ring-2 focus-within:ring-green-500/50 transition-all mb-4">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder={labels[language].placeholder}
                                        className="flex-grow bg-transparent px-4 py-3 text-[14px] focus:outline-none"
                                    />
                                    <button
                                        onClick={() => handleSend()}
                                        disabled={isLoading || !input.trim()}
                                        className="bg-[#1a5d48] text-white p-3.5 rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-40 shadow-lg disabled:cursor-not-allowed"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                                <p className="text-[10px] text-gray-400 text-center leading-tight font-medium px-4">{labels[language].disclaimer}</p>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Launcher */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`group relative w-16 h-16 md:w-20 md:h-20 rounded-3xl shadow-[0_15px_45px_-10px_rgba(26,93,72,0.4)] flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-90 overflow-hidden ${isOpen ? 'bg-white text-gray-600' : 'bg-[#1a5d48] text-white'
                    }`}
            >
                {isOpen ? (
                    <X className="w-9 h-9" />
                ) : (
                    <div className="relative">
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#1a5d48] animate-ping"></div>
                        <Users className="w-9 h-9" />
                    </div>
                )}
            </button>
        </div>
    );
};

const Layout = ({ children }) => (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
        <Header />
        <main className="flex-grow">{children}</main>
        <ChatBot />
        <Footer />
    </div>
);

const homeData = {
    "hero": {
        "title": "Empowering the Himalayas Through Innovation and Resilience",
        "subtitle": "Harnessing the power of sustainable agriculture, digital transformation, and community-led livelihoods to transform lives across Uttarakhand.",
        "ctaPrimary": "Our Strategic Pillars",
        "ctaSecondary": "Join Our Mission"
    },
    "strategicPillars": [
        {
            "id": "agri-innovation",
            "category": "Agriculture",
            "title": "Climate-Resilient Agriculture",
            "description": "Implementing regenerative farming techniques and high-yield crop varieties tailored for the unique Himalayan ecosystem to ensure food security.",
            "link": "/work/agriculture",
            "icon": "leaf",
            "themeColor": "#2D6A4F",
            "badge": "Core Focus"
        },
        {
            "id": "digital-impact",
            "category": "Technology",
            "title": "AI & Digital for Good",
            "description": "Integrating artificial intelligence and precision data analytics to provide real-time weather alerts and crop health monitoring for hill farmers.",
            "link": "/work/technology",
            "icon": "cpu",
            "themeColor": "#1E3A8A",
            "badge": "Innovative"
        },
        {
            "id": "rural-livelihoods",
            "category": "Livelihood",
            "title": "Rural Livelihood Models",
            "description": "Building sustainable economic pathways through micro-entrepreneurship, market linkages, and value-addition for organic mountain produce.",
            "link": "/work/livelihoods",
            "icon": "users",
            "themeColor": "#B45309"
        }
    ],
    "focusAreas": [
        "Sustainable Hill Farming",
        "AI-Powered Agri-Analytics",
        "Watershed Management",
        "Women-Led Micro-Enterprises",
        "Biodiversity Conservation",
        "Digital Literacy Training"
    ],
    "impactGallery": [
        {
            "url": "https://images.unsplash.com/photo-1590487988256-9ed24133863e",
            "caption": "Farmers participating in a digital literacy workshop in Pauri Garhwal.",
            "category": "Empowerment"
        },
        {
            "url": "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
            "caption": "Terraced farming enhanced by precision irrigation technologies.",
            "category": "Agriculture"
        }
    ],
    "newsletter": {
        "title": "Stay Connected with the Himalayas",
        "description": "Subscribe to receive monthly updates on our ground-level impact, research findings, and community stories.",
        "disclaimer": "We value your privacy. Your data is protected according to our compliance standards."
    },
    "ctaSection": {
        "text": "Ready to support sustainable mountain development?",
        "buttonText": "Partner With Us"
    }
}

const Home = () => {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (email) {
            console.log('Subscribed:', email)
            setSubscribed(true)
            setTimeout(() => setSubscribed(false), 3000)
            setEmail('')
        }
    }

    const iconMap = {
        'leaf': <Leaf className="w-6 h-6" />,
        'cpu': <Cpu className="w-6 h-6" />,
        'users': <Users className="w-6 h-6" />
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section
                className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 text-white overflow-hidden"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1589136142558-94675c60237b?q=80&w=2000')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'overlay'
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="container mx-auto px-4 py-20 relative z-10 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                            <Mountain className="w-5 h-5" />
                            <span className="text-sm font-medium">Himalayan Impact Initiative</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                            {homeData.hero.title}
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
                            {homeData.hero.subtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="#strategic-pillars"
                                className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center group"
                            >
                                {homeData.hero.ctaPrimary}
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>

                            <Link
                                to="/contact"
                                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-lg transition-all duration-300"
                            >
                                {homeData.hero.ctaSecondary}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
                    </div>
                </div>
            </section>

            {/* Impact Stats */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Himalayan Impact</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Transforming lives across Uttarakhand's mountainous regions
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: '5000+', label: 'Farmers Empowered', icon: '👨🌾' },
                            { value: '100+', label: 'Villages Reached', icon: '🏔️' },
                            { value: '250+', label: 'Hectares Regenerated', icon: '🌱' },
                            { value: '24/7', label: 'Tech Support', icon: '📱' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl mb-4">{stat.icon}</div>
                                <div className="text-3xl font-bold text-green-700 mb-2">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategic Pillars */}
            <section id="strategic-pillars" className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Strategic Pillars</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Three interconnected approaches for sustainable Himalayan development
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {homeData.strategicPillars.map((pillar) => (
                            <div
                                key={pillar.id}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                            >
                                <div
                                    className="h-2"
                                    style={{ backgroundColor: pillar.themeColor }}
                                ></div>

                                <div className="p-8">
                                    <div className="flex items-start justify-between mb-6">
                                        <div
                                            className="w-14 h-14 rounded-xl flex items-center justify-center"
                                            style={{ backgroundColor: `${pillar.themeColor}20` }}
                                        >
                                            {iconMap[pillar.icon]}
                                        </div>

                                        {pillar.badge && (
                                            <span
                                                className="text-xs font-bold px-3 py-1 rounded-full"
                                                style={{
                                                    backgroundColor: `${pillar.themeColor}20`,
                                                    color: pillar.themeColor
                                                }}
                                            >
                                                {pillar.badge}
                                            </span>
                                        )}
                                    </div>

                                    <span
                                        className="text-sm font-semibold px-3 py-1 rounded-full mb-4 inline-block"
                                        style={{
                                            backgroundColor: `${pillar.themeColor}15`,
                                            color: pillar.themeColor
                                        }}
                                    >
                                        {pillar.category}
                                    </span>

                                    <h3 className="text-xl font-bold mb-4">{pillar.title}</h3>
                                    <p className="text-gray-600 mb-6">{pillar.description}</p>

                                    <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium group">
                                        Explore Initiative
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Focus Areas */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                            <Target className="w-8 h-8 text-green-700" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Focus Areas</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Comprehensive interventions for holistic mountain development
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        {homeData.focusAreas.map((area, index) => {
                            const colors = [
                                'bg-green-50 text-green-700 border-green-200',
                                'bg-blue-50 text-blue-700 border-blue-200',
                                'bg-amber-50 text-amber-700 border-amber-200',
                                'bg-purple-50 text-purple-700 border-purple-200',
                                'bg-teal-50 text-teal-700 border-teal-200',
                                'bg-orange-50 text-orange-700 border-orange-200'
                            ]
                            const icons = ['🌾', '🤖', '💧', '👩💼', '🌿', '📚']

                            return (
                                <div
                                    key={index}
                                    className={`${colors[index]} border rounded-xl p-5 flex items-center space-x-4 hover:scale-105 transition-transform duration-300`}
                                >
                                    <div className="text-2xl">{icons[index]}</div>
                                    <span className="font-medium">{area}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Impact Gallery */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Impact Gallery</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Real stories from the ground in Uttarakhand Himalayas
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {homeData.impactGallery.map((image, index) => (
                            <div key={index} className="group">
                                <div className="relative overflow-hidden rounded-2xl mb-4">
                                    <div
                                        className="h-64 bg-gray-200 rounded-2xl bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                        style={{ backgroundImage: `url(${image.url})` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div>
                                    <span className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full mb-2">
                                        {image.category}
                                    </span>
                                    <p className="text-gray-700">{image.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-16 bg-gradient-to-r from-green-900 to-green-700 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                            <Mail className="w-8 h-8" />
                        </div>

                        <h2 className="text-3xl font-bold mb-4">{homeData.newsletter.title}</h2>
                        <p className="text-green-100 mb-8">{homeData.newsletter.description}</p>

                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-white text-green-900 hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg transition-all"
                            >
                                {subscribed ? 'Subscribed!' : 'Subscribe'}
                            </button>
                        </form>

                        <div className="mt-6 flex items-center justify-center text-sm text-green-200">
                            <Shield className="w-4 h-4 mr-2" />
                            <p>{homeData.newsletter.disclaimer}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6">{homeData.ctaSection.text}</h2>
                        <Link
                            to="/contact"
                            className="inline-flex items-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            {homeData.ctaSection.buttonText}
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>

                        <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
                            <div className="text-center">
                                <div className="text-2xl text-green-600 font-bold">✓</div>
                                <div className="text-sm text-gray-600">Transparent</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl text-green-600 font-bold">✓</div>
                                <div className="text-sm text-gray-600">Impact-Focused</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl text-green-600 font-bold">✓</div>
                                <div className="text-sm text-gray-600">Legally Compliant</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">About the Foundation</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    We are a registered Section 8 Non-Profit organization committed to sustainable development in the Himalayan region.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                        <Building className="mr-3 text-primary-500" /> Organization Identity
                    </h2>
                    <dl className="space-y-6">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Legal Name</dt>
                            <dd className="mt-1 text-lg font-medium text-gray-900">{legalData.legalName}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Legal Status</dt>
                            <dd className="mt-1 text-lg text-gray-900">{legalData.legalStatus}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Date of Incorporation</dt>
                            <dd className="mt-1 text-lg text-gray-900 flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                                {legalData.incorporationDate}
                            </dd>
                        </div>
                    </dl>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                        <MapPin className="mr-3 text-primary-500" /> Registered Office
                    </h2>
                    <div className="space-y-4 text-gray-700">
                        <p className="font-medium text-lg">{legalData.registeredOffice.address}</p>
                        <p>District: {legalData.registeredOffice.district}</p>
                        <p>State: {legalData.registeredOffice.state}</p>
                        <p>PIN: {legalData.registeredOffice.pincode}</p>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <h3 className="text-lg font-medium mb-4 flex items-center">
                            <FileText className="mr-2 text-primary-500" /> Registration Data
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <span className="block text-xs text-gray-500 uppercase tracking-wide">CIN</span>
                                <span className="block text-md font-mono font-bold text-gray-900">{legalData.cin}</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <span className="block text-xs text-gray-500 uppercase tracking-wide">PAN</span>
                                <span className="block text-md font-mono font-bold text-gray-900">{legalData.pan}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Portfolio = () => {
    const projects = [
        { title: "Organic Farming Initiative", category: "Agriculture", description: "Training 500+ farmers in Tehri Garhwal on organic cultivation techniques and market linkage.", icon: Sprout, status: "Ongoing" },
        { title: "Water Conservation Drive", category: "Environment", description: "Rejuvenating natural springs and implementing rainwater harvesting in 10 villages.", icon: Droplets, status: "Completed" },
        { title: "Himalayan Biodiversity", category: "Conservation", description: "Documentation and preservation of indigenous plant species critical to the ecosystem.", icon: Mountain, status: "Planning" }
    ];
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Initiatives</h1>
                <p className="text-lg text-gray-600">Driving impact through targeted interventions.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="items-center justify-center bg-primary-50 h-48 flex">
                            <project.icon className="h-16 w-16 text-primary-400" />
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs font-semibold uppercase tracking-wide text-primary-600 bg-primary-50 px-2 py-1 rounded">{project.category}</span>
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${project.status === 'Ongoing' ? 'bg-blue-100 text-blue-700' : project.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{project.status}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

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
                            <p className="mt-2">Requests can be sent to: <a href="mailto:thechangeuttarakhand@gmail.com" className="text-emerald-600 hover:underline">thechangeuttarakhand@gmail.com</a></p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">8. Policy Updates</h3>
                            <p>This policy may be updated periodically. Continued use of the website implies acceptance of the revised policy.</p>
                        </div>

                        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                            <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-400 mb-4">9. Contact Us</h3>
                            <p className="mb-1 text-sm font-bold uppercase tracking-wider text-slate-500">For privacy-related concerns:</p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">CHANGE Foundation</p>
                            <p className="mt-2"><span className="font-bold">Email:</span> <a href="mailto:thechangeuttarakhand@gmail.com" className="text-emerald-600 hover:underline">thechangeuttarakhand@gmail.com</a></p>
                            <p className="mt-1"><span className="font-bold">Address:</span> Badshahi Thaul, Near S.R.T. Campus, Block Chamba, Tehri Garhwal, Uttarakhand - 249199</p>
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

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSubmitStatus(null), 5000);
        }, 1500);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                                        {legalData.registeredOffice.address}<br />
                                        {legalData.registeredOffice.district}, {legalData.registeredOffice.state}<br />
                                        PIN: {legalData.registeredOffice.pincode}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Mail className="h-6 w-6 text-primary-600" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                                    <p className="mt-1 text-gray-600">{legalData.contact.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Phone className="h-6 w-6 text-primary-600" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                                    <p className="mt-1 text-gray-600">{legalData.contact.phones.join(', ')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Visit Us</h2>
                        <p className="text-gray-600 mb-4">
                            Our office is located in the heart of the Tehri Garhwal district. Visitors are welcome by appointment.
                        </p>
                        <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden h-48 flex items-center justify-center">
                            <span className="text-gray-500 flex items-center">
                                <MapPin className="mr-2" /> Map View Placeholder
                            </span>
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

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
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
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                placeholder="Tell us more..."
                            ></textarea>
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

// --- Main App ---
function ChangeFoundationApp() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/legal" element={<Legal />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default ChangeFoundationApp;
