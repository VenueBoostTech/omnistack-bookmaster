"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Store,
  Search,
  Filter,
  Plus,
  Download,
  MapPin,
  Settings,
  Trash2,
  Building2,
  FolderSyncIcon,
  X
} from "lucide-react";
import { useStores } from '@/hooks/useStores';
import { useCustomSettings } from '@/hooks/useCustomSettings';
import { useVenueBoost } from '@/hooks/useVenueBoost';
import { Store as StoreType } from '../../../app/api/external/omnigateway/types/stores';
import { useRouter } from 'next/navigation';
import { AddStoreModal } from './modals/add-store-modal';
import { DeleteStoreModal } from './modals/delete-store-modal';
import { DeactivateStoreModal } from './modals/deactivate-store-modal';
import { SyncVBModal } from './modals/sync-vb-modal';
import toast from 'react-hot-toast';

const STORE_FILTERS = [
  { value: "ALL", label: "All Stores" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" }
];

const getStatusBadge = (status: boolean) => {
  return status 
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800';
};

export function StoresContent() {
  const router = useRouter();
  const {
    isLoading,
    stores,
    totalItems,
    totalPages,
    fetchStores,
    deleteStore,
    deactivateStore
  } = useStores();

  const { isVenueBoostEnabled } = useCustomSettings();
  const { disconnectStore } = useVenueBoost();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreType | null>(null);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);

  useEffect(() => {
    fetchStores({
      page,
      limit: pageSize,
      status: selectedFilter !== 'ALL' ? selectedFilter : undefined,
      search: searchTerm
    });
  }, [fetchStores, page, pageSize, selectedFilter, searchTerm]);

  const handleDelete = async () => {
    if (!selectedStore) return;
    await deleteStore(selectedStore._id);
    fetchStores({
      page,
      limit: pageSize,
      status: selectedFilter !== 'ALL' ? selectedFilter : undefined,
      search: searchTerm
    });
    setShowDeleteModal(false);
  };

  const metrics = {
    total: totalItems || 0,
    active: stores?.filter(s => s.isActive).length || 0,
    inactive: stores?.filter(s => !s.isActive).length || 0
  };

  const handleDeactivate = async () => {
    if (!selectedStore) return;
    await deactivateStore(selectedStore._id);
    fetchStores({
      page,
      limit: pageSize,
      status: selectedFilter !== 'ALL' ? selectedFilter : undefined,
      search: searchTerm
    });
    setShowDeactivateModal(false);
  };
  
  // Disconnect store function with success message and refresh of store list.
  const handleDisconnect = async (store: StoreType) => {
    if (!store.externalIds?.venueboostId) return;
    const vbId = parseInt(store.externalIds.venueboostId);
    try {
      await disconnectStore({
        vbId,
        osId: store._id,
        type: 'disconnect'
      });
      toast.success("Store disconnected successfully");
      fetchStores({
        page,
        limit: pageSize,
        status: selectedFilter !== 'ALL' ? selectedFilter : undefined,
        search: searchTerm
      });
    } catch (error) {
      toast.error("Error disconnecting store");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Stores</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your physical store locations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowAddModal(true)} style={{ backgroundColor: "#5FC4D0" }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Store
          </Button>
          {isVenueBoostEnabled && (
            <Button variant="secondary" onClick={() => setShowSyncModal(true)}>
              <FolderSyncIcon className="h-4 w-4 mr-2" />
              Sync VB Stores
            </Button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Stores</p>
                <p className="text-2xl font-bold">{metrics.total}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Store className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Active Stores</p>
                <p className="text-2xl font-bold">{metrics.active}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Building2 className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Inactive Stores</p>
                <p className="text-2xl font-bold">{metrics.inactive}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <Store className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="mb-2">
            <h3 className="text-lg">Filter Stores</h3>
            <p className="text-sm text-muted-foreground">
              Search and filter through stores
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {STORE_FILTERS.map((filter) => (
              <Button
                key={filter.value}
                variant={selectedFilter === filter.value ? "default" : "outline"}
                className={selectedFilter === filter.value ? "bg-red-600 hover:bg-red-700" : ""}
                onClick={() => setSelectedFilter(filter.value)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search stores..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stores Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Store</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                {isVenueBoostEnabled && <TableHead>VB Connect</TableHead>}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : stores.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-4xl mb-4">🏪</div>
                      <h3 className="text-lg font-medium">No stores found</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Start by adding your first store
                      </p>
                      <Button 
                        className="mt-4"
                        style={{ backgroundColor: "#5FC4D0" }}
                        onClick={() => setShowAddModal(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Store
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : stores.map((store) => (
                <TableRow key={store._id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{store.name}</div>
                      <div className="text-sm text-muted-foreground">{store.code}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div>{store.address?.addressLine1 || 'No address'}</div>
                        <div className="text-sm text-muted-foreground">
                          {store.address ? (
                            store.address.city?.name && store.address.state?.name && store.address.country?.name
                              ? `${store.address.city.name}, ${store.address.state.name}, ${store.address.country.name}`
                              : 'Address incomplete'
                          ) : (
                            'No location data'
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={getStatusBadge(store.isActive)}
                    >
                      {store.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  {isVenueBoostEnabled && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant={store.externalIds?.venueboostId ? "success" : "secondary"}>
                          {store.externalIds?.venueboostId ? "Connected" : "Not Connected"}
                        </Badge>
                        {store.externalIds?.venueboostId && (
                          <Button 
                            variant="secondary" 
                            size="2x-sm"
                            onClick={async () => {
                              await handleDisconnect(store);
                            }}
                          >
                            <X className="h-4 w-4 text-white" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedStore(store);
                          setShowDeactivateModal(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-orange-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedStore(store);
                          setShowDeleteModal(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="border-t px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <select
                  className="h-8 w-16 rounded-md border border-input bg-background"
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  {[5, 10, 20, 50].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Page {page} of {totalPages}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => p - 1)}
                disabled={page === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .map((p, i, arr) => (
                  <React.Fragment key={p}>
                    {i > 0 && arr[i - 1] !== p - 1 && (
                      <span className="px-2">...</span>
                    )}
                    <Button
                      variant={page === p ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(p)}
                      className={page === p ? "bg-red-600 hover:bg-red-700" : ""}
                    >
                      {p}
                    </Button>
                  </React.Fragment>
                ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => p + 1)}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showAddModal && (
        <AddStoreModal 
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            fetchStores({
              page,
              limit: pageSize,
              status: selectedFilter !== 'ALL' ? selectedFilter : undefined,
              search: searchTerm
            });
          }}
        />
      )}

      {showDeleteModal && selectedStore && (
        <DeleteStoreModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          storeName={selectedStore.name}
        />
      )}

      {showDeactivateModal && selectedStore && (
        <DeactivateStoreModal
          isOpen={showDeactivateModal}
          onClose={() => setShowDeactivateModal(false)}
          onConfirm={handleDeactivate}
          storeName={selectedStore.name}
        />
      )}

      {showSyncModal && (
        <SyncVBModal
          isOpen={showSyncModal}
          onClose={() => setShowSyncModal(false)}
          onSuccess={() => {
            fetchStores({
              page,
              limit: pageSize,
              status: selectedFilter !== 'ALL' ? selectedFilter : undefined,
              search: searchTerm
            });
          }}
        />
      )}
    </div>
  );
}

export default StoresContent;
