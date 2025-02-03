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
import InputSelect from "@/components/Common/InputSelect"
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

  // Transform location data for InputSelect
  const countryOptions = countries.map(country => ({
    value: country._id,
    label: country.name
  }));

  const stateOptions = states.map(state => ({
    value: state._id,
    label: state.name
  }));

  const cityOptions = cities.map(city => ({
    value: city._id,
    label: city.name
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const storeData = {
        ...formData
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

  // Handle location selection changes
  const handleCountryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ 
      ...prev, 
      countryId: value,
      stateId: '',
      cityId: ''
    }));
    if (value && value !== 'Select Option') {
      await fetchStatesForCountry(value);
    }
  };

  const handleStateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      stateId: value,
      cityId: ''
    }));
    if (value && value !== 'Select Option') {
      await fetchCitiesForState(value);
    }
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
              <InputSelect
                name="country"
                label="Country"
                options={countryOptions}
                value={formData.countryId}
                onChange={handleCountryChange}
                required
              />

              <InputSelect
                name="state"
                label="State"
                options={stateOptions}
                value={formData.stateId}
                onChange={handleStateChange}
                required
              />

              <InputSelect
                name="city"
                label="City"
                options={cityOptions}
                value={formData.cityId}
                onChange={(e) => setFormData({ ...formData, cityId: e.target.value })}
                required
              />
            </div>

            {/* Rest of the form fields remain the same */}
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

            <div className="grid grid-cols-1 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="postcode">Postal Code</Label>
                <Input
                  id="postcode"
                  value={formData.postcode}
                  onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                  placeholder="Enter postal code"
                />
              </div>
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