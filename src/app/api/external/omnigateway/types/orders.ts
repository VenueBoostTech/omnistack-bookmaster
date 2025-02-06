// app/api/external/omnigateway/types/orders.ts
export interface Order {
    id: string;
    orderNumber: string;
    subtotal: number;
    total: number;
    discount: number;
    currency: string;
    exchangeRate: number;
    status: 'PENDING' | 'PAID' | 'REFUNDED' | 'CANCELLED' | 'PARTIALLY_REFUNDED';
    paymentMethod: string;
    payment: {
        status: string;
        transactionId?: string;
        paymentProviderResponse?: Record<string, any>;
    };
    source: {
        type: string;
        platform: string;
        url?: string;
        externalOrderId: string;
        externalCustomerId: string;
        externalCustomerEmail?: string;
    };
    items: OrderItem[];
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    productId?: string;
    externalProductId: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
}

export interface OrderParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
}

export interface UpdateOrderStatusPayload {
    status: Order['status'];
}

export interface AddOrderNotePayload {
    note: string;
}

export interface OrderListResponse {
    items: Order[];
    total: number;
    pages: number;
    page: number;
    limit: number;
}