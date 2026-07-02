import dotenv from "dotenv";

dotenv.config();

const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
  return value ?? "";
};

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 5000,

  DB_HOST:     process.env.DB_HOST     || "localhost",
  DB_PORT:     Number(process.env.DB_PORT) || 3306,
  DB_NAME:     process.env.DB_NAME     || "hemodon_db",
  DB_USER:     process.env.DB_USER     || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "",

  JWT_SECRET:          requireEnv("JWT_SECRET") || "dev_secret_change_me",
  JWT_EXPIRES_IN:      process.env.JWT_EXPIRES_IN || "7d",
};