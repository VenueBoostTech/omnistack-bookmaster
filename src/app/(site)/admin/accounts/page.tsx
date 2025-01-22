// src/app/admin/accounts/page.tsx
import { Metadata } from "next";
import { AccountsContent } from "@/components/admin/accounts/accounts-content"

export const metadata: Metadata = {
    title: "Chart of Accounts - BookMaster",
    description: "Manage your company's chart of accounts and track financial balances.",
};

export default function AccountsPage() {
    return (
        <div className="px-3">
            <AccountsContent />
        </div>
    )
}