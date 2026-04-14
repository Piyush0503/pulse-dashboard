"use client";

import { useState } from "react";
import { Search, Mail, Trash2, Eye } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { USERS_LIST } from "@/lib/data";
import { fmt, fmtUSD } from "@/lib/utils";
import type { UserRecord } from "@/types";

const ROLE_CFG: Record<string, { bg: string; text: string }> = {
  admin:     { bg: "bg-indigo-500/10 border border-indigo-500/20", text: "text-indigo-400" },
  moderator: { bg: "bg-orange-500/10 border border-orange-500/20", text: "text-orange-400" },
  user:      { bg: "bg-sky-500/10 border border-sky-500/20",       text: "text-sky-400"    },
};
const STATUS_CFG: Record<string, { bg: string; text: string }> = {
  active:    { bg: "bg-green-500/10 border border-green-500/20",  text: "text-green-400" },
  suspended: { bg: "bg-red-500/10 border border-red-500/20",      text: "text-red-400"   },
};
const PLAN_CFG: Record<string, { icon: string; text: string }> = {
  Enterprise: { icon: "👑", text: "text-brand-amber" },
  Pro:        { icon: "⚡", text: "text-brand-purple" },
  Basic:      { icon: "🔹", text: "text-text-secondary" },
};

type TabFilter = "all" | "admin" | "moderator" | "user" | "active" | "suspended";

