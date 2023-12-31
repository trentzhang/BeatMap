"use client";
// Map.tsx
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useUserContext } from "../SelectedUserContext";

const icon = L.icon({ iconUrl: "/marker-icon.png", iconSize: [20, 35] });

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
    // alternative to call user api each time user is selected, but it's slower than getting all nearby users at once
    // const response = await fetch(`/api/get/nearby/user${queryString}`);
    if (response.ok) {
      const users = await response.json();
      // Do something with the users
      return users;
    } else {
      console.error("Error fetching users:", response.status);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
  return null;
};

function MyMap({
  currentUser,
}: {
  currentUser: Pick<MongoDBUserData, "profile" | "topTracks">;
}) {
  const { selectedUser, setSelectedUser } = useUserContext();

  function LocationMarkers() {
    const [position, setPosition] = useState<L.LatLng | null>(null);
    const [usersInBounds, setUsersInBounds] = useState<
      [MongoDBUserData] | null
    >();

    const map = useMap();

    useEffect(() => {
      // delay fetching users in bounds
      let moveTimeout: NodeJS.Timeout;

      if (map) {
        function onLocationfound(e: any) {
          onMove();
          //   pushLocation(e.latlng);
          // send current location to database if logged in
          const data = {
            profile: currentUser?.profile,
            location: {
              type: "Point",
              coordinates: [e.latlng.lng, e.latlng.lat],
            },
          };
          if (currentUser?.profile) {
            fetch("/api/post/realtime-location", {
              body: JSON.stringify(data),
              method: "POST",
              headers: { "Content-Type": "application/json" },
            });
          }

          // fly to current location
          setPosition(e.latlng);
          //   map.flyTo(e.latlng, 13); fly to current location with 13 zoom
        }
        function onLocationerror(e: any) {
          onMove();
          console.log(e);
        }
        function onMove() {
          // Clear the previous timeout if it exists
          clearTimeout(moveTimeout);

          // Set a new timeout
          moveTimeout = setTimeout(() => {
            // get users in current map area
            fetchUsersInBounds(map.getBounds()).then((users) => {
              setUsersInBounds(users);
            });
          }, 700); // Adjust the delay time as needed
        }

        const actions = {
          move: onMove,
          zoom: onMove,
          locationfound: onLocationfound,
          locationerror: onLocationerror,
        };
        map.locate();

        map.on(actions);
        return () => {
          map.off(actions);
        };
      }
    }, [map]);

    const MyMarker = ({ position, seletedUser }: MyMarker) => {
      return (
        <Marker
          position={position}
          icon={icon}
          eventHandlers={{
            click: () => setSelectedUser(seletedUser),
          }}
        >
          {/* <Popup>You are here</Popup> */}
        </Marker>
      );
    };

    const usersInBoundsMarkers = usersInBounds?.map((user) => {
      return (
        <MyMarker
          position={L.latLng(
            user.location.coordinates[1],
            user.location.coordinates[0]
          )}
          seletedUser={user}
          key={user._id}
        ></MyMarker>
      );
    });

    const currentMaker = position ? (
      <MyMarker
        position={position}
        seletedUser={null}
        key="Current Location Maker"
      ></MyMarker>
    ) : null;

    return (
      <>
        {usersInBoundsMarkers}
        {currentMaker}
      </>
    );
  }

  function DbClickZoom2World() {
    const map = useMap();

    useEffect(() => {
      function onDbClick(e: any) {
        map.flyTo(map.getCenter(), 3);
      }
      map.on("dblclick", onDbClick);
      return () => {
        map.off("dblclick", onDbClick);
      };
    }, [map]);
    return null;
  }

  const displayMap = useMemo(
    () => (
      <MapContainer
        className="h-full w-full z-0 transition-all duration-700 mask-image-my shadow-md sm:aspect-auto      hover:shadow-2xl  "
        center={[40.116421, -88.243385]}
        zoom={3}
        // wheelPxPerZoomLevel={12}
        doubleClickZoom={false}
        zoomDelta={5}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          maxZoom={13}
          minZoom={2}
        />
        <DbClickZoom2World />
        <MarkerClusterGroup chunkedLoading animateAddingMarkers={true}>
          <LocationMarkers />
        </MarkerClusterGroup>
      </MapContainer>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  // mix-blend-hard-light,mix-blend-lighten
  return displayMap;
}

export default MyMap;
