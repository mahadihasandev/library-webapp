import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import * as dotenv from "dotenv";
import path from "path";

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function testFailOpen() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  console.log("Testing Fail-Open Logic...");
  console.log("URL:", url);

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

  let success = true; // Default to true (allow access)
  try {
    console.log("Attempting rate limit check (expecting failure)...");
    const { success: limitSuccess } = await ratelimit.limit("test-ip");
    success = limitSuccess;
    console.log("Rate limit check succeeded (unexpected if URL is bad).");
  } catch (error) {
    console.log("Caught expected error:", error.message);
    console.log("Swallowing error and proceeding...");
  }

  if (success) {
    console.log(
      "SUCCESS: Fail-open logic worked. User would be allowed to sign in.",
    );
  } else {
    console.error("FAILURE: Success flag was false.");
  }
}

testFailOpen();
