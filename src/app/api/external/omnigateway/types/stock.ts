// types/stock.ts
export enum OperationType {
    PURCHASE = 'PURCHASE',
    SALE = 'SALE',
    TRANSFER = 'TRANSFER',
    ADJUSTMENT = 'ADJUSTMENT',
    RETURN = 'RETURN',
    COUNT = 'COUNT'
}

export enum OperationStatus {
    DRAFT = 'DRAFT',
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export interface StockOperationItem {
    id?: string;
    productId: string;
    quantity: number;
    unitCost?: number;
    totalCost?: number;
    notes?: string;
    product?: {
        name: string;
        code: string;
    };
}

export interface StockOperation {
    id?: string;
    number: string;
    type: OperationType;
    status: OperationStatus;
    warehouseId: string;
    clientId?: string;
    items: StockOperationItem[];
    batchId?: string;
    externalVendorId?: string;
    reference?: string;
    notes?: string;
    createdAt?: string;
    updatedAt?: string;
    warehouse?: {
        name: string;
        code: string;
    };
}

export interface StockLevel {
    warehouseId: string;
    productId: string;
    currentStock: number;
    committedStock: number;
    availableStock: number;
    minimumStock: number;
    maximumStock: number;
    reorderPoint: number;
    lastCountDate?: string;
    lastMovementDate?: string;
    location?: {
        zone?: string;
        aisle?: string;
        rack?: string;
        shelf?: string;
        bin?: string;
    };
    product?: {
        name: string;
        code: string;
    };
    warehouse?: {
        name: string;
        code: string;
    };
}

export interface StockMovement {
    id: string;
    type: OperationType;
    quantity: number;
    previousStock: number;
    newStock: number;
    warehouseId: string;
    productId: string;
    operationId?: string;
    batchId?: string;
    reference?: string;
    notes?: string;
    createdAt: string;
    product?: {
        name: string;
        code: string;
    };
    warehouse?: {
        name: string;
        code: string;
    };
}

export interface StockOperationParams {
    page?: number;
    limit?: number;
    type?: OperationType;
    status?: OperationStatus;
    warehouseId?: string;
    startDate?: string;
    endDate?: string;
}

export interface StockLevelParams {
    page?: number;
    limit?: number;
    warehouseId?: string;
    productId?: string;
    belowReorderPoint?: boolean;
}

export interface StockMovementParams {
    page?: number;
    limit?: number;
    type?: OperationType;
    warehouseId?: string;
    productId?: string;
    startDate?: string;
    endDate?: string;
}

export interface CreateOperationPayload {
    warehouseId: string;
    type: OperationType;
    items: Array<{
        productId: string;
        quantity: number;
        unitCost?: number;
        notes?: string;
    }>;
    batchId?: string;
    externalVendorId?: string;
    reference?: string;
    notes?: string;
}

export interface UpdateStockLevelPayload {
    minimumStock?: number;
    maximumStock?: number;
    reorderPoint?: number;
    location?: {
        zone?: string;
        aisle?: string;
        rack?: string;
        shelf?: string;
        bin?: string;
    };
}