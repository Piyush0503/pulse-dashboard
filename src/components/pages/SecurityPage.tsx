"use client";

import { useState } from "react";
import { Shield, ShieldAlert, ShieldCheck, Lock, Unlock } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import Badge from "@/components/ui/Badge";

const THREATS = [
  { id: 1, type: "Brute Force",          src: "45.33.32.156",   target: "Auth API",     severity: "high"     as const, blocked: true,  time: "5m ago"  },
  { id: 2, type: "SQL Injection Attempt",src: "104.21.64.82",   target: "DB Query API", severity: "error"    as const, blocked: true,  time: "12m ago" },
  { id: 3, type: "Rate Limit Exceeded",  src: "192.0.2.144",    target: "API Gateway",  severity: "warning"  as const, blocked: true,  time: "18m ago" },
  { id: 4, type: "Suspicious User Agent",src: "Unknown",        target: "Web App",      severity: "info"     as const, blocked: false, time: "45m ago" },
  { id: 5, type: "Invalid JWT Token",    src: "Multiple IPs",   target: "Auth API",     severity: "warning"  as const, blocked: true,  time: "1h ago"  },
];

const SSL_CERTS = [
  { domain: "api.pulse.dev",   exp: "Dec 2025", valid: true  },
  { domain: "app.pulse.dev",   exp: "Dec 2025", valid: true  },
  { domain: "cdn.pulse.dev",   exp: "Mar 2025", valid: false },
];

export default function SecurityPage() {
  const [blockedIPs, setBlockedIPs] = useState(["45.33.32.156", "104.21.64.82"]);

  return (
    <div className="p-6 flex flex-col gap-5 page-enter">
      <div>
        <h1 className="font-display text-[22px] font-extrabold text-text-primary tracking-tight">Security Center</h1>
        <p className="text-[12px] text-text-muted mt-1">Threat detection, SSL management and access control</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { l: "Threats Blocked",  v: 247,          col: "text-brand-green"  },
          { l: "Active Blocks",    v: blockedIPs.length, col: "text-brand-red"    },
          { l: "Blocked IPs",      v: 53,           col: "text-brand-amber"  },
          { l: "Security Score",   v: "87/100",     col: "text-brand-blue"   },
        ].map((m) => (
          <Card key={m.l}>
            <div className="text-[10px] font-bold text-text-dim uppercase tracking-[0.1em] mb-2">{m.l}</div>
            <div className={`text-[28px] font-extrabold font-mono ${m.col}`}>{m.v}</div>
          </Card>
        ))}
      </div>

      {/* Threats */}
      <Card>
        <SectionTitle title="Threat Detection" sub="Recent security incidents and blocked requests" />
        <div className="space-y-2">
          {THREATS.map((t) => (
            <div key={t.id} className={`flex items-center gap-3 px-4 py-3 rounded-[10px] border transition-all ${
              t.severity === "error" ? "bg-red-500/10 border-red-500/20" :
              t.severity === "high" ? "bg-orange-500/10 border-orange-500/20" :
              t.severity === "warning" ? "bg-amber-500/10 border-amber-500/20" :
              "bg-sky-500/10 border-sky-500/20"
            }`}>
              <ShieldAlert className={`w-4 h-4 flex-shrink-0 ${
                t.severity === "error" ? "text-brand-red" :
                t.severity === "high" ? "text-brand-orange" :
                t.severity === "warning" ? "text-brand-amber" : "text-brand-blue"
              }`} />
              <div className="flex-1 min-w-0">
                <div className={`text-[12px] font-bold ${
                  t.severity === "error" ? "text-brand-red" :
                  t.severity === "high" ? "text-brand-orange" :
                  t.severity === "warning" ? "text-brand-amber" : "text-brand-blue"
                }`}>{t.type}</div>
                <div className="text-[10px] text-text-dim mt-0.5">
                  <span className="font-mono">Source: {t.src}</span>
                  <span className="mx-1.5">·</span>
                  <span>Target: {t.target}</span>
                </div>
              </div>
              <Badge variant={t.severity === "high" ? "warning" : t.severity as any}>{t.severity.toUpperCase()}</Badge>
              <Badge variant={t.blocked ? "success" : "error"}>{t.blocked ? "Blocked" : "Active"}</Badge>
              <span className="text-[10px] font-mono text-text-dim flex-shrink-0">{t.time}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* SSL Certs */}
        <Card>
          <SectionTitle title="SSL Certificates" />
          <div className="space-y-1">
            {SSL_CERTS.map((c) => (
              <div key={c.domain} className="flex items-center justify-between py-3 border-b border-surface-border last:border-0">
                <div className="flex items-center gap-2">
                  {c.valid ? <Lock className="w-3.5 h-3.5 text-brand-green" /> : <Unlock className="w-3.5 h-3.5 text-brand-red" />}
                  <span className="text-[12px] font-mono text-text-secondary">{c.domain}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-text-dim">Exp: {c.exp}</span>
                  <Badge variant={c.valid ? "success" : "error"}>{c.valid ? "Valid" : "Expiring"}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Security Score */}
        <Card glow="green">
          <SectionTitle title="Security Score" />
          <div className="flex flex-col items-center py-4">
            <div className="text-[64px] font-extrabold font-mono text-brand-green leading-none">87</div>
            <div className="text-[12px] text-brand-green font-semibold mt-2">Good · 2 issues remaining</div>
            <div className="w-full h-2 bg-surface-border rounded-full overflow-hidden mt-4">
              <div className="h-full rounded-full bg-gradient-to-r from-brand-green to-brand-blue" style={{ width: "87%" }} />
            </div>
            <div className="text-[10px] text-text-dim mt-3">Next audit: 30 days</div>
          </div>
        </Card>

        {/* Blocked IPs */}
        <Card>
          <SectionTitle title="Blocked IPs" sub={`${blockedIPs.length} active blocks`} />
          <div className="space-y-2">
            {blockedIPs.map((ip) => (
              <div key={ip} className="flex items-center justify-between px-3 py-2 bg-red-500/5 border border-red-500/20 rounded-[8px]">
                <span className="text-[11px] font-mono text-brand-red">{ip}</span>
                <button
                  onClick={() => setBlockedIPs((prev) => prev.filter((i) => i !== ip))}
                  className="text-[9px] font-bold px-2 py-0.5 rounded-[5px] bg-surface-elevated border border-surface-border text-text-muted hover:text-text-secondary transition-colors"
                >
                  Unblock
                </button>
              </div>
            ))}
            {blockedIPs.length === 0 && (
              <div className="text-center py-6 text-text-dim text-[11px]">No IPs blocked</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
