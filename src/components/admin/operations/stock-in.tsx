"use client"

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import InputSelect from "@/components/Common/InputSelect";
import {
  ShoppingCart,
  Search,
  Package,
  Plus,
  Filter,
  Store,
  Clock,
  FileSpreadsheet,
  MoreVertical,
  Boxes,
  ArrowUpRight,
  ArrowDownRight,
  History,
  FileText,
  ExternalLink,
  Truck,
  Users
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const STOCK_METRICS = [
  {
    title: "Today's Receipts",
    value: "12",
    change: "+2",
    trend: "up",
    period: "vs yesterday",
    icon: Package
  },
  {
    title: "Pending Receipt",
    value: "8",
    change: "-3",
    trend: "down",
    period: "vs yesterday",
    icon: Clock
  },
  {
    title: "Total Items",
    value: "456",
    change: "+45",
    trend: "up",
    period: "this week",
    icon: Boxes
  },
  {
    title: "Value Received",
    value: "€15.4k",
    change: "+22.5%",
    trend: "up",
    period: "this week",
    icon: ShoppingCart
  }
];

const STOCK_IN_OPERATIONS = [
  {
    id: "SI-2024-001",
    date: "2024-01-20",
    type: "Purchase",
    reference: "PO-2024-15",
    supplier: "Office Solutions Ltd",
    warehouse: "Main Warehouse",
    items: 12,
    value: 2500.00,
    status: "COMPLETED",
    eta: null
  },
  {
    id: "SI-2024-002",
    date: "2024-01-20",
    type: "Return",
    reference: "RET-2024-03",
    supplier: "Self Return",
    warehouse: "South Branch",
    items: 3,
    value: 450.00,
    status: "PENDING",
    eta: "2024-01-22"
  },
  {
    id: "SI-2024-003",
    date: "2024-01-19",
    type: "Purchase",
    reference: "PO-2024-16",
    supplier: "LightTech Inc",
    warehouse: "East Storage",
    items: 8,
    value: 1200.00,
    status: "IN_TRANSIT",
    eta: "2024-01-21"
  }
];

const getStatusBadge = (status: string) => {
  const variants = {
    'COMPLETED': 'bg-green-100 text-green-800',
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'IN_TRANSIT': 'bg-blue-100 text-blue-800',
    'CANCELLED': 'bg-red-100 text-red-800'
  };
  return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
};

export function StockInContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Stock In Operations</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage incoming stock and inventory receipts
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button style={{ backgroundColor: "#5FC4D0" }}>
            <Plus className="h-4 w-4 mr-2" />
            New Receipt
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {STOCK_METRICS.map((metric) => (
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

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search operations..." 
                className="pl-9 w-full"
              />
            </div>
            <div className="flex gap-2">
              <InputSelect
                name="type"
                label=""
                value="all"
                onChange={() => {}}
                options={[
                  { value: "all", label: "All Types" },
                  { value: "purchase", label: "Purchase" },
                  { value: "return", label: "Return" }
                ]}
              />
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
              <InputSelect
                name="status"
                label=""
                value="all"
                onChange={() => {}}
                options={[
                  { value: "all", label: "All Status" },
                  { value: "completed", label: "Completed" },
                  { value: "pending", label: "Pending" },
                  { value: "transit", label: "In Transit" }
                ]}
              />
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operations List */}
      <div className="space-y-4">
        {STOCK_IN_OPERATIONS.map((operation) => (
          <Card key={operation.id} className="hover:bg-accent/5 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Basic Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{operation.id}</h3>
                        <Badge variant="outline">{operation.type}</Badge>
                        <Badge className={getStatusBadge(operation.status)}>
                          {operation.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          Ref: {operation.reference}
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Store className="h-4 w-4" />
                          {operation.warehouse}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Users className="h-4 w-4" />
                        {operation.supplier}
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
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <History className="h-4 w-4 mr-2" />
                          Track History
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          Download Receipt
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Center Column - Items & Value */}
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Items</p>
                      <p className="text-lg font-semibold mt-1">{operation.items}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Value</p>
                      <p className="text-lg font-semibold mt-1">€{operation.value.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Dates */}
                <div className="w-48">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Operation Date</p>
                      <p className="mt-1">{new Date(operation.date).toLocaleDateString()}</p>
                    </div>
                    {operation.eta && (
                      <div>
                        <p className="text-sm text-muted-foreground">Expected Arrival</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Truck className="h-4 w-4 text-primary" />
                          <span>{new Date(operation.eta).toLocaleDateString()}</span>
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
      <div className="flex items-center justify-between border-t pt-6">
        <InputSelect
          name="pageSize"
          label=""
          value="10"
          onChange={() => {}}
          options={[
            { value: "10", label: "10 per page" },
            { value: "20", label: "20 per page" },
            { value: "50", label: "50 per page" }
          ]}
        />
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">10</span> of{" "}
          <span className="font-medium">100</span> operations
        </p>
      </div>
    </div>
  );
}

export default StockInContent;