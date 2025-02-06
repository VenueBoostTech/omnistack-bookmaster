// IntegrationsTab.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Settings } from "@/types/settings";
import { useVenueBoost } from "@/hooks/useVenueBoost";

const defaultSettings: Settings['integrations'] = {
  venueBoost: {
    enabled: false,
    webhookApiKey: '',
    venueShortCode: ''
  },
  bank: {
    enabled: false,
    provider: '',
    credentials: {}
  }
};

interface IntegrationsTabProps {
  settings: Settings['integrations'];
  onChange: (updatedSettings: Settings['integrations']) => void;
}

type ModalType = 'venueBoost' | 'bank' | null;

export function IntegrationsTab({ settings, onChange }: IntegrationsTabProps) {
  const [localSettings, setLocalSettings] = useState<Settings['integrations']>(settings || defaultSettings);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const { connectVenueBoost } = useVenueBoost();
  const [modalData, setModalData] = useState({
    webhookApiKey: '',
    venueShortCode: '',
    provider: '',
    credentials: {}
  });

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  useEffect(() => {
    if (JSON.stringify(localSettings) !== JSON.stringify(settings)) {
      requestAnimationFrame(() => {
        onChange(localSettings);
      });
    }
  }, [localSettings, settings, onChange]);

  const handleIntegrationChange = async (integration: ModalType, data: any = {}) => {
    if (!integration) return;

    if (integration === 'venueBoost' && data.enabled && data.venueShortCode && data.webhookApiKey) {
      await connectVenueBoost(data.venueShortCode, data.webhookApiKey);
    }
    setLocalSettings(prev => ({
      ...prev,
      [integration]: {
        ...prev[integration],
        ...data
      }
    }));
    setActiveModal(null);
  };

  const openModal = (type: ModalType) => {
    if (!type) return;
    
    setModalData({
      webhookApiKey: localSettings[type].webhookApiKey || '',
      venueShortCode: localSettings[type].venueShortCode || '',
      provider: type === 'bank' ? localSettings.bank.provider || '' : '',
      credentials: type === 'bank' ? localSettings.bank.credentials || {} : {}
    });
    setActiveModal(type);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Connected Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <h3 className="font-medium">VenueBoost</h3>
              <p className="text-sm text-muted-foreground">Synchronize venue and event data</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={localSettings.venueBoost.enabled ? "default" : "secondary"}>
                {localSettings.venueBoost.enabled ? "Connected" : "Disconnected"}
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => openModal('venueBoost')}
              >
                {localSettings.venueBoost.enabled ? "Configure" : "Connect"}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <h3 className="font-medium">Bank Integration</h3>
              <p className="text-sm text-muted-foreground">Connect your bank account</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={localSettings.bank.enabled ? "default" : "secondary"}>
                {localSettings.bank.enabled ? "Connected" : "Disconnected"}
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => openModal('bank')}
              >
                {localSettings.bank.enabled ? "Configure" : "Connect"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* VenueBoost Modal */}
      <Dialog open={activeModal === 'venueBoost'} onOpenChange={() => setActiveModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>VenueBoost Configuration</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">API Key</label>
              <Input
                value={modalData.webhookApiKey}
                onChange={(e) => setModalData({ ...modalData, webhookApiKey: e.target.value })}
                placeholder="Enter API key"
              />
            </div>
            <div className="space-y-2">
            <label className="text-sm font-medium">Venue Short Code</label>
            <Input
              value={modalData.venueShortCode}
              onChange={(e) => setModalData({ ...modalData, venueShortCode: e.target.value })}
              placeholder="Enter venue short code" 
            />
          </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActiveModal(null)}>
              Cancel
            </Button>
            <Button 
              onClick={() => handleIntegrationChange('venueBoost', {
                enabled: true,
                webhookApiKey: modalData.webhookApiKey,
                venueShortCode: modalData.venueShortCode
              })}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bank Modal */}
      <Dialog open={activeModal === 'bank'} onOpenChange={() => setActiveModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bank Integration</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Provider</label>
              <Input
                value={modalData.provider}
                onChange={(e) => setModalData({ ...modalData, provider: e.target.value })}
                placeholder="Enter bank provider"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActiveModal(null)}>
              Cancel
            </Button>
            <Button 
              onClick={() => handleIntegrationChange('bank', {
                enabled: true,
                provider: modalData.provider,
                credentials: {}
              })}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}