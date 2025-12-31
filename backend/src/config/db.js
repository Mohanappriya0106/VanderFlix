import mongoose from "mongoose";
import { logger } from "../utils/logger.js";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("MongoDB Connected");
  } catch (err) {
    logger.error("MongoDB Connection Failed", err);
    process.exit(1);
  }
}
