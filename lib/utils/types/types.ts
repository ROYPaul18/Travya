export interface Activity {
  id: string;
  name: string;
  address: string;
  category: string;
  description: string | null;
  startTime: string | null;
  endTime: string | null;
  budget: number | null;
  images: string[];
};

export interface ActivityFormProps {
  locationId: string;
  tripId: string;
  onCancel: () => void;
  onSuccess: () => void;
  addActivity: (
    formData: FormData,
    locationId: string,
    tripId: string,
  ) => Promise<{ success: boolean }>;
}

export interface ActivityEditFormProps {
  activity: Activity;
  locationId: string;
  tripId: string;
  onCancel: () => void;
  onSuccess: () => void;
  updateActivity: (
    activityId: string,
    formData: FormData,
    tripId: string,
  ) => Promise<{ success: boolean }>;
}