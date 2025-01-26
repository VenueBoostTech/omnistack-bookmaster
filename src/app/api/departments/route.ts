// app/api/departments/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
 const { searchParams } = new URL(request.url);
 const clientId = searchParams.get('clientId')!;

 try {
   const [departments, withUsers] = await Promise.all([
     prisma.department.findMany({
       where: { clientId },
       include: {
         _count: {
           select: { users: true }
         }
       }
     }),
     prisma.department.count({
       where: {
         clientId,
         users: { some: {} }
       }
     })
   ]);

   return NextResponse.json({
     items: departments.map(d => ({
       ...d,
       userCount: d._count.users
     })),
     metrics: {
       total: departments.length,
       withUsers
     }
   });
 } catch (error) {
    return NextResponse.json({ 
        error: error instanceof Error ? error.message : 'Failed to fetch departments' 
      }, { status: 500 });
 }
}

export async function POST(request: Request) {
 try {
   const body = await request.json();
   
   const department = await prisma.department.create({
     data: {
       name: body.name,
       clientId: body.clientId
     }
   });

   return NextResponse.json(department);
 } catch (error) {
   return NextResponse.json({ error: 'Failed to create department' }, { status: 500 });
 }
}