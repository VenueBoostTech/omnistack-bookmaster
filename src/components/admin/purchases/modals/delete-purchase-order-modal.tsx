// components/purchases/modals/delete-purchase-order-modal.tsx
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function DeletePurchaseOrderModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  orderNumber 
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderNumber?: string;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Purchase Order</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Are you sure you want to delete purchase order #{orderNumber}? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="default" onClick={onConfirm}>Delete</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}