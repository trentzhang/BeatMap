import { fetchWebApi } from "./connect";
export async function getTopTracks(spotifyToken: string) {
  return await fetchWebApi(
    "v1/me/top/tracks?time_range=medium_term&limit=50",
    "GET",
    spotifyToken
  );
}
