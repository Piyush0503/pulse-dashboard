import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pulse — Realtime Dashboard",
  description: "Professional realtime analytics and infrastructure monitoring dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-surface-base text-text-primary min-h-screen">{children}</body>
    </html>
  );
}
