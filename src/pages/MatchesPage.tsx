import { useState } from "react"
import { IconActivity, IconCalendar } from "@tabler/icons-react"
import { MatchCard } from "@/components/matches/MatchCard"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/common/ErrorState"
import { EmptyState } from "@/components/common/EmptyState"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useFixturesByDate, useRecentFixtures } from "@/hooks/useMatches"
import type { TourType } from "@/types/tennis"

export function MatchesPage() {
  const [tour, setTour] = useState<TourType>("atp")
  const [tab, setTab] = useState<"today" | "recent">("today")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10))

  const todayQuery = useFixturesByDate(tour, selectedDate)
  const recentQuery = useRecentFixtures(tour)

  const { data: fixtures, isLoading, error, refetch } = tab === "today" ? todayQuery : recentQuery

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-lg font-semibold">Matches</h2>
        <p className="text-sm text-muted-foreground">Fixtures and match schedule</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Tabs value={tour} onValueChange={(v) => setTour(v as TourType)}>
          <TabsList>
            <TabsTrigger value="atp">ATP</TabsTrigger>
            <TabsTrigger value="wta">WTA</TabsTrigger>
          </TabsList>
        </Tabs>

        <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
          <TabsList>
            <TabsTrigger value="today">
              <IconCalendar className="w-3.5 h-3.5 mr-1.5" />
              By Date
            </TabsTrigger>
            <TabsTrigger value="recent">
              <IconActivity className="w-3.5 h-3.5 mr-1.5" />
              Last 7 Days
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {tab === "today" && (
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-auto h-9 text-sm"
          />
        )}
      </div>

      {error ? (
        <ErrorState message="Failed to load fixtures" onRetry={() => refetch()} />
      ) : isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-xl" />
          ))}
        </div>
      ) : !fixtures?.length ? (
        <EmptyState icon={IconActivity} title="No fixtures found" description="Try a different date or tour." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {fixtures.map((fixture) => (
            <MatchCard key={fixture.id} fixture={fixture} />
          ))}
        </div>
      )}
    </div>
  )
}
