// hooks/useStockOperation.ts
import { useState, useCallback } from 'react';
import { stockApi } from '../app/api/external/omnigateway/stock';
import { useToast } from '@/components/ui/use-toast';
import {
    StockOperation,
    StockOperationParams,
    CreateOperationPayload,
    OperationType
} from '../app/api/external/omnigateway/types/stock';

export const useStockOperation = (type?: OperationType) => {
    const [isLoading, setIsLoading] = useState(false);
    const [operations, setOperations] = useState<StockOperation[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { toast } = useToast();

    const fetchOperations = useCallback(async (params: StockOperationParams = {}) => {
        try {
            setIsLoading(true);
            let response;
            
            switch (type) {
                case OperationType.PURCHASE:
                    response = await stockApi.getStockIn(params);
                    break;
                case OperationType.SALE:
                    response = await stockApi.getStockOut(params);
                    break;
                case OperationType.TRANSFER:
                    response = await stockApi.getTransfers(params);
                    break;
                case OperationType.ADJUSTMENT:
                    response = await stockApi.getAdjustments(params);
                    break;
                default:
                    response = await stockApi.getOperations(params);
            }

            setOperations(response.items);
            setTotalItems(response.total);
            setTotalPages(response.pages);
            return response;
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch operations",
                variant: "destructive",
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [type, toast]);

    const createOperation = useCallback(async (data: CreateOperationPayload) => {
        try {
            setIsLoading(true);
            let response;

            switch (type) {
                case OperationType.PURCHASE:
                    response = await stockApi.createStockIn(data);
                    break;
                case OperationType.SALE:
                    response = await stockApi.createStockOut(data);
                    break;
                case OperationType.TRANSFER:
                    response = await stockApi.createTransfer(data);
                    break;
                case OperationType.ADJUSTMENT:
                    response = await stockApi.createAdjustment(data);
                    break;
                default:
                    response = await stockApi.createOperation(data);
            }

            toast({
                title: "Success",
                description: "Operation created successfully",
            });
            return response;
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create operation",
                variant: "destructive",
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [type, toast]);

    const completeOperation = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            const response = await stockApi.completeOperation(id);
            toast({
                title: "Success",
                description: "Operation completed successfully",
            });
            return response;
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to complete operation",
                variant: "destructive",
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    const cancelOperation = useCallback(async (id: string, reason?: string) => {
        try {
            setIsLoading(true);
            const response = await stockApi.cancelOperation(id, reason);
            toast({
                title: "Success",
                description: "Operation cancelled successfully",
            });
            return response;
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to cancel operation",
                variant: "destructive",
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    return {
        isLoading,
        operations,
        totalItems,
        totalPages,
        fetchOperations,
        createOperation,
        completeOperation,
        cancelOperation
    };
};
