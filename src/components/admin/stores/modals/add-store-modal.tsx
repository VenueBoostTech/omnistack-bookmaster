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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useStores } from '@/hooks/useStores'
import toast from 'react-hot-toast'

interface AddStoreModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const initialFormData = {
  name: '',
  code: '',
  countryId: '',
  stateId: '',
  cityId: '',
  addressLine1: '',
  addressLine2: '',
  postcode: '',
  latitude: '',
  longitude: '',
  externalIds: {
    venueboostId: ''
  }
};

export function AddStoreModal({ isOpen, onClose, onSuccess }: AddStoreModalProps) {
  const [formData, setFormData] = useState(initialFormData);
  const { 
    createStore, 
    isLoading,
    countries,
    states,
    cities,
    fetchStatesForCountry,
    fetchCitiesForState
  } = useStores();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Convert string coordinates to numbers if provided
      const storeData = {
        ...formData,
        latitude: formData.latitude ? parseFloat(formData.latitude) : undefined,
        longitude: formData.longitude ? parseFloat(formData.longitude) : undefined
      };

      await createStore(storeData);
      setFormData(initialFormData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error creating store:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create store');
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  // Fetch states when country changes
  const handleCountryChange = async (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      countryId: value,
      stateId: '',
      cityId: ''
    }));
    await fetchStatesForCountry(value);
  };

  // Fetch cities when state changes
  const handleStateChange = async (value: string) => {
    setFormData(prev => ({
      ...prev,
      stateId: value,
      cityId: ''
    }));
    await fetchCitiesForState(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Store</DialogTitle>
            <DialogDescription>
              Create a new store location by filling out the information below.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Store Name</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter store name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="code">Store Code</Label>
                <Input
                  id="code"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="Enter unique code"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label>Country</Label>
                <Select 
                  value={formData.countryId} 
                  onValueChange={handleCountryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.id} value={country.id}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>State</Label>
                <Select 
                  value={formData.stateId} 
                  onValueChange={handleStateChange}
                  disabled={!formData.countryId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.id} value={state.id}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>City</Label>
                <Select 
                  value={formData.cityId} 
                  onValueChange={(value) => setFormData({ ...formData, cityId: value })}
                  disabled={!formData.stateId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="addressLine1">Address Line 1</Label>
              <Input
                id="addressLine1"
                required
                value={formData.addressLine1}
                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                placeholder="Enter street address"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="addressLine2">Address Line 2</Label>
              <Input
                id="addressLine2"
                value={formData.addressLine2}
                onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                placeholder="Apartment, suite, etc. (optional)"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="postcode">Postal Code</Label>
                <Input
                  id="postcode"
                  value={formData.postcode}
                  onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                  placeholder="Enter postal code"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                  placeholder="Enter latitude"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  placeholder="Enter longitude"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="venueboostId">Venueboost ID</Label>
              <Input
                id="venueboostId"
                value={formData.externalIds.venueboostId}
                onChange={(e) => setFormData({
                  ...formData,
                  externalIds: { ...formData.externalIds, venueboostId: e.target.value }
                })}
                placeholder="Enter Venueboost ID (optional)"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Store"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}