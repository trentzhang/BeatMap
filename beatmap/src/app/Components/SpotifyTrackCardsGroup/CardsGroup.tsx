"use client";
import { Card, CardBody, ScrollShadow } from "@nextui-org/react";
import { AnimatePresence, Variants, motion, useAnimation } from "framer-motion";
import { createContext, useState } from "react";
import { useUserContext } from "../SelectedUserContext";
import { SpotifyCard } from "./TrackCard";

export const currentlyPlayingContext = createContext<any>(undefined);

export default function MusicComponent({
  loggedInUserTopTracks,
}: {
  loggedInUserTopTracks: TopTracks;
}) {
  const { selectedUser, setSelectedUser } = useUserContext();
  const topTracks = selectedUser?.topTracks || loggedInUserTopTracks;

  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  // alternative to call user api each time user is selected, but it's slower than getting all nearby users at once
  //   const fetcher = (url: string) =>
  //     fetch(url)
  //       .then((res) => res.json())
  //       .then((res) => {
  //         setTopTracks(res[0].topTracks);
  //         return res[0].topTracks;
  //       });

  //   const { data, error } = useSWR<TopTracks>(
  //     "/api/get/user/topsongs?id=" + selectedUser?._id,
  //     fetcher
  //   );
  //   const [topTracks, setTopTracks] = useState([]);

  const [isToggled, setIsToggled] = useState(false);

  const controls = useAnimation();

  const handleTap = async () => {
    setIsToggled(!isToggled);

    // Animate to the desired y position based on the toggle state
    await controls.start({
      y: isToggled ? 0 : "-50%",
    });
  };
  const MyCard = (
    <motion.div animate={controls} onTap={handleTap} className="">
      <Card className="m-5  bg-gradient-to-b from-blue-600 to-sky-600">
        <CardBody>
          <motion.div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-300  mb-5">
              Top 50 Songs
            </h1>
          </motion.div>

          <ScrollShadow
            hideScrollBar
            className="h-[60vh]"
            onPointerDownCapture={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
              {topTracks?.items?.map((topTrack) => (
                <SpotifyCard
                  topTrack={topTrack}
                  key={topTrack.id}
                ></SpotifyCard>
              ))}
            </div>
          </ScrollShadow>
        </CardBody>
      </Card>
    </motion.div>
  );
  const NothingHereCard = (
    <div className="mt-[10vh] h-[15vh] p-10  flex flex-col items-center justify-between ">
      <h1 className="text-sm sm:text-md md:text-lg font-bold text-gray-300  ">
        Drag the map and select a user to see their top tracks!
      </h1>
    </div>
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {topTracks ? (
          <motion.div
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            exit={{ x: "100vw" }}
            key={selectedUser?._id}
          >
            <currentlyPlayingContext.Provider
              value={{ currentlyPlaying, setCurrentlyPlaying }}
            >
              {MyCard}
            </currentlyPlayingContext.Provider>{" "}
          </motion.div>
        ) : (
          NothingHereCard
        )}{" "}
      </AnimatePresence>
    </>
  );
}
