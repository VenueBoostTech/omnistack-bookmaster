# create-internal-apis.sh
#!/bin/bash

mkdir -p src/app/api/internal

# Users
cat > src/app/api/internal/user.ts << 'EOL'
import prisma from '@/lib/prisma';

export const userApi = {
 getUsers: async (clientId: string) => {
   return prisma.user.findMany({
     where: { clientId }
   });
 }
};
EOL

# Accounts 
cat > src/app/api/internal/account.ts << 'EOL'
import prisma from '@/lib/prisma';

export const accountApi = {
 getAccounts: async (clientId: string) => {
   return prisma.account.findMany({
     where: { clientId }
   });
 }
};
EOL

# Transactions
cat > src/app/api/internal/transaction.ts << 'EOL'
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
EOL

# Vendors
cat > src/app/api/internal/vendor.ts << 'EOL'
import prisma from '@/lib/prisma';

export const vendorApi = {
 getVendors: async (clientId: string) => {
   return prisma.vendor.findMany({
     where: { clientId }
   });
 }
};
EOL

# Procurement
cat > src/app/api/internal/procurement.ts << 'EOL'
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
EOL

# Settings
cat > src/app/api/internal/settings.ts << 'EOL'
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
EOL
