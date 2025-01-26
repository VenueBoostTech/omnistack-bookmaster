// components/modals/add-purchase-order-modal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputSelect from "@/components/Common/InputSelect";
import { useState, useEffect } from "react";
import { useClient } from "@/hooks/useClient";
import { toast } from "react-hot-toast";

interface AddPurchaseOrderModalProps {
 isOpen: boolean;
 onClose: () => void;
 onSuccess: () => void;
}

export function AddPurchaseOrderModal({ isOpen, onClose, onSuccess }: AddPurchaseOrderModalProps) {
 const { clientId } = useClient();
 const [vendors, setVendors] = useState([]);
 const [loading, setLoading] = useState(false);

 const [formData, setFormData] = useState({
   date: new Date().toISOString().split('T')[0],
   vendorId: '',
   expectedDelivery: '',
   status: 'DRAFT',
   priority: 'NORMAL',
   notes: '',
   items: [{
     productId: '',
     quantity: 1,
     unitPrice: 0,
     notes: ''
   }]
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
     items: [...prev.items, { productId: '', quantity: 1, unitPrice: 0, notes: '' }]
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
   setLoading(true);
   
   try {
     const res = await fetch('/api/purchase-orders', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ ...formData, clientId })
     });
     
     if (!res.ok) throw new Error('Failed to create order');
     
     toast.success('Purchase order created');
     onSuccess();
     onClose();
   } catch (error) {
    const updatedError = error instanceof Error ? 'General error' : 'Failed to create purchase order';
     toast.error(updatedError);
   } finally {
     setLoading(false);
   }
 };

 return (
   <Dialog open={isOpen} onOpenChange={onClose}>
     <DialogContent className="max-w-4xl">
       <DialogHeader>
         <DialogTitle>Create Purchase Order</DialogTitle>
       </DialogHeader>

       <form onSubmit={handleSubmit} className="space-y-4">
         <div className="grid grid-cols-2 gap-4">
           <div>
             <Label>Date</Label>
             <Input
               className="mt-3"
               type="date"
               required
               value={formData.date}
               onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
             />
           </div>
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
         </div>

         <div className="grid grid-cols-2 gap-4">
           <div>
             <Label>Expected Delivery</Label>
             <Input
               className="mt-3"
               type="date"
               value={formData.expectedDelivery}
               onChange={e => setFormData(prev => ({ ...prev, expectedDelivery: e.target.value }))}
             />
           </div>
           <div>
             <Label>Priority</Label>
             <InputSelect
               name="priority"
               label=""
               value={formData.priority}
               onChange={e => setFormData(prev => ({ ...prev, priority: e.target.value }))}
               options={[
                 { value: 'LOW', label: 'Low' },
                 { value: 'NORMAL', label: 'Normal' },
                 { value: 'HIGH', label: 'High' }
               ]}
             />
           </div>
         </div>

         {/* Items Section */}
         <div className="space-y-4">
           <Label>Items</Label>
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
                 <Label>Unit Price</Label>
                 <Input
                   className="mt-2"
                   type="number"
                   required
                   min="0"
                   step="0.01"
                   value={item.unitPrice}
                   onChange={e => handleItemChange(index, 'unitPrice', Number(e.target.value))}
                 />
               </div>
               <div className="col-span-2">
                 <Label>Notes</Label>
                 <Input
                   className="mt-2"
                   value={item.notes}
                   onChange={e => handleItemChange(index, 'notes', e.target.value)}
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
             </div>
           ))}
           <Button type="button" variant="outline" onClick={addItem}>
             Add Item
           </Button>
         </div>

         <div>
           <Label>Notes</Label>
           <Input
            className="mt-2"
             value={formData.notes}
             onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
           />
         </div>

         <div className="flex justify-end gap-2">
           <Button type="button" variant="outline" onClick={onClose}>
             Cancel
           </Button>
           <Button type="submit" disabled={loading}>
             {loading ? "Creating..." : "Create Order"}
           </Button>
         </div>
       </form>
     </DialogContent>
   </Dialog>
 );
}