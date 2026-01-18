"use client";

import React from 'react';
import { useIntlayer } from 'next-intlayer';
import Image from 'next/image';
import { Link } from '../Link';

const Footer = () => {
  const content = useIntlayer("footer");

  return (
    <footer className="relative bg-white py-7 lg:py-16 2xl:py-24 px-6 lg:px-8 2xl:px-60 border-t border-gray-200/50 z-50 font-button">
      <div className="flex justify-center items-center gap-2">
        <Link href="/" className="flex items-center font-logo gap-2">
          <span className="text-base md:text-xl xl:text-[28px] 2xl:text-2xl font-logo tracking-wide">
            SILLAGES
          </span>
        </Link>
      </div>
    </footer>
  )
}

export default Footer;