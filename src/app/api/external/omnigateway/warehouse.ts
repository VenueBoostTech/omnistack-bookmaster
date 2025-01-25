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
