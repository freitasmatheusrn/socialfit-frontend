import { SectionHeader } from "./section-header"
import { EventCard } from "./event-card"
import type { Event } from "../_lib/types"

interface UpcomingEventsProps {
  events: Event[]
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <section className="space-y-3">
      <SectionHeader title="Próximos Eventos" href="/events" />
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}
