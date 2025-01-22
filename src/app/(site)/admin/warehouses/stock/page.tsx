// src/app/admin/warehouses/stock/page.tsx
import { Metadata } from "next";
import { StockLevelsContent } from "@/components/admin/warehouses/stock-levels"

export const metadata: Metadata = {
    title: "Stock Levels - BookMaster",
    description: "Monitor and manage inventory levels across all warehouse locations.",
};

export default function StockLevelsPage() {
    return (
        <div className="px-3">
            <StockLevelsContent />
        </div>
    )
}