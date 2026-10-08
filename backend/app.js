import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
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

export default app;
