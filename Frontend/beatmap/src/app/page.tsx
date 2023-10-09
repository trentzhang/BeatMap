import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import Map from "./Components/Map";

import TopSongs from "./Components/SpotifyTrackCardsGroup/CardsGroup";
import { profileDefault } from "./Utils/DefaultVariables";
import { post2MongoDB } from "./Utils/MongoDB/addUserData";
import { spotifyCode2Token } from "./Utils/SpotifyAPIs/code2Token";
import { getProfile } from "./Utils/SpotifyAPIs/getProfile";
import { getTopTracks } from "./Utils/SpotifyAPIs/getTopTracks";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  let currentSpotifyCode = searchParams?.code ?? "";

  let latitude = searchParams?.latitude ?? "";
  let longitude = searchParams?.longitude ?? "";
  let location = { latitude: latitude, longitude: longitude };

  let topTracks = [];
  let profile = profileDefault;

  if (currentSpotifyCode) {
    const authorizationInfo = await spotifyCode2Token(currentSpotifyCode);
    const spotifyToken = authorizationInfo.access_token;
    // Use Promise.all to synchronize getTopTracks and getProfile
    [topTracks, profile] = await Promise.all([
      getTopTracks(spotifyToken),
      getProfile(spotifyToken),
    ]);

    post2MongoDB(authorizationInfo, topTracks, profile, location);
  }

  return (
    <main
      className="flex min-h-screen flex-col 
        items-center justify-normal   
        bg-gradient-to-t from-slate-600 via-slate-300  
        background-animate "
    >
      <Header currentUser={profile.display_name}></Header>

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
