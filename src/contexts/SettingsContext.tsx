// contexts/SettingsContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useClient } from '@/hooks/useClient';
import { Settings } from '@/types/settings';
import { toast } from 'react-hot-toast';

interface SettingsContextType {
  settings: Settings | null;
  updateSettings: (data: Partial<Settings>) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { clientId } = useClient();
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    if (!clientId) return;
    fetchSettings();
  }, [clientId]);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`/api/settings?clientId=${clientId}`);
      if (!res.ok) throw new Error('Failed to fetch settings');
      const data = await res.json();
      setSettings(data);
    } catch (error) {
      toast.error('Failed to fetch settings');
    }
  };

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          clientId,
          settings: newSettings
        })
      });
      
      if (!res.ok) throw new Error('Failed to update settings');
      await fetchSettings();
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
      throw error;
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
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