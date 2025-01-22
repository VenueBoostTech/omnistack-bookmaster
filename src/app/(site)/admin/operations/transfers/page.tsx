// src/app/admin/operations/transfers/page.tsx
import { Metadata } from "next";
import { TransfersContent } from "@/components/admin/operations/transfers";

export const metadata: Metadata = {
    title: "Transfer Operations - BookMaster",
    description: "Manage internal stock transfers between warehouses and locations.",
};

export default function TransfersPage() {
    return (
        <div className="px-3">
            <TransfersContent />
        </div>
    )
}