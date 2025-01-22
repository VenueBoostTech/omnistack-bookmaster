"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import InputSelect from "@/components/Common/InputSelect";
import {
  Users,
  Search,
  Filter,
  Plus,
  Building2,
  MoreVertical,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Mail,
  Phone,
  FileSpreadsheet,
  CreditCard,
  Clock,
  StarIcon,
  Wallet,
  History,
  FileText,
  ExternalLink,
  AlertCircle,
  MapPin,
  Receipt
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const VENDOR_METRICS = [
  {
    title: "Active Vendors",
    value: "45",
    change: "+3",
    trend: "up",
    period: "this month",
    icon: Users
  },
  {
    title: "Total Orders",
    value: "256",
    change: "+12.5%",
    trend: "up",
    period: "vs last month",
    icon: ShoppingCart
  },
  {
    title: "Pending Payments",
    value: "€15.4k",
    change: "-8.2%",
    trend: "down",
    period: "vs last month",
    icon: CreditCard
  },
  {
    title: "Average Lead Time",
    value: "4.2 days",
    change: "-0.5 days",
    trend: "up",
    period: "this month",
    icon: Clock
  }
];

const VENDORS = [
  {
    id: "VEN-001",
    name: "Office Solutions Ltd",
    type: "Manufacturer",
    status: "ACTIVE",
    rating: 4.5,
    contact: {
      name: "John Smith",
      email: "john@officesolutions.com",
      phone: "+1 234-567-8901",
      address: "123 Business Park, NY"
    },
    performance: {
      onTimeDelivery: 95,
      qualityRating: 92,
      responseTime: 98
    },
    financials: {
      totalSpent: 125000,
      outstandingPayments: 12500,
      creditLimit: 50000
    },
    lastOrder: "2024-01-15",
    paymentTerms: "Net 30"
  },
  {
    id: "VEN-002",
    name: "Tech Supplies Co",
    type: "Distributor",
    status: "ACTIVE",
    rating: 4.2,
    contact: {
      name: "Sarah Wilson",
      email: "sarah@techsupplies.com",
      phone: "+1 234-567-8902",
      address: "456 Tech Drive, CA"
    },
    performance: {
      onTimeDelivery: 88,
      qualityRating: 95,
      responseTime: 94
    },
    financials: {
      totalSpent: 85000,
      outstandingPayments: 5000,
      creditLimit: 25000
    },
    lastOrder: "2024-01-18",
    paymentTerms: "Net 15"
  },
  {
    id: "VEN-003",
    name: "Global Trading Inc",
    type: "Wholesaler",
    status: "ON_HOLD",
    rating: 3.8,
    contact: {
      name: "Mike Johnson",
      email: "mike@globaltrading.com",
      phone: "+1 234-567-8903",
      address: "789 Trade Blvd, TX"
    },
    performance: {
      onTimeDelivery: 82,
      qualityRating: 85,
      responseTime: 78
    },
    financials: {
      totalSpent: 65000,
      outstandingPayments: 18000,
      creditLimit: 30000
    },
    lastOrder: "2024-01-10",
    paymentTerms: "Net 45"
  }
];

const getStatusBadge = (status: string) => {
  const variants = {
    'ACTIVE': 'bg-green-100 text-green-800',
    'ON_HOLD': 'bg-yellow-100 text-yellow-800',
    'INACTIVE': 'bg-red-100 text-red-800'
  };
  return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
};

const getRatingColor = (rating: number) => {
  if (rating >= 4.5) return 'text-green-500';
  if (rating >= 4.0) return 'text-blue-500';
  if (rating >= 3.0) return 'text-yellow-500';
  return 'text-red-500';
};

export function VendorsContent() {
  
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 100; // Replace with actual total
  const totalPages = Math.ceil(totalItems / pageSize);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vendors</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage suppliers and procurement relationships
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button style={{ backgroundColor: "#5FC4D0" }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Vendor
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {VENDOR_METRICS.map((metric) => (
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
            <h3 className="font-medium">Filter Vendors</h3>
            <p className="text-sm text-muted-foreground">
              Search and filter through your supplier base
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-0 pt-0">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center flex-1 gap-2 w-full">
              <div className="relative mt-2 flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name, email, or ID..." 
                  className="pl-9 w-full"
                />
              </div>
              <InputSelect
                name="type"
                label=""
                value="all"
                onChange={() => {}}
                options={[
                  { value: "all", label: "All Types" },
                  { value: "manufacturer", label: "Manufacturer" },
                  { value: "distributor", label: "Distributor" },
                  { value: "wholesaler", label: "Wholesaler" }
                ]}
              />
              <InputSelect
                name="status"
                label=""
                value="all"
                onChange={() => {}}
                options={[
                  { value: "all", label: "All Status" },
                  { value: "active", label: "Active" },
                  { value: "on_hold", label: "On Hold" },
                  { value: "inactive", label: "Inactive" }
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vendors List */}
      <div className="space-y-4">
        {VENDORS.map((vendor) => (
          <Card key={vendor.id} className="hover:bg-accent/5 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Basic Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{vendor.name}</h3>
                        <Badge variant="outline">{vendor.type}</Badge>
                        <Badge className={getStatusBadge(vendor.status)}>
                          {vendor.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          ID: {vendor.id}
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <StarIcon className={`h-4 w-4 ${getRatingColor(vendor.rating)}`} />
                          {vendor.rating}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 mt-2">
                        <div className="flex items-center text-sm">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          {vendor.contact.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          {vendor.contact.phone}
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          {vendor.contact.address}
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
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Place Order
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <History className="h-4 w-4 mr-2" />
                          Order History
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

                {/* Center Column - Performance */}
                <div className="flex-1">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">On-Time Delivery</span>
                        <span className="font-medium">{vendor.performance.onTimeDelivery}%</span>
                      </div>
                      <Progress value={vendor.performance.onTimeDelivery} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Quality Rating</span>
                        <span className="font-medium">{vendor.performance.qualityRating}%</span>
                      </div>
                      <Progress value={vendor.performance.qualityRating} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Response Time</span>
                        <span className="font-medium">{vendor.performance.responseTime}%</span>
                      </div>
                      <Progress value={vendor.performance.responseTime} className="h-2" />
                    </div>
                  </div>
                </div>

                {/* Right Column - Financials */}
                <div className="w-48">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                      <p className="text-lg font-semibold mt-1">
                        €{vendor.financials.totalSpent.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Outstanding</p>
                      <p className={`text-sm font-medium mt-1 ${
                        vendor.financials.outstandingPayments > 0 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        €{vendor.financials.outstandingPayments.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Terms: </span>
                        <span className="font-medium">{vendor.paymentTerms}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Order</p>
                      <p className="text-sm mt-1">
                        {new Date(vendor.lastOrder).toLocaleDateString()}
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
    </div>
  );
}

export default VendorsContent;

                        