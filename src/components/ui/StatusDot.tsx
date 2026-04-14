import { cn } from "@/lib/utils";

type Status = "online" | "degraded" | "offline";

const config: Record<Status, { dot: string; text: string; label: string }> = {
  online:   { dot: "bg-emerald-400", text: "text-emerald-400", label: "Online"   },
  degraded: { dot: "bg-amber-400",   text: "text-amber-400",   label: "Degraded" },
  offline:  { dot: "bg-red-400",     text: "text-red-400",     label: "Offline"  },
};

export default function StatusDot({ status }: { status: Status }) {
  const c = config[status];
  return (
    <span className="relative inline-flex items-center gap-1.5">
      <span className="relative flex w-2 h-2">
        {status === "online" && (
          <span className={cn("absolute inset-0 rounded-full opacity-70 animate-ping", c.dot)} />
        )}
        <span className={cn("relative w-2 h-2 rounded-full", c.dot)} />
      </span>
      <span className={cn("text-[11px] font-semibold capitalize", c.text)}>{c.label}</span>
    </span>
  );
}
