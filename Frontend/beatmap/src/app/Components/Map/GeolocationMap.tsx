"use client";
// Map.tsx
import L, { Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useUserContext } from "../SelectedUserContext";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function pushLocation(coords: L.LatLng) {
    // push location to current url
    const current = new URLSearchParams(searchParams);
    current.set("latitude", String(coords.lat));
    current.set("longitude", String(coords.lng));
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  }

  const { selectedUser, setSelectedUser } = useUserContext();

  function NearbyUsersLocationMaker() {
    const [usersInBounds, setUsersInBounds] = useState<
      [MongoDBUserData] | null
    >();
    const map = useMap();

    // delay fetching users in bounds
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

    const usersInBoundsMarkers = usersInBounds?.map((user) => {
      return (
        <Marker
          position={[
            user.location.coordinates[1],
            user.location.coordinates[0],
          ]}
          icon={icon}
          key={user._id}
          eventHandlers={{
            click: () => setSelectedUser(user),
          }}
        >
          <Popup>Someone</Popup>
        </Marker>
      );
    });

    return usersInBounds ? usersInBoundsMarkers : null;
  }

  function CurrentLocationMarker() {
    const [position, setPosition] = useState<L.LatLng | null>(null);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        pushLocation(e.latlng);
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
    }, [map]);

    return position === null ? null : (
      <Marker
        position={position}
        icon={icon}
        eventHandlers={{
          click: () => setSelectedUser(null),
        }}
      >
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  const displayMap = useMemo(
    () => (
      <MapContainer
        className="h-full w-full z-0 transition-all duration-700 mask-image-my shadow-md sm:aspect-auto      hover:shadow-2xl  "
        center={[40.116421, -88.243385]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          maxZoom={16}
        />

        <MarkerClusterGroup chunkedLoading>
          <CurrentLocationMarker />
          <NearbyUsersLocationMaker />
        </MarkerClusterGroup>
      </MapContainer>
    ),
    []
  );
  // mix-blend-hard-light,mix-blend-lighten
  return displayMap;
}

export default MyMap;
