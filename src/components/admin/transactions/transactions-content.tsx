"use client"

import React, { useState, useMemo } from 'react';
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
  Calendar,
  Receipt,
  ArrowRightLeft,
  FileText,
  Eye,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const TRANSACTION_TYPES = [
  { value: "ALL", label: "All Transactions", count: 158 },
  { value: "PURCHASE", label: "Purchases", count: 45 },
  { value: "SALE", label: "Sales", count: 56 },
  { value: "PAYMENT", label: "Payments", count: 32 },
  { value: "RECEIPT", label: "Receipts", count: 25 }
];

const TRANSACTIONS_DATA = [
  {
    id: "TRX-2401-001",
    date: "2024-01-22",
    type: "PURCHASE",
    description: "Inventory Purchase - Electronics",
    account: "Inventory",
    reference: "PO-2401-055",
    debit: 12500.00,
    credit: 0,
    status: "POSTED"
  },
  {
    id: "TRX-2401-002",
    date: "2024-01-22",
    type: "PAYMENT",
    description: "Payment to Supplier XYZ",
    account: "Cash in Bank",
    reference: "PAY-2401-089",
    debit: 0,
    credit: 12500.00,
    status: "POSTED"
  },
  {
    id: "TRX-2401-003",
    date: "2024-01-22",
    type: "SALE",
    description: "Customer Invoice #INV-455",
    account: "Sales Revenue",
    reference: "INV-2401-455",
    debit: 0,
    credit: 8750.00,
    status: "PENDING"
  },
  {
    id: "TRX-2401-004",
    date: "2024-01-21",
    type: "RECEIPT",
    description: "Customer Payment - ABC Corp",
    account: "Accounts Receivable",
    reference: "RCP-2401-112",
    debit: 5200.00,
    credit: 0,
    status: "POSTED"
  },
  {
    id: "TRX-2401-005",
    date: "2024-01-21",
    type: "ADJUSTMENT",
    description: "Inventory Count Adjustment",
    account: "Inventory",
    reference: "ADJ-2401-008",
    debit: 450.00,
    credit: 0,
    status: "POSTED"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'POSTED':
      return 'bg-green-100 text-green-800';
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800';
    case 'VOIDED':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'PURCHASE':
      return <ArrowDownRight className="h-4 w-4" />;
    case 'SALE':
      return <ArrowUpRight className="h-4 w-4" />;
    case 'PAYMENT':
      return <ArrowDownRight className="h-4 w-4" />;
    case 'RECEIPT':
      return <ArrowUpRight className="h-4 w-4" />;
    case 'ADJUSTMENT':
      return <ArrowRightLeft className="h-4 w-4" />;
    default:
      return <Receipt className="h-4 w-4" />;
  }
};

export function TransactionsContent() {
  const [selectedType, setSelectedType] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter transactions based on type and search
  const filteredTransactions = useMemo(() => {
    return TRANSACTIONS_DATA.filter(transaction => {
      const matchesType = selectedType === "ALL" || transaction.type === selectedType;
      const matchesSearch = 
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesType && matchesSearch;
    });
  }, [selectedType, searchTerm]);

  // Calculate pagination
  const totalFilteredItems = filteredTransactions.length;
  const totalPages = Math.ceil(totalFilteredItems / pageSize);
  const paginatedTransactions = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return filteredTransactions.slice(startIndex, startIndex + pageSize);
  }, [filteredTransactions, page, pageSize]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-sm text-muted-foreground mt-2">
            View and manage your financial transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button style={{ backgroundColor: "#5FC4D0" }}>
            <Plus className="h-4 w-4 mr-2" />
            New Transaction
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Today's Deposits</p>
                <p className="text-2xl font-bold">€14,500.00</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <ArrowUpRight className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Today's Payments</p>
                <p className="text-2xl font-bold">€8,250.00</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <ArrowDownRight className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Pending Transactions</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FileText className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Posted Today</p>
                <p className="text-2xl font-bold">45</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Receipt className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters Card */}
      <Card>
        <CardHeader>
          <div className='mb-2'>
            <h3 className="text-lg">Filter Transactions</h3>
            <p className="text-sm text-muted-foreground">
              Search and filter through your financial transactions
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Transaction Type Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {TRANSACTION_TYPES.map((type) => (
              <Button
                key={type.value}
                variant={selectedType === type.value ? "default" : "outline"}
                className={`group ${
                  selectedType === type.value ? "bg-red-600 hover:bg-red-700" : ""
                }`}
                onClick={() => setSelectedType(type.value)}
              >
                <span className={selectedType === type.value ? "text-white" : "text-gray-700"}>
                  {type.label}
                </span>
                <Badge 
                  variant="secondary" 
                  className={`ml-2 ${
                    selectedType === type.value 
                      ? "bg-red-700 text-white" 
                      : "text-gray-100"
                  }`}
                >
                  {type.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Search and Additional Filters */}
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search transactions..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table Card */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px]">Transaction ID</TableHead>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getTypeIcon(transaction.type)}
                      <Badge variant="outline">{transaction.type}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.account}</TableCell>
                  <TableCell>{transaction.reference}</TableCell>
                  <TableCell className="text-right">
                    {transaction.debit > 0 ? `€${transaction.debit.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {transaction.credit > 0 ? `€${transaction.credit.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="border-t px-4 py-4 flex items-center justify-between">
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
        </CardContent>
      </Card>

      {/* Bottom spacing */}
      <div className="h-8" />
    </div>
  );
}

export default TransactionsContent;