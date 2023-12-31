"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { currentlyPlayingContext } from "./CardsGroup";

const PlayButton = ({ preview_url }: { preview_url: string }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { currentlyPlaying, setCurrentlyPlaying } = useContext(
    currentlyPlayingContext
  );

  const audio = audioRef.current;
  useEffect(() => {
    if (isPlaying && currentlyPlaying !== preview_url) {
      audio?.pause();
      setIsPlaying(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentlyPlaying, preview_url]);

  const toggleAudio = () => {
    const audio = audioRef.current;

    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
        setCurrentlyPlaying(preview_url);
      }
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <button
      className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
      onClick={toggleAudio}
    >
      {isPlaying ? <StopIcon /> : <PlayIcon />}
      {/* TODO Bug when load too many times: :3000/?latitude=40.110719&longitude=-88.2125603:1 [Intervention] Blocked attempt to create a WebMediaPlayer as there are too many WebMediaPlayers already in existence. See crbug.com/1144736#c27*/}
      <audio ref={audioRef} src={preview_url} />
    </button>
  );
};

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    fill="currentColor"
    // className="bi bi-play-circle-fill"
    viewBox="0 0 16 16"
  >
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
  </svg>
);

const StopIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    fill="currentColor"
    // className="bi bi-stop-circle-fill"
    viewBox="0 0 16 16"
  >
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5h-3z" />
  </svg>
);

export default PlayButton;
