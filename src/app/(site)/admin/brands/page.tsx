// src/app/admin/brands/page.tsx
import { Metadata } from "next";
import { BrandsContent } from "@/components/admin/brands/brands-content";

export const metadata: Metadata = {
    title: "Brand Management - BookMaster",
    description: "Manage and track vendor brands, configurations, and performance.",
};

export default function BrandsPage() {
    return (
        <div className="px-3">
            <BrandsContent />
        </div>
    )
}