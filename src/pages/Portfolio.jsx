import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
    Sprout,
    Mountain,
    Droplets,
    Sparkles,
    FlaskConical,
    Info,
    X,
    Maximize2,
    ArrowUpRight,
    CheckCircle2,
    ExternalLink
} from 'lucide-react';

// Process Photographs (First Ferment)
import imgProcess1 from '../assets/images/fermentation/IMG_20261105_205100.jpg';
import imgProcess2 from '../assets/images/fermentation/IMG_20261105_205131.jpg';
import imgProcess3 from '../assets/images/fermentation/IMG_20261105_205213.jpg';
import imgProcess4 from '../assets/images/fermentation/IMG_20261105_205249.jpg';

// Product Collection Visuals (R&D Concept Exploration)
import imgGingerBug from '../assets/images/fermentation/ginger-bug-elixir.png';
import imgKafal from '../assets/images/fermentation/kafal-elixir.png';
import imgMalta from '../assets/images/fermentation/malta-sunshine.png';
import imgPeachia from '../assets/images/fermentation/peachia.png';
import imgVitisWild from '../assets/images/fermentation/vitis-wild.png';

const projects = [
    {
        title: "Himalayan Fermentation & Value Addition",
        category: "Bio-Enterprise",
        description: "R&D initiative exploring wild indigenous fruit fermentation, traditional starter cultures, and high-altitude micro-processing in Tehri Garhwal.",
        icon: FlaskConical,
        status: "Active R&D"
    },
    {
        title: "Organic Farming Initiative",
        category: "Agriculture",
        description: "Training 500+ farmers in Tehri Garhwal on organic cultivation techniques, seed conservation, and farmer collective linkages.",
        icon: Sprout,
        status: "Ongoing"
    },
    {
        title: "Water Conservation Drive",
        category: "Environment",
        description: "Rejuvenating natural springs (Dharas) and implementing rainwater recharge systems across mountain villages.",
        icon: Droplets,
        status: "Completed"
    },
    {
        title: "Himalayan Biodiversity Documentation",
        category: "Conservation",
        description: "Herbarium documentation and habitat preservation of indigenous mountain plant species critical to the Garhwal ecosystem.",
        icon: Mountain,
        status: "Planning"
    }
];

const fermentationProcessSteps = [
    {
        step: "01",
        title: "Botanical Harvesting & Infusion Prep",
        stage: "Raw Materials Preparation",
        description: "Selecting clean mountain spring water, unrefined native cane jaggery, and wild Himalayan botanicals as the clean nutritional base for natural microbial activity.",
        image: imgProcess1,
        alt: "Preparation of raw Himalayan botanicals and glass vessels for First Ferment process in Uttarakhand",
        filename: "IMG_20261105_205100.jpg",
        highlight: "Spring Water & Native Botanical Base"
    },
    {
        step: "02",
        title: "Indigenous Starter Inoculation",
        stage: "Culture Activation",
        description: "Introducing wild-yeast ginger bug cultures and native starter colonies adapted to high-altitude Himalayan temperature gradients and microclimates.",
        image: imgProcess2,
        alt: "Inoculation of wild yeast starter culture into fermentation jar with muslin cloth covering",
        filename: "IMG_20261105_205131.jpg",
        highlight: "Wild Yeast & Ginger Bug Colonies"
    },
    {
        step: "03",
        title: "Aerobic First Ferment & Metabolism",
        stage: "Primary Fermentation (48-72h)",
        description: "Controlled primary fermentation monitoring continuous bubbling activity, acidity shifts, and aromatic development under natural breathable cloth seals.",
        image: imgProcess3,
        alt: "Active bubbling and fermentation activity inside glass fermentation jar during First Ferment",
        filename: "IMG_20261105_205213.jpg",
        highlight: "Continuous Activity & Acid Balance"
    },
    {
        step: "04",
        title: "Clarification & Conditioning",
        stage: "Straining & Bottling",
        description: "Carefully straining active botanicals and transferring the live probiotic liquid into airtight glass swing-top bottles for secondary conditioning.",
        image: imgProcess4,
        alt: "Straining and preparing fermented botanical elixir for secondary bottle conditioning",
        filename: "IMG_20261105_205249.jpg",
        highlight: "Natural Effervescence Conditioning"
    }
];

