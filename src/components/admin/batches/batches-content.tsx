"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import InputSelect from "@/components/Common/InputSelect";
import {
  Boxes,
  Search,
  Filter,
  Plus,
  Store,
  Package,
  Calendar,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  FileSpreadsheet,
  History,
  XCircle,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const BATCH_METRICS = [
  {
    title: "Active Batches",
    value: "156",
    change: "+12",
    trend: "up",
    period: "vs last month",
    icon: Boxes
  },
  {
    title: "Near Expiry",
    value: "8",
    change: "-3",
    trend: "down",
    period: "vs last month",
    icon: AlertCircle
  },
  {
    title: "Processing",
    value: "24",
    change: "+5",
    trend: "up",
    period: "vs last month",
    icon: Clock
  },
  {
    title: "Stock Value",
    value: "€85.2k",
    change: "+15.2%",
    trend: "up",
    period: "vs last month",
    icon: Package
  }
];

const BATCHES = [
  {
    id: "BCH-2024-001",
    product: "Office Chair - Premium",
    sku: "FURN-001",
    batchNumber: "B24001",
    quantity: 50,
    remainingQty: 35,
    warehouse: "Main Warehouse",
    status: "ACTIVE",
    expiryDate: "2025-01-20",
    received: "2024-01-15",
    supplier: "Office Solutions Ltd"
  },
  {
    id: "BCH-2024-002",
    product: "LED Desk Lamp",
    sku: "LIGHT-002",
    batchNumber: "B24002",
    quantity: 100,
    remainingQty: 12,
    warehouse: "South Branch",
    status: "LOW",
    expiryDate: "2024-12-15",
    received: "2024-01-10",
    supplier: "LightTech Inc"
  },
  {
    id: "BCH-2024-003",
    product: "Filing Cabinet",
    sku: "FURN-003",
    batchNumber: "B24003",
    quantity: 30,
    remainingQty: 30,
    warehouse: "East Storage",
    status: "PROCESSING",
    expiryDate: "2025-06-30",
    received: "2024-01-20",
    supplier: "Storage Solutions Co"
  }
];


const getStatusBadge = (status: string) => {
  const variants = {
    'ACTIVE': 'bg-green-100 text-green-800',
    'LOW': 'bg-yellow-100 text-yellow-800',
    'PROCESSING': 'bg-blue-100 text-blue-800',
    'EXPIRED': 'bg-red-100 text-red-800'
  };
  return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
};

const getExpiryStatus = (date: string) => {
  const months = Math.ceil((new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30));
  if (months <= 1) return { color: 'text-red-500', icon: AlertTriangle };
  if (months <= 3) return { color: 'text-yellow-500', icon: AlertCircle };
  return { color: 'text-green-500', icon: CheckCircle2 };
};

export function BatchesContent() {
  // Add state management
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const totalItems = 100; // Replace with actual total
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Batch Management</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Track and manage product batches across warehouses
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button style={{ backgroundColor: "#5FC4D0" }}>
            <Plus className="h-4 w-4 mr-2" />
            New Batch
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {BATCH_METRICS.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold">{metric.value}</h3>
                    <div className="flex items-center gap-2">
                      <div className={`flex items-center text-xs ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.trend === 'up' ? 
                          <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        }
                        {metric.change}
                      </div>
                      <p className="text-xs text-muted-foreground">{metric.period}</p>
                    </div>
                  </div>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <metric.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Updated Filters Card */}
      <Card>
        <CardHeader>
          <div className='mb-2'>
            <h3 className="text-lg">Filter Batches</h3>
            <p className="text-sm text-muted-foreground">
              Search and filter through product batches
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'All Batches', count: 156 },
              { value: 'active', label: 'Active', count: 120 },
              { value: 'low', label: 'Low Stock', count: 15 },
              { value: 'processing', label: 'Processing', count: 12 },
              { value: 'expired', label: 'Expired', count: 9 }
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

          {/* Search and Additional Filters */}
          <div className="flex gap-2 items-center">
            <div className="relative mt-2 flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search batches by ID, product, or supplier..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <InputSelect
              name="warehouse"
              label=""
              value="all"
              onChange={() => {}}
              options={[
                { value: "all", label: "All Warehouses" },
                { value: "main", label: "Main Warehouse" },
                { value: "south", label: "South Branch" },
                { value: "east", label: "East Storage" }
              ]}
            />
            <Button className="mt-2" variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Batches List */}
      <div className="space-y-4">
        {BATCHES.map((batch) => (
          <Card key={batch.id} className="hover:bg-accent/5 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Batch Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{batch.product}</h3>
                        <Badge variant="outline">{batch.sku}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Batch: {batch.batchNumber}</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <Store className="h-4 w-4 mr-1.5" />
                          {batch.warehouse}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Package className="h-4 w-4" />
                        {batch.supplier}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusBadge(batch.status)}>
                        {batch.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <History className="h-4 w-4 mr-2" />
                            Movement History
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Package className="h-4 w-4 mr-2" />
                            Adjust Quantity
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="h-4 w-4 mr-2" />
                            Mark as Expired
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>

                {/* Center Column - Quantity */}
                <div className="flex-1">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Quantity</span>
                        <span className="font-medium">{batch.remainingQty} / {batch.quantity} units</span>
                      </div>
                      <Progress 
                        value={(batch.remainingQty / batch.quantity) * 100}
                        className={`h-2 ${
                          (batch.remainingQty / batch.quantity) <= 0.2 ? 'bg-red-500' :
                          (batch.remainingQty / batch.quantity) <= 0.5 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Received:</span>
                        <span>{new Date(batch.received).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Expires:</span>
                        <span className={getExpiryStatus(batch.expiryDate).color}>
                          {new Date(batch.expiryDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Status */}
                <div className="w-48">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Expiry Status</p>
                      <div className="flex items-center gap-2 mt-1">
                        {React.createElement(getExpiryStatus(batch.expiryDate).icon, {
                          className: `h-5 w-5 ${getExpiryStatus(batch.expiryDate).color}`
                        })}
                        <span className={`font-medium ${getExpiryStatus(batch.expiryDate).color}`}>
                          {Math.ceil((new Date(batch.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30))} months left
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Updated Pagination */}
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

export default BatchesContent;