"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  SaveIcon,
  Globe,
  Currency,
  Bell,
  Mail,
  Warehouse,
  Receipt,
  FileText,
  Calculator,
  Scale,
  Key,
  Link,
  Archive,
  Database,
  ShieldCheck
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
              {/* <CardDescription>Update your company details and preferences</CardDescription> */}
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
              {/* <CardDescription>Configure regional settings</CardDescription> */}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Language</label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="al">Albanian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Currency</label>
                  <Select defaultValue="ALL">
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">Albanian Lek (ALL)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Format</label>
                  <Select defaultValue="dd/mm/yyyy">
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time Zone</label>
                  <Select defaultValue="europe-tirana">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe-tirana">Europe/Tirana</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              {/* <CardDescription>Configure notification preferences</CardDescription> */}
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
              {/* <CardDescription>Configure your accounting settings</CardDescription> */}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fiscal Year Start</label>
                  <Select defaultValue="01">
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01">January</SelectItem>
                      <SelectItem value="07">July</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
              {/* <CardDescription>Configure invoice and document preferences</CardDescription> */}
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
              {/* <CardDescription>Manage your integrated services and connections</CardDescription> */}
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
              {/* <CardDescription>Configure automated processes and tasks</CardDescription> */}
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