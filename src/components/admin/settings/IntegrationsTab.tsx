"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Settings } from "@/types/settings";

interface IntegrationsTabProps {
  settings: Settings['integrations'];
  onChange: (updatedSettings: Settings['integrations']) => void;
}

export function IntegrationsTab({ settings, onChange }: IntegrationsTabProps) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [showWebhookModal, setShowWebhookModal] = useState(false);
  const [newWebhook, setNewWebhook] = useState({ url: "", secret: "" });

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleIntegrationChange = (integration: 'venueBoost' | 'bank', enabled: boolean) => {
    const updatedSettings = {
      ...localSettings,
      [integration]: {
        ...localSettings[integration],
        enabled
      }
    };
    setLocalSettings(updatedSettings);
    onChange(updatedSettings);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Connected Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* VenueBoost */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <h3 className="font-medium">VenueBoost</h3>
              <p className="text-sm text-muted-foreground">Synchronize venue and event data</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={localSettings?.venueBoost.enabled ? "default" : "secondary"}>
                {localSettings?.venueBoost.enabled ? "Connected" : "Disconnected"}
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleIntegrationChange('venueBoost', !localSettings?.venueBoost.enabled)}
              >
                {localSettings?.venueBoost.enabled ? "Configure" : "Connect"}
              </Button>
            </div>
          </div>

          {/* Bank Integration */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <h3 className="font-medium">Bank Integration</h3>
              <p className="text-sm text-muted-foreground">Connect your bank account</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={localSettings?.bank.enabled ? "default" : "secondary"}>
                {localSettings?.bank.enabled ? "Connected" : "Disconnected"}
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleIntegrationChange('bank', !localSettings?.bank.enabled)}
              >
                {localSettings?.bank.enabled ? "Configure" : "Connect"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}