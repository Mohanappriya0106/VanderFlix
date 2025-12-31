import { Experience } from "../models/Experience.js";

export async function getExperiences(req, res, next) {
  try {
    const { page = 1, limit = 6, search = "", category, duration, bestSeason } = req.query;
    const query = search ? { $text: { $search: search } } : {};

    if (category) query.category = category;
    if (duration) query.duration = duration;
    if (bestSeason) query.bestSeason = bestSeason;

    const data = await Experience.find(query)
      .limit(limit)
      .skip((page - 1) * limit);

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function getExperienceById(req, res, next) {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.status(404).json({
      success: false,
      error: { code: "NOT_FOUND", message: "Experience not found" }
    });

    res.json({ success: true, data: exp });
  } catch (err) {
    next(err);
  }
}
