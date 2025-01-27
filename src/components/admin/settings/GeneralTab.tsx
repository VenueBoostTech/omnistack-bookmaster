"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useClient } from "@/hooks/useClient";

export function GeneralTab() {
  const { clientId } = useClient();
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch(`/api/client?clientId=${clientId}`);
        const data = await res.json();
        setClientData(data.client);
      } catch (error) {
        console.error('Failed to fetch client:', error);
      }
    };

    if (clientId) {
      fetchClient();
    }
  }, [clientId]);

  const handleChange = (field) => (e) => {
    setClientData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleBlur = async () => {
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: clientData,
          clientId
        })
      });
      
      if (!res.ok) throw new Error('Failed to update client');
    } catch (error) {
      console.error('Failed to update client:', error);
    }
  };

  if (!clientData) return null;

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
                value={clientData.name || ''}
                onChange={handleChange("name")}
                onBlur={handleBlur}
                placeholder="Enter company name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Code</label>
              <Input
                value={clientData.code || ''}
                onChange={handleChange("code")}
                onBlur={handleBlur}
                placeholder="Enter company code"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tax ID</label>
              <Input
                value={clientData.taxId || ''}
                onChange={handleChange("taxId")}
                onBlur={handleBlur}
                placeholder="Enter tax ID"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                value={clientData.email || ''}
                onChange={handleChange("email")}
                onBlur={handleBlur}
                placeholder="Enter email"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Address</label>
              <Input
                value={clientData.address || ''}
                onChange={handleChange("address")}
                onBlur={handleBlur}
                placeholder="Enter address"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                value={clientData.phone || ''}
                onChange={handleChange("phone")}
                onBlur={handleBlur}
                placeholder="Enter phone"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}