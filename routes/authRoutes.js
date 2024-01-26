import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { validateLoginInput, validateRegisterInput } from "../middlewares/validationMiddleware.js";

const router = Router();

router.post("/login", validateLoginInput, login);
router.post("/register", validateRegisterInput, register);

export default router;
