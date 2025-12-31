import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import routes from "./routes/index.js";

dotenv.config();
connectDB();

const app = express();

// Global Middleware
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));

// API Routes
app.use("/api/v1", routes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: { code: "NOT_FOUND", message: "Route not found" }
  });
});

// Centralized Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
