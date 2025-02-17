"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  CircleDollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Package,
  Store,
  Users,
  Wallet,
  FileSpreadsheet,
  Plus,
  Filter
} from "lucide-react";

const FINANCIAL_METRICS = [
  {
    title: "Total Assets",
    value: "€124,750",
    change: "+12.5%",
    trend: "up",
    period: "vs last month",
    icon: Wallet
  },
  {
    title: "Total Liabilities",
    value: "€45,250",
    change: "-2.3%",
    trend: "down",
    period: "vs last month",
    icon: CircleDollarSign
  },
  {
    title: "Inventory Value",
    value: "€68,420",
    change: "+5.8%",
    trend: "up",
    period: "vs last month",
    icon: Package
  },
  {
    title: "Active Vendors",
    value: "24",
    change: "+2",
    trend: "up",
    period: "this month",
    icon: Users
  }
];

const INVENTORY_BY_WAREHOUSE = [
  {
    name: "Main Warehouse",
    value: 45000,
    items: 1250,
    capacity: 75,
    alert: 2
  },
  {
    name: "South Branch",
    value: 28500,
    items: 850,
    capacity: 60,
    alert: 1
  },
  {
    name: "East Storage",
    value: 32000,
    items: 920,
    capacity: 45,
    alert: 0
  }
];

const RECENT_OPERATIONS = [
  {
    id: "OP-2024-001",
    type: "PURCHASE",
    date: "2024-01-20",
    amount: 2500,
    warehouse: "Main Warehouse",
    status: "COMPLETED"
  },
  {
    id: "OP-2024-002",
    type: "TRANSFER",
    date: "2024-01-20",
    amount: 1800,
    warehouse: "South Branch",
    status: "PENDING"
  },
  {
    id: "OP-2024-003",
    type: "ADJUSTMENT",
    date: "2024-01-19",
    amount: 450,
    warehouse: "East Storage",
    status: "COMPLETED"
  }
];

const MONTHLY_DATA = [
  { month: 'Jan', assets: 120000, inventory: 65000, purchases: 25000 },
  { month: 'Feb', assets: 125000, inventory: 68000, purchases: 22000 },
  { month: 'Mar', assets: 132000, inventory: 72000, purchases: 28000 },
  { month: 'Apr', assets: 128000, inventory: 70000, purchases: 24000 },
  { month: 'May', assets: 135000, inventory: 75000, purchases: 30000 },
  { month: 'Jun', assets: 142000, inventory: 78000, purchases: 32000 }
];

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Overview of your finances and inventory metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button style={{ backgroundColor: "#5FC4D0" }}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Reports
          </Button>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {FINANCIAL_METRICS.map((metric) => (
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

      {/* Charts */}
      <Card>
      <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
   <CardTitle className="text-xl font-semibold">Financial Overview</CardTitle>
   <div className="flex items-center space-x-2">
     <Badge variant="secondary">Assets</Badge>
     <Badge variant="outline">Inventory</Badge> 
     <Badge variant="outline">Purchases</Badge>
   </div>
 </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="assets" 
                  stroke="#5FC4D0" 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="inventory" 
                  stroke="#22C55E" 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="purchases" 
                  stroke="#6366F1" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Warehouse Overview & Recent Operations */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Warehouse Overview */}
        <Card>
        <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
   <CardTitle className="text-xl font-semibold">Warehouse Overview</CardTitle>
   <Button variant="outline" size="sm" className="self-start">
     <Store className="h-4 w-4 mr-2" />
     View All
   </Button>
 </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {INVENTORY_BY_WAREHOUSE.map((warehouse) => (
                <div key={warehouse.name} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{warehouse.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {warehouse.items} items · €{warehouse.value.toLocaleString()}
                      </div>
                    </div>
                    {warehouse.alert > 0 && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        {warehouse.alert} alerts
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1">
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
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Operations */}
        <Card>
        <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
   <CardTitle className="text-xl font-semibold">Recent Operations</CardTitle>
   <Button variant="outline" size="sm" className="self-start">
     <Plus className="h-4 w-4 mr-2" />
     New Operation
   </Button>
 </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {RECENT_OPERATIONS.map((operation) => (
                <Card key={operation.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{operation.id}</span>
                          <Badge variant={
                            operation.type === 'PURCHASE' ? 'default' :
                            operation.type === 'TRANSFER' ? 'secondary' :
                            'outline'
                          }>
                            {operation.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Store className="h-4 w-4" />
                          {operation.warehouse}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">€{operation.amount}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(operation.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardContent;