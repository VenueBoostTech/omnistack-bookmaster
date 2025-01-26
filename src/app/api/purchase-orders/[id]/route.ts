// app/api/purchase-orders/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
 request: Request,
 { params }: { params: { id: string } }
) {
 try {
   const order = await prisma.purchaseOrder.findUnique({
     where: { id: params.id },
     include: {
       vendor: true,
       items: true
     }
   });

   if (!order) {
     return NextResponse.json({ error: 'Purchase order not found' }, { status: 404 });
   }

   return NextResponse.json(order);
 } catch (error) {
   return NextResponse.json({ error: 'Failed to fetch purchase order' }, { status: 500 });
 }
}

export async function PUT(
 request: Request,
 { params }: { params: { id: string } }
) {
 try {
   const body = await request.json();
   
   const order = await prisma.purchaseOrder.update({
     where: { id: params.id },
     data: {
       status: body.status,
       priority: body.priority,
       expectedDelivery: body.expectedDelivery ? new Date(body.expectedDelivery) : undefined,
       paymentStatus: body.paymentStatus,
       notes: body.notes,
       items: body.items ? {
         deleteMany: {},
         create: body.items.map((item: any) => ({
           productId: item.productId,
           quantity: item.quantity,
           unitPrice: item.unitPrice,
           totalPrice: item.quantity * item.unitPrice,
           notes: item.notes
         }))
       } : undefined,
       totalValue: body.items?.reduce((sum: number, item: any) => 
         sum + (item.quantity * item.unitPrice), 0)
     }
   });

   return NextResponse.json(order);
 } catch (error) {
   return NextResponse.json({ error: 'Failed to update purchase order' }, { status: 500 });
 }
}

export async function DELETE(
 request: Request,
 { params }: { params: { id: string } }
) {
 try {
   // Delete items first due to foreign key constraint
   await prisma.purchaseOrderItem.deleteMany({
     where: { purchaseOrderId: params.id }
   });

   await prisma.purchaseOrder.delete({
     where: { id: params.id }
   });

   return NextResponse.json({ success: true });
 } catch (error) {
   return NextResponse.json({ error: 'Failed to delete purchase order' }, { status: 500 });
 }
}