import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Building, MapPin, FileText, Calendar } from 'lucide-react';
import { legalData } from '../lib/constants';

const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Helmet>
                <title>About Us | CHANGE Foundation</title>
                <meta name="description" content="Learn about CHANGE Foundation, a Section 8 Non-Profit driving sustainable development in the Himalayas. View our legal status, mission, and registered credentials." />
                <link rel="canonical" href="https://www.changefoundation.in/about" />
            </Helmet>
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">About the Foundation</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    We are a registered Section 8 Non-Profit organization committed to sustainable development in the Himalayan region.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Organization Details */}
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

                {/* Contact/Registered Office */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                        <MapPin className="mr-3 text-primary-500" /> Registered Office
                    </h2>
                    <div className="space-y-4 text-gray-700">
                        <p className="font-medium text-lg">{legalData.registeredOffice.address}</p>
                        <p>Block: {legalData.registeredOffice.block}</p>
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

export default About;
