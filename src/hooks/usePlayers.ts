import { useQuery } from "@tanstack/react-query"
import { useState, useCallback } from "react"
import {
  searchPlayers,
  fetchPlayerProfile,
  fetchPlayerSurfaceSummary,
  fetchPlayerTitles,
  fetchPlayerMatchStats,
} from "@/lib/api"
import type { TourType } from "@/types/tennis"

export function usePlayerSearch() {
  const [query, setQuery] = useState("")

  const { data, isLoading, error } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchPlayers(query),
    enabled: query.length >= 2,
  })

  const search = useCallback((q: string) => setQuery(q), [])
  return { results: data ?? [], isLoading, error, query, search }
}

export function usePlayerProfile(tour: TourType, id: number) {
  return useQuery({
    queryKey: ["player", "profile", tour, id],
    queryFn: () => fetchPlayerProfile(tour, id),
    enabled: !!id,
  })
}

export function usePlayerSurfaceSummary(tour: TourType, id: number) {
  return useQuery({
    queryKey: ["player", "surface", tour, id],
    queryFn: () => fetchPlayerSurfaceSummary(tour, id),
    enabled: !!id,
  })
}

export function usePlayerTitles(tour: TourType, id: number) {
  return useQuery({
    queryKey: ["player", "titles", tour, id],
    queryFn: () => fetchPlayerTitles(tour, id),
    enabled: !!id,
  })
}

export function usePlayerMatchStats(tour: TourType, id: number) {
  return useQuery({
    queryKey: ["player", "match-stats", tour, id],
    queryFn: () => fetchPlayerMatchStats(tour, id),
    enabled: !!id,
  })
}
