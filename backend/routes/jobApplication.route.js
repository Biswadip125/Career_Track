import express from "express";
import {
  createApplication,
  deleteApplication,
  getApplicationById,
  getApplications,
  updateApplication,
} from "../controllers/jobApplication.controller.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", isLoggedIn, createApplication);
router.get("/", isLoggedIn, getApplications);
router.get("/:id", isLoggedIn, getApplicationById);
router.put("/:id", isLoggedIn, updateApplication);
router.delete("/:id", isLoggedIn, deleteApplication);

export default router;
