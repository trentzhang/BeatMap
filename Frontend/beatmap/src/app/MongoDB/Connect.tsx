import { MongoClient, ServerApiVersion } from "mongodb";

const password = process.env.MONGODB_PASSWORD || "No_default_password";

const encodedPassword = encodeURIComponent(password);

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${encodedPassword}@cluster0.zswfbn9.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
export default client;
