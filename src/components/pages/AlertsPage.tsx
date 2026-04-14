"use client";

import { useState } from "react";
import { Check, CheckCheck, XCircle, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { useLiveCtx } from "@/components/layout/DashboardShell";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import type { AlertItem } from "@/types";

const ALERT_CFG = {
  error:   { Icon: XCircle,       bg: "bg-red-500/10",    border: "border-red-500/20",    text: "text-red-400",    label: "Error"   },
  warning: { Icon: AlertTriangle, bg: "bg-amber-500/10",  border: "border-amber-500/20",  text: "text-amber-400",  label: "Warning" },
  info:    { Icon: Info,          bg: "bg-sky-500/10",    border: "border-sky-500/20",    text: "text-sky-400",    label: "Info"    },
  success: { Icon: CheckCircle,   bg: "bg-green-500/10",  border: "border-green-500/20",  text: "text-green-400",  label: "Success" },
} as const;

type FilterType = "all" | "unacked" | AlertItem["type"];

export default function AlertsPage() {
  const { alerts, setAlerts } = useLiveCtx();
  const [filter, setFilter] = useState<FilterType>("all");

  const ack = (id: string) => setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, acked: true } : a));
  const ackAll = () => setAlerts((prev) => prev.map((a) => ({ ...a, acked: true })));

  const filtered = alerts.filter((a) => {
    if (filter === "all") return true;
    if (filter === "unacked") return !a.acked;
    return a.type === filter;
  });

  const counts = {
    total: alerts.length,
    errors: alerts.filter((a) => a.type === "error").length,
    warnings: alerts.filter((a) => a.type === "warning").length,
    unacked: alerts.filter((a) => !a.acked).length,
  };

  return (
    <div className="p-6 flex flex-col gap-5 page-enter">
      <div>
        <h1 className="font-display text-[22px] font-extrabold text-text-primary tracking-tight">Alerts & Events</h1>
        <p className="text-[12px] text-text-muted mt-1">System-wide incidents and notifications</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Alerts", val: counts.total, col: "text-text-secondary" },
          { label: "Errors", val: counts.errors, col: "text-brand-red" },
          { label: "Warnings", val: counts.warnings, col: "text-brand-amber" },
          { label: "Unacknowledged", val: counts.unacked, col: "text-brand-orange" },
        ].map((m) => (
          <Card key={m.label}>
            <div className="text-[10px] font-bold text-text-dim uppercase tracking-[0.1em] mb-2">{m.label}</div>
            <div className={`text-[32px] font-extrabold font-mono ${m.col}`}>{m.val}</div>
          </Card>
        ))}
      </div>

      <Card>
        {/* Toolbar */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
          <SectionTitle title="Alert Feed" sub="All system events" />
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex gap-1 bg-surface-elevated rounded-[8px] p-0.5">
              {(["all", "unacked", "error", "warning", "info", "success"] as FilterType[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-[10px] px-2.5 py-1 rounded-[6px] font-semibold capitalize transition-all ${
                    filter === f ? "bg-sky-500/20 text-brand-blue border border-sky-500/30" : "text-text-dim hover:text-text-muted"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <button
              onClick={ackAll}
              className="flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-[7px] bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-colors"
            >
              <CheckCheck className="w-3 h-3" />
              Ack All
            </button>
          </div>
        </div>

        {/* Alert list */}
        <div className="space-y-2">
          {filtered.map((alert) => {
            const c = ALERT_CFG[alert.type];
            const Icon = c.Icon;
            return (
              <div
                key={alert.id}
                className={`flex items-start gap-3 px-4 py-3 rounded-[10px] border transition-all duration-300 ${
                  alert.acked ? "bg-surface-card border-surface-border opacity-50" : `${c.bg} ${c.border}`
                }`}
              >
                <Icon className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${alert.acked ? "text-text-dim" : c.text}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-[12px] font-semibold leading-snug ${alert.acked ? "text-text-muted" : "text-text-primary"}`}>
                    {alert.msg}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-text-dim">
                    <span className="font-mono">{alert.src}</span>
                    <span>·</span>
                    <span>{alert.time}</span>
                    {alert.acked && <span className="text-brand-green font-bold">✓ Acknowledged</span>}
                  </div>
                </div>
                {!alert.acked && (
                  <button
                    onClick={() => ack(alert.id)}
                    className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-[6px] bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-colors flex-shrink-0"
                  >
                    <Check className="w-3 h-3" />
                    Ack
                  </button>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-text-dim text-[12px]">
              No alerts match this filter
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
