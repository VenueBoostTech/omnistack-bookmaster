import { Brand } from "@/app/api/external/omnigateway/types";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function BrandApiStatus({ brand }: { brand: Brand }) {
    if (!brand.apiConfig) {
        return (
            <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-muted-foreground">
                    Not Connected
                </Badge>
                <Tooltip>
                    <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>No API configuration found for this brand</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                    <Badge variant="success" className="bg-green-600">
                        Connected
                    </Badge>
                    {brand.apiConfig.lastSyncStatus === 'FAILED' && (
                        <Badge variant="destructive" className="bg-red-600">
                            Sync Failed
                        </Badge>
                    )}
                </div>
            </div>

            {brand.lastSync && (
                <div className="text-sm text-muted-foreground">
                    Last synced: {format(new Date(brand.lastSync), 'PP')}
                </div>
            )}
        </div>
    );
}