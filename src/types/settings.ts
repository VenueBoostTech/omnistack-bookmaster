// types/settings.ts
export interface Settings {
  general: {
    name: string;
    code: string;
    taxId: string | null;
    address: string | null;
    phone: string | null;
    email: string | null;
  };
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
  integrations: {
    venueBoost: {
      enabled: boolean;
      apiKey?: string;
      webhookUrl?: string;
    };
    bank: {
      enabled: boolean;
      provider?: string;
      credentials?: Record<string, any>;
    };
  };
}