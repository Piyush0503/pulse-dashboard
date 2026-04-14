"use client";

import { useState } from "react";
import { Eye, EyeOff, Copy, RotateCcw } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import Toggle from "@/components/ui/Toggle";

type Theme = "dark" | "light" | "system";

export default function SettingsPage() {
  const [notif, setNotif] = useState({ email: true, slack: false, sms: false, webhook: true });
  const [theme, setTheme] = useState<Theme>("dark");
  const [saved, setSaved] = useState(false);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const API_KEYS = [
    { name: "Production Key",  key: "pk_live_3a8f2b9c4d1e5f7a",  created: "Jan 2024", perms: "Read/Write" },
    { name: "Read-Only Key",   key: "pk_ro_9b2c5d8e1f4a7b3c",    created: "Mar 2024", perms: "Read Only"  },
    { name: "Webhook Secret",  key: "wh_7e4f1a2b5c8d9e3f",       created: "Feb 2024", perms: "Webhook"    },
  ];

  return (
    <div className="p-6 flex flex-col gap-5 page-enter">
      <div>
        <h1 className="font-display text-[22px] font-extrabold text-text-primary tracking-tight">Settings</h1>
        <p className="text-[12px] text-text-muted mt-1">Profile, notifications, appearance and API keys</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Profile */}
        <Card>
          <SectionTitle title="Profile Settings" />
          <div className="flex items-center gap-3.5 p-3.5 bg-surface-elevated rounded-[10px] border border-surface-border mb-5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-sky-400 flex items-center justify-center text-[20px] font-extrabold text-white flex-shrink-0">A</div>
            <div>
              <div className="text-[14px] font-bold text-text-primary">Admin User</div>
              <div className="text-[11px] text-text-dim">admin@pulse.dev</div>
              <div className="text-[10px] text-indigo-400 font-semibold mt-0.5">Administrator · Enterprise</div>
            </div>
          </div>
          <div className="space-y-3.5">
            {[
              { l: "Display Name", v: "Admin User" },
              { l: "Email Address", v: "admin@pulse.dev" },
              { l: "Timezone", v: "IST (UTC+5:30)" },
              { l: "Language", v: "English (India)" },
            ].map((f) => (
              <div key={f.l}>
                <label className="text-[11px] text-text-dim font-semibold block mb-1.5">{f.l}</label>
                <input
                  defaultValue={f.v}
                  className="w-full bg-surface-input border border-surface-border rounded-[8px] px-3 py-2 text-[12px] text-text-secondary focus:border-brand-blue/50 outline-none transition-colors"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Notifications + Theme */}
        <div className="flex flex-col gap-4">
          <Card>
            <SectionTitle title="Notifications" />
            <div className="space-y-2">
              {(Object.keys(notif) as (keyof typeof notif)[]).map((ch) => (
                <div
                  key={ch}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-[9px] border transition-all ${
                    notif[ch] ? "bg-sky-500/5 border-sky-500/20" : "bg-surface-elevated border-surface-border"
                  }`}
                >
                  <div>
                    <div className="text-[12px] font-semibold text-text-secondary capitalize">
                      {ch === "sms" ? "SMS" : ch.charAt(0).toUpperCase() + ch.slice(1)} Notifications
                    </div>
                    <div className="text-[10px] text-text-dim mt-0.5">{notif[ch] ? "Currently enabled" : "Currently disabled"}</div>
                  </div>
                  <Toggle enabled={notif[ch]} onChange={() => setNotif((prev) => ({ ...prev, [ch]: !prev[ch] }))} />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <SectionTitle title="Appearance" />
            <div className="flex gap-2">
              {(["dark", "light", "system"] as Theme[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`flex-1 py-3 rounded-[9px] text-[11px] font-semibold capitalize transition-all border ${
                    theme === t
                      ? "bg-sky-500/15 border-sky-500/30 text-brand-blue"
                      : "bg-surface-elevated border-surface-border text-text-dim hover:text-text-muted"
                  }`}
                >
                  {t === "dark" ? "🌙" : t === "light" ? "☀️" : "💻"} {t}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* API Keys */}
      <Card>
        <SectionTitle title="API Keys" sub="Manage your application credentials" />
        <div className="space-y-2.5">
          {API_KEYS.map((k) => (
            <div key={k.name} className="flex items-center gap-3 px-4 py-3.5 bg-surface-elevated rounded-[10px] border border-surface-border">
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold text-text-secondary mb-1">{k.name}</div>
                <div className="font-mono text-[11px] text-text-dim">
                  {showKeys[k.name] ? k.key : k.key.slice(0, 10) + "••••••••••••"}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[10px] px-2 py-0.5 rounded-[6px] bg-sky-500/10 border border-sky-500/20 text-sky-400 font-semibold">{k.perms}</span>
                <span className="text-[10px] text-text-dim">{k.created}</span>
                <button
                  onClick={() => setShowKeys((prev) => ({ ...prev, [k.name]: !prev[k.name] }))}
                  className="p-1.5 rounded-[6px] bg-surface-card border border-surface-border text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showKeys[k.name] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => navigator.clipboard?.writeText(k.key)}
                  className="p-1.5 rounded-[6px] bg-surface-card border border-surface-border text-text-muted hover:text-text-secondary transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 rounded-[6px] bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors">
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={save}
          className="px-6 py-2.5 rounded-[9px] bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-[12px] font-bold hover:opacity-90 transition-opacity"
        >
          {saved ? "✓ All Settings Saved!" : "Save All Settings"}
        </button>
        <button className="px-4 py-2.5 rounded-[9px] bg-surface-card border border-surface-border text-text-muted text-[12px] hover:text-text-secondary transition-colors">
          Reset to Defaults
        </button>
        <div className="ml-auto">
          <button className="px-4 py-2.5 rounded-[9px] bg-red-500/10 border border-red-500/20 text-brand-red text-[12px] font-semibold hover:bg-red-500/20 transition-colors">
            🗑 Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
