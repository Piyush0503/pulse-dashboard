"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Activity, Server, BarChart3, Bell,
  Users, Shield, Lock, Settings, ChevronLeft, ChevronRight, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SECTION_LABELS } from "@/lib/constants";

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard, Activity, Server, BarChart3, Bell, Users, Shield, Lock, Settings,
};

const NAV = [
  { id: "overview",       label: "Overview",        icon: "LayoutDashboard", section: "main",       href: "/dashboard/overview" },
  { id: "metrics",        label: "Live Metrics",    icon: "Activity",        section: "main",       badge: "LIVE", href: "/dashboard/metrics" },
  { id: "infrastructure", label: "Infrastructure",  icon: "Server",          section: "main",       href: "/dashboard/infrastructure" },
  { id: "analytics",      label: "Analytics",       icon: "BarChart3",       section: "main",       href: "/dashboard/analytics" },
  { id: "alerts",         label: "Alerts",          icon: "Bell",            section: "main",       badge: "alerts", href: "/dashboard/alerts" },
  { id: "users",          label: "User Panel",      icon: "Users",           section: "management", href: "/dashboard/users" },
  { id: "admin",          label: "Admin Panel",     icon: "Shield",          section: "management", href: "/dashboard/admin" },
  { id: "security",       label: "Security",        icon: "Lock",            section: "management", href: "/dashboard/security" },
  { id: "settings",       label: "Settings",        icon: "Settings",        section: "system",     href: "/dashboard/settings" },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  unreadAlerts: number;
}

export default function Sidebar({ collapsed, setCollapsed, unreadAlerts }: SidebarProps) {
  const pathname = usePathname();

  const grouped = NAV.reduce<Record<string, typeof NAV>>((acc, item) => {
    (acc[item.section] = acc[item.section] || []).push(item);
    return acc;
  }, {});

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full z-50 flex flex-col transition-all duration-300",
        "bg-[#080c12] border-r border-[#0f1929]",
        collapsed ? "w-16" : "w-[220px]"
      )}
    >
      {/* ── Logo ── */}
      <div className={cn(
        "h-[60px] flex items-center gap-3 border-b border-[#0f1929] flex-shrink-0 px-4",
        collapsed && "justify-center px-0"
      )}>
        <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-glow-blue">
          <Zap className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div>
            <div className="font-display font-extrabold text-[17px] text-text-primary tracking-tight leading-none">PULSE</div>
            <div className="font-mono text-[9px] text-text-dim tracking-[0.15em] uppercase mt-0.5">Dashboard</div>
          </div>
        )}
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-2">
        {Object.entries(grouped).map(([section, items]) => (
          <div key={section} className="mb-2">
            {!collapsed && (
              <div className="text-[9px] font-bold text-[#1e2d3d] uppercase tracking-[0.15em] px-2.5 py-2">
                {SECTION_LABELS[section]}
              </div>
            )}
            {items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href);
              const Icon = ICON_MAP[item.icon];
              const badgeCount = item.badge === "alerts" ? unreadAlerts : null;
              const badgeLive = item.badge === "LIVE";

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "relative flex items-center gap-2.5 px-3 py-2.5 rounded-[9px] mb-1 text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-[#0f1929] border border-[#1e3a5f] text-brand-blue"
                      : "text-text-muted hover:text-text-secondary hover:bg-[#0f1929] border border-transparent"
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute right-0 top-[20%] bottom-[20%] w-[3px] bg-brand-blue rounded-l-[3px]" />
                  )}

                  {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}

                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate text-[12px]">{item.label}</span>
                      {badgeLive && (
                        <span className="text-[9px] font-extrabold bg-green-500/15 text-green-400 border border-green-500/25 px-1.5 py-0.5 rounded-full animate-pulse-slow">
                          LIVE
                        </span>
                      )}
                      {badgeCount !== null && badgeCount > 0 && (
                        <span className="text-[9px] font-extrabold bg-red-500/15 text-red-400 border border-red-500/25 min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                          {badgeCount}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── Footer: User + Collapse ── */}
      <div className="border-t border-[#0f1929] p-2 flex-shrink-0 space-y-2">
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-[9px] hover:bg-[#0f1929] transition-colors cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-sky-400 flex items-center justify-center text-[11px] font-extrabold text-white flex-shrink-0">
              A
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-semibold text-text-secondary truncate">Admin User</div>
              <div className="text-[10px] text-text-dim truncate">admin@pulse.dev</div>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-[9px] bg-surface-card border border-surface-border text-text-muted hover:text-text-secondary hover:bg-surface-elevated text-[11px] transition-all"
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : (
            <>
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
