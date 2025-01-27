"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Settings } from "@/types/settings";

interface GeneralTabProps {
  settings: Settings['general'];
  onChange: (updatedSettings: Settings['general']) => void;
}

export function GeneralTab({ settings, onChange }: GeneralTabProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleChange = (field: keyof Settings['general']) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSettings = {
      ...localSettings,
      [field]: e.target.value,
    };
    setLocalSettings(updatedSettings);
    onChange(updatedSettings);
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
                value={localSettings?.name || ''}
                onChange={handleChange("name")}
                placeholder="Enter company name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Code</label>
              <Input
                value={localSettings?.code || ''}
                onChange={handleChange("code")}
                placeholder="Enter company code"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tax ID</label>
              <Input
                value={localSettings?.taxId || ''}
                onChange={handleChange("taxId")}
                placeholder="Enter tax ID"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                value={localSettings?.email || ''}
                onChange={handleChange("email")}
                placeholder="Enter email"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Address</label>
              <Input
                value={localSettings?.address || ''}
                onChange={handleChange("address")}
                placeholder="Enter address"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                value={localSettings?.phone || ''}
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