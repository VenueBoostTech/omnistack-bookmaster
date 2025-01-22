// src/app/admin/vendors/page.tsx
import { Metadata } from "next";
import { VendorsContent } from "@/components/admin/vendors/vendors-content";

export const metadata: Metadata = {
    title: "Vendors - BookMaster",
    description: "Manage suppliers, vendor relationships, and procurement operations.",
};

export default function VendorsPage() {
    return (
        <div className="px-3">
            <VendorsContent />
        </div>
    )
}