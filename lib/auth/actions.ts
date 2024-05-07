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
}

interface ActionResult {
  error: string;
}
