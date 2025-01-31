// app/api/external/omnigateway/brand.ts
import { createOmniGateway } from './index';
import { 
    Brand, 
    BrandParams, 
    CreateBrandPayload, 
    UpdateBrandApiConfig,
    SyncProductsResponse 
} from './types';

export const createBrandApi = (clientApiKey: string) => {
    const omniGateway = createOmniGateway(clientApiKey);

    return {
        getBrands: async (params: BrandParams = {}) => {
            const { data } = await omniGateway.get('/brands', { params });
            return data;
        },

        createBrand: async (brand: CreateBrandPayload) => {
            const { data } = await omniGateway.post('/brands', brand);
            return data;
        },

        updateBrand: async (id: string, brand: Partial<Brand>) => {
            const { data } = await omniGateway.put(`/brands/${id}`, brand);
            return data;
        },

        updateBrandApiConfig: async (id: string, config: UpdateBrandApiConfig) => {
            const { data } = await omniGateway.put(`/brands/${id}/api-config`, config);
            return data;
        },

        deleteBrand: async (id: string) => {
            const { data } = await omniGateway.delete(`/brands/${id}`);
            return data;
        },

        hardDeleteBrand: async (id: string) => {
            const { data } = await omniGateway.delete(`/brands/${id}/hard`);
            return data;
        },

        syncProducts: async (id: string): Promise<SyncProductsResponse> => {
            const { data } = await omniGateway.post(`/brands/${id}/sync`);
            return data;
        }
    };
};