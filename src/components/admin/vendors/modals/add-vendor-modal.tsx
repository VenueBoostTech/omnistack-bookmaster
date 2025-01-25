// src/components/admin/vendors/modals/add-vendor-modal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputSelect from "@/components/Common/InputSelect";
import { useState } from "react";
import { useClient } from "@/hooks/useClient";
import { toast } from "react-hot-toast";
import { VendorStatus } from "@prisma/client";

interface AddVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddVendorModal({ isOpen, onClose, onSuccess }: AddVendorModalProps) {
  const { clientId } = useClient();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'ACTIVE' as VendorStatus,
    taxId: '',
    creditLimit: 0,
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, clientId }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error);
      }
      
      toast.success('Vendor created successfully');
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error?.message || 'Failed to create vendor');
    } finally {
      setIsLoading(false);
    }
    };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Vendor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input 
              className="mt-1"
              required
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div>
            <Label>Type</Label>
            <InputSelect
              name="type"
              label=""
              value={formData.type}
              onChange={e => setFormData(prev => ({ ...prev, type: e.target.value }))}
              options={[
                { value: "MANUFACTURER", label: "Manufacturer" },
                { value: "DISTRIBUTOR", label: "Distributor" },
                { value: "WHOLESALER", label: "Wholesaler" },
                { value: "OTHER", label: "Other" }
              ]}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              <Input
                className="mt-1"
                type="email"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                className="mt-1"
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <Label>Address</Label>
            <Input
             className="mt-1"
              value={formData.address}
              onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tax ID</Label>
              <Input
                 className="mt-1"
                value={formData.taxId}
                onChange={e => setFormData(prev => ({ ...prev, taxId: e.target.value }))}
              />
            </div>
            <div>
              <Label>Credit Limit</Label>
              <Input
                 className="mt-1"
                type="number"
                value={formData.creditLimit}
                onChange={e => setFormData(prev => ({ ...prev, creditLimit: Number(e.target.value) }))}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Vendor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}