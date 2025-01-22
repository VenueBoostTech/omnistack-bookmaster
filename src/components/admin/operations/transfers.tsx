"use client"

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
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
  Clock,
  FileSpreadsheet,
  MoreVertical,
  Boxes,
  ArrowUpRight,
  ArrowDownRight,
  History,
  Calendar,
  FileText,
  ExternalLink,
  Package,
  MoveRight,
  MapPin
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TRANSFER_METRICS = [
  {
    title: "Active Transfers",
    value: "24",
    change: "+3",
    trend: "up",
    period: "vs last week",
    icon: ArrowLeftRight
  },
  {
    title: "Pending Approval",
    value: "5",
    change: "-2",
    trend: "down",
    period: "vs last week",
    icon: Clock
  },
  {
    title: "Items in Transit",
    value: "186",
    change: "+45",
    trend: "up",
    period: "this week",
    icon: Package
  },
  {
    title: "Value Moving",
    value: "€12.8k",
    change: "+22.5%",
    trend: "up",
    period: "this week",
    icon: Boxes
  }
];

const TRANSFERS = [
  {
    id: "TRF-2024-001",
    date: "2024-01-20",
    sourceWarehouse: "Main Warehouse",
    destinationWarehouse: "South Branch",
    items: 15,
    value: 3500.00,
    status: "IN_TRANSIT",
    priority: "HIGH",
    type: "Restock",
    estimatedArrival: "2024-01-21",
    progress: 65
  },
  {
    id: "TRF-2024-002",
    date: "2024-01-20",
    sourceWarehouse: "East Storage",
    destinationWarehouse: "Main Warehouse",
    items: 8,
    value: 1200.00,
    status: "PENDING",
    priority: "NORMAL",
    type: "Relocation",
    estimatedArrival: "2024-01-22",
    progress: 25
  },
  {
    id: "TRF-2024-003",
    date: "2024-01-19",
    sourceWarehouse: "Main Warehouse",
    destinationWarehouse: "East Storage",
    items: 12,
    value: 2800.00,
    status: "COMPLETED",
    priority: "LOW",
    type: "Rebalancing",
    estimatedArrival: "2024-01-20",
    progress: 100
  }
];

const getStatusBadge = (status: string) => {
  const variants = {
    'COMPLETED': 'bg-green-100 text-green-800',
    'IN_TRANSIT': 'bg-blue-100 text-blue-800',
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'CANCELLED': 'bg-red-100 text-red-800'
  };
  return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
};

const getPriorityBadge = (priority: string) => {
  const variants = {
    'HIGH': 'bg-red-100 text-red-800',
    'NORMAL': 'bg-blue-100 text-blue-800',
    'LOW': 'bg-green-100 text-green-800'
  };
  return variants[priority as keyof typeof variants] || 'bg-gray-100 text-gray-800';
};

export function TransfersContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transfer Operations</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage stock transfers between warehouses
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button style={{ backgroundColor: "#5FC4D0" }}>
            <Plus className="h-4 w-4 mr-2" />
            New Transfer
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {TRANSFER_METRICS.map((metric) => (
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
                placeholder="Search transfers..." 
                className="pl-9 w-full"
              />
            </div>
            <div className="flex gap-2">
              <InputSelect
                name="source"
                label=""
                value="all"
                onChange={() => {}}
                options={[
                  { value: "all", label: "All Sources" },
                  { value: "main", label: "Main Warehouse" },
                  { value: "south", label: "South Branch" },
                  { value: "east", label: "East Storage" }
                ]}
              />
              <InputSelect
                name="destination"
                label=""
                value="all"
                onChange={() => {}}
                options={[
                  { value: "all", label: "All Destinations" },
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
                  { value: "transit", label: "In Transit" },
                  { value: "pending", label: "Pending" }
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

      {/* Transfers List */}
      <div className="space-y-4">
        {TRANSFERS.map((transfer) => (
          <Card key={transfer.id} className="hover:bg-accent/5 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Basic Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{transfer.id}</h3>
                        <Badge variant="outline">{transfer.type}</Badge>
                        <Badge className={getStatusBadge(transfer.status)}>
                          {transfer.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {transfer.sourceWarehouse}
                        </div>
                        <MoveRight className="h-4 w-4" />
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {transfer.destinationWarehouse}
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
                          Track Progress
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          Print Documents
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Center Column - Progress & Items */}
                <div className="flex-1">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Transfer Progress</span>
                        <span className="font-medium">{transfer.progress}%</span>
                      </div>
                      <Progress value={transfer.progress} className={`h-2 ${
                        transfer.status === 'COMPLETED' ? 'bg-green-500' :
                        transfer.status === 'IN_TRANSIT' ? 'bg-blue-500' :
                        'bg-yellow-500'
                      }`} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Items</p>
                        <p className="text-lg font-semibold mt-1">{transfer.items}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Value</p>
                        <p className="text-lg font-semibold mt-1">€{transfer.value.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Dates & Priority */}
                <div className="w-48">
                  <div className="space-y-4">
                    <div>
                      <Badge className={getPriorityBadge(transfer.priority)}>
                        {transfer.priority} Priority
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Transfer Date</p>
                      <p className="mt-1">{new Date(transfer.date).toLocaleDateString()}</p>
                    </div>
                    {transfer.estimatedArrival && (
                      <div>
                        <p className="text-sm text-muted-foreground">Est. Arrival</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{new Date(transfer.estimatedArrival).toLocaleDateString()}</span>
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
          <span className="font-medium">100</span> transfers
        </p>
      </div>
    </div>
  );
}

export default TransfersContent;