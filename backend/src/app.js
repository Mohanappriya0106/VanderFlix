// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import morgan from "morgan";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";
// import { errorHandler } from "./middleware/errorHandler.js";
// import routes from "./routes/index.js";
// import { apiRateLimiter } from "./middleware/rateLimiter.js";
// import logger from "./config/logger.js";

// // import { apiRateLimiter } from "./middleware/rateLimiter.js";


// dotenv.config();
// connectDB();

// const app = express();

// // Global Middleware
// app.use(helmet());
// app.use(cors({ origin: "*" }));
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(apiRateLimiter);

// // API Routes
// app.use("/api/v1", routes);

// // 404 Handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     error: { code: "NOT_FOUND", message: "Route not found" }
//   });
// });

// // Centralized Error Middleware
// app.use(errorHandler);

// logger.info(`Server started on port ${process.env.PORT}`);


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// export default app;


import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import routes from "./routes/index.js";
import { apiRateLimiter } from "./middleware/rateLimiter.js";
import logger from "./config/logger.js";

dotenv.config();
connectDB();

const app = express();

// Enable proxy trust (needed for rate limits & real hosting)
app.set("trust proxy", 1);

// Global Middleware (correct order)
app.use(helmet());
app.use(cors({ origin: "*" })); // we tighten this later in production
app.use(express.json());
app.use(morgan("dev"));

// Apply rate limiting before routes
app.use(apiRateLimiter);

// API Routes
app.use("/api/v1", routes);

// 404 Handler (must be after routes)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: { code: "NOT_FOUND", message: "Route not found" }
  });
});

// Centralized Error Middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // Log only after successful boot
  logger.info({ event: "SERVER_BOOT", port: PORT, status: "started" });
});

export default app;
