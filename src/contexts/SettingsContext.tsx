import { useClient } from '@/hooks/useClient';
import { Settings } from '@/types/settings';
import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings | null>(null);
  const { clientId } = useClient();
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`/api/settings?clientId=${clientId}`);
        const data = await response.json();
        setSettings(data);
      } catch {
        toast.error('Failed to fetch settings');
      }
    };

    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
