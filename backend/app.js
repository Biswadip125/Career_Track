import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import jobApplicationRouter from "./routes/jobApplication.route.js";
const app = express();

app.use(
  cors({
    origin: "https://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "CareerTrack API is running",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/applications", jobApplicationRouter);

export default app;
