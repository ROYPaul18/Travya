"use client";

import { useState } from "react";
import { ChevronDown, Users, Globe, Calendar, Euro, X } from "lucide-react";
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
    { id: "solo", label: content.comingSoon, icon: "👤" },
    { id: "couple", label: content.comingSoon, icon: "👫" },
    { id: "small", label: content.comingSoon, icon: "👥" },
    { id: "large", label: content.comingSoon, icon: "👨‍👩‍👧‍👦" },
  ];

  const countryOptions = [
    { id: "france", label: content.comingSoon, flag: "🇫🇷" },
    { id: "italy", label: content.comingSoon, flag: "🇮🇹" },
    { id: "spain", label: content.comingSoon, flag: "🇪🇸" },
    { id: "japan", label: content.comingSoon, flag: "🇯🇵" },
    { id: "usa", label: content.comingSoon, flag: "🇺🇸" },
    { id: "thailand", label: content.comingSoon, flag: "🇹🇭" },
  ];

  const durationOptions = [
    { id: "weekend", label: content.comingSoon },
    { id: "short", label: content.comingSoon },
    { id: "medium", label: content.comingSoon },
    { id: "long", label: content.comingSoon },
  ];

  const budgetOptions = [
    { id: "budget", label: content.comingSoon },
    { id: "moderate", label: content.comingSoon },
    { id: "comfortable", label: content.comingSoon },
    { id: "luxury", label: content.comingSoon },
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

  const removeFilter = (
    value: string,
    selected: string[],
    setter: (val: string[]) => void
  ) => {
    setter(selected.filter(v => v !== value));
  };

  const clearAllFilters = () => {
    setSelectedPeople([]);
    setSelectedCountries([]);
    setSelectedDurations([]);
    setSelectedBudgets([]);
  };

  const getFilterLabel = (type: string, id: string) => {
    let options: any[] = [];
    let prefix = "";
    
    switch(type) {
      case "people":
        options = peopleOptions;
        prefix = content.peoplePrefix;
        break;
      case "country":
        options = countryOptions;
        prefix = content.countriesPrefix;
        break;
      case "duration":
        options = durationOptions;
        prefix = content.durationPrefix;
        break;
      case "budget":
        options = budgetOptions;
        prefix = content.budgetPrefix;
        break;
    }
    
    const option = options.find(opt => opt.id === id);
    return option ? `${prefix}: ${option.label}` : id;
  };

  const FilterDropdown = ({
    title,
    icon: Icon,
    options,
    selected,
    onToggle,
    showFlags = false,
    showIcons = false,
  }: any) => {
    const hasSelection = selected.length > 0;

    return (
      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-light transition-all whitespace-nowrap h-[36px] ${
                hasSelection 
                  ? "bg-gray-100 text-gray-900 border border-gray-300" 
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{title}</span>
              {hasSelection && (
                <span className="bg-gray-600 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {selected.length}
                </span>
              )}
              <ChevronDown className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            {options.map((option: any) => (
              <DropdownMenuCheckboxItem
                key={option.id}
                checked={selected.includes(option.id)}
                onCheckedChange={() => onToggle(option.id)}
                className="flex items-center gap-2"
              >
                <span className="flex items-center gap-1.5 font-light">
                  {showFlags && option.flag}
                  {showIcons && option.icon}
                  {option.label}
                </span>
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  const hasAnyFilters = 
    selectedPeople.length > 0 || 
    selectedCountries.length > 0 || 
    selectedDurations.length > 0 || 
    selectedBudgets.length > 0;

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        <FilterDropdown
          title={content.peopleFilter}
          icon={Users}
          options={peopleOptions}
          selected={selectedPeople}
          onToggle={(id: string) =>
            handleToggle(id, selectedPeople, setSelectedPeople)
          }
          showIcons
        />

        <FilterDropdown
          title={content.countriesFilter}
          icon={Globe}
          options={countryOptions}
          selected={selectedCountries}
          onToggle={(id: string) =>
            handleToggle(id, selectedCountries, setSelectedCountries)
          }
          showFlags
        />

        <FilterDropdown
          title={content.durationFilter}
          icon={Calendar}
          options={durationOptions}
          selected={selectedDurations}
          onToggle={(id: string) =>
            handleToggle(id, selectedDurations, setSelectedDurations)
          }
        />

        <FilterDropdown
          title={content.budgetFilter}
          icon={Euro}
          options={budgetOptions}
          selected={selectedBudgets}
          onToggle={(id: string) =>
            handleToggle(id, selectedBudgets, setSelectedBudgets)
          }
        />

        {hasAnyFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors ml-2"
          >
            {content.clearAll}
          </button>
        )}
      </div>
    </div>
  );
}
