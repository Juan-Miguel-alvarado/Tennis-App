import { useQuery } from "@tanstack/react-query"
import { fetchTournamentCalendar } from "@/lib/api"
import type { TourType } from "@/types/tennis"

export function useTournamentCalendar(tour: TourType, year?: number) {
  const y = year ?? new Date().getFullYear()
  return useQuery({
    queryKey: ["tournaments", tour, y],
    queryFn: () => fetchTournamentCalendar(tour, y),
  })
}
