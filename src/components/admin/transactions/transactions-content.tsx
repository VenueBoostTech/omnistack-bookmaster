"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Filter, Search, Download, Calendar, Receipt, ArrowRightLeft, FileText, Eye, MoreHorizontal, ArrowUpRight, ArrowDownRight, Trash2 } from "lucide-react";
import { useClient } from '@/hooks/useClient';
import { toast } from 'react-hot-toast';
import { DeleteTransactionModal } from './modals/delete-transaction-modal';
import { AddTransactionModal } from './modals/add-transaction-modal';

interface Transaction {
 id: string;
 date: string;
 type: string;
 description: string;
 account: {
   name: string;
 };
 reference: string;
 debit: number;
 credit: number;
 status: string;
 completedAt: string | null;
}

interface TransactionMetrics {
 todayDeposits: number;
 todayPayments: number;
 pendingCount: number;
 completedToday: number;
}

const TRANSACTION_TYPES = [
 { value: "ALL", label: "All Transactions" },
 { value: "PURCHASE", label: "Purchases" },
 { value: "SALE", label: "Sales" },
 { value: "PAYMENT", label: "Payments" },
 { value: "RECEIPT", label: "Receipts" },
 { value: "TRANSFER", label: "Transfers" },
 { value: "ADJUSTMENT", label: "Adjustments" }
];

const getStatusColor = (status: string) => {
 switch (status) {
   case 'COMPLETED': return 'bg-green-100 text-green-800';
   case 'PENDING': return 'bg-yellow-100 text-yellow-800';
   case 'VOIDED': return 'bg-red-100 text-red-800';
   default: return 'bg-gray-100 text-gray-800';
 }
};

const getTypeIcon = (type: string) => {
 switch (type) {
   case 'PURCHASE': return <ArrowDownRight className="h-4 w-4" />;
   case 'SALE': return <ArrowUpRight className="h-4 w-4" />;
   case 'PAYMENT': return <ArrowDownRight className="h-4 w-4" />;
   case 'RECEIPT': return <ArrowUpRight className="h-4 w-4" />;
   case 'ADJUSTMENT': return <ArrowRightLeft className="h-4 w-4" />;
   default: return <Receipt className="h-4 w-4" />;
 }
};

export function TransactionsContent() {
 const { clientId } = useClient();
 const [selectedType, setSelectedType] = useState("ALL");
 const [searchTerm, setSearchTerm] = useState("");
 const [page, setPage] = useState(1);
 const [pageSize, setPageSize] = useState(10);
 const [loading, setLoading] = useState(true);
 const [transactions, setTransactions] = useState<Transaction[]>([]);
 const [total, setTotal] = useState(0);
 const [metrics, setMetrics] = useState<TransactionMetrics>({
   todayDeposits: 0,
   todayPayments: 0,
   pendingCount: 0,
   completedToday: 0
 });

const [showAddModal, setShowAddModal] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);


 const fetchTransactions = useCallback(async () => {
   if (!clientId) return;
   
   setLoading(true);
   try {
     const params = new URLSearchParams({
       clientId,
       page: String(page),
       pageSize: String(pageSize),
       search: searchTerm,
       type: selectedType
     });

     const res = await fetch(`/api/transactions?${params}`);
     const data = await res.json();

     if (!res.ok) throw new Error(data.error);

     setTransactions(data.items);
     setMetrics(data.metrics);
     setTotal(data.total);
   } catch (error) {
     toast.error('Failed to fetch transactions');
   } finally {
     setLoading(false);
   }
 }, [clientId, page, pageSize, searchTerm, selectedType]);

 useEffect(() => {
   fetchTransactions();
 }, [fetchTransactions]);

 const totalPages = Math.ceil(total / pageSize);

// TransactionsContent.tsx
const handleDelete = async () => {
  try {
    const res = await fetch(`/api/transactions/${selectedTransaction?.id}`, { 
      method: 'DELETE' 
    });
    const data = await res.json();
    
    if (!res.ok) throw new Error(data.error);
    
    toast.success('Transaction deleted');
    fetchTransactions();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Failed to delete transaction');
  }
  setShowDeleteModal(false);
};

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
         <Button 
          onClick={() => setShowAddModal(true)} 
          style={{ backgroundColor: "#5FC4D0" }}
        >
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
               <p className="text-2xl font-bold">€{metrics.todayDeposits.toLocaleString()}</p>
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
               <p className="text-2xl font-bold">€{metrics.todayPayments.toLocaleString()}</p>
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
               <p className="text-2xl font-bold">{metrics.pendingCount}</p>
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
               <p className="text-sm text-muted-foreground">Completed Today</p>
               <p className="text-2xl font-bold">{metrics.completedToday}</p>
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
               className={selectedType === type.value ? "bg-red-600 hover:bg-red-700" : ""}
               onClick={() => setSelectedType(type.value)}
             >
               {type.label}
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

     {/* Transactions Table */}
     <Card>
       <CardContent className="p-0">
         {loading ? (
           <div className="text-center py-8">Loading...</div>
         ) : transactions.length === 0 ? (
           <div className="text-center py-8">
             <div className="text-4xl mb-4">📄</div>
             <h3 className="text-lg font-medium">No transactions found</h3>
             <p className="text-sm text-muted-foreground mt-1">
               Start by creating your first transaction
             </p>
             <Button 
              className="mt-4"
              style={{ backgroundColor: "#5FC4D0" }}
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Transaction
            </Button>
           </div>
         ) : (
           <Table>
             <TableHeader>
               <TableRow>
                 <TableHead className="w-[140px]">Transaction ID</TableHead>
                 <TableHead className="w-[100px]">Date</TableHead>
                 <TableHead>Type</TableHead>
                 <TableHead>Description</TableHead>
                 <TableHead>Account</TableHead>
                 <TableHead>Reference</TableHead>
                 <TableHead>Completed</TableHead>
                 <TableHead className="text-right">Debit</TableHead>
                 <TableHead className="text-right">Credit</TableHead>
                 <TableHead>Status</TableHead>
                 <TableHead className="w-[100px]">Actions</TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {transactions.map((transaction) => (
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
                   <TableCell>{transaction.account?.name || 'N/A'}</TableCell>
                   <TableCell>{transaction.reference}</TableCell>
                   <TableCell>
                    {transaction.completedAt 
                      ? new Date(transaction.completedAt).toLocaleDateString()
                      : '-'
                    }
                  </TableCell>
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

                        <Button 
                       variant="ghost" 
                       size="sm"
                       onClick={() => {
                        setSelectedTransaction(transaction);
                        setShowDeleteModal(true);
                       }}
                     >
                       <Trash2 className="h-4 w-4" />
                     </Button>
                        <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {}}
                        >
                        <MoreHorizontal className="h-4 w-4" />
                        </Button>
                     </div>
                   </TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         )}

         {/* Pagination */}
         {transactions.length > 0 && (
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
         )}
       </CardContent>
     </Card>
    
<AddTransactionModal 
  isOpen={showAddModal}
  onClose={() => setShowAddModal(false)}
  onSuccess={fetchTransactions}
/>

<DeleteTransactionModal 
  isOpen={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  onConfirm={handleDelete}
  transactionId={selectedTransaction?.id || ''}
/>
   </div>
 );
}

export default TransactionsContent;