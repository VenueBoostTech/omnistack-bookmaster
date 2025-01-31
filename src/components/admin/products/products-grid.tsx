import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Edit3,
  Copy,
  ExternalLink,
  Trash2,
  Boxes,
} from "lucide-react";
import React, { useState } from "react";

const getStatusBadge = (status: string) => {
  const variants = {
    'Active': 'bg-green-100 text-green-800',
    'Low Stock': 'bg-yellow-100 text-yellow-800',
    'Overstock': 'bg-blue-100 text-blue-800',
    'Inactive': 'bg-gray-100 text-gray-800'
  };
  return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
};

export function ProductsGrid({ products }: { products: any[] }) {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Card key={product.id} className="hover:bg-accent/5 transition-colors">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Column - Product Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <Badge variant="outline">{product.sku}</Badge>
                      <Badge className={getStatusBadge(product.status)}>
                        {product.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Boxes className="h-4 w-4" />
                      {product.category}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {product.description}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View History
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Product
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Center Column - Stock Info */}
              <div className="flex-1">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Stock Level</span>
                      <span className="font-medium">{product.stock.total} units</span>
                    </div>
                    <Progress 
                      value={(product.stock.total / product.stock.maximum) * 100}
                      className={`h-2 ${
                        product.stock.total <= product.stock.minimum ? 'bg-yellow-500' :
                        product.stock.total > product.stock.maximum ? 'bg-blue-500' :
                        'bg-green-500'
                      }`}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Min: {product.stock.minimum}</span>
                      <span>Max: {product.stock.maximum}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.locations.map((location: string) => (
                      <Badge key={location} variant="secondary">
                        {location}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Pricing */}
              <div className="w-48">
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Selling Price</p>
                    <p className="text-lg font-semibold">€{product.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cost Price</p>
                    <p className="text-sm">€{product.cost.toFixed(2)}</p>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">Margin</p>
                    <p className="text-sm font-medium text-green-600">
                      {(((product.price - product.cost) / product.price) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}