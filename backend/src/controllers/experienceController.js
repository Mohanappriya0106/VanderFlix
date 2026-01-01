import { Experience } from "../models/Experience.js";
import { fetchExperiences } from "../services/experienceService.js";




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

