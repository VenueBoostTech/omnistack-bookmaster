// hooks/useVenueBoost.ts
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createVenueBoostApi } from '../app/api/external/omnigateway/venueboost';
import { useGatewayClientApiKey } from '../hooks/useGatewayClientApiKey';


export function useVenueBoost() {
    const { apiKey } = useGatewayClientApiKey();
    const [isLoading, setIsLoading] = useState(false);
    const [vbStores, setVbStores] = useState([]);
    const vbApi = useMemo(() => apiKey ? createVenueBoostApi(apiKey) : null, [apiKey]);


    // Initial fetch when API is ready
    useEffect(() => {
        if (vbApi) {
            listStores().catch(console.error);
           
        }
    }, [vbApi]);

  
    const connectVenueBoost = useCallback(async (venueShortCode: string, webhookApiKey: string) => {
      if (!vbApi) throw new Error('API not ready');
      await vbApi.connect(venueShortCode, webhookApiKey);
    }, [vbApi]);
 
   
    const listStores = useCallback(async () => {
        if (!vbApi) return;
        
        try {
            setIsLoading(true);
            const stores = await vbApi.listStores();
            setVbStores(stores);
            return stores;
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [vbApi, apiKey]);

   
 
    const connectStore = useCallback(async (params: { vbId: number, osId: string }) => {
      if (!vbApi) throw new Error('API not ready');
      return await vbApi.connectStore(params);
    }, [vbApi]);
 
    const disconnectStore = useCallback(async (params: { vbId: number, osId: string }) => {
      if (!vbApi) throw new Error('API not ready');
      return await vbApi.disconnectStore(params);
    }, [vbApi]);
  
    return {
        connectVenueBoost,
        listStores,
        connectStore,
        disconnectStore,
        vbStores,
        isLoading,
        apiKey // Debug
    };
 }