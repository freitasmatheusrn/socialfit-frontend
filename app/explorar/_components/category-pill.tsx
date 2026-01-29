import {
  Footprints,
  Dumbbell,
  Heart,
  Waves,
  Flame,
  Swords,
  Music,
  Bike,
  Tag,
} from "lucide-react"
import type { Category } from "../_lib/types"
import type { LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Footprints,
  Dumbbell,
  Heart,
  Waves,
  Flame,
  Swords,
  Music,
  Bike,
}

interface CategoryPillProps {
  category: Category
}

export function CategoryPill({ category }: CategoryPillProps) {
  const Icon = iconMap[category.icon] ?? Tag

  return (
    <button className="flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
      <Icon className="size-4 text-primary" />
      <span className="whitespace-nowrap">{category.name}</span>
    </button>
  )
}
