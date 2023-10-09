"use client";
// Map.tsx
import L from "leaflet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const icon = L.icon({ iconUrl: "/marker-icon.png" });

export const Map: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 40.116421,
    longitude: -88.243385,
  });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [map, setMap] = useState(null);
  const [bounds, setBounds] = useState(null);

  // Get user's current location using Geolocation API
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (geoPosition) => {
          const coords = {
            latitude: geoPosition.coords.latitude,
            longitude: geoPosition.coords.longitude,
          };
          setCurrentPosition(coords);

          // push location to current url
          const current = new URLSearchParams(searchParams);

          current.set("latitude", String(coords.latitude));
          current.set("longitude", String(coords.longitude));

          const search = current.toString();
          const query = search ? `?${search}` : "";

          router.push(`${pathname}${query}`);
        },
        (error) => {
          console.error("Error getting geolocation:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  }, [router, pathname, searchParams]);

  useEffect(() => {
    const onMove = () => {
      // Clear the previous timeout if it exists
      clearTimeout(moveTimeout);

      // Set a new timeout
      moveTimeout = setTimeout(() => {
        setBounds(map.getBounds());
        console.log("bounds :>> ", map.getBounds());
      }, 2000); // Adjust the delay time as needed
    };
    if (map) {
      map.on("move", onMove);
      return () => {
        map.off("move", onMove);
      };
    }
  }, [map]);

  // Declare moveTimeout outside of the component to persist its value
  let moveTimeout: any;

  useEffect(() => {
    if (map) {
      map.setView(
        [currentPosition.latitude, currentPosition.longitude],
        map.getZoom()
      );
    }
  }, [map, currentPosition]);

  // mix-blend-hard-light,mix-blend-lighten
  return (
    <MapContainer
      className="aspect-square w-full z-0 transition-all duration-700 mask-image-my shadow-md sm:aspect-auto sm:h-full     hover:shadow-2xl  "
      center={[currentPosition.latitude, currentPosition.longitude]}
      zoom={13}
      scrollWheelZoom={true}
      ref={setMap}
    >
      {/* <UpdateMapCenter /> */}
      {/* <FetchNearByUser></FetchNearByUser> */}
      <TileLayer
        // attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        maxZoom={16}
      />
      <Marker
        position={[currentPosition.latitude, currentPosition.longitude]}
        icon={icon}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

// export default DynamicMap;
export default Map;
