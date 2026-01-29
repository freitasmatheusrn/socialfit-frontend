import { SectionHeader } from "./section-header"
import { SportsClassCard } from "./sports-class-card"
import type { SportsClass } from "../_lib/types"

interface SportsClassesProps {
  classes: SportsClass[]
}

export function SportsClasses({ classes }: SportsClassesProps) {
  return (
    <section className="space-y-3">
      <SectionHeader title="Aulas" href="/classes" />
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide">
        {classes.map((cls) => (
          <SportsClassCard key={cls.id} sportsClass={cls} />
        ))}
      </div>
    </section>
  )
}
