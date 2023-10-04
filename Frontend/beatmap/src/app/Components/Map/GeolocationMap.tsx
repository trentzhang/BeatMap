"use client";
// Map.tsx
import L from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Position {
  latitude: number;
  longitude: number;
}
const icon = L.icon({ iconUrl: "/marker-icon.png" });

export const Map: React.FC = () => {
  const [position, setPosition] = useState<Position>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    // Get user's current location using Geolocation API
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (geoPosition) => {
          setPosition({
            latitude: geoPosition.coords.latitude,
            longitude: geoPosition.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting geolocation:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  }, []);

  // Custom hook to update the map center when the position changes
  const UpdateMapCenter = () => {
    const map = useMap();
    useEffect(() => {
      map.setView([position.latitude, position.longitude], map.getZoom());
    }, [map]);
    return null;
  };

  return (
    <MapContainer
      className="w-full aspect-video"
      center={[position.latitude, position.longitude]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <UpdateMapCenter />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[position.latitude, position.longitude]} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

// export default DynamicMap;
export default Map;
