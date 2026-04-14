interface TooltipPayload {
  color: string;
  value: number;
  name: string;
}

interface Props {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
  unit?: string;
  formatter?: (v: number) => string;
}

export default function ChartTooltip({ active, payload, label, unit = "", formatter }: Props) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#131f2e] border border-[#1e2d3d] rounded-[10px] px-3 py-2.5 text-xs shadow-xl">
      <p className="text-text-dim font-mono mb-1.5">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 mb-1 last:mb-0">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
          <span className="text-text-primary font-bold font-mono">
            {formatter ? formatter(p.value) : `${p.value.toLocaleString()}${unit}`}
          </span>
          <span className="text-text-muted">{p.name}</span>
        </div>
      ))}
    </div>
  );
}
