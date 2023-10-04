// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = process.env.MY_SPOTIFY_TEST_TOKEN;
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

export default function test(params: any) {
  console.log(
    topTracks?.map(
      ({ name, artists }: { name: string; artists: [{ name: string }] }) =>
        `${name} by ${artists.map((artist) => artist.name).join(", ")}`
    )
  );
  console.log("process.env :>> ", process.env.REACT_APP_API_URL);
  return <div className="text-5xl">Hello</div>;
}
