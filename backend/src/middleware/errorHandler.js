import { logger } from "../utils/logger.js";

export function errorHandler(err, req, res, next) {
  logger.error(err.message, err);
  res.status(500).json({
    success: false,
    error: { code: "SERVER_ERROR", message: err.message || "Internal server error" }
  });
}
