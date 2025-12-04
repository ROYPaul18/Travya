import { Globe, Users, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Visibility = "COMMUNITY" | "FRIENDS" | "PRIVATE";

interface VisibilitySelectorProps {
  currentVisibility: string;
  onVisibilityChange: (visibility: Visibility) => void;
  showLabel?: boolean;
}

const visibilityConfig = {
  COMMUNITY: {
    icon: Globe,
    label: "Communauté",
  },
  FRIENDS: {
    icon: Users,
    label: "A venir...",
  },
  PRIVATE: {
    icon: Lock,
    label: "Privé",
  },
};

export function VisibilitySelector({
  currentVisibility,
  onVisibilityChange,
  showLabel = true,
}: VisibilitySelectorProps) {
  const current = currentVisibility.toUpperCase() as Visibility;
  const CurrentIcon = visibilityConfig[current]?.icon || Lock;
  const currentLabel = visibilityConfig[current]?.label || "Privé";

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
        {Object.entries(visibilityConfig).map(([key, { icon: Icon, label }]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => onVisibilityChange(key as Visibility)}
            className={`gap-2 ${current === key ? "bg-accent" : ""}`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}