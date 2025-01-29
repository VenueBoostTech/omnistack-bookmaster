// app/api/external/omnigateway/analytics.ts
import { createOmniGateway } from './index';

export const createAnalyticsApi = (clientApiKey: string) => {
    const omniGateway = createOmniGateway(clientApiKey);

    return {
        getAnalytics: async (params: any) => {
            const { data } = await omniGateway.get('/analytics', { params });
            return data;
        }
    };
};