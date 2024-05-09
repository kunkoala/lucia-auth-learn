"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useFormState } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APP_TITLE } from "@/lib/constants";
import { IconBrandGoogle } from "@tabler/icons-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { PasswordInput } from "@/components/password-input";
import { signup } from "@/lib/auth/actions";
import { SubmitButton } from "@/components/submit-button";

export function SignUp() {
  const [state, formData] = useFormState(signup, null);

  return (
    <div className="w-full lg:grid min-h-[600px] lg:min-h-screen lg:grid-cols-2">
      <div className="absolute top-2 left-2">
        <ThemeToggle />
      </div>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Link href="/">
              <p className="py-4 text-4xl font-extrabold z-20 bg-clip-text text-transparent bg-gradient-to-b from-primary to-neutral-500">
                {APP_TITLE}
              </p>
            </Link>
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your information to create an account
            </p>
          </div>

          <form action={formData} className="grid gap-4 p-4 md:p-2">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input name="username" placeholder="azhar28" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                autoComplete="email"
                name="email"
                placeholder="nicole@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                name="password"
                autoComplete="current-password"
                placeholder="********"
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
              Sign Up
            </SubmitButton>
          </form>
          <div className="grid gap-4 p-4 md:p-2">
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
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline hover:text-primary">
              Login
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
