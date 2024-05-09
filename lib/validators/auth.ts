import { z } from "zod";

/**
 * Defines the signup schema for user authentication.
 */
export const signupSchema = z.object({
  username: z
    .string()
    .min(1, "Please provide a username.")
    .max(20, "Username too long. Maximum of 20 characters reached."),
  email: z.string().email("Please enter a valid email"),

  // TODO: Add a regex to check for strong passwords (uppercase, lowercase, number, special character)
  password: z
    .string()
    .min(8, "Please provide a password with a minimum of 8 letters.")
    .max(255, "Password is too long. Maximum of 32 characters required."),
});

/**
 * Type definition for the signup schema.
 */
export type SignupInput = z.infer<typeof signupSchema>;

/**
 * Defines the login schema for user authentication.
 */
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z
    .string()
    .min(8, "Password is too short. Minimum 8 characters required.")
    .max(255),
});

/**
 * Type definition for the login schema.
 */
export type LoginInput = z.infer<typeof loginSchema>;

/**
 * Defines the forgot password schema for user authentication.
 */
export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

/**
 * Type definition for the forgot password schema.
 */
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

/**
 * Defines the reset password schema for user authentication.
 */
export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Invalid token"),
  password: z.string().min(8, "Password is too short").max(255),
});

/**
 * Type definition for the reset password schema.
 */
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
