import { useQuery } from "@tanstack/react-query"
import { fetchRankings, fetchRankingsRace } from "@/lib/api"

export function useAtpRankings() {
  return useQuery({ queryKey: ["rankings", "atp", "singles"], queryFn: () => fetchRankings("atp") })
}

export function useWtaRankings() {
  return useQuery({ queryKey: ["rankings", "wta", "singles"], queryFn: () => fetchRankings("wta") })
}

export function useAtpRaceRankings() {
  return useQuery({ queryKey: ["rankings", "atp", "race"], queryFn: () => fetchRankingsRace("atp") })
}
