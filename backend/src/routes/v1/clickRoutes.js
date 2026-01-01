import { Router } from "express";
import { trackClick, getPlatformStats, getExperienceStats } from "../../controllers/clickController.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { clickTrackValidation } from "../../config/validation.js";

const router = Router();

router.post("/track", validateRequest(clickTrackValidation), trackClick);
router.get("/platform-stats", getPlatformStats);
router.get("/experience-stats", getExperienceStats);

export default router;
