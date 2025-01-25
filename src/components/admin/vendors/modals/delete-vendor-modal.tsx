// components/admin/vendors/modals/delete-vendor-modal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  vendorName: string;
}

export function DeleteVendorModal({ isOpen, onClose, onConfirm, vendorName }: DeleteVendorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Vendor</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Are you sure you want to delete {vendorName}? This action cannot be undone.</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="destructive" onClick={onConfirm}>Delete</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}