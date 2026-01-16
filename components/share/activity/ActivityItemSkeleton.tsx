"use client";

import { Skeleton } from "@/components/ui/skeleton";

const ActivityItemSkeleton = () => {
  return (
    <div className="border-b border-gray-300 py-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Image */}
        <div className="w-full sm:w-[130px] h-[180px] sm:h-[130px] shrink-0">
          <Skeleton className="w-full h-full rounded-md" />
        </div>

        {/* Contenu */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Header */}
          <div className="flex justify-between items-start gap-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityItemSkeleton;
