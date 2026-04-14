"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, RefreshCw } from "lucide-react";
import { useClock } from "@/hooks/useClock";
import { useState } from "react";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard/overview":       "System Overview",
  "/dashboard/metrics":        "Live Metrics",
  "/dashboard/infrastructure": "Infrastructure",
  "/dashboard/analytics":      "Analytics",
  "/dashboard/alerts":         "Alerts & Events",
  "/dashboard/users":          "User Panel",
  "/dashboard/admin":          "Admin Panel",
  "/dashboard/security":       "Security Center",
  "/dashboard/settings":       "Settings",
};

export default function Topbar({ unreadAlerts }: { unreadAlerts: number }) {
  const pathname = usePathname();
  const { time, date } = useClock();
  const [spinning, setSpinning] = useState(false);

  const title = PAGE_TITLES[pathname] ?? "Dashboard";

  const handleRefresh = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 700);
  };

  return (
    <header className="h-[60px] flex items-center gap-3 px-6 border-b border-[#0f1929] bg-[#080c12]/80 backdrop-blur-sm sticky top-0 z-30 flex-shrink-0">
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-bold text-text-primary">{title}</div>
        <div className="text-[10px] font-mono text-text-dim">{date}</div>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-surface-card border border-surface-border rounded-[9px] px-3 py-2 w-52 focus-within:border-brand-blue/50 transition-colors">
        <Search className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
        <input
          className="bg-transparent text-[12px] text-text-secondary placeholder-text-muted outline-none flex-1 min-w-0"
          placeholder="Search…"
        />
        <kbd className="text-[10px] text-text-dim bg-surface-elevated px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
      </div>

      {/* Live clock */}
      <div className="hidden sm:flex items-center font-mono text-[12px] text-brand-blue bg-[#0c1a2e] border border-[#1e3a5f] px-3 py-2 rounded-[9px]">
        {time}
      </div>

      {/* Refresh */}
      <button
        onClick={handleRefresh}
        className="w-9 h-9 flex items-center justify-center rounded-[9px] bg-surface-card border border-surface-border text-text-muted hover:text-text-secondary hover:border-brand-blue/30 transition-all"
      >
        <RefreshCw className={`w-4 h-4 transition-transform duration-700 ${spinning ? "rotate-180" : ""}`} />
      </button>

      {/* Notifications */}
      <div className="relative">
        <button className="w-9 h-9 flex items-center justify-center rounded-[9px] bg-surface-card border border-surface-border text-text-muted hover:text-text-secondary hover:border-brand-blue/30 transition-all">
          <Bell className="w-4 h-4" />
        </button>
        {unreadAlerts > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#080c12]" />
        )}
      </div>

      {/* Status */}
      <div className="hidden lg:flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-[11px] font-semibold px-3 py-2 rounded-full">
        <span className="relative flex w-2 h-2">
          <span className="absolute w-full h-full rounded-full bg-green-400 opacity-60 animate-ping" />
          <span className="relative w-2 h-2 rounded-full bg-green-400" />
        </span>
        All Systems Operational
      </div>
    </header>
  );
}
