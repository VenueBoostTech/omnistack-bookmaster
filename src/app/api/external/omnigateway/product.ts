import { omniGateway } from './index';
import { ProductParams, UpdateProductPayload } from './types';
import { CreateProductPayload } from './types';

export const productApi = {
  getProducts: async (params: ProductParams = {}) => {
    const { data } = await omniGateway.get('/products', { params });
    return data;
  },

  createProduct: async (product: CreateProductPayload) => {
    const { data } = await omniGateway.post('/products', product);
    return data;
  },

  getProductById: async (id: string) => {
    const { data } = await omniGateway.get(`/products/${id}`);
    return data;
  },

  updateProduct: async (id: string, product: UpdateProductPayload) => {
    const { data } = await omniGateway.put(`/products/${id}`, product);
    return data;
  },

  deleteProduct: async (id: string) => {
    const { data } = await omniGateway.delete(`/products/${id}`);
    return data;
  },

  hardDeleteProduct: async (id: string) => {
    const { data } = await omniGateway.delete(`/products/${id}/hard`);
    return data;
  }
};