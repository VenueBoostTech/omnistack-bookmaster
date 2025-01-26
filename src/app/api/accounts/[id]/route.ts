// app/api/accounts/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
   
  try {
    const transactionCount = await prisma.transaction.count({
      where: { accountId: id }
    });
   
    if (transactionCount > 0) {
      return NextResponse.json({ 
        error: 'Cannot delete account with existing transactions' 
      }, { status: 400 });
    }
   
    await prisma.account.delete({ where: { id } });
    return NextResponse.json({ success: true });
   
  } catch (error) {
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to delete account' 
    }, { status: 500 });
  }
}