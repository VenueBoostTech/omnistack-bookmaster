// hooks/useStockLevel.ts
import { useState, useCallback } from 'react';
import { stockApi } from '../app/api/external/omnigateway/stock';
import { useToast } from '@/components/ui/use-toast';
import {
    StockLevel,
    StockLevelParams,
    UpdateStockLevelPayload
} from '../app/api/external/omnigateway/types/stock';

export const useStockLevel = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [stockLevels, setStockLevels] = useState<StockLevel[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { toast } = useToast();

    const fetchStockLevels = useCallback(async (params: StockLevelParams = {}) => {
        try {
            setIsLoading(true);
            const response = await stockApi.getStockLevels(params);
            setStockLevels(response.items);
            setTotalItems(response.total);
            setTotalPages(response.pages);
            return response;
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch stock levels",
                variant: "destructive",
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    const updateStockLevel = useCallback(async (
        warehouseId: string,
        productId: string,
        updates: UpdateStockLevelPayload
    ) => {
        try {
            setIsLoading(true);
            const response = await stockApi.updateStockLevel(warehouseId, productId, updates);
            toast({
                title: "Success",
                description: "Stock level updated successfully",
            });
            return response;
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update stock level",
                variant: "destructive",
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    const recordStockCount = useCallback(async (
        warehouseId: string,
        productId: string,
        quantity: number
    ) => {
        try {
            setIsLoading(true);
            const response = await stockApi.recordStockCount(warehouseId, productId, quantity);
            toast({
                title: "Success",
                description: "Stock count recorded successfully",
            });
            return response;
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to record stock count",
                variant: "destructive",
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    const getLowStockItems = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await stockApi.getLowStockItems();
            return response;
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch low stock items",
                variant: "destructive",
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    return {
        isLoading,
        stockLevels,
        totalItems,
        totalPages,
        fetchStockLevels,
        updateStockLevel,
        recordStockCount,
        getLowStockItems
    };
};