"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import InputSelect from "@/components/Common/InputSelect";
import {
  Package,
  AlertTriangle,
  Search,
  Filter,
  FileSpreadsheet,
  ArrowUpRight,
  ArrowDownRight,
  Store,
  RefreshCw,
  AlertCircle,
  Box
} from "lucide-react";

const STOCK_METRICS = [
  {
    title: "Total Products",
    value: "1,245",
    change: "+12",
    trend: "up",
    subtitle: "Active items",
    icon: Package
  },
  {
    title: "Low Stock",
    value: "28",
    change: "-5",
    trend: "down",
    subtitle: "Items below minimum",
    icon: AlertTriangle
  },
  {
    title: "Overstock",
    value: "15",
    change: "+3",
    trend: "up",
    subtitle: "Items above maximum",
    icon: Box
  },
  {
    title: "Out of Stock",
    value: "8",
    change: "-2",
    trend: "down",
    subtitle: "Requires reorder",
    icon: AlertCircle
  }
];

const STOCK_ITEMS = [
  {
    id: "PRD-001",
    name: "Office Chair",
    sku: "FURN-001",
    category: "Furniture",
    warehouse: "Main Warehouse",
    quantity: 45,
    minStock: 20,
    maxStock: 100,
    value: 4500,
    status: "Optimal",
    lastCount: "2024-01-15"
  },
  {
    id: "PRD-002",
    name: "Desk Lamp",
    sku: "LIGHT-002",
    category: "Lighting",
    warehouse: "South Branch",
    quantity: 12,
    minStock: 15,
    maxStock: 50,
    value: 360,
    status: "Low Stock",
    lastCount: "2024-01-18"
  },
  {
    id: "PRD-003",
    name: "Filing Cabinet",
    sku: "FURN-003",
    category: "Furniture",
    warehouse: "East Storage",
    quantity: 85,
    minStock: 10,
    maxStock: 60,
    value: 12750,
    status: "Overstock",
    lastCount: "2024-01-20"
  }
  // Add more items as needed
];

const getStockStatusColor = (status: string) => {
  const colors = {
    'Optimal': 'bg-green-100 text-green-800',
    'Low Stock': 'bg-yellow-100 text-yellow-800',
    'Overstock': 'bg-blue-100 text-blue-800',
    'Out of Stock': 'bg-red-100 text-red-800'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

const getStockLevelIndicator = (current: number, min: number, max: number) => {
  const percentage = (current / max) * 100;
  if (current <= min) return 'bg-yellow-500';
  if (current > max) return 'bg-blue-500';
  return 'bg-green-500';
};

export function StockLevelsContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Stock Levels</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Monitor inventory levels across all warehouses
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync
          </Button>
          <Button variant="outline">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button style={{ backgroundColor: "#5FC4D0" }}>
            <Package className="h-4 w-4 mr-2" />
            Count Stock
          </Button>
        </div>
      </div>

      {/* Stock Metrics */}
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
                      <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
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
        <CardHeader className="pb-3">
          <CardTitle>Stock Overview</CardTitle>
        </CardHeader>
        <CardContent>
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
                  { value: "optimal", label: "Optimal" },
                  { value: "low", label: "Low Stock" },
                  { value: "over", label: "Overstock" },
                  { value: "out", label: "Out of Stock" }
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

      {/* Stock Items */}
      <div className="space-y-4">
        {STOCK_ITEMS.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Item Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <Badge variant="outline">{item.sku}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{item.category}</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <Store className="h-4 w-4 mr-1.5" />
                          {item.warehouse}
                        </div>
                      </div>
                    </div>
                    <Badge className={getStockStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                </div>

                {/* Center Column - Stock Levels */}
                <div className="flex-1">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current Stock</span>
                      <span className="font-medium">{item.quantity} units</span>
                    </div>
                    <div>
                      <Progress 
                        value={(item.quantity / item.maxStock) * 100}
                        className={`h-2 ${getStockLevelIndicator(item.quantity, item.minStock, item.maxStock)}`}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                        <span>Min: {item.minStock}</span>
                        <span>Max: {item.maxStock}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Value & Actions */}
                <div className="w-48">
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Value</p>
                      <p className="text-lg font-semibold">€{item.value.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Count</p>
                      <p className="text-sm">{new Date(item.lastCount).toLocaleDateString()}</p>
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
          <span className="font-medium">100</span> items
        </p>
      </div>
    </div>
  );
}

export default StockLevelsContent;