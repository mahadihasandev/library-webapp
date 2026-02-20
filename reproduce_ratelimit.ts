import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import * as dotenv from "dotenv";
import path from "path";

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function testRateLimit() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  console.log("URL:", url);
  // Don't log the full token for security, just the first few chars
  console.log("Token:", token?.substring(0, 5) + "...");

  if (!url || !token) {
    console.error("Missing Upstash credentials");
    return;
  }

  const redis = new Redis({
    url: url,
    token: token,
  });

  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(5, "1m"),
    analytics: true,
    prefix: "@upstash/ratelimit/test",
  });

  console.log("Testing rate limit...");
  try {
    const start = Date.now();
    const result = await ratelimit.limit("test-ip");
    console.log("Rate limit result:", result);
    console.log("Time taken:", Date.now() - start, "ms");
  } catch (error) {
    console.error("Rate limit failed:", error);
  }
}

testRateLimit();
