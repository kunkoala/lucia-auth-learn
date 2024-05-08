import { SignUp } from "./signup";
import { validateRequest } from "@/lib/auth/validate-request";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign Up",
};

export default async function SignUpPage() {
  const { user } = await validateRequest();
  if (user) redirect("/dashboard");
  return <SignUp />;
}
