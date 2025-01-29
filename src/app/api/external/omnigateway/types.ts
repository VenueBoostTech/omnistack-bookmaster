import { Currency } from "@prisma/client";

// inventory-adjustments
export interface AdjustmentParams {
    page: number;
    pageSize: number;
    status?: string;
}

export interface CreateAdjustmentPayload {
    productId: string;
    warehouseId: string;
    quantity: number;
    type: 'add' | 'subtract' | 'set';
    reason: string;
}

// brands
export interface Brand {
    id: string;
    name: string;
    description?: string;
    code: string;
    status: 'ACTIVE' | 'INACTIVE';
    apiConfig?: {
        apiKey?: string;
        apiSecret?: string;
        endpoint?: string;
    };
    totalProducts: number;
    lastSync?: string;
    createdAt: string;
    updatedAt: string;
}

export interface BrandParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
}

export interface CreateBrandPayload {
    name: string;
    description?: string;
    apiConfig?: {
        apiKey?: string;
        apiSecret?: string;
        endpoint?: string;
    };
}

export interface UpdateBrandApiConfig {
    apiKey?: string;
    apiSecret?: string;
    endpoint?: string;
}

// products
export interface ProductParams {
    page?: number;
    limit?: number;
    search?: string;
    brandId?: string;
    clientId?: string;
}

export interface CreateProductPayload {
    name: string;
    code: string;
    price: number;
    currency: Currency;
    useExternalRates?: boolean;
    hasVariations?: boolean;
    dimensions?: {
        weight: number;
        length: number;
        width: number;
        height: number;
    };
    translations?: Record<string, string>;
    tags?: string[];
    parent?: {
        id: string;
        type: string;
    };
    isFeatured?: boolean;
    isBestSeller?: boolean;
    menuOrder?: number;
    brandId?: string;
    barcode?: string;
}

export interface Product {
    id: string;
    name: string;
    prices: Record<Currency, number>;
    defaultCurrency: Currency;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {
    isActive?: boolean;
    externalId?: string;
    imagePath?: string;
    imageThumbnailPath?: string;
    gallery?: string[];
    imageMetadata?: {
        width: number;
        height: number;
        format: string;
        size: number;
    };
}

// warehouse locations
export interface CreateLocationPayload {
    name: string;
    code: string;
    type: string;
}

export interface UpdateLocationPayload {
    name?: string;
    code?: string;
    type?: string;
}

// imports
export interface SimpleImportProductsPayload {
    file: File;
    type: string;
    brandId: string;
}

export interface CreateWarehousePayload {
  name: string;
  address?: string;
  type?: string;
  status?: 'active' | 'inactive';
}

export interface UpdateWarehousePayload {
  name?: string;
  address?: string;
  type?: string;
  status?: 'active' | 'inactive';
}

