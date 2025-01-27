// api/profile/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get('clientId');

  if (!clientId) {
    return NextResponse.json({ error: 'Client ID is required' }, { status: 400 });
  }

  try {
    const client = await prisma.client.findUnique({
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
    });

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    return NextResponse.json({ client });
  } catch (error) {
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch client' 
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { clientId, data } = body;

  if (!clientId) {
    return NextResponse.json({ error: 'Client ID is required' }, { status: 400 });
  }

  try {
    const client = await prisma.client.update({
      where: { id: clientId },
      data: {
        name: data.name,
        code: data.code,
        taxId: data.taxId,
        address: data.address,
        phone: data.phone,
        email: data.email
      },
      select: {
        name: true,
        code: true,
        taxId: true,
        address: true,
        phone: true,
        email: true,
        defaultCurrency: true
      }
    });

    return NextResponse.json({ client });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update client' }, { status: 500 });
  }
}