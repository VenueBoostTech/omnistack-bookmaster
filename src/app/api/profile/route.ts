// api/profile/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_KEY!
);

export async function GET(request: Request) {
 const { searchParams } = new URL(request.url);
 const clientId = searchParams.get('clientId')!;
 const userId = searchParams.get('userId')!;

 try {
   const [client, user] = await Promise.all([
     prisma.client.findUnique({
       where: { id: clientId },
       select: {
         name: true,
         code: true,
         taxId: true,
         address: true,
         phone: true,
         email: true,
         defaultCurrency: true
       }
     }),
     prisma.user.findUnique({
       where: { id: userId },
       select: {
         name: true,
         email: true,
         supabaseId: true
       }
     })
   ]);

   return NextResponse.json({ client, user });
 } catch (error) {
   return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
 }
}

export async function PUT(request: Request) {
 const body = await request.json();
 const { userId, data } = body;

 try {
   // Update Prisma user
   const user = await prisma.user.update({
     where: { id: userId },
     data: {
       name: data.name,
       email: data.email
     }
   });

   // Update Supabase user if password change requested
   if (data.currentPassword && data.newPassword) {
     const { error } = await supabase.auth.admin.updateUserById(
       user.supabaseId,
       { password: data.newPassword }
     );

     if (error) throw error;
   }

   return NextResponse.json(user);
 } catch (error) {
   return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
 }
}