import client from "@/app/Utils/MongoDB/Connect";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

// get nearby user route, from MongoDB Atlas
export async function GET(request: NextRequest) {
  let userTopSongs;
  try {
    const searchParams = request.nextUrl.searchParams;
    let id = searchParams.get("id");
    if (id) {
      await client.connect();
      const db = client.db("BeatMap");
      const collection = db.collection("User");
      const query = {
        _id: new ObjectId(id),
      };
      const select = { _id: 1, topTracks: 1 };

      userTopSongs = await collection.find(query).project(select).toArray();
    } else {
      return new Response("Error, No id provided", {
        status: 400,
      });
    }
  } catch (error) {
    return new Response("Error!", {
      status: 500,
    });
  } finally {
    // Move the closing of the connection here
    await client.close();
  }

  return new Response(JSON.stringify(userTopSongs), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
