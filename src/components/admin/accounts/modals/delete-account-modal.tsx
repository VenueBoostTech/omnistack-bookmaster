// components/modals/delete-account-modal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  accountName: string;
}

export function DeleteAccountModal({ isOpen, onClose, onConfirm, accountName }: DeleteAccountModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 py-4">
          <div className="p-3 rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h4 className="font-medium">Are you sure?</h4>
            <p className="text-sm text-muted-foreground mt-1">
              This will permanently delete the account "{accountName}" and cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={onConfirm}>
            Delete Account
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}