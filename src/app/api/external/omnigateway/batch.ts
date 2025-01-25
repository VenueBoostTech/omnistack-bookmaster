import { omniGateway } from './index';

export const batchApi = {
  getBatches: async (params: any) => {
    const { data } = await omniGateway.get('/batches', { params });
    return data;
  }
};
