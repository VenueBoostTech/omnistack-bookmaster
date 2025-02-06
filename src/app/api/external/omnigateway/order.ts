// app/api/external/omnigateway/order.ts
import { createOmniGateway } from './index';
import { 
    Order,
    OrderParams,
    UpdateOrderStatusPayload,
    AddOrderNotePayload,
    OrderListResponse
} from './types/orders';

export const createOrderApi = (clientApiKey: string) => {
    const omniGateway = createOmniGateway(clientApiKey);

    return {
        getOrders: async (params: OrderParams = {}): Promise<OrderListResponse> => {
            const { data } = await omniGateway.get('/orders', { params });
            return data;
        },

        getOrder: async (id: string): Promise<Order> => {
            const { data } = await omniGateway.get(`/orders/${id}`);
            return data;
        },

        updateOrderStatus: async (id: string, payload: UpdateOrderStatusPayload): Promise<Order> => {
            const { data } = await omniGateway.put(`/orders/${id}/status`, payload);
            return data;
        },

        addOrderNote: async (id: string, payload: AddOrderNotePayload): Promise<Order> => {
            const { data } = await omniGateway.post(`/orders/${id}/notes`, payload);
            return data;
        }
    };
};