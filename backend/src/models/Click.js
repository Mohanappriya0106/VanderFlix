import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
  experienceId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Experience", 
    required: true, 
    index: true 
  },
  type: { 
    type: String, 
    enum: ["Hotel", "Gear", "Transport", "Tour"], 
    required: true 
  },
  platform: { 
    type: String, 
    enum: ["Amazon", "Flipkart", "Booking", "Redbus", "Other"], 
    required: true,
    index: true
  }
}, { 
  timestamps: { createdAt: "clickedAt", updatedAt: false } 
});

export const Click = mongoose.model("Click", clickSchema);
