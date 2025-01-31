import { useState, useCallback, useMemo, useEffect } from 'react';
import { createBrandApi } from '../app/api/external/omnigateway/brand';
import { BrandParams, Brand, CreateBrandPayload, UpdateBrandApiConfig } from '../app/api/external/omnigateway/types';
import { useGatewayClientApiKey } from '../hooks/useGatewayClientApiKey';
import toast from 'react-hot-toast';

export const useBrands = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [brands, setBrands] = useState<Brand[]>([]);
   const [totalItems, setTotalItems] = useState(0);
   const [totalPages, setTotalPages] = useState(0);
   
   const { apiKey, error: apiKeyError } = useGatewayClientApiKey();
   const brandApi = useMemo(() => apiKey ? createBrandApi(apiKey) : null, [apiKey]);

   // Initial fetch when API is ready
   useEffect(() => {
       if (brandApi) {
           fetchBrands().catch(console.error);
       }
   }, [brandApi]);

   const fetchBrands = useCallback(async (params: BrandParams = {}) => {
       // Silently return if API isn't ready yet
       if (!brandApi) return;
       
       try {
           setIsLoading(true);
           const response = await brandApi.getBrands(params);
           setBrands(response.items || []);
           setTotalItems(response.total);
           setTotalPages(response.pages);
           return response;
       } catch (error) {
           console.error('Error fetching brands:', error);
           setBrands([]);
           // Only show error toast for actual API errors, not initialization
           if (brandApi) {
               toast.error('Failed to fetch brands');
           }
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [brandApi]);

   const createBrand = useCallback(async (data: CreateBrandPayload) => {
       if (!brandApi) {
           throw new Error('Service not ready');
       }
       try {
           setIsLoading(true);
           const response = await brandApi.createBrand(data);
           await fetchBrands();
           return response;
       } catch (error) {
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [brandApi, fetchBrands]);

   const updateBrand = useCallback(async (id: string, data: Partial<Brand>) => {
       if (!brandApi) {
           throw new Error('Service not ready');
       }
       try {
           setIsLoading(true);
           const response = await brandApi.updateBrand(id, data);
           toast.success('Brand updated successfully');
           await fetchBrands();
           return response;
       } catch (error) {
           toast.error('Failed to update brand');
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [brandApi, fetchBrands]);

   const updateBrandApiConfig = useCallback(async (id: string, config: UpdateBrandApiConfig) => {
       if (!brandApi) {
           throw new Error('Service not ready');
       }
       try {
           setIsLoading(true);
           const response = await brandApi.updateBrandApiConfig(id, config);
           await fetchBrands();
           return response;
       } catch (error) {
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [brandApi, fetchBrands]);

   const deleteBrand = useCallback(async (id: string) => {
       if (!brandApi) {
           throw new Error('Service not ready');
       }
       try {
           setIsLoading(true);
           const response = await brandApi.deleteBrand(id);
           toast.success('Brand deleted successfully');
           await fetchBrands();
           return response;
       } catch (error) {
           toast.error('Failed to delete brand');
           throw error;
       } finally {
           setIsLoading(false);
       }
   }, [brandApi, fetchBrands]);

    const syncBrandProducts = useCallback(async (brandId: string) => {
        if (!brandApi) {
            throw new Error('Service not ready');
        }
        try {
            setIsLoading(true);
            const response = await brandApi.syncProducts(brandId);
            toast.success('Products sync started successfully');
            return response;
        } catch (error) {
            toast.error('Error on syncing the products');
            // Don't show error toast here since it's shown in the component
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [brandApi]);

   return {
       isLoading,
       brands: brands || [],
       totalItems,
       totalPages,
       fetchBrands,
       createBrand,
       updateBrand,
       updateBrandApiConfig,
       deleteBrand,
       syncBrandProducts,
       apiKeyError,
       isInitialized: !!brandApi,
   };
};