import type { Metadata } from "next"
import { LoginForm } from "@/components/login-form"

export const metadata: Metadata = {
    title: "Login | BookMaster Admin Dashboard",
    description: "Login to BookMaster to access your admin dashboard",
}

export default function LoginPage() {
    return <LoginForm />
}