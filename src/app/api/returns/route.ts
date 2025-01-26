// app/api/returns/route.ts
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

    const returns = await prisma.return.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        vendor: true,
        items: true
      },
      orderBy: { date: 'desc' }
    });

    const total = await prisma.return.count({ where });

    const metrics = await getReturnMetrics(clientId);

    return NextResponse.json({
      items: returns,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      metrics
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch returns';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const number = await generateReturnNumber(body.clientId);

    const returnOrder = await prisma.return.create({
      data: {
        number,
        clientId: body.clientId,
        vendorId: body.vendorId,
        date: new Date(),
        status: 'PROCESSING',
        type: body.type,
        reason: body.reason,
        notes: body.notes,
        items: {
          create: body.items
        }
      }
    });

    return NextResponse.json(returnOrder);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create return';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

async function getReturnMetrics(clientId: string) {
    const today = new Date();
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastWeek = new Date(today.setDate(today.getDate() - 7));
   
    // Get total items and change
    const [currentItems, lastItems] = await Promise.all([
      prisma.returnItem.count({
        where: {
          return: {
            clientId,
            date: { gte: thisMonth }
          }
        }
      }),
      prisma.returnItem.count({
        where: {
          return: {
            clientId,
            date: {
              gte: lastMonth,
              lt: thisMonth
            }
          }
        }
      })
    ]);
   
    // Get active returns and change
    const [currentActive, lastActive] = await Promise.all([
      prisma.return.count({
        where: { 
          clientId,
          status: 'PROCESSING',
          date: { gte: thisMonth }
        }
      }),
      prisma.return.count({
        where: {
          clientId,
          status: 'PROCESSING',
          date: {
            gte: lastMonth,
            lt: thisMonth
          }
        }
      })
    ]);
   
    // Get credit values and change
    const [currentValue, lastValue] = await Promise.all([
      prisma.return.aggregate({
        where: {
          clientId,
          date: { gte: thisMonth }
        },
        _sum: { totalValue: true }
      }),
      prisma.return.aggregate({
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
   
    // Calculate processing times
    const [currentProcessing, lastProcessing] = await Promise.all([
      prisma.return.findMany({
        where: {
          clientId,
          status: 'COMPLETED',
          date: { gte: thisMonth }
        },
        select: {
          date: true,
          updatedAt: true
        }
      }),
      prisma.return.findMany({
        where: {
          clientId,
          status: 'COMPLETED',
          date: {
            gte: lastMonth,
            lt: thisMonth
          }
        },
        select: {
          date: true,
          updatedAt: true
        }
      })
    ]);
   
    const calcAvgProcessingTime = (returns: any[]) => {
      if (returns.length === 0) return 0;
      const totalDays = returns.reduce((sum, ret) => {
        const days = (new Date(ret.updatedAt).getTime() - new Date(ret.date).getTime()) / (1000 * 60 * 60 * 24);
        return sum + days;
      }, 0);
      return totalDays / returns.length;
    };
   
    const avgProcessingTime = calcAvgProcessingTime(currentProcessing);
    const lastAvgProcessingTime = calcAvgProcessingTime(lastProcessing);
    const processingTimeChange = lastAvgProcessingTime === 0 ? 0 : avgProcessingTime - lastAvgProcessingTime;
   
    return {
      activeReturns: {
        value: currentActive,
        change: currentActive - lastActive,
        trend: currentActive >= lastActive ? 'up' : 'down',
        period: "vs last month"
      },
      pendingCredit: {
        value: currentValue._sum.totalValue || 0,
        change: calculatePercentChange(
          currentValue._sum.totalValue || 0,
          lastValue._sum.totalValue || 0
        ),
        trend: (currentValue._sum.totalValue || 0) >= (lastValue._sum.totalValue || 0) ? 'up' : 'down',
        period: "vs last month"
      },
      totalItems: {
        value: currentItems,
        change: currentItems - lastItems,
        trend: currentItems >= lastItems ? 'up' : 'down',
        period: "vs last month"
      },
      processingTime: {
        value: Number(avgProcessingTime.toFixed(1)),
        change: Number(processingTimeChange.toFixed(1)),
        trend: avgProcessingTime <= lastAvgProcessingTime ? 'up' : 'down',
        period: "vs last month"
      }
    };
   }

function calculatePercentChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return Math.round(((current - previous) / previous) * 100);
}

async function generateReturnNumber(clientId: string) {
  const year = new Date().getFullYear();
  const count = await prisma.return.count({
    where: { 
      clientId,
      number: { startsWith: `RET-${year}` }
    }
  });
  return `RET-${year}-${(count + 1).toString().padStart(4, '0')}`;
}