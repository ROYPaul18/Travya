"use client";

import { MapActivity } from "@/lib/utils/types/types";
import { GoogleMap, Marker, InfoWindow, Polyline } from "@react-google-maps/api";
import { useMemo, useState } from "react";

interface MapProps {
    activities: MapActivity[];
}

// DA "Voyage" : Couleurs plus naturelles, routes discrètes, eau douce
const travelMapStyle = [
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#e9f1f2" }] },
    { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f5f5f3" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#dae9d1" }] },
    { featureType: "poi.park", elementType: "labels", stylers: [{ visibility: "on" }, { lightness: 20 }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca3af" }] },
    { featureType: "administrative", elementType: "labels.text.fill", stylers: [{ color: "#4b5563" }] },
    { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
];

const MAP_OPTIONS = {
    styles: travelMapStyle,
    disableDefaultUI: true, 
    zoomControl: true,
    scrollwheel: true,
    gestureHandling: "cooperative",
};

export default function Map({ activities }: MapProps) {
    const [hoveredActivity, setHoveredActivity] = useState<MapActivity | null>(null);
    const pathCoordinates = useMemo(() => 
        activities.map(a => ({ lat: a.lat, lng: a.lng })), 
    [activities]);

    const center = useMemo(() => {
        if (activities.length === 0) return { lat: 48.8566, lng: 2.3522 };
        return pathCoordinates[0];
    }, [pathCoordinates]);

    const getMarkerIcon = (isHovered: boolean) => {
    
    if (typeof window === "undefined" || !window.google) return undefined;

    return {

        path: 0,
        fillColor: isHovered ? "#2563eb" : "#032e15",
        fillOpacity: 1,
        scale: isHovered ? 12 : 10,
        strokeWeight: 3,
        strokeColor: "#ffffff",
    };
};

    return (
        <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            zoom={10}
            center={center}
            options={MAP_OPTIONS}
        >
            <Polyline
                path={pathCoordinates}
                options={{
                    strokeColor: "#032e15",
                    strokeOpacity: 0.6,
                    strokeWeight: 3,
                    icons: [{
                        icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 2 },
                        offset: "0",
                        repeat: "10px" 
                    }],
                }}
            />

            {activities.map((activity, index) => (
                <Marker
                    key={activity.id}
                    position={{ lat: activity.lat, lng: activity.lng }}
                    label={{
                        text: (index + 1).toString(), 
                        color: "white",
                        fontSize: "10px",
                        fontWeight: "bold"
                    }}
                    icon={getMarkerIcon(hoveredActivity?.id === activity.id)}
                    onMouseOver={() => setHoveredActivity(activity)}
                    onMouseOut={() => setHoveredActivity(null)}
                />
            ))}

            {hoveredActivity && (
                <InfoWindow
                    position={{ lat: hoveredActivity.lat, lng: hoveredActivity.lng }}
                    options={{ pixelOffset: new window.google.maps.Size(0, -10) }}
                >
                    <div className="p-2 min-w-[150px] font-sans">
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                           Étape {activities.indexOf(hoveredActivity) + 1}
                        </p>
                        <h3 className="font-bold text-gray-900">{hoveredActivity.name}</h3>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}