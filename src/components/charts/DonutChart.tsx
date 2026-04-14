"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import ChartTooltip from "./ChartTooltip";
import type { TrafficSource } from "@/types";

interface Props {
  data: TrafficSource[];
  height?: number;
}

export default function DonutChart({ data, height = 150 }: Props) {
  return (
    <div className="flex items-center gap-5">
      <ResponsiveContainer width={140} height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={42}
            outerRadius={65}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={(props) => <ChartTooltip {...(props as any)} unit="%" />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex-1 space-y-2.5">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: item.color }} />
              <span className="text-[11px] text-text-muted">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-14 h-1 rounded-full bg-surface-border overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${item.value}%`, background: item.color }} />
              </div>
              <span className="text-[11px] font-mono text-text-secondary w-7 text-right">{item.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
