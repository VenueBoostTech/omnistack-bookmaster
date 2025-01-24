import { Badge } from "@/components/ui/badge";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timeline } from "@/components/ui/timeline";
import { DialogContent } from "@radix-ui/react-dialog";

const StatusBadge = ({ status }: { status: string }) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      in_progress: 'bg-blue-100 text-blue-800',
      error: 'bg-red-100 text-red-800'
    };
   
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.replace('_', ' ')}
      </Badge>
    );
   };
   
// src/components/admin/sync-center/modals/activity-details-modal.tsx
export function ActivityDetailsModal({ isOpen, onClose, activity }: { isOpen: boolean; onClose: () => void; activity: any }) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Activity Details</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="errors">Errors</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Type</h4>
                    <p>{activity?.type}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Status</h4>
                    <StatusBadge status={activity?.status} />
                  </div>
                </div>
                <Timeline events={activity?.timeline} />
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
   }