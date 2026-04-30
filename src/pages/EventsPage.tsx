import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventCard } from "@/components/events/EventCard"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/common/ErrorState"
import { EmptyState } from "@/components/common/EmptyState"
import { useTournamentCalendar } from "@/hooks/useTournaments"
import { IconCalendarEvent } from "@tabler/icons-react"
import type { TourType } from "@/types/tennis"

export function EventsPage() {
  const [tour, setTour] = useState<TourType>("atp")
  const [year, setYear] = useState(new Date().getFullYear())
  const { data: tournaments, isLoading, error, refetch } = useTournamentCalendar(tour, year)

  const now = new Date()
  const upcoming = (tournaments ?? []).filter((t) => new Date(t.date) >= now)
  const past = (tournaments ?? []).filter((t) => new Date(t.date) < now)

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-semibold">Events</h2>
          <p className="text-sm text-muted-foreground">Tournament calendar for {year}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setYear((y) => y - 1)}
            className="px-3 py-1.5 text-xs border border-border rounded-lg hover:bg-muted transition-colors"
          >
            ← {year - 1}
          </button>
          <span className="text-sm font-semibold px-2">{year}</span>
          <button
            onClick={() => setYear((y) => y + 1)}
            className="px-3 py-1.5 text-xs border border-border rounded-lg hover:bg-muted transition-colors"
          >
            {year + 1} →
          </button>
        </div>
      </div>

      <Tabs value={tour} onValueChange={(v) => setTour(v as TourType)}>
        <TabsList>
          <TabsTrigger value="atp">ATP</TabsTrigger>
          <TabsTrigger value="wta">WTA</TabsTrigger>
        </TabsList>
      </Tabs>

      {error ? (
        <ErrorState message="Failed to load events" onRetry={() => refetch()} />
      ) : isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {upcoming.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Upcoming</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {upcoming.map((t) => <EventCard key={t.id} tournament={t} />)}
              </div>
            </section>
          )}

          {past.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Completed</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {past.slice(0, 20).map((t) => <EventCard key={t.id} tournament={t} />)}
              </div>
            </section>
          )}

          {!tournaments?.length && <EmptyState icon={IconCalendarEvent} title="No events found" />}
        </div>
      )}
    </div>
  )
}
