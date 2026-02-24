"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconLayoutDashboard,
  IconUsers,
  IconTrophy,
  IconBuilding,
  IconCalendar,
  IconListDetails,
  IconClipboardList,
  IconTable,
  IconChartBar,
  IconMedal,
  IconAward,
  IconBell,
  IconShieldCheck,
} from "@tabler/icons-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mainNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: IconLayoutDashboard },
];

const managementNav: NavItem[] = [
  { label: "Users", href: "/users", icon: IconUsers },
  { label: "Matches", href: "/matches", icon: IconTrophy },
  { label: "Organizations", href: "/organizations", icon: IconBuilding },
];

const ligaNav: NavItem[] = [
  { label: "Seasons", href: "/liga/seasons", icon: IconCalendar },
  { label: "Fixtures", href: "/liga/fixtures", icon: IconListDetails },
  { label: "Registrations", href: "/liga/registrations", icon: IconClipboardList },
  { label: "Standings", href: "/liga/standings", icon: IconTable },
];

const analyticsNav: NavItem[] = [
  { label: "Analytics", href: "/analytics", icon: IconChartBar },
  { label: "Tournaments", href: "/tournaments", icon: IconMedal },
];

const systemNav: NavItem[] = [
  { label: "Badges", href: "/system/badges", icon: IconAward },
  { label: "Notifications", href: "/system/notifications", icon: IconBell },
  { label: "Audit Log", href: "/system/audit", icon: IconShieldCheck },
];

function NavGroup({
  label,
  items,
  pathname,
}: {
  label?: string;
  items: NavItem[];
  pathname: string;
}) {
  return (
    <SidebarGroup>
      {label && (
        <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8E8E93]/50 px-3 mb-1">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.label}
                  className={cn(
                    "relative rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-[rgba(210,248,2,0.08)] text-[#D2F802] font-medium shadow-[inset_0_0_12px_rgba(210,248,2,0.04)]"
                      : "text-[#A1A1A6] hover:text-[#F5F5F7] hover:bg-[#2C2C2E]/60"
                  )}
                >
                  <Link href={item.href}>
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-[#D2F802] shadow-[0_0_8px_rgba(210,248,2,0.4)]" />
                    )}
                    <item.icon className={cn("!size-[18px]", isActive ? "text-[#D2F802]" : "text-[#A1A1A6]")} />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-white/[0.06] bg-[#1C1C1E]">
      <SidebarHeader className="px-4 py-5">
        <Link href="/dashboard" className="group flex items-center gap-2.5">
          <span className="text-xl font-bold tracking-tight text-[#D2F802] drop-shadow-[0_0_8px_rgba(210,248,2,0.3)] transition-all duration-200 group-hover:drop-shadow-[0_0_12px_rgba(210,248,2,0.5)]">RNKD</span>
          <span className="text-sm font-medium text-[#A1A1A6] transition-colors duration-200 group-hover:text-[#F5F5F7]">Admin</span>
        </Link>
        <div className="mt-3 h-px bg-gradient-to-r from-[#D2F802]/25 via-white/[0.04] to-transparent" />
      </SidebarHeader>



      <SidebarContent className="px-1">
        <NavGroup items={mainNav} pathname={pathname} />
        <SidebarSeparator className="bg-white/[0.06] mx-3" />
        <NavGroup label="Management" items={managementNav} pathname={pathname} />
        <SidebarSeparator className="bg-white/[0.06] mx-3" />
        <NavGroup label="Liga" items={ligaNav} pathname={pathname} />
        <SidebarSeparator className="bg-white/[0.06] mx-3" />
        <NavGroup label="Analytics" items={analyticsNav} pathname={pathname} />
        <SidebarSeparator className="bg-white/[0.06] mx-3" />
        <NavGroup label="System" items={systemNav} pathname={pathname} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
