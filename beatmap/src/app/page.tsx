import Body from "./Components/Body";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { profileDefault, topTracksDefault } from "./Utils/DefaultVariables";
import { post2MongoDB } from "./Utils/MongoDB/addUserData";
import { spotifyCode2Token } from "./Utils/SpotifyAPIs/code2Token";
import { getProfile } from "./Utils/SpotifyAPIs/getProfile";
import { getTopTracks } from "./Utils/SpotifyAPIs/getTopTracks";

// export const dynamic = "force-dynamic";
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  let currentSpotifyCode = searchParams?.code ?? "";
  let latitude = searchParams?.latitude ?? "";
  let longitude = searchParams?.longitude ?? "";
  let location = {
    type: "Point",
    coordinates: [Number(longitude) ?? 0.0, Number(latitude) ?? 0.0],
  };

  let topTracks;
  let profile;

  if (currentSpotifyCode) {
    try {
      const authorizationInfo = await spotifyCode2Token(currentSpotifyCode);
      const spotifyToken = authorizationInfo.access_token;

      if (spotifyToken) {
        // Use Promise.all to synchronize getTopTracks and getProfile
        [topTracks, profile] = await Promise.all([
          getTopTracks(spotifyToken),
          getProfile(spotifyToken),
        ]);
        console.log("topTracks", topTracks);
        console.log("profile", profile);
        if (authorizationInfo && !topTracks.error && !profile.error) {
          post2MongoDB(authorizationInfo, topTracks, profile, location);
        } else {
          console.log(profile.display_name, "Did not upload", [
            authorizationInfo,
            profile,
          ]);
        }
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  }
  //   console.log("topTracks :>> ", topTracks.items[0]);

  return (
    <main>
      <Body currentUser={{ profile: profile, topTracks: topTracks }}></Body>
    </main>
  );
}
