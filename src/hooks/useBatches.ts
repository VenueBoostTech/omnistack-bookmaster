// hooks/useBatches.ts
import { useState, useCallback } from 'react';
import { createBatchApi } from '../app/api/external/omnigateway/batch';
import { BatchParams, Batch, CreateBatchPayload, UpdateBatchPayload, BatchResponse, BatchMetrics } from '../app/api/external/omnigateway/types/batch';
import { useToast } from '@/components/ui/use-toast';
import { useGatewayClientApiKey } from '../hooks/useGatewayClientApiKey';

export const useBatches = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [batches, setBatches] = useState<Batch[]>([]);
   const [totalItems, setTotalItems] = useState(0);
   const [totalPages, setTotalPages] = useState(0);
   const [metrics, setMetrics] = useState<BatchMetrics | null>(null);
   
   const { toast } = useToast();
   const apiKey = useGatewayClientApiKey();
   const batchApi = createBatchApi(apiKey || '');

   const fetchBatches = useCallback(async (params: BatchParams = {}) => {
       if (!apiKey) return;
       try {
           setIsLoading(true);
           const response: BatchResponse = await batchApi.getBatches(params);
           setBatches(response.items);
           setTotalItems(response.total);
           setTotalPages(response.pages);
           return response;
       } catch (error) {
           toast({
               title: "Error",
               description: "Failed to fetch batches",
               variant: "destructive",
           });
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [toast, apiKey, batchApi]);

   const createBatch = useCallback(async (data: CreateBatchPayload) => {
       if (!apiKey) return;
       try {
           setIsLoading(true);
           const response = await batchApi.createBatch(data);
           toast({
               title: "Success",
               description: "Batch created successfully",
           });
           return response;
       } catch (error) {
           toast({
               title: "Error",
               description: "Failed to create batch",
               variant: "destructive",
           });
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [toast, apiKey, batchApi]);

   const updateBatch = useCallback(async (id: string, data: UpdateBatchPayload) => {
       if (!apiKey) return;
       try {
           setIsLoading(true);
           const response = await batchApi.updateBatch(id, data);
           toast({
               title: "Success",
               description: "Batch updated successfully",
           });
           return response;
       } catch (error) {
           toast({
               title: "Error",
               description: "Failed to update batch",
               variant: "destructive",
           });
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [toast, apiKey, batchApi]);

   const deactivateBatch = useCallback(async (id: string) => {
       if (!apiKey) return;
       try {
           setIsLoading(true);
           const response = await batchApi.deactivateBatch(id);
           toast({
               title: "Success",
               description: "Batch deactivated successfully",
           });
           return response;
       } catch (error) {
           toast({
               title: "Error",
               description: "Failed to deactivate batch",
               variant: "destructive",
           });
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [toast, apiKey, batchApi]);

   const deleteBatch = useCallback(async (id: string) => {
       if (!apiKey) return;
       try {
           setIsLoading(true);
           const response = await batchApi.deleteBatch(id);
           toast({
               title: "Success",
               description: "Batch deleted successfully",
           });
           return response;
       } catch (error) {
           toast({
               title: "Error",
               description: "Failed to delete batch",
               variant: "destructive",
           });
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [toast, apiKey, batchApi]);

   const getBatchesByProduct = useCallback(async (productId: string) => {
       if (!apiKey) return;
       try {
           setIsLoading(true);
           return await batchApi.getBatchesByProduct(productId);
       } catch (error) {
           toast({
               title: "Error",
               description: "Failed to fetch product batches",
               variant: "destructive",
           });
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [toast, apiKey, batchApi]);

   const getBatchesByWarehouse = useCallback(async (warehouseId: string) => {
       if (!apiKey) return;
       try {
           setIsLoading(true);
           return await batchApi.getBatchesByWarehouse(warehouseId);
       } catch (error) {
           toast({
               title: "Error",
               description: "Failed to fetch warehouse batches",
               variant: "destructive",
           });
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [toast, apiKey, batchApi]);

   const fetchMetrics = useCallback(async () => {
       if (!apiKey) return;
       try {
           setIsLoading(true);
           const response = await batchApi.getBatchMetrics();
           setMetrics(response);
           return response;
       } catch (error) {
           toast({
               title: "Error",
               description: "Failed to fetch batch metrics",
               variant: "destructive",
           });
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [toast, apiKey, batchApi]);

   return {
       isLoading,
       batches,
       totalItems,
       totalPages,
       metrics,
       fetchMetrics,
       fetchBatches,
       createBatch,
       updateBatch,
       deactivateBatch,
       deleteBatch,
       getBatchesByProduct,
       getBatchesByWarehouse,
   };
};