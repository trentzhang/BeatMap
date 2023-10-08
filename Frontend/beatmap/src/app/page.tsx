import SpotifyButton from "./Components/ConnectMusicButtons/SpotifyButton";
import Map from "./Components/Map";
import TopSongs from "./Components/SpotifyTrackCardsGroup/CardsGroup";
import client from "./MongoDB/connect";

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL;

const LoadingPlaceholder = () => (
  <div className="h-[70vh] mt-6 w-fullflex items-center justify-center">
    <div className="border-t-4 border-blue-500 border-solid rounded-full animate-spin h-12 w-12"></div>
  </div>
);

function stringifyParams(queryParams: any): string {
  const stringParams = Object.entries(queryParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");

  return stringParams;
}

async function spotifyCode2Token(currentSpotifyCode: string) {
  //   var res: Record<string, string | number | boolean> = {};
  var spotifyToken = "";

  if (currentSpotifyCode) {
    const form = {
      code: currentSpotifyCode,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    };

    const encoded_client_info = btoa(`${client_id}:${client_secret}`);

    spotifyToken = await fetch(`https://accounts.spotify.com/api/token`, {
      method: "post",
      headers: {
        Authorization: `Basic ${encoded_client_info}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: stringifyParams(form),
    })
      .then((res) => res.json())
      .then(async (res) => {
        // upload all auth data to mongodb
        await client.connect();
        const db = client.db("BeatMap");
        const collection = db.collection("userAuthSpotify");

        const filter = { access_token: res.access_token };
        const data = { $set: res };
        const updateResult = await collection.updateOne(filter, data, {
          upsert: true,
        });
        // return access token
        return res.access_token;
      })
      .catch((e) => console.log("e :>> ", e));
    console.log("spotifyToken :>> ", spotifyToken);
  }
  return spotifyToken;
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  console.log("🌈🌈🌈", searchParams);
  //   const router = useRouter();
  const currentSpotifyCode = searchParams?.code ?? "";
  const spotifyToken = await spotifyCode2Token(currentSpotifyCode);
  console.log("spotifyToken :>> ", spotifyToken);
  return (
    <main className="flex min-h-screen flex-col items-center justify-normal py-14 mt-5">
      <div className="z-50 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed  left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit    ">
          Welcome to BeatMap
        </p>

        <div className="fixed bottom-4 left-1/3 flex h-12 w-1/3 rounded-full items-center justify-center bg-gradient-to-b from-white  dark:from-black dark:via-black  lg:bg-none">
          <div className="pointer-events-none flex place-items-center gap-2 pb-1 ">
            By Trent Zhang
          </div>
        </div>
      </div>

      <div className="relative h-[60vh]  w-full flex items-center justify-center p-8 ">
        <div
          className="absolute h-full w-full bg-gradient-to-r
    from-pink-400
    via-red-400
    to-yellow-400
    background-animate blur-sm"
        ></div>
        {/* <div className="absolute h-1/3 w-full bg-green  z-20"></div> */}
        <Map></Map>
      </div>

      {spotifyToken ? (
        <TopSongs spotifyToken={spotifyToken}></TopSongs>
      ) : (
        <SpotifyButton></SpotifyButton>
      )}
    </main>
  );
}
