"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [warehouseFilter, setWarehouseFilter] = useState("all");
  const totalItems = STOCK_IN_OPERATIONS.length;
  const totalPages = Math.ceil(totalItems / pageSize);
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
            <CardContent className="p-2">
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

      <Card>
       <CardHeader>
         <div className="mb-1">
           <h3 className="font-medium">Filter Operations</h3>
           <p className="text-sm text-muted-foreground">
             Search and filter through stock operations
           </p>
         </div>
       </CardHeader>
       <CardContent className="p-0">
         <div className="flex items-center justify-between gap-4">
           <div className="flex items-center flex-1 gap-2 max-w-3xl">
             <div className="relative mt-2 flex-1">
               <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
               <Input
                 placeholder="Search operations..."
                 className="pl-8"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
             </div>
             <InputSelect
               name="type"
               label=""
               value={typeFilter}
               onChange={(e) => setTypeFilter(e.target.value)}
               options={[
                 { value: "all", label: "All Types" },
                 { value: "purchase", label: "Purchase" },
                 { value: "return", label: "Return" }
               ]}
             />
             <InputSelect
               name="warehouse"
               label=""
               value={warehouseFilter}
               onChange={(e) => setWarehouseFilter(e.target.value)}
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
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
               options={[
                 { value: "all", label: "All Status" },
                 { value: "completed", label: "Completed" },
                 { value: "pending", label: "Pending" },
                 { value: "transit", label: "In Transit" }
               ]}
             />
             <Button variant="outline" className="mt-2">
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
            <CardContent className="p-2">
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

     <div className="h-8" />
   </div>
 );
}

export default StockInContent;