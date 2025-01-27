// hooks/useStockMovement.ts
import { useState, useCallback } from 'react';
import { stockApi } from '../app/api/external/omnigateway/stock';
import { useToast } from '@/components/ui/use-toast';
import {
    StockMovement,
    StockMovementParams
} from '../app/api/external/omnigateway/types/stock';

export const useStockMovement = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [movements, setMovements] = useState<StockMovement[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { toast } = useToast();

    const fetchMovements = useCallback(async (params: StockMovementParams = {}) => {
        try {
            setIsLoading(true);
            const response = await stockApi.getStockMovements(params);
            setMovements(response.items);
            setTotalItems(response.total);
            setTotalPages(response.pages);
            return response;
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch stock movements",
                variant: "destructive",
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    const fetchProductMovements = useCallback(async (
        productId: string,
        params: { startDate?: string; endDate?: string } = {}
    ) => {
        try {
            setIsLoading(true);
            const response = await stockApi.getProductMovements(productId, params);
            return response;
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch product movements",
                variant: "destructive",
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    const fetchWarehouseMovements = useCallback(async (
        warehouseId: string,
        params: { startDate?: string; endDate?: string } = {}
    ) => {
        try {
            setIsLoading(true);
            const response = await stockApi.getWarehouseMovements(warehouseId, params);
            return response;
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch warehouse movements",
                variant: "destructive",
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    return {
        isLoading,
        movements,
        totalItems,
        totalPages,
        fetchMovements,
        fetchProductMovements,
        fetchWarehouseMovements
    };
};