"use client";

import { HEATMAP, DAYS, HOURS } from "@/lib/data";

function getColor(v: number) {
  if (v < 0.15) return "#0a1220";
  if (v < 0.35) return "#0c2a4a";
  if (v < 0.55) return "#0f3d6e";
  if (v < 0.75) return "#1565a8";
  return "#38bdf8";
}

export default function ActivityHeatmap() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[460px]">
        {/* Hour labels */}
        <div className="flex mb-1.5 ml-8">
          {HOURS.map((h) => (
            <div key={h} className="flex-1 text-center font-mono" style={{ fontSize: 8, color: "#334155" }}>
              {h % 4 === 0 ? `${h}h` : ""}
            </div>
          ))}
        </div>

        {/* Grid */}
        {DAYS.map((day, d) => (
          <div key={day} className="flex items-center mb-1">
            <div className="w-7 text-right pr-1.5 flex-shrink-0" style={{ fontSize: 10, color: "#334155" }}>
              {day}
            </div>
            <div className="flex flex-1 gap-0.5">
              {HOURS.map((h) => (
                <div
                  key={h}
                  className="flex-1 rounded-[2px] cursor-pointer transition-transform hover:scale-110"
                  style={{ height: 11, background: getColor(HEATMAP[d][h]) }}
                  title={`${day} ${h}:00 — ${Math.round(HEATMAP[d][h] * 100)}% activity`}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-3 ml-8">
          <span className="text-[10px] text-text-dim">Less</span>
          {["#0a1220", "#0c2a4a", "#0f3d6e", "#1565a8", "#38bdf8"].map((c) => (
            <div key={c} className="w-3 h-3 rounded-[2px]" style={{ background: c }} />
          ))}
          <span className="text-[10px] text-text-dim">More</span>
        </div>
      </div>
    </div>
  );
}
