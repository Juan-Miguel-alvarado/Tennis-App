import axios from "axios"
import type {
  RankingEntry,
  PlayerProfile,
  SurfaceSummaryYear,
  TitleEntry,
  MatchStats,
  Fixture,
  TournamentCalendarEntry,
  SearchResponse,
  TourType,
} from "@/types/tennis"

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY as string
const RAPIDAPI_HOST = "tennis-api-atp-wta-itf.p.rapidapi.com"
const BASE_URL = `https://${RAPIDAPI_HOST}/tennis/v2`

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-RapidAPI-Key": RAPIDAPI_KEY,
    "X-RapidAPI-Host": RAPIDAPI_HOST,
  },
})

async function get<T>(path: string): Promise<T> {
  const res = await apiClient.get<{ data: T }>(path)
  return res.data.data
}

export async function fetchRankings(tour: TourType): Promise<RankingEntry[]> {
  const data = await get<RankingEntry[]>(`/${tour}/ranking/singles?pageSize=50`)
  if (tour === "wta") return data.map((e) => ({ ...e, point: Math.round(e.point / 100) }))
  return data
}

export async function fetchRankingsRace(tour: TourType): Promise<RankingEntry[]> {
  const data = await get<RankingEntry[]>(`/${tour}/ranking/singles?race=true&pageSize=50`)
  if (tour === "wta") return data.map((e) => ({ ...e, point: Math.round(e.point / 100) }))
  return data
}

export async function fetchPlayerProfile(tour: TourType, id: number): Promise<PlayerProfile> {
  return get<PlayerProfile>(`/${tour}/player/profile/${id}`)
}

export async function fetchPlayerSurfaceSummary(tour: TourType, id: number): Promise<SurfaceSummaryYear[]> {
  return get<SurfaceSummaryYear[]>(`/${tour}/player/surface-summary/${id}`)
}

export async function fetchPlayerTitles(tour: TourType, id: number): Promise<TitleEntry[]> {
  return get<TitleEntry[]>(`/${tour}/player/titles/${id}`)
}

export async function fetchPlayerMatchStats(tour: TourType, id: number): Promise<MatchStats> {
  return get<MatchStats>(`/${tour}/player/match-stats/${id}`)
}

export async function fetchFixturesByDate(tour: TourType, date: string): Promise<Fixture[]> {
  return get<Fixture[]>(`/${tour}/fixtures/${date}`)
}

export async function fetchFixturesByDateRange(tour: TourType, start: string, end: string): Promise<Fixture[]> {
  return get<Fixture[]>(`/${tour}/fixtures/${start}/${end}`)
}

export async function fetchTournamentCalendar(tour: TourType, year: number): Promise<TournamentCalendarEntry[]> {
  return get<TournamentCalendarEntry[]>(`/${tour}/tournament/calendar/${year}`)
}

export async function searchPlayers(query: string): Promise<SearchResponse[]> {
  return get<SearchResponse[]>(`/search?search=${encodeURIComponent(query)}`)
}

export function todayDate(): string {
  return new Date().toISOString().slice(0, 10)
}

export function recentDateRange(): { start: string; end: string } {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - 7)
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  }
}
