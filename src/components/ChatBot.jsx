import React, { useState, useRef, useEffect, useMemo } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";

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
    const isVoiceEnabled = true; // Voice always enabled
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
                const fallbackMsg = language === 'hi' ? "Namaste 🙏 CHANGE Sahayak automated AI jald sakriya hoga. Sahayata ke liye hamari team se thechangeuttarakhand@gmail.com ya +91-9690720525 par seedhe sampark karein." : "Namaste 🙏 Automated AI assistant is undergoing scheduled setup. For inquiries, please contact our team at thechangeuttarakhand@gmail.com or +91-9690720525."; setMessages(prev => [...prev, { role: 'model', text: fallbackMsg }]); setIsLoading(false); return;
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
                // Debounce audio playback slightly to avoid choppy starts if stream is slow
                setMessages(prev => {
                    const lastIdx = prev.length - 1;
                    // Only play if we have text
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
                <div className="mb-4 w-[360px] md:w-[420px] h-[680px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-500">

                    {/* Header */}
                    <div className="bg-[#1a5d48] dark:bg-emerald-950 p-6 text-white flex justify-between items-center relative overflow-hidden shrink-0">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-11 h-11 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
                                <svg viewBox="0 0 100 100" className="w-7 h-7 fill-white">
                                    <path d="M20 70 L40 40 L60 65 L80 35 L90 70 Z" />
                                    <circle cx="50" cy="25" r="8" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg leading-none mb-1">CHANGE Sahayak</h3>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                                    <span className="text-[10px] text-emerald-200 uppercase tracking-widest font-bold">
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
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    </div>

                    {!language ? (
                        /* Language Selection Splash */
                        <div className="flex-grow flex flex-col items-center justify-center p-10 bg-slate-50 dark:bg-slate-950 text-center animate-in fade-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center text-4xl mb-8 shadow-inner ring-8 ring-emerald-50 dark:ring-emerald-900/20">🌍</div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Language / भाषा</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-10 text-sm leading-relaxed">Choose your language to start the conversation.</p>

                            <div className="grid grid-cols-1 gap-4 w-full max-w-[280px]">
                                <button
                                    onClick={() => handleSetLanguage('hi')}
                                    className="w-full bg-[#1a5d48] hover:bg-emerald-800 text-white p-5 rounded-2xl font-bold text-lg shadow-lg hover:scale-[1.02] transition-all flex items-center justify-between group"
                                >
                                    <span>Hindi (हिन्दी)</span>
                                    <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                                <button
                                    onClick={() => handleSetLanguage('en')}
                                    className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-5 rounded-2xl font-bold text-lg shadow-lg hover:scale-[1.02] border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-between group"
                                >
                                    <span>English</span>
                                    <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Chat Interface */
                        <>
                            <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-6 bg-slate-50 dark:bg-slate-950 scroll-smooth custom-scrollbar">
                                {messages.map((m, i) => (
                                    <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                        {/* Avatar */}
                                        <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-[10px] font-bold shadow-sm ${m.role === 'user' ? 'bg-emerald-100 text-emerald-700' : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-500'
                                            }`}>
                                            {m.role === 'user' ? 'ME' : 'AI'}
                                        </div>

                                        <div className={`flex flex-col max-w-[80%] ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                                            <div className={`relative p-4 rounded-[1.5rem] text-[14px] leading-relaxed shadow-sm transition-all ${m.role === 'user'
                                                    ? 'bg-[#1a5d48] text-white rounded-tr-none'
                                                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700 rounded-tl-none'
                                                }`}>
                                                <div className="whitespace-pre-wrap">{m.text}</div>

                                                {m.role === 'model' && m.text && (
                                                    <div className="mt-4 pt-3 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between">
                                                        <button
                                                            onClick={() => playVoice(i, m.text)}
                                                            className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all ${currentlyPlaying === i ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                                                }`}
                                                        >
                                                            {m.isAudioLoading ? (
                                                                <div className="w-3 h-3 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
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
                                        <div className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                                            <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 p-4 rounded-[1.5rem] rounded-tl-none border border-slate-100 dark:border-slate-700 shadow-sm">
                                            <div className="flex gap-1.5">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                            </div>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase mt-2 block tracking-widest">{labels[language].typing}</span>
                                        </div>
                                    </div>
                                )}

                                {!isLoading && (
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {labels[language].actions.map((action, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleSend(action.msg)}
                                                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl text-[12px] font-bold text-[#1a5d48] dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all shadow-sm active:scale-95"
                                            >
                                                {action.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Input Area */}
                            <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0">
                                <div className="flex gap-2 bg-slate-50 dark:bg-slate-800 p-2 rounded-2xl shadow-inner focus-within:ring-2 focus-within:ring-emerald-500/50 transition-all mb-4">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder={labels[language].placeholder}
                                        className="flex-grow bg-transparent px-4 py-3 text-[14px] focus:outline-none dark:text-white"
                                    />
                                    <button
                                        onClick={() => handleSend()}
                                        disabled={isLoading || !input.trim()}
                                        className="bg-[#1a5d48] dark:bg-emerald-700 text-white p-3.5 rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-40 shadow-lg disabled:cursor-not-allowed"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                                    </button>
                                </div>
                                <p className="text-[10px] text-slate-400 text-center leading-tight font-medium px-4">{labels[language].disclaimer}</p>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Launcher */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`group relative w-16 h-16 md:w-20 md:h-20 rounded-3xl shadow-[0_15px_45px_-10px_rgba(26,93,72,0.4)] flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-90 overflow-hidden ${isOpen ? 'bg-white dark:bg-slate-800 text-slate-600' : 'bg-[#1a5d48] text-white'
                    }`}
            >
                {isOpen ? (
                    <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : (
                    <div className="relative">
                        <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#1a5d48] animate-ping"></div>
                    </div>
                )}
            </button>
        </div>
    );
};

export default ChatBot;
