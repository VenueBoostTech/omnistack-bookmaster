// src/app/admin/products/categories/page.tsx
import { Metadata } from "next";
import { CategoriesContent } from "@/components/admin/products/categories-content";

export const metadata: Metadata = {
    title: "Product Categories - BookMaster",
    description: "Manage product categories, hierarchies, and classifications.",
};

export default function CategoriesPage() {
    return (
        <div className="px-3">
            <CategoriesContent />
        </div>
    )
}