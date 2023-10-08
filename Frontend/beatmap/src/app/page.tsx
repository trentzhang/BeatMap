import SpotifyButton from "./Components/ConnectMusicButtons/SpotifyButton";
import Map from "./Components/Map";
import TopSongs from "./Components/SpotifyTrackCardsGroup/CardsGroup";
import client from "./MongoDB/Connect";

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
      .catch((e) => console.log("e :>> ", e))
      .finally(async () => {
        await client.close();
      });
    console.log("spotifyToken :>> ", spotifyToken);
  }
  return spotifyToken;
}

const Header = () => {
  return (
    <div className="z-50 max-w-5xl w-full items-center justify-between  text-sm lg:flex">
      <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit    ">
        Welcome to BeatMap
      </p>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className=" w-full   dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-2 md:flex md:items-center md:justify-evenly">
        <span className="text-sm text-gray-700 sm:text-center dark:text-gray-400">
          By Trent Zhang
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-700 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const currentSpotifyCode = searchParams?.code ?? "";
  const spotifyToken = await spotifyCode2Token(currentSpotifyCode);

  return (
    <main
      className="flex min-h-screen flex-col 
        items-center justify-normal   
        bg-gradient-to-tl from-slate-600 via-slate-300 to-neutral-300 
        background-animate "
    >
      <Header></Header>
      <div className="mt-16 mb-auto h-full w-full flex flex-col items-center justify-normal">
        <div className="relative h-[60vh]  w-full flex items-center justify-center">
          <Map></Map>
        </div>

        {spotifyToken ? (
          <TopSongs spotifyToken={spotifyToken}></TopSongs>
        ) : (
          <SpotifyButton></SpotifyButton>
        )}
      </div>

      <Footer></Footer>
    </main>
  );
}
