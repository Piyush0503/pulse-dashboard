import { cn } from "@/lib/utils";

interface MiniBarProps {
  val: number;
  max?: number;
  color?: "blue" | "purple" | "orange";
  width?: number;
}

export default function MiniBar({ val, max = 100, color = "blue", width = 70 }: MiniBarProps) {
  const pct = Math.min((val / max) * 100, 100);
  const isHigh = pct > 80;
  const isMed = pct > 60;

  const barColor = isHigh ? "bg-red-400" : isMed ? "bg-amber-400"
    : color === "blue" ? "bg-sky-400" : color === "purple" ? "bg-indigo-400" : "bg-orange-400";

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 rounded-full bg-surface-border overflow-hidden" style={{ width }}>
        <div className={cn("h-full rounded-full transition-all duration-500", barColor)} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[11px] font-mono text-text-muted w-7">{val}%</span>
    </div>
  );
}
