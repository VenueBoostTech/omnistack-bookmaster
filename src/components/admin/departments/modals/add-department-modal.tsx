import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useClient } from "@/hooks/useClient";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";

// components/admin/departments/modals/add-department-modal.tsx
interface AddDepartmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
   }
   
   export function AddDepartmentModal({ isOpen, onClose, onSuccess }: AddDepartmentModalProps) {
    const { clientId } = useClient();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
   
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
   
      try {
        const res = await fetch('/api/departments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, clientId })
        });
   
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
   
        toast.success('Department created');
        onSuccess();
        onClose();
      } catch (error) {
        toast.error('Failed to create department');
      } finally {
        setLoading(false);
      }
    };
   
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Department</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter department name"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Department"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
}