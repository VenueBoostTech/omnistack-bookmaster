// app/api/external/omnigateway/import.ts
import { createOmniGateway } from './index';
import { SimpleImportProductsPayload } from './types';

export const createImportApi = (clientApiKey: string) => {
    const omniGateway = createOmniGateway(clientApiKey);

    return {
        importProducts: async (payload: SimpleImportProductsPayload) => {
            const formData = new FormData();
            formData.append('file', payload.file);
            formData.append('type', payload.type);
            formData.append('brandId', payload.brandId);

            const { data } = await omniGateway.post('/import/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        }
    };
};