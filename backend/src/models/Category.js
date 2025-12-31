import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true, index: true }
}, { timestamps: true });

export const Category = mongoose.model("Category", categorySchema);
