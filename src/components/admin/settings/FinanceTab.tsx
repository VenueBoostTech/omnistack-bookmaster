"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import InputSelect from "@/components/Common/InputSelect";
import { Settings } from "@/types/settings";

const FISCAL_YEAR_OPTIONS = [
 { value: "01", label: "January" },
 { value: "02", label: "February" },
 { value: "03", label: "March" },
 { value: "04", label: "April" },
 { value: "05", label: "May" },
 { value: "06", label: "June" },
 { value: "07", label: "July" },
 { value: "08", label: "August" },
 { value: "09", label: "September" },
 { value: "10", label: "October" },
 { value: "11", label: "November" },
 { value: "12", label: "December" },
];

interface FinanceTabProps {
 settings: Settings['finance'];
 onChange: (updatedSettings: Settings['finance']) => void;
}

export function FinanceTab({ settings, onChange }: FinanceTabProps) {
 const [localSettings, setLocalSettings] = useState(settings);

 useEffect(() => {
   setLocalSettings(settings);
 }, [settings]);

 const handleChange = (field: keyof Settings['finance'], value: any) => {
   const updatedSettings = {
     ...localSettings,
     [field]: value
   };
   setLocalSettings(updatedSettings);
   onChange(updatedSettings);
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
             name="fiscalYearStart"
             label="Fiscal Year Start"
             options={FISCAL_YEAR_OPTIONS}
             value={localSettings?.fiscalYearStart?.getMonth()?.toString().padStart(2, '0') || '01'}
             onChange={(e) => {
               const date = new Date();
               date.setMonth(parseInt(e.target.value) - 1);
               handleChange("fiscalYearStart", date);
             }}
           />
           <div className="space-y-2">
             <label className="text-sm font-medium">Default Currency</label>
             <InputSelect
               name="defaultCurrency"
               label=""
               value={localSettings?.defaultCurrency}
               onChange={(e) => handleChange("defaultCurrency", e.target.value)}
               options={[
                 { value: "ALL", label: "Albanian Lek (ALL)" },
                 { value: "EUR", label: "Euro (EUR)" },
                 { value: "USD", label: "US Dollar (USD)" }
               ]}
             />
           </div>
         </div>

         <div className="space-y-4 mt-4">
           <div className="space-y-2">
             <label className="text-sm font-medium">Document Prefix</label>
             <Input
               value={localSettings?.documentSettings?.prefix || ''}
               onChange={(e) => 
                 handleChange("documentSettings", {
                   ...localSettings?.documentSettings,
                   prefix: e.target.value
                 })
               }
             />
           </div>
           <div className="space-y-2">
             <label className="text-sm font-medium">Next Document Number</label>
             <Input
               type="number"
               value={localSettings?.documentSettings?.nextNumber || 1000}
               onChange={(e) => 
                 handleChange("documentSettings", {
                   ...localSettings?.documentSettings,
                   nextNumber: parseInt(e.target.value)
                 })
               }
             />
           </div>
         </div>
       </CardContent>
     </Card>
   </div>
 );
}