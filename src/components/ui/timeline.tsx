// src/components/ui/timeline.tsx
export const Timeline = ({ children }: { children: React.ReactNode }) => (
    <div className="relative pl-8 border-l-2 border-muted space-y-8">
      {children}
    </div>
  );
  
  export const TimelineItem = ({ children }: { children: React.ReactNode }) => (
    <div className="relative">{children}</div>
  );