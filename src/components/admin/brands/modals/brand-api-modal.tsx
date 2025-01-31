import { Brand } from "@/app/api/external/omnigateway/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from 'lucide-react';
import { useState } from "react";
import { useBrands } from "@/hooks/useBrands";
import toast from "react-hot-toast";

interface BrandApiConfigProps {
    brand: Brand;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

interface DynamicField {
    key: string;
    value: string;
}

export function BrandApiConfig({ brand, isOpen, onClose, onSuccess }: BrandApiConfigProps) {
    const { updateBrandApiConfig } = useBrands();
    const [isLoading, setIsLoading] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [newEndpoint, setNewEndpoint] = useState<DynamicField>({ key: '', value: '' });
    const [newHeader, setNewHeader] = useState<DynamicField>({ key: '', value: '' });
    const [formData, setFormData] = useState({
        apiKey: brand?.apiConfig?.apiKey || '',
        endpoint: brand?.apiConfig?.endpoint || '',
        apiSecret: brand?.apiConfig?.apiSecret || '',
        isAutoSyncEnabled: brand?.apiConfig?.isAutoSyncEnabled || false,
        endpoints: brand?.apiConfig?.endpoints || {},
        headers: brand?.apiConfig?.headers || {}
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await updateBrandApiConfig(brand.id, formData);
            toast.success('API configuration updated successfully');
            onSuccess();
            onClose();
        } catch (error) {
            toast.error('Failed to update API configuration');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddEndpoint = () => {
        if (!newEndpoint.key || !newEndpoint.value) return;
        
        setFormData({
            ...formData,
            endpoints: {
                ...formData.endpoints,
                [newEndpoint.key]: newEndpoint.value
            }
        });
        setNewEndpoint({ key: '', value: '' });
    };

    const handleRemoveEndpoint = (keyToRemove: string) => {
        const updatedEndpoints = { ...formData.endpoints };
        delete updatedEndpoints[keyToRemove];
        setFormData({ ...formData, endpoints: updatedEndpoints });
    };

    const handleAddHeader = () => {
        if (!newHeader.key || !newHeader.value) return;
        
        setFormData({
            ...formData,
            headers: {
                ...formData.headers,
                [newHeader.key]: newHeader.value
            }
        });
        setNewHeader({ key: '', value: '' });
    };

    const handleRemoveHeader = (keyToRemove: string) => {
        const updatedHeaders = { ...formData.headers };
        delete updatedHeaders[keyToRemove];
        setFormData({ ...formData, headers: updatedHeaders });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>API Configuration</DialogTitle>
                    <DialogDescription>
                        Configure the API settings for this brand
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="apiKey">API Key</Label>
                            <Input
                                id="apiKey"
                                value={formData.apiKey}
                                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                                placeholder="Enter API key"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="apiSecret">API Secret</Label>
                            <Input
                                id="apiSecret"
                                type="password"
                                value={formData.apiSecret}
                                onChange={(e) => setFormData({ ...formData, apiSecret: e.target.value })}
                                placeholder="Enter API secret"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="endpoint">API Endpoint</Label>
                            <Input
                                id="endpoint"
                                value={formData.endpoint}
                                onChange={(e) => setFormData({ ...formData, endpoint: e.target.value })}
                                placeholder="https://api.example.com/v1"
                            />
                        </div>

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
                                        {Object.entries(formData.endpoints).map(([key, value]) => (
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
                                        {Object.entries(formData.headers).map(([key, value]) => (
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
                                        checked={formData.isAutoSyncEnabled}
                                        onCheckedChange={(checked) => 
                                            setFormData({ ...formData, isAutoSyncEnabled: !!checked })
                                        }
                                    />
                                    <Label htmlFor="autoSync">Enable automatic synchronization</Label>
                                </div>
                            </>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}