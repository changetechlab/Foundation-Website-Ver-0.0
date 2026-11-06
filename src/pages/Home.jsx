import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ArrowRight, Leaf, Cpu, Users, Target, Mountain, Droplets, Shield, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

import imgTurmeric from '../assets/images/turmeric-sorting.jpg'
import imgSolarDryer from '../assets/images/solar-dryer.jpg'
import imgOrangeHalf from '../assets/images/orange-half.jpg'
import imgDryOrange from '../assets/images/dry-orange.jpg'

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
            "url": imgTurmeric,
            "caption": "Local women self-help groups sorting freshly harvested organic turmeric.",
            "category": "Livelihood"
        },
        {
            "url": imgSolarDryer,
            "caption": "Eco-friendly solar dehydrators used for processing local herbs and spices.",
            "category": "Technology"
        },
        {
            "url": imgOrangeHalf,
            "caption": "Freshly harvested Himalayan oranges ready for value-added processing.",
            "category": "Agriculture"
        },
        {
            "url": imgDryOrange,
            "caption": "Zero-waste dehydrated orange slices packaged for sustainable markets.",
            "category": "Value Addition"
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
    const [error, setError] = useState(false)

    const handleSubscribe = async (e) => {
        e.preventDefault()
        setError(false)

        if (!email) return

        if (!supabase) {
            setSubscribed(true)
            setEmail('')
            setTimeout(() => setSubscribed(false), 3000)
            return
        }

        try {
            const { error: insertError } = await supabase
                .from('newsletter_subscribers')
                .insert([{ email }])

            if (insertError) {
                // Handle duplicate email (unique constraint violation)
                if (insertError.code === '23505') {
                    setSubscribed(true)
                    setEmail('')
                    setTimeout(() => setSubscribed(false), 3000)
                } else {
                    console.error('Subscribe error:', insertError)
                    setError(true)
                    setTimeout(() => setError(false), 3000)
                }
            } else {
                setSubscribed(true)
                setEmail('')
                setTimeout(() => setSubscribed(false), 3000)
            }
        } catch (err) {
            console.error('Subscribe failed:', err)
            setError(true)
            setTimeout(() => setError(false), 3000)
        }
    }

    const iconMap = {
        'leaf': <Leaf className="w-6 h-6" />,
        'cpu': <Cpu className="w-6 h-6" />,
        'users': <Users className="w-6 h-6" />
    }

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>CHANGE Foundation | Sustainable Himalayan Development</title>
                <meta name="description" content="Empowering Uttarakhand through climate-resilient agriculture, digital innovation, and rural livelihood models. Join the Himalayan Impact Initiative." />
                <link rel="canonical" href="https://www.changefoundation.in/" />
            </Helmet>
            {/* Hero Section */}
            <section
                className="relative min-h-[90vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&q=80')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
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

                                    <Link to="/portfolio" className="inline-flex items-center text-primary-700 hover:text-primary-800 font-semibold group">
                                        Explore Initiative
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
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
                                className={`font-semibold px-6 py-3 rounded-lg transition-all ${error ? 'bg-red-500 text-white' : 'bg-white text-green-900 hover:bg-gray-100'}`}
                            >
                                {error ? 'Error!' : subscribed ? 'Subscribed!' : 'Subscribe'}
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
}

export default Home
