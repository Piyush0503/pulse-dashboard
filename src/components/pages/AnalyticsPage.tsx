"use client";

import { useLiveCtx } from "@/components/layout/DashboardShell";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import AreaMetricChart from "@/components/charts/AreaMetricChart";
import ActivityHeatmap from "@/components/charts/ActivityHeatmap";

const GEO_DATA = [
  { name: "India", val: 38, color: "#38bdf8" },
  { name: "USA", val: 26, color: "#818cf8" },
  { name: "Europe", val: 19, color: "#34d399" },
  { name: "SEA", val: 11, color: "#fb923c" },
  { name: "Other", val: 6, color: "#64748b" },
];

export default function AnalyticsPage() {
  const { revData } = useLiveCtx();

  return (
    <div className="p-6 flex flex-col gap-5 page-enter">
      <div>
        <h1 className="font-display text-[22px] font-extrabold text-text-primary tracking-tight">Analytics</h1>
        <p className="text-[12px] text-text-muted mt-1">User behaviour, geo distribution and engagement trends</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "DAU", value: "24.8K", change: "+12%", col: "text-brand-blue" },
          { label: "MAU", value: "142K", change: "+8%", col: "text-brand-purple" },
          { label: "Avg Session", value: "8.4m", change: "+2%", col: "text-brand-green" },
          { label: "Bounce Rate", value: "32.1%", change: "-4%", col: "text-brand-orange" },
        ].map((m) => (
          <Card key={m.label}>
            <div className="text-[10px] font-bold text-text-dim uppercase tracking-[0.1em] mb-2">{m.label}</div>
            <div className={`text-[26px] font-extrabold font-mono ${m.col}`}>{m.value}</div>
            <div className={`text-[11px] font-semibold mt-1 ${m.change.startsWith("+") ? "text-brand-green" : "text-brand-red"}`}>
              {m.change} vs last month
            </div>
          </Card>
        ))}
      </div>

      {/* Heatmap + Geo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <SectionTitle title="Activity Heatmap" sub="Request density by day & hour (last 7 days)" />
          <ActivityHeatmap />
        </Card>

        <Card>
          <SectionTitle title="Geo Distribution" sub="Traffic by region" />
          <div className="space-y-4 mt-2">
            {GEO_DATA.map((g) => (
              <div key={g.name}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[12px] text-text-muted font-medium">{g.name}</span>
                  <span className="text-[11px] font-mono" style={{ color: g.color }}>{g.val}%</span>
                </div>
                <div className="h-1.5 bg-surface-border rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${g.val}%`, background: g.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Revenue trend */}
      <Card>
        <SectionTitle title="Revenue Trend (24h)" sub="Revenue vs cost breakdown" />
        <AreaMetricChart
          data={revData.map((d) => ({
            time: d.time,
            rev: d.rev,
            cost: d.cost,
          }))}
          series={[
            { key: "cost", name: "Cost", color: "#f87171" },
            { key: "rev", name: "Revenue", color: "#34d399" },
          ]}
          height={200}
          formatter={(v) => `$${(v / 1000).toFixed(1)}K`}
        />
      </Card>

      {/* Conversion funnel */}
      <Card>
        <SectionTitle title="Conversion Funnel" sub="User journey from visit to conversion" />
        <div className="flex flex-col gap-2.5 mt-2">
          {[
            { label: "Visitors", val: 100, count: "142,000" },
            { label: "Signed Up", val: 42, count: "59,640" },
            { label: "Activated", val: 28, count: "39,760" },
            { label: "Paid", val: 11, count: "15,620" },
            { label: "Retained (30d)", val: 8, count: "11,360" },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <span className="text-[11px] text-text-muted w-32 flex-shrink-0">{f.label}</span>
              <div className="flex-1 h-7 bg-surface-elevated rounded-[6px] overflow-hidden relative">
                <div
                  className="h-full rounded-[6px] bg-gradient-to-r from-brand-blue/80 to-brand-purple/60 transition-all duration-700"
                  style={{ width: `${f.val}%` }}
                />
                <span className="absolute inset-0 flex items-center px-3 text-[11px] font-mono font-bold text-text-primary">{f.count}</span>
              </div>
              <span className="text-[11px] font-mono text-text-muted w-10 text-right flex-shrink-0">{f.val}%</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
