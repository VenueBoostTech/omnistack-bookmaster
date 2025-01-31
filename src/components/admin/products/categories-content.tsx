"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Boxes,
  Search,
  Plus,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingCart,
  AlertTriangle,
  FileSpreadsheet
} from "lucide-react";


import { ViewToggle } from './view-toggle';
import { CategoriesTable } from './categories-table';
import { CategoriesGrid } from './categories-grid';


const CATEGORY_METRICS = [
  {
    title: "Total Categories",
    value: "12",
    change: "+2",
    trend: "up",
    period: "vs last month",
    icon: Boxes
  },
  {
    title: "Active Products",
    value: "856",
    change: "+24",
    trend: "up",
    period: "vs last month",
    icon: Package
  },
  {
    title: "Low Stock Items",
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

const CATEGORIES = [
  {
    id: "CAT-001",
    name: "Furniture",
    code: "FURN",
    description: "Office furniture and accessories",
    products: 245,
    value: 68500,
    active: true,
    stockAlert: 5,
    subcategories: [
      {
        id: "CAT-001-1",
        name: "Chairs",
        products: 85,
        value: 25500,
        stockAlert: 2
      },
      {
        id: "CAT-001-2",
        name: "Desks",
        products: 65,
        value: 32000,
        stockAlert: 1
      }
    ]
  },
  {
    id: "CAT-002",
    name: "Lighting",
    code: "LIGHT",
    description: "Office lighting solutions",
    products: 124,
    value: 22400,
    active: true,
    stockAlert: 3,
    subcategories: [
      {
        id: "CAT-002-1",
        name: "Desk Lamps",
        products: 45,
        value: 8900,
        stockAlert: 1
      }
    ]
  },
  {
    id: "CAT-003",
    name: "Storage",
    code: "STRG",
    description: "Storage solutions and filing systems",
    products: 156,
    value: 34600,
    active: true,
    stockAlert: 2,
    subcategories: []
  }
];

export function CategoriesContent() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<'grid' | 'table'>('table');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage product categories and classifications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button style={{ backgroundColor: "#5FC4D0" }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Category Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {CATEGORY_METRICS.map((metric) => (
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
          <h3 className="text-lg">Filter Categories</h3>
          <p className="text-sm text-muted-foreground">
            Search and filter through product categories
          </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'All Categories', count: 12 },
              { value: 'active', label: 'Active', count: 10 },
              { value: 'alerts', label: 'With Alerts', count: 4 },
              { value: 'empty', label: 'No Products', count: 2 }
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

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search categories by name, code, or description..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories List */}
     <div className="flex justify-end">
        <ViewToggle view={view} onViewChange={setView} />
      </div>
      <div className="space-y-4">
        {view === 'grid' ? (
            <CategoriesGrid categories={CATEGORIES} />
          ) : (
            <CategoriesTable categories={CATEGORIES} />
          )}
      </div>

      {/* Bottom spacing */}
      <div className="h-8" />
    </div>
  );
}

export default CategoriesContent;