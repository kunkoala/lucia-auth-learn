import { validateRequest } from "@/lib/auth/validate-request";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  return <h1>Hi!, {user.email}!</h1>;
}
