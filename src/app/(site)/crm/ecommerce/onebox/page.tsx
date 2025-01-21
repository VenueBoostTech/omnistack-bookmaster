// src/app/crm/ecommerce/onebox/page.tsx
import { Metadata } from "next"
import { OneBox } from "@/components/crm/communication/onebox"

export const metadata: Metadata = {
    title: "OneBox - BookMaster",
    description: "Unified communication hub for staff and customer interactions",
}

export default function OneBoxPage() {
    return (
        <div className="px-3">
            <OneBox />
        </div>
    )
}