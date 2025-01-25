import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Timeline } from "@/components/ui/timeline";

const StatusBadge = ({ status }: { status: string }) => {
  const variants = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    in_progress: "bg-blue-100 text-blue-800",
    error: "bg-red-100 text-red-800",
  };

  return (
    <Badge className={variants[status as keyof typeof variants]}>
      {status.replace("_", " ")}
    </Badge>
  );
};

// Dummy data for tables
const dummyProducts = [
  { id: "P001", name: "Product A", quantity: 10, price: "$20.00" },
  { id: "P002", name: "Product B", quantity: 5, price: "$15.00" },
  { id: "P003", name: "Product C", quantity: 8, price: "$12.00" },
];

const dummyErrors = [
  { id: "E001", message: "Invalid barcode format" },
  { id: "E002", message: "Missing product name" },
];

export function ActivityDetailsModal({
  isOpen,
  onClose,
  activity,
}: {
  isOpen: boolean;
  onClose: () => void;
  activity: any;
}) {
  if (!activity) return null; // Ensure modal is not rendered if no activity is provided.

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Activity Details</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-3">
          <TabsList className="flex justify-start space-x-4">
            <TabsTrigger value="overview" className="px-4 py-2">
              Overview
            </TabsTrigger>
            <TabsTrigger value="products" className="px-4 py-2">
              Products
            </TabsTrigger>
            <TabsTrigger value="errors" className="px-4 py-2">
              Errors
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-2">
  {/* Summary Section */}
  <div className="grid grid-cols-2 gap-6 p-4">
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">Type</h4>
      <p className="text-base text-gray-900">{activity?.type || "N/A"}</p>
    </div>
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">Status</h4>
      <StatusBadge status={activity?.status || "N/A"} />
    </div>
  </div>

  {/* Activity Timeline Section */}
  <div className="mt-2 p-4">
    <h4 className="text-sm font-medium text-gray-700 mb-4">Activity Timeline</h4>
    {activity?.timeline?.length > 0 ? (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activity.timeline.map((event: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{new Date(event.date).toLocaleString()}</TableCell>
                <TableCell>{event.event}</TableCell>
                <TableCell>{event.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    ) : (
      <div className="p-4 text-gray-500 text-sm rounded-md border border-dashed">
        No timeline events available
      </div>
    )}
  </div>
</TabsContent>


          {/* Products Tab */}
          <TabsContent value="products" className="mt-4 mb-2">
            {dummyProducts.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-gray-500">No products found</p>
            )}
          </TabsContent>

          {/* Errors Tab */}
          <TabsContent value="errors" className="mt-4 mb-2">
            
            {dummyErrors.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Error ID</TableHead>
                      <TableHead>Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyErrors.map((error) => (
                      <TableRow key={error.id}>
                        <TableCell>{error.id}</TableCell>
                        <TableCell>{error.message}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-gray-500">No errors found</p>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
