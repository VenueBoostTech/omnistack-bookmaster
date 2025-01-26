// components/modals/add-account-modal.tsx
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useClient } from '@/hooks/useClient';
import { toast } from 'react-hot-toast';
import { AccountType, AccountCategory, Currency } from '@prisma/client';
import InputSelect from '@/components/Common/InputSelect';

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddAccountModal({ isOpen, onClose, onSuccess }: AddAccountModalProps) {
  const [loading, setLoading] = useState(false);
  const { clientId } = useClient();
  
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: 'ASSET',
    category: 'CASH',
    currency: 'USD'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, clientId })
      });

      if (!res.ok) throw new Error('Failed to create account');

      toast.success('Account created successfully');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Failed to create account');
    } finally {
      setLoading(false);
    }
  };


 
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Account</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
            <label>Account Code</label>
            <Input
              required
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label>Account Name</label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

        <InputSelect
           name="type"
           label="Type"
           value={formData.type}
           onChange={(e) => setFormData({ ...formData, type: e.target.value })}
           options={Object.values(AccountType).map(type => ({
             value: type,
             label: type
           }))}
         />

         <InputSelect
           name="category"
           label="Category" 
           value={formData.category}
           onChange={(e) => setFormData({ ...formData, category: e.target.value })}
           options={Object.values(AccountCategory).map(cat => ({
             value: cat,
             label: cat.replace(/_/g, ' ')
           }))}
         />

         <InputSelect
           name="currency"
           label="Currency"
           value={formData.currency}
           onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
           options={Object.values(Currency).map(cur => ({
             value: cur,
             label: cur 
           }))}
         />

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Account'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}