// src/app/admin/products/page.tsx
import { Metadata } from "next";
import { ProductsContent } from "@/components/admin/products/products-content";

export const metadata: Metadata = {
    title: "Products - BookMaster",
    description: "Manage your product catalog, inventory levels, and pricing.",
};

export default function ProductsPage() {
    return (
        <div className="px-3">
            <ProductsContent />
        </div>
    )
}