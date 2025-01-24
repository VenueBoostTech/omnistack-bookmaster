// types.ts
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