// app/api/external/omnigateway/venueboost.ts
import { createOmniGateway } from './index';

export const createVenueBoostApi = (clientApiKey: string) => {
    const omniGateway = createOmniGateway(clientApiKey);
    
    return {
      connect: async (venueShortCode: string, webhookApiKey: string) => {
        const { data } = await omniGateway.post('/vb/connect', { venueShortCode, webhookApiKey });
        return data;
      },
  
      listStores: async () => {
        const { data } = await omniGateway.get('/vb/stores');
        return data;
      },
  
      connectStore: async (params: { vbId: number, osId: string }) => {
        const { data } = await omniGateway.post('/vb/stores/connect-disconnect', {
          ...params,
          type: 'connect'
        });
        return data;
      },
  
      disconnectStore: async (params: { vbId: number, osId: string }) => {
        const { data } = await omniGateway.post('/vb/stores/connect-disconnect', {
          ...params,
          type: 'disconnect'
        });
        return data;
      }
    };
  };