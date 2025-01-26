// app/api/purchase-orders/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status');
  const clientId = searchParams.get('clientId')!;

  try {
    const where = {
      clientId,
      ...(search && {
        OR: [
          { number: { contains: search, mode: 'insensitive' } },
          { vendor: { name: { contains: search, mode: 'insensitive' } } }
        ]
      }),
      ...(status && status !== 'all' && { status })
    };

    const [orders, total, metrics] = await Promise.all([
      prisma.purchaseOrder.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          vendor: true,
          items: true
        },
        orderBy: { date: 'desc' }
      }),
      prisma.purchaseOrder.count({ where }),
      getPurchaseMetrics(clientId)
    ]);

    return NextResponse.json({
      items: orders,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      metrics
    });

  } catch (error) {
    const updatedError = error instanceof Error ? error.message : 'Failed to fetch purchase orders';
    return NextResponse.json({ error: updatedError }, { status: 500 });
  }
}

export async function POST(request: Request) {
 try {
   const body = await request.json();
   const number = await generateOrderNumber(body.clientId);

   const order = await prisma.purchaseOrder.create({
     data: {
       number,
       clientId: body.clientId,
       vendorId: body.vendorId,
       date: new Date(body.date),
       expectedDelivery: body.expectedDelivery ? new Date(body.expectedDelivery) : null,
       status: body.status || 'DRAFT',
       priority: body.priority || 'NORMAL',
       notes: body.notes,
       items: {
         create: body.items.map((item: any) => ({
           productId: item.productId,
           quantity: item.quantity,
           unitPrice: item.unitPrice,
           totalPrice: item.quantity * item.unitPrice,
           notes: item.notes
         }))
       },
       totalValue: body.items.reduce((sum: number, item: any) => 
         sum + (item.quantity * item.unitPrice), 0)
     }
   });

   return NextResponse.json(order);
 } catch (error) {
  const updatedError = error instanceof Error ? error.message : 'Failed to create purchase order';
   return NextResponse.json({ error: updatedError }, { status: 500 });
 }
}

async function getPurchaseMetrics(clientId: string) {
 const today = new Date();
 const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
 const lastWeek = new Date(today.setDate(today.getDate() - 7));

 const [totalOrders, pendingOrders, expectedArrivals, purchaseValue] = await Promise.all([
   prisma.purchaseOrder.count({
     where: { 
       clientId,
       date: { gte: thisMonth }
     }
   }),
   prisma.purchaseOrder.count({
     where: {
       clientId,
       status: 'CONFIRMED'
     }
   }),
   prisma.purchaseOrder.count({
     where: {
       clientId,
       status: 'IN_TRANSIT',
       expectedDelivery: { gte: today }
     }
   }),
   prisma.purchaseOrder.aggregate({
     where: {
       clientId,
       date: { gte: thisMonth }
     },
     _sum: { totalValue: true }
   })
 ]);

 return {
   totalOrders,
   pendingOrders,
   expectedArrivals,
   purchaseValue: purchaseValue._sum.totalValue || 0
 };
}

async function generateOrderNumber(clientId: string) {
 const year = new Date().getFullYear();
 const count = await prisma.purchaseOrder.count({
   where: { 
     clientId,
     number: { startsWith: `PO-${year}` }
   }
 });
 return `PO-${year}-${(count + 1).toString().padStart(4, '0')}`;
}