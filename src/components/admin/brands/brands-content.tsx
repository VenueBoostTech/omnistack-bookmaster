"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import InputSelect from "@/components/Common/InputSelect";
import {
  Building2,
  Search,
  Plus,
  Store,
  Package,
  LinkIcon,
  AlertCircle,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  FileSpreadsheet,
  History,
  Trash2,
  Cloud,
  Key,
  CheckCircle2,
  XCircle,
  RefreshCcw
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBrands } from '@/hooks/useBrands';
import { Brand } from '@/app/api/external/omnigateway/types';

const getStatusBadge = (status: string) => {
  const variants = {
    'ACTIVE': 'bg-green-100 text-green-800',
    'INACTIVE': 'bg-red-100 text-red-800',
    'SYNCING': 'bg-blue-100 text-blue-800'
  };
  return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
};

export function BrandsContent() {
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
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  useEffect(() => {
    fetchBrands({
      page,
      limit: pageSize,
      status: selectedStatus !== 'all' ? selectedStatus : undefined,
      search: searchTerm
    });
  }, [fetchBrands, page, pageSize, selectedStatus, searchTerm]);

  const handleDelete = async (brandId: string) => {
    await deleteBrand(brandId);
    fetchBrands({
      page,
      limit: pageSize,
      status: selectedStatus !== 'all' ? selectedStatus : undefined,
      search: searchTerm
    });
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (brands.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">🏢</div>
        <h3 className="text-lg font-medium">No brands found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Start by adding your first brand
        </p>
        <Button 
          className="mt-4"
          style={{ backgroundColor: "#5FC4D0" }}
          onClick={() => {/* TODO: Add new brand modal */}}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Brand
        </Button>
      </div>
    );
  }

  const statusCounts = {
    all: totalItems,
    active: brands.filter(b => b.status === 'ACTIVE').length,
    inactive: brands.filter(b => b.status === 'INACTIVE').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Brand Management</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage vendor brands and their API integrations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button style={{ backgroundColor: "#5FC4D0" }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Brand
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className='mb-2'>
            <h3 className="text-lg">Filter Brands</h3>
            <p className="text-sm text-muted-foreground">
              Search and filter through your brands
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'All Brands', count: statusCounts.all },
              { value: 'active', label: 'Active', count: statusCounts.active },
              { value: 'inactive', label: 'Inactive', count: statusCounts.inactive }
            ].map((status) => (
              <Button
                key={status.value}
                variant={selectedStatus === status.value ? "default" : "outline"}
                className={`group ${
                  selectedStatus === status.value ? "bg-red-600 hover:bg-red-700" : ""
                }`}
                onClick={() => setSelectedStatus(status.value)}
              >
                <span className={selectedStatus === status.value ? "text-white" : "text-gray-700"}>
                  {status.label}
                </span>
                <Badge 
                  variant="secondary" 
                  className={`ml-2 ${
                    selectedStatus === status.value 
                      ? "bg-red-700 text-white" 
                      : "text-gray-100"
                  }`}
                >
                  {status.count}
                </Badge>
              </Button>
            ))}
          </div>

          <div className="flex gap-2 items-center">
            <div className="relative mt-2 flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search brands by name or code..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brands List */}
      <div className="space-y-4">
        {brands.map((brand) => (
          <Card key={brand.id} className="hover:bg-accent/5 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Basic Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{brand.name}</h3>
                        <Badge variant="outline">{brand.code}</Badge>
                        <Badge className={getStatusBadge(brand.status)}>
                          {brand.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {brand.description || 'No description provided'}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                        <Package className="h-4 w-4" />
                        <span>{brand.totalProducts} Products</span>
                        {brand.lastSync && (
                          <>
                            <span>•</span>
                            <Cloud className="h-4 w-4" />
                            <span>Last synced: {new Date(brand.lastSync).toLocaleDateString()}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Settings className="h-4 w-4 mr-2" />
                          Edit Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Key className="h-4 w-4 mr-2" />
                          API Configuration
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RefreshCcw className="h-4 w-4 mr-2" />
                          Sync Products
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(brand.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Right Column - API Status */}
                <div className="w-64">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">API Status</p>
                      <div className="flex items-center gap-2 mt-1">
                        {brand.apiConfig ? (
                          <>
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span className="text-sm font-medium">Connected</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-5 w-5 text-red-500" />
                            <span className="text-sm font-medium">Not Connected</span>
                          </>
                        )}
                      </div>
                    </div>
                    {brand.apiConfig && (
                      <div>
                        <p className="text-sm text-muted-foreground">Endpoint</p>
                        <div className="flex items-center gap-2 mt-1">
                          <LinkIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm truncate">
                            {brand.apiConfig.endpoint}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="border-t px-4 py-4 flex items-center justify-between bg-white">
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

      {/* Bottom spacing */}
      <div className="h-8" />
    </div>
  );
}

export default BrandsContent;