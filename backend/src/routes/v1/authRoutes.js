import { Router } from "express";
import { login } from "../../controllers/authController.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { loginValidation } from "../../config/validation.js";

const router = Router();
router.post("/login", validateRequest(loginValidation), login);

export default router;
