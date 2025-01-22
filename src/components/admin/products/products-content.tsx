"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import InputSelect from "@/components/Common/InputSelect";
import {
  Package,
  Search,
  Filter,
  Plus,
  FileSpreadsheet,
  ShoppingCart,
  MoreVertical,
  Boxes,
  ArrowUpRight,
  ArrowDownRight,
  Edit3,
  AlertTriangle,
  Trash2,
  Copy,
  ExternalLink
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PRODUCT_METRICS = [
  {
    title: "Total Products",
    value: "1,245",
    change: "+12",
    trend: "up",
    period: "vs last month",
    icon: Package
  },
  {
    title: "Active SKUs",
    value: "856",
    change: "+8",
    trend: "up",
    period: "vs last month",
    icon: Boxes
  },
  {
    title: "Low Stock",
    value: "28",
    change: "-5",
    trend: "down",
    period: "vs last month",
    icon: AlertTriangle
  },
  {
    title: "Total Value",
    value: "€124.5k",
    change: "+15.2%",
    trend: "up",
    period: "vs last month",
    icon: ShoppingCart
  }
];

const PRODUCTS = [
  {
    id: "PRD-001",
    name: "Office Chair - Premium",
    sku: "FURN-001",
    category: "Furniture",
    description: "Ergonomic office chair with lumbar support",
    price: 299.99,
    cost: 180.00,
    stock: {
      total: 45,
      minimum: 20,
      maximum: 100
    },
    locations: ["Main Warehouse", "South Branch"],
    status: "Active"
  },
  {
    id: "PRD-002",
    name: "LED Desk Lamp",
    sku: "LIGHT-002",
    category: "Lighting",
    description: "Adjustable LED desk lamp with wireless charging",
    price: 89.99,
    cost: 45.00,
    stock: {
      total: 12,
      minimum: 15,
      maximum: 50
    },
    locations: ["Main Warehouse"],
    status: "Low Stock"
  },
  {
    id: "PRD-003",
    name: "Filing Cabinet",
    sku: "FURN-003",
    category: "Furniture",
    description: "Metal filing cabinet with 3 drawers",
    price: 199.99,
    cost: 120.00,
    stock: {
      total: 85,
      minimum: 10,
      maximum: 60
    },
    locations: ["East Storage"],
    status: "Overstock"
  }
];

const getStatusBadge = (status: string) => {
  const variants = {
    'Active': 'bg-green-100 text-green-800',
    'Low Stock': 'bg-yellow-100 text-yellow-800',
    'Overstock': 'bg-blue-100 text-blue-800',
    'Inactive': 'bg-gray-100 text-gray-800'
  };
  return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
};

export function ProductsContent() {
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
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your product catalog and inventory
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button style={{ backgroundColor: "#5FC4D0" }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Product Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {PRODUCT_METRICS.map((metric) => (
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
          <h3 className="text-lg">Filter Products</h3>
          <p className="text-sm text-muted-foreground">
            Search and filter through your product catalog
          </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'All Products', count: 1245 },
              { value: 'active', label: 'Active', count: 856 },
              { value: 'low', label: 'Low Stock', count: 28 },
              { value: 'overstock', label: 'Overstock', count: 15 }
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
                placeholder="Search products by name, SKU, or category..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <InputSelect
              name="category"
              label=""
              value="all"
              onChange={() => {}}
              options={[
                { value: "all", label: "All Categories" },
                { value: "furniture", label: "Furniture" },
                { value: "lighting", label: "Lighting" }
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
            <Button className="mt-2" variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products List */}
      <div className="space-y-4">
        {PRODUCTS.map((product) => (
          <Card key={product.id} className="hover:bg-accent/5 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Product Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <Badge variant="outline">{product.sku}</Badge>
                        <Badge className={getStatusBadge(product.status)}>
                          {product.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Boxes className="h-4 w-4" />
                        {product.category}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {product.description}
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
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View History
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Center Column - Stock Info */}
                <div className="flex-1">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Stock Level</span>
                        <span className="font-medium">{product.stock.total} units</span>
                      </div>
                      <Progress 
                        value={(product.stock.total / product.stock.maximum) * 100}
                        className={`h-2 ${
                          product.stock.total <= product.stock.minimum ? 'bg-yellow-500' :
                          product.stock.total > product.stock.maximum ? 'bg-blue-500' :
                          'bg-green-500'
                        }`}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Min: {product.stock.minimum}</span>
                        <span>Max: {product.stock.maximum}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.locations.map((location) => (
                        <Badge key={location} variant="secondary">
                          {location}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Pricing */}
                <div className="w-48">
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Selling Price</p>
                      <p className="text-lg font-semibold">€{product.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Cost Price</p>
                      <p className="text-sm">€{product.cost.toFixed(2)}</p>
                    </div>
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground">Margin</p>
                      <p className="text-sm font-medium text-green-600">
                        {(((product.price - product.cost) / product.price) * 100).toFixed(1)}%
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

export default ProductsContent;