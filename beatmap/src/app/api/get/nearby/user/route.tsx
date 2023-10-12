import client from "@/app/Utils/MongoDB/Connect";
import { NextRequest } from "next/server";

// get nearby user route, from MongoDB Atlas
export async function GET(request: NextRequest) {
  let userIDs;
  try {
    const searchParams = request.nextUrl.searchParams;
    let southwest = searchParams.get("southwest");
    let northeast = searchParams.get("northeast");
    southwest = southwest ? JSON.parse(southwest) : null;
    northeast = northeast ? JSON.parse(northeast) : null;

    await client.connect();
    const query = {
      location: {
        $geoWithin: {
          $box: [southwest, northeast],
        },
      },
    };
    const select = { _id: 1, location: 1 };

    userIDs = await client
      .db("BeatMap")
      .collection("User")
      .find(query)
      .project(select)
      .limit(10)
      .toArray();
  } catch (error) {
    return new Response("Error!", {
      status: 500,
    });
  } finally {
    // Move the closing of the connection here
    await client.close();
  }

  return new Response(JSON.stringify(userIDs), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
