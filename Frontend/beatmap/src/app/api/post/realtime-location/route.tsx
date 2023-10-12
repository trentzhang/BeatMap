import client from "@/app/Utils/MongoDB/Connect";
import { post2MongoDB } from "@/app/Utils/MongoDB/addUserData";

import { NextRequest } from "next/server";

// get nearby user route, from MongoDB Atlas
export async function POST(request: NextRequest) {
  try {
    const { profile, location } = await request.json();

    await post2MongoDB(null, null, profile, location);
  } catch (error) {
    return new Response("Error!", {
      status: 500,
    });
  } finally {
    // Move the closing of the connection here
    await client.close();
  }

  return new Response("Success!", {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
