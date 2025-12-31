import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  category: { type: String, required: true, index: true },
  budgetRange: { type: String, required: true },
  bestSeason: { type: String, required: true, index: true },
  duration: { type: String, required: true, index: true },
  heroImage: { type: String, required: true },
  highlights: { type: [String], default: [] },
  tips: { type: [String], default: [] },
  affiliateLinks: [
    {
      type: { type: String, enum: ["Hotel", "Gear", "Transport", "Tour"], required: true },
      platform: { type: String, enum: ["Amazon", "Flipkart", "Booking", "Redbus", "Other"], required: true, index: true },
      url: { type: String, required: true }
    }
  ]
}, { timestamps: true });

// Text + filter indexes
experienceSchema.index({ title: "text", location: "text" });
experienceSchema.index({ category: 1, duration: 1, bestSeason: 1 });

export const Experience = mongoose.model("Experience", experienceSchema);
