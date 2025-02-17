"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import InputSelect from "@/components/Common/InputSelect";
import { toast } from 'react-hot-toast';
import { useClient } from '@/hooks/useClient';
import { AddReturnModal } from '../returns/modals/add-return-modal';
import { DeleteReturnModal } from '../returns/modals/delete-return-modal';
import {
  ArrowLeftRight,
  Search,
  Plus,
  FileSpreadsheet,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  History,
  Calendar,
  FileText,
  ExternalLink,
  Package,
  RefreshCw,
  Building2,
  Store,
  AlertCircle,
  Wallet,
  ClipboardList,
  Info,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MetricItem {
  value: number;
  change: number;
  trend: 'up' | 'down';
  period: string;
}

interface ReturnMetrics {
  activeReturns: MetricItem;
  pendingCredit: MetricItem;
  totalItems: MetricItem;
  processingTime: MetricItem;
}

interface ReturnItem {
  id: string;
  number: string;
  date: string;
  vendor: {
    name: string;
  };
  warehouse?: string;
  purchaseOrder: string;
  items: any[];
  totalValue: number;
  status: string;
  reason: string;
  creditStatus: string;
  type: string;
  notes?: string;
}

export function ReturnsContent() {
  const { clientId } = useClient();
  const [returns, setReturns] = useState<ReturnItem[]>([]);
  const [metrics, setMetrics] = useState<ReturnMetrics>({
    activeReturns: { value: 0, change: 0, trend: 'up', period: '' },
    pendingCredit: { value: 0, change: 0, trend: 'up', period: '' },
    totalItems: { value: 0, change: 0, trend: 'up', period: '' },
    processingTime: { value: 0, change: 0, trend: 'up', period: '' }
  });  
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    vendor: 'all',
    status: 'all',
    type: 'all'
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState<ReturnItem | null>(null);

  const fetchReturns = useCallback(async () => {
    if (!clientId) return;
    
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        clientId,
        search: filters.search,
        status: filters.status,
        type: filters.type
      });

      const res = await fetch(`/api/returns?${params}`);
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      setReturns(data.items);
      setTotal(data.total);
      setMetrics(data.metrics);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to fetch returns");
    } finally {
      setLoading(false);
    }
  }, [clientId, page, pageSize, filters]);

  useEffect(() => {
    fetchReturns();
  }, [fetchReturns]);

  const handleDelete = async () => {
    if (!selectedReturn) return;

    try {
      const res = await fetch(`/api/returns/${selectedReturn.id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Failed to delete return');

      toast.success('Return deleted');
      fetchReturns();
    } catch (error) {
      toast.error('Failed to delete return');
    }
    setShowDeleteModal(false);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'COMPLETED': 'bg-green-100 text-green-800',
      'APPROVED': 'bg-blue-100 text-blue-800',
      'PROCESSING': 'bg-yellow-100 text-yellow-800',
      'REJECTED': 'bg-red-100 text-red-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const getCreditStatusBadge = (status: string) => {
    const variants = {
      'RECEIVED': 'bg-green-100 text-green-800',
      'APPROVED': 'bg-blue-100 text-blue-800',
      'PENDING': 'bg-yellow-100 text-yellow-800',
      'REJECTED': 'bg-red-100 text-red-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const METRIC_CARDS = [
    {
      title: "Active Returns",
      value: metrics.activeReturns.value,
      change: metrics.activeReturns.change.toString(),
      trend: metrics.activeReturns.trend,
      period: metrics.activeReturns.period,
      icon: ArrowLeftRight
    },
    {
      title: "Pending Credit",
      value: `€${metrics.pendingCredit.value.toLocaleString()}`,
      change: `${metrics.pendingCredit.change}%`,
      trend: metrics.pendingCredit.trend,
      period: metrics.pendingCredit.period,
      icon: Wallet
    },
    {
      title: "Items Returned",
      value: metrics.totalItems.value,
      change: metrics.totalItems.change.toString(),
      trend: metrics.totalItems.trend,
      period: metrics.totalItems.period,
      icon: Package
    },
    {
      title: "Processing Time",
      value: `${metrics.processingTime.value.toFixed(1)} days`,
      change: metrics.processingTime.change.toFixed(1),
      trend: metrics.processingTime.trend,
      period: metrics.processingTime.period,
      icon: RefreshCw
    }
  ];

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Supplier Returns</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage return requests and supplier credits
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            onClick={() => setShowAddModal(true)}
            style={{ backgroundColor: "#5FC4D0" }}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Return
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
            <h3 className="font-medium">Filter Returns</h3>
            <p className="text-sm text-muted-foreground">
              Search and filter through return requests
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-0 pt-0">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center flex-1 gap-2 w-full">
              <div className="relative mt-2 flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search returns by ID, vendor, or reason..." 
                  className="pl-9 w-full"
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
                  { value: "PROCESSING", label: "Processing" },
                  { value: "APPROVED", label: "Approved" },
                  { value: "COMPLETED", label: "Completed" }
                ]}
              />
              <InputSelect
                name="type"
                label=""
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                options={[
                  { value: "all", label: "All Types" },
                  { value: "QUALITY_ISSUE", label: "Quality Issue" },
                  { value: "SHIPPING_DAMAGE", label: "Shipping Damage" },
                  { value: "ORDER_ERROR", label: "Order Error" }
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Returns List */}
      <div className="space-y-4">
        {loading ? (
          <Card>
            <CardContent className="p-6 text-center">Loading...</CardContent>
          </Card>
        ) : returns.length === 0 ? (
          <Card>
            <CardContent className="p-2">
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📦</div>
                <h3 className="text-lg font-medium">No returns found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Start by creating your first return request
                </p>
                <Button 
                  className="mt-4"
                  style={{ backgroundColor: "#5FC4D0" }}
                  onClick={() => setShowAddModal(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Return
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          returns.map((returnItem) => (
            <Card key={returnItem.id} className="hover:bg-accent/5 transition-colors">
              <CardContent className="p-2">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Column - Basic Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{returnItem.number}</h3>
                          <Badge variant="outline">{returnItem.type}</Badge>
                          <Badge className={getStatusBadge(returnItem.status)}>
                            {returnItem.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {returnItem.vendor.name}
                          </div>
                          {returnItem.warehouse && (
                            <>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Store className="h-4 w-4" />
                                {returnItem.warehouse}
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <ClipboardList className="h-4 w-4" />
                            PO: {returnItem.purchaseOrder}
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
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <History className="h-4 w-4 mr-2" />
                            Track Status
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            View Documents
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setSelectedReturn(returnItem);
                              setShowDeleteModal(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Return
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Center Column - Return Details */}
                  <div className="flex-1">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>

                        <p className="text-sm text-muted-foreground">Items</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{returnItem.items.length} items</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Value</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Wallet className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">€{returnItem.totalValue.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Reason</p>
                        <div className="flex items-center gap-2 mt-1">
                          <AlertCircle className="h-4 w-4 text-muted-foreground" />
                          <span>{returnItem.reason}</span>
                        </div>
                      </div>
                      <div>
                        <Badge className={getCreditStatusBadge(returnItem.creditStatus)}>
                          Credit {returnItem.creditStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Notes & Date */}
                  <div className="w-48">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Return Date</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(returnItem.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      {returnItem.notes && (
                        <div>
                          <p className="text-sm text-muted-foreground">Notes</p>
                          <div className="flex items-start gap-2 mt-1">
                            <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                            <p className="text-sm">{returnItem.notes}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
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

      <AddReturnModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={fetchReturns}
      />

      <DeleteReturnModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        returnId={selectedReturn?.number}
      />
    </div>
  );
}

export default ReturnsContent;