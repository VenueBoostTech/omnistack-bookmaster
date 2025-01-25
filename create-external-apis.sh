# create-external-apis.sh 
#!/bin/bash

mkdir -p src/app/api/external/omnigateway

# Dashboard
cat > src/app/api/external/omnigateway/dashboard.ts << 'EOL'
import { omniGateway } from './index';

export const dashboardApi = {
  getStats: async () => {
    const { data } = await omniGateway.get('/dashboard/stats');
    return data;
  }
};
EOL

# Analytics
cat > src/app/api/external/omnigateway/analytics.ts << 'EOL'
import { omniGateway } from './index';

export const analyticsApi = {
  getAnalytics: async (params: any) => {
    const { data } = await omniGateway.get('/analytics', { params });
    return data;
  }
};
EOL

# Products
cat > src/app/api/external/omnigateway/product.ts << 'EOL'
import { omniGateway } from './index';

export const productApi = {
  getProducts: async (params: any) => {
    const { data } = await omniGateway.get('/products', { params });
    return data;
  },
  getCategories: async () => {
    const { data } = await omniGateway.get('/products/categories');
    return data;
  }
};
EOL

# Warehouses
cat > src/app/api/external/omnigateway/warehouse.ts << 'EOL'
import { omniGateway } from './index';

export const warehouseApi = {
  getWarehouses: async () => {
    const { data } = await omniGateway.get('/warehouses');
    return data;
  },
  getLocations: async (warehouseId: string) => {
    const { data } = await omniGateway.get(`/warehouses/${warehouseId}/locations`);
    return data;
  },
  getStockLevels: async (warehouseId: string) => {
    const { data } = await omniGateway.get(`/warehouses/${warehouseId}/stock`);
    return data;
  }
};
EOL

# Stock Operations
cat > src/app/api/external/omnigateway/stock.ts << 'EOL'
import { omniGateway } from './index';

export const stockApi = {
  getStockIn: async (params: any) => {
    const { data } = await omniGateway.get('/operations/in', { params });
    return data;
  },
  getStockOut: async (params: any) => {
    const { data } = await omniGateway.get('/operations/out', { params });
    return data;
  },
  getTransfers: async (params: any) => {
    const { data } = await omniGateway.get('/operations/transfers', { params });
    return data;
  },
  getAdjustments: async (params: any) => {
    const { data } = await omniGateway.get('/operations/adjustments', { params });
    return data;
  }
};
EOL

# Batches
cat > src/app/api/external/omnigateway/batch.ts << 'EOL'
import { omniGateway } from './index';

export const batchApi = {
  getBatches: async (params: any) => {
    const { data } = await omniGateway.get('/batches', { params });
    return data;
  }
};
EOL

