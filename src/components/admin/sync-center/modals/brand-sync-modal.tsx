import { Progress } from "@/components/ui/progress";

import { Button } from "@/components/ui/button";
import { DialogTitle, Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

// src/components/admin/sync-center/modals/brand-sync-modal.tsx
export function BrandSyncModal({ isOpen, onClose, brand }: { isOpen: boolean; onClose: () => void; brand: string }) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sync {brand}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted/20 p-0 rounded-md">
              <h4 className="font-medium">Last Sync Status</h4>
              <Progress value={65} className="my-2" />
              <p className="text-sm text-muted-foreground">3,421 products updated</p>
            </div>
            <div className="space-y-2">
              <Button className="w-full">Start New Sync</Button>
              <Button variant="outline" className="w-full" onClick={onClose}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>         
    );
   }