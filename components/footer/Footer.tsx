"use client";

import React from 'react';
import { useIntlayer } from 'next-intlayer';

const Footer = () => {
    const content = useIntlayer("footer");

    return (
        <footer className="bg-white shadow-2xl py-4 border-t border-gray-200/50 text-gray-900 z-30">
            <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <span className="text-xl font-bold bg-clip-text">Travya</span>
                </div>
                <p className="text-sm">
                    {content.copyright}
                </p>
            </div>
        </footer>
    )
}

export default Footer;