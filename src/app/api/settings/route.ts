// app/api/settings/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
 try {
   const body = await request.json();
   const { clientId, settings } = body;

   const updatedClient = await prisma.client.update({
     where: { id: clientId },
     data: {
       settings: {
         ...settings,
         general: {
           companyName: settings.general.companyName,
           taxId: settings.general.taxId,
           address: settings.general.address,
           phone: settings.general.phone
         }
       }
     }
   });

   return NextResponse.json(updatedClient);
 } catch (error) {
   return NextResponse.json(
     { error: error instanceof Error ? error.message : 'Failed to update settings' },
     { status: 500 }
   );
 }
}

export async function GET(request: Request) {
 const { searchParams } = new URL(request.url);
 const clientId = searchParams.get('clientId');

 try {
   const client = await prisma.client.findUnique({
     where: { id: clientId! },
     select: { settings: true }
   });

   return NextResponse.json(client?.settings);
 } catch (error) {
   return NextResponse.json(
     { error: error instanceof Error ? error.message : 'Failed to fetch settings' },
     { status: 500 }
   );
 }
}