export type Categorie = 
  | "RESTAURANT"
  | "CAFE"
  | "VISITE"
  | "HOTEL"
  | "TRANSPORT"
  | "SHOPPING"
  | "NATURE"
  | "SPORT"
  | "AUTRE";

export type Visibility = "PRIVATE" | "COMMUNITY" | "FRIENDS";

export interface Activity {
  id: string;
  name: string;
  address: string| null;
  category: Categorie; 
  description: string | null;
  startTime: string | null;
  endTime: string | null;
  budget: number | null;
  images: string[];
  lat: number;
  lng: number;
  wallpaper: string | null;
  locationId: string;
  order: number;
}

export interface Trip {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  images?: Array<string>;
  wallpaper?: string;
  pricePerPerson?: number;
  currency?: string;
  isPrivate?: boolean;
  isAlreadyLiked?: boolean;
  hasFreeReschedule?: boolean;
  hasTourGuide?: boolean;
}

export interface ActivityFormProps {
  locationId: string;
  tripId: string;
  onCancel: () => void;
  onSuccess: () => void;
  addActivity: (
    formData: FormData,
    locationId: string,
    tripId: string
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
    tripId: string
  ) => Promise<{ success: boolean }>;
}

export interface LocationWithActivities {
  id: string;
  locationTitle: string;
  lat: number;
  lng: number;
  tripId: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  activities: Activity[];
}

export interface TripWithLocation {
  id: string;
  title: string;
  description: string | null;
  images: string[];
  wallpaper: string | null;
  startDate: Date;
  endDate: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  visibility: Visibility;
  locations: LocationWithActivities[];
}

export type ActivityWithLocation = Activity & {
  address: string;
  lat: number;
  lng: number;
  locationId: string;
  order: number;
};

export type MapActivity = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address?: string;
  category?: string;
  description?: string;
};

export interface Location {
  id: string;
  locationTitle: string;
  lat: number;
  lng: number;
  tripId: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
