"use client"
import { Activity } from "@/app/generated/prisma";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"

interface MapProps {
    activities: Activity[];
}

export const airbnbMapStyle = [
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "poi.business",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      { "color": "#CDE7C9" }, 
      { "lightness": 10 }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      { "color": "#FFFFFF" },
      { "lightness": 100 }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "road.arterial",
    "stylers": [{ "lightness": 10 }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{ "color": "#EDEDED" }]
  },
  {
    "featureType": "road.local",
    "stylers": [{ "lightness": 40 }]
  },
  {
    "featureType": "transit",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      { "color": "#C9E6F0" }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [
      { "color": "#F5F5F5" }
    ]
  }
];


export default function Map({ activities }: MapProps) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });

    if (loadError) return <div>Error loading maps</div>
    if (!isLoaded) {
        return <div>Loading maps...</div>
    }

    const center = activities.length > 0 ? {
        lat: activities[0].lat,
        lng: activities[0].lng,
    } : {
        lat: 0,
        lng: 0
    }

    const mapOptions = {
        styles: airbnbMapStyle,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
    };

    return (
        <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            zoom={8}
            center={center}
            options={mapOptions}
        >
            {activities.map((activity, key) => (
                <Marker
                    key={key}
                    position={{ lat: activity.lat, lng: activity.lng }}
                    icon={{
                        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
                        fillColor: "#000",
                        fillOpacity: 1,
                        scale: 2,
                        strokeWeight: 1,
                        strokeColor: "#fff",
                    }}
                />
            ))}
        </GoogleMap>
    );
}