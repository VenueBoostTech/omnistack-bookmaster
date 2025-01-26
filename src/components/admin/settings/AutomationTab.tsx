// components/settings/AutomationTab.tsx
"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import InputSelect from "@/components/Common/InputSelect";
import { useClient } from '@/hooks/useClient';
import { AutomationSettings } from '@/types/settings';
import { toast } from 'react-hot-toast';

export function AutomationTab() {
 const { clientId } = useClient();
 const [settings, setSettings] = useState<AutomationSettings>({
   autoStockReorder: {
     enabled: false,
     threshold: 10,
     suppliers: []
   },
   dailyBackup: {
     enabled: true,
     time: "00:00",
     retentionDays: 30
   },
   reportGeneration: {
     enabled: false,
     schedule: {
       frequency: 'daily',
       time: "06:00"
     },
     reports: []
   }
 });

 useEffect(() => {
   const fetchSettings = async () => {
     try {
       const res = await fetch(`/api/settings?clientId=${clientId}`);
       const data = await res.json();
       if (data?.automation) {
         setSettings(data.automation);
       }
     } catch (error) {
       toast.error('Failed to load settings');
     }
   };
   
   if (clientId) fetchSettings();
 }, [clientId]);

 const toggleSetting = (section: keyof AutomationSettings) => {
   setSettings(prev => ({
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
         {/* Auto Stock Reorder */}
         <div className="space-y-4">
           <div className="flex items-center justify-between">
             <div className="space-y-0.5">
               <div className="text-sm font-medium">Auto Stock Reorder</div>
               <div className="text-sm text-muted-foreground">
                 Automatically create purchase orders for low stock
               </div>
             </div>
             <Switch 
               checked={settings.autoStockReorder.enabled}
               onCheckedChange={() => toggleSetting('autoStockReorder')}
             />
           </div>
           {settings.autoStockReorder.enabled && (
             <div className="pl-6 space-y-4">
               <div className="space-y-2">
                 <label className="text-sm font-medium">Threshold Percentage (%)</label>
                 <Input 
                   type="number"
                   value={settings.autoStockReorder.threshold}
                   onChange={(e) => setSettings(prev => ({
                     ...prev,
                     autoStockReorder: {
                       ...prev.autoStockReorder,
                       threshold: Number(e.target.value)
                     }
                   }))}
                 />
               </div>
             </div>
           )}
         </div>

         {/* Daily Backup */}
         <div className="space-y-4">
           <div className="flex items-center justify-between">
             <div className="space-y-0.5">
               <div className="text-sm font-medium">Daily Backup</div>
               <div className="text-sm text-muted-foreground">
                 Automatic daily data backup
               </div>
             </div>
             <Switch 
               checked={settings.dailyBackup.enabled}
               onCheckedChange={() => toggleSetting('dailyBackup')}
             />
           </div>
           {settings.dailyBackup.enabled && (
             <div className="pl-6 space-y-4">
               <div className="space-y-2">
                 <label className="text-sm font-medium">Backup Time</label>
                 <Input 
                   type="time"
                   value={settings.dailyBackup.time}
                   onChange={(e) => setSettings(prev => ({
                     ...prev,
                     dailyBackup: {
                       ...prev.dailyBackup,
                       time: e.target.value
                     }
                   }))}
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium">Retention Period (days)</label>
                 <Input 
                   type="number"
                   value={settings.dailyBackup.retentionDays}
                   onChange={(e) => setSettings(prev => ({
                     ...prev,
                     dailyBackup: {
                       ...prev.dailyBackup,
                       retentionDays: Number(e.target.value)
                     }
                   }))}
                 />
               </div>
             </div>
           )}
         </div>

         {/* Report Generation */}
         <div className="space-y-4">
           <div className="flex items-center justify-between">
             <div className="space-y-0.5">
               <div className="text-sm font-medium">Report Generation</div>
               <div className="text-sm text-muted-foreground">
                 Schedule automated reports
               </div>
             </div>
             <Switch 
               checked={settings.reportGeneration.enabled}
               onCheckedChange={() => toggleSetting('reportGeneration')}
             />
           </div>
           {settings.reportGeneration.enabled && (
             <div className="pl-6 space-y-4">
               <InputSelect
                 name="frequency"
                 label="Frequency"
                 value={settings.reportGeneration.schedule.frequency}
                 onChange={(e) => setSettings(prev => ({
                   ...prev,
                   reportGeneration: {
                     ...prev.reportGeneration,
                     schedule: {
                       ...prev.reportGeneration.schedule,
                       frequency: e.target.value as 'daily' | 'weekly' | 'monthly'
                     }
                   }
                 }))}
                 options={[
                   { value: 'daily', label: 'Daily' },
                   { value: 'weekly', label: 'Weekly' },
                   { value: 'monthly', label: 'Monthly' }
                 ]}
               />
               <div className="space-y-2">
                 <label className="text-sm font-medium">Time</label>
                 <Input 
                   type="time"
                   value={settings.reportGeneration.schedule.time}
                   onChange={(e) => setSettings(prev => ({
                     ...prev,
                     reportGeneration: {
                       ...prev.reportGeneration,
                       schedule: {
                         ...prev.reportGeneration.schedule,
                         time: e.target.value
                       }
                     }
                   }))}
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