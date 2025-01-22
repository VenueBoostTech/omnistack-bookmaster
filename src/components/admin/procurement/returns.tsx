"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import InputSelect from "@/components/Common/InputSelect";
import {
  ArrowLeftRight,
  Search,
  Filter,
  Plus,
  FileSpreadsheet,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  History,
  Calendar,
  FileText,
  ExternalLink,
  Package,
  RefreshCw,
  Building2,
  Store,
  AlertCircle,
  Wallet,
  ClipboardList,
  Info
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const RETURNS_METRICS = [
  {
    title: "Active Returns",
    value: "24",
    change: "+5",
    trend: "up",
    period: "this month",
    icon: ArrowLeftRight
  },
  {
    title: "Pending Credit",
    value: "€4,850",
    change: "+12.5%",
    trend: "up",
    period: "vs last month",
    icon: Wallet
  },
  {
    title: "Items Returned",
    value: "156",
    change: "-8",
    trend: "down",
    period: "this month",
    icon: Package
  },
  {
    title: "Processing Time",
    value: "3.2 days",
    change: "-0.5",
    trend: "up",
    period: "on average",
    icon: RefreshCw
  }
];

const RETURNS = [
  {
    id: "RET-2024-001",
    date: "2024-01-20",
    vendor: {
      name: "Office Solutions Ltd",
      rating: 4.5
    },
    warehouse: "Main Warehouse",
    purchaseOrder: "PO-2024-015",
    items: 5,
    value: 850.00,
    status: "PROCESSING",
    reason: "Defective Items",
    creditStatus: "PENDING",
    type: "Quality Issue",
    notes: "Multiple chairs with manufacturing defects"
  },
  {
    id: "RET-2024-002",
    date: "2024-01-19",
    vendor: {
      name: "Tech Supplies Co",
      rating: 4.2
    },
    warehouse: "South Branch",
    purchaseOrder: "PO-2024-012",
    items: 2,
    value: 350.00,
    status: "APPROVED",
    reason: "Wrong Specifications",
    creditStatus: "APPROVED",
    type: "Order Error",
    notes: "Items don't match order specifications"
  },
  {
    id: "RET-2024-003",
    date: "2024-01-18",
    vendor: {
      name: "Global Trading Inc",
      rating: 3.8
    },
    warehouse: "East Storage",
    purchaseOrder: "PO-2024-010",
    items: 8,
    value: 1200.00,
    status: "COMPLETED",
    reason: "Damaged in Transit",
    creditStatus: "RECEIVED",
    type: "Shipping Damage",
    notes: "Items received with visible shipping damage"
  }
];

const getStatusBadge = (status: string) => {
  const variants = {
    'COMPLETED': 'bg-green-100 text-green-800',
    'APPROVED': 'bg-blue-100 text-blue-800',
    'PROCESSING': 'bg-yellow-100 text-yellow-800',
    'REJECTED': 'bg-red-100 text-red-800'
  };
  return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
};

const getCreditStatusBadge = (status: string) => {
  const variants = {
    'RECEIVED': 'bg-green-100 text-green-800',
    'APPROVED': 'bg-blue-100 text-blue-800',
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'REJECTED': 'bg-red-100 text-red-800'
  };
  return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
};

export function ReturnsContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Supplier Returns</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage return requests and supplier credits
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button style={{ backgroundColor: "#5FC4D0" }}>
            <Plus className="h-4 w-4 mr-2" />
            New Return
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {RETURNS_METRICS.map((metric) => (
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
        <CardHeader>
          <div className="mb-1">
            <h3 className="font-medium">Filter Returns</h3>
            <p className="text-sm text-muted-foreground">
              Search and filter through return requests
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center flex-1 gap-2 w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search returns by ID, vendor, or reason..." 
                  className="pl-9 w-full"
                />
              </div>
              <InputSelect
                name="vendor"
                label=""
                value="all"
                onChange={() => {}}
                options={[
                  { value: "all", label: "All Vendors" },
                  { value: "office", label: "Office Solutions" },
                  { value: "tech", label: "Tech Supplies" }
                ]}
              />
              <InputSelect
                name="status"
                label=""
                value="all"
                onChange={() => {}}
                options={[
                  { value: "all", label: "All Status" },
                  { value: "processing", label: "Processing" },
                  { value: "approved", label: "Approved" },
                  { value: "completed", label: "Completed" }
                ]}
              />
              <InputSelect
                name="type"
                label=""
                value="all"
                onChange={() => {}}
                options={[
                  { value: "all", label: "All Types" },
                  { value: "quality", label: "Quality Issue" },
                  { value: "damage", label: "Shipping Damage" },
                  { value: "error", label: "Order Error" }
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Returns List */}
      <div className="space-y-4">
        {RETURNS.map((returnItem) => (
          <Card key={returnItem.id} className="hover:bg-accent/5 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Basic Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{returnItem.id}</h3>
                        <Badge variant="outline">{returnItem.type}</Badge>
                        <Badge className={getStatusBadge(returnItem.status)}>
                          {returnItem.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {returnItem.vendor.name}
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Store className="h-4 w-4" />
                          {returnItem.warehouse}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <ClipboardList className="h-4 w-4" />
                          PO: {returnItem.purchaseOrder}
                        </div>
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
                          Track Status
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          View Documents
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Center Column - Return Details */}
                <div className="flex-1">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Items</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{returnItem.items} items</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Value</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Wallet className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">€{returnItem.value.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reason</p>
                      <div className="flex items-center gap-2 mt-1">
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        <span>{returnItem.reason}</span>
                      </div>
                    </div>
                    <div>
                      <Badge className={getCreditStatusBadge(returnItem.creditStatus)}>
                        Credit {returnItem.creditStatus}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Right Column - Notes & Date */}
                <div className="w-48">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Return Date</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(returnItem.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Notes</p>
                      <div className="flex items-start gap-2 mt-1">
                        <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                        <p className="text-sm">{returnItem.notes}</p>
                      </div>
                    </div>
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
           <span className="font-medium">100</span> returns
         </p>
       </div>
     </div>
 );
}

export default ReturnsContent;
    