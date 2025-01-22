import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  // Get the current user with client info
  const user = await getCurrentUser();

  if (user) {
    // Check user role and client type
    const userRole = user.role;

    // Replicate middleware logic for redirection
    if (userRole === "ADMIN") {
      redirect("/admin/dashboard");
    } else {
      // If no user or redirection, render login page
      return null;
    }
  }
  else {
    // if no session redirect login
    redirect("/auth/login");
  }

  // If no user or redirection, render login page
  return null;
}