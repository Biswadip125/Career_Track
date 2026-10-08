import express from "express";
import { getMe, login, register } from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", isLoggedIn, getMe);

export default router;
