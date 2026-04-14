# ⚡ Pulse — Realtime Dashboard

A production-grade **realtime analytics & infrastructure monitoring dashboard** built with **Next.js 14 App Router**, **React 18**, **TypeScript**, and **Tailwind CSS**.

---

## 📁 Full File Structure

```
pulse-dashboard/
│
├── src/
│   ├── app/
│   │   ├── globals.css                        # Global styles, fonts, animations
│   │   ├── layout.tsx                         # Root HTML layout
│   │   ├── page.tsx                           # Redirect / → /dashboard/overview
│   │   ├── api/
│   │   │   └── metrics/
│   │   │       └── route.ts                   # GET /api/metrics — live data API
│   │   └── dashboard/
│   │       ├── layout.tsx                     # Dashboard shell (Sidebar + Topbar)
│   │       ├── overview/page.tsx              # Overview page route
│   │       ├── metrics/page.tsx               # Live Metrics page route
│   │       ├── infrastructure/page.tsx        # Infrastructure page route
│   │       ├── analytics/page.tsx             # Analytics page route
│   │       ├── alerts/page.tsx                # Alerts page route
│   │       ├── users/page.tsx                 # User Panel page route
│   │       ├── admin/page.tsx                 # Admin Panel page route
│   │       ├── security/page.tsx              # Security page route
│   │       └── settings/page.tsx              # Settings page route
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── DashboardShell.tsx             # Client shell + LiveData Context
│   │   │   ├── Sidebar.tsx                    # Collapsible nav with active states
│   │   │   └── Topbar.tsx                     # Header with live clock & search
│   │   │
│   │   ├── charts/
│   │   │   ├── AreaMetricChart.tsx            # Recharts area chart (reusable)
│   │   │   ├── LineMetricChart.tsx            # Recharts line chart (reusable)
│   │   │   ├── BarMetricChart.tsx             # Recharts bar chart (reusable)
│   │   │   ├── DonutChart.tsx                 # Traffic donut + legend
│   │   │   ├── ActivityHeatmap.tsx            # Day × hour heatmap grid
│   │   │   └── ChartTooltip.tsx               # Shared custom tooltip
│   │   │
│   │   ├── ui/
│   │   │   ├── Card.tsx                       # Base card with optional glow
│   │   │   ├── MetricCard.tsx                 # KPI card with trend badge
│   │   │   ├── SectionTitle.tsx               # Section header with LIVE badge
│   │   │   ├── StatusDot.tsx                  # Online/Degraded/Offline dot
│   │   │   ├── MiniBar.tsx                    # Inline progress bar
│   │   │   ├── Toggle.tsx                     # Animated toggle switch
│   │   │   └── Badge.tsx                      # Coloured status badge
│   │   │
│   │   └── pages/
│   │       ├── OverviewPage.tsx               # Overview — KPIs, charts, summary
│   │       ├── MetricsPage.tsx                # Live Metrics — req, latency, errors
│   │       ├── InfrastructurePage.tsx         # Servers — table + detail panel
│   │       ├── AnalyticsPage.tsx              # Analytics — heatmap, geo, funnel
│   │       ├── AlertsPage.tsx                 # Alerts — feed, filters, ack
│   │       ├── UsersPage.tsx                  # Users — table, search, detail
│   │       ├── AdminPage.tsx                  # Admin — tabs: overview/config/flags/audit/billing
│   │       ├── SecurityPage.tsx               # Security — threats, SSL, score
│   │       └── SettingsPage.tsx               # Settings — profile, notif, theme, API keys
│   │
│   ├── hooks/
│   │   ├── useLiveData.ts                     # Live metrics + chart data (2.5s ticks)
│   │   └── useClock.ts                        # Real-time HH:MM:SS clock
│   │
│   ├── lib/
│   │   ├── data.ts                            # All mock data generators & constants
│   │   ├── utils.ts                           # cn(), fmt(), fmtUSD(), fmtTime()
│   │   └── constants.ts                       # Nav items, page IDs, section labels
│   │
│   └── types/
│       └── index.ts                           # TypeScript interfaces
│
├── public/                                    # Static assets
├── tailwind.config.ts                         # Tailwind config with custom theme
├── tsconfig.json
├── next.config.js
├── postcss.config.js
└── package.json
```

---

## 🚀 Quick Start

```bash
# 1. Unzip and enter directory
unzip pulse-dashboard.zip
cd pulse-dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

The app redirects to `/dashboard/overview` automatically.

---

## 🔥 Features

| Feature | Details |
|---|---|
| **Live Data** | KPIs and charts auto-update every 2.5s via `useLiveData` hook |
| **9 Pages** | Overview, Live Metrics, Infrastructure, Analytics, Alerts, User Panel, Admin Panel, Security, Settings |
| **Dynamic Routing** | Next.js App Router — each page is a real URL |
| **Active Sidebar** | Highlights current page using `usePathname()` |
| **Live Clock** | Real-time HH:MM:SS via `useClock` hook |
| **Alerts Ack** | Acknowledge single or all alerts; badge updates live |
| **Server Restart** | Click "Restart" on offline nodes to bring them back online |
| **User Management** | Search, filter, suspend/restore, view detail panel |
| **Admin Tabs** | Overview · Configuration · Feature Flags · Audit Log · Billing |
| **Feature Flags** | Animated toggle switches with live state |
| **API Keys** | Show/hide, copy-to-clipboard, revoke |
| **Security** | Threat feed, SSL certs, blocked IP unblock, security score |
| **Collapsible Sidebar** | Icon-only or full label mode |

---

## 🎨 Tech Stack

| Tool | Purpose |
|---|---|
| **Next.js 14** | App Router, SSR, API Routes |
| **React 18** | UI with hooks |
| **TypeScript** | Full type safety |
| **Tailwind CSS** | Dark theme, custom tokens, utility classes |
| **Recharts** | Area, Line, Bar, Pie charts |
| **Lucide React** | Icon library |
| **Zustand** | (installed, ready for state management expansion) |
| **Google Fonts** | Syne (display) · DM Sans (body) · JetBrains Mono (numbers) |

---

## 📡 API Route

`GET /api/metrics` returns a live JSON payload:

```json
{
  "requests": 148512,
  "revenue": 94380,
  "users": 12851,
  "errorRate": 0.23,
  "uptime": 99.971,
  "avgLatency": 26,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "dataPoint": { "time": "10:30:00 AM", "req": 742, "err": 18, "lat": 34 }
}
```

---

> Built as a portfolio/resume demo. All data is simulated — swap in real API calls to make it production-ready.
