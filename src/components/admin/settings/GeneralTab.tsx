// components/settings/GeneralTab.tsx
"use client";

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useClient } from '@/hooks/useClient';
import { toast } from 'react-hot-toast';
import { GeneralSettings } from '@/types/settings';

export function GeneralTab() {
  const { clientId } = useClient();
  const [settings, setSettings] = useState<GeneralSettings>({
    companyName: '',
    taxId: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`/api/settings?clientId=${clientId}`);
        const data = await res.json();
        if (data?.general) {
          setSettings(data.general);
        }
      } catch (error) {
        toast.error('Failed to load settings');
      }
    };
    
    if (clientId) {
      fetchSettings();
    }
  }, [clientId]);

  const handleChange = (field: keyof GeneralSettings) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({
      ...prev,
      [field]: e.target.value
    }));
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
                value={settings.companyName}
                onChange={handleChange('companyName')}
                placeholder="Enter company name" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tax ID</label>
              <Input 
                value={settings.taxId}
                onChange={handleChange('taxId')}
                placeholder="Enter tax ID" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Address</label>
              <Input 
                value={settings.address}
                onChange={handleChange('address')}
                placeholder="Enter address" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input 
                value={settings.phone}
                onChange={handleChange('phone')}
                placeholder="Enter phone" 
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}