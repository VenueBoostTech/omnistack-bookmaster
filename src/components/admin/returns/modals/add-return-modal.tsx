import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import InputSelect from "@/components/Common/InputSelect";
import { useClient } from "@/hooks/useClient";

export function AddReturnModal({ 
  isOpen, 
  onClose, 
  onSuccess 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSuccess: () => void; 
}) {
  const { clientId } = useClient();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    vendorId: "",
    purchaseOrder: "",
    reason: "",
    type: "QUALITY_ISSUE",
    items: [{
      productId: '',
      quantity: 1,
      notes: ''
    }],
    notes: ""
  });

  useEffect(() => {
    const fetchVendors = async () => {
      const res = await fetch(`/api/vendors?clientId=${clientId}`);
      const data = await res.json();
      setVendors(data.items);
    };
    fetchVendors();
  }, [clientId]);

  const handleItemChange = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { productId: '', quantity: 1, notes: '' }]
    }));
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) return;

    try {
      setLoading(true);
      const res = await fetch("/api/returns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, clientId })
      });

      if (!res.ok) throw new Error("Failed to create return");
      
      toast.success("Return created successfully");
      onSuccess();
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create return";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create New Return</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Vendor</Label>
              <InputSelect
                name="vendorId"
                label=""
                value={formData.vendorId}
                required
                onChange={e => setFormData(prev => ({ ...prev, vendorId: e.target.value }))}
                options={vendors?.map(v => ({
                  value: v.id,
                  label: v.name
                }))}
              />
            </div>
            <div>
              <Label>Return Type</Label>
              <InputSelect
                name="type"
                label=""
                value={formData.type}
                onChange={e => setFormData(prev => ({ ...prev, type: e.target.value }))}
                options={[
                  { value: "QUALITY_ISSUE", label: "Quality Issue" },
                  { value: "SHIPPING_DAMAGE", label: "Shipping Damage" },
                  { value: "ORDER_ERROR", label: "Order Error" }
                ]}
              />
            </div>
          </div>

          <div>
            <Label>Purchase Order Number</Label>
            <Input
              className="mt-2"
              required
              value={formData.purchaseOrder}
              onChange={e => setFormData(prev => ({ ...prev, purchaseOrder: e.target.value }))}
            />
          </div>

          {/* Items Section */}
          <div className="space-y-4">
            <Label>Return Items</Label>
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 items-end">
                <div>
                  <Label>Product ID</Label>
                  <Input
                    className="mt-2"
                    required
                    value={item.productId}
                    onChange={e => handleItemChange(index, 'productId', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input
                    className="mt-2"
                    type="number"
                    required
                    min="1"
                    value={item.quantity}
                    onChange={e => handleItemChange(index, 'quantity', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => removeItem(index)}
                    disabled={formData.items.length === 1}
                  >
                    Remove
                  </Button>
                </div>
                <div className="col-span-3">
                  <Label>Item Notes</Label>
                  <Input
                    className="mt-2"
                    value={item.notes}
                    onChange={e => handleItemChange(index, 'notes', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addItem}>
              Add Item
            </Button>
          </div>

          <div>
            <Label>Reason for Return</Label>
            <Input
              className="mt-2"
              required
              value={formData.reason}
              onChange={e => setFormData(prev => ({ ...prev, reason: e.target.value }))}
            />
          </div>

          <div>
            <Label>Additional Notes</Label>
            <Input
              className="mt-2"
              value={formData.notes}
              onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Return"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}