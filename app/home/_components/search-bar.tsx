"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal } from "lucide-react"

export function SearchBar() {
  return (
    <div className="px-4 pt-4">
      <div className="relative flex items-center">
        <Search className="absolute left-3 size-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Buscar eventos, aulas..."
          className="pl-9 pr-10 h-11 rounded-xl bg-secondary border-0"
        />
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute right-1 rounded-lg"
        >
          <SlidersHorizontal className="size-4" />
        </Button>
      </div>
    </div>
  )
}
