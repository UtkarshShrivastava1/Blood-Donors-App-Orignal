import mongoose from "mongoose";

const MONGODB_URI =
  process.env.NODE_ENV === "development"
    ? process.env.MONGO_LOCAL_URI
    : process.env.MONGO_ATLAS_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define MONGO_LOCAL_URI and/or MONGO_ATLAS_URI in your .env file"
  );
}

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

  try {
    cached.conn = await cached.promise;
    console.log(
      `✅ MongoDB connected (${
        process.env.NODE_ENV === "development" ? "dev" : "prod"
      })`
    );
    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    cached.promise = null;
    throw error;
  }
}

export default dbConnect;
