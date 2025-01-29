// hooks/useBrands.ts
import { useState, useCallback } from 'react';
import { brandApi } from '../app/api/external/omnigateway/brand';
import { BrandParams, Brand, CreateBrandPayload, UpdateBrandApiConfig } from '../app/api/external/omnigateway/types';
import { useToast } from '@/components/ui/use-toast';

export const useBrands = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { toast } = useToast();

    const fetchBrands = useCallback(async (params: BrandParams = {}) => {
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
    }, [toast]);

    const createBrand = useCallback(async (data: CreateBrandPayload) => {
        try {
            setIsLoading(true);
            const response = await brandApi.createBrand(data);
            toast({
                title: "Success",
                description: "Brand created successfully",
            });
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
    }, [toast]);

    const updateBrand = useCallback(async (id: string, data: Partial<Brand>) => {
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
    }, [toast]);

    const updateBrandApiConfig = useCallback(async (id: string, config: UpdateBrandApiConfig) => {
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
    }, [toast]);

    const deleteBrand = useCallback(async (id: string) => {
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
    }, [toast]);

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
    };
};