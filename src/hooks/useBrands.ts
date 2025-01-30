// hooks/useBrands.ts
import { useState, useCallback, useEffect, useMemo } from 'react';
import { createBrandApi } from '../app/api/external/omnigateway/brand';
import { BrandParams, Brand, CreateBrandPayload, UpdateBrandApiConfig } from '../app/api/external/omnigateway/types';
import { useToast } from '@/components/ui/use-toast';
import { useGatewayClientApiKey } from '../hooks/useGatewayClientApiKey';

export const useBrands = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [brands, setBrands] = useState<Brand[]>([]);
   const [totalItems, setTotalItems] = useState(0);
   const [totalPages, setTotalPages] = useState(0);
   
   const { toast } = useToast();
   const { apiKey, error: apiKeyError } = useGatewayClientApiKey();
   
   // Move brandApi creation to useMemo to prevent unnecessary recreations
   const brandApi = useMemo(() => createBrandApi(apiKey || ''), [apiKey]);

   // Handle API key error only when it changes
   useEffect(() => {
       if (apiKeyError) {
           toast({
               title: "Error",
               description: "Failed to fetch API key",
               variant: "destructive",
           });
       }
   }, [apiKeyError, toast]);

   const fetchBrands = useCallback(async (params: BrandParams = {}) => {
       if (!apiKey) {
           toast({
               title: "Error",
               description: "API key not available",
               variant: "destructive",
           });
           return;
       }
       try {
           setIsLoading(true);
           const response = await brandApi.getBrands(params);
           setBrands(response.items);
           setTotalItems(response.total);
           setTotalPages(response.pages);
           return response;
       } catch (error) {
           toast({
               title: "Error",
               description: "Failed to fetch brands",
               variant: "destructive",
           });
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [apiKey, brandApi, toast]);

   const createBrand = useCallback(async (data: CreateBrandPayload) => {
       if (!apiKey) {
           toast({
               title: "Error",
               description: "API key not available",
               variant: "destructive",
           });
           return;
       }
       try {
           setIsLoading(true);
           const response = await brandApi.createBrand(data);
           // Don't show success toast here as it's already shown in the modal
           return response;
       } catch (error) {
           toast({
               title: "Error",
               description: "Failed to create brand",
               variant: "destructive",
           });
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [apiKey, brandApi, toast]);

   const updateBrand = useCallback(async (id: string, data: Partial<Brand>) => {
       if (!apiKey) {
           toast({
               title: "Error",
               description: "API key not available",
               variant: "destructive",
           });
           return;
       }
       try {
           setIsLoading(true);
           const response = await brandApi.updateBrand(id, data);
           toast({
               title: "Success",
               description: "Brand updated successfully",
           });
           return response;
       } catch (error) {
           toast({
               title: "Error",
               description: "Failed to update brand",
               variant: "destructive",
           });
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [apiKey, brandApi, toast]);

   const updateBrandApiConfig = useCallback(async (id: string, config: UpdateBrandApiConfig) => {
       if (!apiKey) {
           toast({
               title: "Error",
               description: "API key not available",
               variant: "destructive",
           });
           return;
       }
       try {
           setIsLoading(true);
           const response = await brandApi.updateBrandApiConfig(id, config);
           toast({
               title: "Success",
               description: "API configuration updated successfully",
           });
           return response;
       } catch (error) {
           toast({
               title: "Error",
               description: "Failed to update API configuration",
               variant: "destructive",
           });
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [apiKey, brandApi, toast]);

   const deleteBrand = useCallback(async (id: string) => {
       if (!apiKey) {
           toast({
               title: "Error",
               description: "API key not available",
               variant: "destructive",
           });
           return;
       }
       try {
           setIsLoading(true);
           const response = await brandApi.deleteBrand(id);
           toast({
               title: "Success",
               description: "Brand deleted successfully",
           });
           return response;
       } catch (error) {
           toast({
               title: "Error",
               description: "Failed to delete brand",
               variant: "destructive",
           });
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [apiKey, brandApi, toast]);

   return {
       isLoading,
       brands,
       totalItems,
       totalPages,
       fetchBrands,
       createBrand,
       updateBrand,
       updateBrandApiConfig,
       deleteBrand,
       apiKeyError,
   };
};