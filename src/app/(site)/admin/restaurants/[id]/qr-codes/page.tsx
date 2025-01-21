// src/app/admin/restaurants/[id]/qr-codes/page.tsx
import { Metadata } from "next"
import { QRCodeContent } from "@/components/admin/restaurants/qr-codes/qr-content"
import { QRConfiguration } from "@/components/admin/restaurants/qr-codes/qr-configuration"

interface Props {
  params: { id?: string }
}

async function getRestaurant(id: string) {
  return {
    name: "Pizza Paradise",
    description: "Best pizza in town",
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const restaurantId = params?.id || "1"
  const restaurant = await getRestaurant(restaurantId)
  
  return {
    title: `QR Codes - ${restaurant.name} - SnapFood Admin`,
    description: `Generate and manage QR codes for ${restaurant.name}'s menu and services.`,
  }
}

export default function QRCodesPage({ params }: Props) {
  const restaurantId = params?.id || "1"
  return (
    <div className="space-y-8">
      {/* Configuration Section */}
      <QRConfiguration />
      
      {/* Your existing QR code content */}
      <QRCodeContent restaurantId={restaurantId} />
    </div>
  )
}