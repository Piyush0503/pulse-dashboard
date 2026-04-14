"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import ChartTooltip from "./ChartTooltip";

interface Series { key: string; name: string; color: string; }

interface Props {
  data: Record<string, unknown>[];
  series: Series[];
  height?: number;
  formatter?: (v: number) => string;
  unit?: string;
}

export default function BarMetricChart({ data, series, height = 160, formatter, unit = "" }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} barSize={8} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#0f1929" vertical={false} />
        <XAxis dataKey="time" tick={{ fontSize: 9, fill: "#334155", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} interval={Math.floor(data.length / 6)} />
        <YAxis tick={{ fontSize: 9, fill: "#334155", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} tickFormatter={(v) => formatter ? formatter(v) : `${v}${unit}`} />
        <Tooltip content={(props) => <ChartTooltip {...props} unit={unit} formatter={formatter} />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
        {series.map((s) => (
          <Bar key={s.key} dataKey={s.key} name={s.name} fill={s.color} opacity={0.7} radius={[3, 3, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
