interface SectionTitleProps {
  title: string;
  sub?: string;
  live?: boolean;
  action?: React.ReactNode;
}

export default function SectionTitle({ title, sub, live, action }: SectionTitleProps) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-[0.1em]">{title}</span>
          {live && (
            <span className="flex items-center gap-1 text-[9px] font-extrabold text-green-400 bg-green-500/10 border border-green-500/20 px-1.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
              LIVE
            </span>
          )}
        </div>
        {sub && <p className="text-[11px] text-text-dim mt-0.5">{sub}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
