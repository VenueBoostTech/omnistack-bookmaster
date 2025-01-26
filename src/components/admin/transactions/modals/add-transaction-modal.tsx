// src/components/admin/transactions/modals/add-transaction-modal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputSelect from "@/components/Common/InputSelect";
import { useEffect, useState } from "react";
import { useClient } from "@/hooks/useClient";
import { toast } from "react-hot-toast";
import { TransactionType, TransactionStatus } from "@prisma/client";

interface AddTransactionModalProps {
 isOpen: boolean;
 onClose: () => void;
 onSuccess: () => void;
}

export function AddTransactionModal({ isOpen, onClose, onSuccess }: AddTransactionModalProps) {
 const { clientId } = useClient();
 const [formData, setFormData] = useState({
   date: new Date().toISOString().split('T')[0],
   type: 'PURCHASE' as TransactionType,
   description: '',
   accountId: '',
   reference: '',
   debit: 0,
   credit: 0,
   status: 'PENDING' as TransactionStatus
 });
 
 const [isLoading, setIsLoading] = useState(false);
 const [accounts, setAccounts] = useState([]);

 useEffect(() => {
  const fetchAccounts = async () => {
    if (!clientId) return;
    const res = await fetch(`/api/accounts?clientId=${clientId}`);
    const data = await res.json();
    setAccounts(data.items);
  };
  fetchAccounts();
}, [clientId]);

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setIsLoading(true);
   try {
     const res = await fetch('/api/transactions', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ ...formData, clientId }),
     });
     
     const data = await res.json();
     
     if (!res.ok) throw new Error(data.error);
     
     toast.success('Transaction created successfully');
     onSuccess();
     onClose();
   } catch (error: any) {
     toast.error(error?.message || 'Failed to create transaction');
   } finally {
     setIsLoading(false);
   }
 };

 return (
   <Dialog open={isOpen} onOpenChange={onClose}>
     <DialogContent className="sm:max-w-[500px]">
       <DialogHeader>
         <DialogTitle>Add New Transaction</DialogTitle>
       </DialogHeader>
       <form onSubmit={handleSubmit} className="space-y-4">
         <div className="grid grid-cols-2 gap-4">
           <div>
             <Label>Date</Label>
             <Input 
              className="mt-2"
               type="date"
               required
               value={formData.date}
               onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
             />
           </div>
           <div>
             <Label>Type</Label>
             <InputSelect
               label=""
               name="type"
               value={formData.type}
               onChange={e => setFormData(prev => ({ ...prev, type: e.target.value as TransactionType }))}
               options={[
                 { value: "PURCHASE", label: "Purchase" },
                 { value: "SALE", label: "Sale" },
                 { value: "PAYMENT", label: "Payment" },
                 { value: "RECEIPT", label: "Receipt" },
                 { value: "ADJUSTMENT", label: "Adjustment" },
                 { value: "TRANSFER", label: "Transfer" }
               ]}
             />
           </div>
         </div>
         <div>
            <Label>Account</Label>
            <InputSelect
              label=""
              name="account"
              value={formData.accountId}
              onChange={e => setFormData(prev => ({ ...prev, accountId: e.target.value }))}
              options={accounts.map(acc => ({
                value: acc.id,
                label: `${acc.code} - ${acc.name}`
              }))}
              required
            />
          </div>
         <div>
           <Label>Description</Label>
           <Input
             required
             value={formData.description}
             onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
           />
         </div>
         
         <div>
           <Label>Reference</Label>
           <Input
             value={formData.reference}
             onChange={e => setFormData(prev => ({ ...prev, reference: e.target.value }))}
           />
         </div>
         <div className="grid grid-cols-2 gap-4">
           <div>
             <Label>Debit</Label>
             <Input
               type="number"
               value={formData.debit}
               onChange={e => setFormData(prev => ({ ...prev, debit: Number(e.target.value) }))}
             />
           </div>
           <div>
             <Label>Credit</Label>
             <Input
               type="number"
               value={formData.credit}
               onChange={e => setFormData(prev => ({ ...prev, credit: Number(e.target.value) }))}
             />
           </div>
         </div>
         <div className="flex justify-end gap-2 mt-6">
           <Button variant="outline" type="button" onClick={onClose}>
             Cancel
           </Button>
           <Button type="submit" disabled={isLoading}>
             {isLoading ? "Creating..." : "Create Transaction"}
           </Button>
         </div>
       </form>
     </DialogContent>
   </Dialog>
 );
}