import client from "./Connect";

export async function post2MongoDB(
  authorizationInfo: any = null,
  topTracks: TopTracks | null = null,
  profile: SpotifyProfile,
  location: any = null
) {
  // upload authorizationInfo, profile, topTracks to mongodb
  try {
    await client.connect();
    const db = client.db("BeatMap");
    const collection = db.collection("User");

    const filter = { "profile.id": profile?.id };

    // Check if there's existing location data
    const existingData = await collection.findOne(filter);
    const existingLocation = existingData?.location;

    let shouldUpdateLocation = false;
    if (location) {
      if (existingLocation) {
        if (location.coordinates.some((coord: number) => coord !== 0)) {
          shouldUpdateLocation = true;
        }
      } else {
        shouldUpdateLocation = true;
      }
    }
    // Check if both coordinates are not zero
    // const shouldUpdateLocation =

    // console.log(
    //   "shouldUpdateLocation",
    //   shouldUpdateLocation,
    //   existingLocation,
    //   location
    // );
    // Construct the data object with or without the location
    const data = {
      $set: {
        ...(shouldUpdateLocation && {
          location: location,
        }),
        ...(authorizationInfo && { authorizationInfo: authorizationInfo }),
        ...(topTracks && { topTracks: topTracks }),
        ...(profile && { profile: profile }),
        ...(Boolean(
          shouldUpdateLocation || authorizationInfo || topTracks || profile
        ) && {
          updatedAt: new Date().toLocaleString("en-US", {
            timeZone: "America/Chicago",
          }),
        }),
      },
    };

    await collection.updateOne(filter, data, {
      upsert: true,
    });
    console.log(
      profile.display_name,
      `Successfully updated ${Object.keys(data.$set)} data to MongoDB`
    );
  } catch (error) {
    console.log("error :>> ", error);
  } finally {
    await client.close();
  }
}
