// src/app/admin/users/page.tsx
import { Metadata } from "next";
import { UsersContent } from "@/components/admin/users/users-content"

export const metadata: Metadata = {
    title: "Users - BookMaster",
    description: "Manage user accounts, roles, and permissions.",
};

export default function UsersPage() {
    return (
        <div className="px-3">
            <UsersContent />
        </div>
    )
}