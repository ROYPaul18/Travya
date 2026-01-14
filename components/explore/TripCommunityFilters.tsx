"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIntlayer } from "next-intlayer";

export function TripsFilters() {
  const content = useIntlayer("trips-community-filters");

  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([]);

  const peopleOptions = [
    { id: "solo", label: content.soloTraveler, icon: "👤" },
    { id: "couple", label: content.couple, icon: "👫" },
    { id: "small", label: content.smallGroup, icon: "👥" },
    { id: "large", label: content.largeGroup, icon: "👨‍👩‍👧‍👦" },
  ];

  const countryOptions = [
    { id: "france", label: content.france, flag: "🇫🇷" },
    { id: "italy", label: content.italy, flag: "🇮🇹" },
    { id: "spain", label: content.spain, flag: "🇪🇸" },
    { id: "japan", label: content.japan, flag: "🇯🇵" },
    { id: "usa", label: content.usa, flag: "🇺🇸" },
    { id: "thailand", label: content.thailand, flag: "🇹🇭" },
  ];

  const durationOptions = [
    { id: "weekend", label: content.weekend },
    { id: "short", label: content.shortTrip },
    { id: "medium", label: content.mediumTrip },
    { id: "long", label: content.longTrip },
  ];

  const handleToggle = (
    value: string,
    selected: string[],
    setter: (val: string[]) => void
  ) => {
    setter(
      selected.includes(value)
        ? selected.filter(v => v !== value)
        : [...selected, value]
    );
  };

  const clearAllFilters = () => {
    setSelectedPeople([]);
    setSelectedCountries([]);
    setSelectedDurations([]);
    setSelectedBudgets([]);
  };

  const FilterButton = ({
    title,
    options,
    selected,
    onToggle,
    isComingSoon = false,
  }: any) => {
    const hasSelection = selected.length > 0;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={isComingSoon}>
          <button
            className={`
              relative flex items-center gap-2 px-0 py-2 text-sm font-serif italic transition-all duration-200
              ${isComingSoon 
                ? "opacity-40 cursor-not-allowed text-gray-400" 
                : "text-gray-900 hover:text-gray-600"}
              ${hasSelection && !isComingSoon ? "font-semibold" : ""}
            `}
          >
            <span>{title}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>

        {!isComingSoon && (
          <DropdownMenuContent 
            align="start" 
            className="w-64 p-2 rounded-xl shadow-lg border border-gray-200 bg-white z-50"
          >
            {options.map((option: any) => (
              <DropdownMenuCheckboxItem
                key={option.id}
                checked={selected.includes(option.id)}
                onCheckedChange={() => onToggle(option.id)}
                className="flex items-center gap-3 p-3 rounded-lg cursor-pointer focus:bg-gray-50 text-sm transition-colors"
              >
                <span className="flex items-center gap-2">
                  {option.flag || option.icon}
                  {option.label}
                </span>
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    );
  };

  const hasAnyFilters = selectedPeople.length + selectedCountries.length + selectedDurations.length > 0;

  return (
    <div className="">
      <div className="flex items-center gap-8">
        <FilterButton
          title={content.destination || "Destination"}
          options={countryOptions}
          selected={selectedCountries}
          onToggle={(id: string) => handleToggle(id, selectedCountries, setSelectedCountries)}
          isComingSoon={true}
        />
         <FilterButton
          title={content.destination || "Personnes"}
          options={peopleOptions}
          selected={selectedPeople}
          onToggle={(id: string) => handleToggle(id, selectedPeople, setSelectedPeople)}
          isComingSoon={true}
        />

        <FilterButton
          title={content.budget || "Budget"}
          options={[
            { id: "low", label: "€" },
            { id: "medium", label: "€€" },
            { id: "high", label: "€€€" },
            { id: "luxury", label: "€€€€" },
          ]}
          selected={selectedBudgets}
          onToggle={(id: string) => handleToggle(id, selectedBudgets, setSelectedBudgets)}
          isComingSoon={true}
          
        />
        
        <FilterButton
          title={content.duration || "Durée"}
          options={durationOptions}
          selected={selectedDurations}
          onToggle={(id: string) => handleToggle(id, selectedDurations, setSelectedDurations)}
          isComingSoon={true}
        />

        {hasAnyFilters && (
          <button
            onClick={clearAllFilters}
            className="text-[13px] font-medium text-gray-600 hover:text-gray-900 px-2 py-2 transition-colors"
          >
            {content.clearAll || "Réinitialiser"}
          </button>
        )}
      </div>
    </div>
  );
}