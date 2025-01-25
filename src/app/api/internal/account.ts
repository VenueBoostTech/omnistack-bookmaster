import prisma from '@/lib/prisma';

export const accountApi = {
 getAccounts: async (clientId: string) => {
   return prisma.account.findMany({
     where: { clientId }
   });
 }
};
