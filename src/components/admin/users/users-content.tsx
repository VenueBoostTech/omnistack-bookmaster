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
  Users as UsersIcon,
  Building2,
  Store,
  Shield,
  Mail,
  Edit,
  Key,
  MoreHorizontal
} from "lucide-react";

const USER_ROLES = [
  { value: "ALL", label: "All Users", count: 12 },
  { value: "ADMIN", label: "Administrators", count: 2 },
  { value: "MANAGER", label: "Managers", count: 3 },
  { value: "ACCOUNTANT", label: "Accountants", count: 4 },
  { value: "USER", label: "Users", count: 3 }
];

const USERS_DATA = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@metroshop.al",
    role: "ADMIN",
    warehouse: "Main Warehouse",
    lastAccess: "2024-01-22T10:30:00",
    status: "ACTIVE"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@metroshop.al",
    role: "ACCOUNTANT",
    warehouse: "Main Warehouse",
    lastAccess: "2024-01-22T09:15:00",
    status: "ACTIVE"
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike.w@metroshop.al",
    role: "MANAGER",
    warehouse: "South Branch",
    lastAccess: "2024-01-21T16:45:00",
    status: "ACTIVE"
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma.d@metroshop.al",
    role: "USER",
    warehouse: "East Storage",
    lastAccess: "2024-01-20T14:20:00",
    status: "INACTIVE"
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.b@metroshop.al",
    role: "ACCOUNTANT",
    warehouse: "Main Warehouse",
    lastAccess: "2024-01-22T11:10:00",
    status: "ACTIVE"
  }
];

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case 'ADMIN':
      return 'bg-purple-100 text-purple-800';
    case 'MANAGER':
      return 'bg-blue-100 text-blue-800';
    case 'ACCOUNTANT':
      return 'bg-green-100 text-green-800';
    case 'USER':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  return status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
};

export function UsersContent() {
  const [selectedRole, setSelectedRole] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter users based on role and search
  const filteredUsers = useMemo(() => {
    return USERS_DATA.filter(user => {
      const matchesRole = selectedRole === "ALL" || user.role === selectedRole;
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.warehouse.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesRole && matchesSearch;
    });
  }, [selectedRole, searchTerm]);

  // Calculate pagination
  const totalFilteredItems = filteredUsers.length;
  const totalPages = Math.ceil(totalFilteredItems / pageSize);
  const paginatedUsers = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return filteredUsers.slice(startIndex, startIndex + pageSize);
  }, [filteredUsers, page, pageSize]);

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
          <Button style={{ backgroundColor: "#5FC4D0" }}>
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
                <p className="text-2xl font-bold">12</p>
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
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Warehouses</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Store className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Departments</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Building2 className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters Card */}
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
          {/* Role Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {USER_ROLES.map((role) => (
              <Button
                key={role.value}
                variant={selectedRole === role.value ? "default" : "outline"}
                className={`group ${
                  selectedRole === role.value ? "bg-red-600 hover:bg-red-700" : ""
                }`}
                onClick={() => setSelectedRole(role.value)}
              >
                <span className={selectedRole === role.value ? "text-white" : "text-gray-700"}>
                  {role.label}
                </span>
                <Badge 
                  variant="secondary" 
                  className={`ml-2 ${
                    selectedRole === role.value 
                      ? "bg-red-700 text-white" 
                      : "text-gray-100"
                  }`}
                >
                  {role.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Search Bar */}
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

      {/* Users Table Card */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Last Access</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
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
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4 text-muted-foreground" />
                      {user.warehouse}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(user.lastAccess).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(user.status)}>
                      {user.status}
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

export default UsersContent;