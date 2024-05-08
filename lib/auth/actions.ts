"use server";

import { cookies } from "next/headers";
import { lucia } from "@/lib/auth/auth";
import { Scrypt } from "lucia";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ActionResult {
  error: string;
}

export async function signup(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  const firstName = formData.get("first-name");
  if (
    typeof firstName !== "string" ||
    firstName.length < 1 ||
    firstName.length > 255
  ) {
    return {
      error: "Invalid first name",
    };
  }

  const lastName = formData.get("last-name");
  if (
    typeof lastName !== "string" ||
    lastName.length < 1 ||
    lastName.length > 255
  ) {
    return {
      error: "Invalid last name",
    };
  }

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
  const hashedPassword = await new Scrypt().hash(password);

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

export async function login(_: any, formData: FormData): Promise<ActionResult> {
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

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!existingUser) {
    return {
      error: "Incorrect Username or Password",
    };
  }

  const passwordMatch = await new Scrypt().verify(
    existingUser.password_hash,
    password
  );
  if (!passwordMatch) {
    return {
      error: "Incorrect Username or Password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/dashboard");
}
