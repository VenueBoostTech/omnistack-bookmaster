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
  const [selectedRole, setSelectedRole] = React.useState("ALL");

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

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex gap-2">
          {USER_ROLES.map((role) => (
            <Button
              key={role.value}
              variant={selectedRole === role.value ? "secondary" : "outline"}
              className="flex gap-2"
              onClick={() => setSelectedRole(role.value)}
            >
              {role.label}
              <Badge variant="secondary" className="ml-1">
                {role.count}
              </Badge>
            </Button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-8" />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Users Table */}
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
              {USERS_DATA.map((user) => (
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
        </CardContent>
      </Card>
    </div>
  );
}

export default UsersContent;