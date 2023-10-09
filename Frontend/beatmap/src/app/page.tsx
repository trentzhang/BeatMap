import { Collection } from "mongodb";
import SpotifyButton from "./Components/ConnectMusicButtons/SpotifyButton";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import Map from "./Components/Map";
import TopSongs from "./Components/SpotifyTrackCardsGroup/CardsGroup";
import client from "./Utils/MongoDB/Connect";
import { spotifyCode2Token } from "./Utils/SpotifyAPIs/code2Token";
import { getProfile } from "./Utils/SpotifyAPIs/getProfile";
import { getTopTracks } from "./Utils/SpotifyAPIs/getTopTracks";

async function post2MongoDB(
  authorizationInfo = {},
  topTracks = {},
  profile = { id: "" }
) {
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
  } catch (error) {
    console.log("error :>> ", error);
  } finally {
    await client.close();
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  let currentSpotifyCode = searchParams?.code ?? "";
  let topTracks = [];
  let currentUser = "";
  let profile = { display_name: "", id: "" };

  if (currentSpotifyCode) {
    const authorizationInfo = await spotifyCode2Token(currentSpotifyCode);
    const spotifyToken = authorizationInfo.access_token;
    // Use Promise.all to synchronize getTopTracks and getProfile
    [topTracks, profile] = await Promise.all([
      getTopTracks(spotifyToken),
      getProfile(spotifyToken),
    ]);

    currentUser = profile?.display_name;
    post2MongoDB(authorizationInfo, topTracks, profile);
  }

  return (
    <main
      className="flex min-h-screen flex-col 
        items-center justify-normal   
        bg-gradient-to-t from-slate-600 via-slate-300  
        background-animate "
    >
      <Header currentUser={currentUser}></Header>

      <section className="mb-auto h-full w-full flex flex-col items-center justify-normal">
        <section
          className="relative h-[60vh]  w-full flex items-center justify-center"
          id="homepage-map"
        >
          <Map></Map>
        </section>
        {/* TODO: add a welcome sentence  */}
        <section className="w-full h-full" id="homepage-my-songs">
          {currentSpotifyCode ? (
            <TopSongs topTracks={topTracks}></TopSongs>
          ) : null}
        </section>
      </section>

      <Footer></Footer>
    </main>
  );
}
