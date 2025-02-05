// hooks/useStores.ts
import { useState, useCallback, useMemo, useEffect } from 'react';
import { createStoreApi } from '../app/api/external/omnigateway/store';
import { Store, StoreParams, CreateStoreDto, UpdateStoreDto, Country, State, City } from '../app/api/external/omnigateway/types/stores';
import { useGatewayClientApiKey } from '../hooks/useGatewayClientApiKey';
import toast from 'react-hot-toast';

export const useStores = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [stores, setStores] = useState<Store[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // Location states
    const [countries, setCountries] = useState<Country[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    
    const { apiKey, error: apiKeyError } = useGatewayClientApiKey();
    const storeApi = useMemo(() => apiKey ? createStoreApi(apiKey) : null, [apiKey]);

    // Initial fetch when API is ready
    useEffect(() => {
        if (storeApi) {
            fetchStores().catch(console.error);
            fetchCountries().catch(console.error);
        }
    }, [storeApi]);

    const fetchStores = useCallback(async (params: StoreParams = {}) => {
        if (!storeApi) return;
        
        try {
            setIsLoading(true);
            const response = await storeApi.getStores(params);
            setStores(response.items || []);
            setTotalItems(response.total);
            setTotalPages(response.pages);
            return response;
        } catch (error) {
            console.error('Error fetching stores:', error);
            setStores([]);
            if (storeApi) {
                toast.error('Failed to fetch stores');
            }
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [storeApi]);

    const createStore = useCallback(async (data: CreateStoreDto) => {
        if (!storeApi) {
            throw new Error('Service not ready');
        }
        try {
            setIsLoading(true);
            const response = await storeApi.createStore(data);
            await fetchStores();
            toast.success('Store created successfully');
            return response;
        } catch (error) {
            toast.error('Failed to create store');
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [storeApi, fetchStores]);

    const updateStore = useCallback(async (id: string, data: UpdateStoreDto) => {
        if (!storeApi) {
            throw new Error('Service not ready');
        }
        try {
            setIsLoading(true);
            const response = await storeApi.updateStore(id, data);
            toast.success('Store updated successfully');
            await fetchStores();
            return response;
        } catch (error) {
            toast.error('Failed to update store');
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [storeApi, fetchStores]);

    const deleteStore = useCallback(async (id: string) => {
        if (!storeApi) {
            throw new Error('Service not ready');
        }
        try {
            setIsLoading(true);
            const response = await storeApi.hardDeleteStore(id);
            toast.success('Store deleted successfully');
            await fetchStores();
            return response;
        } catch (error) {
            toast.error('Failed to delete store');
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [storeApi, fetchStores]);

    const deactivateStore = useCallback(async (id: string) => {
        if (!storeApi) {
            throw new Error('Service not ready');
        }
        try {
            setIsLoading(true);
            const response = await storeApi.deleteStore(id);
            toast.success('Store deactivated successfully');
            await fetchStores();
            return response;
        } catch (error) {
            toast.error('Failed to deactivate store');
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [storeApi, fetchStores]);

    const fetchCountries = useCallback(async () => {
        if (!storeApi) return;
        try {
            const data = await storeApi.getCountries();
            setCountries(data);
            return data;
        } catch (error) {
            console.error('Error fetching countries:', error);
            throw error;
        }
    }, [storeApi]);

    const fetchStatesForCountry = useCallback(async (countryId: string) => {
        if (!storeApi) return;
        try {
            const data = await storeApi.getStates(countryId);
            setStates(data);
            return data;
        } catch (error) {
            console.error('Error fetching states:', error);
            throw error;
        }
    }, [storeApi]);

    const fetchCitiesForState = useCallback(async (stateId: string) => {
        if (!storeApi) return;
        try {
            const data = await storeApi.getCities(stateId);
            setCities(data);
            return data;
        } catch (error) {
            console.error('Error fetching cities:', error);
            throw error;
        }
    }, [storeApi]);

    return {
        isLoading,
        stores: stores || [],
        totalItems,
        totalPages,
        countries,
        states,
        cities,
        fetchStores,
        createStore,
        updateStore,
        deleteStore,
        deactivateStore,
        fetchCountries,
        fetchStatesForCountry,
        fetchCitiesForState,
        apiKeyError,
        isInitialized: !!storeApi,
    };
};