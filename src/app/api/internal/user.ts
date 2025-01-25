import prisma from '@/lib/prisma';

export const userApi = {
 getUsers: async (clientId: string) => {
   return prisma.user.findMany({
     where: { clientId }
   });
 }
};
