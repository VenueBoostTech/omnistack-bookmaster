// app/api/vendors/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { endOfMonth, startOfMonth, subMonths } from 'date-fns';
import { generateVendorCode } from '@/lib/utils';
  
export async function GET(request: Request) {
 const { searchParams } = new URL(request.url);
 const page = Number(searchParams.get('page')) || 1;
 const pageSize = Number(searchParams.get('pageSize')) || 10;
 const search = searchParams.get('search') || '';
 const type = searchParams.get('type');
 const status = searchParams.get('status');
 const clientId = searchParams.get('clientId')!;

 try {
   const where = {
     clientId,
     ...(search && {
       OR: [
         { name: { contains: search, mode: 'insensitive' } },
         { code: { contains: search, mode: 'insensitive' } },
         { email: { contains: search, mode: 'insensitive' } }
       ]
     }),
     ...(type && type !== 'all' && { type }),
     ...(status && status !== 'all' && { status })
   };

   const [vendors, total, metrics] = await Promise.all([
     prisma.vendor.findMany({
       where,
       skip: (page - 1) * pageSize,
       take: pageSize,
       include: {
         account: true
       }
     }),
     prisma.vendor.count({ where }),
     getVendorMetrics(clientId)
   ]);

   return NextResponse.json({
     items: vendors,
     total,
     page,
     pageSize,
     totalPages: Math.ceil(total / pageSize),
     metrics
   });
 } catch (error) {
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Internal server error'
    }, { 
      status: 500 
    });
 }
}

async function getVendorMetrics(clientId: string) {
    const now = new Date();
    const currentMonth = {
      start: startOfMonth(now),
      end: endOfMonth(now)
    };
    const lastMonth = {
      start: startOfMonth(subMonths(now, 1)),
      end: endOfMonth(subMonths(now, 1))
    };
   
    const [
      activeVendors,
      lastMonthActiveVendors,
      currentMonthOrders,
      lastMonthOrders,
      pendingPayments,
      lastMonthPayments,
      leadTimes
    ] = await Promise.all([
      // Active vendors this month
      prisma.vendor.count({
        where: { 
          clientId, 
          status: 'ACTIVE',
          createdAt: { lte: currentMonth.end }
        }
      }),
      // Active vendors last month
      prisma.vendor.count({
        where: { 
          clientId, 
          status: 'ACTIVE',
          createdAt: { lte: lastMonth.end }
        }
      }),
      // Orders this month
      prisma.transaction.count({
        where: {
          clientId,
          type: 'PURCHASE',
          createdAt: {
            gte: currentMonth.start,
            lte: currentMonth.end
          }
        }
      }),
      // Orders last month  
      prisma.transaction.count({
        where: {
          clientId,
          type: 'PURCHASE',
          createdAt: {
            gte: lastMonth.start,
            lte: lastMonth.end
          }
        }
      }),
      // Current pending payments
      prisma.vendor.aggregate({
        where: {
          clientId,
          balance: { gt: 0 }
        },
        _sum: { balance: true }
      }),
      // Last month pending payments
      prisma.vendor.aggregate({
        where: {
          clientId,
          balance: { gt: 0 },
          updatedAt: { lte: lastMonth.end }
        },
        _sum: { balance: true }
      }),
      // Average lead time calculation
      prisma.transaction.findMany({
        where: {
          clientId,
          type: 'PURCHASE',
          status: 'COMPLETED',
          createdAt: {
            gte: currentMonth.start
          }
        },
        select: {
          createdAt: true,
          completedAt: true
        }
      })
    ]);
   
    // Calculate lead time
    const leadTimeInDays = leadTimes.reduce((acc, order) => {
      if (!order.completedAt) return acc;
      const leadTime = order.completedAt.getTime() - order.createdAt.getTime();
      return acc + (leadTime / (1000 * 60 * 60 * 24)); // Convert to days
    }, 0);
    const averageLeadTime = leadTimes.length ? leadTimeInDays / leadTimes.length : 0;
   
    // Calculate changes
    const vendorChange = activeVendors - lastMonthActiveVendors;
    const orderChange = ((currentMonthOrders - lastMonthOrders) / lastMonthOrders) * 100;
    const paymentChange = ((pendingPayments._sum.balance! - lastMonthPayments._sum.balance!) / lastMonthPayments._sum.balance!) * 100;
   
    return {
        activeVendors,
        activeVendorsChange: vendorChange,
        activeVendorsTrend: vendorChange >= 0 ? 'up' : 'down',
        totalOrders: currentMonthOrders,
        totalOrdersChange: orderChange,
        totalOrdersTrend: orderChange >= 0 ? 'up' : 'down',
        pendingPayments: pendingPayments._sum.balance || 0,
        pendingPaymentsChange: paymentChange,
        pendingPaymentsTrend: paymentChange <= 0 ? 'up' : 'down',
        averageLeadTime: Number(averageLeadTime.toFixed(1)),
        averageLeadTimeChange: Number(leadTimeInDays.toFixed(1)),
        averageLeadTimeTrend: leadTimeInDays <= 0 ? 'up' : 'down'
      
    };
   }


   export async function POST(request: Request) {
    try {
      const body = await request.json();
      console.log('Request body:', body);
  
      // Check email uniqueness
      if (body.email) {
        const existingVendor = await prisma.vendor.findFirst({
          where: { 
            clientId: body.clientId,
            email: body.email 
          }
        });
        console.log('Existing vendor check:', existingVendor);
      }
  
      const vendorCode = await generateVendorCode();
      console.log('Generated code:', vendorCode);
  
      const vendor = await prisma.vendor.create({
        data: {
          ...body,
          code: vendorCode
        }
      });
      console.log('Created vendor:', vendor);
  
      return NextResponse.json(vendor);
    } catch (error) {
      return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to create vendor' }, { status: 500 });
    }
  }
   
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

 try {
    await prisma.vendor.delete({
    where: { id }
    });
    return NextResponse.json({ success: true });
 } catch {
    return NextResponse.json({ error: 'Failed to delete vendor' }, { status: 500 }); 
 }
}