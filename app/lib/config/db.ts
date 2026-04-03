import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

const URI = process.env.MONGODB_URI;

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let clientPromise: Promise<MongoClient>;
let mongoosePromise: Promise<typeof mongoose>;

// Add a type declaration for the custom property on global
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
  // eslint-disable-next-line no-var
  var _mongoosePromise: Promise<typeof mongoose> | undefined;
}

if(process.env.NODE_ENV !== 'production') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;

  if (!global._mongoosePromise) {
    global._mongoosePromise = mongoose.connect(URI, { bufferCommands: false, dbName: 'test' });
  }
  mongoosePromise = global._mongoosePromise;
} else {
  clientPromise = client.connect();
  mongoosePromise = mongoose.connect(URI, { bufferCommands: false, dbName: 'test' });
}

export default clientPromise;
export async function connectMongoose() {
  return mongoosePromise;
}