// src/app/admin/dashboard/page.tsx
import { Metadata } from "next";
import { DashboardContent } from "@/components/admin/dashboard/dashboard-content"

export const metadata: Metadata = {
    title: "Dashboard - BookMaster",
    description: "Financial dashboard for managing inventory, accounting, and business analytics.",
};

export default function DashboardPage() {
    return (
        <div className="px-3">
            <DashboardContent />
        </div>
    )
}