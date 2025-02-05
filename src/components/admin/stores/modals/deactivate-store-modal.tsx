"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteStoreModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  storeName: string
}

export function DeactivateStoreModal({ isOpen, onClose, onConfirm, storeName }: DeleteStoreModalProps) {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deactivate Store?</AlertDialogTitle>
            <AlertDialogDescription>
              This will deactivate the store "{storeName}". The store can be reactivated later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm} className="bg-orange-600 hover:bg-orange-700">
              Deactivate Store
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }