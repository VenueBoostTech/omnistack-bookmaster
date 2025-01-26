"use client";

import { GeneralTab } from './GeneralTab';
import { FinanceTab } from './FinanceTab';
import { IntegrationsTab } from './IntegrationsTab';
import { AutomationTab } from './AutomationTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";
import { useClient } from '@/hooks/useClient';
import { toast } from 'react-hot-toast';
import { NotificationsTab } from './NotificationsTab';
import { LocalizationTab } from './LocalizationTab';

export function SettingsContent() {
  const { clientId } = useClient();

  const handleSave = async () => {
    try {
      // Save all settings here
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

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
          <GeneralTab />
        </TabsContent>

        <TabsContent value="finance" className="space-y-6 mt-6">
          <FinanceTab />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-6">
          <NotificationsTab />
        </TabsContent>

        <TabsContent value="localizations" className="space-y-6 mt-6">
          <LocalizationTab />
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6 mt-6">
          <IntegrationsTab />
        </TabsContent>

        <TabsContent value="automation" className="space-y-6 mt-6">
          <AutomationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}