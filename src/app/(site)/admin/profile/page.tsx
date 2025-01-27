// src/app/admin/accounts/page.tsx
import { Metadata } from "next";
import { ProfileContent } from "@/components/admin/profile/profile-content"

export const metadata: Metadata = {
    title: "Profile - BookMaster",
    description: "Manage your user's profile.",
};

export default function ProfilePage() {
    return (
        <div className="px-3">
            <ProfileContent />
        </div>
    )
}