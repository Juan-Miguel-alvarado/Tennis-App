import { useState } from "react"
import { StatsOverview } from "@/components/dashboard/StatsOverview"
import { TopPlayers } from "@/components/dashboard/TopPlayers"
import { RecentMatchesList } from "@/components/dashboard/RecentMatchesList"
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAtpRankings, useWtaRankings } from "@/hooks/useRankings"
import { useFixturesToday } from "@/hooks/useMatches"
import { useTournamentCalendar } from "@/hooks/useTournaments"
import type { TourType } from "@/types/tennis"

export function DashboardPage() {
  const [tour, setTour] = useState<TourType>("atp")

  const { data: atpRankings, isLoading: atpLoading } = useAtpRankings()
  const { data: wtaRankings, isLoading: wtaLoading } = useWtaRankings()
  const { data: fixtures, isLoading: fixturesLoading } = useFixturesToday(tour)
  const { data: tournaments, isLoading: tournamentsLoading } = useTournamentCalendar(tour)

  const rankings = tour === "atp" ? atpRankings : wtaRankings
  const rankingsLoading = tour === "atp" ? atpLoading : wtaLoading
  const topPlayer = rankings?.[0]?.player.name.split(" ").slice(-1)[0] ?? "—"

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-semibold mb-1">Overview</h2>
          <p className="text-sm text-muted-foreground">Live {tour.toUpperCase()} data from Matchstat API.</p>
        </div>
        <Tabs value={tour} onValueChange={(v) => setTour(v as TourType)}>
          <TabsList>
            <TabsTrigger value="atp">ATP</TabsTrigger>
            <TabsTrigger value="wta">WTA</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <StatsOverview
        loading={rankingsLoading || fixturesLoading || tournamentsLoading}
        totalRankings={rankings?.length}
        totalFixtures={fixtures?.length}
        totalTournaments={tournaments?.length}
        topPlayer={topPlayer}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <RecentMatchesList fixtures={fixtures ?? []} loading={fixturesLoading} />
        </div>
        <div>
          <TopPlayers rankings={rankings ?? []} loading={rankingsLoading} title={`${tour.toUpperCase()} Rankings`} />
        </div>
      </div>

      <UpcomingEvents tournaments={tournaments ?? []} loading={tournamentsLoading} />
    </div>
  )
}
