
'use client';

import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { useMemo } from 'react';
import { Skeleton } from './ui/skeleton';

interface Hotspot {
    village: string;
    position: { lat: number; lng: number };
    risk: 'High' | 'Medium' | 'Low';
}

interface RegionalRiskMapProps {
    hotspots: Hotspot[];
}

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
};

// Centered on Northeast India
const center = {
  lat: 26.5,
  lng: 93.5
};

const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: [
        {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
            { "color": "#ffffff" }
          ]
        },
        {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
            { "color": "#000000" },
            { "lightness": 13 }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [
            { "color": "#000000" }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
            { "color": "#144b53" },
            { "lightness": 14 },
            { "weight": 1.4 }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
            { "color": "#08304b" }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            { "color": "#0c4152" },
            { "lightness": 5 }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
            { "color": "#000000" }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            { "color": "#0b434f" },
            { "lightness": 25 }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry.fill",
          "stylers": [
            { "color": "#000000" }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry.stroke",
          "stylers": [
            { "color": "#0b3d51" },
            { "lightness": 16 }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
            { "color": "#000000" }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
            { "color": "#146474" }
          ]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
            { "color": "#021019" }
          ]
        }
      ]
};


export default function RegionalRiskMap({ hotspots }: RegionalRiskMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const getMarkerIcon = (risk: 'High' | 'Medium' | 'Low') => {
    let color;
    switch (risk) {
      case 'High':
        color = 'F00'; // Red
        break;
      case 'Medium':
        color = 'FFD700'; // Yellow
        break;
      default:
        color = '0F0'; // Green
        break;
    }
    return {
      path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
      fillColor: `#${color}`,
      fillOpacity: 0.9,
      strokeWeight: 0,
      rotation: 0,
      scale: 1.5,
      anchor: new google.maps.Point(12, 24),
    };
  };

  if (!isLoaded) return <Skeleton className="w-full h-full" />;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6}
      options={mapOptions}
    >
      {hotspots.map((hotspot) => (
        <MarkerF
          key={hotspot.village}
          position={hotspot.position}
          title={hotspot.village}
          icon={getMarkerIcon(hotspot.risk)}
        />
      ))}
    </GoogleMap>
  );
}
