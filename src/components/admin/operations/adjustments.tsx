"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import InputSelect from "@/components/Common/InputSelect";
import {
  FileCog,
  Search,
  Filter,
  Plus,
  FileSpreadsheet,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  History,
  FileText,
  ExternalLink,
  Store,
  Info,
  ClipboardCheck,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  PencilRuler,
  Scale
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ADJUSTMENT_METRICS = [
  {
    title: "Total Adjustments",
    value: "156",
    change: "+12",
    trend: "up",
    period: "this month",
    icon: FileCog
  },
  {
    title: "Value Impact",
    value: "€2,450",
    change: "-5.2%",
    trend: "down",
    period: "vs last month",
    icon: Scale
  },
  {
    title: "Pending Review",
    value: "8",
    change: "-3",
    trend: "down",
    period: "vs yesterday",
    icon: ClipboardCheck
  },
  {
    title: "Discrepancies",
    value: "12",
    change: "+2",
    trend: "up",
    period: "this week",
    icon: AlertCircle
  }
];

const ADJUSTMENTS = [
  {
    id: "ADJ-2024-001",
    date: "2024-01-20",
    type: "Stock Count",
    warehouse: "Main Warehouse",
    items: 5,
    valueImpact: 350.00,
    reason: "Physical Count Reconciliation",
    status: "APPROVED",
    adjustmentType: "INCREASE",
    category: "Inventory Count",
    initiatedBy: "John Smith",
    approvedBy: "Sarah Manager"
  },
  {
    id: "ADJ-2024-002",
    date: "2024-01-20",
    type: "Write-off",
    warehouse: "South Branch",
    items: 3,
    valueImpact: -250.00,
    reason: "Damaged Stock",
    status: "PENDING",
    adjustmentType: "DECREASE",
    category: "Damage",
    initiatedBy: "Mike Wilson",
    approvedBy: null
  },
  {
    id: "ADJ-2024-003",
    date: "2024-01-19",
    type: "System Correction",
    warehouse: "East Storage",
    items: 2,
    valueImpact: 150.00,
    reason: "System Data Error",
    status: "COMPLETED",
    adjustmentType: "INCREASE",
    category: "System",
    initiatedBy: "Jane Cooper",
    approvedBy: "Sarah Manager"
  }
];

const getStatusBadge = (status: string) => {
  const variants = {
    'COMPLETED': 'bg-green-100 text-green-800',
    'APPROVED': 'bg-blue-100 text-blue-800',
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'REJECTED': 'bg-red-100 text-red-800'
  };
  return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
};

const getAdjustmentTypeBadge = (type: string) => {
  const variants = {
    'INCREASE': 'bg-green-100 text-green-800',
    'DECREASE': 'bg-red-100 text-red-800'
  };
  return variants[type as keyof typeof variants] || 'bg-gray-100 text-gray-800';
};

export function AdjustmentsContent() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const totalItems = 100;
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Stock Adjustments</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage inventory corrections and reconciliations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button style={{ backgroundColor: "#5FC4D0" }}>
            <Plus className="h-4 w-4 mr-2" />
            New Adjustment
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {ADJUSTMENT_METRICS.map((metric) => (
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

      {/* Updated Filter Card */}
      <Card>
        <CardHeader>
          <div className='mb-2'>
          <h3 className="text-lg">Filter Adjustments</h3>
          <p className="text-sm text-muted-foreground">
            Search and filter through stock adjustments
          </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'All Adjustments', count: 156 },
              { value: 'pending', label: 'Pending', count: 8 },
              { value: 'approved', label: 'Approved', count: 45 },
              { value: 'completed', label: 'Completed', count: 103 }
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
                placeholder="Search adjustments by ID, type, or reason..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <InputSelect
              name="type"
              label=""
              value="all"
              onChange={() => {}}
              options={[
                { value: "all", label: "All Types" },
                { value: "count", label: "Stock Count" },
                { value: "write-off", label: "Write-off" },
                { value: "correction", label: "System Correction" }
              ]}
            />
            <InputSelect
              name="location"
              label=""
              value="all"
              onChange={() => {}}
              options={[
                { value: "all", label: "All Locations" },
                { value: "main", label: "Main Warehouse" },
                { value: "south", label: "South Branch" },
                { value: "east", label: "East Storage" }
              ]}
            />
            <Button className='mt-2' variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Adjustments List */}
      <div className="space-y-4">
        {ADJUSTMENTS.map((adjustment) => (
          <Card key={adjustment.id} className="hover:bg-accent/5 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Basic Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{adjustment.id}</h3>
                        <Badge variant="outline">{adjustment.type}</Badge>
                        <Badge className={getStatusBadge(adjustment.status)}>
                          {adjustment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Store className="h-4 w-4" />
                          {adjustment.warehouse}
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Info className="h-4 w-4" />
                          {adjustment.category}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {adjustment.reason}
                      </p>
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
                          View History
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          Print Document
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Center Column - Adjustment Details */}
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Items Affected</p>
                      <p className="text-lg font-semibold mt-1">{adjustment.items}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Value Impact</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getAdjustmentTypeBadge(adjustment.adjustmentType)}>
                          {adjustment.adjustmentType === 'INCREASE' ? 
                            <ArrowUp className="h-3 w-3 mr-1" /> : 
                            <ArrowDown className="h-3 w-3 mr-1" />
                          }
                          €{Math.abs(adjustment.valueImpact).toFixed(2)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Approval Info */}
                <div className="w-48">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Initiated By</p>
                      <p className="text-sm font-medium mt-1">{adjustment.initiatedBy}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Approved By</p>
                      <p className="text-sm font-medium mt-1">
                        {adjustment.approvedBy || '—'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="text-sm mt-1">
                        {new Date(adjustment.date).toLocaleDateString()}
                      </p>
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

export default AdjustmentsContent;