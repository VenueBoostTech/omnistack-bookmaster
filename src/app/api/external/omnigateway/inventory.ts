import { omniGateway } from './index';
import type { AdjustmentParams, CreateAdjustmentPayload } from './types';

export const inventoryApi = {
  getAdjustments: async (params: AdjustmentParams) => {
    const { data } = await omniGateway.get('/inventory/adjustments', { params });
    return data;
  },
  
  createAdjustment: async (adjustment: CreateAdjustmentPayload) => {
    const { data } = await omniGateway.post('/inventory/adjustments', adjustment);
    return data;
  },
  
  getAdjustmentById: async (id: string) => {
    const { data } = await omniGateway.get(`/inventory/adjustments/${id}`);
    return data;
  }
};