"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { Event } from "../_lib/types"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const [favorited, setFavorited] = useState(event.isFavorited)

  return (
    <div className="flex-shrink-0 w-[160px] snap-start">
      <div
        className={cn(
          "relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br",
          event.gradient
        )}
      >
        <div className="absolute inset-0 bg-black/20" />

        <button
          onClick={() => setFavorited(!favorited)}
          className={cn(
            "absolute top-2 right-2 size-8 rounded-full flex items-center justify-center",
            "bg-background/60 backdrop-blur-sm transition-colors",
            favorited && "bg-primary/90"
          )}
        >
          <Heart
            className={cn(
              "size-4 transition-colors",
              favorited ? "fill-white text-white" : "text-foreground"
            )}
          />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-[10px] font-medium text-white/80 uppercase">
            {format(new Date(event.date), "EEE, d MMM", { locale: ptBR })}
          </p>
          <p className="text-sm font-bold text-white line-clamp-2 leading-tight mt-0.5">
            {event.title}
          </p>
        </div>
      </div>
    </div>
  )
}
