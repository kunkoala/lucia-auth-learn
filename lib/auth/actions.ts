"use server";

import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function signup(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  const email = formData.get("email");
  if (typeof email !== "string" || email.length < 6 || email.length > 255) {
    return {
      error: "Invalid email",
    };
  }

  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  // TODO: Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return {
      error: "User already exists",
    };
  }

  const userId = generateIdFromEntropySize(21);
  const hashedPassword = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  await prisma.user.create({
    data: {
      id: userId,
      email: email,
      password_hash: hashedPassword,
    },
  });

  // TODO: Verification email

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/");
}

interface ActionResult {
  error: string;
}
