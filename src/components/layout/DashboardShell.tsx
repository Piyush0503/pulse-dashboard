"use client";

import { useState, createContext, useContext } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useLiveData } from "@/hooks/useLiveData";
import type { LiveMetrics, DataPoint, RevenuePoint, AlertItem } from "@/types";

// ─── Live Data Context ────────────────────────────────────────────────────────
interface LiveDataCtx {
  metrics: LiveMetrics;
  reqData: DataPoint[];
  revData: RevenuePoint[];
  alerts: AlertItem[];
  setAlerts: React.Dispatch<React.SetStateAction<AlertItem[]>>;
  tick: number;
  unreadAlerts: number;
}

const LiveCtx = createContext<LiveDataCtx | null>(null);

export function useLiveCtx() {
  const ctx = useContext(LiveCtx);
  if (!ctx) throw new Error("useLiveCtx must be inside DashboardShell");
  return ctx;
}

// ─── Shell ────────────────────────────────────────────────────────────────────
export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const liveData = useLiveData();

  return (
    <LiveCtx.Provider value={liveData}>
      <div className="flex h-screen overflow-hidden bg-surface-base">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          unreadAlerts={liveData.unreadAlerts}
        />
        <div
          className="flex flex-col flex-1 min-w-0 overflow-hidden transition-all duration-300"
          style={{ marginLeft: collapsed ? 64 : 220 }}
        >
          <Topbar unreadAlerts={liveData.unreadAlerts} />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </LiveCtx.Provider>
  );
}
