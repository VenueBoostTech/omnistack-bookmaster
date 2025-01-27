// contexts/SettingsContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useClient } from '@/hooks/useClient';
import { Settings } from '@/types/settings';
import { toast } from 'react-hot-toast';

interface SettingsContextType {
  settings: Settings | null;
  isLoading: boolean;
  updateSettings: (section: keyof Settings, data: any) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { clientId } = useClient();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = async () => {
    if (!clientId) return;
    
    try {
      const res = await fetch(`/api/settings?clientId=${clientId}`);
      if (!res.ok) throw new Error('Failed to fetch settings');
      const data = await res.json();
      setSettings(data);
    } catch (error) {
      toast.error('Failed to fetch settings');
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = async (section: keyof Settings, newData: any) => {
    if (!settings || !clientId) return;

    try {
      // Create a new settings object with the updated section
      const updatedSettings = {
        ...settings,
        [section]: {
          ...settings[section],
          ...newData
        }
      };

      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          clientId,
          settings: updatedSettings
        })
      });
      
      if (!res.ok) throw new Error('Failed to update settings');
      
      const data = await res.json();
      setSettings(data);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
      throw error;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [clientId]);

  return (
    <SettingsContext.Provider value={{ settings, isLoading, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};