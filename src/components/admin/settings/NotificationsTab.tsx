"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { NotificationSettings } from "@/types/settings";

interface NotificationsTabProps {
  initialSettings: NotificationSettings;
  onChange: (updatedSettings: NotificationSettings) => void;
}

export function NotificationsTab({ initialSettings, onChange }: NotificationsTabProps) {
  const [localSettings, setLocalSettings] = useState<NotificationSettings>(initialSettings);

  useEffect(() => {
    setLocalSettings(initialSettings); // Sync local state with parent settings
  }, [initialSettings]);

  const toggleSetting = (setting: keyof NotificationSettings) => {
    setLocalSettings((prev) => {
      const updatedSettings = { ...prev, [setting]: !prev[setting] };
      onChange(updatedSettings); // Notify parent about the changes
      return updatedSettings;
    });
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
              checked={localSettings.emailNotifications}
              onCheckedChange={() => toggleSetting("emailNotifications")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Low Stock Alerts</div>
              <div className="text-sm text-muted-foreground">Get notified when inventory is low</div>
            </div>
            <Switch
              checked={localSettings.lowStockAlerts}
              onCheckedChange={() => toggleSetting("lowStockAlerts")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Transaction Alerts</div>
              <div className="text-sm text-muted-foreground">Notifications for important transactions</div>
            </div>
            <Switch
              checked={localSettings.transactionAlerts}
              onCheckedChange={() => toggleSetting("transactionAlerts")}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
