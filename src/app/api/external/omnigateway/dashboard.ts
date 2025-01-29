// app/api/external/omnigateway/dashboard.ts
import { createOmniGateway } from './index';

export const createDashboardApi = (clientApiKey: string) => {
    const omniGateway = createOmniGateway(clientApiKey);

    return {
        getStats: async () => {
            const { data } = await omniGateway.get('/dashboard/stats');
            return data;
        }
    };
};