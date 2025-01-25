import prisma from '@/lib/prisma';

export const procurementApi = {
 getPurchases: async (clientId: string) => {
   return prisma.transaction.findMany({
     where: { 
       clientId,
       type: 'PURCHASE'
     }
   });
 },
 getReturns: async (clientId: string) => {
   return prisma.transaction.findMany({
     where: {
       clientId,
       type: 'RETURN'
     }
   });
 }
};
