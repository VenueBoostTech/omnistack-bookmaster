"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InputSelect from "@/components/Common/InputSelect";
import {
  SaveIcon,
} from "lucide-react";

const INTEGRATIONS = [
  {
    name: "Supabase",
    description: "Authentication and user management",
    status: "Connected",
    lastSync: "2024-01-22 10:30:00"
  },
  {
    name: "MongoDB",
    description: "Primary database",
    status: "Connected",
    lastSync: "2024-01-22 10:30:00"
  },
  {
    name: "Bank Integration",
    description: "Financial transactions sync",
    status: "Not Connected",
    lastSync: null
  }
];

export function SettingsContent() {
  // State for select values
  const [language, setLanguage] = React.useState("en");
  const [currency, setCurrency] = React.useState("ALL");
  const [dateFormat, setDateFormat] = React.useState("dd/mm/yyyy");
  const [timezone, setTimezone] = React.useState("europe-tirana");
  const [fiscalYear, setFiscalYear] = React.useState("01");

  // Options for select inputs
  const languageOptions = [
    { value: "en", label: "English" },
    { value: "al", label: "Albanian" }
  ];

  const currencyOptions = [
    { value: "ALL", label: "Albanian Lek (ALL)" },
    { value: "EUR", label: "Euro (EUR)" },
    { value: "USD", label: "US Dollar (USD)" }
  ];

  const dateFormatOptions = [
    { value: "dd/mm/yyyy", label: "DD/MM/YYYY" },
    { value: "mm/dd/yyyy", label: "MM/DD/YYYY" },
    { value: "yyyy-mm-dd", label: "YYYY-MM-DD" }
  ];

  const timezoneOptions = [
    { value: "europe-tirana", label: "Europe/Tirana" },
    { value: "utc", label: "UTC" }
  ];

  const fiscalYearOptions = [
    { value: "01", label: "January" },
    { value: "07", label: "July" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your company settings and preferences
          </p>
        </div>
        <Button style={{ backgroundColor: "#5FC4D0" }}>
          <SaveIcon className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6 mt-6">
          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Name</label>
                  <Input placeholder="Enter company name" defaultValue="Metroshop.al" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tax ID</label>
                  <Input placeholder="Enter tax ID" defaultValue="L72119451A" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <Input placeholder="Enter address" defaultValue="Rruga Myslym Shyri, Tirana" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input placeholder="Enter phone" defaultValue="+355 69 123 4567" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Localization */}
          <Card>
            <CardHeader>
              <CardTitle>Localization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputSelect
                  name="language"
                  label="Language"
                  options={languageOptions}
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                />
                <InputSelect
                  name="currency"
                  label="Currency"
                  options={currencyOptions}
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                />
                <InputSelect
                  name="dateFormat"
                  label="Date Format"
                  options={dateFormatOptions}
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                />
                <InputSelect
                  name="timezone"
                  label="Time Zone"
                  options={timezoneOptions}
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
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
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Low Stock Alerts</div>
                    <div className="text-sm text-muted-foreground">Get notified when inventory is low</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Transaction Alerts</div>
                    <div className="text-sm text-muted-foreground">Notifications for important transactions</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Settings */}
        <TabsContent value="finance" className="space-y-6 mt-6">
          {/* Accounting Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Accounting Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputSelect
                  name="fiscalYear"
                  label="Fiscal Year Start"
                  options={fiscalYearOptions}
                  value={fiscalYear}
                  onChange={(e) => setFiscalYear(e.target.value)}
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tax Rate (%)</label>
                  <Input type="number" placeholder="Enter tax rate" defaultValue="20" />
                </div>
              </div>

              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Auto-post Transactions</div>
                    <div className="text-sm text-muted-foreground">Automatically post verified transactions</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Track Cost Centers</div>
                    <div className="text-sm text-muted-foreground">Enable cost center tracking</div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Document Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Invoice Prefix</label>
                  <Input placeholder="Enter prefix" defaultValue="INV-" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Next Invoice Number</label>
                  <Input type="number" defaultValue="1001" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {INTEGRATIONS.map((integration) => (
                <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h3 className="font-medium">{integration.name}</h3>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                    {integration.lastSync && (
                      <p className="text-xs text-muted-foreground">
                        Last synced: {new Date(integration.lastSync).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge 
                      variant={integration.status === 'Connected' ? 'success' : 'secondary'}
                      className={
                        integration.status === 'Connected' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {integration.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      {integration.status === 'Connected' ? 'Configure' : 'Connect'}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation */}
        <TabsContent value="automation" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Automated Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Auto Stock Reorder</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically create purchase orders for low stock
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Daily Backup</div>
                    <div className="text-sm text-muted-foreground">
                      Automatic daily data backup
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Report Generation</div>
                    <div className="text-sm text-muted-foreground">
                      Schedule automated reports
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SettingsContent;