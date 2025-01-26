// types/settings.ts
export interface GeneralSettings {
    companyName: string;
    taxId: string;
    address: string;
    phone: string;
  }

  export interface LocalizationSettings {
    language: string;
    currency: string;
    dateFormat: string;
    timezone: string;
   }
   
   export interface NotificationSettings {
    emailNotifications: boolean;
    lowStockAlerts: boolean;
    transactionAlerts: boolean;
   }

   export interface FinanceSettings {
    fiscalYearStart: string;
    taxRate: number;
    autoPostTransactions: boolean;
    trackCostCenters: boolean;
    documentSettings: {
      invoicePrefix: string;
      nextInvoiceNumber: number;
    }
   }

   export interface IntegrationSettings {
    venueBoost: {
      apiKey?: string;
      enabled: boolean;
      lastSync?: Date;
      webhookUrl?: string;
    };
    bankIntegration: {
      bankId?: string;
      accountId?: string;
      enabled: boolean;
      lastSync?: Date;
    };
    webhooks: {
      endpoints: {
        url: string;
        secret: string;
        events: string[];
        enabled: boolean;
      }[];
    };
   }

   export interface AutomationSettings {
    autoStockReorder: {
      enabled: boolean;
      threshold: number;
      suppliers: string[];
    };
    dailyBackup: {
      enabled: boolean;
      time: string;
      retentionDays: number;
    };
    reportGeneration: {
      enabled: boolean;
      schedule: {
        frequency: 'daily' | 'weekly' | 'monthly';
        day?: number;
        time: string;
      };
      reports: string[];
    };
   }
      
   export interface Settings {
    general: GeneralSettings;
    localization: LocalizationSettings;
    notifications: NotificationSettings;
    finance: FinanceSettings;
    integrations: IntegrationSettings;
    automation: AutomationSettings;
  }
  