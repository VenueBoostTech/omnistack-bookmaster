"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Store,
  Package,
  Search,
  Filter,
  Plus,
  Download,
  Building2,
  Cloud,
  Settings,
  Trash2,
  Key,
} from "lucide-react";
import { useBrands } from '@/hooks/useBrands';
import { Brand } from '../../../app/api/external/omnigateway/types';

import { useRouter } from 'next/navigation';
import { AddBrandModal } from './modals/add-brand-modal';
import { DeleteBrandModal } from './modals/delete-brand-modal';
import { BrandApiConfig } from './modals/brand-api-modal';
import SyncButton from './modals/sync-button';

const BRAND_FILTERS = [
  { value: "ALL", label: "All Brands" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "CONNECTED", label: "API Connected" },
  { value: "DISCONNECTED", label: "API Disconnected" }
];

const getStatusBadge = (status: string) => {
  const colors = {
    'ACTIVE': 'bg-green-100 text-green-800',
    'INACTIVE': 'bg-red-100 text-red-800',
    'SYNCING': 'bg-blue-100 text-blue-800'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

const getApiStatusBadge = (hasConfig: boolean) => {
  return hasConfig 
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800';
};


export function BrandsContent() {
  const router = useRouter();
  const {
    isLoading,
    brands,
    totalItems,
    totalPages,
    fetchBrands,
    deleteBrand
  } = useBrands();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [showApiConfig, setShowApiConfig] = useState(false);

  useEffect(() => {
    fetchBrands({
      page,
      limit: pageSize,
      status: selectedFilter !== 'ALL' ? selectedFilter : undefined,
      search: searchTerm
    });
  }, [fetchBrands, page, pageSize, selectedFilter, searchTerm]);

  const handleDelete = async () => {
    if (!selectedBrand) return;
    await deleteBrand(selectedBrand.id);
    fetchBrands({
      page,
      limit: pageSize,
      status: selectedFilter !== 'ALL' ? selectedFilter : undefined,
      search: searchTerm
    });
    setShowDeleteModal(false);
  };

  const metrics = {
    total: totalItems || 0,
    active: brands?.filter(b => b.status === 'ACTIVE').length,
    connected: brands?.filter(b => b.apiConfig).length,
    totalProducts: brands?.reduce((acc, brand) => acc + (brand.totalProducts || 0), 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Brands</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage vendor brands and their integrations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="secondary" onClick={() => router.push('/admin/products')}>
            <Package className="h-4 w-4 mr-2" />
            Products
          </Button>
          <Button onClick={() => setShowAddModal(true)} style={{ backgroundColor: "#5FC4D0" }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Brand
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Brands</p>
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
                <p className="text-sm text-muted-foreground">Active Brands</p>
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
                <p className="text-sm text-muted-foreground">Connected APIs</p>
                <p className="text-2xl font-bold">{metrics.connected}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Cloud className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{metrics.totalProducts}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Package className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="mb-2">
            <h3 className="text-lg">Filter Brands</h3>
            <p className="text-sm text-muted-foreground">
              Search and filter through brands
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {BRAND_FILTERS.map((filter) => (
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
                placeholder="Search brands..." 
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

      {/* Brands Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>API Status</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : brands.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="text-4xl mb-4">🏢</div>
                    <h3 className="text-lg font-medium">No brands found</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Start by adding your first brand
                    </p>
                    <Button 
                      className="mt-4"
                      style={{ backgroundColor: "#5FC4D0" }}
                      onClick={() => setShowAddModal(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Brand
                    </Button>
                  </TableCell>
                </TableRow>
              ) : brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{brand.name}</div>
                      <div className="text-sm text-muted-foreground">{brand.code}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                  {brand.description ?? '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      {brand.totalProducts || 0}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusBadge(brand.status)}>
                      {brand.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                          setSelectedBrand(brand);
                          setShowApiConfig(true);
                      }}
                  >
                      <Key className="h-4 w-4" />
                  </Button>
                    <SyncButton brand={brand} />
                    <Badge 
                      variant="secondary" 
                      className={getApiStatusBadge(!!brand.apiConfig)}
                    >
                      {brand.apiConfig ? 'Connected' : 'Not Connected'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {brand.lastSync ? new Date(brand.lastSync).toLocaleDateString() : 'Never'}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedBrand(brand);
                          setShowDeleteModal(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
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
       <AddBrandModal 
         isOpen={showAddModal}
         onClose={() => setShowAddModal(false)}
         onSuccess={() => {
           fetchBrands({
             page,
             limit: pageSize,
             status: selectedFilter !== 'ALL' ? selectedFilter : undefined,
             search: searchTerm
           });
         }}
       />
     )}

{showApiConfig && selectedBrand && (
    <BrandApiConfig
        brand={selectedBrand}
        isOpen={showApiConfig}
        onClose={() => {
            setShowApiConfig(false);
            setSelectedBrand(null);
        }}
        onSuccess={() => {
            fetchBrands({
                page,
                limit: pageSize,
                status: selectedFilter !== 'ALL' ? selectedFilter : undefined,
                search: searchTerm
            });
        }}
    />
)}
     {showDeleteModal && (
       <DeleteBrandModal
         isOpen={showDeleteModal}
         onClose={() => setShowDeleteModal(false)}
         onConfirm={handleDelete}
         brandName={selectedBrand?.name || ''}
       />
     )}

   </div>
 );
}

export default BrandsContent;