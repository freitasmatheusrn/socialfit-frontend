import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { SportsClass } from "../_lib/types"

interface SportsClassCardProps {
  sportsClass: SportsClass
}

export function SportsClassCard({ sportsClass }: SportsClassCardProps) {
  return (
    <div className="flex-shrink-0 w-[200px] snap-start rounded-xl border bg-card overflow-hidden">
      <div
        className={cn(
          "relative aspect-[16/10] bg-gradient-to-br",
          sportsClass.gradient
        )}
      >
        <Badge
          variant="secondary"
          className="absolute top-2 left-2 text-[10px] bg-background/70 backdrop-blur-sm border-0"
        >
          {sportsClass.level}
        </Badge>
      </div>
      <div className="p-3 space-y-1">
        <p className="text-sm font-semibold line-clamp-1">{sportsClass.title}</p>
        <p className="text-xs text-muted-foreground">{sportsClass.instructor}</p>
        <p className="text-xs text-muted-foreground">
          {sportsClass.time} · {sportsClass.daysOfWeek.join(", ")}
        </p>
        <p
          className={cn(
            "text-xs font-medium",
            sportsClass.spotsLeft <= 3 ? "text-destructive" : "text-primary"
          )}
        >
          {sportsClass.spotsLeft} vagas restantes
        </p>
      </div>
    </div>
  )
}
