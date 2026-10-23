import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { navigationLinks } from '../lib/constants';
import foundationLogo from '../assets/foundation-logo.png';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center py-1.5" aria-label="CHANGE Foundation Home">
                            <img
                                src={foundationLogo}
                                alt="Centre for Himalayan Agriculture and Nature Foundation"
                                className="h-11 sm:h-12 w-auto object-contain max-h-14"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-5 lg:space-x-7">
                        {navigationLinks.filter(link => link.path !== '/donate').map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium transition-colors duration-200 ${
                                    location.pathname === link.path
                                        ? 'text-primary-600 font-semibold'
                                        : 'text-gray-500 hover:text-primary-600'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/donate"
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 shadow-xs hover:shadow ${
                                location.pathname === '/donate'
                                    ? 'bg-primary-700 text-white ring-2 ring-primary-500 ring-offset-1'
                                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                            }`}
                        >
                            <Heart className="w-4 h-4 fill-white/20" />
                            <span>Donate</span>
                        </Link>
                        <a
                            href="https://change-techlab.onrender.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors duration-200"
                        >
                            ⚙️ TechLab
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label="Toggle Navigation Menu"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1.5 sm:px-3">
                        {navigationLinks.filter(link => link.path !== '/donate').map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                    location.pathname === link.path
                                        ? 'text-primary-600 bg-primary-50 font-semibold'
                                        : 'text-gray-500 hover:text-primary-600 hover:bg-gray-50'
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="py-1">
                            <Link
                                to="/donate"
                                className={`w-full text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center space-x-2 shadow-xs ${
                                    location.pathname === '/donate'
                                        ? 'bg-primary-700 ring-2 ring-primary-500'
                                        : 'bg-primary-600 hover:bg-primary-700'
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Heart className="w-4 h-4 fill-white/20" />
                                <span>Donate</span>
                            </Link>
                        </div>
                        <a
                            href="https://change-techlab.onrender.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-primary-600 hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            ⚙️ TechLab
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;