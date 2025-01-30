"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from '@/components/ui/textarea'
import { useBrands } from '@/hooks/useBrands'

interface AddBrandModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const initialFormData = {
  name: '',
  code: '',
  description: '',
  apiConfig: {
    apiKey: '',
    endpoint: ''
  }
};

export function AddBrandModal({ isOpen, onClose, onSuccess }: AddBrandModalProps) {
  const [formData, setFormData] = useState(initialFormData);
  const { createBrand, isLoading } = useBrands();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createBrand(formData);
      setFormData(initialFormData); // Reset form
      onSuccess();
      onClose();
      
      toast({
        title: "Success",
        description: "Brand created successfully",
      });
    } catch (error) {
      console.error('Error creating brand:', error);
      // Error toast is already shown by the useBrands hook
    }
  };

  const handleClose = () => {
    setFormData(initialFormData); // Reset form on close
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Brand</DialogTitle>
            <DialogDescription>
              Add a new brand to your inventory. Fill out the basic information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Brand Name</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter brand name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="code">Brand Code</Label>
              <Input
                id="code"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="Enter unique code"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter brand description"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="apiKey">API Key (Optional)</Label>
              <Input
                id="apiKey"
                value={formData.apiConfig.apiKey}
                onChange={(e) => setFormData({
                  ...formData,
                  apiConfig: { ...formData.apiConfig, apiKey: e.target.value }
                })}
                placeholder="Enter API key"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endpoint">API Endpoint (Optional)</Label>
              <Input
                id="endpoint"
                value={formData.apiConfig.endpoint}
                onChange={(e) => setFormData({
                  ...formData,
                  apiConfig: { ...formData.apiConfig, endpoint: e.target.value }
                })}
                placeholder="Enter API endpoint"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Brand"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}