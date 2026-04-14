import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: "blue" | "green" | "red" | "purple" | "amber" | "orange";
}

const glowMap = {
  blue:   "shadow-glow-blue",
  green:  "shadow-glow-green",
  red:    "shadow-glow-red",
  purple: "shadow-glow-purple",
  amber:  "shadow-glow-amber",
  orange: "shadow-glow-orange",
};

export default function Card({ children, className, glow }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface-card border border-surface-border rounded-[14px] p-5 relative overflow-hidden gradient-border",
        glow && glowMap[glow],
        className
      )}
    >
      {children}
    </div>
  );
}
