"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InputSelect from "@/components/Common/InputSelect";
import { Settings } from "@/types/settings";

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

const defaultSettings: Settings['finance'] = {
  fiscalYearStart: null,
  defaultCurrency: 'ALL',
  taxRate: 0,
  documentSettings: {
    prefix: '',
    nextNumber: 1000
  }
};

interface FinanceTabProps {
  settings: Settings['finance'];
  onChange: (updatedSettings: Settings['finance']) => void;
}

export function FinanceTab({ settings, onChange }: FinanceTabProps) {
  const [localSettings, setLocalSettings] = useState<Settings['finance']>(settings || defaultSettings);

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

  const getFiscalYearMonth = (): string => {
    if (!localSettings.fiscalYearStart) return '01';
    const date = new Date(localSettings.fiscalYearStart);
    return (date.getMonth() + 1).toString().padStart(2, '0');
  };

  const handleChange = (field: keyof Settings['finance'], value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      [field]: value
    }));
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
              name="fiscalYearStart"
              label="Fiscal Year Start"
              options={FISCAL_YEAR_OPTIONS}
              value={getFiscalYearMonth()}
              onChange={(e) => {
                const date = new Date();
                date.setMonth(parseInt(e.target.value) - 1);
                date.setDate(1); // Set to first day of month
                date.setHours(0, 0, 0, 0); // Reset time
                handleChange("fiscalYearStart", date);
              }}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Currency</label>
              <InputSelect
                name="defaultCurrency"
                label=""
                value={localSettings.defaultCurrency}
                onChange={(e) => handleChange("defaultCurrency", e.target.value)}
                options={[
                  { value: "ALL", label: "Albanian Lek (ALL)" },
                  { value: "EUR", label: "Euro (EUR)" },
                  { value: "USD", label: "US Dollar (USD)" }
                ]}
              />
            </div>
          </div>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Document Prefix</label>
              <Input
                value={localSettings.documentSettings.prefix}
                onChange={(e) => 
                  handleChange("documentSettings", {
                    ...localSettings.documentSettings,
                    prefix: e.target.value
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Next Document Number</label>
              <Input
                type="number"
                value={localSettings.documentSettings.nextNumber}
                onChange={(e) => 
                  handleChange("documentSettings", {
                    ...localSettings.documentSettings,
                    nextNumber: parseInt(e.target.value)
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}