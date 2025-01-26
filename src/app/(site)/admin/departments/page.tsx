// src/app/admin/users/page.tsx
import { Metadata } from "next";
import { DepartmentsContent } from "@/components/admin/departments/departments-content"

export const metadata: Metadata = {
    title: "Departments - BookMaster",
    description: "Manage departments of the company.",
};

export default function DepartmentsPage() {
    return (
        <div className="px-3">
            <DepartmentsContent />
        </div>
    )
}