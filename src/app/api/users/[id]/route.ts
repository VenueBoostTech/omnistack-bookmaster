// app/api/users/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_KEY!
);



export async function DELETE(
 request: Request,
 { params }: { params: { id: string } }
) {
 const id = params.id;
  
 try {
   const user = await prisma.user.findUnique({
     where: { id }
   });

   if (!user) {
     return NextResponse.json({ error: 'User not found' }, { status: 404 });
   }

   // Delete Supabase user
   if (user.supabaseId) {
     await supabase.auth.admin.deleteUser(user.supabaseId);
   }

   // Delete Prisma user
   await prisma.user.delete({ where: { id } });
   
   return NextResponse.json({ success: true });
  
 } catch (error) {
   console.error('Delete user error:', error);
   return NextResponse.json({ 
     error: error instanceof Error ? error.message : 'Failed to delete user' 
   }, { status: 500 });
 }
}