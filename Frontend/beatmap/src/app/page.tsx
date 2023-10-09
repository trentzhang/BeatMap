import SpotifyButton from "./Components/ConnectMusicButtons/SpotifyButton";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import Map from "./Components/Map";
import TopSongs from "./Components/SpotifyTrackCardsGroup/CardsGroup";
import client from "./MongoDB/Connect";
import { spotifyCode2Token } from "./SpotifyAPIs/code2Token";
import { getProfile } from "./SpotifyAPIs/getProfile";
import { getTopTracks } from "./SpotifyAPIs/getTopTracks";

const LoadingPlaceholder = () => (
  <div className="h-[70vh] mt-6 w-fullflex items-center justify-center">
    <div className="border-t-4 border-blue-500 border-solid rounded-full animate-spin h-12 w-12"></div>
  </div>
);

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const currentSpotifyCode = searchParams?.code ?? "";
  const authorizationInfo = await spotifyCode2Token(currentSpotifyCode);
  const spotifyToken = authorizationInfo.access_token;

  const topTracks = await getTopTracks(spotifyToken);
  const profile = await getProfile(spotifyToken);

  // upload authorizationInfo, profile, topTracks to mongodb
  try {
    await client.connect();
    const db = client.db("BeatMap");
    const collection = db.collection("User");

    const filter = { "profile.id": profile.id };
    const data = {
      $set: {
        authorizationInfo: authorizationInfo,
        topTracks: topTracks,
        profile: profile,
      },
    };
    await collection.updateOne(filter, data, {
      upsert: true,
    });
    await client.close();
  } catch (error) {
    console.log("error :>> ", error);
  }

  return (
    <main
      className="flex min-h-screen flex-col 
        items-center justify-normal   
        bg-gradient-to-t from-slate-600 via-slate-300  
        background-animate "
    >
      <Header></Header>

      <div className="mt-16 mb-auto h-full w-full flex flex-col items-center justify-normal">
        <div className="relative h-[60vh]  w-full flex items-center justify-center">
          <Map></Map>
        </div>

        {spotifyToken ? (
          <TopSongs topTracks={topTracks}></TopSongs>
        ) : (
          <SpotifyButton></SpotifyButton>
        )}
      </div>

      <Footer></Footer>
    </main>
  );
}
