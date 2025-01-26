// components/returns/modals/delete-return-modal.tsx
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function DeleteReturnModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  returnId 
}: { 
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  returnId?: string;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Return Request</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Are you sure you want to delete return #{returnId}? This action cannot be undone.
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