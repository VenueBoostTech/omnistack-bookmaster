"use client";

import React, { useEffect, useCallback, useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Filter, Search, Download, UsersIcon, Shield, Mail, Edit, Key, Trash2 } from "lucide-react";
import { useClient } from '@/hooks/useClient';
import { toast } from 'react-hot-toast';
import { AddUserModal } from './modals/add-user-modal';
import { DeleteUserModal } from './modals/delete-user-modal';

const USER_ROLES = [
 { value: "ALL", label: "All Users" },
 { value: "ADMIN", label: "Administrators" },
 { value: "MANAGER", label: "Managers" },
 { value: "ACCOUNTANT", label: "Accountants" },
 { value: "USER", label: "Users" }
];

const getRoleBadgeColor = (role: string) => {
 const colors = {
   'ADMIN': 'bg-purple-100 text-purple-800',
   'MANAGER': 'bg-blue-100 text-blue-800',
   'ACCOUNTANT': 'bg-green-100 text-green-800',
   'USER': 'bg-gray-100 text-gray-800'
 };
 return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

const getStatusColor = (status: string) => 
//  status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-green-100 text-green-800';

interface User {
 id: string;
 name: string;
 email: string;
 role: string;
 lastAccess?: Date;
 status: string;
}

export function UsersContent() {
 const [users, setUsers] = useState<User[]>([]);
 const [loading, setLoading] = useState(true);
 const [selectedRole, setSelectedRole] = useState("ALL");
 const [searchTerm, setSearchTerm] = useState("");
 const [page, setPage] = useState(1);
 const [pageSize, setPageSize] = useState(10);
 const [total, setTotal] = useState(0);
 const [selectedUser, setSelectedUser] = useState<User | null>(null);
 const [showAddModal, setShowAddModal] = useState(false);
 const [showDeleteModal, setShowDeleteModal] = useState(false);
 
 const [metrics, setMetrics] = useState({
   total: 0,
   activeNow: 0,
 });

 const { clientId } = useClient();

 const fetchUsers = useCallback(async () => {
   if (!clientId) return;
   
   try {
     setLoading(true);
     const searchParams = new URLSearchParams({
       page: page.toString(),
       pageSize: pageSize.toString(),
       clientId,
       search: searchTerm,
       role: selectedRole
     });

     const res = await fetch(`/api/users?${searchParams}`);
     const data = await res.json();
     
     if (!res.ok) throw new Error(data.error);
     
     setUsers(data.items);
     setTotal(data.total);
     setMetrics(data.metrics);
   } catch (error) {
     toast.error('Failed to fetch users');
   } finally {
     setLoading(false);
   }
 }, [clientId, page, pageSize, searchTerm, selectedRole]);

 useEffect(() => {
   fetchUsers();
 }, [fetchUsers]);

 const handleDelete = async () => {
  if (!selectedUser) return;

  try {
    const res = await fetch(`/api/users/${selectedUser.id}`, {
      method: 'DELETE'
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    toast.success('User deleted');
    fetchUsers();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Failed to delete user');
  }
  setShowDeleteModal(false);
};

 const totalPages = Math.ceil(total / pageSize);

 return (
   <div className="space-y-6">
     {/* Header */}
     <div className="flex justify-between items-start">
       <div>
         <h1 className="text-2xl font-bold tracking-tight">Users</h1>
         <p className="text-sm text-muted-foreground mt-2">
           Manage user accounts and permissions
         </p>
       </div>
       <div className="flex gap-2">
         <Button variant="outline">
           <Download className="h-4 w-4 mr-2" />
           Export
         </Button>
         <Button onClick={() => setShowAddModal(true)} style={{ backgroundColor: "#5FC4D0" }}>
           <Plus className="h-4 w-4 mr-2" />
           Add User
         </Button>
       </div>
     </div>

     {/* Quick Stats */}
     <div className="grid gap-4 md:grid-cols-4">
       <Card>
         <CardContent className="p-4">
           <div className="flex justify-between items-start">
             <div className="space-y-1">
               <p className="text-sm text-muted-foreground">Total Users</p>
               <p className="text-2xl font-bold">{metrics.total}</p>
             </div>
             <div className="p-2 bg-primary/10 rounded-lg">
               <UsersIcon className="h-5 w-5 text-primary" />
             </div>
           </div>
         </CardContent>
       </Card>
       <Card>
         <CardContent className="p-4">
           <div className="flex justify-between items-start">
             <div className="space-y-1">
               <p className="text-sm text-muted-foreground">Active Now</p>
               <p className="text-2xl font-bold">{metrics.activeNow}</p>
             </div>
             <div className="p-2 bg-green-100 rounded-lg">
               <Shield className="h-5 w-5 text-green-600" />
             </div>
           </div>
         </CardContent>
       </Card>
     </div>

     {/* Filters */}
     <Card>
       <CardHeader>
        <div className='mb-2'>
          <h3 className="text-lg">Filter Users</h3>
          <p className="text-sm text-muted-foreground">
            Search and filter through user accounts
          </p>
         </div>
       </CardHeader>
       <CardContent className="space-y-4">
         <div className="flex flex-wrap gap-2">
           {USER_ROLES.map((role) => (
             <Button
               key={role.value}
               variant={selectedRole === role.value ? "default" : "outline"}
               className={selectedRole === role.value ? "bg-red-600 hover:bg-red-700" : ""}
               onClick={() => setSelectedRole(role.value)}
             >
               {role.label}
             </Button>
           ))}
         </div>

         <div className="flex gap-2 items-center">
           <div className="relative flex-1">
             <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
             <Input 
               placeholder="Search users..." 
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

     {/* Users Table */}
     <Card>
       <CardContent className="p-0">
         <Table>
           <TableHeader>
             <TableRow>
               <TableHead>Name</TableHead>
               <TableHead>Email</TableHead>
               <TableHead>Role</TableHead>
               <TableHead>Last Access</TableHead>
               <TableHead>Status</TableHead>
               <TableHead className="text-right">Actions</TableHead>
             </TableRow>
           </TableHeader>
           <TableBody>
             {loading ? (
               <TableRow>
                 <TableCell colSpan={6} className="text-center py-4">
                   Loading...
                 </TableCell>
               </TableRow>
             ) : users.length === 0 ? (
               <TableRow>
                 <TableCell colSpan={6} className="text-center py-8">
                   <div className="text-4xl mb-4">👥</div>
                   <h3 className="text-lg font-medium">No users found</h3>
                   <p className="text-sm text-muted-foreground mt-1">
                     Start by adding your first user
                   </p>
                   <Button 
                     className="mt-4"
                     style={{ backgroundColor: "#5FC4D0" }}
                     onClick={() => setShowAddModal(true)}
                   >
                     <Plus className="h-4 w-4 mr-2" />
                     Add User
                   </Button>
                 </TableCell>
               </TableRow>
             ) : users.map((user) => (
               <TableRow key={user.id}>
                 <TableCell className="font-medium">{user.name}</TableCell>
                 <TableCell>
                   <div className="flex items-center gap-2">
                     <Mail className="h-4 w-4 text-muted-foreground" />
                     {user.email}
                   </div>
                 </TableCell>
                 <TableCell>
                   <Badge variant="secondary" className={getRoleBadgeColor(user.role)}>
                     {user.role}
                   </Badge>
                 </TableCell>
                 <TableCell>
                   {user.lastAccess ? new Date(user.lastAccess).toLocaleString() : 'Never'}
                 </TableCell>
                 <TableCell>
                   <Badge variant="secondary" className={getStatusColor(user.status)}>
                     {user.status ?? 'ACTIVE'}
                   </Badge>
                 </TableCell>
                 <TableCell>
                   <div className="flex justify-end gap-2">
                     <Button variant="ghost" size="sm">
                       <Edit className="h-4 w-4" />
                     </Button>
                     <Button variant="ghost" size="sm">
                       <Key className="h-4 w-4" />
                     </Button>
                     <Button variant="ghost" size="sm" onClick={() => {
                       setSelectedUser(user);
                       setShowDeleteModal(true);
                     }}>
                       <Trash2 className="h-4 w-4" />
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

     <AddUserModal 
       isOpen={showAddModal}
       onClose={() => setShowAddModal(false)}
       onSuccess={fetchUsers}
     />

     <DeleteUserModal
       isOpen={showDeleteModal}
       onClose={() => setShowDeleteModal(false)}
       onConfirm={handleDelete}
       userName={selectedUser?.name || ''}
     />
   </div>
 );
}