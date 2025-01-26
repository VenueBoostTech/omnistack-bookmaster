"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, MoreHorizontal, Plus, Search, ShoppingCart, Clock, Truck, CreditCard, Building2, Store, ArrowUpRight, ArrowDownRight, Receipt, ExternalLink, History } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from 'react-hot-toast';
import { useClient } from '@/hooks/useClient';
import { AddPurchaseOrderModal } from '../purchases/modals/add-purchase-order-modal';
import InputSelect from "@/components/Common/InputSelect";
import { DeletePurchaseOrderModal } from '../purchases/modals/delete-purchase-order-modal';

interface PurchaseOrder {
 id: string;
 number: string;
 date: string;
 vendor: {
   name: string;
 };
 warehouse?: string;
 items: any[];
 totalValue: number;
 status: string;
 expectedDelivery: string | null;
 paymentStatus: string;
 priority: string;
}

interface PurchaseMetrics {
 totalOrders: number;
 pendingOrders: number;
 expectedArrivals: number;
 purchaseValue: number;
}

export function PurchasesContent() {
 const { clientId } = useClient();
 const [orders, setOrders] = useState<PurchaseOrder[]>([]);
 const [metrics, setMetrics] = useState<PurchaseMetrics>({
   totalOrders: 0,
   pendingOrders: 0,
   expectedArrivals: 0,
   purchaseValue: 0
 });
 const [loading, setLoading] = useState(true);
 const [page, setPage] = useState(1);
 const [pageSize, setPageSize] = useState(10);
 const [total, setTotal] = useState(0);
 const [filters, setFilters] = useState({
   search: '',
   vendor: 'all',
   status: 'all',
   payment: 'all'
 });
 const [showAddModal, setShowAddModal] = useState(false);
 const [showDeleteModal, setShowDeleteModal] = useState(false);
 const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);

 const fetchOrders = useCallback(async () => {
   if (!clientId) return;
   
   try {
     setLoading(true);
     const params = new URLSearchParams({
       page: page.toString(),
       pageSize: pageSize.toString(),
       clientId,
       search: filters.search,
       status: filters.status,
       payment: filters.payment
     });

     const res = await fetch(`/api/purchase-orders?${params}`);
     const data = await res.json();
     
     if (!res.ok) throw new Error(data.error);
     
     setOrders(data.items);
     setTotal(data.total);
     setMetrics(data.metrics);
   } catch (error) {
    toast.error(error instanceof Error ? error.message : "Failed to fetch orders");
   } finally {
     setLoading(false);
   }
 }, [clientId, page, pageSize, filters]);

 useEffect(() => {
   fetchOrders();
 }, [fetchOrders]);

 // Add this before the component
