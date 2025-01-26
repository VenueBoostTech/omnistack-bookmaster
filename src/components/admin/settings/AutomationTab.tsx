"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import InputSelect from "@/components/Common/InputSelect";
import { AutomationSettings } from "@/types/settings";

interface AutomationTabProps {
  initialSettings: AutomationSettings;
  onChange: (updatedSettings: AutomationSettings) => void;
}

export function AutomationTab({ initialSettings, onChange }: AutomationTabProps) {
  const [localSettings, setLocalSettings] = useState<AutomationSettings>(initialSettings);

  useEffect(() => {
    setLocalSettings(initialSettings); // Sync with parent settings
  }, [initialSettings]);

  const handleSettingChange = (section: keyof AutomationSettings, key: string, value: any) => {
    const updatedSettings = {
      ...localSettings,
      [section]: {
        ...localSettings[section],
        [key]: value,
      },
    };
    setLocalSettings(updatedSettings);
    onChange(updatedSettings); // Notify parent of changes
  };

  const toggleSection = (section: keyof AutomationSettings) => {
    const updatedSettings = {
      ...localSettings,
      [section]: {
        ...localSettings[section],
        enabled: !localSettings[section].enabled,
      },
    };
    setLocalSettings(updatedSettings);
    onChange(updatedSettings);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Automated Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Auto Stock Reorder */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Auto Stock Reorder</div>
                <div className="text-sm text-muted-foreground">
                  Automatically create purchase orders for low stock
                </div>
              </div>
              <Switch
                checked={localSettings.autoStockReorder.enabled}
                onCheckedChange={() => toggleSection("autoStockReorder")}
              />
            </div>
            {localSettings.autoStockReorder.enabled && (
              <div className="pl-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Threshold Percentage (%)</label>
                  <Input
                    type="number"
                    value={localSettings.autoStockReorder.threshold}
                    onChange={(e) =>
                      handleSettingChange(
                        "autoStockReorder",
                        "threshold",
                        Number(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            )}
          </div>

          {/* Daily Backup */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Daily Backup</div>
                <div className="text-sm text-muted-foreground">
                  Automatic daily data backup
                </div>
              </div>
              <Switch
                checked={localSettings.dailyBackup.enabled}
                onCheckedChange={() => toggleSection("dailyBackup")}
              />
            </div>
            {localSettings.dailyBackup.enabled && (
              <div className="pl-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Backup Time</label>
                  <Input
                    type="time"
                    value={localSettings.dailyBackup.time}
                    onChange={(e) =>
                      handleSettingChange("dailyBackup", "time", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Retention Period (days)</label>
                  <Input
                    type="number"
                    value={localSettings.dailyBackup.retentionDays}
                    onChange={(e) =>
                      handleSettingChange(
                        "dailyBackup",
                        "retentionDays",
                        Number(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            )}
          </div>

          {/* Report Generation */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Report Generation</div>
                <div className="text-sm text-muted-foreground">
                  Schedule automated reports
                </div>
              </div>
              <Switch
                checked={localSettings.reportGeneration.enabled}
                onCheckedChange={() => toggleSection("reportGeneration")}
              />
            </div>
            {localSettings.reportGeneration.enabled && (
              <div className="pl-6 space-y-4">
                <InputSelect
                  name="frequency"
                  label="Frequency"
                  value={localSettings.reportGeneration.schedule.frequency}
                  onChange={(e) =>
                    handleSettingChange(
                      "reportGeneration",
                      "schedule",
                      {
                        ...localSettings.reportGeneration.schedule,
                        frequency: e.target.value as "daily" | "weekly" | "monthly",
                      }
                    )
                  }
                  options={[
                    { value: "daily", label: "Daily" },
                    { value: "weekly", label: "Weekly" },
                    { value: "monthly", label: "Monthly" },
                  ]}
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Input
                    type="time"
                    value={localSettings.reportGeneration.schedule.time}
                    onChange={(e) =>
                      handleSettingChange(
                        "reportGeneration",
                        "schedule",
                        {
                          ...localSettings.reportGeneration.schedule,
                          time: e.target.value,
                        }
                      )
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
