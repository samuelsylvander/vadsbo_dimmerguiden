import { MongoClient } from "mongodb";

//uri = mongodb+srv://samuel:Zm4Ch6EdfKxlp3YL@samuel.5dn7l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

//mongo connection string: mongo "mongodb+srv://samuel.5dn7l.mongodb.net/myFirstDatabase" --apiVersion 1 --username samuel
//pwd Zm4Ch6EdfKxlp3YL

const MONGODB_URI = "mongodb+srv://samuel:Zm4Ch6EdfKxlp3YL@samuel.5dn7l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// check the MongoDB URI
if (!MONGODB_URI) {
  throw new Error("Define the MONGODB_URI environmental variable");
}

let cachedClient= null;
let cachedDb = null;

export async function connectToDatabase() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // Connect to cluster
  let client = new MongoClient(MONGODB_URI);
  await client.connect();
  let db = client.db("vadsboDB");

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}