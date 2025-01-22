// src/app/admin/procurement/returns/page.tsx
import { Metadata } from "next";
import { ReturnsContent } from "@/components/admin/procurement/returns";

export const metadata: Metadata = {
    title: "Supplier Returns - BookMaster",
    description: "Manage supplier returns, refunds, and return merchandise authorizations.",
};

export default function ReturnsPage() {
    return (
        <div className="px-3">
            <ReturnsContent />
        </div>
    )
}