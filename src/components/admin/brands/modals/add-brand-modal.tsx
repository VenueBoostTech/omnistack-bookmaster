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
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { X } from 'lucide-react'
import { useBrands } from '@/hooks/useBrands'
import toast from 'react-hot-toast'

interface AddBrandModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

interface DynamicField {
  key: string
  value: string
}

const initialFormData = {
  name: '',
  code: '',
  description: '',
  apiConfig: {
    apiKey: '',
    apiSecret: '',
    endpoint: '',
    endpoints: {},
    headers: {},
    isAutoSyncEnabled: false
  }
};

export function AddBrandModal({ isOpen, onClose, onSuccess }: AddBrandModalProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [newEndpoint, setNewEndpoint] = useState<DynamicField>({ key: '', value: '' });
  const [newHeader, setNewHeader] = useState<DynamicField>({ key: '', value: '' });
  const { createBrand, isLoading } = useBrands();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const submissionData = {
        name: formData.name,
        code: formData.code,
        description: formData.description,
      };

      if (formData.apiConfig.apiKey && formData.apiConfig.endpoint) {
        (submissionData as any).apiConfig = {
          ...formData.apiConfig,
          endpoints: Object.keys(formData.apiConfig.endpoints).length > 0 
            ? formData.apiConfig.endpoints 
            : undefined,
          headers: Object.keys(formData.apiConfig.headers).length > 0 
            ? formData.apiConfig.headers 
            : undefined
        };
      }

      await createBrand(submissionData);
      setFormData(initialFormData);
      onSuccess();
      onClose();
      
      toast.success('Brand created successfully');
    } catch (error) {
      console.error('Error creating brand:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create brand');
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setShowAdvanced(false);
    setNewEndpoint({ key: '', value: '' });
    setNewHeader({ key: '', value: '' });
    onClose();
  };

  const handleAddEndpoint = () => {
    if (!newEndpoint.key || !newEndpoint.value) return;
    
    setFormData({
      ...formData,
      apiConfig: {
        ...formData.apiConfig,
        endpoints: {
          ...formData.apiConfig.endpoints,
          [newEndpoint.key]: newEndpoint.value
        }
      }
    });
    setNewEndpoint({ key: '', value: '' });
  };

  const handleRemoveEndpoint = (keyToRemove: string) => {
    const updatedEndpoints = { ...formData.apiConfig.endpoints };
    delete updatedEndpoints[keyToRemove];
    
    setFormData({
      ...formData,
      apiConfig: {
        ...formData.apiConfig,
        endpoints: updatedEndpoints
      }
    });
  };

  const handleAddHeader = () => {
    if (!newHeader.key || !newHeader.value) return;
    
    setFormData({
      ...formData,
      apiConfig: {
        ...formData.apiConfig,
        headers: {
          ...formData.apiConfig.headers,
          [newHeader.key]: newHeader.value
        }
      }
    });
    setNewHeader({ key: '', value: '' });
  };

  const handleRemoveHeader = (keyToRemove: string) => {
    const updatedHeaders = { ...formData.apiConfig.headers };
    delete updatedHeaders[keyToRemove];
    
    setFormData({
      ...formData,
      apiConfig: {
        ...formData.apiConfig,
        headers: updatedHeaders
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] h-[80vh] overflow-y-auto">
      <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Brand</DialogTitle>
            <DialogDescription>
              Add a new brand to your inventory. Fill out the basic information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Basic Information */}
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

            {/* API Configuration */}
            <div className="grid gap-2">
              <Label htmlFor="apiKey">API Key</Label>
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
              <Label htmlFor="apiSecret">API Secret</Label>
              <Input
                id="apiSecret"
                type="password"
                value={formData.apiConfig.apiSecret}
                onChange={(e) => setFormData({
                  ...formData,
                  apiConfig: { ...formData.apiConfig, apiSecret: e.target.value }
                })}
                placeholder="Enter API secret"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endpoint">API Endpoint</Label>
              <Input
                id="endpoint"
                value={formData.apiConfig.endpoint}
                onChange={(e) => setFormData({
                  ...formData,
                  apiConfig: { ...formData.apiConfig, endpoint: e.target.value }
                })}
                placeholder="https://api.example.com/v1"
              />
            </div>

            {/* Advanced Configuration */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="showAdvanced"
                checked={showAdvanced}
                onCheckedChange={(checked) => setShowAdvanced(!!checked)}
              />
              <Label htmlFor="showAdvanced">Show advanced settings</Label>
            </div>

            {showAdvanced && (
              <>
                {/* Endpoints Section */}
                <div className="grid gap-2">
                  <Label>API Endpoints</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Key (e.g., products)"
                      value={newEndpoint.key}
                      onChange={(e) => setNewEndpoint({ ...newEndpoint, key: e.target.value })}
                    />
                    <Input
                      placeholder="Value (e.g., /v1/products)"
                      value={newEndpoint.value}
                      onChange={(e) => setNewEndpoint({ ...newEndpoint, value: e.target.value })}
                    />
                    <Button type="button" onClick={handleAddEndpoint}>Add</Button>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(formData.apiConfig.endpoints).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between bg-secondary/20 p-2 rounded">
                        <div className="flex gap-2">
                          <span className="font-medium">{key}:</span>
                          <span>{value}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveEndpoint(key)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Headers Section */}
                <div className="grid gap-2">
                  <Label>Custom Headers</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Header name"
                      value={newHeader.key}
                      onChange={(e) => setNewHeader({ ...newHeader, key: e.target.value })}
                    />
                    <Input
                      placeholder="Header value"
                      value={newHeader.value}
                      onChange={(e) => setNewHeader({ ...newHeader, value: e.target.value })}
                    />
                    <Button type="button" onClick={handleAddHeader}>Add</Button>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(formData.apiConfig.headers).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between bg-secondary/20 p-2 rounded">
                        <div className="flex gap-2">
                          <span className="font-medium">{key}:</span>
                          <span>{value}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveHeader(key)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="autoSync"
                    checked={formData.apiConfig.isAutoSyncEnabled}
                    onCheckedChange={(checked) => setFormData({
                      ...formData,
                      apiConfig: { ...formData.apiConfig, isAutoSyncEnabled: !!checked }
                    })}
                  />
                  <Label htmlFor="autoSync">Enable automatic synchronization</Label>
                </div>
              </>
            )}
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