"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import InputSelect from "@/components/Common/InputSelect";
import {
 Users,
 Search,
 Plus,
 Building2,
 MoreVertical,
 ShoppingCart,
 ArrowUpRight,
 ArrowDownRight,
 Mail,
 Phone,
 FileSpreadsheet,
 CreditCard,
 Clock,
 StarIcon,
 History,
 FileText,
 MapPin,
 Trash2,
} from "lucide-react";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'react-hot-toast';
import { useClient } from '@/hooks/useClient';
import { AddVendorModal } from './modals/add-vendor-modal';
import { DeleteVendorModal } from './modals/delete-vendor-modal';

interface Vendor {
  id: string;
  name: string;
  type: string;
  status: string;
  rating: number;
  email: string;
  phone: string;
  address: string;
  performance: {
    onTimeDelivery: number;
    qualityRating: number;
    responseTime: number;
  };
  financials: {
    totalSpent: number;
    outstandingPayments: number;
  };
  paymentTerms: string;
  lastOrder: string;
}

const getStatusBadge = (status: string) => {
 const variants = {
   'ACTIVE': 'bg-green-100 text-green-800',
   'ON_HOLD': 'bg-yellow-100 text-yellow-800',
   'INACTIVE': 'bg-red-100 text-red-800'
 };
 return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
};

const getRatingColor = (rating: number) => {
 if (rating >= 4.5) return 'text-green-500';
 if (rating >= 4.0) return 'text-blue-500';
 if (rating >= 3.0) return 'text-yellow-500';
 return 'text-red-500';
};

interface VendorMetrics {
  activeVendors: number;
  activeVendorsChange: number;
  activeVendorsTrend: 'up' | 'down';
  totalOrders: number;
  totalOrdersChange: number;
  totalOrdersTrend: 'up' | 'down';
  pendingPayments: number;
  pendingPaymentsChange: number;
  pendingPaymentsTrend: 'up' | 'down';
  averageLeadTime: number;
  averageLeadTimeChange: number;
  averageLeadTimeTrend: 'up' | 'down';
}

export function VendorsContent() {
 const [vendors, setVendors] = useState<Vendor[]>([]);
 const [loading, setLoading] = useState(true);
 const [page, setPage] = useState(1);
 const [pageSize, setPageSize] = useState(10);
 const [total, setTotal] = useState(0);
 const [filters, setFilters] = useState({
   search: '',
   type: 'all',
   status: 'all'
 });

 const { clientId } = useClient(); 
 
 useEffect(() => {
  if (clientId) {
    fetchVendors();
  }
}, [page, pageSize, filters, clientId]);

const fetchVendors = useCallback(async () => {
  try {
    setLoading(true);
    const searchParams: Record<string, string> = {
      page: page.toString(),
      pageSize: pageSize.toString(),
      clientId,
      search: filters.search,
      type: filters.type,
      status: filters.status
    };
    
    const params = new URLSearchParams(searchParams);
    
    const res = await fetch(`/api/vendors?${params}`);
    const data = await res.json();
    
    if (!res.ok) throw new Error(data.error || 'Failed to fetch vendors');
    
    setVendors(data.items);
    setTotal(data.total);
    setMetrics(data.metrics);
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('Failed to fetch vendors');
    }
  } finally {
    setLoading(false);
  }
}, [clientId, page, pageSize, filters]);


const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);

const handleDelete = async () => {
  try {
    await fetch(`/api/vendors?id=${selectedVendor?.id}`, { method: 'DELETE' });
    toast.success('Vendor deleted');
    fetchVendors();
  } catch {
    toast.error('Failed to delete vendor');
  }
  setShowDeleteModal(false);
};

 const handleSearch = debounce((value: string) => {
   setFilters(prev => ({ ...prev, search: value }));
   setPage(1);
 }, 300);

 const handleFilterChange = (key: string, value: string) => {
   setFilters(prev => ({ ...prev, [key]: value }));
   setPage(1);
 };

 const totalPages = Math.ceil(total / pageSize);

 const [metrics, setMetrics] = useState<VendorMetrics>({
  activeVendors: 0,
  activeVendorsChange: 0,
  activeVendorsTrend: 'up',
  totalOrders: 0,
  totalOrdersChange: 0,
  totalOrdersTrend: 'up',
  pendingPayments: 0,
  pendingPaymentsChange: 0,
  pendingPaymentsTrend: 'up',
  averageLeadTime: 0,
  averageLeadTimeChange: 0,
  averageLeadTimeTrend: 'up'
});


