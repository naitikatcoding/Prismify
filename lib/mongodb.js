import dns from "node:dns";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;
const MONGO_DNS_SERVERS = (process.env.MONGO_DNS_SERVERS || "1.1.1.1,8.8.8.8")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);

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
    if (MONGODB_URI.startsWith("mongodb+srv://") && MONGO_DNS_SERVERS.length > 0) {
      dns.setServers(MONGO_DNS_SERVERS);
    }

    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}