"use client";

import { useState } from "react";
import { Globe, RefreshCw } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import StatusDot from "@/components/ui/StatusDot";
import MiniBar from "@/components/ui/MiniBar";
import { SERVERS } from "@/lib/data";
import { randInt } from "@/lib/utils";
import type { ServerNode } from "@/types";

export default function InfrastructurePage() {
  const [servers, setServers] = useState<ServerNode[]>(SERVERS);
  const [selected, setSelected] = useState<ServerNode | null>(null);

  const restart = (id: string) => {
    setServers((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "online", cpu: randInt(15, 40), mem: randInt(30, 55), lat: randInt(8, 20) } : s
      )
    );
  };

  const counts = {
    online: servers.filter((s) => s.status === "online").length,
    degraded: servers.filter((s) => s.status === "degraded").length,
    offline: servers.filter((s) => s.status === "offline").length,
  };

  return (
    <div className="p-6 flex flex-col gap-5 page-enter">
      <div>
        <h1 className="font-display text-[22px] font-extrabold text-text-primary tracking-tight">Infrastructure</h1>
        <p className="text-[12px] text-text-muted mt-1">{servers.length} nodes across 4 regions</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Servers", val: servers.length, col: "text-text-secondary" },
          { label: "Online", val: counts.online, col: "text-brand-green" },
          { label: "Degraded", val: counts.degraded, col: "text-brand-amber" },
          { label: "Offline", val: counts.offline, col: "text-brand-red" },
        ].map((m) => (
          <Card key={m.label} glow={m.col.includes("green") ? "green" : m.col.includes("amber") ? "amber" : m.col.includes("red") ? "red" : undefined}>
            <div className="text-[10px] font-bold text-text-dim uppercase tracking-[0.1em] mb-2">{m.label}</div>
            <div className={`text-[32px] font-extrabold font-mono ${m.col}`}>{m.val}</div>
          </Card>
        ))}
      </div>

      <div className={`grid gap-4 ${selected ? "grid-cols-1 lg:grid-cols-[1fr_360px]" : "grid-cols-1"}`}>
        {/* Server table */}
        <Card>
          <SectionTitle title="Server Fleet" sub="All nodes and current status" />
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-surface-border">
                  {["Server", "Region", "Status", "CPU", "Memory", "Disk", "Latency", "Actions"].map((h) => (
                    <th key={h} className="text-left text-[10px] font-bold text-text-dim uppercase tracking-[0.08em] pb-3 pr-4 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {servers.map((s, i) => (
                  <tr
                    key={s.id}
                    onClick={() => setSelected(selected?.id === s.id ? null : s)}
                    className={`border-b border-[#0a1220] cursor-pointer transition-colors hover:bg-surface-hover ${selected?.id === s.id ? "bg-surface-hover" : ""} ${i === servers.length - 1 ? "border-0" : ""}`}
                  >
                    <td className="py-3 pr-4">
                      <span className="font-mono text-[12px] text-text-secondary">{s.name}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="flex items-center gap-1.5 text-[11px] text-text-muted">
                        <Globe className="w-3 h-3" />{s.region}
                      </span>
                    </td>
                    <td className="py-3 pr-4"><StatusDot status={s.status} /></td>
                    <td className="py-3 pr-4">{s.status === "offline" ? <span className="text-text-dim text-[11px]">—</span> : <MiniBar val={s.cpu} />}</td>
                    <td className="py-3 pr-4">{s.status === "offline" ? <span className="text-text-dim text-[11px]">—</span> : <MiniBar val={s.mem} color="purple" />}</td>
                    <td className="py-3 pr-4">{s.status === "offline" ? <span className="text-text-dim text-[11px]">—</span> : <MiniBar val={s.disk} color="orange" />}</td>
                    <td className="py-3 pr-4">
                      {s.status === "offline" ? (
                        <span className="text-text-dim text-[11px]">—</span>
                      ) : (
                        <span className={`font-mono text-[11px] ${s.lat > 30 ? "text-brand-amber" : "text-brand-green"}`}>{s.lat}ms</span>
                      )}
                    </td>
                    <td className="py-3">
                      <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                        {s.status === "offline" && (
                          <button onClick={() => restart(s.id)} className="text-[10px] px-2 py-1 rounded-[6px] bg-green-500/10 border border-green-500/20 text-green-400 font-bold flex items-center gap-1 hover:bg-green-500/20 transition-colors">
                            <RefreshCw className="w-2.5 h-2.5" /> Restart
                          </button>
                        )}
                        <button onClick={() => setSelected(selected?.id === s.id ? null : s)} className="text-[10px] px-2 py-1 rounded-[6px] bg-sky-500/10 border border-sky-500/20 text-sky-400 font-bold hover:bg-sky-500/20 transition-colors">
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Detail panel */}
        {selected && (
          <Card glow="blue" className="self-start">
            <SectionTitle
              title={`Details — ${selected.name}`}
              action={
                <button onClick={() => setSelected(null)} className="text-[11px] px-2.5 py-1 rounded-[7px] bg-surface-elevated border border-surface-border text-text-muted hover:text-text-secondary transition-colors">
                  ✕ Close
                </button>
              }
            />
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {[
                { l: "CPU", v: `${selected.cpu}%` },
                { l: "Memory", v: `${selected.mem}%` },
                { l: "Latency", v: `${selected.lat}ms` },
                { l: "Disk", v: `${selected.disk}%` },
                { l: "Region", v: selected.region },
                { l: "Status", v: selected.status },
                { l: "Node ID", v: selected.id },
                { l: "Uptime", v: selected.status === "offline" ? "—" : "99.9%" },
              ].map((m) => (
                <div key={m.l} className="bg-surface-elevated rounded-[9px] border border-surface-border px-3 py-2.5">
                  <div className="text-[9px] font-bold text-text-dim uppercase tracking-[0.1em] mb-1">{m.l}</div>
                  <div className="text-[14px] font-bold font-mono text-text-secondary capitalize">{m.v}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-[8px] bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[11px] font-bold hover:bg-sky-500/20 transition-colors">
                📊 View Logs
              </button>
              <button className="flex-1 py-2 rounded-[8px] bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-bold hover:bg-amber-500/20 transition-colors">
                ⚙ Configure
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
