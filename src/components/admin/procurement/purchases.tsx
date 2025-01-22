"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import InputSelect from "@/components/Common/InputSelect";
import {
  ShoppingCart,
  Search,
  Filter,
  Plus,
  FileSpreadsheet,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Users,
  Calendar,
  Package,
  FileText,
  History,
  ExternalLink,
  CheckCircle2,
  Store,
  CreditCard,
  Receipt,
  Truck,
  AlertTriangle,
  Building2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PURCHASE_METRICS = [
  {
    title: "Total Orders",
    value: "156",
    change: "+12",
    trend: "up",
    period: "this month",
    icon: ShoppingCart
  },
  {
    title: "Pending Orders",
    value: "28",
    change: "-3",
    trend: "down",
    period: "vs last week",
    icon: Clock
  },
  {
    title: "Expected Arrivals",
    value: "15",
    change: "+4",
    trend: "up",
    period: "this week",
    icon: Truck
  },
  {
    title: "Purchase Value",
    value: "€45.2k",
    change: "+15.2%",
    trend: "up",
    period: "this month",
    icon: CreditCard
  }
];

const PURCHASE_ORDERS = [
  {
    id: "PO-2024-001",
    date: "2024-01-20",
    vendor: {
      name: "Office Solutions Ltd",
      rating: 4.5
    },
    warehouse: "Main Warehouse",
    items: 12,
    totalValue: 2500.00,
    status: "CONFIRMED",
    expectedDelivery: "2024-01-25",
    paymentStatus: "PENDING",
    priority: "HIGH"
  },
  {
    id: "PO-2024-002",
    date: "2024-01-19",
    vendor: {
      name: "Tech Supplies Co",
      rating: 4.2
    },
    warehouse: "South Branch",
    items: 8,
    totalValue: 1850.00,
    status: "IN_TRANSIT",
    expectedDelivery: "2024-01-22",
    paymentStatus: "PAID",
    priority: "NORMAL"
  },
  {
    id: "PO-2024-003",
    date: "2024-01-18",
    vendor: {
      name: "Global Trading Inc",
      rating: 3.8
    },
    warehouse: "East Storage",
    items: 15,
    totalValue: 3200.00,
    status: "DELIVERED",
    expectedDelivery: "2024-01-21",
    paymentStatus: "PAID",
    priority: "LOW"
  }
];

const getStatusBadge = (status: string) => {
  const variants = {
    'CONFIRMED': 'bg-blue-100 text-blue-800',
    'IN_TRANSIT': 'bg-yellow-100 text-yellow-800',
    'DELIVERED': 'bg-green-100 text-green-800',
    'CANCELLED': 'bg-red-100 text-red-800'
  };
  return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
};

const getPaymentStatusBadge = (status: string) => {
  const variants = {
    'PAID': 'bg-green-100 text-green-800',
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'OVERDUE': 'bg-red-100 text-red-800'
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

export function PurchasesContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Purchase Orders</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage purchase orders and supplier deliveries
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button style={{ backgroundColor: "#5FC4D0" }}>
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {PURCHASE_METRICS.map((metric) => (
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
            <h3 className="font-medium">Filter Orders</h3>
            <p className="text-sm text-muted-foreground">
              Search and filter through purchase orders
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center flex-1 gap-2 w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search orders by ID, vendor, or items..." 
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
                  { value: "confirmed", label: "Confirmed" },
                  { value: "transit", label: "In Transit" },
                  { value: "delivered", label: "Delivered" }
                ]}
              />
              <InputSelect
                name="payment"
                label=""
                value="all"
                onChange={() => {}}
                options={[
                  { value: "all", label: "All Payments" },
                  { value: "paid", label: "Paid" },
                  { value: "pending", label: "Pending" }
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Purchase Orders List */}
      <div className="space-y-4">
        {PURCHASE_ORDERS.map((order) => (
          <Card key={order.id} className="hover:bg-accent/5 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Basic Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{order.id}</h3>
                        <Badge className={getStatusBadge(order.status)}>
                          {order.status}
                        </Badge>
                        <Badge className={getPriorityBadge(order.priority)}>
                          {order.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {order.vendor.name}
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Store className="h-4 w-4" />
                          {order.warehouse}
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
                          Track Order
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Receipt className="h-4 w-4 mr-2" />
                          View Invoice
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Center Column - Order Details */}
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Items</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{order.items} items</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Value</p>
                      <div className="flex items-center gap-2 mt-1">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">€{order.totalValue.toFixed(2)}</span>
                      </div>
                    </div>
                    <div>
                      <Badge className={getPaymentStatusBadge(order.paymentStatus)}>
                        {order.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Right Column - Dates */}
                <div className="w-48">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Order Date</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(order.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expected Delivery</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Truck className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(order.expectedDelivery).toLocaleDateString()}</span>
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
          <span className="font-medium">100</span> orders
        </p>
      </div>
    </div>
  );
}

export default PurchasesContent;