const productCollection = [
    {
        name: "Ginger Bug Elixir",
        tagline: "Wild Mountain Ginger Ferment",
        category: "Natural Wild Brew Concept",
        image: imgGingerBug,
        alt: "Ginger Bug Elixir - Artisan botanical fermentation concept bottle",
        conceptNote: "Conceptual exploration of high-altitude wild ginger rhizomes and raw cane jaggery, naturally fermented for botanical warmth.",
        profile: "Warm spicy ginger root, earthy caramel undertones, natural gentle sparkle.",
        badge: "R&D Prototype 01"
    },
    {
        name: "Kafal Elixir",
        tagline: "Forest Wildberry Botanical Brew",
        category: "Native Forest Berry Concept",
        image: imgKafal,
        alt: "Kafal Elixir - Conceptual artisan beverage bottle inspired by Himalayan bayberry",
        conceptNote: "Inspired by wild-foraged Kafal (Myrica esculenta) gathered from Uttarakhand's temperate oak and rhododendron forests.",
        profile: "Deep ruby hue, tart wildberry character, crisp mountain finish.",
        badge: "R&D Prototype 02"
    },
    {
        name: "MALTA SUNSHINE",
        tagline: "Terraced Valley Citrus Ferment",
        category: "Indigenous Citrus Concept",
        image: imgMalta,
        alt: "MALTA SUNSHINE - Citrus botanical fermented beverage concept bottle",
        conceptNote: "Harnessing seasonal Maltese citrus cultivated by hill farmers across the terraced valleys of Tehri Garhwal.",
        profile: "Bright sun-ripened citrus aroma, natural acidity, uplifting botanical notes.",
        badge: "R&D Prototype 03"
    },
    {
        name: "Peachia",
        tagline: "Hill Stone-Fruit Botanical Infusion",
        category: "Orchard Stone-Fruit Concept",
        image: imgPeachia,
        alt: "Peachia - High-altitude peach fermentation elixir concept bottle",
        conceptNote: "Exploration of seasonal surplus hill peaches, capturing delicate stone-fruit aromatics through controlled natural fermentation.",
        profile: "Fragrant orchard peach notes, smooth mellow finish, golden nectar hue.",
        badge: "R&D Prototype 04"
    },
    {
        name: "Vitis Wild",
        tagline: "Mountain Vine Artisan Ferment",
        category: "Wild Vine Botanical Concept",
        image: imgVitisWild,
        alt: "Vitis Wild - Wild mountain grape botanical ferment concept bottle",
        conceptNote: "Artisan study celebrating indigenous wild mountain grapes native to Uttarakhand's mid-altitude forested ridges.",
        profile: "Earthy grape tannins, subtle wild herbal complexity, deep natural clarity.",
        badge: "R&D Prototype 05"
    }
];

