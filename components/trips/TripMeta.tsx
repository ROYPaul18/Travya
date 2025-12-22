import { formatDate } from "@/lib/utils/formatDate";
import { useIntlayer } from "next-intlayer";

interface TripMetaProps {
  description?: string | null;
  startDate: Date;
  endDate: Date;
}

export function TripMeta({
  description,
  startDate,
  endDate,
}: TripMetaProps) {
  const content = useIntlayer("trip-detail");

  const tripDays = Math.round(
    (endDate.getTime() - startDate.getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <div className="space-y-2 pb-6 border-b border-gray-200/50">
      {description && (
        <p className="text-neutral-800 text-lg leading-relaxed font-medium">
          {description}
        </p>
      )}

      <div className="flex gap-1 text-[1rem] text-[#222] font-light">
        <span>
          {formatDate(startDate)} – {formatDate(endDate)}
        </span>
        <span className="text-neutral-300">·</span>
        <span>
          {tripDays}{" "}
          {tripDays <= 1 ? content.day : content.days}
        </span>
      </div>
    </div>
  );
}
