// app/api/accounts/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
 const { searchParams } = new URL(request.url);
 const page = Number(searchParams.get('page')) || 1;
 const pageSize = Number(searchParams.get('pageSize')) || 10;
 const search = searchParams.get('search') || '';
 const type = searchParams.get('type');
 const clientId = searchParams.get('clientId')!;

 try {
   const where = {
     clientId,
     ...(search && {
       OR: [
         { name: { contains: search, mode: 'insensitive' } },
         { code: { contains: search, mode: 'insensitive' } }
       ]
     }),
     ...(type && type !== 'ALL' && { type })
   };

   const [accounts, total, metrics] = await Promise.all([
     prisma.account.findMany({
       where,
       skip: (page - 1) * pageSize,
       take: pageSize,
       include: {
         transactions: {
           orderBy: { createdAt: 'desc' },
           take: 1
         }
       }
     }),
     prisma.account.count({ where }),
     getAccountMetrics(clientId)
   ]);

   return NextResponse.json({
     items: accounts.map(account => ({
       ...account,
       lastTransaction: account.transactions[0]?.createdAt || null
     })),
     total,
     page,
     pageSize,
     totalPages: Math.ceil(total / pageSize),
     metrics
   });

 } catch (error) {
   console.error('Accounts API Error:', error);
   return NextResponse.json({ error: 'Failed to fetch accounts' }, { status: 500 });
 }
}

export async function POST(request: Request) {
 try {
   const body = await request.json();

   const account = await prisma.account.create({
     data: {
       name: body.name,
       code: body.code,
       type: body.type,
       category: body.category,
       clientId: body.clientId,
       currency: body.currency || 'USD',
     }
   });

   return NextResponse.json(account);
 } catch (error) {
   console.error('Create Account Error:', error);
   return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
 }
}

async function getAccountMetrics(clientId: string) {
    const [byType] = await Promise.all([
      prisma.$transaction([
        prisma.account.groupBy({
          by: ['type'],
          where: { clientId },
          _count: true,
          _sum: { balance: true }
        })
      ])
    ]);
   
    return {
      types: byType[0].reduce((acc, curr) => ({
        ...acc,
        [curr.type]: { count: curr._count, balance: curr._sum.balance }
      }), {})
    };
   }