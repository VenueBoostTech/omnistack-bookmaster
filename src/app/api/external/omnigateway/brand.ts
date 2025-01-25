import { BrandParams, UpdateBrandApiConfig, CreateBrandPayload } from "./types"; 
import { omniGateway } from './index';

export const brandApi = {
    getBrands: async (params: BrandParams) => {
      const { data } = await omniGateway.get('/brands', { params });
      return data;
    },
    
    createBrand: async (brand: CreateBrandPayload) => {
      const { data } = await omniGateway.post('/brands', brand);
      return data;
    },
    
    getBrandById: async (id: string) => {
      const { data } = await omniGateway.get(`/brands/${id}`);
      return data;
    },
  
    updateBrandApiConfig: async (id: string, config: UpdateBrandApiConfig) => {
      const { data } = await omniGateway.put(`/brands/${id}/api-config`, config);
      return data;
    }
  };