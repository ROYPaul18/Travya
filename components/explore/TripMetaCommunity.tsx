"use client";

import { useIntlayer } from "next-intlayer";
import { Cormorant_Garamond } from 'next/font/google';

interface Props {
  description?: string | null;
  startDate: Date;
  endDate: Date;
}

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

export function TripMetaCommunity({ description, startDate, endDate }: Props) {
  const content = useIntlayer("trip-detail");
  const days = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const getDaysText = (d: number) => (d <= 1 ? content.day : content.days);

  return (
    <div className="space-y-2 pb-4 sm:pb-6 border-b border-gray-200/50">
      <section className="py-[120px] max-w-[800px] mx-auto text-left">
        {description && (
          <p className={cormorant.className} style={{
            fontSize: "2.2rem",
            lineHeight: 1.4,
            color: "#333",
            fontWeight: 300,
          }}>
            {description}
          </p>
        )}
      </section>
    </div >
  );
}