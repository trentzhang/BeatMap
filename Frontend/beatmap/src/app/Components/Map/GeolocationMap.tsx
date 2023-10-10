"use client";
// Map.tsx
import L, { LatLngBounds, Map } from "leaflet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MarkerClusterGroup from "react-leaflet-cluster";

const icon = L.icon({ iconUrl: "/marker-icon.png" });

// Assuming you have a function to convert bounds to a query string
const boundsToQueryString = (bounds: any) => {
  const { _southWest, _northEast } = bounds;
  return `?southwest=${JSON.stringify([
    _southWest.lng,
    _southWest.lat,
  ])}&northeast=${JSON.stringify([_northEast.lng, _northEast.lat])}`;
};

const fetchUsersInBounds = async (bounds: any) => {
  try {
    const queryString = boundsToQueryString(bounds);
    const response = await fetch(`/api/nearbyUser${queryString}`);
    if (response.ok) {
      const users = await response.json();
      // Do something with the users
      console.log("Users in bounds:", users);
      return users;
    } else {
      console.error("Error fetching users:", response.status);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
function MyMap() {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 40.116421,
    longitude: -88.243385,
  });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [map, setMap] = useState<Map>();
  const [usersInBounds, setUsersInBounds] = useState([]);

  // Get user's current location and update url
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

  // Get users that in current map area
  useEffect(() => {
    let moveTimeout: NodeJS.Timeout;

    if (map) {
      const onMove = () => {
        // Clear the previous timeout if it exists
        clearTimeout(moveTimeout);

        // Set a new timeout
        moveTimeout = setTimeout(() => {
          // get users in current map area
          fetchUsersInBounds(map.getBounds()).then((users) => {
            setUsersInBounds(users);
          });
        }, 800); // Adjust the delay time as needed
      };

      map.on("move", onMove);
      return () => {
        map.off("move", onMove);
      };
    }
  }, [map]);

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
      // @ts-ignore
      ref={setMap}
    >
      <TileLayer
        // attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        maxZoom={16}
      />
      <MarkerClusterGroup chunkedLoading>
        <Marker
          position={[currentPosition.latitude, currentPosition.longitude]}
          icon={icon}
        >
          <Popup>Your location</Popup>
        </Marker>
        {usersInBounds
          ? usersInBounds.map((user: MongoDBUserData) => {
              return (
                <Marker
                  position={[
                    user.location.coordinates[1],
                    user.location.coordinates[0],
                  ]}
                  icon={icon}
                  key={user._id}
                >
                  <Popup>Someone</Popup>
                </Marker>
              );
            })
          : null}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default MyMap;
