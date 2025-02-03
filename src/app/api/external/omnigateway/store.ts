// app/api/external/omnigateway/store.ts
import { createOmniGateway } from './index';
import { 
    Store, 
    StoreParams, 
    CreateStoreDto, 
    UpdateStoreDto,
    StoreListResponse,
    Country,
    State,
    City
} from './types/stores';

export const createStoreApi = (clientApiKey: string) => {
    const omniGateway = createOmniGateway(clientApiKey);

    return {
        // Store endpoints
        getStores: async (params: StoreParams = {}): Promise<StoreListResponse> => {
            const { data } = await omniGateway.get('/stores', { params });
            return data;
        },

        getStore: async (id: string): Promise<Store> => {
            const { data } = await omniGateway.get(`/stores/${id}`);
            return data;
        },

        createStore: async (store: CreateStoreDto): Promise<Store> => {
            const { data } = await omniGateway.post('/stores', store);
            return data;
        },

        updateStore: async (id: string, store: UpdateStoreDto): Promise<Store> => {
            const { data } = await omniGateway.put(`/stores/${id}`, store);
            return data;
        },

        deleteStore: async (id: string) => {
            const { data } = await omniGateway.delete(`/stores/${id}`);
            return data;
        },

        hardDeleteStore: async (id: string) => {
            const { data } = await omniGateway.delete(`/stores/${id}/hard`);
            return data;
        },

        // Location endpoints
        getCountries: async (): Promise<Country[]> => {
            const { data } = await omniGateway.get('/locations/countries');
            return data;
        },

        getStates: async (countryId: string): Promise<State[]> => {
            const { data } = await omniGateway.get(`/locations/states`, {
                params: { countryId }
            });
            return data;
        },

        getCities: async (stateId: string): Promise<City[]> => {
            const { data } = await omniGateway.get(`/locations/cities`, {
                params: { stateId }
            });
            return data;
        }
    };
};