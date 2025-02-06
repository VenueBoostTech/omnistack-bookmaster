// components/modals/sync-vb-modal.tsx

"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import InputSelect from "@/components/Common/InputSelect"
import { useStores } from '@/hooks/useStores'
import toast from 'react-hot-toast'
import { useVenueBoost } from '@/hooks/useVenueBoost'

interface SyncVBModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
  }
  
  export function SyncVBModal({ isOpen, onClose, onSuccess }: SyncVBModalProps) {
    const [selectedStore, setSelectedStore] = useState('');
    const [selectedVBStore, setSelectedVBStore] = useState('');
    const { stores } = useStores();
    const { listStores, connectStore, vbStores, isLoading } = useVenueBoost();
  
    useEffect(() => {
        if (isOpen) {
          listStores().catch(console.error);
        }
      }, [isOpen, listStores]);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await connectStore({
          osId: selectedStore,
          vbId: parseInt(selectedVBStore)
        });
        toast.success('Store connected successfully');
        onSuccess();
        onClose();
      } catch (error) {
        toast.error('Failed to connect store');
      }
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect VenueBoost Store</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <InputSelect
                name="store"
                label="Local Store"
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                options={stores.map(s => ({
                  value: s._id,
                  label: s.name
                }))}
              />
              <InputSelect
                name="vbStore" 
                label="VenueBoost Store"
                value={selectedVBStore}
                onChange={(e) => setSelectedVBStore(e.target.value)}
                options={vbStores?.map(s => ({
                    value: s.id,
                    label: s.name
                }))}
                disabled={isLoading}
                />
            </div>
            <DialogFooter>
              <Button className='mt-2' type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit">Connect</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }