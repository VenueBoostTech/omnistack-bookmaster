// src/app/restaurant/layout.tsx
import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/auth"
import Header from '@/components/restaurant/header'
import Sidebar from '@/components/restaurant/sidebar'

export default async function RestaurantLayout({
                                                   children,
                                               }: {
    children: React.ReactNode
}) {
    const session = await getAuthSession()
    if (!session) {
        redirect("/auth/login")
    }

    // if (session.user.role !== "RESTAURANT") {
    //     redirect("/admin/dashboard")
    // }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-8 pt-16 ml-56">
                    {children}
                </main>
            </div>
        </div>
    )
}