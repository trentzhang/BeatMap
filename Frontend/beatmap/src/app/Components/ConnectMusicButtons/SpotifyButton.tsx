"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export function stringifyParams(queryParams: any): string {
  const stringParams = Object.entries(queryParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");

  return stringParams;
}

function SpotifyButton() {
  const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const redirect_uri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL;
  const scope = "user-top-read user-read-recently-played";
  const router = useRouter();

  function handleConnect() {
    const queryParams = {
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
    };
    const stringParams = stringifyParams(queryParams);
    const authUrl = `https://accounts.spotify.com/authorize?${stringParams}`;

    router.push(authUrl);
  }

  return (
    <Button className="" color="primary" variant="flat" onClick={handleConnect}>
      Connect to Spotify
    </Button>
  );
}

export default SpotifyButton;
