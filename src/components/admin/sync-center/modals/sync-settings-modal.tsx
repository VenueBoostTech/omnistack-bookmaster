import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
// src/components/admin/sync-center/modals/sync-settings-modal.tsx
// src/components/admin/sync-center/modals/sync-settings-modal.tsx
export function SyncSettingsModal({
    isOpen,
    onClose,
    brand
  }: {
    isOpen: boolean;
    onClose: () => void;
    brand: string;
  }) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sync Settings - {brand}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Sync Frequency</Label>
              <Select>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Sync Time</Label>
              <Input type="time" />
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