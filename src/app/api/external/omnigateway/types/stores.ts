// app/api/external/omnigateway/types/stores.ts
export interface Country {
    id: string;
    name: string;
    code: string;
}

export interface State {
    id: string;
    name: string;
    code: string;
    countryId: string;
}

export interface City {
    id: string;
    name: string;
    stateId: string;
}

export interface Store {
    id: string;
    name: string;
    code: string;
    clientId: string;
    addressId?: string;
    address?: {
        addressLine1: string;
        addressLine2?: string;
        city: City;
        state: State;
        country: Country;
        postcode?: string;
        latitude?: number;
        longitude?: number;
    };
    externalIds?: {
        venueboostId?: string;
        [key: string]: string;
    };
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}

export interface StoreParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: 'ACTIVE' | 'INACTIVE' | 'ALL';
}

export interface CreateStoreDto {
    name: string;
    code: string;
    addressId?: string;
    cityId: string;
    stateId: string;
    countryId: string;
    addressLine1: string;
    addressLine2?: string;
    postcode?: string;
    latitude?: number;
    longitude?: number;
    externalIds?: {
        venueboostId?: string;
        [key: string]: string;
    };
}

export interface UpdateStoreDto {
    name?: string;
    code?: string;
    addressId?: string;
    cityId?: string;
    stateId?: string;
    countryId?: string;
    addressLine1?: string;
    addressLine2?: string;
    postcode?: string;
    latitude?: number;
    longitude?: number;
    externalIds?: {
        venueboostId?: string;
        [key: string]: string;
    };
    isActive?: boolean;
}

export interface StoreListResponse {
    items: Store[];
    total: number;
    pages: number;
    page: number;
    limit: number;
}