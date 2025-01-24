// src/app/admin/sync-center/page.tsx
import { Metadata } from "next";
import { SyncCenterContent } from "@/components/admin/sync-center/sync-center-content";

export const metadata: Metadata = {
   title: "Sync & Import Center - BookMaster",
   description: "Manage product imports, synchronization and data feeds",
};

export default function SyncCenterPage() {
   return (
       <div className="px-3">
           <SyncCenterContent />
       </div>
   )
}
