"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Settings } from "@/types/settings";

interface NotificationsTabProps {
  settings: Settings['notifications'];
  onChange: (updatedSettings: Settings['notifications']) => void;
}

const defaultSettings: Settings['notifications'] = {
  email: false,
  lowStock: false,
  transactions: false
};

export function NotificationsTab({ settings, onChange }: NotificationsTabProps) {
  const [localSettings, setLocalSettings] = useState<Settings['notifications']>(settings || defaultSettings);

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  useEffect(() => {
    // Only call onChange if localSettings is different from settings
    if (JSON.stringify(localSettings) !== JSON.stringify(settings)) {
      onChange(localSettings);
    }
  }, [localSettings, settings, onChange]);

  const toggleSetting = (setting: keyof Settings['notifications']) => {
    setLocalSettings((prev) => ({
      ...defaultSettings,
      ...prev,
      [setting]: !(prev?.[setting] ?? false)
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Email Notifications</div>
              <div className="text-sm text-muted-foreground">Receive daily summaries and alerts</div>
            </div>
            <Switch
              checked={localSettings.email ?? false}
              onCheckedChange={() => toggleSetting("email")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Low Stock Alerts</div>
              <div className="text-sm text-muted-foreground">Get notified when inventory is low</div>
            </div>
            <Switch
              checked={localSettings.lowStock ?? false}
              onCheckedChange={() => toggleSetting("lowStock")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Transaction Alerts</div>
              <div className="text-sm text-muted-foreground">Notifications for important transactions</div>
            </div>
            <Switch
              checked={localSettings.transactions ?? false}
              onCheckedChange={() => toggleSetting("transactions")}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}