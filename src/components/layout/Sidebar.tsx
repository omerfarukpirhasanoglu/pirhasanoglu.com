"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Settings,
  ChevronLeft,
  ChevronRight,
  Cpu,
  LucideIcon,
  ScanSearch,
} from "lucide-react";

interface MenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface NavItemProps {
  item: MenuItem;
  isCollapsed: boolean;
  pathname: string;
}

function NavItem({ item, isCollapsed, pathname }: NavItemProps) {
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 px-3 py-3 rounded-sm transition-all duration-250 soft-ease group relative
        ${isActive
          ? "bg-accent/10 text-accent font-medium"
          : "text-textMuted hover:bg-black/5 hover:text-stone-700"
        }`}
      title={isCollapsed ? item.name : ""}
    >
      <Icon className={`w-5 h-5 shrink-0 ${isActive ? "bg-linear-to-r from-accent to-[#ffd44f]" : "group-hover:text-stone-00"}`} />

      <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 soft-ease
        ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}>
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
    { name: "Chroma v1.0", href: "/dashboard/tool-1", icon: ImageIcon },
    { name: "Tensör İşleme", href: "/dashboard/tool-2", icon: Cpu },
    { name: "Nesne Tespiti", href: "/dashboard/tool-3", icon: ScanSearch },
  ];

  const bottomItems: MenuItem[] = [
    { name: "Ayarlar", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside
      className={`relative h-screen bg-surface border-r border-black/5 flex flex-col transition-all duration-300 soft-ease z-20
        ${isCollapsed ? "w-20" : "w-64"}`}
    >
      {/* Header */}
      <div className="h-20 flex items-center px-6 border-b border-black/5 shrink-0">
        <Link href="/" className="flex items-center gap-3 overflow-hidden whitespace-nowrap group w-full">
          <div className="w-8 h-8 rounded-sm text-accent flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow duration-300">
            <span className="text-background font-bold text-lg">OP</span>
          </div>
          <span className={`font-semibold text-lg tracking-tight transition-all duration-300 group-hover:text-accent
            ${isCollapsed ? "opacity-0 hidden" : "opacity-100"}`}>
            Ana Sayfa
          </span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1 custom-scrollbar">
        <div className={`px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider transition-opacity duration-300 ${isCollapsed ? "opacity-0" : "opacity-100"}`}>
          Araçlar
        </div>
        {menuItems.map((item) => (
          <NavItem key={item.href} item={item} isCollapsed={isCollapsed} pathname={pathname} />
        ))}
      </nav>

      <div className="p-3 border-t border-black/5 flex flex-col gap-1">
        {bottomItems.map((item) => (
          <NavItem key={item.href} item={item} isCollapsed={isCollapsed} pathname={pathname} />
        ))}
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-24 w-8 h-8 bg-surface border border-black/10 rounded-full flex items-center justify-center text-textMuted hover:text-white hover:border-black/20 transition-all duration-250 z-30 shadow-lg"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}