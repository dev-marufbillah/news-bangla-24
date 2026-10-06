import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import path from "path";

// Vercel প্রোডাকশনে /tmp ফোল্ডার ব্যবহার হবে, আর লোকাল কম্পিউটারে ./sqlite.db
const dbPath = process.env.NODE_ENV === "production" 
  ? path.join("/tmp", "sqlite.db") 
  : "./sqlite.db";

export const auth = betterAuth({
  database: new Database(dbPath),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  baseURL: process.env.BETTER_AUTH_URL,
});