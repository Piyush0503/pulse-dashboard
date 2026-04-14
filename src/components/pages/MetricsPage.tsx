"use client";

import { useLiveCtx } from "@/components/layout/DashboardShell";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import AreaMetricChart from "@/components/charts/AreaMetricChart";
import LineMetricChart from "@/components/charts/LineMetricChart";

export default function MetricsPage() {
  const { metrics, reqData, tick } = useLiveCtx();

  const latData = reqData.map((d) => ({
    time: d.time,
    p50: Math.round(d.lat * 0.7),
    p95: Math.round(d.lat * 1.4),
    p99: Math.round(d.lat * 2.0),
  }));

  const errPctData = reqData.map((d) => ({
    time: d.time,
    errPct: parseFloat(((d.err / d.req) * 100).toFixed(2)),
  }));

  const kpis = [
    { label: "Req/s", value: `${Math.round(metrics.requests / 3600)}`, color: "text-brand-blue" },
    { label: "P50 Latency", value: `${Math.round(metrics.avgLatency * 0.7)}ms`, color: "text-brand-green" },
    { label: "P95 Latency", value: `${Math.round(metrics.avgLatency * 1.4)}ms`, color: "text-brand-amber" },
    { label: "Error Rate", value: `${metrics.errorRate.toFixed(3)}%`, color: "text-brand-red" },
  ];

  return (
    <div className="p-6 flex flex-col gap-5 page-enter">
      <div>
        <h1 className="font-display text-[22px] font-extrabold text-text-primary tracking-tight">Live Metrics</h1>
        <p className="text-[12px] text-text-muted mt-1">Real-time performance monitoring · Tick #{tick}</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k) => (
          <Card key={k.label}>
            <div className="text-[10px] font-bold text-text-dim uppercase tracking-[0.1em] mb-2">{k.label}</div>
            <div key={tick} className={`text-[28px] font-extrabold font-mono animate-count-up ${k.color}`}>{k.value}</div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <SectionTitle title="Request Volume" sub="Requests per second · live stream" live />
          <AreaMetricChart
            data={reqData.map((d) => ({
              time: d.time,
              req: d.req,
              err: d.err,
            }))}
            series={[{ key: "req", name: "Req/s", color: "#38bdf8" }]}
            height={220}
          />
        </Card>

        <Card>
          <SectionTitle title="Latency Percentiles" sub="P50 / P95 / P99 response time" live />
          <LineMetricChart
            data={latData}
            series={[
              { key: "p50", name: "P50", color: "#34d399" },
              { key: "p95", name: "P95", color: "#fbbf24" },
              { key: "p99", name: "P99", color: "#f87171" },
            ]}
            height={220}
            unit="ms"
          />
        </Card>
      </div>

      <Card>
        <SectionTitle title="Error Rate Over Time" sub="Percentage of requests resulting in 4xx/5xx" live />
        <AreaMetricChart
          data={errPctData}
          series={[{ key: "errPct", name: "Error %", color: "#f87171" }]}
          height={160}
          unit="%"
        />
      </Card>

      {/* Stats strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Avg Throughput", value: "847 req/s", sub: "last 5 min" },
          { label: "Apdex Score", value: "0.94", sub: "satisfied" },
          { label: "Cache Hit Rate", value: "98.2%", sub: "CDN + Redis" },
          { label: "DB Query Time", value: "14ms avg", sub: "all queries" },
        ].map((s) => (
          <Card key={s.label}>
            <div className="text-[10px] text-text-dim uppercase tracking-wider font-bold mb-1">{s.label}</div>
            <div className="text-[20px] font-bold font-mono text-text-secondary">{s.value}</div>
            <div className="text-[10px] text-text-dim mt-0.5">{s.sub}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
