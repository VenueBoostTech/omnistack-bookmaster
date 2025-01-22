// src/app/admin/analytics/page.tsx
import { Metadata } from "next";
import { AnalyticsContent } from "@/components/admin/analytics/analytics-content"

export const metadata: Metadata = {
    title: "Analytics - BookMaster",
    description: "Financial analytics and performance metrics for your business.",
};

export default function AnalyticsPage() {
    return (
        <div className="px-3">
            <AnalyticsContent />
        </div>
    )
}