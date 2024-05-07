import { Login } from "./login";
import { validateRequest } from "@/lib/auth/validate-request";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const { user } = await validateRequest();
  if (user) redirect("/dashboard");
  return <Login />;
}
