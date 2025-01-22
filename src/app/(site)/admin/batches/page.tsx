// src/app/admin/batches/page.tsx
import { Metadata } from "next";
import { BatchesContent } from "@/components/admin/batches/batches-content";

export const metadata: Metadata = {
    title: "Batch Management - BookMaster",
    description: "Track and manage product batches, expiry dates, and inventory levels.",
};

export default function BatchesPage() {
    return (
        <div className="px-3">
            <BatchesContent />
        </div>
    )
}