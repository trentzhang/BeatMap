"use client";
import Map from "./Map";
import { useSearchParams } from "next/navigation";
import TopSongs from "./SpotifyTrackCardsGroup/CardsGroup";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { UserProvider } from "./SelectedUserContext";
import { Header } from "./Header";
import { Footer } from "./Footer";
export default function Body({
  currentUser,
}: {
  currentUser: Pick<MongoDBUserData, "profile" | "topTracks">;
}) {
  let currentUserInTestUsers = true;
  if (
    currentUser.topTracks?.error &&
    (currentUser.topTracks.error.status == 403 ||
      currentUser.profile.error.status == 403)
  ) {
    currentUserInTestUsers = false;
  }
  return (
    <div
      className="flex h-screen flex-col 
        items-center justify-normal   
        bg-gradient-to-t from-slate-600 via-slate-300  background-animate 
        no-scrollbar "
    >
      <Header currentUser={currentUser.profile?.display_name}></Header>
      <UserProvider>
        {/* <section className="mb-auto h-full w-full flex flex-col items-center justify-center"> */}
        <motion.div
          className="relative h-[40vh] md:h-[50vh] w-full flex items-center justify-center"
          id="homepage-map"
        >
          <Map></Map>
        </motion.div>

        {currentUserInTestUsers ? (
          <section className="fixed top-[40vh]  md:top-[50vh]">
            <motion.div id="homepage-my-songs">
              <TopSongs
                loggedInUserTopTracks={currentUser.topTracks}
              ></TopSongs>
            </motion.div>
          </section>
        ) : (
          "You're not a test user, contact the developer to be added to the test users."
        )}
        {/* </section> */}
      </UserProvider>
      <Footer></Footer>
    </div>
  );
}
