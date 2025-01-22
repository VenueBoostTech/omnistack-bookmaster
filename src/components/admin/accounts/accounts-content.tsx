"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Filter,
  Search,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from "lucide-react";

const ACCOUNT_TYPES = [
  { value: "ALL", label: "All Accounts", count: 45 },
  { value: "ASSET", label: "Assets", count: 12 },
  { value: "LIABILITY", label: "Liabilities", count: 8 },
  { value: "EQUITY", label: "Equity", count: 5 },
  { value: "REVENUE", label: "Revenue", count: 10 },
  { value: "EXPENSE", label: "Expenses", count: 10 }
];

const ACCOUNTS_DATA = [
  {
    code: "1000",
    name: "Cash in Bank",
    type: "ASSET",
    category: "CASH",
    balance: 124500.00,
    lastTransaction: "2024-01-22",
    status: "ACTIVE"
  },
  {
    code: "1100",
    name: "Accounts Receivable",
    type: "ASSET",
    category: "RECEIVABLE",
    balance: 45750.00,
    lastTransaction: "2024-01-21",
    status: "ACTIVE"
  },
  {
    code: "1200",
    name: "Inventory",
    type: "ASSET",
    category: "INVENTORY",
    balance: 89250.00,
    lastTransaction: "2024-01-22",
    status: "ACTIVE"
  },
  {
    code: "2000",
    name: "Accounts Payable",
    type: "LIABILITY",
    category: "CURRENT_LIABILITY",
    balance: -35800.00,
    lastTransaction: "2024-01-20",
    status: "ACTIVE"
  },
  {
    code: "3000",
    name: "Common Stock",
    type: "EQUITY",
    category: "CAPITAL",
    balance: 250000.00,
    lastTransaction: "2024-01-01",
    status: "ACTIVE"
  },
  {
    code: "4000",
    name: "Sales Revenue",
    type: "REVENUE",
    category: "SALES",
    balance: 185400.00,
    lastTransaction: "2024-01-22",
    status: "ACTIVE"
  },
  {
    code: "5000",
    name: "Cost of Goods Sold",
    type: "EXPENSE",
    category: "COST_OF_SALES",
    balance: -125300.00,
    lastTransaction: "2024-01-22",
    status: "ACTIVE"
  }
];

export function AccountsContent() {
  const [selectedType, setSelectedType] = React.useState("ALL");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Chart of Accounts</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your company's chart of accounts and track balances
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button style={{ backgroundColor: "#5FC4D0" }}>
            <Plus className="h-4 w-4 mr-2" />
            New Account
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex gap-2">
          {ACCOUNT_TYPES.map((type) => (
            <Button
              key={type.value}
              variant={selectedType === type.value ? "secondary" : "outline"}
              className="flex gap-2"
              onClick={() => setSelectedType(type.value)}
            >
              {type.label}
              <Badge variant="secondary" className="ml-1">
                {type.count}
              </Badge>
            </Button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search accounts..." className="pl-8" />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Accounts Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Last Transaction</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ACCOUNTS_DATA.map((account) => (
                <TableRow key={account.code}>
                  <TableCell className="font-medium">{account.code}</TableCell>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{account.type}</Badge>
                  </TableCell>
                  <TableCell>{account.category}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className={account.balance >= 0 ? "text-green-600" : "text-red-600"}>
                        €{Math.abs(account.balance).toLocaleString()}
                      </span>
                      {account.balance >= 0 ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(account.lastTransaction).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={account.status === "ACTIVE" ? "success" : "secondary"}
                      className={
                        account.status === "ACTIVE" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {account.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default AccountsContent;