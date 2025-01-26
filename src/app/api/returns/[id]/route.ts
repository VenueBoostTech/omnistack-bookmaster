import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.returnItem.deleteMany({
      where: { returnId: params.id }
    });

    await prisma.return.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete return';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}