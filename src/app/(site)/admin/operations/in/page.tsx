// src/app/admin/operations/in/page.tsx
import { Metadata } from "next";
import { StockInContent } from "@/components/admin/operations/stock-in";

export const metadata: Metadata = {
    title: "Stock In Operations - BookMaster",
    description: "Manage incoming stock, inventory receipts, and purchase orders.",
};

export default function StockInPage() {
    return (
        <div className="px-3">
            <StockInContent />
        </div>
    )
}