import { Brand } from "@/app/api/external/omnigateway/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useBrands } from "@/hooks/useBrands";

function SyncButton({ brand }: { brand: Brand }) {
    const [isSyncing, setIsSyncing] = useState(false);
    const { toast } = useToast();
    const { syncBrandProducts } = useBrands();

    const handleSync = async () => {
        if (!brand.apiConfig) return;
        
        try {
            setIsSyncing(true);
            await syncBrandProducts(brand.id);
            toast({
                title: "Success",
                description: "Product synchronization started",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to start synchronization",
                variant: "destructive",
            });
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <Button
            onClick={handleSync}
            disabled={isSyncing || !brand.apiConfig}
            variant="outline"
            size="sm"
            className={cn(
                "relative",
                isSyncing && "cursor-not-allowed opacity-50"
            )}
        >
            <RefreshCcw className={cn(
                "h-4 w-4 mr-2",
                isSyncing && "animate-spin"
            )} />
            {isSyncing ? "Syncing..." : "Sync Products"}
        </Button>
    );
}

export default SyncButton;