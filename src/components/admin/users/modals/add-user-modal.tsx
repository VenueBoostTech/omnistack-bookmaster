// components/modals/add-user-modal.tsx
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useClient } from '@/hooks/useClient';
import { toast } from 'react-hot-toast';
import InputSelect from '@/components/Common/InputSelect';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddUserModal({ isOpen, onClose, onSuccess }: AddUserModalProps) {
  const [loading, setLoading] = useState(false);
  const { clientId } = useClient();
  const [departments, setDepartments] = useState<{id: string, name: string}[]>([]);
  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await fetch(`/api/departments?clientId=${clientId}`);
      const data = await res.json();
      setDepartments(data.items);
    };
    
    fetchDepartments();
  }, [clientId]);
  

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'USER',
    password: '',
    departmentId: ''
  });

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, clientId })
      });

      if (!res.ok) throw new Error('Failed to create user');

      toast.success('User created successfully');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <InputSelect
              label=""
              name="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              options={[
                { value: "ADMIN", label: "Administrator" },
                { value: "MANAGER", label: "Manager" },
                { value: "ACCOUNTANT", label: "Accountant" },
                { value: "USER", label: "User" }
              ]}
            />
            </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Department</label>
            <InputSelect
              label=""
              name="department"
              value={formData.departmentId}
              onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
              options={[
                { value: "", label: "No Department" },
                ...(departments?.length ? departments.map(d => ({
                  value: d.id,
                  label: d.name
                })) : [])
              ]}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create User'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}