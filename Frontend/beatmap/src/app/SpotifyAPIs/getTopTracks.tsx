async function fetchWebApi(
  endpoint: string,
  method: string,
  token: any | string
) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
  });
  return await res.json();
}

export async function getTopTracks(spotifyToken: string) {
  return (
    await fetchWebApi(
      "v1/me/top/tracks?time_range=medium_term&limit=100",
      "GET",
      spotifyToken
    )
  ).items;
}
