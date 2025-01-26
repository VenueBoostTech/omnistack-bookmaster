// components/settings/LocalizationTab.tsx
"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import InputSelect from "@/components/Common/InputSelect";
import { useClient } from '@/hooks/useClient';
import { LocalizationSettings } from '@/types/settings';
import { toast } from 'react-hot-toast';

const OPTIONS = {
 language: [
   { value: "en", label: "English" },
   { value: "al", label: "Albanian" }
 ],
 currency: [
   { value: "ALL", label: "Albanian Lek (ALL)" },
   { value: "EUR", label: "Euro (EUR)" },
   { value: "USD", label: "US Dollar (USD)" }
 ],
 dateFormat: [
   { value: "dd/mm/yyyy", label: "DD/MM/YYYY" },
   { value: "mm/dd/yyyy", label: "MM/DD/YYYY" },
   { value: "yyyy-mm-dd", label: "YYYY-MM-DD" }
 ],
 timezone: [
   { value: "europe-tirana", label: "Europe/Tirana" },
   { value: "utc", label: "UTC" }
 ]
};

export function LocalizationTab() {
 const { clientId } = useClient();
 const [settings, setSettings] = useState<LocalizationSettings>({
   language: "en",
   currency: "ALL",
   dateFormat: "dd/mm/yyyy",
   timezone: "europe-tirana"
 });

 useEffect(() => {
   const fetchSettings = async () => {
     try {
       const res = await fetch(`/api/settings?clientId=${clientId}`);
       const data = await res.json();
       if (data?.localization) {
         setSettings(data.localization);
       }
     } catch (error) {
       toast.error('Failed to load settings');
     }
   };
   
   if (clientId) {
     fetchSettings();
   }
 }, [clientId]);

 const handleChange = (field: keyof LocalizationSettings) => (e: React.ChangeEvent<HTMLSelectElement>) => {
   setSettings(prev => ({
     ...prev,
     [field]: e.target.value
   }));
 };

 return (
   <Card>
     <CardHeader>
       <CardTitle>Localization</CardTitle>
     </CardHeader>
     <CardContent className="space-y-4">
       <div className="grid grid-cols-2 gap-4">
         <InputSelect
           name="language"
           label="Language"
           options={OPTIONS.language}
           value={settings.language}
           onChange={handleChange('language')}
         />
         <InputSelect
           name="currency"
           label="Currency"
           options={OPTIONS.currency}
           value={settings.currency}
           onChange={handleChange('currency')}
         />
         <InputSelect
           name="dateFormat"
           label="Date Format"
           options={OPTIONS.dateFormat}
           value={settings.dateFormat}
           onChange={handleChange('dateFormat')}
         />
         <InputSelect
           name="timezone"
           label="Time Zone"
           options={OPTIONS.timezone}
           value={settings.timezone}
           onChange={handleChange('timezone')}
         />
       </div>
     </CardContent>
   </Card>
 );
}