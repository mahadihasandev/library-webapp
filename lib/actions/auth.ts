"use server";

import { signIn } from "@/nextauth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";

export const signInWithCredentials = async (
  param: Pick<AuthCredentials, "email" | "password">,
) => {
  const { email, password } = param;
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
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
      return { success: false, error: result.error };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: `Signup Error ${error}` };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password, universityId, universityCard } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
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
    return { success: false, error: "user already exist" };
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
    await signInWithCredentials({ email, password });
    return { success: true };
  } catch (error) {
    return { success: false, error: `Wrong username or Password ${error}` };
  }
};
