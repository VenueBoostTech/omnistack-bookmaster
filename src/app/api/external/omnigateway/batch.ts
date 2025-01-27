import { omniGateway } from './index';
import { Batch } from './types';
import { CreateBatchPayload } from './types';
import { BatchParams } from './types';
import { BatchResponse } from './types';

export const batchApi = {
  getBatches: async (params: BatchParams = {}): Promise<BatchResponse> => {
      const { data } = await omniGateway.get('/batches', { params });
      return data;
  },

  createBatch: async (batch: CreateBatchPayload): Promise<Batch> => {
      const { data } = await omniGateway.post('/batches', batch);
      return data;
  },

  getBatchById: async (id: string): Promise<Batch> => {
      const { data } = await omniGateway.get(`/batches/${id}`);
      return data;
  },

  updateBatch: async (id: string, batch: UpdateBatchPayload): Promise<Batch> => {
      const { data } = await omniGateway.put(`/batches/${id}`, batch);
      return data;
  },

  deactivateBatch: async (id: string): Promise<Batch> => {
      const { data } = await omniGateway.put(`/batches/${id}/deactivate`);
      return data;
  },

  deleteBatch: async (id: string): Promise<Batch> => {
      const { data } = await omniGateway.delete(`/batches/${id}`);
      return data;
  },

  getBatchesByProduct: async (productId: string): Promise<Batch[]> => {
      const { data } = await omniGateway.get(`/batches/product/${productId}`);
      return data;
  },

  getBatchesByWarehouse: async (warehouseId: string): Promise<Batch[]> => {
      const { data } = await omniGateway.get(`/batches/warehouse/${warehouseId}`);
      return data;
  },

  getActiveBatchesQuantity: async (productId: string, warehouseId: string): Promise<number> => {
      const { data } = await omniGateway.get('/batches/quantity', {
          params: { productId, warehouseId }
      });
      return data;
  }
};