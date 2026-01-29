"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  CalendarDays,
  Activity,
  Users,
  Settings,
  LogOut,
  Dumbbell,
  Trophy,
  Target,
  TrendingUp,
  Plus,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const mainNavItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/home",
  },
  {
    title: "Eventos",
    icon: CalendarDays,
    href: "/events",
    badge: 3,
  },
  {
    title: "Atividades",
    icon: Activity,
    href: "/activities",
  },
  {
    title: "Membros",
    icon: Users,
    href: "/members",
    isActive: true,
  },
  {
    title: "Configurações",
    icon: Settings,
    href: "/settings",
  },
]

const projectItems = [
  {
    title: "CrossFit Box",
    icon: Dumbbell,
    href: "/projects/crossfit",
    count: 12,
  },
  {
    title: "Competições",
    icon: Trophy,
    href: "/projects/competitions",
  },
  {
    title: "Metas",
    icon: Target,
    href: "/projects/goals",
  },
  {
    title: "Performance",
    icon: TrendingUp,
    href: "/projects/performance",
  },
]

const teamMembers = [
  {
    name: "Ana Silva",
    role: "Personal Trainer",
    avatar: "",
    initials: "AS",
  },
  {
    name: "Carlos Mendes",
    role: "Nutricionista",
    avatar: "",
    initials: "CM",
  },
  {
    name: "Julia Santos",
    role: "Fisioterapeuta",
    avatar: "",
    initials: "JS",
  },
  {
    name: "Ricardo Lima",
    role: "Coach",
    avatar: "",
    initials: "RL",
  },
]

function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="none" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <Link href="/home" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Dumbbell className="size-4" />
          </div>
          <span className="text-lg font-bold">SocialFit</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.badge && (
                    <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between pr-2">
            <span>Projetos</span>
            <Button variant="ghost" size="icon" className="size-5">
              <Plus className="size-3" />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projectItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.count && (
                    <SidebarMenuBadge>{item.count}</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between pr-2">
            <span>Equipe</span>
            <Button variant="ghost" size="icon" className="size-5">
              <Plus className="size-3" />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {teamMembers.map((member) => (
                <SidebarMenuItem key={member.name}>
                  <SidebarMenuButton asChild tooltip={member.name}>
                    <Link href={`/team/${member.initials.toLowerCase()}`}>
                      <Avatar className="size-6">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="text-xs">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm">{member.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {member.role}
                        </span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Sair">
              <button className="w-full">
                <LogOut className="size-4" />
                <span>Sair</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

interface DesktopSidebarLayoutProps {
  children: React.ReactNode
}

export function DesktopSidebarLayout({ children }: DesktopSidebarLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="hidden md:flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  )
}

export { AppSidebar }
