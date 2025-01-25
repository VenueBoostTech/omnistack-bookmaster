// src/components/admin/sync-center/modals/brand-sync-settings-modal.tsx
import InputSelect from "@/components/Common/InputSelect";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function BrandSyncSettingsModal({
    isOpen,
    onClose,
    brand
  }: {
    isOpen: boolean;
    onClose: () => void;
    brand: string;
  }) {

    const [selectedFrequency, setSelectedFrequency] = useState('daily');
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sync Settings - {brand}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Sync Frequency</Label>
              <InputSelect
                name="frequency"
                label=""
                value={selectedFrequency}
                onChange={(e) => setSelectedFrequency(e.target.value)}
                options={[
                  { value: "daily", label: "Daily" },
                  { value: "weekly", label: "Weekly" },
                  { value: "manual", label: "Manual" }
                ]}
              />
            </div>
            <div>
              <Label >Sync Time</Label>
              <Input className="mt-2 mb-8" type="time" />
            </div>
            <Checkbox label="Auto-update existing products" />
            <Checkbox label="Notify on completion" />
            <div className="space-y-2">
              <Button className="w-full">Save Settings</Button>
              <Button variant="outline" className="w-full" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }