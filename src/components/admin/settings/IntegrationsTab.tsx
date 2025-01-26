"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IntegrationSettings } from "@/types/settings";

interface IntegrationsTabProps {
  initialSettings: IntegrationSettings;
  onChange: (updatedSettings: IntegrationSettings) => void;
}

export function IntegrationsTab({ initialSettings, onChange }: IntegrationsTabProps) {
  const [localSettings, setLocalSettings] = useState<IntegrationSettings>(initialSettings);
  const [showWebhookModal, setShowWebhookModal] = useState(false);
  const [newWebhook, setNewWebhook] = useState({ url: "", secret: "", events: [] });

  useEffect(() => {
    setLocalSettings(initialSettings); // Sync with parent settings
  }, [initialSettings]);

  const handleIntegrationChange = (key: keyof IntegrationSettings, value: any) => {
    const updatedSettings = { ...localSettings, [key]: value };
    setLocalSettings(updatedSettings);
    onChange(updatedSettings); // Notify parent of changes
  };

  const addWebhook = () => {
    const updatedWebhooks = [
      ...localSettings.webhooks.endpoints,
      { ...newWebhook, enabled: true },
    ];
    handleIntegrationChange("webhooks", { endpoints: updatedWebhooks });
    setShowWebhookModal(false);
    setNewWebhook({ url: "", secret: "", events: [] });
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
              {localSettings.venueBoost.lastSync && (
                <p className="text-xs text-muted-foreground">
                  Last synced: {new Date(localSettings.venueBoost.lastSync).toLocaleString()}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={localSettings.venueBoost.enabled ? "default" : "secondary"}>
                {localSettings.venueBoost.enabled ? "Connected" : "Disconnected"}
              </Badge>
              <Button variant="outline" size="sm">
                {localSettings.venueBoost.enabled ? "Configure" : "Connect"}
              </Button>
            </div>
          </div>

          {/* Bank Integration */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <h3 className="font-medium">Bank Integration</h3>
              <p className="text-sm text-muted-foreground">Connect your bank account</p>
              {localSettings.bankIntegration.lastSync && (
                <p className="text-xs text-muted-foreground">
                  Last synced: {new Date(localSettings.bankIntegration.lastSync).toLocaleString()}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={localSettings.bankIntegration.enabled ? "default" : "secondary"}>
                {localSettings.bankIntegration.enabled ? "Connected" : "Disconnected"}
              </Badge>
              <Button variant="outline" size="sm">
                {localSettings.bankIntegration.enabled ? "Configure" : "Connect"}
              </Button>
            </div>
          </div>

          {/* Webhooks */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Webhooks</h3>
              <Button variant="outline" size="sm" onClick={() => setShowWebhookModal(true)}>
                Add Webhook
              </Button>
            </div>
            <div className="space-y-4">
              {localSettings.webhooks.endpoints.map((webhook, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="font-medium">{webhook.url}</div>
                      <div className="text-sm text-muted-foreground">
                        Events: {webhook.events.join(", ")}
                      </div>
                    </div>
                    <Badge variant={webhook.enabled ? "default" : "secondary"}>
                      {webhook.enabled ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Webhook Modal */}
      <Dialog open={showWebhookModal} onOpenChange={setShowWebhookModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Webhook</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Endpoint URL</label>
              <Input
                value={newWebhook.url}
                onChange={(e) => setNewWebhook((prev) => ({ ...prev, url: e.target.value }))}
                placeholder="https://"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Secret Key</label>
              <Input
                value={newWebhook.secret}
                onChange={(e) => setNewWebhook((prev) => ({ ...prev, secret: e.target.value }))}
                type="password"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowWebhookModal(false)}>
                Cancel
              </Button>
              <Button onClick={addWebhook}>Add Webhook</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
