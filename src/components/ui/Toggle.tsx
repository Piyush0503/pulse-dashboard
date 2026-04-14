"use client";

interface ToggleProps {
  enabled: boolean;
  onChange: () => void;
}

export default function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      onClick={onChange}
      className={`relative w-[44px] h-6 rounded-full border-2 transition-all duration-200 flex-shrink-0 toggle-track ${
        enabled
          ? "bg-[#1e3a5f] border-brand-blue"
          : "bg-surface-border border-surface-elevated"
      }`}
    >
      <div
        className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200 toggle-thumb ${
          enabled ? "left-5 bg-brand-blue" : "left-0.5 bg-text-dim"
        }`}
      />
    </button>
  );
}
