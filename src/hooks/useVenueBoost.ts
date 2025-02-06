// hooks/useVenueBoost.ts
import { useCallback, useMemo } from 'react';
import { createVenueBoostApi } from '../app/api/external/omnigateway/venueboost';
import { useGatewayClientApiKey } from '../hooks/useGatewayClientApiKey';


export function useVenueBoost() {
    const { apiKey } = useGatewayClientApiKey();
    const vbApi = useMemo(() => apiKey ? createVenueBoostApi(apiKey) : null, [apiKey]);
  
    const connectVenueBoost = useCallback(async (venueShortCode: string) => {
      if (!vbApi) throw new Error('API not ready');
      await vbApi.connect(venueShortCode);
    }, [vbApi]);
  
    return { connectVenueBoost };
  }