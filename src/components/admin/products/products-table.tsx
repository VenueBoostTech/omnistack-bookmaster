import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
import { Card, CardContent } from "@/components/ui/card";

const getStatusBadge = (status: string) => {
    const variants = {
      'Active': 'bg-green-100 text-green-800',
      'Low Stock': 'bg-yellow-100 text-yellow-800',
      'Overstock': 'bg-blue-100 text-blue-800',
      'Inactive': 'bg-gray-100 text-gray-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

export function ProductsTable({ products }: { products: any[] }) {
  return (
     <Card>
        <CardContent className="p-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Locations</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-muted-foreground">{product.sku}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Boxes className="h-4 w-4 text-muted-foreground" />
                  {product.category}
                </div>
              </TableCell>
              <TableCell>
                <div className="w-[160px] space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>{product.stock.total} units</span>
                    <span>{Math.round((product.stock.total / product.stock.maximum) * 100)}%</span>
                  </div>
                  <Progress
                    value={(product.stock.total / product.stock.maximum) * 100}
                    className={
                      product.stock.total <= product.stock.minimum
                        ? 'bg-yellow-500'
                        : product.stock.total > product.stock.maximum
                        ? 'bg-blue-500'
                        : 'bg-green-500'
                    }
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {product.locations.map((location: string) => (
                    <Badge key={location} variant="secondary" className="text-xs">
                      {location}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div>€{product.price.toFixed(2)}</div>
                  <div className="text-sm text-green-600">
                    {(((product.price - product.cost) / product.price) * 100).toFixed(1)}% margin
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusBadge(product.status)}>{product.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
    </Card>
  );
}