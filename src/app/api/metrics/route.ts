import { NextResponse } from "next/server";
import { randInt, clamp } from "@/lib/utils";

// Simulated server-side metrics state
let state = {
  requests: 148392,
  revenue: 94210,
  users: 12847,
  errorRate: 0.24,
  uptime: 99.97,
  avgLatency: 28,
};

export async function GET() {
  // Mutate state to simulate live updates
  state = {
    requests: state.requests + randInt(-10, 120),
    revenue: state.revenue + randInt(-30, 200),
    users: clamp(state.users + randInt(-3, 10), 10000, 20000),
    errorRate: clamp(state.errorRate + (Math.random() - 0.5) * 0.05, 0, 5),
    uptime: clamp(state.uptime + (Math.random() - 0.48) * 0.003, 99, 100),
    avgLatency: clamp(state.avgLatency + randInt(-4, 4), 5, 200),
  };

  return NextResponse.json({
    ...state,
    timestamp: new Date().toISOString(),
    dataPoint: {
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      req: randInt(300, 900),
      err: randInt(2, 35),
      lat: randInt(12, 80),
    },
  });
}
