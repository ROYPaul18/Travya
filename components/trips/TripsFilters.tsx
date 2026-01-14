"use client";

interface TripsStatusFiltersProps {
  tab: "all" | "upcoming" | "past";
  onTabChange: (tab: "all" | "upcoming" | "past") => void;
  content: {
    allTrips: { value: string };
    upcoming: { value: string };
    previous: { value: string };
  };
}

export function TripsStatusFilters({ 
  tab, 
  onTabChange, 
  content 
}: TripsStatusFiltersProps) {
  const statusOptions = [
    { id: "all" as const, label: content.allTrips.value },
    { id: "upcoming" as const, label: content.upcoming.value },
    { id: "past" as const, label: content.previous.value },
  ];

  return (
    <nav className="flex items-center gap-8 border-b border-gray-100 w-full md:w-auto">
      {statusOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => onTabChange(option.id)}
          className={`
            relative py-4 text-[14px] transition-all duration-200 outline-none
            ${tab === option.id 
              ? 'text-black font-semibold' 
              : 'text-[#717171] font-medium hover:text-black'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </nav>
  );
}