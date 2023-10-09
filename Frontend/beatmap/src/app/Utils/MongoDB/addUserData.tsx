import client from "./Connect";

import { profileDefault } from "../DefaultVariables";

export async function post2MongoDB(
  authorizationInfo = {},
  topTracks = {},
  profile = profileDefault,
  location = {}
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
        location: location,
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
