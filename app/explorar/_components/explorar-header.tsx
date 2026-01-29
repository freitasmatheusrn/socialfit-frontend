"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bell, MapPin } from "lucide-react"
import type { UserSummary } from "../_lib/types"

interface ExplorarHeaderProps {
  user: UserSummary
}

export function ExplorarHeader({ user }: ExplorarHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 pt-6 pb-2">
      <div className="flex items-center gap-3">
        <Avatar className="size-11">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm text-muted-foreground">Bem-vindo(a)!</p>
          <h1 className="text-xl font-bold leading-tight">{user.name}</h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 text-xs text-primary font-medium">
          <MapPin className="size-3" />
          {user.city}
        </span>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="size-5" />
        </Button>
      </div>
    </header>
  )
}
