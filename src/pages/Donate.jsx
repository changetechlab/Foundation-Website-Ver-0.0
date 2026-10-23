import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
    Heart, 
    ShieldCheck, 
    Mail, 
    FileText, 
    CheckCircle2, 
    ArrowRight, 
    Sprout, 
    Users, 
    Droplets, 
    Cpu, 
    ChevronDown, 
    ChevronUp, 
    Building2, 
    Scale,
    ExternalLink,
    Copy,
    Check
} from 'lucide-react';
import { legalData, bankDetails } from '../lib/constants';

const Donate = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [copiedField, setCopiedField] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const handleCopy = (text, fieldName) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text);
            setCopiedField(fieldName);
            setTimeout(() => setCopiedField(null), 2000);
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                setCopiedField(fieldName);
                setTimeout(() => setCopiedField(null), 2000);
            } catch (err) {
                console.error('Fallback copy failed', err);
            }
            document.body.removeChild(textArea);
        }
    };

    const impactPillars = [
        {
            icon: Sprout,
            title: "Climate-Smart Hill Agriculture",
            desc: "Equipping marginal mountain farmers with polyhouses, drip irrigation, climate-resilient organic seeds, and crop protection against erratic weather."
        },
        {
            icon: Droplets,
            title: "Springshed & Ecology Restoration",
            desc: "Recharging drying Himalayan mountain springs (Dharas & Naulas) to safeguard freshwater access for villages and sustain fragile river headwaters."
        },
        {
            icon: Users,
            title: "Women & Youth Livelihoods",
            desc: "Establishing community post-harvest processing, solar dehydration units, and farm-producer enterprises to curb distress economic migration."
        },
        {
            icon: Cpu,
            title: "Grassroots Mountain TechLab",
            desc: "Developing low-cost environmental sensors, automated micro-climate monitors, and open data platforms tailored for high-altitude mountain farming."
        }
    ];

    const faqs = [
        {
            q: "How do I make a contribution via direct bank transfer?",
            a: "You can transfer directly to our official institutional account using the verified bank details listed on this page via NEFT, RTGS, or IMPS. Use the 1-click copy buttons for the Account Number and IFSC Code to ensure complete accuracy."
        },
        {
            q: "Can I donate via online payment gateways or UPI apps?",
            a: "To eliminate intermediary transaction fees and maintain complete statutory auditability, we do not deploy commercial payment gateway widgets. Direct transfers to our verified HDFC Bank account ensure 100% of your contribution reaches our ground initiatives."
        },
        {
            q: "Is my contribution eligible for Section 80G tax deductions?",
            a: "Tax benefits under Section 80G are subject to the Foundation's Provisional Approval and prevailing Income Tax rules. As a newly incorporated Section 8 entity (incorporated Jan 2026), our statutory filings are in-process with the Income Tax Department."
        },
        {
            q: "Will I receive an official donation receipt?",
            a: "Yes. Once your bank transfer is completed and transaction reference (UTR) is shared with us, our finance department issues a digitally signed official receipt containing the Foundation's CIN, PAN, and full statutory registration details."
        },
        {
            q: "Can companies partner with CHANGE Foundation under Corporate Social Responsibility (CSR)?",
            a: "Yes. Our Himalayan programs directly align with Schedule VII of the Companies Act, 2013 (rural development, environmental sustainability, agro-ecology, and livelihood enhancement). Reach out to our team to structure a CSR collaboration."
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-12 md:py-16">
            <Helmet>
                <title>Donate & Support | CHANGE Foundation</title>
                <meta 
                    name="description" 
                    content="Support CHANGE Foundation's mission for sustainable Himalayan agriculture, water conservation, and community livelihoods with verified direct bank transfer." 
                />
                <link rel="canonical" href="https://www.change-uttarakhand.org/donate" />
            </Helmet>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                
                {/* 1. Hero Section */}
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center space-x-2 bg-primary-50 border border-primary-200 text-primary-700 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                        <Heart className="w-4 h-4 fill-primary-500 text-primary-500" />
                        <span>Support Sustainable Himalayan Development</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
                        Invest in the Future of <span className="text-primary-600">Himalayan Communities</span>
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Join <span className="font-semibold text-gray-800">{legalData.legalName}</span> ({legalData.brandName}) in building self-reliant mountain villages through sustainable agro-enterprise, ecology restoration, and community empowerment.
                    </p>

                    {/* Trust Badges Bar */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-gray-600">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white border border-gray-200 shadow-xs">
                            <ShieldCheck className="w-4 h-4 text-primary-600 mr-1.5" />
                            Section 8 Not-for-Profit
                        </span>
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white border border-gray-200 shadow-xs font-mono">
                            <Building2 className="w-4 h-4 text-primary-600 mr-1.5" />
                            CIN: {legalData.cin}
                        </span>
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white border border-gray-200 shadow-xs">
                            <Scale className="w-4 h-4 text-primary-600 mr-1.5" />
                            Audited Governance
                        </span>
                    </div>
                </div>

                {/* 2. Impact Pillars */}
                <div>
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Where Your Support Creates Impact</h2>
                        <p className="text-gray-600 mt-2 text-sm sm:text-base">
                            Every rupee contributed goes directly towards grassroots programs in Tehri Garhwal and rural Uttarakhand.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {impactPillars.map((pillar, idx) => {
                            const IconComponent = pillar.icon;
                            return (
                                <div 
                                    key={idx} 
                                    className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5">
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{pillar.title}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{pillar.desc}</p>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-xs font-medium text-primary-600">
                                        <CheckCircle2 className="w-4 h-4 mr-1.5 text-primary-500" />
                                        Grassroots Implementation
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 3. Verified Bank Transfer Section */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-8 sm:p-10">
                        <div className="max-w-3xl">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium uppercase tracking-wider mb-3">
                                Verified Banking Details
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Direct Bank Transfer (NEFT / RTGS / IMPS)</h2>
                            <p className="text-gray-300 mt-2 text-sm sm:text-base leading-relaxed">
                                Use the official, verified credentials below for direct transfers. One-click copy buttons are provided for your convenience and accuracy.
                            </p>
                        </div>
                    </div>

                    <div className="p-6 sm:p-10 space-y-8">
                        {/* Verified Bank Details Card */}
                        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border border-slate-700 relative overflow-hidden">
                            {/* Decorative background glow */}
                            <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-700/80 gap-4">
                                <div>
                                    <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                        <span>Verified Institutional Account</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">
                                        Official Bank Account Credentials
                                    </h3>
                                    <p className="text-slate-300 text-sm mt-1">
                                        Authorised Account for CHANGE Foundation Initiatives
                                    </p>
                                </div>
                                <div className="flex items-center space-x-3 bg-slate-800/90 border border-slate-600/80 px-4 py-2.5 rounded-xl self-start sm:self-auto">
                                    <Building2 className="w-5 h-5 text-emerald-400 shrink-0" />
                                    <div>
                                        <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Bank Name</span>
                                        <span className="block text-sm font-bold text-white">{bankDetails.bankName}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bank Account Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                                {/* Beneficiary Name */}
                                <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl md:col-span-2">
                                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                                        Beneficiary Name (Account Holder)
                                    </span>
                                    <p className="text-lg sm:text-xl font-bold text-white tracking-wide">
                                        {bankDetails.beneficiaryName}
                                    </p>
                                    <span className="text-xs text-slate-400 mt-1 block">
                                        Corporate Identity: {legalData.legalStatus}
                                    </span>
                                </div>

                                {/* Account Number with 1-Click Copy */}
                                <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
                                    <div>
                                        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                            Account Number
                                        </span>
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="font-mono text-xl sm:text-2xl font-bold text-emerald-400 tracking-wider">
                                                {bankDetails.accountNumber}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => handleCopy(bankDetails.accountNumber, 'account')}
                                                className={`inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-150 shrink-0 cursor-pointer ${
                                                    copiedField === 'account'
                                                        ? 'bg-emerald-500 text-white'
                                                        : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                                                }`}
                                                title="Copy Account Number"
                                                aria-label="Copy Account Number"
                                            >
                                                {copiedField === 'account' ? (
                                                    <>
                                                        <Check className="w-3.5 h-3.5" />
                                                        <span>Copied!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-3.5 h-3.5" />
                                                        <span>Copy</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <span className="text-[11px] text-slate-400 mt-3 block font-medium">
                                        Account Type: <strong className="text-slate-200">{bankDetails.accountType}</strong>
                                    </span>
                                </div>

                                {/* IFSC Code with 1-Click Copy */}
                                <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
                                    <div>
                                        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                            IFSC Code
                                        </span>
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="font-mono text-xl sm:text-2xl font-bold text-emerald-400 tracking-wider">
                                                {bankDetails.ifscCode}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => handleCopy(bankDetails.ifscCode, 'ifsc')}
                                                className={`inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-150 shrink-0 cursor-pointer ${
                                                    copiedField === 'ifsc'
                                                        ? 'bg-emerald-500 text-white'
                                                        : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                                                }`}
                                                title="Copy IFSC Code"
                                                aria-label="Copy IFSC Code"
                                            >
                                                {copiedField === 'ifsc' ? (
                                                    <>
                                                        <Check className="w-3.5 h-3.5" />
                                                        <span>Copied!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-3.5 h-3.5" />
                                                        <span>Copy</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <span className="text-[11px] text-slate-400 mt-3 block font-medium">
                                        Branch: <strong className="text-slate-200">{bankDetails.branch}</strong>
                                    </span>
                                </div>

                                {/* Bank Name Details */}
                                <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl">
                                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                                        Bank Name
                                    </span>
                                    <p className="text-base font-bold text-white">
                                        {bankDetails.bankName}
                                    </p>
                                    <span className="text-xs text-slate-400 mt-1 block">
                                        Account Type: {bankDetails.accountType}
                                    </span>
                                </div>

                                {/* Branch Location Details */}
                                <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl">
                                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                                        Branch Location
                                    </span>
                                    <p className="text-base font-bold text-white">
                                        {bankDetails.branch}
                                    </p>
                                    <span className="text-xs text-slate-400 mt-1 block">
                                        State: Uttarakhand, India
                                    </span>
                                </div>
                            </div>

                            {/* Post-Transfer Instructions & Receipt CTA */}
                            <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="text-sm text-slate-300">
                                    <p className="font-semibold text-white mb-0.5">Important: Acknowledgment & Official Receipt</p>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        After completing your transfer, kindly email your transaction reference (UTR) along with your PAN details to <span className="text-emerald-400 font-semibold">{legalData.contact.email}</span> to receive your stamped Section 8 donation receipt.
                                    </p>
                                </div>
                                <a
                                    href={`mailto:${legalData.contact.email}?subject=Donation%20Transfer%20Confirmation%20-%20Receipt%20Request&body=Dear%20CHANGE%20Foundation%20Team%2C%0A%0AI%20have%20completed%20a%20direct%20bank%20transfer%20to%20the%20Foundation's%20HDFC%20Bank%20account.%20Please%20find%20my%20details%20below%20for%20issuing%20the%20official%20receipt%3A%0A%0A- Donor Name%3A%20%0A- Transfer Amount%20(INR)%3A%20%0A- Transaction Reference%20(UTR)%20No%3A%20%0A- Date of Transfer%3A%20%0A- Donor PAN%3A%20%0A- Address%3A%20%0A- Contact Number%3A%20%0A%0AThank%20you.`}
                                    className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors shadow-sm shrink-0 whitespace-nowrap"
                                >
                                    <Mail className="w-4 h-4 mr-2" />
                                    Email UTR / Request Receipt
                                </a>
                            </div>
                        </div>

                        {/* Step-by-Step Flow */}
                        <div className="border-t border-gray-200 pt-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">How the Contribution Process Works</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center text-sm">
                                        1
                                    </div>
                                    <h4 className="font-semibold text-gray-900 text-base">Copy Account Credentials</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Use the 1-click copy buttons above to copy the HDFC Account Number and IFSC Code into your banking application.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center text-sm">
                                        2
                                    </div>
                                    <h4 className="font-semibold text-gray-900 text-base">Transfer Funds</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Execute the transfer securely from your net banking app via NEFT, RTGS, or IMPS directly into the Foundation's account.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center text-sm">
                                        3
                                    </div>
                                    <h4 className="font-semibold text-gray-900 text-base">Receive Acknowledgment</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Share your transaction reference (UTR) with donor PAN details to receive an official stamped Section 8 donation receipt.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Legal & Tax Compliance (Section 12A / 80G Disclaimer) */}
                <div className="bg-amber-50/70 border-2 border-amber-300 rounded-3xl p-6 sm:p-10 shadow-xs">
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0">
                            <Scale className="w-6 h-6" />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-200/80 text-amber-900 mb-2">
                                    Statutory Notice & Tax Compliance
                                </span>
                                <h3 className="text-xl sm:text-2xl font-bold text-amber-950">
                                    Important Notice on Tax Deductions (Section 80G & 12A)
                                </h3>
                            </div>
                            
                            {/* Explicit Mandatory Legal Disclaimer */}
                            <div className="bg-white/90 border-l-4 border-amber-600 p-4 rounded-r-xl shadow-xs">
                                <p className="text-base sm:text-lg font-bold text-amber-900 leading-snug">
                                    "Tax benefits under Section 80G are subject to the Foundation's Provisional Approval and prevailing Income Tax rules."
                                </p>
                            </div>

                            <p className="text-sm sm:text-base text-amber-900/90 leading-relaxed">
                                <strong>{legalData.legalName}</strong> is a legally incorporated not-for-profit company under Section 8 of the Companies Act, 2013 (CIN: <strong>{legalData.cin}</strong>, PAN: <strong>{legalData.pan}</strong>). In accordance with Central Board of Direct Taxes (CBDT) regulations, applications for provisional approval under Section 12A and Section 80G are under statutory processing. Prospective donors are requested to note that tax exemption certificates are issued subject to the final status of these approvals and prevailing Income Tax regulations.
                            </p>

                            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-amber-900">
                                <span>Entity Type: {legalData.legalStatus}</span>
                                <span>•</span>
                                <span>Incorporation: {legalData.incorporationDate}</span>
                                <span>•</span>
                                <span>ROC: {legalData.jurisdiction}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. CSR & Institutional Partnerships */}
                <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-10 shadow-xs">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-8 space-y-4">
                            <div className="inline-flex items-center space-x-2 text-primary-700 bg-primary-50 px-3 py-1 rounded-full text-xs font-semibold">
                                <Building2 className="w-4 h-4" />
                                <span>Schedule VII Alignment</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">
                                Corporate CSR & Philanthropic Foundations
                            </h3>
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                We design measurable, high-impact CSR interventions aligned with national priorities and Schedule VII of the Companies Act, 2013. Our programs focus on environmental sustainability, agro-ecological capacity building, rural water security, and rural livelihood creation.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-gray-700 font-medium">
                                <div className="flex items-center">
                                    <CheckCircle2 className="w-4 h-4 text-primary-500 mr-2 shrink-0" />
                                    Tailored Project Monitoring & Reporting
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle2 className="w-4 h-4 text-primary-500 mr-2 shrink-0" />
                                    Complete Fund Utilization Certification
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle2 className="w-4 h-4 text-primary-500 mr-2 shrink-0" />
                                    Community-Led Ground Implementation
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle2 className="w-4 h-4 text-primary-500 mr-2 shrink-0" />
                                    Third-Party Auditable Impact Metrics
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-4 bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center space-y-4">
                            <h4 className="font-bold text-gray-900">Partner With Us</h4>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Discuss project co-design, CSR grants, or technical collaboration with our leadership.
                            </p>
                            <a
                                href={`mailto:${legalData.contact.email}?subject=CSR%20Partnership%20Proposal%20-%20CHANGE%20Foundation`}
                                className="inline-flex items-center justify-center w-full bg-gray-900 hover:bg-black text-white font-medium py-2.5 px-4 rounded-xl text-sm transition-colors"
                            >
                                <Mail className="w-4 h-4 mr-2" />
                                Initiate CSR Discussion
                            </a>
                            <Link
                                to="/portfolio"
                                className="inline-flex items-center justify-center text-xs text-primary-600 hover:text-primary-700 font-medium"
                            >
                                View Our Impact Portfolio <ExternalLink className="w-3 h-3 ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 6. FAQ Section */}
                <div className="max-w-3xl mx-auto space-y-6">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center space-x-1.5 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
                            <FileText className="w-4 h-4" />
                            <span>Frequently Asked Questions</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Donation & Compliance FAQs</h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div 
                                    key={idx} 
                                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-colors"
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full px-6 py-4 text-left flex items-center justify-between text-gray-900 font-semibold text-sm sm:text-base hover:bg-gray-50 focus:outline-none"
                                    >
                                        <span>{faq.q}</span>
                                        {isOpen ? (
                                            <ChevronUp className="w-5 h-5 text-gray-400 shrink-0 ml-4" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 ml-4" />
                                        )}
                                    </button>
                                    {isOpen && (
                                        <div className="px-6 pb-5 pt-1 text-sm text-gray-600 border-t border-gray-100 leading-relaxed">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 7. Footer Contact Callout */}
                <div className="text-center pt-4 pb-8">
                    <p className="text-xs text-gray-500">
                        Have questions regarding our legal status, MoA, or audited financials?{' '}
                        <Link to="/legal" className="text-primary-600 hover:underline font-medium">
                            Read our Legal & Governance Disclosures
                        </Link>
                        {' '}or email us at{' '}
                        <a href={`mailto:${legalData.contact.email}`} className="text-primary-600 hover:underline font-medium">
                            {legalData.contact.email}
                        </a>.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Donate;
