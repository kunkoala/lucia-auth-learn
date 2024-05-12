"use server";

import { cookies } from "next/headers";
import { lucia } from "@/lib/auth/index";
import { Scrypt } from "lucia";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize, type User } from "lucia";
import { generateRandomString, alphabet } from "oslo/crypto";
import { PrismaClient } from "@prisma/client";
import { signupSchema, loginSchema } from "@/lib/validators/auth";
import type { SignupInput, LoginInput } from "@/lib/validators/auth";
import { validateRequest } from "./validate-request";
import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";

const prisma = new PrismaClient();

interface ActionResult<T> {
  fieldError?: Partial<Record<keyof T, string | undefined>>;
  formError?: string;
}

export async function signup(
  _: any,
  formData: FormData
): Promise<ActionResult<SignupInput>> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = signupSchema.safeParse(obj);
  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      fieldError: {
        username: err.fieldErrors.username?.[0],
        email: err.fieldErrors.email?.[0],
        password: err.fieldErrors.password?.[0],
      },
    };
  }

  const { username, email, password } = parsed.data;

  // TODO: Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return {
      formError:
        "User already exists. Cannot create a new account with this email.",
    };
  }

  const userId = generateIdFromEntropySize(21);
  const hashedPassword = await new Scrypt().hash(password);

  await prisma.user.create({
    data: {
      id: userId,
      username: username,
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

  return redirect("/dashboard");
}

// action to use in form submission to login
export async function login(
  _: any,
  formData: FormData
): Promise<ActionResult<LoginInput>> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = loginSchema.safeParse(obj);
  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      fieldError: {
        email: err.fieldErrors.email?.[0],
        password: err.fieldErrors.password?.[0],
      },
    };
  }

  const { email, password } = parsed.data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!existingUser) {
    return {
      formError: "Incorrect email or Password",
    };
  }
  if (!existingUser || !existingUser?.password_hash) {
    return {
      formError: "Incorrect email or password",
    };
  }

  const passwordMatch = await new Scrypt().verify(
    existingUser.password_hash,
    password
  );
  if (!passwordMatch) {
    return {
      formError: "Incorrect Username or Password",
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

// action to use in form submission to logout
// invalidates the session and redirects to the home page
export async function logout(): Promise<{ error: string } | void> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "No session found",
    };
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}

async function generateEmailVerificationCode(
  userId: string,
  email: string
): Promise<string> {
  await prisma.emailVerification.deleteMany({
    where: {
      userId: userId,
    },
  });

  const code = generateRandomString(6, alphabet("0-9"));
  await prisma.emailVerification.create({
    data: {
      userId: userId,
      email: email,
      code: code,
      expiresAt: createDate(new TimeSpan(10, "m")),
    },
  });
  return code;
}

export async function verifyEmail(
  _: any,
  formData: FormData
): Promise<{ error: string } | void> {
  const code = formData.get("code");

  if (typeof code !== "string" || code.length !== 6) {
    return {
      error: "Invalid code",
    };
  }

  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  const verifyCode = await prisma.$transaction(async (prisma) => {
    const item = await prisma.emailVerification.findFirst({
      where: {
        userId: user.id,
      },
    });
    if (item) {
      await prisma.emailVerification.delete({
        where: {
          id: item.id,
        },
      });
    }

    return item;
  });

  if (!verifyCode || verifyCode.code !== code) {
    return {
      error: "Invalid verification code",
    };
  }

  if (!isWithinExpirationDate(verifyCode.expiresAt)) {
    return {
      error: "Verification code expired",
    };
  }

  if (verifyCode.email !== user.email) {
    return {
      error: "Email does not match",
    };
  }

  await lucia.invalidateUserSessions(user.id);
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: true,
    },
  });

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  redirect("/dashboard");
}

// TODO: Reset Password
// TODO: Finish Sending Email (low priority)
// TODO: Forgot Password