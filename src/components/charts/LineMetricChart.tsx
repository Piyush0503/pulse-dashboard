"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import ChartTooltip from "./ChartTooltip";

interface Series { key: string; name: string; color: string; }

interface Props {
  data: Record<string, unknown>[];
  series: Series[];
  height?: number;
  unit?: string;
}

export default function LineMetricChart({ data, series, height = 200, unit = "" }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#0f1929" vertical={false} />
        <XAxis dataKey="time" tick={{ fontSize: 9, fill: "#334155", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
        <YAxis tick={{ fontSize: 9, fill: "#334155", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}${unit}`} />
        <Tooltip content={(props) => <ChartTooltip {...props} unit={unit} />} />
        {series.map((s) => (
          <Line key={s.key} type="monotone" dataKey={s.key} name={s.name} stroke={s.color} strokeWidth={2} dot={false} activeDot={{ r: 4, fill: s.color, stroke: "#080c12", strokeWidth: 2 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
