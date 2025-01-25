// app/api/transactions/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get('clientId')!;
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const search = searchParams.get('search') || '';
  const type = searchParams.get('type');

  try {
    const where = {
        clientId,
        ...(search && {
          OR: [
            { number: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { reference: { contains: search, mode: 'insensitive' } },
          ],
        }),
        ...(type && type !== 'ALL' && { type }),
        accountId: { not: undefined }, // Correct filter to avoid the error
      };
      
      const [transactions, total] = await Promise.all([
        prisma.transaction.findMany({
          where: {
            ...where,
            accountId: { not: null }, // Ensure accountId is not null
          },
          include: {
            account: true, // Include account only when accountId is valid
          },
          orderBy: {
            date: 'desc',
          },
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
        prisma.transaction.count({
          where: {
            ...where,
            accountId: { not: null }, // Count only transactions with a valid accountId
          },
        }),
      ]);
      
      
    const metrics = await getTransactionMetrics(clientId);

    return NextResponse.json({
      items: transactions,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      metrics
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

async function getTransactionMetrics(clientId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [deposits, payments, pending, completed] = await Promise.all([
    prisma.transaction.aggregate({
      where: {
        clientId,
        type: 'RECEIPT',
        date: { gte: today }
      },
      _sum: { debit: true }
    }),
    prisma.transaction.aggregate({
      where: {
        clientId,
        type: 'PAYMENT',
        date: { gte: today }
      },
      _sum: { credit: true }
    }),
    prisma.transaction.count({
      where: {
        clientId,
        status: 'PENDING'
      }
    }),
    prisma.transaction.count({
      where: {
        clientId,
        status: 'COMPLETED',
        date: { gte: today }
      }
    })
  ]);

  return {
    todayDeposits: deposits._sum.debit || 0,
    todayPayments: payments._sum.credit || 0,
    pendingCount: pending,
    completedToday: completed
  };
}