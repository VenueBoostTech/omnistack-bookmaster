"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Settings } from "@/types/settings";

interface NotificationsTabProps {
 settings: Settings['notifications'];
 onChange: (updatedSettings: Settings['notifications']) => void;
}

export function NotificationsTab({ settings, onChange }: NotificationsTabProps) {
 const [localSettings, setLocalSettings] = useState(settings);

 useEffect(() => {
   setLocalSettings(settings);
 }, [settings]);

 const toggleSetting = (setting: keyof Settings['notifications']) => {
   setLocalSettings((prev) => {
     const updatedSettings = { 
       ...prev, 
       [setting]: !prev[setting] 
     };
     onChange(updatedSettings);
     return updatedSettings;
   });
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
             checked={localSettings?.email}
             onCheckedChange={() => toggleSetting("email")}
           />
         </div>
         <div className="flex items-center justify-between">
           <div className="space-y-0.5">
             <div className="text-sm font-medium">Low Stock Alerts</div>
             <div className="text-sm text-muted-foreground">Get notified when inventory is low</div>
           </div>
           <Switch
             checked={localSettings?.lowStock}
             onCheckedChange={() => toggleSetting("lowStock")}
           />
         </div>
         <div className="flex items-center justify-between">
           <div className="space-y-0.5">
             <div className="text-sm font-medium">Transaction Alerts</div>
             <div className="text-sm text-muted-foreground">Notifications for important transactions</div>
           </div>
           <Switch
             checked={localSettings?.transactions}
             onCheckedChange={() => toggleSetting("transactions")}
           />
         </div>
       </div>
     </CardContent>
   </Card>
 );
}