import { Category } from "../models/Category.js";

export async function getCategories(req, res, next) {
  try {
    const cats = await Category.find();
    res.json({ success: true, data: cats });
  } catch (err) {
    next(err);
  }
}
