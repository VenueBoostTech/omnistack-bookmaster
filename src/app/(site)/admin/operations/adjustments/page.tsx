// src/app/admin/operations/adjustments/page.tsx
import { Metadata } from "next";
import { AdjustmentsContent } from "@/components/admin/operations/adjustments";

export const metadata: Metadata = {
    title: "Stock Adjustments - BookMaster",
    description: "Manage inventory adjustments, corrections, and stock reconciliation.",
};

export default function AdjustmentsPage() {
    return (
        <div className="px-3">
            <AdjustmentsContent />
        </div>
    )
}