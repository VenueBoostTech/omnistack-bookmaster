// types.ts

// inventory-adjustments
export interface AdjustmentParams {
    page: number;
    pageSize: number;
    status?: string;
  }
  
  export interface CreateAdjustmentPayload {
    productId: string;
    warehouseId: string;
    quantity: number;
    type: 'add' | 'subtract' | 'set';
    reason: string;
  }


  // brands
  export interface BrandParams {
    page?: number;
    limit?: number;
    search?: string;
  }
  
  export interface CreateBrandPayload {
    name: string;
    description?: string;
    apiConfig?: {
      apiKey?: string;
      apiSecret?: string;
      endpoint?: string;
    };
  }
  
  export interface UpdateBrandApiConfig {
    apiKey?: string;
    apiSecret?: string;
    endpoint?: string;
  }

  // products
  export interface CreateProductPayload {
    name: string;
    price: number; 
    currency: string;
    useExternalRates?: boolean;
   }
   
   export interface Product {
    id: string;
    name: string;
    prices: Record<string, number>;
    defaultCurrency: string;
   }
   

   // warehouse locations
   export interface CreateLocationPayload {
    name: string;
    code: string;
    type: string;
   }
   
   export interface UpdateLocationPayload {
    name?: string;
    code?: string;
    type?: string;
   }

   // imports
   export interface SimpleImportProductsPayload {
    file: File;
    type: string;
    brandId: string;
   }