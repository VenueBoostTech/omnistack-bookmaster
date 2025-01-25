import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface ProgressData {
  processed: number;
  total: number;
  successful: number;
  failed: number;
  percentage: number;
}


// src/components/admin/sync-center/modals/import-progress-modal.tsx
export function ImportProgressModal({
  isOpen,
  onClose,
  progress,
}: {
  isOpen: boolean;
  onClose: () => void;
  progress: ProgressData | null;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Progress</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {progress ? (
            <>
              <div>
                <Progress value={progress.percentage} />
                <p className="text-sm text-center mt-2">
                  {progress.processed} of {progress.total} products
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Successful</span>
                  <span className="text-green-600">{progress.successful}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Failed</span>
                  <span className="text-red-600">{progress.failed}</span>
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No data available.</p>
          )}
          <Button variant="outline" className="w-full" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
