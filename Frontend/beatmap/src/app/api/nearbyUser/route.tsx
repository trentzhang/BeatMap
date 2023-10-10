import client from "@/app/Utils/MongoDB/Connect";
import { NextRequest } from "next/server";

// get nearby user route, from MongoDB Atlas
export async function GET(request: NextRequest) {
  let users;
  try {
    const searchParams = request.nextUrl.searchParams;
    const southwest = JSON.parse(searchParams.get("southwest"));
    const northeast = JSON.parse(searchParams.get("northeast"));

    await client.connect();
    const db = client.db("BeatMap");
    const collection = db.collection("User");
    const query = {
      location: {
        $geoWithin: {
          $box: [southwest, northeast],
        },
      },
    };
    users = await collection.find(query).limit(10).toArray();
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
