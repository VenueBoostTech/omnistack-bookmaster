// components/admin/orders/modals/update-status-modal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import InputSelect from "@/components/Common/InputSelect";
import { useState } from "react";
import toast from "react-hot-toast";

const ORDER_STATUSES = [
  { value: "PENDING", label: "Pending" },
  { value: "PAID", label: "Paid" },
  { value: "REFUNDED", label: "Refunded" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "PARTIALLY_REFUNDED", label: "Partially Refunded" }
];

interface UpdateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (status: string) => Promise<void>;
  currentStatus: string;
}

export function UpdateStatusModal({ isOpen, onClose, onConfirm, currentStatus }: UpdateStatusModalProps) {
  const [status, setStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onConfirm(status);
      toast.success('Order status updated successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to update order status');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <InputSelect
              name="status"
              label="Select Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={ORDER_STATUSES}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Status"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}