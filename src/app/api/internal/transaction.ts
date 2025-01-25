import prisma from '@/lib/prisma';

export const transactionApi = {
 getTransactions: async (clientId: string) => {
   return prisma.transaction.findMany({
     where: { clientId },
     include: {
       account: true
     }
   });
 }
};
