import { cn } from "@/lib/utils";

type BadgeVariant = "error" | "warning" | "info" | "success";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  size?: BadgeSize;
}

const variantMap: Record<BadgeVariant, string> = {
  error:   "bg-red-500/10 text-red-400 border-red-500/20",
  warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  info:    "bg-sky-500/10 text-sky-400 border-sky-500/20",
  success: "bg-green-500/10 text-green-400 border-green-500/20",
};

export default function Badge({ variant, children, size = "sm" }: BadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center font-bold border rounded-full",
      variantMap[variant],
      size === "sm" ? "text-[9px] px-1.5 py-0.5" : "text-[11px] px-2 py-1"
    )}>
      {children}
    </span>
  );
}
