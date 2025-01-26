"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import InputSelect from "@/components/Common/InputSelect";
import { FinanceSettings } from "@/types/settings";

const FISCAL_YEAR_OPTIONS = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

interface FinanceTabProps {
  initialSettings: FinanceSettings;
  onChange: (updatedSettings: FinanceSettings) => void;
}

export function FinanceTab({ initialSettings, onChange }: FinanceTabProps) {
  const [localSettings, setLocalSettings] = useState(initialSettings);

  useEffect(() => {
    setLocalSettings(initialSettings);
  }, [initialSettings]);

  const handleChange = (field: keyof FinanceSettings) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSettings = {
      ...localSettings,
      [field]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
    };
    setLocalSettings(updatedSettings);
    onChange(updatedSettings);
  };

  const handleDocumentSettingChange = (field: keyof FinanceSettings["documentSettings"]) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedSettings = {
      ...localSettings,
      documentSettings: {
        ...localSettings.documentSettings,
        [field]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
      },
    };
    setLocalSettings(updatedSettings);
    onChange(updatedSettings);
  };

  const toggleSetting = (setting: keyof FinanceSettings) => {
    const updatedSettings = {
      ...localSettings,
      [setting]: !localSettings[setting],
    };
    setLocalSettings(updatedSettings);
    onChange(updatedSettings);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Accounting Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputSelect
              name="fiscalYear"
              label="Fiscal Year Start"
              options={FISCAL_YEAR_OPTIONS}
              value={localSettings.fiscalYearStart}
              onChange={(e) => handleChange("fiscalYearStart")(e as React.ChangeEvent<HTMLInputElement>)}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">Tax Rate (%)</label>
              <Input type="number" value={localSettings.taxRate} onChange={handleChange("taxRate")} />
            </div>
          </div>

          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Auto-post Transactions</div>
                <div className="text-sm text-muted-foreground">Automatically post verified transactions</div>
              </div>
              <Switch
                checked={localSettings.autoPostTransactions}
                onCheckedChange={() => toggleSetting("autoPostTransactions")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Track Cost Centers</div>
                <div className="text-sm text-muted-foreground">Enable cost center tracking</div>
              </div>
              <Switch checked={localSettings.trackCostCenters} onCheckedChange={() => toggleSetting("trackCostCenters")} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Document Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Invoice Prefix</label>
              <Input
                value={localSettings.documentSettings.invoicePrefix}
                onChange={handleDocumentSettingChange("invoicePrefix")}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Next Invoice Number</label>
              <Input
                type="number"
                value={localSettings.documentSettings.nextInvoiceNumber}
                onChange={handleDocumentSettingChange("nextInvoiceNumber")}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}