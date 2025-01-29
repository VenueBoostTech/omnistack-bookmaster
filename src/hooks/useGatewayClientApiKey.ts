// hooks/useGatewayClientApiKey.ts
import { useEffect, useState } from 'react';
import { useClient } from './useClient';
import { prisma } from '@/lib/prisma';

export const useGatewayClientApiKey = () => {
    const { clientId } = useClient();
    const [apiKey, setApiKey] = useState<string | null>(null);

    useEffect(() => {
        const getApiKey = async () => {
            if (clientId) {
                const client = await prisma.client.findUnique({
                    where: { id: clientId },
                    select: { omniGatewayApiKey: true }
                });
                if (client?.omniGatewayApiKey) {
                    setApiKey(client.omniGatewayApiKey);
                }
            }
        };

        getApiKey();
    }, [clientId]);

    return apiKey;
};