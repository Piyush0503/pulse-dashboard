"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  sub?: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "red" | "purple" | "amber" | "orange";
  animKey?: number;
}

const colorConfig = {
  blue:   { bg: "bg-sky-400/10",    border: "border-sky-400/20",    text: "text-sky-400",    glow: "shadow-glow-blue",   accent: "#38bdf8" },
  green:  { bg: "bg-emerald-400/10",border: "border-emerald-400/20",text: "text-emerald-400",glow: "shadow-glow-green",  accent: "#34d399" },
  red:    { bg: "bg-red-400/10",    border: "border-red-400/20",    text: "text-red-400",    glow: "shadow-glow-red",    accent: "#f87171" },
  purple: { bg: "bg-indigo-400/10", border: "border-indigo-400/20", text: "text-indigo-400", glow: "shadow-glow-purple", accent: "#818cf8" },
  amber:  { bg: "bg-amber-400/10",  border: "border-amber-400/20",  text: "text-amber-400",  glow: "shadow-glow-amber",  accent: "#fbbf24" },
  orange: { bg: "bg-orange-400/10", border: "border-orange-400/20", text: "text-orange-400", glow: "shadow-glow-orange", accent: "#fb923c" },
};

export default function MetricCard({ title, value, change, sub, icon, color, animKey }: MetricCardProps) {
  const c = colorConfig[color];
  const isUp = change >= 0;

  return (
    <div className={cn(
      "relative rounded-[14px] bg-surface-card border border-surface-border p-5 overflow-hidden gradient-border transition-all duration-300 group hover:border-opacity-40 cursor-default",
      c.glow
    )}>
      {/* Glow blob */}
      <div className={cn("absolute -top-5 -right-5 w-20 h-20 rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity", c.bg)} />

      <div className="flex items-start justify-between mb-4 relative">
        <div className={cn("w-9 h-9 rounded-[9px] flex items-center justify-center border", c.bg, c.border)}>
          <div className={cn("w-4 h-4", c.text)}>{icon}</div>
        </div>
        <div className={cn(
          "flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full border",
          isUp ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
        )}>
          {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(change).toFixed(1)}%
        </div>
      </div>

      <div key={animKey} className="animate-count-up relative">
        <div className="text-[22px] font-bold font-mono tracking-tight text-text-primary leading-none mb-1.5">{value}</div>
        <div className="text-[10px] text-text-muted font-bold uppercase tracking-[0.08em]">{title}</div>
        {sub && <div className="text-[10px] text-text-dim mt-1">{sub}</div>}
      </div>
    </div>
  );
}
