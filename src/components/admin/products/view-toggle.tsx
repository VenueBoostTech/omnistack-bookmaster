import { Button } from "@/components/ui/button";
import { LayoutGrid, LayoutList } from "lucide-react";

interface ViewToggleProps {
  view: 'grid' | 'table';
  onViewChange: (view: 'grid' | 'table') => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center space-x-2 bg-secondary rounded-md p-1">
      <Button
        variant={view === 'grid' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('grid')}
        className={`
          ${view === 'grid' 
            ? 'bg-background text-foreground' 
            : 'text-white hover:text-white hover:bg-white/10'
          }
        `}
      >
        <LayoutGrid className="h-4 w-4 mr-2" />
        Grid
      </Button>
      <Button
        variant={view === 'table' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('table')}
        className={`
          ${view === 'table' 
            ? 'bg-background text-foreground' 
            : 'text-white hover:text-white hover:bg-white/10'
          }
        `}
      >
        <LayoutList className="h-4 w-4 mr-2" />
        Table
      </Button>
    </div>
  );
}