const Portfolio = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="bg-stone-50/50 min-h-screen py-12">
            <Helmet>
                <title>Himalayan Fermentation & Initiatives | CHANGE Foundation</title>
                <meta
                    name="description"
                    content="Discover CHANGE Foundation's Himalayan Fermentation Project — exploring traditional First Ferment processes with wild mountain botanicals and artisan product concepts in Uttarakhand."
                />
                <link rel="canonical" href="https://www.change-uttarakhand.org/portfolio" />
            </Helmet>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

                {/* 1. Header Section */}
                <div className="text-center max-w-3xl mx-auto pt-4">
                    <span className="inline-flex items-center space-x-2 bg-emerald-100/70 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                        Grassroots Research & Mountain Enterprises
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
                        Our Work & <span className="text-primary-700">Flagship Initiatives</span>
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Pioneering ecological stewardship, sustainable hill agriculture, and innovative bio-processing in the Uttarakhand Himalayas.
                    </p>
                </div>

                {/* 2. Core Strategic Initiatives Grid */}
                <div>
                    <div className="flex items-center justify-between mb-8 pb-3 border-b border-stone-200">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Current Program Portfolio</h2>
                            <p className="text-sm text-gray-600 mt-1">Multi-disciplinary interventions across Tehri Garhwal and rural Uttarakhand.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-xs border border-stone-200/90 overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs font-semibold uppercase tracking-wider text-primary-700 bg-primary-50 px-2.5 py-1 rounded-md">
                                            {project.category}
                                        </span>
                                        <span
                                            className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                                                project.status === 'Active R&D'
                                                    ? 'bg-emerald-100 text-emerald-800 font-semibold'
                                                    : project.status === 'Ongoing'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : project.status === 'Completed'
                                                    ? 'bg-stone-100 text-stone-700'
                                                    : 'bg-amber-100 text-amber-800'
                                            }`}
                                        >
                                            {project.status}
                                        </span>
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                        <project.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{project.title}</h3>
                                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{project.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ============================================================================== */}
                {/* SECTION A: Fermentation Process – First Ferment */}
                {/* ============================================================================== */}
                <section id="fermentation-process" className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 sm:p-10 lg:p-12 relative overflow-hidden">
                    <div className="max-w-3xl mb-10">
                        <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                            <FlaskConical className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                            Documented Volunteer Research · First Ferment Phase
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                            From Nature to Fermentation
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg mt-3 leading-relaxed">
                            Exploring traditional fermentation processes using Himalayan-inspired ingredients and natural resources.
                            Documented on-ground by volunteer researcher Pranav during seasonal trials in Uttarakhand.
                        </p>
                    </div>

                    {/* Process Photographic Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {fermentationProcessSteps.map((step, idx) => (
                            <div
                                key={idx}
                                className="group bg-stone-50 rounded-2xl border border-stone-200/80 overflow-hidden hover:border-emerald-500/60 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
                                onClick={() => setSelectedImage({
                                    src: step.image,
                                    title: `${step.step}. ${step.title}`,
                                    caption: step.description,
                                    tag: step.stage,
                                    type: "Authentic Process Photograph"
                                })}
                            >
                                {/* Photo Container */}
                                <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-900">
                                    <img
                                        src={step.image}
                                        alt={step.alt}
                                        loading="lazy"
                                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3.5 text-white">
                                        <span className="text-xs font-medium flex items-center gap-1">
                                            <Maximize2 className="w-3.5 h-3.5" /> View Photo
                                        </span>
                                        <span className="font-mono text-xs opacity-75">{step.filename}</span>
                                    </div>
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-gray-900 font-mono text-xs font-bold px-2.5 py-1 rounded-md shadow-xs border border-white/60">
                                        Step {step.step}
                                    </div>
                                </div>

                                {/* Step Description */}
                                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                                    <div>
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded">
                                            {step.stage}
                                        </span>
                                        <h3 className="text-base font-bold text-gray-900 mt-2 leading-snug group-hover:text-emerald-800 transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                    <div className="pt-3 border-t border-stone-200/60 text-[11px] text-gray-500 flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                        <span className="font-medium text-stone-700">{step.highlight}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Process Summary Banner */}
                    <div className="mt-8 bg-emerald-50/60 border border-emerald-200/70 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                                <FlaskConical className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-emerald-950">First Ferment Science: Live Wild Cultures</h4>
                                <p className="text-xs text-emerald-800 mt-0.5">
                                    Unlike commercial beverages, natural First Ferment cultures utilize wild indigenous microflora, relying on patience and natural temperature adaptation rather than artificial additives.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================================================== */}
                {/* SECTION B: Himalayan Fermentation Product Collection */}
                {/* ============================================================================== */}
                <section id="fermentation-collection" className="bg-gradient-to-b from-stone-900 via-stone-900 to-emerald-950 rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl relative overflow-hidden">
                    {/* Decorative Background Glows */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        {/* Section Header */}
                        <div className="max-w-3xl mb-10">
                            <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400 mr-1" />
                                Artisan R&D Prototype Showcase
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                                Himalayan Fermentation Product Collection
                            </h2>
                            <p className="text-stone-300 text-base sm:text-lg mt-3 leading-relaxed">
                                Premium botanical concept explorations inspired by Uttarakhand’s native mountain harvest.
                                Formulated through ongoing volunteer research to demonstrate high-value bio-enterprise opportunities for mountain farmer collectives.
                            </p>
                        </div>

                        {/* Critical Research & Accuracy Disclaimer Notice */}
                        <div className="mb-10 bg-stone-800/80 border border-stone-700/80 rounded-2xl p-4 sm:p-5 flex items-start space-x-3.5 text-xs text-stone-300">
                            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-stone-100">R&D Concept Exploration & Transparency Disclosure:</p>
                                <p className="mt-1 text-stone-300 leading-relaxed">
                                    The following product visuals represent research and recipe concept models developed by CHANGE Foundation volunteers. These items are <strong>not commercially manufactured, bottled for public distribution, or offered for retail purchase</strong>. CHANGE Foundation presents these prototypes strictly to illustrate potential rural agro-processing pathways for indigenous Himalayan produce.
                                </p>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                            {productCollection.map((product, idx) => (
                                <div
                                    key={idx}
                                    className="group bg-stone-800/90 rounded-2xl border border-stone-700/80 overflow-hidden hover:border-amber-400/60 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                                    onClick={() => setSelectedImage({
                                        src: product.image,
                                        title: product.name,
                                        caption: product.conceptNote,
                                        tag: product.category,
                                        type: "Artisan R&D Concept Visual"
                                    })}
                                >
                                    {/* Product Visual Container with Clean Background */}
                                    <div className="relative aspect-4/5 w-full overflow-hidden bg-stone-900/90 p-4 flex items-center justify-center">
                                        <img
                                            src={product.image}
                                            alt={product.alt}
                                            loading="lazy"
                                            className="h-full w-auto max-h-64 object-contain group-hover:scale-105 transition-transform duration-500 filter drop-shadow-xl"
                                        />
                                        <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-xs border border-stone-700 text-stone-300 text-[10px] font-mono px-2 py-0.5 rounded">
                                            {product.badge}
                                        </div>
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium border border-white/30">
                                                <Maximize2 className="w-3.5 h-3.5" /> Enlarge
                                            </span>
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded">
                                                {product.category}
                                            </span>
                                            <h3 className="text-lg font-bold text-white mt-2 leading-snug group-hover:text-amber-300 transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-xs text-stone-400 italic mt-0.5">
                                                {product.tagline}
                                            </p>
                                            <p className="text-xs text-stone-300 mt-2.5 leading-relaxed line-clamp-3">
                                                {product.conceptNote}
                                            </p>
                                        </div>

                                        <div className="pt-3 border-t border-stone-700/60 text-[11px] text-stone-400">
                                            <span className="block text-[10px] uppercase font-bold text-stone-500 tracking-wider mb-1">Tasting Notes</span>
                                            <p className="text-stone-300 line-clamp-2 leading-snug">{product.profile}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Call to Collaboration Action */}
                        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="space-y-1 text-center md:text-left">
                                <h4 className="text-lg font-bold text-white">Interested in Mountain Agro-Processing Research?</h4>
                                <p className="text-xs sm:text-sm text-stone-300">
                                    Collaborate with CHANGE TechLab and our volunteer team in sustainable recipe formulation, quality testing, and farmer collective capacity building.
                                </p>
                            </div>
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-md shrink-0 whitespace-nowrap group"
                            >
                                Inquire & Collaborate
                                <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </div>

                        {/* Our Creative & Cultural Collaborators */}
                        <div className="mt-14 pt-10 border-t border-stone-800">
                            <div className="text-center sm:text-left mb-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-white">
                                    Our Creative & Cultural Collaborators
                                </h3>
                            </div>

                            <div className="bg-stone-800/60 border border-stone-700/60 hover:border-amber-400/50 rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group">
                                <div className="space-y-2">
                                    <h4 className="text-xl font-bold text-white tracking-wide group-hover:text-amber-300 transition-colors">
                                        BURANÉ — The Culture Co.
                                    </h4>
                                    <p className="text-sm text-stone-300 max-w-xl leading-relaxed">
                                        An emerging initiative celebrating culture, creativity and Himalayan identity.
                                    </p>
                                </div>

                                <a
                                    href="https://pranavburane.github.io/Burane"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm transition-all whitespace-nowrap shadow-md shrink-0 group/btn"
                                >
                                    Explore BURANÉ
                                    <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="bg-stone-900 border border-stone-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between text-white">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                                    {selectedImage.type} · {selectedImage.tag}
                                </span>
                                <h3 className="text-lg font-bold text-white mt-0.5">{selectedImage.title}</h3>
                            </div>
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                                aria-label="Close Preview"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Image Area */}
                        <div className="flex-1 bg-stone-950 p-6 flex items-center justify-center overflow-auto max-h-[60vh]">
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className="max-h-[55vh] max-w-full object-contain rounded-xl shadow-lg"
                            />
                        </div>

                        {/* Modal Caption */}
                        <div className="p-5 bg-stone-900 border-t border-stone-800 text-xs sm:text-sm text-stone-300 leading-relaxed">
                            {selectedImage.caption}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Portfolio;
