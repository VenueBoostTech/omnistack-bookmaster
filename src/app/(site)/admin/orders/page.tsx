// src/app/admin/orders/page.tsx
import { Metadata } from "next";
import { OrdersContent } from "@/components/admin/orders/orders-content";

export const metadata: Metadata = {
    title: "Order Management - BookMaster",
    description: "Manage and track customer orders and their statuses.",
};

export default function OrdersPage() {
    return (
        <div className="px-3">
            <OrdersContent />
        </div>
    )
}