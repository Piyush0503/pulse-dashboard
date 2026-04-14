"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import ChartTooltip from "./ChartTooltip";

interface Series {
  key: string;
  name: string;
  color: string;
}

interface Props {
  data: Record<string, unknown>[];
  series: Series[];
  height?: number;
  unit?: string;
  formatter?: (v: number) => string;
}

export default function AreaMetricChart({ data = [], series = [], height = 200, unit = "", formatter }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
        <defs>
          {series.map((s) => (
            <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={s.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#0f1929" vertical={false} />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 9, fill: "#334155", fontFamily: "JetBrains Mono, monospace" }}
          axisLine={false} tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fontSize: 9, fill: "#334155", fontFamily: "JetBrains Mono, monospace" }}
          axisLine={false} tickLine={false}
          tickFormatter={(v) => formatter ? formatter(v) : `${v}${unit}`}
        />
        <Tooltip content={(props) => <ChartTooltip  {...(props as any)} unit={unit} formatter={formatter} />} />
        {series.map((s) => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.name}
            stroke={s.color}
            fill={`url(#grad-${s.key})`}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: s.color, stroke: "#080c12", strokeWidth: 2 }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
