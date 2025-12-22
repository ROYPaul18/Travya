"use client";

import { useIntlayer } from "next-intlayer";
import { formatDate } from "@/lib/utils/formatDate";

interface Props {
  description?: string | null;
  startDate: Date;
  endDate: Date;
}

export function TripMetaCommunity({ description, startDate, endDate }: Props) {
  const content = useIntlayer("trip-detail");
  const days = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const getDaysText = (d: number) => (d <= 1 ? content.day : content.days);

  return (
    <div className="space-y-2 pb-4 sm:pb-6 border-b border-gray-200/50">
      {description && (
        <p className="text-neutral-800 text-lg sm:text-lg lg:text-xl leading-relaxed font-medium">
          {description}
        </p>
      )}
      <div className="flex flex-wrap gap-1 items-center text-sm sm:text-base text-[#222222] font-light">
        <div className="flex items-center gap-1.5">
          <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
        </div>
        <span className="text-neutral-300">·</span>
        <div className="flex items-center gap-1.5">
          <span>{days} {getDaysText(days)}</span>
        </div>
        <span className="text-neutral-300">·</span>
      </div>
    </div>
  );
}
