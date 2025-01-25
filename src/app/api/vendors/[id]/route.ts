import { NextResponse } from "next/server";

// app/api/vendors/[id]/route.ts
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
   ) {
    try {
      const vendor = await prisma.vendor.findUnique({
        where: { id: params.id },
        include: { account: true }
      });
   
      if (!vendor) {
        return NextResponse.json(
          { error: 'Vendor not found' },
          { status: 404 }
        );
      }
   
      return NextResponse.json(vendor);
    } catch (error) {
      return NextResponse.json(
        { error: error ?? 'Failed to fetch vendor' },
        { status: 500 }
      );
    }
   }