"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  ScanText,
  Loader,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
} from "lucide-react";

interface MenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

function NavItem({
  item,
  isCollapsed,
  pathname,
}: {
  item: MenuItem;
  isCollapsed: boolean;
  pathname: string;
}) {
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      title={isCollapsed ? item.name : ""}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "9px 12px",
        borderRadius: "6px",
        textDecoration: "none",
        transition: "background 0.15s",
        background: isActive ? "rgba(100,80,160,0.08)" : "transparent",
        color: isActive ? "rgba(100,80,160,0.80)" : "rgba(25,22,46,0.40)",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <Icon
        style={{
          width: "16px",
          height: "16px",
          flexShrink: 0,
          color: isActive ? "rgba(100,80,160,0.75)" : "rgba(25,22,46,0.35)",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "12.5px",
          fontWeight: isActive ? 500 : 400,
          overflow: "hidden",
          width: isCollapsed ? 0 : "auto",
          opacity: isCollapsed ? 0 : 1,
          transition: "width 0.25s, opacity 0.2s",
        }}
      >
        {item.name}
      </span>
    </Link>
  );
}

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Chroma v1.2", href: "/dashboard/tool-1", icon: ImageIcon },
    { name: "Seam v1.1", href: "/dashboard/tool-2", icon: ScanText },
    { name: "Yakında", href: "/dashboard/tool-3", icon: Loader },
  ];

  return (
    <aside
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        width: isCollapsed ? "64px" : "220px",
        transition: "width 0.25s cubic-bezier(0.22,1,0.36,1)",
        background: "rgba(255,255,255,0.40)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRight: "0.5px solid rgba(25,22,46,0.08)",
        zIndex: 20,
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <div
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          borderBottom: "0.5px solid rgba(25,22,46,0.07)",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              background: "rgba(100,80,160,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              border: "0.5px solid rgba(100,80,160,0.18)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "13px",
                fontWeight: 600,
                color: "rgba(100,80,160,0.80)",
                letterSpacing: "-0.02em",
              }}
            >
              OP
            </span>
          </div>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              fontWeight: 500,
              color: "rgba(25,22,46,0.60)",
              overflow: "hidden",
              width: isCollapsed ? 0 : "auto",
              opacity: isCollapsed ? 0 : 1,
              transition: "width 0.25s, opacity 0.2s",
            }}
          >
            Ana Sayfa
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: "16px 8px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {!isCollapsed && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(25,22,46,0.20)",
              padding: "4px 12px 8px",
            }}
          >
            Araçlar
          </p>
        )}
        {menuItems.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            isCollapsed={isCollapsed}
            pathname={pathname}
          />
        ))}
      </nav>

      {/* Collapse button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          position: "absolute",
          right: "-14px",
          top: "80px",
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.80)",
          backdropFilter: "blur(8px)",
          border: "0.5px solid rgba(25,22,46,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 30,
          color: "rgba(25,22,46,0.40)",
        }}
      >
        {isCollapsed
          ? <ChevronRight style={{ width: "13px", height: "13px" }} />
          : <ChevronLeft style={{ width: "13px", height: "13px" }} />
        }
      </button>
    </aside>
  );
}
