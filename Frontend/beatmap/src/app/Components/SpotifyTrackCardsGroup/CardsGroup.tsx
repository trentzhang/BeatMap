"use client";
import { Card, CardBody } from "@nextui-org/react";
import { useUserContext } from "../SelectedUserContext";
import { SpotifyCard } from "./TrackCard";
import { AnimatePresence, motion } from "framer-motion";

export default function MusicComponent() {
  const { selectedUser, setSelectedUser } = useUserContext();
  const topTracks = selectedUser?.topTracks || null;
  const MyCard = (
    <motion.div
      initial={{ opacity: 0, y: "5%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "5%" }}
      transition={{ duration: 0.5 }}
      key={selectedUser?._id}
    >
      <Card className="mx-5 min-h-[40em] bg-gradient-to-b from-blue-600 to-slate-500">
        <CardBody>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-300  mb-5">
            Top 50 Songs
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {topTracks?.items?.map((topTrack) => (
              <SpotifyCard topTrack={topTrack} key={topTrack.id}></SpotifyCard>
            ))}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
  const NothingHereCard = (
    <Card className="mx-5 min-h-[20em]  bg-gradient-to-b from-blue-600 to-sky-600">
      <CardBody className="flex items-center justify-center">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-300  mb-5">
          Select a user to see their top tracks
        </h1>
      </CardBody>
    </Card>
  );

  return (
    <AnimatePresence mode="wait">
      {selectedUser ? MyCard : null}
    </AnimatePresence>
  );
}
