import client from "@/app/Utils/MongoDB/Connect";
import { NextRequest } from "next/server";

// get nearby user route, from MongoDB Atlas
export async function GET(request: NextRequest) {
  let users;
  try {
    const searchParams = request.nextUrl.searchParams;
    let southwest = searchParams.get("southwest");
    let northeast = searchParams.get("northeast");
    southwest = southwest ? JSON.parse(southwest) : null;
    northeast = northeast ? JSON.parse(northeast) : null;

    await client.connect();
    const db = client.db("BeatMap");
    const collection = db.collection("User");
    const query = {
      location: {
        $geoWithin: {
          $box: [southwest, northeast],
        },
      },
      topTracks: { $exists: true },
    };
    const select = { authorizationInfo: 0 };
    users = await collection.find(query).project(select).limit(10).toArray();
  } catch (error) {
    return new Response("Error!", {
      status: 500,
    });
  } finally {
    // Move the closing of the connection here
    await client.close();
  }

  return new Response(JSON.stringify(users), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
