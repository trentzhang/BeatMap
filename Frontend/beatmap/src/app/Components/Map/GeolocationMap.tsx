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

// Define types for props
interface MapProps {
  mapLoaded: boolean;
  setMapLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const icon = L.icon({ iconUrl: "/marker-icon.png" });

export const Map: React.FC = () => {
  const [position, setPosition] = useState<Position>({
    latitude: 40.116421,
    longitude: -88.243385,
  });
  //   const [mapLoaded, setMapLoaded] = useState(false);

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
  // mix-blend-hard-light,mix-blend-lighten
  return (
    <MapContainer
      className="aspect-square w-full sm:aspect-auto sm:h-full rounded-full  shadow-2xl "
      center={[position.latitude, position.longitude]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <UpdateMapCenter />
      <TileLayer
        // attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        maxZoom={16}
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
