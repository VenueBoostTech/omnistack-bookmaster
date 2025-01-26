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
  