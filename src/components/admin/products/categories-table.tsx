import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Trash2,
  ChevronDown,
  ChevronRight,
  FolderPlus,
  Package,
} from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function CategoriesTable({ categories }: { categories: any[] }) {
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  
    const toggleExpand = (categoryId: string) => {
      setExpandedCategories(prev =>
        prev.includes(categoryId)
          ? prev.filter(id => id !== categoryId)
          : [...prev, categoryId]
      );
    };
  
    return (
        <Card>
            <CardContent className="p-0">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[300px]">Category</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Alerts</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.map((category) => (
                <React.Fragment key={category.id}>
                    <TableRow>
                    <TableCell>
                        <div className="flex items-center space-x-2">
                        {category.subcategories.length > 0 && (
                            <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => toggleExpand(category.id)}
                            >
                            {expandedCategories.includes(category.id) 
                                ? <ChevronDown className="h-4 w-4" />
                                : <ChevronRight className="h-4 w-4" />
                            }
                            </Button>
                        )}
                        <div className="font-medium">{category.name}</div>
                        </div>
                    </TableCell>
                    <TableCell><Badge variant="outline">{category.code}</Badge></TableCell>
                    <TableCell>{category.products}</TableCell>
                    <TableCell>€{category.value.toLocaleString()}</TableCell>
                    <TableCell>
                        {category.active && (
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                        )}
                    </TableCell>
                    <TableCell>
                        {category.stockAlert > 0 && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            {category.stockAlert} alerts
                        </Badge>
                        )}
                    </TableCell>
                    <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                            <FolderPlus className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Edit3 className="h-4 w-4 mr-2" />
                                Edit Category
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Package className="h-4 w-4 mr-2" />
                                View Products
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Category
                            </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </div>
                    </TableCell>
                    </TableRow>
                    {expandedCategories.includes(category.id) && category.subcategories.map((sub: any) => (
                    <TableRow key={sub.id} className="bg-muted/50">
                        <TableCell>
                        <div className="flex items-center">
                            <div className="ml-8 font-medium">{sub.name}</div>
                        </div>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell>{sub.products}</TableCell>
                        <TableCell>€{sub.value.toLocaleString()}</TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                        {sub.stockAlert > 0 && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            {sub.stockAlert} alerts
                            </Badge>
                        )}
                        </TableCell>
                        <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </React.Fragment>
                ))}
            </TableBody>
            </Table>
            </CardContent>
        </Card>
    );
  }