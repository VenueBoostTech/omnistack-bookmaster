// components/admin/departments/departments-content.tsx
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Users, Building2, Trash2, ArrowLeft } from "lucide-react";
import { useClient } from '@/hooks/useClient';
import { toast } from 'react-hot-toast';
import { Badge } from "@/components/ui/badge";
import { AddDepartmentModal } from './modals/add-department-modal';
import { DeleteDepartmentModal } from './modals/delete-department-modal';
import { useRouter } from 'next/dist/client/components/navigation';

interface Department {
 id: string;
 name: string;
 userCount: number;
 createdAt: string;
}

interface DepartmentMetrics {
 total: number;
 withUsers: number;
}

export function DepartmentsContent() {
 const { clientId } = useClient();
 const [departments, setDepartments] = useState<Department[]>([]);
 const [loading, setLoading] = useState(true);
 const [searchTerm, setSearchTerm] = useState("");
 const [showAddModal, setShowAddModal] = useState(false);
 const [showDeleteModal, setShowDeleteModal] = useState(false);
 const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
 const [metrics, setMetrics] = useState<DepartmentMetrics>({
   total: 0,
   withUsers: 0
 });
 const router = useRouter();

 const fetchDepartments = useCallback(async () => {
   if (!clientId) return;
   
   try {
     setLoading(true);
     const res = await fetch(`/api/departments?clientId=${clientId}`);
     const data = await res.json();
     
     if (!res.ok) throw new Error(data.error);
     
     setDepartments(data.items);
     setMetrics(data.metrics);
   } catch (error) {
     toast.error('Failed to fetch departments');
   } finally {
     setLoading(false);
   }
 }, [clientId]);

 useEffect(() => {
   fetchDepartments();
 }, [fetchDepartments]);

 const handleDelete = async () => {
   if (!selectedDepartment) return;
   try {
     const res = await fetch(`/api/departments/${selectedDepartment.id}`, {
       method: 'DELETE'
     });
     const data = await res.json();
     
     if (!res.ok) throw new Error(data.error);
     
     toast.success('Department deleted');
     fetchDepartments();
   } catch (error) {
     toast.error(error instanceof Error ? error.message : 'Failed to delete department');
   }
   setShowDeleteModal(false);
 };

 const filteredDepartments = departments.filter(dept => 
   dept.name.toLowerCase().includes(searchTerm.toLowerCase())
 );

 return (
   <div className="space-y-6">
     <div className="flex justify-between items-start">
     <div>
         <Button 
           variant="outline" 
           onClick={() => router.push('/admin/users')}
           className="mb-4"
         >
           <ArrowLeft className="h-4 w-4 mr-2" />
           Back to Users
         </Button>
         <h1 className="text-2xl font-bold tracking-tight">Departments</h1>
         <p className="text-sm text-muted-foreground mt-2">
           Manage organization departments and structure
         </p>
       </div>
       <Button onClick={() => setShowAddModal(true)} style={{ backgroundColor: "#5FC4D0" }}>
         <Plus className="h-4 w-4 mr-2" />
         Add Department
       </Button>
     </div>

     <div className="grid gap-4 md:grid-cols-2">
       <Card>
         <CardContent className="p-4">
           <div className="flex justify-between items-start">
             <div className="space-y-1">
               <p className="text-sm text-muted-foreground">Total Departments</p>
               <p className="text-2xl font-bold">{metrics.total}</p>
             </div>
             <div className="p-2 bg-primary/10 rounded-lg">
               <Building2 className="h-5 w-5 text-primary" />
             </div>
           </div>
         </CardContent>
       </Card>
       <Card>
         <CardContent className="p-4">
           <div className="flex justify-between items-start">
             <div className="space-y-1">
               <p className="text-sm text-muted-foreground">Departments with Users</p>
               <p className="text-2xl font-bold">{metrics.withUsers}</p>
             </div>
             <div className="p-2 bg-green-100 rounded-lg">
               <Users className="h-5 w-5 text-green-600" />
             </div>
           </div>
         </CardContent>
       </Card>
     </div>

     <Card>
       <CardContent className="p-4">
         <div className="relative">
           <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
           <Input 
             placeholder="Search departments..." 
             className="pl-8"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
         </div>
       </CardContent>
     </Card>

     <Card>
       <CardContent className="p-0">
         <Table>
           <TableHeader>
             <TableRow>
               <TableHead>Name</TableHead>
               <TableHead>Users</TableHead>
               <TableHead>Created</TableHead>
               <TableHead className="text-right">Actions</TableHead>
             </TableRow>
           </TableHeader>
           <TableBody>
             {loading ? (
               <TableRow>
                 <TableCell colSpan={4} className="text-center py-4">Loading...</TableCell>
               </TableRow>
             ) : filteredDepartments.length === 0 ? (
               <TableRow>
                 <TableCell colSpan={4} className="text-center py-4">No departments found</TableCell>
               </TableRow>
             ) : (
               filteredDepartments.map((dept) => (
                 <TableRow key={dept.id}>
                   <TableCell className="font-medium">{dept.name}</TableCell>
                   <TableCell>
                     <Badge variant="secondary">
                       {dept.userCount} users
                     </Badge>
                   </TableCell>
                   <TableCell>
                     {new Date(dept.createdAt).toLocaleDateString()}
                   </TableCell>
                   <TableCell className="text-right">
                     <Button 
                       variant="ghost" 
                       size="sm"
                       onClick={() => {
                         setSelectedDepartment(dept);
                         setShowDeleteModal(true);
                       }}
                       disabled={dept.userCount > 0}
                     >
                       <Trash2 className="h-4 w-4" />
                     </Button>
                   </TableCell>
                 </TableRow>
               ))
             )}
           </TableBody>
         </Table>
       </CardContent>
     </Card>

     <AddDepartmentModal 
       isOpen={showAddModal}
       onClose={() => setShowAddModal(false)}
       onSuccess={fetchDepartments}
     />

     <DeleteDepartmentModal
       isOpen={showDeleteModal}
       onClose={() => setShowDeleteModal(false)}
       onConfirm={handleDelete}
       departmentName={selectedDepartment?.name || ''}
     />
   </div>
 );
}