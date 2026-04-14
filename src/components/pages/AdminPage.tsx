"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import Toggle from "@/components/ui/Toggle";
import { USERS_LIST } from "@/lib/data";
import { fmtUSD } from "@/lib/utils";

type AdminTab = "overview" | "configuration" | "feature-flags" | "audit-log" | "billing";

const AUDIT_LOG = [
  { id: 1, user: "admin@pulse.dev",  action: "Updated rate limits",               resource: "API Config",      time: "2m ago",  ip: "192.168.1.1" },
  { id: 2, user: "arjun@pulse.dev",  action: "Suspended user vikram@dev.co",       resource: "Users",           time: "18m ago", ip: "10.0.0.5"    },
  { id: 3, user: "riya@saas.com",    action: "Deployed v2.4.1",                    resource: "CI/CD Pipeline",  time: "34m ago", ip: "10.0.0.8"    },
  { id: 4, user: "admin@pulse.dev",  action: "Modified feature flag: beta_features", resource: "Feature Flags", time: "1h ago",  ip: "192.168.1.1" },
  { id: 5, user: "sneha@corp.in",    action: "Exported user data report",           resource: "Data Export",     time: "2h ago",  ip: "10.0.1.3"    },
  { id: 6, user: "admin@pulse.dev",  action: "Acknowledged 3 alerts",              resource: "Alert System",    time: "3h ago",  ip: "192.168.1.1" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [flags, setFlags] = useState({
    dark_mode:         true,
    beta_features:     false,
    maintenance_mode:  false,
    rate_limiting:     true,
    "2fa_required":    false,
    audit_logging:     true,
  });
  const [rateLimits, setRateLimits] = useState({ basic: 100, pro: 1000, enterprise: 10000 });
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const tabs: { id: AdminTab; label: string }[] = [
    { id: "overview",        label: "Overview"       },
    { id: "configuration",   label: "Configuration"  },
    { id: "feature-flags",   label: "Feature Flags"  },
    { id: "audit-log",       label: "Audit Log"      },
    { id: "billing",         label: "Billing"        },
  ];

  return (
    <div className="p-6 flex flex-col gap-5 page-enter">
      {/* Admin header banner */}
      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#1e1b4b] to-[#0c1a2e] rounded-[14px] border border-indigo-500/30">
        <div className="w-11 h-11 rounded-[12px] bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center text-xl flex-shrink-0">🛡</div>
        <div>
          <div className="font-display text-[16px] font-extrabold text-text-primary">Admin Control Panel</div>
          <div className="text-[11px] text-indigo-400 mt-0.5">Full system access · v2.4.1 · Last backup: 2h ago</div>
        </div>
        <div className="ml-auto flex gap-2">
          <div className="text-[11px] px-3 py-1.5 rounded-[7px] bg-green-500/10 border border-green-500/20 text-green-400 font-bold">✅ Systems OK</div>
          <div className="text-[11px] px-3 py-1.5 rounded-[7px] bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">⚠️ 4 Unacked</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-card border border-surface-border rounded-[10px] p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`text-[11px] px-3.5 py-1.5 rounded-[7px] font-semibold capitalize transition-all ${
              activeTab === t.id ? "bg-[#1e3a5f] text-brand-blue border border-[#38bdf8]/30" : "text-text-dim hover:text-text-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Overview ── */}
      {activeTab === "overview" && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { l: "Total Revenue", v: "$94.2K", ch: "+8.1%", col: "text-brand-green" },
              { l: "API Calls Today", v: "2.4M",   ch: "+12%",  col: "text-brand-blue"  },
              { l: "Active Sessions", v: "1,847",  ch: "+3%",   col: "text-brand-purple"},
              { l: "DB Queries/s",   v: "4,210",  ch: "-2%",   col: "text-brand-orange"},
            ].map((m) => (
              <Card key={m.l}>
                <div className="text-[10px] font-bold text-text-dim uppercase tracking-[0.1em] mb-2">{m.l}</div>
                <div className={`text-[24px] font-extrabold font-mono ${m.col}`}>{m.v}</div>
                <div className={`text-[10px] font-semibold mt-1 ${m.ch.startsWith("+") ? "text-brand-green" : "text-brand-red"}`}>{m.ch}</div>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <SectionTitle title="Plan Distribution" sub="Users by subscription tier" />
              {[
                { l: "Enterprise", v: 2, pct: 25, col: "#fbbf24" },
                { l: "Pro",        v: 4, pct: 50, col: "#818cf8" },
                { l: "Basic",      v: 2, pct: 25, col: "#38bdf8" },
              ].map((p) => (
                <div key={p.l} className="mb-4 last:mb-0">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[12px] font-semibold" style={{ color: p.col }}>{p.l}</span>
                    <span className="text-[11px] font-mono text-text-muted">{p.v} users ({p.pct}%)</span>
                  </div>
                  <div className="h-2 bg-surface-border rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: p.col }} />
                  </div>
                </div>
              ))}
            </Card>
            <Card>
              <SectionTitle title="System Resources" />
              {[
                { l: "CPU (avg)",    v: 42, col: "#38bdf8" },
                { l: "Memory (avg)", v: 67, col: "#818cf8" },
                { l: "Disk Usage",   v: 38, col: "#fb923c" },
                { l: "Network I/O",  v: 29, col: "#34d399" },
              ].map((r) => (
                <div key={r.l} className="flex items-center gap-3 mb-3 last:mb-0">
                  <span className="text-[11px] text-text-muted w-24 flex-shrink-0">{r.l}</span>
                  <div className="flex-1 h-1.5 bg-surface-border rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${r.v}%`, background: r.col }} />
                  </div>
                  <span className="text-[11px] font-mono w-8 text-right flex-shrink-0" style={{ color: r.col }}>{r.v}%</span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      )}

      {/* ── Configuration ── */}
      {activeTab === "configuration" && (
        <Card>
          <SectionTitle title="System Configuration" sub="Core application settings" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="text-[11px] font-bold text-text-muted mb-1">API Rate Limits (req/hour)</div>
              {(Object.keys(rateLimits) as (keyof typeof rateLimits)[]).map((plan) => (
                <div key={plan}>
                  <label className="text-[11px] text-text-dim block mb-1.5 capitalize">{plan} Plan</label>
                  <input
                    type="number"
                    value={rateLimits[plan]}
                    onChange={(e) => setRateLimits((prev) => ({ ...prev, [plan]: Number(e.target.value) }))}
                    className="w-full bg-surface-input border border-surface-border rounded-[8px] px-3 py-2 text-[13px] font-mono text-text-secondary focus:border-brand-blue/50 outline-none transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="text-[11px] font-bold text-text-muted mb-1">General Settings</div>
              {[
                { l: "App Name", v: "Pulse Dashboard" },
                { l: "Support Email", v: "support@pulse.dev" },
                { l: "Max Upload", v: "10MB" },
                { l: "Session Timeout", v: "24h" },
              ].map((s) => (
                <div key={s.l}>
                  <label className="text-[11px] text-text-dim block mb-1.5">{s.l}</label>
                  <input
                    defaultValue={s.v}
                    className="w-full bg-surface-input border border-surface-border rounded-[8px] px-3 py-2 text-[12px] text-text-secondary focus:border-brand-blue/50 outline-none transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-5">
            <button onClick={save} className="px-5 py-2 rounded-[9px] bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-[12px] font-bold hover:opacity-90 transition-opacity">
              {saved ? "✓ Saved!" : "Save Configuration"}
            </button>
            <button className="px-4 py-2 rounded-[9px] bg-surface-elevated border border-surface-border text-text-muted text-[12px] hover:text-text-secondary transition-colors">
              Reset to Defaults
            </button>
          </div>
        </Card>
      )}

      {/* ── Feature Flags ── */}
      {activeTab === "feature-flags" && (
        <Card>
          <SectionTitle title="Feature Flags" sub="Toggle features without deployment" />
          <div className="space-y-2">
            {(Object.keys(flags) as (keyof typeof flags)[]).map((flag) => (
              <div
                key={flag}
                className={`flex items-center justify-between px-4 py-3.5 rounded-[10px] border transition-all ${
                  flags[flag] ? "bg-sky-500/5 border-sky-500/20" : "bg-surface-elevated border-surface-border"
                }`}
              >
                <div>
                  <div className="text-[12px] font-bold text-text-secondary font-mono">{flag}</div>
                  <div className="text-[10px] text-text-dim mt-0.5 capitalize">
                    {flag.replace(/_/g, " ")} — {flags[flag] ? "Enabled" : "Disabled"}
                  </div>
                </div>
                <Toggle enabled={flags[flag]} onChange={() => setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }))} />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ── Audit Log ── */}
      {activeTab === "audit-log" && (
        <Card>
          <SectionTitle title="Audit Log" sub="All admin actions and system events" />
          <div className="space-y-2">
            {AUDIT_LOG.map((log) => (
              <div key={log.id} className="flex items-center gap-3 px-4 py-3 bg-surface-elevated rounded-[9px] border border-surface-border">
                <div className="w-8 h-8 rounded-[8px] bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sm flex-shrink-0">📋</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold text-text-secondary">{log.action}</div>
                  <div className="flex items-center gap-2 mt-0.5 text-[10px] text-text-dim flex-wrap">
                    <span className="font-mono">{log.user}</span>
                    <span>·</span><span>{log.resource}</span>
                    <span>·</span><span className="font-mono">IP: {log.ip}</span>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-text-dim flex-shrink-0">{log.time}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ── Billing ── */}
      {activeTab === "billing" && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {[
              { l: "MRR",        v: "$28,400", ch: "+12%", col: "text-brand-green"  },
              { l: "ARR",        v: "$340.8K", ch: "+12%", col: "text-brand-blue"   },
              { l: "Churn Rate", v: "2.1%",    ch: "-0.4%", col: "text-brand-red"   },
            ].map((m) => (
              <Card key={m.l}>
                <div className="text-[10px] font-bold text-text-dim uppercase tracking-[0.1em] mb-2">{m.l}</div>
                <div className={`text-[28px] font-extrabold font-mono ${m.col}`}>{m.v}</div>
                <div className={`text-[10px] font-semibold mt-1 ${m.ch.startsWith("+") ? "text-brand-green" : "text-brand-red"}`}>{m.ch} MoM</div>
              </Card>
            ))}
          </div>
          <Card>
            <SectionTitle title="User Revenue" sub="Per-user billing breakdown" />
            <div className="space-y-2">
              {USERS_LIST.map((u) => (
                <div key={u.id} className="flex items-center justify-between px-3 py-2.5 bg-surface-elevated rounded-[9px] border border-surface-border">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-sky-400 flex items-center justify-center text-[11px] font-extrabold text-white">{u.name.charAt(0)}</div>
                    <div>
                      <div className="text-[12px] font-semibold text-text-secondary">{u.name}</div>
                      <div className="text-[10px] text-text-dim">{u.plan} · {u.joined}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[13px] font-bold font-mono text-brand-green">{fmtUSD(u.revenue)}</div>
                    <div className={`text-[10px] font-bold mt-0.5 ${u.status === "active" ? "text-brand-green" : "text-brand-red"}`}>{u.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
