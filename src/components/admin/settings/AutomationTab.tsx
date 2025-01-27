// AutomationTab.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import InputSelect from "@/components/Common/InputSelect";
import { Settings } from "@/types/settings";

const defaultSettings: Settings['automation'] = {
  autoStockReorder: {
    enabled: false,
    threshold: 20
  },
  reportGeneration: {
    enabled: false,
    frequency: 'daily',
    time: '09:00'
  }
};

interface AutomationTabProps {
  settings: Settings['automation'];
  onChange: (updatedSettings: Settings['automation']) => void;
}

export function AutomationTab({ settings, onChange }: AutomationTabProps) {
  const [localSettings, setLocalSettings] = useState<Settings['automation']>(settings || defaultSettings);

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  useEffect(() => {
    if (JSON.stringify(localSettings) !== JSON.stringify(settings)) {
      requestAnimationFrame(() => {
        onChange(localSettings);
      });
    }
  }, [localSettings, settings, onChange]);

  const handleSettingChange = (section: 'autoStockReorder' | 'reportGeneration', value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...value
      }
    }));
  };

  const toggleSection = (section: 'autoStockReorder' | 'reportGeneration') => {
    setLocalSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        enabled: !prev[section].enabled
      }
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Automated Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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
                      handleSettingChange("autoStockReorder", {
                        threshold: Number(e.target.value)
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>

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
                  value={localSettings.reportGeneration.frequency}
                  onChange={(e) =>
                    handleSettingChange("reportGeneration", {
                      frequency: e.target.value
                    })
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
                    value={localSettings.reportGeneration.time}
                    onChange={(e) =>
                      handleSettingChange("reportGeneration", {
                        time: e.target.value
                      })
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