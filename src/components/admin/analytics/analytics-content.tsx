"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  Download,
  CreditCard,
  Receipt,
  PiggyBank,
  Scale
} from "lucide-react";

const KPI_METRICS = [
  {
    title: "Current Ratio",
    value: "2.5",
    change: "+0.3",
    trend: "up",
    period: "vs last month",
    description: "Current Assets / Current Liabilities",
    icon: Scale
  },
  {
    title: "Quick Ratio",
    value: "1.8",
    change: "+0.2",
    trend: "up",
    period: "vs last month",
    description: "(Current Assets - Inventory) / Current Liabilities",
    icon: TrendingUp
  },
  {
    title: "Inventory Turnover",
    value: "5.2x",
    change: "-0.3",
    trend: "down",
    period: "vs last month",
    description: "Cost of Goods Sold / Average Inventory",
    icon: Receipt
  },
  {
    title: "Working Capital",
    value: "€79,500",
    change: "+8.5%",
    trend: "up",
    period: "vs last month",
    description: "Current Assets - Current Liabilities",
    icon: Wallet
  }
];

const MONTHLY_FINANCIAL_DATA = [
  { month: 'Jan', revenue: 145000, expenses: 95000, profit: 50000 },
  { month: 'Feb', revenue: 152000, expenses: 98000, profit: 54000 },
  { month: 'Mar', revenue: 160000, expenses: 102000, profit: 58000 },
  { month: 'Apr', revenue: 155000, expenses: 97000, profit: 58000 },
  { month: 'May', revenue: 165000, expenses: 105000, profit: 60000 },
  { month: 'Jun', revenue: 172000, expenses: 108000, profit: 64000 }
];

const EXPENSE_BREAKDOWN = [
  { name: 'Inventory', value: 45000 },
  { name: 'Operations', value: 25000 },
  { name: 'Payroll', value: 20000 },
  { name: 'Utilities', value: 8000 },
  { name: 'Other', value: 10000 }
];

const ACCOUNT_BALANCES = [
  { account: "Cash", balance: 125000, change: 12500 },
  { account: "Accounts Receivable", balance: 85000, change: -5000 },
  { account: "Inventory", balance: 195000, change: 15000 },
  { account: "Accounts Payable", balance: 65000, change: 8000 },
  { account: "Fixed Assets", balance: 250000, change: 0 }
];

const COLORS = ['#5FC4D0', '#22C55E', '#6366F1', '#F59E0B', '#EC4899'];

export function AnalyticsContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Detailed analysis of financial performance and metrics
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
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {KPI_METRICS.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <metric.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
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
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Financial Overview Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Financial Performance</CardTitle>
            <div className="flex gap-2">
              <Badge variant="secondary">Revenue</Badge>
              <Badge variant="outline">Expenses</Badge>
              <Badge variant="outline">Profit</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_FINANCIAL_DATA}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#5FC4D0" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#22C55E" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Expense Breakdown & Account Balances */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={EXPENSE_BREAKDOWN}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {EXPENSE_BREAKDOWN.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Account Balances */}
        <Card>
          <CardHeader>
            <CardTitle>Account Balances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ACCOUNT_BALANCES.map((account) => (
                <div key={account.account} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{account.account}</p>
                    <p className="text-sm text-muted-foreground">
                      €{account.balance.toLocaleString()}
                    </p>
                  </div>
                  <div className={`flex items-center ${
                    account.change > 0 ? 'text-green-600' : 
                    account.change < 0 ? 'text-red-600' : 
                    'text-gray-500'
                  }`}>
                    {account.change > 0 ? (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : account.change < 0 ? (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    ) : null}
                    {account.change !== 0 ? `€${Math.abs(account.change).toLocaleString()}` : '--'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AnalyticsContent;