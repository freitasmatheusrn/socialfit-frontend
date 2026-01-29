"use client"

import { DesktopSidebarLayout } from "@/components/desktop-sidebar"
import { DashboardHeader } from "./dashboard-header"
import { StatsSection } from "./stats-section"
import { KanbanBoard } from "./kanban-board"

export function DesktopHome() {
  return (
    <DesktopSidebarLayout>
      <div className="flex flex-col min-h-screen bg-muted/30">
        <div className="flex-1 p-6 space-y-6">
          <DashboardHeader />
          <StatsSection />
          <KanbanBoard />
        </div>
      </div>
    </DesktopSidebarLayout>
  )
}
