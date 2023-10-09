"use client";

import { Button } from "@nextui-org/react";

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
    <Button className="" color="primary" variant="flat" onClick={handleConnect}>
      Connect to spotify
    </Button>
  );
}
export default SpotifyButton;
