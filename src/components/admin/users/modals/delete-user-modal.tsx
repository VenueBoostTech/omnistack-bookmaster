// components/modals/delete-user-modal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export function DeleteUserModal({ isOpen, onClose, onConfirm, userName }: DeleteUserModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 py-4">
          <div className="p-3 rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h4 className="font-medium">Are you sure?</h4>
            <p className="text-sm text-muted-foreground mt-1">
              This will permanently delete {userName}'s account and cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={onConfirm}>
            Delete User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}