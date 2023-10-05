"use client";
import SpotifyButton from "./Components/ConnectMusicButtons/SpotifyButton";
import Map from "./Components/Map";
const LoadingPlaceholder = () => (
  <div className="h-[70vh] mt-6 w-fullflex items-center justify-center">
    <div className="border-t-4 border-blue-500 border-solid rounded-full animate-spin h-12 w-12"></div>
  </div>
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-normal py-14">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit    lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Welcome to BeatMap
        </p>

        <div className="fixed bottom-0 left-0 flex h-12 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black  lg:bg-none">
          <div className="pointer-events-none flex place-items-center gap-2 p-8 ">
            By Trent Zhang
          </div>
        </div>
      </div>

      <div className="h-[70vh] mt-6 w-full">
        <Map></Map>
      </div>

      <SpotifyButton></SpotifyButton>
    </main>
  );
}
