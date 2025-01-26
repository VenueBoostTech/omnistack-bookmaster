import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "@/components/ui/dialog";

// src/components/admin/transactions/modals/delete-transaction-modal.tsx
export function DeleteTransactionModal({ isOpen, onClose, onConfirm, transactionId }: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    transactionId: string;
   }) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Transaction</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to delete transaction #{transactionId}? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button variant="default" onClick={onConfirm}>Delete</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
   }