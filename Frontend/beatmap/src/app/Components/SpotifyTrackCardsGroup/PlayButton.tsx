"use client";

import { useState } from "react";

const PlayButton = ({ preview_url }: { preview_url: string }) => {
  let audio = typeof Audio !== "undefined" ? new Audio(preview_url) : null;

  const start = () => {
    if (audio) {
      if (audio.paused === true) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  };
  return (
    <button
      className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
      onClick={start}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="currentColor"
        className="bi bi-play-circle-fill"
        viewBox="0 0 16 16"
      >
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
      </svg>
    </button>
  );
};
export default PlayButton;
