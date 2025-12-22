"use client";

import { Trip } from "@/app/generated/prisma";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/Link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VisibilitySelector } from "@/components/ui/VisibilitySelector";

interface TripHeaderProps {
  trip: Trip;
  onDelete: () => void;
  onVisibilityChange: (
    visibility: "PRIVATE" | "COMMUNITY" | "FRIENDS",
  ) => void;
}

export function TripHeader({
  trip,
  onDelete,
  onVisibilityChange,
}: TripHeaderProps) {
  return (
    <div className="flex items-center justify-between pt-6">
      <h1 className="text-2xl font-medium text-neutral-900">
        {trip.title}
      </h1>

      <div className="flex items-center gap-2">
        <VisibilitySelector
          currentVisibility={trip.visibility}
          onVisibilityChange={onVisibilityChange}
          showLabel
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-sm">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40 rounded-sm">
            <DropdownMenuItem asChild>
              <Link href={`trips/${trip.id}/edit`} className="flex">
                <Pencil className="h-4 w-4 mr-2" />
                Modifier
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-red-600"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
