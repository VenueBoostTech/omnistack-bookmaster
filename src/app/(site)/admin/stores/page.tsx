// src/app/admin/stores/page.tsx
import { Metadata } from "next";
import { StoresContent } from "@/components/admin/stores/stores-content";

export const metadata: Metadata = {
    title: "Stores - BookMaster",
    description: "Manage stores and their locations and track track performance.",
};

export default function StoresPage() {
    return (
        <div className="px-3">
            <StoresContent />
        </div>
    )
}