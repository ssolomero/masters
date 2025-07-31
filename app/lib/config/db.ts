import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
  console.log(process.env);
//   throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const URI = process.env.NEXT_PUBLIC_MONGODB_URI;
console.log(process.env);

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let clientPromise: Promise<MongoClient>;

// Add a type declaration for the custom property on global
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if(process.env.NODE_ENV !== 'production') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;