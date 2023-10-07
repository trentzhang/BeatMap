"use client";
// import { useEffect } from "react";

export function stringifyParams(queryParams: any): string {
  const stringParams = Object.entries(queryParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");

  return stringParams;
}

function SpotifyButton(params: any) {
  const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const redirect_uri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL;
  const scope = "user-top-read user-read-recently-played";

  function handleConnect(params: any) {
    const queryParams = {
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
    };
    const stringParams = stringifyParams(queryParams);
    const authUrl = `https://accounts.spotify.com/authorize?${stringParams}`;

    window.location.href = authUrl;
  }
  return (
    <div>
      <button
        type="button"
        className="my-5 text-gray-900 bg-[#1DB954] hover:bg-[#1DB954]/90 focus:ring-4 focus:outline-none focus:ring-[#1DB954]/50  rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1DB954]/50 mr-2 mb-2"
        onClick={handleConnect}
      >
        Connect to spotify
      </button>
    </div>
  );
}
export default SpotifyButton;
