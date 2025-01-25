import prisma from '@/lib/prisma';

export const settingsApi = {
 getSettings: async (clientId: string) => {
   return prisma.client.findUnique({
     where: { id: clientId }
   });
 },
 updateSettings: async (clientId: string, data: any) => {
   return prisma.client.update({
     where: { id: clientId },
     data
   });
 }
};
