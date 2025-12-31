import { Router } from "express";
import experienceRoutes from "./v1/experienceRoutes.js";
import clickRoutes from "./v1/clickRoutes.js";
import categoryRoutes from "./v1/categoryRoutes.js";
import authRoutes from "./v1/authRoutes.js";

const router = Router();

router.use("/experiences", experienceRoutes);
router.use("/clicks", clickRoutes);
router.use("/categories", categoryRoutes);
router.use("/auth", authRoutes);

export default router;
