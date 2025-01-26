"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GeneralSettings } from "@/types/settings";

interface GeneralTabProps {
  initialSettings: GeneralSettings;
  onChange: (updatedSettings: GeneralSettings) => void;
}

export function GeneralTab({ initialSettings, onChange }: GeneralTabProps) {
  const [localSettings, setLocalSettings] = useState<GeneralSettings>(initialSettings);

  useEffect(() => {
    setLocalSettings(initialSettings); // Sync initial settings on changes from parent
  }, [initialSettings]);

  const handleChange = (field: keyof GeneralSettings) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSettings = {
      ...localSettings,
      [field]: e.target.value,
    };
    setLocalSettings(updatedSettings);
    onChange(updatedSettings); // Notify parent of changes
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name</label>
              <Input
                value={localSettings.companyName}
                onChange={handleChange("companyName")}
                placeholder="Enter company name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tax ID</label>
              <Input
                value={localSettings.taxId}
                onChange={handleChange("taxId")}
                placeholder="Enter tax ID"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Address</label>
              <Input
                value={localSettings.address}
                onChange={handleChange("address")}
                placeholder="Enter address"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                value={localSettings.phone}
                onChange={handleChange("phone")}
                placeholder="Enter phone"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
