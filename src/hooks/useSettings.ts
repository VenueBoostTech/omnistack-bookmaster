import { useEffect } from "react";

import { useState } from "react";
import { useClient } from "./useClient";
import { Settings } from "@/types/settings";

// hooks/useSettings.ts
export function useSettings() {
    const { clientId } = useClient();
    const [settings, setSettings] = useState<Settings | null>(null);
  
    const fetchSettings = async () => {
      const res = await fetch(`/api/settings?clientId=${clientId}`);
      const data = await res.json();
      setSettings(data);
    };
  
    const updateSettings = async (section: keyof Settings, newData: any) => {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          clientId,
          section,
          data: newData
        })
      });
      
      if (!res.ok) throw new Error('Failed to update settings');
      await fetchSettings();
    };
  
    useEffect(() => {
      if (clientId) fetchSettings();
    }, [clientId]);
  
    return { settings, updateSettings };
  }