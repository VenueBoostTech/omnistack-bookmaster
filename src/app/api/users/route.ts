// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_KEY!
);


export async function GET(request: Request) {
 const { searchParams } = new URL(request.url);
 const page = Number(searchParams.get('page')) || 1;
 const pageSize = Number(searchParams.get('pageSize')) || 10;
 const search = searchParams.get('search') || '';
 const role = searchParams.get('role');
 const clientId = searchParams.get('clientId')!;

 try {
   const where = {
     clientId,
     ...(search && {
       OR: [
         { name: { contains: search, mode: 'insensitive' } },
         { email: { contains: search, mode: 'insensitive' } },
       ]
     }),
     ...(role && role !== 'ALL' && { role })
   };

   const [users, total, metrics] = await Promise.all([
     prisma.user.findMany({
       where,
       skip: (page - 1) * pageSize,
       take: pageSize,
     }),
     prisma.user.count({ where }),
     getUserMetrics(clientId)
   ]);

   return NextResponse.json({
     items: users,
     total,
     page,
     pageSize,
     totalPages: Math.ceil(total / pageSize),
     metrics
   });

 } catch (error) {
   return NextResponse.json({ error: error.message ?? 'Failed to fetch users' }, { status: 500 });
 }
}

export async function POST(request: Request) {
    try {
      const body = await request.json();
   
      // Create Supabase user with additional logging
      const { data, error } = await supabase.auth.admin.createUser({
        email: body.email,
        password: body.password,
        email_confirm: true
      });
   
      if (error) throw error;
      if (!data?.user?.id) throw new Error('No Supabase user ID returned');

      const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          role: body.role,
          clientId: body.clientId,
          password: body.password,
          supabaseId: data.user.id  // Updated to use correct path
        }
      });
   
      return NextResponse.json(user);
    } catch (error) {
      console.error('User creation error:', error);
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Failed to create user' },
        { status: 500 }
      );
    }
}


async function getUserMetrics(clientId: string) {
    const [
      total,
    //   activeNow,
    ] = await Promise.all([
      prisma.user.count({ where: { clientId } }),
    //   prisma.user.count({ 
    //     where: { 
    //       clientId,
    //       lastActive: { 
    //         gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
    //       }
    //     }
    //   })
    ]);
   
    return {
      total,
      activeNow: 0
    };
   }