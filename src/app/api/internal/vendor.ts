import prisma from '@/lib/prisma';

export const vendorApi = {
 getVendors: async (clientId: string) => {
   return prisma.vendor.findMany({
     where: { clientId }
   });
 }
};
