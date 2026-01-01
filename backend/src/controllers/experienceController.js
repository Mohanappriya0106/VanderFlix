import { Experience } from "../models/Experience.js";
import { fetchExperiences } from "../services/experienceService.js";
import mongoose from "mongoose";





export async function getExperiences(req, res, next) {
  try {
    const result = await fetchExperiences(req.query);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}


export async function getExperienceById(req, res, next) {
  try {
    // Validate ObjectId format first
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: { code: "VALIDATION_ERROR", message: "Invalid experience ID format" }
      });
    }

    // Only query DB after validation passes
    const exp = await Experience.findById(req.params.id);

    if (!exp) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Experience not found" },
      });
    }

    res.json({ success: true, data: exp });
  } catch (err) {
    next(err);
  }
}

