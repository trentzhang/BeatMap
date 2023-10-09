import { fetchWebApi } from "./connect";

export async function getProfile(spotifyToken: string) {
  return await fetchWebApi("v1/me", "GET", spotifyToken);
}
