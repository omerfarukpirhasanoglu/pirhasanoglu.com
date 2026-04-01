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
          : "text-gray-400 hover:bg-white/5 hover:text-gray-100"
        }`}
      title={isCollapsed ? item.name : ""}
    >
      <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? "text-accent" : "group-hover:text-gray-200"}`} />

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
    { name: "Chroma v1.2", href: "/dashboard/tool-1", icon: ImageIcon },
    { name: "Tensör İşleme", href: "/dashboard/tool-2", icon: Cpu },
    { name: "Nesne Tespiti", href: "/dashboard/tool-3", icon: ScanSearch },
  ];

  const bottomItems: MenuItem[] = [
    { name: "Ayarlar", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside
      className={`relative h-screen bg-black/40 backdrop-blur-md border-r border-white/10 flex flex-col transition-all duration-300 soft-ease z-20
        ${isCollapsed ? "w-20" : "w-64"}`}
    >
      {/* Header */}
      <div className="h-20 flex items-center px-5 border-b border-white/10 shrink-0 overflow-hidden">
        <Link href="/" className="flex items-center gap-3 overflow-hidden whitespace-nowrap group w-full">
          <div className="w-8 h-8 rounded-sm bg-linear-to-br from-accent to-[#ffd44f] flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow duration-300">
            <span className="text-[#1a0808] font-bold text-lg">OP</span>
          </div>
          <span className={`font-semibold text-lg tracking-tight text-gray-100 transition-all duration-300 group-hover:text-accent
            ${isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100 w-auto"}`}>
            Ana Sayfa
          </span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 flex flex-col gap-1 custom-scrollbar">
        <div className={`px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? "opacity-0 h-0" : "opacity-100 h-auto"}`}>
          Araçlar
        </div>
        {menuItems.map((item) => (
          <NavItem key={item.href} item={item} isCollapsed={isCollapsed} pathname={pathname} />
        ))}
      </nav>

      <div className="p-3 border-t border-white/10 flex flex-col gap-1 overflow-hidden">
        {bottomItems.map((item) => (
          <NavItem key={item.href} item={item} isCollapsed={isCollapsed} pathname={pathname} />
        ))}
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-24 w-8 h-8 bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all duration-250 z-30 shadow-lg"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4 shrink-0" /> : <ChevronLeft className="w-4 h-4 shrink-0" />}
      </button>
    </aside>
  );
}