import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/src/lib/utils";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-surface/80 backdrop-blur-md border border-white/5 rounded-sm p-6 shadow-lg transition-all duration-300 soft-ease",
        className
      )}
      {...props}
    />
  )
);

Card.displayName = "Card";
export { Card };