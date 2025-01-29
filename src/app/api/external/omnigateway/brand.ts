// app/api/external/omnigateway/brand.ts
import { omniGateway } from './index';
import { 
    Brand, 
    BrandParams, 
    CreateBrandPayload, 
    UpdateBrandApiConfig 
} from './types';

export const brandApi = {
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
    }
};