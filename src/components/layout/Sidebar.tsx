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

// item: any yerine gerçek bir interface tanımladık
interface MenuItem {
  name: string;
  href: string;
  icon: LucideIcon; // lucide-react ikonları için doğru tip bu
}

// NavItem, Sidebar'ın dışına çıkarıldı — artık her render'da yeniden oluşturulmuyor
// isCollapsed ve pathname dışarıdan prop olarak geliyor
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
      className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-250 soft-ease group relative
        ${isActive
          ? "bg-accent/10 text-accent font-medium"
          : "text-textMuted hover:bg-white/5 hover:text-gray-200"
        }`}
      title={isCollapsed ? item.name : ""}
    >
      <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-accent" : "group-hover:text-gray-200"}`} />

      <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 soft-ease
        ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}>
        {item.name}
      </span>

      {isActive && !isCollapsed && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-r-full" />
      )}
    </Link>
  );
}

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // Tip MenuItem[] — yanlış alan yazsak TypeScript anında uyarır
  const menuItems: MenuItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Görüntü Analizi", href: "/dashboard/tool-1", icon: ImageIcon },
    { name: "Sistem Modeli", href: "/dashboard/tool-2", icon: Cpu },
    { name: "Nesne Tespiti", href: "/dashboard/tool-3", icon: ScanSearch },
  ];

  const bottomItems: MenuItem[] = [
    { name: "Ayarlar", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside
      className={`relative h-screen bg-surface border-r border-white/5 flex flex-col transition-all duration-300 soft-ease z-20
        ${isCollapsed ? "w-20" : "w-64"}`}
    >
      {/* Header */}
      <div className="h-20 flex items-center px-6 border-b border-white/5 shrink-0">
        <Link href="/" className="flex items-center gap-3 overflow-hidden whitespace-nowrap group w-full">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-accent to-orange-600 flex items-center justify-center shrink-0 shadow-lg shadow-accent/20 group-hover:shadow-accent/40 transition-shadow duration-300">
            <span className="text-background font-bold text-lg">AI</span>
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

      <div className="p-3 border-t border-white/5 flex flex-col gap-1">
        {bottomItems.map((item) => (
          <NavItem key={item.href} item={item} isCollapsed={isCollapsed} pathname={pathname} />
        ))}
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-24 w-8 h-8 bg-surface border border-white/10 rounded-full flex items-center justify-center text-textMuted hover:text-white hover:border-white/20 transition-all duration-250 z-30 shadow-lg"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}