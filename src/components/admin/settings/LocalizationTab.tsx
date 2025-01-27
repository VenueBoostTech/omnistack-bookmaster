"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import InputSelect from "@/components/Common/InputSelect";
import { Settings } from "@/types/settings";

const OPTIONS = {
 language: [
   { value: "en", label: "English" },
   { value: "al", label: "Albanian" },
 ],
 currency: [
   { value: "ALL", label: "Albanian Lek (ALL)" },
   { value: "EUR", label: "Euro (EUR)" },
   { value: "USD", label: "US Dollar (USD)" },
 ],
 dateFormat: [
   { value: "dd/mm/yyyy", label: "DD/MM/YYYY" },
   { value: "mm/dd/yyyy", label: "MM/DD/YYYY" },
   { value: "yyyy-mm-dd", label: "YYYY-MM-DD" },
 ],
 timezone: [
   { value: "europe-tirana", label: "Europe/Tirana" },
   { value: "utc", label: "UTC" },
 ],
};

interface LocalizationTabProps {
 settings: Settings['localization'];
 onChange: (updatedSettings: Settings['localization']) => void;
}

export function LocalizationTab({ settings, onChange }: LocalizationTabProps) {
 const [localSettings, setLocalSettings] = useState(settings);

 useEffect(() => {
   setLocalSettings(settings);
 }, [settings]);

 const handleChange = (field: keyof Settings['localization']) => (e: React.ChangeEvent<HTMLSelectElement>) => {
   const updatedSettings = {
     ...localSettings,
     [field]: e.target.value,
   };
   setLocalSettings(updatedSettings);
   onChange(updatedSettings);
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
           value={localSettings?.language || 'en'}
           onChange={handleChange("language")}
         />
         <InputSelect
           name="currency"
           label="Currency"
           options={OPTIONS.currency}
           value={localSettings?.currency || 'ALL'}
           onChange={handleChange("currency")}
         />
         <InputSelect
           name="dateFormat"
           label="Date Format"
           options={OPTIONS.dateFormat}
           value={localSettings?.dateFormat || 'dd/mm/yyyy'}
           onChange={handleChange("dateFormat")}
         />
         <InputSelect
           name="timezone"
           label="Time Zone"
           options={OPTIONS.timezone}
           value={localSettings?.timezone || 'europe-tirana'}
           onChange={handleChange("timezone")}
         />
       </div>
     </CardContent>
   </Card>
 );
}