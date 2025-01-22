// src/app/admin/warehouses/page.tsx
import { Metadata } from "next";
import { WarehouseLocations } from "@/components/admin/warehouses/locations";

export const metadata: Metadata = {
    title: "Warehouse Locations - BookMaster",
    description: "Manage warehouse locations, monitor capacity, and track facility performance.",
};

export default function WarehousesPage() {
    return (
        <div className="px-3">
            <WarehouseLocations />
        </div>
    )
}