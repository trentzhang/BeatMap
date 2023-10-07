// const token = process.env.MY_SPOTIFY_TEST_TOKEN;

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

async function getTopTracks(spotifyToken: string) {
  return (
    await fetchWebApi(
      "v1/me/top/tracks?time_range=medium_term&limit=100",
      "GET",
      spotifyToken
    )
  ).items;
}

export default async function MusicComponent({
  spotifyToken,
}: {
  spotifyToken: string;
}) {
  const topTracks = await getTopTracks(spotifyToken);
  console.log("topTracks :>> ", topTracks?.[0]);
  return (
    <div className="text-5xl">
      {topTracks?.map(
        ({ name, artists }: { name: string; artists: [{ name: string }] }) =>
          `${name} by ${artists.map((artist) => artist.name).join(", ")}`
      )}
    </div>
  );
}
