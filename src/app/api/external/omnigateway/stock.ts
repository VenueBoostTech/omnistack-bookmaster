// api/stock.ts
import { createOmniGateway } from './index';
import {
    StockOperation,
    // StockLevel,
    // StockMovement,
    StockOperationParams,
    StockLevelParams,
    StockMovementParams,
    CreateOperationPayload,
    UpdateStockLevelPayload
} from './types/stock';

export const createStockApi = (clientApiKey: string) => {
    const omniGateway = createOmniGateway(clientApiKey);

    return {
        // Stock Operations
        getOperations: async (params: StockOperationParams = {}) => {
            const { data } = await omniGateway.get('/operations', { params });
            return data;
        },

        getOperationById: async (id: string) => {
            const { data } = await omniGateway.get(`/operations/${id}`);
            return data;
        },

        createOperation: async (payload: CreateOperationPayload) => {
            const { data } = await omniGateway.post('/operations', payload);
            return data;
        },

        updateOperation: async (id: string, payload: Partial<StockOperation>) => {
            const { data } = await omniGateway.put(`/operations/${id}`, payload);
            return data;
        },

        completeOperation: async (id: string) => {
            const { data } = await omniGateway.put(`/operations/${id}/complete`);
            return data;
        },

        cancelOperation: async (id: string, reason?: string) => {
            const { data } = await omniGateway.put(`/operations/${id}/cancel`, { reason });
            return data;
        },

        // Stock In Operations
        getStockIn: async (params: StockOperationParams = {}) => {
            const { data } = await omniGateway.get('/operations/in', { params });
            return data;
        },

        createStockIn: async (payload: CreateOperationPayload) => {
            const { data } = await omniGateway.post('/operations/in', payload);
            return data;
        },

        // Stock Out Operations
        getStockOut: async (params: StockOperationParams = {}) => {
            const { data } = await omniGateway.get('/operations/out', { params });
            return data;
        },

        createStockOut: async (payload: CreateOperationPayload) => {
            const { data } = await omniGateway.post('/operations/out', payload);
            return data;
        },

        // Stock Transfers
        getTransfers: async (params: StockOperationParams = {}) => {
            const { data } = await omniGateway.get('/operations/transfers', { params });
            return data;
        },

        createTransfer: async (payload: CreateOperationPayload) => {
            const { data } = await omniGateway.post('/operations/transfers', payload);
            return data;
        },

        // Stock Adjustments
        getAdjustments: async (params: StockOperationParams = {}) => {
            const { data } = await omniGateway.get('/operations/adjustments', { params });
            return data;
        },

        createAdjustment: async (payload: CreateOperationPayload) => {
            const { data } = await omniGateway.post('/operations/adjustments', payload);
            return data;
        },

        // Stock Levels
        getStockLevels: async (params: StockLevelParams = {}) => {
            const { data } = await omniGateway.get('/stock/levels', { params });
            return data;
        },

        getStockLevelDetail: async (warehouseId: string, productId: string) => {
            const { data } = await omniGateway.get(`/stock/levels/${warehouseId}/${productId}`);
            return data;
        },

        updateStockLevel: async (
            warehouseId: string,
            productId: string,
            updates: UpdateStockLevelPayload
        ) => {
            const { data } = await omniGateway.put(
                `/stock/levels/${warehouseId}/${productId}`,
                updates
            );
            return data;
        },

        getLowStockItems: async () => {
            const { data } = await omniGateway.get('/stock/levels/low-stock');
            return data;
        },

        recordStockCount: async (
            warehouseId: string,
            productId: string,
            quantity: number
        ) => {
            const { data } = await omniGateway.put(
                `/stock/levels/${warehouseId}/${productId}/count`,
                { quantity }
            );
            return data;
        },

        // Stock Movements
        getStockMovements: async (params: StockMovementParams = {}) => {
            const { data } = await omniGateway.get('/stock/movements', { params });
            return data;
        },

        getProductMovements: async (
            productId: string,
            params: { startDate?: string; endDate?: string } = {}
        ) => {
            const { data } = await omniGateway.get(`/stock/movements/product/${productId}`, {
                params
            });
            return data;
        },

        getWarehouseMovements: async (
            warehouseId: string,
            params: { startDate?: string; endDate?: string } = {}
        ) => {
            const { data } = await omniGateway.get(`/stock/movements/warehouse/${warehouseId}`, {
                params
            });
            return data;
        }
    };
};