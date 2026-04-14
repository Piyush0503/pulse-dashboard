import type { DataPoint, RevenuePoint, ServerNode, AlertItem, UserRecord, TrafficSource } from "@/types";
import { randInt, clamp } from "./utils";

export function genTimeSeries(n = 20): DataPoint[] {
  return Array.from({ length: n }, (_, i) => {
    const t = new Date(Date.now() - (n - i) * 3000);
    return {
      time: t.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      req: randInt(300, 900),
      err: randInt(2, 30),
      lat: randInt(12, 80),
    };
  });
}

export function genRevenue(n = 24): RevenuePoint[] {
  let v = 12000;
  return Array.from({ length: n }, (_, i) => {
    v = clamp(v + (Math.random() - 0.4) * 1500, 7000, 22000);
    return {
      time: `${String(i).padStart(2, "0")}:00`,
      rev: Math.round(v),
      cost: Math.round(v * 0.4),
    };
  });
}

export const SERVERS: ServerNode[] = [
  { id: "s1", name: "api-prod-01", region: "US East", status: "online", cpu: 42, mem: 67, lat: 12, disk: 34 },
  { id: "s2", name: "api-prod-02", region: "US West", status: "online", cpu: 31, mem: 54, lat: 18, disk: 28 },
  { id: "s3", name: "db-primary", region: "EU West", status: "degraded", cpu: 78, mem: 82, lat: 45, disk: 71 },
  { id: "s4", name: "cache-01", region: "AP South", status: "online", cpu: 15, mem: 29, lat: 8, disk: 15 },
  { id: "s5", name: "worker-01", region: "US East", status: "offline", cpu: 0, mem: 0, lat: 0, disk: 0 },
  { id: "s6", name: "cdn-edge-01", region: "Global", status: "online", cpu: 23, mem: 41, lat: 5, disk: 22 },
  { id: "s7", name: "db-replica", region: "EU West", status: "online", cpu: 38, mem: 61, lat: 22, disk: 58 },
  { id: "s8", name: "api-staging", region: "US West", status: "online", cpu: 19, mem: 35, lat: 14, disk: 19 },
];

export const ALERTS_INIT: AlertItem[] = [
  { id: "a1", type: "error", msg: "Database connection pool exhausted", src: "db-primary", time: "2m ago", acked: false },
  { id: "a2", type: "warning", msg: "CPU usage above 75% threshold on db-primary", src: "db-primary", time: "5m ago", acked: false },
  { id: "a3", type: "info", msg: "Scheduled maintenance window starts in 2h", src: "system", time: "12m ago", acked: true },
  { id: "a4", type: "error", msg: "worker-01 health check failed (timeout)", src: "worker-01", time: "18m ago", acked: false },
  { id: "a5", type: "success", msg: "Deployment v2.4.1 completed successfully", src: "ci/cd", time: "34m ago", acked: true },
  { id: "a6", type: "warning", msg: "Memory usage approaching limit on db-primary", src: "db-primary", time: "41m ago", acked: false },
  { id: "a7", type: "info", msg: "SSL certificate renewed for api.pulse.dev", src: "security", time: "1h ago", acked: true },
  { id: "a8", type: "error", msg: "Redis cache eviction rate spike detected", src: "cache-01", time: "2h ago", acked: false },
];

export const USERS_LIST: UserRecord[] = [
  { id: "u1", name: "Arjun Sharma", email: "arjun@pulse.dev", role: "admin", plan: "Enterprise", status: "active", joined: "Jan 2024", requests: 48291, revenue: 8420 },
  { id: "u2", name: "Priya Patel", email: "priya@acme.com", role: "user", plan: "Pro", status: "active", joined: "Mar 2024", requests: 12847, revenue: 2190 },
  { id: "u3", name: "Rahul Mehta", email: "rahul@startup.io", role: "user", plan: "Pro", status: "active", joined: "Feb 2024", requests: 9302, revenue: 1840 },
  { id: "u4", name: "Sneha Gupta", email: "sneha@corp.in", role: "moderator", plan: "Enterprise", status: "active", joined: "Dec 2023", requests: 31420, revenue: 5610 },
  { id: "u5", name: "Vikram Singh", email: "vikram@dev.co", role: "user", plan: "Basic", status: "suspended", joined: "Apr 2024", requests: 2140, revenue: 290 },
  { id: "u6", name: "Anita Desai", email: "anita@fintech.in", role: "user", plan: "Pro", status: "active", joined: "May 2024", requests: 7830, revenue: 1430 },
  { id: "u7", name: "Dev Kumar", email: "dev@ml.ai", role: "user", plan: "Basic", status: "active", joined: "Jun 2024", requests: 3210, revenue: 480 },
  { id: "u8", name: "Riya Shah", email: "riya@saas.com", role: "admin", plan: "Enterprise", status: "active", joined: "Nov 2023", requests: 52110, revenue: 9840 },
];

export const TRAFFIC: TrafficSource[] = [
  { name: "Direct API", value: 38, color: "#38bdf8" },
  { name: "Web App", value: 27, color: "#818cf8" },
  { name: "Mobile", value: 19, color: "#34d399" },
  { name: "Partners", value: 11, color: "#fb923c" },
  { name: "Other", value: 5, color: "#64748b" },
];

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const HOURS = Array.from({ length: 24 }, (_, i) => i);

export const HEATMAP = DAYS.map((_, d) =>
  HOURS.map((h) => {
    const isWk = d >= 5, isPk = h >= 9 && h <= 18;
    return Math.random() * (isWk ? 0.4 : isPk ? 0.8 : 0.3) + Math.random() * 0.2;
  })
);

export const INITIAL_METRICS = {
  requests: 148392,
  revenue: 94210,
  users: 12847,
  errorRate: 0.24,
  uptime: 99.97,
  avgLatency: 28,
};
