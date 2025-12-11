"use client";

import React from 'react';
import { useIntlayer } from 'next-intlayer';
import Image from 'next/image';
import { Link } from '../Link';

const Footer = () => {
    const content = useIntlayer("footer");

    return (
        <footer className="relative bg-white sm:p-4 py-2 lg:py-2 border-t border-gray-200/50 z-50 font-button flex justify-center">
            <div className="flex justify-between items-center px-6 lg:px-28  w-full max-w-[1280px]">
                 <div className="flex items-center gap-2">
                         <Image src="/logo.png" alt="Travya Logo" width={32} height={32} />
                         <Link href="/" className="flex items-center">
                           <span className="text-base md:text-xl 2xl:text-2xl font-normal text-white-950 bg-clip-text">
                             Travya
                           </span>
                         </Link>
                       </div>
                <p className="font-light text-sm">
                    {content.copyright}
                </p>
            </div>
        </footer>
    )
}

export default Footer;