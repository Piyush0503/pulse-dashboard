"use client";

import { Activity, DollarSign, Users, AlertTriangle, Zap, Clock } from "lucide-react";
import { useLiveCtx } from "@/components/layout/DashboardShell";
import MetricCard from "@/components/ui/MetricCard";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import AreaMetricChart from "@/components/charts/AreaMetricChart";
import BarMetricChart from "@/components/charts/BarMetricChart";
import DonutChart from "@/components/charts/DonutChart";
import { fmt, fmtUSD } from "@/lib/utils";
import { TRAFFIC, SERVERS } from "@/lib/data";

export default function OverviewPage() {
  const { metrics, reqData, revData, tick } = useLiveCtx();

  const serverCounts = {
    online: SERVERS.filter((s) => s.status === "online").length,
    degraded: SERVERS.filter((s) => s.status === "degraded").length,
    offline: SERVERS.filter((s) => s.status === "offline").length,
  };

  return (
    <div className="p-6 flex flex-col gap-5 page-enter">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-[22px] font-extrabold text-text-primary tracking-tight">System Overview</h1>
          <p className="text-[12px] text-text-muted mt-1">Live infrastructure &amp; product metrics · auto-updates every 2.5s</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 text-[11px] text-text-muted border border-surface-border bg-surface-card hover:bg-surface-elevated px-3 py-2 rounded-[9px] transition-colors">
            ⬇ Export CSV
          </button>
          <button className="flex items-center gap-2 text-[11px] text-brand-blue border border-brand-blue/30 bg-brand-blue/10 hover:bg-brand-blue/20 px-3 py-2 rounded-[9px] transition-colors">
            📊 Generate Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        <MetricCard title="Total Requests" value={fmt(metrics.requests)} change={2.4} sub="vs last hour" icon={<Activity className="w-4 h-4" />} color="blue" animKey={tick} />
        <MetricCard title="Revenue" value={fmtUSD(metrics.revenue)} change={8.1} sub="vs yesterday" icon={<DollarSign className="w-4 h-4" />} color="green" animKey={tick} />
        <MetricCard title="Active Users" value={fmt(metrics.users)} change={-1.2} sub="vs last hour" icon={<Users className="w-4 h-4" />} color="purple" animKey={tick} />
        <MetricCard title="Error Rate" value={`${metrics.errorRate.toFixed(2)}%`} change={-0.8} sub="vs last hour" icon={<AlertTriangle className="w-4 h-4" />} color="red" animKey={tick} />
        <MetricCard title="Uptime" value={`${metrics.uptime.toFixed(3)}%`} change={0.01} sub="30-day SLA" icon={<Zap className="w-4 h-4" />} color="green" animKey={tick} />
        <MetricCard title="Avg Latency" value={`${metrics.avgLatency}ms`} change={-5.2} sub="P95 response" icon={<Clock className="w-4 h-4" />} color="orange" animKey={tick} />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <SectionTitle
            title="Request Rate"
            sub="Requests/sec across all endpoints"
            live
            action={<span className="text-[10px] font-mono text-text-dim">Tick #{tick}</span>}
          />
          <div className="flex items-center gap-4 mb-3">
            {[{ color: "#38bdf8", label: "Requests/s" }, { color: "#818cf8", label: "Errors/s" }].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5 text-[11px] text-text-muted">
                <span className="w-3 h-0.5 rounded inline-block" style={{ background: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
          <AreaMetricChart
            data={reqData.map((d) => ({
              time: d.time,
              req: d.req,
              err: d.err,
            }))}
            series={[
              { key: "err", name: "Errors/s", color: "#818cf8" },
              { key: "req", name: "Requests/s", color: "#38bdf8" },
            ]}
            height={210}
          />
        </Card>

        <Card>
          <SectionTitle title="Traffic Sources" sub="Distribution by origin" />
          <DonutChart data={TRAFFIC} />
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-surface-border">
            <div className="bg-surface-elevated rounded-[9px] p-3 text-center">
              <div className="text-[18px] font-bold font-mono text-brand-blue">4.2K</div>
              <div className="text-[9px] text-text-dim uppercase tracking-wider mt-0.5">Peak RPS</div>
            </div>
            <div className="bg-surface-elevated rounded-[9px] p-3 text-center">
              <div className="text-[18px] font-bold font-mono text-brand-green">98.2%</div>
              <div className="text-[9px] text-text-dim uppercase tracking-wider mt-0.5">Cache Hit</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <SectionTitle
            title="Revenue (24h)"
            sub="Hourly revenue vs cost"
            action={
              <div className="flex items-center gap-0.5 bg-surface-elevated rounded-[8px] p-0.5">
                {["1D", "7D", "30D"].map((l, i) => (
                  <button key={l} className={`text-[10px] px-2.5 py-1 rounded-[6px] font-semibold transition-colors ${i === 0 ? "bg-brand-blue/20 text-brand-blue" : "text-text-dim hover:text-text-muted"}`}>{l}</button>
                ))}
              </div>
            }
          />
          <BarMetricChart
            data={revData.map((d) => ({
              time: d.time,
              rev: d.rev,
              cost: d.cost,
            }))}
            series={[
              { key: "rev", name: "Revenue", color: "#38bdf8" },
              { key: "cost", name: "Cost", color: "#334155" },
            ]}
            height={170}
            formatter={(v) => `$${(v / 1000).toFixed(1)}K`}
          />
        </Card>

        <Card>
          <SectionTitle title="Server Summary" />
          <div className="space-y-3 mt-2">
            {[
              { label: "Online", val: serverCounts.online, col: "text-brand-green", bg: "bg-green-500/10 border-green-500/20" },
              { label: "Degraded", val: serverCounts.degraded, col: "text-brand-amber", bg: "bg-amber-500/10 border-amber-500/20" },
              { label: "Offline", val: serverCounts.offline, col: "text-brand-red", bg: "bg-red-500/10 border-red-500/20" },
              { label: "Total", val: SERVERS.length, col: "text-text-secondary", bg: "bg-surface-elevated border-surface-border" },
            ].map((s) => (
              <div key={s.label} className={`flex items-center justify-between px-3 py-2.5 rounded-[9px] border ${s.bg}`}>
                <span className="text-[12px] text-text-muted font-medium">{s.label}</span>
                <span className={`text-[22px] font-extrabold font-mono ${s.col}`}>{s.val}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="border-t border-surface-border pt-4 flex items-center justify-between text-[11px] text-text-dim">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse inline-block" />
          Live data — refreshing every 2.5s
        </div>
        <span>Pulse Dashboard v1.0.0</span>
      </div>
    </div>
  );
}
