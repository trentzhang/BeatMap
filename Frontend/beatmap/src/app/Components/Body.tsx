"use client";
import Map from "./Map";
import { useSearchParams } from "next/navigation";
import TopSongs from "./SpotifyTrackCardsGroup/CardsGroup";
import { motion } from "framer-motion";
import { useState } from "react";
import { UserProvider, useUserContext } from "./SelectedUserContext";
export default function Body() {
  const searchParams = useSearchParams();
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };
  const currentSpotifyCode = searchParams.get("Code");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <UserProvider>
      <section className="mb-auto h-full w-full flex flex-col items-center justify-normal">
        <section
          className="relative h-[60vh]  w-full flex items-center justify-center"
          id="homepage-map"
        >
          <Map></Map>
        </section>
        <div className="w-full  h-full ">
          <TopSongs></TopSongs>
        </div>
      </section>
    </UserProvider>
  );
}