export default function UsersPage() {
  const [users, setUsers] = useState<UserRecord[]>(USERS_LIST);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<TabFilter>("all");
  const [selected, setSelected] = useState<UserRecord | null>(null);

  const toggle = (id: string) =>
    setUsers((prev) =>
      prev.map((u) => u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u)
    );

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchTab =
      tab === "all" ||
      u.role === tab ||
      u.status === tab;
    return matchSearch && matchTab;
  });

  return (
    <div className="p-6 flex flex-col gap-5 page-enter">
      <div>
        <h1 className="font-display text-[22px] font-extrabold text-text-primary tracking-tight">User Panel</h1>
        <p className="text-[12px] text-text-muted mt-1">Manage users, roles, and account status</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Users", val: users.length, col: "text-text-secondary" },
          { label: "Active", val: users.filter((u) => u.status === "active").length, col: "text-brand-green" },
          { label: "Suspended", val: users.filter((u) => u.status === "suspended").length, col: "text-brand-red" },
          { label: "Enterprise", val: users.filter((u) => u.plan === "Enterprise").length, col: "text-brand-amber" },
        ].map((m) => (
          <Card key={m.label}>
            <div className="text-[10px] font-bold text-text-dim uppercase tracking-[0.1em] mb-2">{m.label}</div>
            <div className={`text-[32px] font-extrabold font-mono ${m.col}`}>{m.val}</div>
          </Card>
        ))}
      </div>

      <div className={`grid gap-4 ${selected ? "grid-cols-1 lg:grid-cols-[1fr_360px]" : "grid-cols-1"}`}>
        <Card>
          {/* Toolbar */}
          <div className="flex items-center gap-3 flex-wrap mb-5">
            <div className="flex-1 min-w-0">
              <SectionTitle title="All Users" sub={`${filtered.length} matching`} />
            </div>
            <div className="flex items-center gap-2 bg-surface-input border border-surface-border rounded-[8px] px-3 py-2">
              <Search className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users…"
                className="bg-transparent text-[12px] text-text-secondary placeholder-text-muted outline-none w-44"
              />
            </div>
            <div className="flex gap-1 bg-surface-elevated rounded-[8px] p-0.5 flex-wrap">
              {(["all", "admin", "moderator", "user", "active", "suspended"] as TabFilter[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`text-[10px] px-2.5 py-1 rounded-[6px] font-semibold capitalize transition-all ${
                    tab === t ? "bg-sky-500/20 text-brand-blue border border-sky-500/30" : "text-text-dim hover:text-text-muted"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-surface-border">
                  {["User", "Email", "Role", "Plan", "Status", "Joined", "Requests", "Revenue", "Actions"].map((h) => (
                    <th key={h} className="text-left text-[10px] font-bold text-text-dim uppercase tracking-[0.08em] pb-3 pr-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => {
                  const rc = ROLE_CFG[u.role];
                  const sc = STATUS_CFG[u.status];
                  const pc = PLAN_CFG[u.plan];
                  return (
                    <tr
                      key={u.id}
                      onClick={() => setSelected(selected?.id === u.id ? null : u)}
                      className={`border-b border-[#0a1220] cursor-pointer transition-colors hover:bg-surface-hover ${selected?.id === u.id ? "bg-surface-hover" : ""} ${i === filtered.length - 1 ? "border-0" : ""}`}
                    >
                      <td className="py-2.5 pr-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-sky-400 flex items-center justify-center text-[11px] font-extrabold text-white flex-shrink-0">
                            {u.name.charAt(0)}
                          </div>
                          <span className="text-[12px] font-semibold text-text-secondary whitespace-nowrap">{u.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 pr-3"><span className="text-[11px] font-mono text-text-dim">{u.email}</span></td>
                      <td className="py-2.5 pr-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${rc.bg} ${rc.text}`}>{u.role}</span>
                      </td>
                      <td className="py-2.5 pr-3"><span className={`text-[11px] font-semibold ${pc.text}`}>{pc.icon} {u.plan}</span></td>
                      <td className="py-2.5 pr-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${sc.bg} ${sc.text}`}>{u.status}</span>
                      </td>
                      <td className="py-2.5 pr-3"><span className="text-[11px] text-text-dim">{u.joined}</span></td>
                      <td className="py-2.5 pr-3"><span className="text-[11px] font-mono text-brand-blue">{fmt(u.requests)}</span></td>
                      <td className="py-2.5 pr-3"><span className="text-[11px] font-mono text-brand-green">{fmtUSD(u.revenue)}</span></td>
                      <td className="py-2.5" onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-1.5">
                          <button onClick={() => setSelected(selected?.id === u.id ? null : u)} className="p-1 rounded-[5px] bg-sky-500/10 border border-sky-500/20 text-sky-400 hover:bg-sky-500/20 transition-colors">
                            <Eye className="w-3 h-3" />
                          </button>
                          <button onClick={() => toggle(u.id)} className={`p-1 rounded-[5px] border transition-colors ${u.status === "active" ? "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20" : "bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20"}`}>
                            <span className="text-[10px] font-bold px-0.5">{u.status === "active" ? "Ban" : "✓"}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Detail panel */}
        {selected && (
          <Card glow="purple" className="self-start">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-400 to-sky-400 flex items-center justify-center text-lg font-extrabold text-white">
                  {selected.name.charAt(0)}
                </div>
                <div>
                  <div className="text-[14px] font-bold text-text-primary">{selected.name}</div>
                  <div className="text-[11px] text-text-dim font-mono">{selected.email}</div>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-[11px] px-2.5 py-1 rounded-[7px] bg-surface-elevated border border-surface-border text-text-muted hover:text-text-secondary transition-colors">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { l: "Role", v: selected.role },
                { l: "Plan", v: selected.plan },
                { l: "Status", v: selected.status },
                { l: "Joined", v: selected.joined },
                { l: "Requests", v: fmt(selected.requests) },
                { l: "Revenue", v: fmtUSD(selected.revenue) },
              ].map((m) => (
                <div key={m.l} className="bg-surface-elevated rounded-[9px] border border-surface-border px-3 py-2.5">
                  <div className="text-[9px] font-bold text-text-dim uppercase tracking-[0.1em] mb-1">{m.l}</div>
                  <div className="text-[13px] font-bold font-mono text-text-secondary capitalize">{m.v}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[8px] bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[11px] font-bold hover:bg-sky-500/20 transition-colors">
                <Mail className="w-3.5 h-3.5" /> Email User
              </button>
              <button className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-[8px] bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-bold hover:bg-red-500/20 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
