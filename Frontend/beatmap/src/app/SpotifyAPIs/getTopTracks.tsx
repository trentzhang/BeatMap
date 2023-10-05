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

async function getTopTracks() {
  return (
    await fetchWebApi(
      "v1/me/top/tracks?time_range=short_term&limit=100",
      "GET",
      process.env.MY_SPOTIFY_TEST_TOKEN
    )
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
