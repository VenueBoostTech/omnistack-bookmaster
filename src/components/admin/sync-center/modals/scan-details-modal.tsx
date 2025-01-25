import { TableBody, TableCell } from "@/components/ui/table";

// src/components/admin/sync-center/modals/scan-details-modal.tsx
import { DialogTitle, Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Table, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const scanHistory = [
  {
    time: "10:23 AM",
    product: "Nike Air Max",
    location: "Warehouse A-12",
    status: "success"
  },
  {
    time: "10:21 AM", 
    product: "Adidas Ultra Boost",
    location: "Warehouse B-03",
    status: "success"
  },
  {
    time: "10:18 AM",
    product: "Puma RS-X",
    location: "Warehouse A-15",
    status: "error"
  },
  {
    time: "10:15 AM",
    product: "Nike Zoom",
    location: "Warehouse C-21",
    status: "success"
  }
 ];
 

 export function ScanDetailsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Scanner Details</DialogTitle>
        </DialogHeader>
        
        <div className="mt-0">
          <div className="grid grid-cols-2 gap-8 p-6 rounded-lg mb-6 bg-gradient-to-r from-blue-50 to-blue-100/50">
            <div>
              <h4 className="text-sm font-medium text-gray-600">Today's Scans</h4>
              <div className="flex items-baseline mt-2">
                <p className="text-4xl font-bold text-gray-900">156</p>
                <span className="ml-2 text-sm text-green-600">+12% today</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-600">Active Scanners</h4>
              <div className="flex items-baseline mt-2">
                <p className="text-4xl font-bold text-gray-900">3</p>
                <span className="ml-2 text-sm text-gray-500">devices</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="py-3">Time</TableHead>
                  <TableHead className="py-3">Product</TableHead>
                  <TableHead className="py-3">Location</TableHead>
                  <TableHead className="py-3">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scanHistory.map((scan, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="py-2.5">{scan.time}</TableCell>
                    <TableCell className="py-2.5 font-medium">{scan.product}</TableCell>
                    <TableCell className="py-2.5">{scan.location}</TableCell>
                    <TableCell className="py-2.5">
                      <Badge 
                        variant={scan.status === 'success' ? 'default' : 'destructive'}
                        className="capitalize"
                      >
                        {scan.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}