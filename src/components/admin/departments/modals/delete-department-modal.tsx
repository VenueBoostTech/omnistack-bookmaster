import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// components/admin/departments/modals/delete-department-modal.tsx
interface DeleteDepartmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    departmentName: string;
   }
   
   export function DeleteDepartmentModal({ 
    isOpen, 
    onClose, 
    onConfirm,
    departmentName 
   }: DeleteDepartmentModalProps) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Department</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to delete {departmentName}? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button variant="default" onClick={onConfirm}>Delete</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
   }