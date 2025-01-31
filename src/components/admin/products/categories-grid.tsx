import { Card, CardContent } from "@/components/ui/card";
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
  Package,
  ChevronRight,
  FolderPlus,
} from "lucide-react";
import React  from "react";

export function CategoriesGrid({ categories }: { categories: any[] }) {
  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <Card key={category.id}>
          <CardContent className="p-0">
            {/* Main Category */}
            <div className="p-6 hover:bg-accent/5 transition-colors">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Basic Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{category.name}</h3>
                        <Badge variant="outline">{category.code}</Badge>
                        {category.active && (
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FolderPlus className="h-4 w-4 mr-2" />
                        Add Subcategory
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
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
                  </div>
                </div>

                {/* Right Column - Stats */}
                <div className="flex gap-8 items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Products</p>
                    <p className="text-lg font-semibold mt-1">{category.products}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-lg font-semibold mt-1">€{category.value.toLocaleString()}</p>
                  </div>
                  {category.stockAlert > 0 && (
                    <div>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        {category.stockAlert} alerts
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Subcategories */}
            {category.subcategories.length > 0 && (
              <div className="border-t">
                {category.subcategories.map((sub) => (
                  <div 
                    key={sub.id}
                    className="p-4 pl-12 hover:bg-accent/5 transition-colors border-b last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{sub.name}</h4>
                        {sub.stockAlert > 0 && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            {sub.stockAlert} alerts
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Products: </span>
                            <span className="font-medium">{sub.products}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Value: </span>
                            <span className="font-medium">€{sub.value.toLocaleString()}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}