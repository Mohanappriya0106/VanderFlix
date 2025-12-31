import { Click } from "../models/Click.js";

export async function trackClick(req, res, next) {
  try {
    const click = await Click.create(req.body);
    res.json({ success: true, data: click });
  } catch (err) {
    next(err);
  }
}

export async function getPlatformStats(req, res, next) {
  try {
    const stats = await Click.aggregate([
      { $group: { _id: "$platform", clicks: { $sum: 1 } } }
    ]);
    res.json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
}
