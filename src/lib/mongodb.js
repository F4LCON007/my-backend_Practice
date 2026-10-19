import { MongoClient } from "mongodb";

let globalClientPromise;

export function getClientPromise() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is missing in .env.local");

  if (process.env.NODE_ENV === "development") {
    if (!globalClientPromise) {
      globalClientPromise = new MongoClient(uri).connect();
    }
    return globalClientPromise;
  }
  return new MongoClient(uri).connect();
}
