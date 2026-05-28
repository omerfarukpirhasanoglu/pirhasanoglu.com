"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  ScanText,
  Loader,
  LucideIcon,
} from "lucide-react";

interface MenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

const menuItems: MenuItem[] = [
  { name: "Dashboard",   href: "/dashboard",        icon: LayoutDashboard },
  { name: "Chroma v1.2", href: "/dashboard/tool-1", icon: ImageIcon },
  { name: "Seam v1.1",   href: "/dashboard/tool-2", icon: ScanText },
  { name: "Yakında",     href: "/dashboard/tool-3", icon: Loader },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        width: expanded ? "210px" : "52px",
        transition: "width 0.30s cubic-bezier(0.22,1,0.36,1)",
        background: "transparent",
        borderRight: "0.5px solid rgba(23,20,42,0.08)",
        zIndex: 20,
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          height: "64px",
          padding: "0 14px",
          borderBottom: "0.5px solid rgba(23,20,42,0.07)",
          textDecoration: "none",
          flexShrink: 0,
          overflow: "hidden",
          whiteSpace: "nowrap",
          gap: "14px",
        }}
      >
        <span style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: "18px",
          color: "rgba(90,65,155,0.55)",
          flexShrink: 0,
          lineHeight: 1,
          width: "24px",
          textAlign: "center",
        }}>
          o
        </span>
        <span style={{
          fontFamily: "var(--font-nav)",
          fontSize: "15px",
          fontWeight: 400,
          color: "rgba(23,20,42,0.50)",
          opacity: expanded ? 1 : 0,
          transition: "opacity 0.20s",
          whiteSpace: "nowrap",
        }}>
          Ana Sayfa
        </span>
      </Link>

      {/* Nav */}
      <nav style={{
        flex: 1,
        padding: "14px 8px",
        display: "flex",
        flexDirection: "column",
        gap: "3px",
        overflow: "hidden",
      }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={!expanded ? item.name : ""}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "13px",
                padding: "10px 10px",
                borderRadius: "6px",
                textDecoration: "none",
                background: isActive ? "rgba(90,65,155,0.08)" : "transparent",
                transition: "background 0.15s",
                overflow: "hidden",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <Icon style={{
                width: "16px",
                height: "16px",
                flexShrink: 0,
                color: isActive ? "rgba(90,65,155,0.70)" : "rgba(23,20,42,0.28)",
                transition: "color 0.15s",
              }} />
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: isActive ? 500 : 400,
                color: isActive ? "rgba(90,65,155,0.72)" : "rgba(23,20,42,0.38)",
                opacity: expanded ? 1 : 0,
                transition: "opacity 0.18s",
                whiteSpace: "nowrap",
              }}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
