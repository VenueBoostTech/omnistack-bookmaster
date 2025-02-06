// hooks/useOrders.ts
import { useState, useCallback, useMemo, useEffect } from 'react';
import { createOrderApi } from '../app/api/external/omnigateway/order';
import { OrderParams, Order, UpdateOrderStatusPayload, AddOrderNotePayload } from '../app/api/external/omnigateway/types/orders';
import { useGatewayClientApiKey } from './useGatewayClientApiKey';
import toast from 'react-hot-toast';

export const useOrders = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    
    const { apiKey, error: apiKeyError } = useGatewayClientApiKey();
    const orderApi = useMemo(() => apiKey ? createOrderApi(apiKey) : null, [apiKey]);

    useEffect(() => {
        if (orderApi) {
            fetchOrders().catch(console.error);
        }
    }, [orderApi]);

    const fetchOrders = useCallback(async (params: OrderParams = {}) => {
        if (!orderApi) return;
        
        try {
            setIsLoading(true);
            const response = await orderApi.getOrders(params);
            setOrders(response.items || []);
            setTotalItems(response.total);
            setTotalPages(response.pages);
            return response;
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrders([]);
            if (orderApi) {
                toast.error('Failed to fetch orders');
            }
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [orderApi]);

    const updateOrderStatus = useCallback(async (id: string, payload: UpdateOrderStatusPayload) => {
        if (!orderApi) throw new Error('Service not ready');
        
        try {
            setIsLoading(true);
            const response = await orderApi.updateOrderStatus(id, payload);
            toast.success('Order status updated successfully');
            await fetchOrders();
            return response;
        } catch (error) {
            toast.error('Failed to update order status');
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [orderApi, fetchOrders]);

    const addOrderNote = useCallback(async (id: string, note: string) => {
        if (!orderApi) throw new Error('Service not ready');
        
        try {
            setIsLoading(true);
            const response = await orderApi.addOrderNote(id, { note });
            toast.success('Note added successfully');
            return response;
        } catch (error) {
            toast.error('Failed to add note');
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [orderApi]);

    return {
        isLoading,
        orders,
        totalItems,
        totalPages,
        fetchOrders,
        updateOrderStatus,
        addOrderNote,
        apiKeyError,
        isInitialized: !!orderApi
    };
};