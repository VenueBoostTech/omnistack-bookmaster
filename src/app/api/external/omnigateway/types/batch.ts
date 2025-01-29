// types/batch.ts
export enum BatchStatus {
    ACTIVE = 'ACTIVE',
    LOW = 'LOW',
    PROCESSING = 'PROCESSING',
    EXPIRED = 'EXPIRED'
}

export interface BatchMetrics {
    activeBatches: {
        count: number;
        change: number;
    };
    nearExpiry: {
        count: number;
        change: number;
    };
    processing: {
        count: number;
        change: number;
    };
    stockValue: {
        value: number;
        change: number;
    };
}

export interface Batch {
    id: string;
    batchNumber: string;
    quantity: number;
    remainingQty: number;
    status: BatchStatus;
    expiryDate: string;
    received: string;
    supplier: string;
    product: string;
    sku: string;
    warehouse: string;
    warehouseId: string;
    productId: string;
    unitCost?: number;
    totalCost?: number;
    notes?: string;
}

export interface BatchParams {
    page?: number;
    pageSize?: number;
    status?: string;
    search?: string;
    warehouseId?: string;
}

export interface BatchResponse {
    items: Batch[];
    total: number;
    page: number;
    pages: number;
}

export interface CreateBatchPayload {
    productId: string;
    warehouseId: string;
    quantity: number;
    supplier: string;
    expiryDate: string;
    unitCost?: number;
    notes?: string;
}

export interface UpdateBatchPayload {
    quantity?: number;
    supplier?: string;
    expiryDate?: string;
    unitCost?: number;
    notes?: string;
    status?: BatchStatus;
}