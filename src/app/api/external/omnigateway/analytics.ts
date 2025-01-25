import { omniGateway } from './index';

export const analyticsApi = {
  getAnalytics: async (params: any) => {
    const { data } = await omniGateway.get('/analytics', { params });
    return data;
  }
};
