import mongoose from "mongoose";

// Choose URI based on environment
const MONGODB_URI =
  process.env.NODE_ENV === "development"
    ? process.env.MONGO_LOCAL_URI
    : process.env.MONGO_ATLAS_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGO_LOCAL_URI and/or MONGO_ATLAS_URI in the appropriate .env file"
  );
}

// Global caching to prevent multiple DB connections during hot reload in dev
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
