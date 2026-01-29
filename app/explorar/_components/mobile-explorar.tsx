"use client"

import { ExplorarHeader } from "./explorar-header"
import { SearchBar } from "./search-bar"
import { UpcomingEvents } from "./upcoming-events"
import { SportsClasses } from "./sports-classes"
import { CategoriesGrid } from "./categories-grid"
import { BottomNav } from "./bottom-nav"
import {
  mockUser,
  mockEvents,
  mockSportsClasses,
  mockCategories,
} from "../_lib/mock-data"

export function MobileExplorar() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <ExplorarHeader user={mockUser} />
      <SearchBar />

      <div className="mt-6 space-y-6">
        <UpcomingEvents events={mockEvents} />
        <SportsClasses classes={mockSportsClasses} />
        <CategoriesGrid categories={mockCategories} />
      </div>

      <BottomNav />
    </div>
  )
}
