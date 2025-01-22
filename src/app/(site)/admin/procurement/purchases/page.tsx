// src/app/admin/procurement/purchases/page.tsx
import { Metadata } from "next";
import { PurchasesContent } from "@/components/admin/procurement/purchases";

export const metadata: Metadata = {
   title: "Purchase Orders - BookMaster",
   description: "Manage purchase orders, supplier deliveries, and procurement operations.",
};

export default function PurchasesPage() {
   return (
       <div className="px-3">
           <PurchasesContent />
       </div>
   )
}