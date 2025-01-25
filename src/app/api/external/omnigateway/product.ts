import { omniGateway } from './index';

export const productApi = {
  getProducts: async (params: any) => {
    const { data } = await omniGateway.get('/products', { params });
    return data;
  },
  getCategories: async () => {
    const { data } = await omniGateway.get('/products/categories');
    return data;
  }
};
