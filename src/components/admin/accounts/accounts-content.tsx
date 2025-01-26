"use client";

import React ,{ useEffect, useCallback, useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Filter, Search, Download, ArrowUpRight, ArrowDownRight, MoreHorizontal, Trash2, Edit } from "lucide-react";
import { useClient } from '@/hooks/useClient';
import { toast } from 'react-hot-toast';
import { AddAccountModal } from './modals/add-account-modal';
import { DeleteAccountModal } from './modals/delete-account-modal';
import { AccountType } from '@prisma/client';

interface Account {
 id: string;
 code: string;
 name: string;
 type: AccountType;
 category: string;
 balance: number;
 lastTransaction: string | null;
 status: string;
 currency: string;
}

interface AccountMetrics {
 types: {
   [key: string]: {
     count: number;
     balance: number;
   }
 }
}

const ACCOUNT_TYPES = [
 { value: "ALL", label: "All Accounts" },
 { value: "ASSET", label: "Assets" },
 { value: "LIABILITY", label: "Liabilities" },
 { value: "EQUITY", label: "Equity" },
 { value: "REVENUE", label: "Revenue" },
 { value: "EXPENSE", label: "Expenses" }
];

export function AccountsContent() {
 const [accounts, setAccounts] = useState<Account[]>([]);
 const [loading, setLoading] = useState(true);
 const [selectedType, setSelectedType] = useState("ALL");
 const [searchTerm, setSearchTerm] = useState("");
 const [page, setPage] = useState(1);
 const [pageSize, setPageSize] = useState(10);
 const [total, setTotal] = useState(0);
 const [metrics, setMetrics] = useState<AccountMetrics>({ types: {} });
 const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
 const [showAddModal, setShowAddModal] = useState(false);
 const [showDeleteModal, setShowDeleteModal] = useState(false);

 const { clientId } = useClient();

 const fetchAccounts = useCallback(async () => {
   if (!clientId) return;
   
   try {
     setLoading(true);
     const searchParams = new URLSearchParams({
       page: page.toString(),
       pageSize: pageSize.toString(),
       clientId,
       search: searchTerm,
       type: selectedType
     });

     const res = await fetch(`/api/accounts?${searchParams}`);
     const data = await res.json();
     
     if (!res.ok) throw new Error(data.error);
     
     setAccounts(data.items);
     setTotal(data.total);
     setMetrics(data.metrics);
   } catch (error) {
     toast.error('Failed to fetch accounts');
   } finally {
     setLoading(false);
   }
 }, [clientId, page, pageSize, searchTerm, selectedType]);

 useEffect(() => {
   fetchAccounts();
 }, [fetchAccounts]);

 const handleDelete = async () => {
  if (!selectedAccount) return;

  try {
    const res = await fetch(`/api/accounts/${selectedAccount.id}`, {
      method: 'DELETE'
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    toast.success('Account deleted');
    fetchAccounts();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Failed to delete account');
  }
  setShowDeleteModal(false);
};

 const totalPages = Math.ceil(total / pageSize);

 return (
   <div className="space-y-6">
     <div className="flex justify-between items-start">
       <div>
         <h1 className="text-2xl font-bold tracking-tight">Chart of Accounts</h1>
         <p className="text-sm text-muted-foreground mt-2">
           Manage your company's chart of accounts
         </p>
       </div>
       <div className="flex gap-2">
         <Button variant="outline">
           <Download className="h-4 w-4 mr-2" />
           Export
         </Button>
         <Button onClick={() => setShowAddModal(true)} style={{ backgroundColor: "#5FC4D0" }}>
           <Plus className="h-4 w-4 mr-2" />
           New Account
         </Button>
       </div>
     </div>

     {/* Quick Stats */}
     <div className="grid gap-4 md:grid-cols-5">
       {ACCOUNT_TYPES.filter(t => t.value !== 'ALL').map((type) => (
         <Card key={type.value}>
           <CardContent className="p-4">
             <div className="flex justify-between items-start">
               <div className="space-y-1">
                 <p className="text-sm text-muted-foreground">{type.label}</p>
                 <p className="text-2xl font-bold">
                   {metrics.types[type.value]?.count || 0}
                 </p>
                 <p className="text-sm text-muted-foreground">
                   €{(metrics.types[type.value]?.balance || 0).toLocaleString()}
                 </p>
               </div>
             </div>
           </CardContent>
         </Card>
       ))}
     </div>

     {/* Filters */}
     <Card>
       <CardHeader>

       <div className='mb-2'>
       <h3 className="text-lg">Filter Accounts</h3>
         <p className="text-sm text-muted-foreground">
           Search and filter through accounts
         </p>
         </div>
        
       </CardHeader>
       <CardContent className="space-y-4">
         <div className="flex flex-wrap gap-2">
           {ACCOUNT_TYPES.map((type) => (
             <Button
               key={type.value}
               variant={selectedType === type.value ? "default" : "outline"}
               className={selectedType === type.value ? "bg-red-600 hover:bg-red-700" : ""}
               onClick={() => setSelectedType(type.value)}
             >
               {type.label}
               {type.value !== 'ALL' && (
                 <Badge variant="secondary" className="ml-2">
                   {metrics.types[type.value]?.count || 0}
                 </Badge>
               )}
             </Button>
           ))}
         </div>

         <div className="flex gap-2 items-center">
           <div className="relative flex-1">
             <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
             <Input 
               placeholder="Search accounts..." 
               className="pl-8"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           <Button variant="outline">
             <Filter className="h-4 w-4 mr-2" />
             Filters
           </Button>
         </div>
       </CardContent>
     </Card>

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
               <TableHead className="text-right">Actions</TableHead>
             </TableRow>
           </TableHeader>
           <TableBody>
             {loading ? (
               <TableRow>
                 <TableCell colSpan={8} className="text-center py-4">
                   Loading...
                 </TableCell>
               </TableRow>
             ) : accounts.length === 0 ? (
               <TableRow>
                 <TableCell colSpan={8} className="text-center py-8">
                   <div className="text-4xl mb-4">📊</div>
                   <h3 className="text-lg font-medium">No accounts found</h3>
                   <p className="text-sm text-muted-foreground mt-1">
                     Start by creating your first account
                   </p>
                   <Button 
                     className="mt-4"
                     style={{ backgroundColor: "#5FC4D0" }}
                     onClick={() => setShowAddModal(true)}
                   >
                     <Plus className="h-4 w-4 mr-2" />
                     New Account
                   </Button>
                 </TableCell>
               </TableRow>
             ) : accounts.map((account) => (
               <TableRow key={account.id}>
                 <TableCell className="font-medium">{account.code}</TableCell>
                 <TableCell>{account.name}</TableCell>
                 <TableCell>
                   <Badge variant="outline">{account.type}</Badge>
                 </TableCell>
                 <TableCell>{account.category}</TableCell>
                 <TableCell className="text-right">
                   <div className="flex items-center justify-end gap-2">
                     <span className={account.balance >= 0 ? "text-green-600" : "text-red-600"}>
                       {account.currency} {Math.abs(account.balance).toLocaleString()}
                     </span>
                     {account.balance >= 0 ? (
                       <ArrowUpRight className="h-4 w-4 text-green-600" />
                     ) : (
                       <ArrowDownRight className="h-4 w-4 text-red-600" />
                     )}
                   </div>
                 </TableCell>
                 <TableCell>
                   {account.lastTransaction ? 
                     new Date(account.lastTransaction).toLocaleDateString() : 
                     'No transactions'
                   }
                 </TableCell>
                 <TableCell>
                   <Badge 
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
                   <div className="flex justify-end gap-2">
                     <Button variant="ghost" size="sm">
                       <Edit className="h-4 w-4" />
                     </Button>
                     <Button 
                       variant="ghost" 
                       size="sm"
                       onClick={() => {
                         setSelectedAccount(account);
                         setShowDeleteModal(true);
                       }}
                     >
                       <Trash2 className="h-4 w-4" />
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

     <AddAccountModal 
       isOpen={showAddModal}
       onClose={() => setShowAddModal(false)}
       onSuccess={fetchAccounts}
     />

     <DeleteAccountModal
       isOpen={showDeleteModal}
       onClose={() => setShowDeleteModal(false)}
       onConfirm={handleDelete}
       accountName={selectedAccount?.name || ''}
     />
   </div>
 );
}

export default AccountsContent;