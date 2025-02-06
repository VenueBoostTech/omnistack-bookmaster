// types/settings.ts
export interface Settings {
  finance: {
    fiscalYearStart: Date | null;
    defaultCurrency: string;
    taxRate: number;
    documentSettings: {
      prefix: string;
      nextNumber: number;
    };
  };
  localization: {
    language: string;
    timezone: string;
    dateFormat: string;
    currency: string;
  };
  notifications: {
    email: boolean;
    lowStock: boolean;
    transactions: boolean;
  };
  autoStockReorder: {
    enabled: boolean;
    threshold: number;
  };
  reportGeneration: {
    enabled: boolean;
    frequency: string;
    time: string;
  };
  integrations: {
    venueBoost: {
      enabled: boolean;
      apiKey?: string;
      webhookUrl?: string;
      venueShortCode?: string; 
    };
    bank: {
      enabled: boolean;
      provider?: string;
      credentials?: Record<string, any>;
    };
  };
}