import { Experience } from "../models/Experience.js";
import { Click } from "../models/Click.js";

export async function fetchExperiences(queryParams) {
  const {
    page = 1,
    limit = 6,
    search = "",
    category,
    duration,
    bestSeason,
    sort = "newest",
  } = queryParams;

  const skip = (page - 1) * limit;
  const filters = {};

  if (search) {
    filters.$text = { $search: search };
  }
  if (category) filters.category = category;
  if (duration) filters.duration = duration;
  if (bestSeason) filters.bestSeason = bestSeason;

  // Popularity sort requires click aggregation
  if (sort === "popular") {
    const items = await Click.aggregate([
      { $group: { _id: "$experienceId", clicks: { $sum: 1 } } },
      { $sort: { clicks: -1 } },
      { $skip: skip },
      { $limit: Number(limit) },
      {
        $lookup: {
          from: "experiences",
          localField: "_id",
          foreignField: "_id",
          as: "experience",
        },
      },
      { $unwind: "$experience" },
      { $replaceRoot: { newRoot: "$experience" } },
    ]);

    const totalItems = await Click.aggregate([
      { $group: { _id: "$experienceId" } },
      { $count: "count" },
    ]);
    const count = totalItems[0]?.count || 0;

    return {
      items,
      page: Number(page),
      limit: Number(limit),
      totalItems: count,
      totalPages: Math.ceil(count / limit),
    };
  }

  // Other sorts use Experience collection directly
  const items = await Experience.find(filters)
    .sort(sort === "newest" ? { createdAt: -1 } : {})
    .skip(skip)
    .limit(Number(limit));

  const count = await Experience.countDocuments(filters);

  return {
    items,
    page: Number(page),
    limit: Number(limit),
    totalItems: count,
    totalPages: Math.ceil(count / limit),
  };
}
