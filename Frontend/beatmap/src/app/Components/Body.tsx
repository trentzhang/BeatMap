"use client";
import Map from "./Map";
import { useSearchParams } from "next/navigation";
import TopSongs from "./SpotifyTrackCardsGroup/CardsGroup";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { UserProvider } from "./SelectedUserContext";
import { Header } from "./Header";
import { Footer } from "./Footer";
export default function Body({ currentUser = "" }) {
  return (
    <div
      className="flex min-h-screen flex-col 
        items-center justify-normal   
        bg-gradient-to-t from-slate-600 via-slate-300  
        background-animate "
    >
      <Header currentUser={currentUser}></Header>
      <UserProvider>
        <section className="mb-auto h-full w-full flex flex-col items-center justify-center">
          <motion.div
            className="relative h-[50vh] w-full flex items-center justify-center"
            id="homepage-map"
          >
            <Map></Map>
          </motion.div>

          <section>
            <motion.div className="w-full h-full" id="homepage-my-songs">
              <TopSongs></TopSongs>
            </motion.div>
          </section>
        </section>
      </UserProvider>
      <Footer></Footer>
    </div>
  );
}
