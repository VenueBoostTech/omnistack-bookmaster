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
  Cell,
  Legend
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
  Scale,
  DollarSign,
  Briefcase,
  Building2,
  ShoppingCart
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
  { month: 'Jul', revenue: 125000, expenses: 82000, profit: 43000 },
  { month: 'Aug', revenue: 132000, expenses: 85000, profit: 47000 },
  { month: 'Sep', revenue: 145000, expenses: 90000, profit: 55000 },
  { month: 'Oct', revenue: 141000, expenses: 88000, profit: 53000 },
  { month: 'Nov', revenue: 165000, expenses: 98000, profit: 67000 },
  { month: 'Dec', revenue: 180000, expenses: 105000, profit: 75000 },
  { month: 'Jan', revenue: 172000, expenses: 100000, profit: 72000 }
];

const FINANCIAL_PERFORMANCE_METRICS = [
    {
      title: "Monthly Revenue",
      value: "€180,000",
      change: "+15.2%",
      trend: "up",
      icon: DollarSign,
      color: "#5FC4D0"
    },
    {
      title: "Operating Expenses",
      value: "€105,000",
      change: "+7.1%",
      trend: "up",
      icon: Building2,
      color: "#EF4444"
    },
    {
      title: "Net Profit",
      value: "€75,000",
      change: "+11.9%",
      trend: "up",
      icon: TrendingUp,
      color: "#22C55E"
    }
  ];
  


const EXPENSE_BREAKDOWN = [
  { name: 'Inventory Purchases', value: 42000, icon: ShoppingCart },
  { name: 'Operating Costs', value: 28000, icon: Building2 },
  { name: 'Personnel', value: 23000, icon: Briefcase },
  { name: 'Marketing', value: 7000, icon: TrendingUp },
  { name: 'Other', value: 5000, icon: Receipt }
];



const ACCOUNT_BALANCES = [
  { account: "Cash", balance: 125000, change: 12500 },
  { account: "Accounts Receivable", balance: 85000, change: -5000 },
  { account: "Inventory", balance: 195000, change: 15000 },
  { account: "Accounts Payable", balance: 65000, change: 8000 },
  { account: "Fixed Assets", balance: 250000, change: 0 }
];

const EXPENSE_DETAILS = [
    { category: 'Inventory', current: 42000, previous: 38000, change: 10.5 },
    { category: 'Operations', current: 28000, previous: 25000, change: 12.0 },
    { category: 'Personnel', current: 23000, previous: 21000, change: 9.5 },
    { category: 'Marketing', current: 7000, previous: 6000, change: 16.7 },
    { category: 'Other', current: 5000, previous: 4800, change: 4.2 }
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

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Financial Performance</h2>
        
        {/* Performance Metrics Cards */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          {FINANCIAL_PERFORMANCE_METRICS.map((metric) => (
            <Card key={metric.title}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </p>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold" style={{ color: metric.color }}>
                        {metric.value}
                      </h3>
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
                        <p className="text-xs text-muted-foreground">vs last month</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${metric.color}20` }}>
                    <metric.icon className="h-5 w-5" style={{ color: metric.color }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Chart */}
        <Card>
        <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
    <CardTitle className="text-xl font-semibold">Monthly Performance</CardTitle>
    <div className="flex items-center space-x-2">
      <Badge variant="outline" style={{ backgroundColor: "#5FC4D020", color: "#5FC4D0" }}>Revenue</Badge>
      <Badge variant="outline" style={{ backgroundColor: "#EF444420", color: "#EF4444" }}>Expenses</Badge>
      <Badge variant="outline" style={{ backgroundColor: "#22C55E20", color: "#22C55E" }}>Profit</Badge>
    </div>
  </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MONTHLY_FINANCIAL_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `€${(value / 1000)}k`}
                  />
                  <Tooltip 
                    formatter={(value) => `€${value.toLocaleString()}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#5FC4D0" 
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#22C55E" 
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense Analysis Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Expense Breakdown</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Expense Distribution Chart */}
          <Card>
          <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
    <CardTitle className="text-xl font-semibold">Distribution by Category</CardTitle>
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
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {EXPENSE_BREAKDOWN.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `€${value.toLocaleString()}`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Expense Details */}
          <Card>
          <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
    <CardTitle className="text-xl font-semibold">Monthly Comparison</CardTitle>
  </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {EXPENSE_DETAILS.map((category) => (
                  <div key={category.category}>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="font-medium">{category.category}</p>
                        <p className="text-sm text-muted-foreground">
                          €{category.current.toLocaleString()}
                        </p>
                      </div>
                      <div className={`flex items-center ${
                        category.change > 0 ? 'text-amber-600' : 'text-green-600'
                      }`}>
                        {category.change > 0 ? (
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 mr-1" />
                        )}
                        {category.change}%
                      </div>
                    </div>
                    <Progress 
                      value={category.current / (Math.max(...EXPENSE_DETAILS.map(d => d.current))) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Expense Breakdown & Account Balances */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Expense Breakdown */}
        <Card>
        <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
    <CardTitle className="text-xl font-semibold">Expense Breakdown</CardTitle>
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
        <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
    <CardTitle className="text-xl font-semibold">Account Balances</CardTitle>
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