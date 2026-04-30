export type TourType = "atp" | "wta"

export type CourtName = "Hard" | "Clay" | "Grass" | "I.hard" | "Carpet"

export interface ApiCountry {
  name: string
  acronym: string
}

export interface ApiPlayer {
  id: number
  name: string
  countryAcr: string
  country?: ApiCountry
}

export interface RankingEntry {
  id: number
  date: string
  point: number
  position: number
  player: ApiPlayer
}

export interface PlayerInformation {
  id: number
  turnedPro: string
  weight: string | null
  height: string | null
  birthplace: string
  residence: string
  plays: string
  coach: string
}

export interface PlayerProfile {
  playerStatus: string
  id: number
  name: string
  countryAcr: string
  country: ApiCountry
  information: PlayerInformation | null
}

export interface SurfaceStat {
  courtId: number
  court: string
  courtWins: number
  courtLosses: number
}

export interface SurfaceSummaryYear {
  year: number
  surfaces: SurfaceStat[]
}

export interface TitleEntry {
  tourRankId: number
  tourRank: string
  titlesWon: string
  titlesLost: string
}

export interface MatchStats {
  serviceStats: {
    acesGm: number
    doubleFaultsGm: number
    firstServeGm: number
    firstServeOfGm: number
    winningOnFirstServeGm: number
    winningOnFirstServeOfGm: number
    winningOnSecondServeGm: number
    winningOnSecondServeOfGm: number
  }
  rtnStats: {
    acesGm: number
    doubleFaultsGm: number
    firstServeGm: number
    firstServeOfGm: number
    winningOnFirstServeGm: number
    winningOnFirstServeOfGm: number
    winningOnSecondServeGm: number
    winningOnSecondServeOfGm: number
  }
  breakPointsServeStats: {
    breakPointFacedGm: number
    breakPointSavedGm: number
  }
  breakPointsRtnStats: {
    breakPointChanceGm: number
    breakPointWonGm: number
  }
}

export interface Fixture {
  id: number
  date: string
  roundId: number
  player1Id: number
  player2Id: number
  tournamentId: number
  timeGame: string | null
  seed1: string | null
  seed2: string | null
  player1: { id: number; name: string; countryAcr: string }
  player2: { id: number; name: string; countryAcr: string }
}

export interface TournamentCalendarEntry {
  id: number
  name: string
  courtId: number
  date: string
  rankId: number
  draw_size: number | null
  tier: string
  court: { id: number; name: string }
  round: { id: number; name: string }
  coutry: { acronym: string; name: string }
}

export interface SearchResult {
  name: string
  birthday: string | null
  countryAcr: string
}

export interface SearchResponse {
  category: string
  total: number
  result: SearchResult[]
}

export interface ApiResponse<T> {
  data: T
}
