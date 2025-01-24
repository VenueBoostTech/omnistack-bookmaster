import { TableBody } from "@/components/ui/table";

// src/components/admin/sync-center/modals/scan-details-modal.tsx
import { DialogTitle, Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Table, TableHeader, TableHead, TableRow } from "@/components/ui/table";

export function ScanDetailsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Scanner Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Today's Scans</h4>
                <p className="text-2xl font-bold">156</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Active Scanners</h4>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Add scan history rows */}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    );
   }