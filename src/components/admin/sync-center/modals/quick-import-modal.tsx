import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { FileUploadZone } from "../components/file-upload-zone";

// src/components/admin/sync-center/modals/quick-import-modal.tsx
export function QuickImportModal({
    isOpen,
    onClose
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          < DialogHeader>
            <DialogTitle>Quick Import</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <FileUploadZone />
            <div>
              <h4 className="font-medium mb-2">Import Settings</h4>
              <div className="space-y-2">
                <Checkbox label="Update existing products" />
                <Checkbox label="Skip errors and continue" />
              </div>
            </div>
            <div className="space-y-2">
              <Button className="w-full">Start Import</Button>
              <Button variant="outline" className="w-full" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }