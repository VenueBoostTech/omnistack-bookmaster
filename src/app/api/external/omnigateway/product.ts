// api/product.ts
import { omniGateway } from './index';
import { CreateProductPayload, Product } from './types';

export const productApi = {
 createProduct: async (product: CreateProductPayload): Promise<Product> => {
   const { data } = await omniGateway.post('/products', product);
   return data;
 }
};
