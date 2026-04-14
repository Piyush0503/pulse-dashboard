export interface DataPoint {
  time: string;
  req: number;
  err: number;
  lat: number;
}

export interface RevenuePoint {
  time: string;
  rev: number;
  cost: number;
}

export interface ServerNode {
  id: string;
  name: string;
  region: string;
  status: "online" | "degraded" | "offline";
  cpu: number;
  mem: number;
  lat: number;
  disk: number;
}

export interface AlertItem {
  id: string;
  type: "error" | "warning" | "info" | "success";
  msg: string;
  src: string;
  time: string;
  acked: boolean;
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "admin" | "moderator" | "user";
  plan: "Enterprise" | "Pro" | "Basic";
  status: "active" | "suspended";
  joined: string;
  requests: number;
  revenue: number;
}

export interface TrafficSource {
  name: string;
  value: number;
  color: string;
}

export interface LiveMetrics {
  requests: number;
  revenue: number;
  users: number;
  errorRate: number;
  uptime: number;
  avgLatency: number;
}
