"use client";

interface TripsStatusFiltersProps {
  tab: "all" | "upcoming" | "past";
  onTabChange: (tab: "all" | "upcoming" | "past") => void;
  content: {
    allTrips: { value: string };
    upcoming: { value: string };
    previous: { value: string };
  };
  sidebarOpen?: boolean;
}

export function TripsStatusFilters({ 
  tab, 
  onTabChange, 
  content,
  sidebarOpen = true 
}: TripsStatusFiltersProps) {
  const statusOptions = [
    { id: "all" as const, label: content.allTrips.value },
    { id: "upcoming" as const, label: content.upcoming.value },
    { id: "past" as const, label: content.previous.value },
  ];

  return (
    <aside className={`
      w-full lg:w-60 lg:border-r lg:border-gray-100 lg:pr-6
      ${sidebarOpen ? 'block' : 'hidden lg:block'}
    `}>
      <div className="bg-white lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none border lg:border-0 border-gray-200">
        <h3 className="text-base font-light text-gray-900 mb-4">
          Statut du voyage
        </h3>
        <div className="space-y-3">
          {statusOptions.map((option) => (
            <label 
              key={option.id} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={tab === option.id}
                onChange={() => onTabChange(option.id)}
                className="w-4 h-4 lg:w-4.5 lg:h-4.5 rounded accent-green-950 border-gray-300 text-green-950 focus:ring-green-900 cursor-pointer"
              />
              <span className="text-gray-700 font-extralight text-sm group-hover:text-green-900 transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}