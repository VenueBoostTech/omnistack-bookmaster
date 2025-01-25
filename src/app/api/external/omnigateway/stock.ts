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
