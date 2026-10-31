import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, ArrowLeft, HelpCircle } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
            <Helmet>
                <title>Page Not Found | CHANGE Foundation</title>
                <meta name="robots" content="noindex, follow" />
            </Helmet>
            <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mx-auto">
                    <HelpCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                        Error 404
                    </span>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Page Not Found
                    </h1>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        The page or resource you are looking for doesn't exist or has been moved.
                    </p>
                </div>
                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors shadow-xs"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Go to Homepage
                    </Link>
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

