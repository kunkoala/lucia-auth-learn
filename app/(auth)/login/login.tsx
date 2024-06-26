"use client";

import Image from "next/image";
import Link from "next/link";
import { useFormState } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme-toggle";
import { APP_TITLE } from "@/lib/constants";
import { IconBrandGoogle } from "@tabler/icons-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { PasswordInput } from "@/components/password-input";
import { SubmitButton } from "@/components/submit-button";
import { login } from "@/lib/auth/actions";

export function Login() {
  const [state, formAction] = useFormState(login, null);

  return (
    <div className="w-full lg:grid min-h-[600px] lg:min-h-screen lg:grid-cols-2">
      <div className="absolute top-2 left-2">
        <ThemeToggle />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Link href="/">
              <p className="py-4 text-4xl font-extrabold z-20 bg-clip-text text-transparent bg-gradient-to-b from-primary to-neutral-500">
                {APP_TITLE}
              </p>
            </Link>
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>

          <form action={formAction} className="grid gap-4 p-4 md:p-2">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="nicole@example.com"
                autoComplete="email"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <PasswordInput
                name="password"
                placeholder="********"
                autoComplete="current-password"
                required
              />
            </div>

            {state?.fieldError ? (
              <ul className="list-disc space-y-1 rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
                {Object.values(state.fieldError).map((err) => (
                  <li className="ml-4 list-none" key={err}>
                    {err}
                  </li>
                ))}
              </ul>
            ) : state?.formError ? (
              <p className="rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
                {state?.formError}
              </p>
            ) : null}

            <SubmitButton type="submit" className="w-full">
              Login
            </SubmitButton>
          </form>
          <div className="flex items-center pt-2">
            <div className="flex-grow border-t-2"></div>
            <span className="text-muted-foreground mx-4 text-sm">
              or continue with
            </span>
            <div className="flex-grow border-t-2"></div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="w-full">
              <IconBrandGoogle />
            </Button>
            <Button variant="outline" className="w-full">
              <GitHubLogoIcon className="w-fit h-fit" />
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline hover:text-primary">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
