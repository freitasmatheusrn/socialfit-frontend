"use client"

import { Search, SlidersHorizontal, User, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Buscar membro..."
          className="pl-10 bg-background"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <span className="text-muted-foreground">Ordenar por</span>
        </Button>

        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="size-4" />
          <span>Filtros</span>
        </Button>

        <Button variant="outline" size="sm" className="gap-2">
          <User className="size-4" />
          <span>Eu</span>
        </Button>

        <Button size="sm" className="gap-2">
          <Plus className="size-4" />
          <span>Adicionar membro</span>
        </Button>
      </div>
    </div>
  )
}
