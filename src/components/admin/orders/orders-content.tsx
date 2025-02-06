// components/admin/orders/orders-content.tsx
"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Search,
  Filter,
  Download,
  StickyNote,
  ClipboardList,
  CircleDollarSign,
  PackageCheck,
  PackageX,
  ShoppingCart
} from "lucide-react";
import { useOrders } from '@/hooks/useOrders';
import { UpdateStatusModal } from './modals/update-status-modal';
import { AddNoteModal } from './modals/add-note-modal';
import { Order } from '@/app/api/external/omnigateway/types/orders';

const ORDER_FILTERS = [
  { value: "ALL", label: "All Orders" },
  { value: "PENDING", label: "Pending" },
  { value: "PAID", label: "Paid" },
  { value: "REFUNDED", label: "Refunded" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "PARTIALLY_REFUNDED", label: "Partially Refunded" }
];

const getStatusBadge = (status: string) => {
  const colors = {
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'PAID': 'bg-green-100 text-green-800',
    'REFUNDED': 'bg-blue-100 text-blue-800',
    'CANCELLED': 'bg-red-100 text-red-800',
    'PARTIALLY_REFUNDED': 'bg-purple-100 text-purple-800'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export function OrdersContent() {
  const {
    isLoading,
    orders,
    totalItems,
    totalPages,
    fetchOrders,
    updateOrderStatus,
    addOrderNote
  } = useOrders();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders({
      page,
      limit: pageSize,
      status: selectedFilter !== 'ALL' ? selectedFilter : undefined,
      search: searchTerm
    });
  }, [fetchOrders, page, pageSize, selectedFilter, searchTerm]);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!selectedOrder) return;
    await updateOrderStatus(selectedOrder.id, { status: newStatus });
    fetchOrders({
      page,
      limit: pageSize,
      status: selectedFilter !== 'ALL' ? selectedFilter : undefined,
      search: searchTerm
    });
  };

  const handleAddNote = async (note: string) => {
    if (!selectedOrder) return;
    await addOrderNote(selectedOrder.id, note);
  };

  const metrics = {
    total: totalItems || 0,
    pending: orders?.filter(o => o.status === 'PENDING').length || 0,
    completed: orders?.filter(o => o.status === 'PAID').length || 0,
    cancelled: orders?.filter(o => o.status === 'CANCELLED').length || 0
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage and track customer orders
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{metrics.total}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{metrics.pending}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ClipboardList className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{metrics.completed}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <PackageCheck className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Cancelled</p>
                <p className="text-2xl font-bold">{metrics.cancelled}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <PackageX className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

     {/* Filters */}
     <Card>
        <CardHeader>
          <div className="mb-2">
            <h3 className="text-lg">Filter Orders</h3>
            <p className="text-sm text-muted-foreground">
              Search and filter through orders
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {ORDER_FILTERS.map((filter) => (
              <Button
                key={filter.value}
                variant={selectedFilter === filter.value ? "default" : "outline"}
                className={selectedFilter === filter.value ? "bg-red-600 hover:bg-red-700" : ""}
                onClick={() => setSelectedFilter(filter.value)}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by order number or customer..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Number</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="text-4xl mb-4">🛍️</div>
                    <h3 className="text-lg font-medium">No orders found</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try adjusting your filters
                    </p>
                  </TableCell>
                </TableRow>
              ) : orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="font-medium">{order.orderNumber}</div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div>{order.source.externalCustomerEmail}</div>
                      <div className="text-sm text-muted-foreground">
                        ID: {order.source.externalCustomerId}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
                      {order.total} {order.currency}
                    </div>
                  </TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusBadge(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowStatusModal(true);
                        }}
                      >
                        <ClipboardList className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowNoteModal(true);
                        }}
                      >
                        <StickyNote className="h-4 w-4 text-yellow-500" />
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

      {/* Modals */}
      {showStatusModal && selectedOrder && (
        <UpdateStatusModal
          isOpen={showStatusModal}
          onClose={() => {
            setShowStatusModal(false);
            setSelectedOrder(null);
          }}
          onConfirm={handleStatusUpdate}
          currentStatus={selectedOrder.status}
        />
      )}

      {showNoteModal && selectedOrder && (
        <AddNoteModal
          isOpen={showNoteModal}
          onClose={() => {
            setShowNoteModal(false);
            setSelectedOrder(null);
          }}
          onConfirm={handleAddNote}
        />
      )}
</div>
 );
}

export default OrdersContent;