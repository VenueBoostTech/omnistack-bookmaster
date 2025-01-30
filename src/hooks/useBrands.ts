// hooks/useBrands.ts
import { useState, useCallback, useMemo } from 'react';
import { createBrandApi } from '../app/api/external/omnigateway/brand';
import { BrandParams, Brand, CreateBrandPayload, UpdateBrandApiConfig } from '../app/api/external/omnigateway/types';
import { useGatewayClientApiKey } from '../hooks/useGatewayClientApiKey';

export const useBrands = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [brands, setBrands] = useState<Brand[]>([]);
   const [totalItems, setTotalItems] = useState(0);
   const [totalPages, setTotalPages] = useState(0);
   
   const { apiKey, error: apiKeyError } = useGatewayClientApiKey();
   
   const brandApi = useMemo(() => createBrandApi(apiKey || ''), [apiKey]);

   const fetchBrands = useCallback(async (params: BrandParams = {}) => {
       if (!apiKey) {
           throw new Error('API key not available');
       }
       try {
           setIsLoading(true);
           const response = await brandApi.getBrands(params);
           setBrands(response.items);
           setTotalItems(response.total);
           setTotalPages(response.pages);
           return response;
       } catch (error) {
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [apiKey, brandApi]);

   const createBrand = useCallback(async (data: CreateBrandPayload) => {
       if (!apiKey) {
           throw new Error('API key not available');
       }
       try {
           setIsLoading(true);
           const response = await brandApi.createBrand(data);
           return response;
       } catch (error) {
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [apiKey, brandApi]);

   const updateBrand = useCallback(async (id: string, data: Partial<Brand>) => {
       if (!apiKey) {
           throw new Error('API key not available');
       }
       try {
           setIsLoading(true);
           const response = await brandApi.updateBrand(id, data);
           return response;
       } catch (error) {
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [apiKey, brandApi]);

   const updateBrandApiConfig = useCallback(async (id: string, config: UpdateBrandApiConfig) => {
       if (!apiKey) {
           throw new Error('API key not available');
       }
       try {
           setIsLoading(true);
           const response = await brandApi.updateBrandApiConfig(id, config);
           return response;
       } catch (error) {
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [apiKey, brandApi]);

   const deleteBrand = useCallback(async (id: string) => {
       if (!apiKey) {
           throw new Error('API key not available');
       }
       try {
           setIsLoading(true);
           const response = await brandApi.deleteBrand(id);
           return response;
       } catch (error) {
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [apiKey, brandApi]);

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