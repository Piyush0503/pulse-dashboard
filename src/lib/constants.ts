export const TICK_INTERVAL = 2500; // ms between live data updates

export const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: "LayoutDashboard", section: "main" },
  { id: "metrics", label: "Live Metrics", icon: "Activity", section: "main", badge: "LIVE" },
  { id: "infrastructure", label: "Infrastructure", icon: "Server", section: "main" },
  { id: "analytics", label: "Analytics", icon: "BarChart3", section: "main" },
  { id: "alerts", label: "Alerts", icon: "Bell", section: "main", badge: "alerts" },
  { id: "users", label: "User Panel", icon: "Users", section: "management" },
  { id: "admin", label: "Admin Panel", icon: "Shield", section: "management" },
  { id: "security", label: "Security", icon: "Lock", section: "management" },
  { id: "settings", label: "Settings", icon: "Settings", section: "system" },
] as const;

export type PageId = typeof NAV_ITEMS[number]["id"];

export const SECTION_LABELS: Record<string, string> = {
  main: "Core",
  management: "Management",
  system: "System",
};
