// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token =
  "BQDfB9ouOOzsEvREg75gC3Xe005i-N8hYrrJV7ATJtvwqoeU0pIzxJM4k4KOpGXcdlbHUsZGfjEKh96MLgFDyv55qKLBXYqA4lBD8oahPDp8GvIHoFKxgAd8R236YUDF_HDZJ92BlCBCqb1U8ZIWQ1rFmq7bpOk7eGPL9TfSl2RiA6B3LvJGG6GL8drkmOyEHCGfRylref9KeJkBJHNEe2svlooo-Dr-IzyU0BtwZTiyaUltGuLiZMiEWYBljHdQR-U";
async function fetchWebApi(endpoint: string, method: string) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    // body: JSON.stringify(body),
  });
  return await res.json();
}

async function getTopTracks() {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (
    await fetchWebApi("v1/me/top/tracks?time_range=short_term&limit=100", "GET")
  ).items;
}
const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({ name, artists }: { name: string; artists: [{ name: string }] }) =>
      `${name} by ${artists.map((artist) => artist.name).join(", ")}`
  )
);

export default function test(params: any) {
  topTracks;
  return "Hello";
}
