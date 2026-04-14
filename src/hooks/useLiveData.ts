"use client";

import { useState, useEffect, useCallback } from "react";
import { genTimeSeries, genRevenue, ALERTS_INIT, INITIAL_METRICS } from "@/lib/data";
import { clamp, randInt } from "@/lib/utils";
import { TICK_INTERVAL } from "@/lib/constants";
import type { DataPoint, RevenuePoint, AlertItem, LiveMetrics } from "@/types";

export function useLiveData() {
  const [metrics, setMetrics] = useState<LiveMetrics>(INITIAL_METRICS);
  const [reqData, setReqData] = useState<DataPoint[]>(() => genTimeSeries(20));
  const [revData] = useState<RevenuePoint[]>(() => genRevenue(24));
  const [alerts, setAlerts] = useState<AlertItem[]>(ALERTS_INIT);
  const [tick, setTick] = useState(0);

  const tick_fn = useCallback(() => {
    setMetrics((prev) => ({
      requests: prev.requests + randInt(-10, 120),
      revenue: prev.revenue + randInt(-30, 200),
      users: clamp(prev.users + randInt(-3, 10), 10000, 20000),
      errorRate: clamp(prev.errorRate + (Math.random() - 0.5) * 0.05, 0, 5),
      uptime: clamp(prev.uptime + (Math.random() - 0.48) * 0.003, 99, 100),
      avgLatency: clamp(prev.avgLatency + randInt(-4, 4), 5, 200),
    }));
    setReqData((prev) => {
      const t = new Date();
      const newPoint: DataPoint = {
        time: t.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        req: randInt(300, 900),
        err: randInt(2, 35),
        lat: randInt(12, 80),
      };
      return [...prev.slice(-19), newPoint];
    });
    setTick((t) => t + 1);
  }, []);

  useEffect(() => {
    const id = setInterval(tick_fn, TICK_INTERVAL);
    return () => clearInterval(id);
  }, [tick_fn]);

  const unreadAlerts = alerts.filter((a) => !a.acked).length;

  return { metrics, reqData, revData, alerts, setAlerts, tick, unreadAlerts };
}
