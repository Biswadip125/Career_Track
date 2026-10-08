import dotenv from "dotenv";

dotenv.config();

const requiredEnv = (name) => {
  const value = process.env[name];

  if (!name) {
    throw new Error(`Missing required environment variable: ${value}`);
  }

  return value;
};

export const env = {
  port: process.env.PORT ?? 3000,
  mongoUrl: requiredEnv("MONGO_URL"),
  jwtSecret: requiredEnv("JWT_SECRET"),
};
