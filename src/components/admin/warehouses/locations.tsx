"use client"

import React from 'react';
import { Card, CardContent, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Store,
  Plus,
  Search,
  Filter,
  Package,
  MapPin,
  Users,
  AlertTriangle,
  MoreVertical,
  Settings,
  ArrowRightLeft,
  ChevronRight
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const WAREHOUSES = [
  {
    id: "WH-001",
    name: "Main Warehouse",
    code: "MAIN-01",
    address: "123 Storage Ave, Industrial District",
    capacity: 75,
    totalItems: 1250,
    value: 45000,
    staff: 8,
    alerts: 2,
    status: "Active"
  },
  {
    id: "WH-002",
    name: "South Branch",
    code: "SOUTH-01",
    address: "456 Logistics Blvd, South Zone",
    capacity: 60,
    totalItems: 850,
    value: 28500,
    staff: 5,
    alerts: 1,
    status: "Active"
  },
  {
    id: "WH-003",
    name: "East Storage",
    code: "EAST-01",
    address: "789 Supply Road, East Industrial Park",
    capacity: 45,
    totalItems: 920,
    value: 32000,
    staff: 6,
    alerts: 0,
    status: "Active"
  }
];

const WAREHOUSE_STATS = [
  {
    title: "Total Locations",
    value: "3",
    description: "Active warehouses",
    icon: Store
  },
  {
    title: "Total Capacity",
    value: "60%",
    description: "Average utilization",
    icon: Package
  },
  {
    title: "Total Staff",
    value: "19",
    description: "Assigned personnel",
    icon: Users
  },
  {
    title: "Alerts",
    value: "3",
    description: "Require attention",
    icon: AlertTriangle
  }
];

export function WarehouseLocations() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Warehouse Locations</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your warehouse locations and monitor capacity
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button style={{ backgroundColor: "#5FC4D0" }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Location
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {WAREHOUSE_STATS.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  </div>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="h-5 w-5 text-primary" />
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
                placeholder="Search warehouses..." 
                className="pl-9 w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline">
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warehouses List */}
      <div className="grid gap-6">
        {WAREHOUSES.map((warehouse) => (
          <Card key={warehouse.id} className="hover:bg-accent/5 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Basic Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{warehouse.name}</h3>
                        <Badge variant="outline">{warehouse.code}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1.5" />
                        {warehouse.address}
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
                          <Settings className="h-4 w-4 mr-2" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Package className="h-4 w-4 mr-2" />
                          View Inventory
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Users className="h-4 w-4 mr-2" />
                          Manage Staff
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Center Column - Metrics */}
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Items</p>
                    <p className="text-lg font-semibold mt-1">{warehouse.totalItems.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-lg font-semibold mt-1">€{warehouse.value.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Staff</p>
                    <p className="text-lg font-semibold mt-1">{warehouse.staff} members</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Alerts</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-lg font-semibold">{warehouse.alerts}</p>
                      {warehouse.alerts > 0 && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          Attention needed
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column - Capacity */}
                <div className="w-48">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Capacity</span>
                      <span className="font-medium">{warehouse.capacity}%</span>
                    </div>
                    <Progress 
                      value={warehouse.capacity} 
                      className={`h-2 ${
                        warehouse.capacity > 80 ? 'bg-red-500' :
                        warehouse.capacity > 60 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                    />
                    <div className="flex justify-between items-center mt-4">
                      <Badge variant={warehouse.status === "Active" ? "success" : "secondary"}>
                        {warehouse.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        Details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default WarehouseLocations;