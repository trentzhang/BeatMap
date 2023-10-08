import client from "@/app/MongoDB/Connect";

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    const db = client.db("test");
    const collection = db.collection("test");
    const insertResult = await collection.insertMany([
      { a: 1 },
      { a: 2 },
      { a: 3 },
    ]);
    console.log("Inserted documents =>", insertResult);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export default function test(params: any) {
  run().catch(console.dir);
  return <div className="text-5xl">Hello</div>;
}
