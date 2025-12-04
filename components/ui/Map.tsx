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

    if (loadError) return <div className="flex items-center justify-between">Error loading maps</div>
    if (!isLoaded) {
        return <div className="flex items-center justify-between">Loading maps...</div>
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

    const modernMarkerIcon = {
        path: "M12 0C7.58 0 4 3.58 4 8c0 5.5 8 13 8 13s8-7.5 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z",
        fillColor: "#032e15",
        fillOpacity: 1,
        scale: 2,
        strokeWeight: 1,
        strokeColor: "#ffffff",
        anchor: new google.maps.Point(12, 21),
    };

    const selectedIcon = modernMarkerIcon; 

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
                    icon={selectedIcon}
                    animation={google.maps.Animation.DROP}
                    
                />
            ))}
        </GoogleMap>
    );
}