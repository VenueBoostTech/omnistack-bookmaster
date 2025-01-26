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
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastWeek = new Date(today.setDate(today.getDate() - 7));
  const twoWeeksAgo = new Date(today.setDate(today.getDate() - 7));

  const [
    currentMonthOrders,
    lastMonthOrders,
    currentWeekPending,
    lastWeekPending,
    expectedArrivals,
    currentMonthValue,
    lastMonthValue
  ] = await Promise.all([
    prisma.purchaseOrder.count({
      where: { 
        clientId,
        date: { gte: thisMonth }
      }
    }),
    prisma.purchaseOrder.count({
      where: {
        clientId,
        date: {
          gte: lastMonth,
          lt: thisMonth
        }
      }
    }),
    prisma.purchaseOrder.count({
      where: {
        clientId,
        status: 'CONFIRMED',
        date: { gte: lastWeek }
      }
    }),
    prisma.purchaseOrder.count({
      where: {
        clientId,
        status: 'CONFIRMED',
        date: {
          gte: twoWeeksAgo,
          lt: lastWeek
        }
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
    }),
    prisma.purchaseOrder.aggregate({
      where: {
        clientId,
        date: {
          gte: lastMonth,
          lt: thisMonth
        }
      },
      _sum: { totalValue: true }
    })
  ]);

  const expectedArrivalsTrend = calculateTrend(
    expectedArrivals,
    await prisma.purchaseOrder.count({
      where: {
        clientId,
        status: 'IN_TRANSIT',
        expectedDelivery: { 
          gte: lastWeek,
          lt: today 
        }
      }
    })
  );

  // Calculate trends
  const ordersTrend = calculateTrend(currentMonthOrders, lastMonthOrders);
  const pendingTrend = calculateTrend(currentWeekPending, lastWeekPending);
  const valueTrend = calculateTrend(
    currentMonthValue._sum.totalValue || 0, 
    lastMonthValue._sum.totalValue || 0
  );

  return {
    totalOrders: {
      value: currentMonthOrders,
      change: Math.abs(ordersTrend.change),
      trend: ordersTrend.direction,
      period: "vs last month"
    },
    pendingOrders: {
      value: currentWeekPending,
      change: Math.abs(pendingTrend.change),
      trend: pendingTrend.direction,
      period: "vs last week"
    },
    expectedArrivals: {
      value: expectedArrivals,
      change: Math.abs(expectedArrivalsTrend.change),
      trend: expectedArrivalsTrend.direction,
      period: "vs last week"
    },
    purchaseValue: {
      value: currentMonthValue._sum.totalValue || 0,
      change: valueTrend.changePercent,
      trend: valueTrend.direction,
      period: "vs last month"
    }
  };
}

function calculateTrend(current: number, previous: number) {
  const change = current - previous;
  const changePercent = previous ? Math.round((change / previous) * 100) : 0;
  
  return {
    change,
    changePercent,
    direction: change >= 0 ? "up" : "down"
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