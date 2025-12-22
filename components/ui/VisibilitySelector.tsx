"use client";

import { Globe, Users, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIntlayer } from "next-intlayer";

type Visibility = "COMMUNITY" | "FRIENDS" | "PRIVATE";

interface VisibilitySelectorProps {
  currentVisibility: string;
  onVisibilityChange: (visibility: Visibility) => void;
  showLabel?: boolean;
}

export function VisibilitySelector({
  currentVisibility,
  onVisibilityChange,
  showLabel = true,
}: VisibilitySelectorProps) {
  const content = useIntlayer("visibility");
  
  const visibilityConfig = {
    COMMUNITY: {
      icon: Globe,
      label: content.community,
      description: content.communityDescription,
    },
    FRIENDS: {
      icon: Users,
      label: content.friends,
      description: content.friendsDescription,
    },
    PRIVATE: {
      icon: Lock,
      label: content.private,
      description: content.privateDescription,
    },
  };

  const current = currentVisibility.toUpperCase() as Visibility;
  const CurrentIcon = visibilityConfig[current]?.icon || Lock;
  const currentLabel = visibilityConfig[current]?.label || content.private;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-sm gap-2">
          <CurrentIcon className="h-4 w-4" />
          {showLabel && (
            <span className="hidden sm:inline">{currentLabel}</span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 rounded-sm">
        {Object.entries(visibilityConfig).map(([key, { icon: Icon, label, description }]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => onVisibilityChange(key as Visibility)}
            className={`gap-2 ${current === key ? "bg-accent" : ""}`}
          >
            <Icon className="h-4 w-4" />
            <div className="flex flex-col">
              <span>{label}</span>
              <span className="text-xs text-gray-500">{description}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}