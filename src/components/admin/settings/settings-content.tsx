"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { GeneralTab } from "./GeneralTab";
import { FinanceTab } from "./FinanceTab";
import { useSettings } from "@/hooks/useSettings";
import { NotificationsTab } from "./NotificationsTab";
import { LocalizationTab } from "./LocalizationTab";
import { IntegrationsTab } from "./IntegrationsTab";
import { AutomationTab } from "./AutomationTab";
import { Settings } from "@/types/settings";

export function SettingsContent() {
  const { settings, updateSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState<Settings | null>(null);

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  const handleSave = async () => {
    try {
      if (!localSettings) {
        throw new Error("No settings available to save");
      }
      await updateSettings(localSettings);
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save settings");
    }
  };

  if (!localSettings) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your company settings and preferences
          </p>
        </div>
        <Button onClick={handleSave} style={{ backgroundColor: "#5FC4D0" }}>
          <SaveIcon className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
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
            settings={localSettings?.general}
            onChange={(updated) => setLocalSettings({ ...localSettings, general: updated })}
          />
        </TabsContent>

        <TabsContent value="finance" className="space-y-6 mt-6">
          <FinanceTab
            settings={localSettings?.finance}
            onChange={(updated) => setLocalSettings({ ...localSettings, finance: updated })}
          />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-6">
          <NotificationsTab
            settings={localSettings?.notifications}
            onChange={(updated) => setLocalSettings({ ...localSettings, notifications: updated })}
          />
        </TabsContent>

        <TabsContent value="localizations" className="space-y-6 mt-6">
          <LocalizationTab
            settings={localSettings?.localization}
            onChange={(updated) => setLocalSettings({ ...localSettings, localization: updated })}
          />
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6 mt-6">
          <IntegrationsTab
            settings={localSettings?.integrations}
            onChange={(updated) => setLocalSettings({ ...localSettings, integrations: updated })}
          />
        </TabsContent>

        <TabsContent value="automation" className="space-y-6 mt-6">
          <AutomationTab
            settings={localSettings?.automation}
            onChange={(updated) => setLocalSettings({ ...localSettings, automation: updated })}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}