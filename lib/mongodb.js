import dns from "node:dns";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;
const MONGO_DNS_SERVERS = (process.env.MONGO_DNS_SERVERS || "8.8.8.8,1.1.1.1")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);

if (MONGO_DNS_SERVERS.length > 0) {
  try {
    dns.setServers(MONGO_DNS_SERVERS);
  } catch (err) {
    console.warn("[MongoDB] Could not set custom DNS servers:", err?.message);
  }
}

if (!MONGODB_URI) {
  throw new Error("Missing MONGO_URI environment variable");
}

let cached = globalThis.__mongoose;

if (!cached) {
  cached = globalThis.__mongoose = { conn: null, promise: null };
}

export default async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongooseInstance) => {
        return mongooseInstance;
      })
      .catch((err) => {
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}