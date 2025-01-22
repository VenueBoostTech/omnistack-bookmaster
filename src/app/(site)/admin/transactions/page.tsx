// src/app/admin/transactions/page.tsx
import { Metadata } from "next";
import { TransactionsContent } from "@/components/admin/transactions/transactions-content"

export const metadata: Metadata = {
    title: "Transactions - BookMaster",
    description: "View and manage financial transactions across your business.",
};

export default function TransactionsPage() {
    return (
        <div className="px-3">
            <TransactionsContent />
        </div>
    )
}