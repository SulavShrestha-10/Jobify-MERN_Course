import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { validateRegisterInput } from "../middlewares/validationMiddleware.js";

const router = Router();

router.post("/login", login);
router.post("/register", validateRegisterInput, register);

export default router;
