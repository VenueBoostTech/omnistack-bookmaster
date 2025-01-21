// src/app/crm/ecommerce/loyalty/programs/page.tsx
import { Metadata } from "next"
import { LoyaltyProgramsContent } from "@/components/crm/loyalty/programs"

export const metadata: Metadata = {
    title: "Loyalty Programs - BookMaster",
    description: "Manage your loyalty program tiers and settings"
}

export default function LoyaltyProgramsPage() {
    return (
        <div className="px-3">
            <LoyaltyProgramsContent />
        </div>
    )
}