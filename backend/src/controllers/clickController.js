import { Click } from "../models/Click.js";
import mongoose from "mongoose";

export async function trackClick(req, res, next) {
  try {
    const { experienceId, type, platform } = req.body;

    const click = await Click.create({
      experienceId,
      type,
      platform,
    });

    res.status(201).json({ success: true, data: click });
  } catch (err) {
    next(err);
  }
}

export async function getPlatformStats(req, res, next) {
  try {
    const stats = await Click.aggregate([
      {
        $group: {
          _id: "$platform",
          clicks: { $sum: 1 },
          lastClicked: { $max: "$clickedAt" },
        },
      },
      { $sort: { clicks: -1 } },
    ]);

    res.json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
}

export async function getExperienceStats(req, res, next) {
  try {
    const stats = await Click.aggregate([
      {
        $group: {
          _id: "$experienceId",
          clicks: { $sum: 1 },
        },
      },
      { $sort: { clicks: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "experiences",
          localField: "_id",
          foreignField: "_id",
          as: "experience",
        },
      },
      { $unwind: "$experience" },
      {
        $project: {
          _id: 0,
          experienceId: "$_id",
          title: "$experience.title",
          location: "$experience.location",
          clicks: 1,
        },
      },
    ]);

    res.json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
}

