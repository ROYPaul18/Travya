"use client";

import { useState } from "react";
import { deleteTrip, updateTripVisibility } from "@/lib/actions/Trip";

type Visibility = "PRIVATE" | "COMMUNITY" | "FRIENDS";

export function useTripActions(tripId: string) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const openDeleteDialog = () => setShowDeleteDialog(true);
  const closeDeleteDialog = () => setShowDeleteDialog(false);

  const handleVisibilityChange = async (visibility: Visibility) => {
    try {
      await updateTripVisibility(tripId, visibility);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la mise à jour de la visibilité");
    }
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTrip(tripId);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la suppression du voyage");
      setIsDeleting(false);
      closeDeleteDialog();
    }
  };

  return {
    isDeleting,
    showDeleteDialog,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
    handleVisibilityChange,
  };
}
