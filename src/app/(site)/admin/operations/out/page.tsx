// src/app/admin/operations/out/page.tsx
import { Metadata } from "next";
import { StockOutContent } from "@/components/admin/operations/stock-out";

export const metadata: Metadata = {
    title: "Stock Out Operations - BookMaster",
    description: "Manage outbound stock, dispatches, and delivery operations.",
};

export default function StockOutPage() {
    return (
        <div className="px-3">
            <StockOutContent />
        </div>
    )
}