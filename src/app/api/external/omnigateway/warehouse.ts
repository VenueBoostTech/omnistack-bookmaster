// api/warehouse.ts
import { createOmniGateway } from './index';
import { CreateWarehousePayload, UpdateWarehousePayload } from './types';

export const createWarehouseApi = (clientApiKey: string) => {
    const omniGateway = createOmniGateway(clientApiKey);

    return {
        createWarehouse: async (warehouse: CreateWarehousePayload) => {
            const { data } = await omniGateway.post('/warehouses', warehouse);
            return data;
        },

        getClientWarehouses: async (clientId: string) => {
            const { data } = await omniGateway.get(`/warehouses/client/${clientId}`);
            return data;
        },

        getWarehouseById: async (id: string) => {
            const { data } = await omniGateway.get(`/warehouses/${id}`);
            return data;
        },

        updateWarehouse: async (id: string, warehouse: UpdateWarehousePayload) => {
            const { data } = await omniGateway.put(`/warehouses/${id}`, warehouse);
            return data;
        },

        deleteWarehouse: async (id: string) => {
            const { data } = await omniGateway.delete(`/warehouses/${id}`);
            return data;
        }
    };
};