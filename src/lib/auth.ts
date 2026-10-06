import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({
  database: new Database("./sqlite.db"),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6, // কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড
  },
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});