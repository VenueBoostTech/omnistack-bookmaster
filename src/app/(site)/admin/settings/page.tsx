// src/app/admin/settings/page.tsx
import { Metadata } from "next";
import { SettingsContent } from "@/components/admin/settings/settings-content"

export const metadata: Metadata = {
    title: "Settings - BookMaster",
    description: "Configure your BookMaster settings and preferences.",
};

export default function SettingsPage() {
    return (
        <div className="px-3">
            <SettingsContent />
        </div>
    )
}