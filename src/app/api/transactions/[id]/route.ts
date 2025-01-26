// app/api/transactions/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function DELETE(
 request: Request,
 { params }: { params: { id: string } }
) {
 const id = params.id;

 try {
   await prisma.transaction.delete({
     where: { id }
   });
   return NextResponse.json({ success: true });
 } catch (error) {
   return NextResponse.json(
     { error: error instanceof Error ? error.message : 'Failed to delete transaction' }, 
     { status: 500 }
   );
 }
}