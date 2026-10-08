import mongoose from "mongoose";
import { env } from "./env.js";
export const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUrl);

    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed", err.message);
    process.exit(1);
  }
};
