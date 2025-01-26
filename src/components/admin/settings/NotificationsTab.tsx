// components/settings/NotificationsTab.tsx
"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useClient } from '@/hooks/useClient';
import { NotificationSettings } from '@/types/settings';
import { toast } from 'react-hot-toast';

export function NotificationsTab() {
 const { clientId } = useClient();
 const [settings, setSettings] = useState<NotificationSettings>({
   emailNotifications: true,
   lowStockAlerts: true,
   transactionAlerts: true
 });

 useEffect(() => {
   const fetchSettings = async () => {
     try {
       const res = await fetch(`/api/settings?clientId=${clientId}`);
       const data = await res.json();
       if (data?.notifications) {
         setSettings(data.notifications);
       }
     } catch (error) {
       toast.error('Failed to load settings');
     }
   };
   
   if (clientId) {
     fetchSettings();
   }
 }, [clientId]);

 const toggleSetting = (setting: keyof NotificationSettings) => {
   setSettings(prev => ({
     ...prev,
     [setting]: !prev[setting]
   }));
 };

 return (
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
           <Switch 
             checked={settings.emailNotifications}
             onCheckedChange={() => toggleSetting('emailNotifications')}
           />
         </div>
         <div className="flex items-center justify-between">
           <div className="space-y-0.5">
             <div className="text-sm font-medium">Low Stock Alerts</div>
             <div className="text-sm text-muted-foreground">Get notified when inventory is low</div>
           </div>
           <Switch 
             checked={settings.lowStockAlerts}
             onCheckedChange={() => toggleSetting('lowStockAlerts')}
           />
         </div>
         <div className="flex items-center justify-between">
           <div className="space-y-0.5">
             <div className="text-sm font-medium">Transaction Alerts</div>
             <div className="text-sm text-muted-foreground">Notifications for important transactions</div>
           </div>
           <Switch 
             checked={settings.transactionAlerts}
             onCheckedChange={() => toggleSetting('transactionAlerts')}
           />
         </div>
       </div>
     </CardContent>
   </Card>
 );
}