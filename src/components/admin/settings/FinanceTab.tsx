// components/settings/FinanceTab.tsx
"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import InputSelect from "@/components/Common/InputSelect";
import { useClient } from '@/hooks/useClient';
import { FinanceSettings } from '@/types/settings';
import { toast } from 'react-hot-toast';

const FISCAL_YEAR_OPTIONS = [
 { value: "01", label: "January" },
 { value: "07", label: "July" }
];

export function FinanceTab() {
 const { clientId } = useClient();
 const [settings, setSettings] = useState<FinanceSettings>({
   fiscalYearStart: "01",
   taxRate: 20,
   autoPostTransactions: true,
   trackCostCenters: false,
   documentSettings: {
     invoicePrefix: "INV-",
     nextInvoiceNumber: 1001
   }
 });

 useEffect(() => {
   const fetchSettings = async () => {
     try {
       const res = await fetch(`/api/settings?clientId=${clientId}`);
       const data = await res.json();
       if (data?.finance) {
         setSettings(data.finance);
       }
     } catch (error) {
       toast.error('Failed to load settings');
     }
   };
   
   if (clientId) {
     fetchSettings();
   }
 }, [clientId]);

 const handleChange = (field: keyof FinanceSettings) => (e: React.ChangeEvent<HTMLInputElement>) => {
   setSettings(prev => ({
     ...prev,
     [field]: e.target.type === 'number' ? Number(e.target.value) : e.target.value
   }));
 };

 const handleDocumentSettingChange = (field: keyof typeof settings.documentSettings) => (
   e: React.ChangeEvent<HTMLInputElement>
 ) => {
   setSettings(prev => ({
     ...prev,
     documentSettings: {
       ...prev.documentSettings,
       [field]: e.target.type === 'number' ? Number(e.target.value) : e.target.value
     }
   }));
 };

 const toggleSetting = (setting: keyof FinanceSettings) => {
   setSettings(prev => ({
     ...prev,
     [setting]: !prev[setting as keyof FinanceSettings]
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
             name="fiscalYear"
             label="Fiscal Year Start"
             options={FISCAL_YEAR_OPTIONS}
             value={settings.fiscalYearStart}
             onChange={(e) => setSettings(prev => ({ ...prev, fiscalYearStart: e.target.value }))}
           />
           <div className="space-y-2">
             <label className="text-sm font-medium">Tax Rate (%)</label>
             <Input 
               type="number"
               value={settings.taxRate}
               onChange={handleChange('taxRate')}
             />
           </div>
         </div>

         <div className="space-y-4 mt-4">
           <div className="flex items-center justify-between">
             <div className="space-y-0.5">
               <div className="text-sm font-medium">Auto-post Transactions</div>
               <div className="text-sm text-muted-foreground">Automatically post verified transactions</div>
             </div>
             <Switch 
               checked={settings.autoPostTransactions}
               onCheckedChange={() => toggleSetting('autoPostTransactions')}
             />
           </div>
           <div className="flex items-center justify-between">
             <div className="space-y-0.5">
               <div className="text-sm font-medium">Track Cost Centers</div>
               <div className="text-sm text-muted-foreground">Enable cost center tracking</div>
             </div>
             <Switch 
               checked={settings.trackCostCenters}
               onCheckedChange={() => toggleSetting('trackCostCenters')}
             />
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
               value={settings.documentSettings.invoicePrefix}
               onChange={handleDocumentSettingChange('invoicePrefix')}
             />
           </div>
           <div className="space-y-2">
             <label className="text-sm font-medium">Next Invoice Number</label>
             <Input 
               type="number"
               value={settings.documentSettings.nextInvoiceNumber}
               onChange={handleDocumentSettingChange('nextInvoiceNumber')}
             />
           </div>
         </div>
       </CardContent>
     </Card>
   </div>
 );
}