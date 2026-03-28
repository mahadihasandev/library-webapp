"use server";

import { signIn } from "@/nextauth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";

const getClientIp = async () => {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  const realIp = requestHeaders.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return realIp || "127.0.0.1";
};

export const signInWithCredentials = async (
  param: Pick<AuthCredentials, "email" | "password">,
  options?: { skipRateLimit?: boolean },
) => {
  const email = param.email.trim().toLowerCase();
  const { password } = param;

  if (options?.skipRateLimit) {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        return { success: false, error: "Wrong email or password" };
      }

      return { success: true };
    } catch {
      return { success: false, error: "Unable to sign in right now" };
    }
  }

  const ip = await getClientIp();
  let success = true;
  try {
    const { success: limitSuccess } = await ratelimit.limit(ip);
    success = limitSuccess;
  } catch (error) {
    console.error("Rate limit check failed:", error);
  }

  if (!success) return redirect("/toofast");
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      return { success: false, error: "Wrong email or password" };
    }
    return { success: true };
  } catch {
    return { success: false, error: "Unable to sign in right now" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, password, universityId, universityCard } = params;
  const email = params.email.trim().toLowerCase();

  const ip = await getClientIp();
  let success = true;
  try {
    const { success: limitSuccess } = await ratelimit.limit(ip);
    success = limitSuccess;
  } catch (error) {
    console.error("Rate limit check failed:", error);
  }

  if (!success) return redirect("/toofast");

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "Email is already registered" };
  }

  const hashPassword = await hash(password, 10);
  try {
    await db.insert(users).values({
      fullName,
      email,
      password: hashPassword,
      universityId,
      universityCard,
    });
    const signInResult = await signInWithCredentials(
      { email, password },
      { skipRateLimit: true },
    );

    if (!signInResult.success) {
      return signInResult;
    }

    return { success: true };
  } catch {
    return { success: false, error: "Unable to create account right now" };
  }
};
