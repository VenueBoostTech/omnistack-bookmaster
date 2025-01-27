"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SaveIcon, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import { GeneralTab } from "./GeneralTab";
import { FinanceTab } from "./FinanceTab";
import { useSettings } from "@/hooks/useSettings";
import { NotificationsTab } from "./NotificationsTab";
import { LocalizationTab } from "./LocalizationTab";
import { IntegrationsTab } from "./IntegrationsTab";
import { AutomationTab } from "./AutomationTab";
import { Settings } from "@/types/settings";
import { useRouter } from "next/navigation";

export function SettingsContent() {
  const router = useRouter();
  const { settings, updateSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState<Settings | null>(null);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleTabChange = (section: keyof Settings, updatedSection: any) => {
    if (localSettings) {
      setLocalSettings({
        ...localSettings,
        [section]: updatedSection,
      });
    }
  };

  const handleSave = async () => {
    try {
      if (!localSettings) {
        throw new Error("No settings available to save");
      }
  
      for (const section of Object.keys(localSettings) as (keyof Settings)[]) {
        const sectionData = localSettings[section];
        if (sectionData) {
          await updateSettings(section, sectionData);
        }
      }
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save settings");
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your company settings and preferences. For personal information updates, visit the profile page.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
          variant="outline" 
          onClick={() => router.push('/admin/profile')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Profile
        </Button>
        <Button onClick={handleSave} style={{ backgroundColor: "#5FC4D0" }}>
          <SaveIcon className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
        </div>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="localizations">Localizations</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-6">
          <GeneralTab
            initialSettings={localSettings?.general || { companyName: '', taxId: '', address: '', phone: '' }}
            onChange={(updatedGeneral) => handleTabChange("general", updatedGeneral)}
          />
        </TabsContent>
        <TabsContent value="finance" className="space-y-6 mt-6">
          <FinanceTab
            initialSettings={localSettings?.finance || {
              fiscalYearStart: "01",
              taxRate: 20,
              autoPostTransactions: true,
              trackCostCenters: false,
              documentSettings: {
                invoicePrefix: "INV-",
                nextInvoiceNumber: 1001,
              },
            }}
            onChange={(updatedFinance) => handleTabChange("finance", updatedFinance)}
          />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-6">
          <NotificationsTab
            initialSettings={localSettings?.notifications || {
              emailNotifications: true,
              lowStockAlerts: true,
              transactionAlerts: true,
            }}
            onChange={(updatedNotifications) => handleTabChange("notifications", updatedNotifications)}
          />
        </TabsContent>

        <TabsContent value="localizations" className="space-y-6 mt-6">
          <LocalizationTab
            initialSettings={localSettings?.localization || {
              language: "en",
              currency: "ALL",
              dateFormat: "dd/mm/yyyy",
              timezone: "europe-tirana",
            }}
            onChange={(updatedLocalization) => handleTabChange("localization", updatedLocalization)}
          />
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6 mt-6">
          <IntegrationsTab
            initialSettings={localSettings?.integrations || {
              venueBoost: { enabled: false },
              bankIntegration: { enabled: false },
              webhooks: { endpoints: [] },
            }}
            onChange={(updatedIntegrations) => handleTabChange("integrations", updatedIntegrations)}
          />
        </TabsContent>

        <TabsContent value="automation" className="space-y-6 mt-6">
          <AutomationTab
            initialSettings={localSettings?.automation || {
              autoStockReorder: {
                enabled: false,
                threshold: 10,
                suppliers: [],
              },
              dailyBackup: {
                enabled: true,
                time: "00:00",
                retentionDays: 30,
              },
              reportGeneration: {
                enabled: false,
                schedule: {
                  frequency: "daily",
                  time: "06:00",
                },
                reports: [],
              },
            }}
            onChange={(updatedAutomation) => handleTabChange("automation", updatedAutomation)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}