"use client"

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
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

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                className="pl-9 w-full"
              />
            </div>
            <div className="flex gap-2">
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
                name="status"
                label=""
                value="all"
                onChange={() => {}}
                options={[
                  { value: "all", label: "All Status" },
                  { value: "active", label: "Active" },
                  { value: "low", label: "Low Stock" },
                  { value: "over", label: "Overstock" }
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
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
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
          <span className="font-medium">100</span> products
        </p>
      </div>
    </div>
  );
}

export default ProductsContent;