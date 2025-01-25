import { omniGateway } from './index';

export const dashboardApi = {
  getStats: async () => {
    const { data } = await omniGateway.get('/dashboard/stats');
    return data;
  }
};