const getStatusColor = (status: string) => {
  const colors = {
    DRAFT: "bg-gray-100 text-gray-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    IN_TRANSIT: "bg-yellow-100 text-yellow-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800"
  };
  return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

const getPaymentStatusColor = (status: string) => {
  const colors = {
    PAID: "bg-green-100 text-green-800",
    PENDING: "bg-yellow-100 text-yellow-800",
    OVERDUE: "bg-red-100 text-red-800"
  };
  return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
};


 const handleDelete = async () => {
   if (!selectedOrder) return;

   try {
     const res = await fetch(`/api/purchase-orders/${selectedOrder.id}`, {
       method: 'DELETE'
     });

     if (!res.ok) throw new Error('Failed to delete order');

     toast.success('Order deleted');
     fetchOrders();
   } catch (error) {
     toast.error('Failed to delete order');
   }
   setShowDeleteModal(false);
 };

 const METRIC_CARDS = [
   {
     title: "Total Orders",
     value: metrics.totalOrders,
     change: "+12",
     trend: "up",
     period: "this month",
     icon: ShoppingCart
   },
   {
     title: "Pending Orders",
     value: metrics.pendingOrders,
     change: "-3",
     trend: "down", 
     period: "vs last week",
     icon: Clock
   },
   {
     title: "Expected Arrivals",
     value: metrics.expectedArrivals,
     change: "+4",
     trend: "up",
     period: "this week",
     icon: Truck
   },
   {
     title: "Purchase Value",
     value: `€${metrics.purchaseValue.toLocaleString()}`,
     change: "+15.2%",
     trend: "up",
     period: "this month",
     icon: CreditCard
   }
 ];

 return (
   <div className="space-y-6">
     {/* Header */} 
     <div className="flex justify-between items-start">
       <div>
         <h1 className="text-2xl font-bold tracking-tight">Purchase Orders</h1>
         <p className="text-sm text-muted-foreground mt-2">
           Manage purchase orders and supplier deliveries
         </p>
       </div>
       <Button 
         onClick={() => setShowAddModal(true)} 
         className="bg-[#5FC4D0]"
       >
         <Plus className="h-4 w-4 mr-2" />
         New Order
       </Button>
     </div>

     {/* Metrics */}
     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
       {METRIC_CARDS.map((metric) => (
         <Card key={metric.title}>
           <CardContent className="p-6">
             <div className="flex justify-between items-start">
               <div className="space-y-2">
                 <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                 <div className="space-y-1">
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
               </div>
               <div className="p-2 bg-primary/10 rounded-lg">
                 <metric.icon className="h-5 w-5 text-primary" />
               </div>
             </div>
           </CardContent>
         </Card>
       ))}
     </div>

     {/* Filters */}
     <Card>
       <CardHeader>
        <div className='mb-1'>
         <h3 className="font-medium">Filter Orders</h3>
         <p className="text-sm text-muted-foreground">
           Search and filter through purchase orders
         </p>
         </div>
       </CardHeader>
       <CardContent className="p-0">
         <div className="flex gap-4">
           <div className="relative mt-3 flex-1">
             <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
             <Input 
               placeholder="Search orders..." 
               className="pl-9"
               value={filters.search}
               onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
             />
           </div>
           <InputSelect
             name="status"
             label=""
             value={filters.status}
             onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
             options={[
               { value: "all", label: "All Status" },
               { value: "CONFIRMED", label: "Confirmed" },
               { value: "IN_TRANSIT", label: "In Transit" },
               { value: "DELIVERED", label: "Delivered" }
             ]}
           />
           <InputSelect
             name="payment"
             label=""
             value={filters.payment}
             onChange={(e) => setFilters(prev => ({ ...prev, payment: e.target.value }))}
             options={[
               { value: "all", label: "All Payments" },
               { value: "PAID", label: "Paid" },
               { value: "PENDING", label: "Pending" }
             ]}
           />
         </div>
       </CardContent>
     </Card>

     {/* Orders List */}
     <Card>
       <CardContent className="p-0">
         <Table>
           <TableHeader>
             <TableRow>
               <TableHead>Order ID</TableHead>
               <TableHead>Date</TableHead>
               <TableHead>Vendor</TableHead>
               <TableHead>Items</TableHead>
               <TableHead>Value</TableHead>
               <TableHead>Status</TableHead>
               <TableHead>Payment</TableHead>
               <TableHead className="text-right">Actions</TableHead>
             </TableRow>
           </TableHeader>
           <TableBody>
             {loading ? (
               <TableRow>
                 <TableCell colSpan={8} className="text-center py-4">Loading...</TableCell>
               </TableRow>
             ) : orders.length === 0 ? (
               <TableRow>
                 <TableCell colSpan={8} className="text-center py-8">
                   <div className="text-4xl mb-4">📦</div>
                   <h3 className="text-lg font-medium">No orders found</h3>
                   <p className="text-sm text-muted-foreground mt-1">
                     Start by creating your first purchase order
                   </p>
                   <Button 
                     className="mt-4 bg-[#5FC4D0]"
                     onClick={() => setShowAddModal(true)}
                   >
                     <Plus className="h-4 w-4 mr-2" />
                     New Order
                   </Button>
                 </TableCell>
               </TableRow>
             ) : orders.map((order) => (
               <TableRow key={order.id}>
                 <TableCell className="font-medium">{order.number}</TableCell>
                 <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                 <TableCell>{order.vendor.name}</TableCell>
                 <TableCell>{order.items.length} items</TableCell>
                 <TableCell>€{order.totalValue.toLocaleString()}</TableCell>
                 <TableCell>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                  {order.paymentStatus}
                </Badge>
              </TableCell>
                 <TableCell>
                   <div className="flex justify-end gap-2">
                     <DropdownMenu>
                       <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon">
                           <MoreHorizontal className="h-4 w-4" />
                         </Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="end">
                         <DropdownMenuItem>
                           <ExternalLink className="h-4 w-4 mr-2" />
                           View Details
                         </DropdownMenuItem>
                         <DropdownMenuItem>
                           <History className="h-4 w-4 mr-2" />
                           Track Order
                         </DropdownMenuItem>
                         <DropdownMenuItem>
                           <Receipt className="h-4 w-4 mr-2" />
                           View Invoice
                         </DropdownMenuItem>
                         <DropdownMenuSeparator />
                         <DropdownMenuItem 
                           className="text-red-600"
                           onClick={() => {
                             setSelectedOrder(order);
                             setShowDeleteModal(true);
                           }}
                         >
                           <Trash2 className="h-4 w-4 mr-2" />
                           Delete Order
                         </DropdownMenuItem>
                       </DropdownMenuContent>
                     </DropdownMenu>
                   </div>
                 </TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
       </CardContent>
     </Card>

     <AddPurchaseOrderModal
       isOpen={showAddModal}
       onClose={() => setShowAddModal(false)}
       onSuccess={fetchOrders}
     />

    <DeletePurchaseOrderModal
      isOpen={showDeleteModal}
      onClose={() => setShowDeleteModal(false)}
      onConfirm={handleDelete}
      orderNumber={selectedOrder?.number}
    />
   </div>
 );
}