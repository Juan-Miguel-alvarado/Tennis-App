import { useQuery } from "@tanstack/react-query"
import { fetchFixturesByDate, fetchFixturesByDateRange, todayDate, recentDateRange } from "@/lib/api"
import type { TourType } from "@/types/tennis"

export function useFixturesToday(tour: TourType = "atp") {
  const date = todayDate()
  return useQuery({
    queryKey: ["fixtures", tour, "today", date],
    queryFn: () => fetchFixturesByDate(tour, date),
  })
}

export function useRecentFixtures(tour: TourType = "atp") {
  const { start, end } = recentDateRange()
  return useQuery({
    queryKey: ["fixtures", tour, "recent", start, end],
    queryFn: () => fetchFixturesByDateRange(tour, start, end),
  })
}

export function useFixturesByDate(tour: TourType, date: string) {
  return useQuery({
    queryKey: ["fixtures", tour, date],
    queryFn: () => fetchFixturesByDate(tour, date),
    enabled: !!date,
  })
}
