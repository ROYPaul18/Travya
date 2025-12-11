"use client";

import { Activity } from "@/app/generated/prisma";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useMemo } from "react";

interface MapProps {
    activities: Activity[];
}

const airbnbMapStyle = [
    {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "administrative.land_parcel",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "administrative.neighborhood",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "poi",
        elementType: "labels.text",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "poi.business",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [{ color: "#CDE7C9" }, { lightness: 10 }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#FFFFFF" }, { lightness: 100 }],
    },
    {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "road.arterial",
        stylers: [{ lightness: 10 }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{ color: "#EDEDED" }],
    },
    {
        featureType: "road.local",
        stylers: [{ lightness: 40 }],
    },
    {
        featureType: "transit",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [{ color: "#C9E6F0" }],
    },
    {
        featureType: "landscape",
        elementType: "geometry.fill",
        stylers: [{ color: "#F5F5F5" }],
    },
];

const MAP_OPTIONS = {
    styles: airbnbMapStyle,
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
};

const MAP_CONTAINER_STYLE = {
    width: "100%",
    height: "100%",
};

export default function Map({ activities }: MapProps) {
    const center = useMemo(() => {
        if (activities.length === 0) {
            return { lat: 48.8566, lng: 2.3522 }; 
        }

        const sumLat = activities.reduce((sum, activity) => sum + activity.lat, 0);
        const sumLng = activities.reduce((sum, activity) => sum + activity.lng, 0);

        return {
            lat: sumLat / activities.length,
            lng: sumLng / activities.length,
        };
    }, [activities]);

    const zoom = useMemo(() => {
        if (activities.length <= 1) return 12;

        const lats = activities.map((a) => a.lat);
        const lngs = activities.map((a) => a.lng);

        const latDiff = Math.max(...lats) - Math.min(...lats);
        const lngDiff = Math.max(...lngs) - Math.min(...lngs);
        const maxDiff = Math.max(latDiff, lngDiff);

        if (maxDiff > 5) return 6;
        if (maxDiff > 2) return 8;
        if (maxDiff > 1) return 9;
        if (maxDiff > 0.5) return 10;
        if (maxDiff > 0.1) return 11;
        return 12;
    }, [activities]);

    const markerIcon = useMemo(() => {
        if (typeof window === "undefined" || !window.google) return undefined;

        return {
            path: "M12 0C7.58 0 4 3.58 4 8c0 5.5 8 13 8 13s8-7.5 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z",
            fillColor: "#032e15",
            fillOpacity: 1,
            scale: 2,
            strokeWeight: 1,
            strokeColor: "#ffffff",
            anchor: new google.maps.Point(12, 21),
        };
    }, []);

    return (
        <GoogleMap
            mapContainerStyle={MAP_CONTAINER_STYLE}
            zoom={zoom}
            center={center}
            options={MAP_OPTIONS}
        >
            {activities.map((activity) => (
                <Marker
                    key={activity.id}
                    position={{ lat: activity.lat, lng: activity.lng }}
                    icon={markerIcon}
                    animation={
                        typeof window !== "undefined" && window.google
                            ? google.maps.Animation.DROP
                            : undefined
                    }
                    title={activity.name}
                />
            ))}
        </GoogleMap>
    );
}