const [showAddModal, setShowAddModal] = useState(false);


const METRIC_CARDS = [
  {
    title: "Active Vendors",
    value: metrics.activeVendors,
    change: metrics.activeVendorsChange > 0 ? `+${metrics.activeVendorsChange}` : `${metrics.activeVendorsChange}`,
    trend: metrics.activeVendorsTrend,
    period: "this month",
    icon: Users
  },
  {
    title: "Total Orders",
    value: metrics.totalOrders,
    change: `${(metrics.totalOrdersChange || 0).toFixed(1)}%`,
    trend: metrics.totalOrdersTrend,
    period: "vs last month",
    icon: ShoppingCart
  },
  {
    title: "Pending Payments",
    value: `€${metrics.pendingPayments.toLocaleString()}`,
    change: `${(metrics.pendingPaymentsChange || 0).toFixed(1)}%`,
    trend: metrics.pendingPaymentsTrend,
    period: "vs last month",
    icon: CreditCard
  },
  {
    title: "Average Lead Time", 
    value: `${metrics.averageLeadTime} days`,
    change: `${metrics.averageLeadTimeChange} days`,
    trend: metrics.averageLeadTimeTrend,
    period: "this month",
    icon: Clock
  }
];

 return (
   <div className="space-y-6">
     {/* Header */}
     <div className="flex justify-between items-start">
       <div>
         <h1 className="text-2xl font-bold tracking-tight">Vendors</h1>
         <p className="text-sm text-muted-foreground mt-2">
           Manage suppliers and procurement relationships
         </p>
       </div>
       <div className="flex gap-2">
         <Button variant="outline">
           <FileSpreadsheet className="h-4 w-4 mr-2" />
           Export
         </Button>
         <Button onClick={() => setShowAddModal(true)} style={{ backgroundColor: "#5FC4D0" }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
       </div>
     </div>

     {/* Metrics */}
     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
       {METRIC_CARDS.map((metric) => (
         <Card key={metric.title}>
           <CardContent className="p-2">
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
         <div className="mb-1">
           <h3 className="font-medium">Filter Vendors</h3>
           <p className="text-sm text-muted-foreground">
             Search and filter through your supplier base
           </p>
         </div>
       </CardHeader>
       <CardContent className="p-0 pt-0">
         <div className="flex flex-col sm:flex-row gap-4">
           <div className="flex items-center flex-1 gap-2 w-full">
             <div className="relative mt-2 flex-1">
               <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
               <Input 
                 placeholder="Search by name, email, or ID..." 
                 className="pl-9 w-full"
                 onChange={(e) => handleSearch(e.target.value)}
                 value={filters.search}
               />
             </div>
             <InputSelect
               name="type"
               label=""
               value={filters.type}
               onChange={(e) => handleFilterChange('type', e.target.value)}
               options={[
                 { value: "all", label: "All Types" },
                 { value: "MANUFACTURER", label: "Manufacturer" },
                 { value: "DISTRIBUTOR", label: "Distributor" },
                 { value: "WHOLESALER", label: "Wholesaler" },
                 { value: "OTHER", label: "Other" }
               ]}
             />
             <InputSelect
               name="status"
               label=""
               value={filters.status}
               onChange={(e) => handleFilterChange('status', e.target.value)}
               options={[
                 { value: "all", label: "All Status" },
                 { value: "active", label: "Active" },
                 { value: "on_hold", label: "On Hold" },
                 { value: "inactive", label: "Inactive" }
               ]}
             />
           </div>
         </div>
       </CardContent>
     </Card>

     {/* Vendors List */}
     <div className="space-y-4">
        {loading ? (
          <div className="text-center py-4">Loading...</div>
          ) : vendors.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-lg font-medium">No vendors found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Start by adding your first vendor
            </p>
            <Button 
              className="mt-4"
              style={{ backgroundColor: "#5FC4D0" }}
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Vendor
            </Button>
          </div>
          ) : vendors.map((vendor) => (
         <Card key={vendor.id} className="hover:bg-accent/5 transition-colors">
           <CardContent className="p-2">
             <div className="flex flex-col lg:flex-row gap-6">
               {/* Left Column - Basic Info */}
               <div className="flex-1">
                 <div className="flex items-start justify-between">
                   <div className="space-y-1">
                     <div className="flex items-center gap-2">
                       <h3 className="font-semibold text-lg">{vendor.name}</h3>
                       <Badge variant="outline">{vendor.type}</Badge>
                       <Badge className={getStatusBadge(vendor.status)}>
                         {vendor.status}
                       </Badge>
                     </div>
                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                       <div className="flex items-center gap-1">
                         <Building2 className="h-4 w-4" />
                         ID: {vendor.id}
                       </div>
                       <span>•</span>
                       <div className="flex items-center gap-1">
                         <StarIcon className={`h-4 w-4 ${getRatingColor(vendor.rating)}`} />
                         {vendor.rating}
                       </div>
                     </div>
                     <div className="flex flex-col gap-1 mt-2">
                       <div className="flex items-center text-sm">
                         <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                         {vendor.email}
                       </div>
                       <div className="flex items-center text-sm">
                         <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                         {vendor.phone}
                       </div>
                       <div className="flex items-center text-sm">
                         <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                         {vendor.address}
                       </div>
                     </div>
                   </div>
                   <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                       <Button variant="ghost" size="icon">
                         <MoreVertical className="h-4 w-4" />
                       </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end">
                       <DropdownMenuItem>
                         <ShoppingCart className="h-4 w-4 mr-2" />
                         Place Order
                       </DropdownMenuItem>
                       <DropdownMenuItem>
                         <History className="h-4 w-4 mr-2" />
                         Order History
                       </DropdownMenuItem>
                       <DropdownMenuSeparator />
                       <DropdownMenuItem>
                         <FileText className="h-4 w-4 mr-2" />
                         View Documents
                       </DropdownMenuItem>
                       <DropdownMenuItem onClick={() => {
                          setSelectedVendor(vendor);
                          setShowDeleteModal(true);
                        }}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                   </DropdownMenu>
                 </div>
               </div>

               {/* Center Column - Performance */}
               <div className="flex-1">
                 <div className="space-y-4">
                   <div>
                     <div className="flex justify-between text-sm mb-1">
                       <span className="text-muted-foreground">On-Time Delivery</span>
                       <span className="font-medium">{vendor.performance?.onTimeDelivery}%</span>
                     </div>
                     <Progress value={vendor.performance?.onTimeDelivery} className="h-2" />
                   </div>
                   <div>
                     <div className="flex justify-between text-sm mb-1">
                       <span className="text-muted-foreground">Quality Rating</span>
                       <span className="font-medium">{vendor.performance?.qualityRating}%</span>
                     </div>
                     <Progress value={vendor.performance?.qualityRating} className="h-2" />
                   </div>
                   <div>
                     <div className="flex justify-between text-sm mb-1">
                       <span className="text-muted-foreground">Response Time</span>
                       <span className="font-medium">{vendor.performance?.responseTime}%</span>
                     </div>
                     <Progress value={vendor.performance?.responseTime} className="h-2" />
                   </div>
                 </div>
               </div>

               {/* Right Column - Financials */}
               <div className="w-48">
                 <div className="space-y-4">
                   <div>
                     <p className="text-sm text-muted-foreground">Total Spent</p>
                     <p className="text-lg font-semibold mt-1">
                       €{vendor.financials?.totalSpent.toLocaleString()}
                     </p>
                   </div>
                   <div>
                     <p className="text-sm text-muted-foreground">Outstanding</p>
                     <p className={`text-sm font-medium mt-1 ${
                       vendor.financials?.outstandingPayments > 0 ? 'text-yellow-600' : 'text-green-600'
                     }`}>
                       €{vendor.financials?.outstandingPayments.toLocaleString()}
                     </p>
                   </div>
                   <div className="flex justify-between items-center">
                     <div className="text-sm">
                       <span className="text-muted-foreground">Terms: </span>
                       <span className="font-medium">{vendor.paymentTerms}</span>
                     </div>
                   </div>
                   <div>
                     <p className="text-sm text-muted-foreground">Last Order</p>
                     <p className="text-sm mt-1">
                       {new Date(vendor.lastOrder).toLocaleDateString()}
                       </p>
                   </div>
                 </div>
               </div>
             </div>
           </CardContent>
         </Card>
       ))}
     </div>

     {/* Pagination */}
     <div className="border-t px-4 py-4 flex items-center justify-between bg-white">
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
     <AddVendorModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={fetchVendors}
      />

      <DeleteVendorModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        vendorName={selectedVendor?.name || ''}
      />
   </div>
 );
}

export default VendorsContent;