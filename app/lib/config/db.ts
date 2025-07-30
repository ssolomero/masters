import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv';
import mongoose from "mongoose";

declare global {
  namespace globalThis {
    var _mongoClientPromise: Promise<MongoClient>
  }
}

dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const URI = process.env.MONGODB_URI;

let client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let clientPromise: Promise<MongoClient>;

async function getDB(dbName: string) {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName)
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

export async function getCollection(collectionName: string) {
  const db = await getDB('db');
  if (db) return db.collection(collectionName);
  return null
}

if(process.env.NODE_ENV !== 'production') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(URI);
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default clientPromise;