import { useEffect, useState } from "react"
import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import { IconSearch, IconArrowLeft, IconUser, IconMapPin, IconSchool } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlayerStatsChart } from "@/components/players/PlayerStatsChart"
import { ErrorState } from "@/components/common/ErrorState"
import { EmptyState } from "@/components/common/EmptyState"
import { CountryFlag } from "@/components/common/CountryFlag"
import {
  usePlayerSearch,
  usePlayerProfile,
  usePlayerSurfaceSummary,
  usePlayerTitles,
  usePlayerMatchStats,
} from "@/hooks/usePlayers"
import { useAtpRankings, useWtaRankings } from "@/hooks/useRankings"
import type { TourType } from "@/types/tennis"

export function PlayersPage() {
  const { id } = useParams<{ id?: string }>()
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get("q") ?? ""

  if (id) return <PlayerProfile id={Number(id)} />
  return <PlayerSearch initialQuery={initialQuery} />
}

function PlayerSearch({ initialQuery }: { initialQuery: string }) {
  const { results, isLoading, query, search } = usePlayerSearch()
  const { data: atpRankings, isLoading: atpLoading } = useAtpRankings()
  const { data: wtaRankings, isLoading: wtaLoading } = useWtaRankings()
  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState(initialQuery)
  const [browseTour, setBrowseTour] = useState<TourType>("atp")

  useEffect(() => {
    if (initialQuery) search(initialQuery)
  }, [initialQuery, search])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    search(e.target.value)
  }

  const showSearch = query.length >= 2
  const atpPlayers = results.find((r) => r.category === "player_atp")?.result ?? []
  const wtaPlayers = results.find((r) => r.category === "player_wta")?.result ?? []

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-lg font-semibold">Players</h2>
        <p className="text-sm text-muted-foreground">Search players or browse ATP/WTA rankings</p>
      </div>

      <div className="relative max-w-md">
        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search players by name..."
          value={inputValue}
          onChange={handleChange}
          className="pl-9"
          autoFocus={!!initialQuery}
        />
      </div>

      {showSearch && (
        <div className="space-y-4">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 rounded-lg" />
              ))}
            </div>
          )}

          {!isLoading && atpPlayers.length === 0 && wtaPlayers.length === 0 && (
            <EmptyState icon={IconUser} title="No players found" description={`No results for "${query}"`} />
          )}

          {atpPlayers.length > 0 && (
            <section>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">ATP Players</h3>
              <div className="space-y-1.5">
                {atpPlayers.map((p, i) => (
                  <SearchResultRow key={i} name={p.name} countryAcr={p.countryAcr} birthday={p.birthday} onClick={() => navigate(`/players?q=${encodeURIComponent(p.name)}`)} />
                ))}
              </div>
            </section>
          )}

          {wtaPlayers.length > 0 && (
            <section>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">WTA Players</h3>
              <div className="space-y-1.5">
                {wtaPlayers.map((p, i) => (
                  <SearchResultRow key={i} name={p.name} countryAcr={p.countryAcr} birthday={p.birthday} onClick={() => {}} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {!showSearch && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {browseTour === "atp" ? "ATP" : "WTA"} Top 50
            </h3>
            <Tabs value={browseTour} onValueChange={(v) => setBrowseTour(v as TourType)}>
              <TabsList className="h-8">
                <TabsTrigger value="atp" className="text-xs px-3">ATP</TabsTrigger>
                <TabsTrigger value="wta" className="text-xs px-3">WTA</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          {(browseTour === "atp" ? atpLoading : wtaLoading) ? (
            <div className="space-y-2">
              {Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="h-12 rounded-lg" />)}
            </div>
          ) : (
            <div className="rounded-xl border border-border overflow-hidden">
              {((browseTour === "atp" ? atpRankings : wtaRankings) ?? []).slice(0, 50).map((entry, idx) => {
                const initials = entry.player.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
                return (
                  <div
                    key={entry.id}
                    className="flex items-center gap-3 px-4 py-2.5 border-b border-border/50 last:border-0 hover:bg-muted/30 cursor-pointer transition-colors animate-fade-in"
                    style={{ animationDelay: `${idx * 15}ms` }}
                    onClick={() => navigate(`/players/${entry.player.id}`)}
                  >
                    <span className={`text-sm font-mono font-bold w-6 tabular-nums ${entry.position <= 3 ? "text-primary" : "text-muted-foreground"}`}>{entry.position}</span>
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                    </Avatar>
                    <CountryFlag iso3={entry.player.countryAcr} />
                    <span className="text-sm font-medium flex-1 truncate">{entry.player.name}</span>
                    <span className="text-xs text-muted-foreground tabular-nums">{entry.point.toLocaleString()} pts</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function SearchResultRow({ name, countryAcr, birthday, onClick }: { name: string; countryAcr: string; birthday: string | null; onClick: () => void }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-border hover:bg-muted/30 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <CountryFlag iso3={countryAcr} />
      <span className="text-sm font-medium flex-1">{name}</span>
      {birthday && <span className="text-xs text-muted-foreground">{new Date(birthday).getFullYear()}</span>}
    </div>
  )
}

function PlayerProfile({ id }: { id: number }) {
  const navigate = useNavigate()
  const [tour, setTour] = useState<TourType>("atp")

  const { data: profile, isLoading: profileLoading, error: profileError } = usePlayerProfile(tour, id)
  const { data: surfaceSummary, isLoading: surfaceLoading } = usePlayerSurfaceSummary(tour, id)
  const { data: titles } = usePlayerTitles(tour, id)
  const { data: matchStats } = usePlayerMatchStats(tour, id)

  if (profileLoading) return <ProfileSkeleton />
  if (profileError || !profile) return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={() => navigate("/players")}>
        <IconArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
      <div className="flex items-center gap-2 mb-3">
        <Tabs value={tour} onValueChange={(v) => setTour(v as TourType)}>
          <TabsList><TabsTrigger value="atp">ATP</TabsTrigger><TabsTrigger value="wta">WTA</TabsTrigger></TabsList>
        </Tabs>
      </div>
      <ErrorState message="Player not found in this tour" />
    </div>
  )

  const initials = profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
  const info = profile.information

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-3 flex-wrap">
        <Button variant="ghost" size="sm" onClick={() => navigate("/players")}>
          <IconArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Tabs value={tour} onValueChange={(v) => setTour(v as TourType)}>
          <TabsList>
            <TabsTrigger value="atp">ATP</TabsTrigger>
            <TabsTrigger value="wta">WTA</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-start gap-5 flex-wrap sm:flex-nowrap">
            <Avatar className="w-20 h-20 shrink-0">
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                <div>
                  <h2 className="text-xl font-bold">{profile.name}</h2>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                    <CountryFlag iso3={profile.countryAcr} size="md" />
                    <span>{profile.country?.name ?? profile.countryAcr}</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs px-2 py-1 capitalize">{profile.playerStatus}</Badge>
              </div>

              {info && (
                <>
                  <Separator className="my-3" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
                    {info.height && <InfoItem label="Height" value={`${info.height} cm`} />}
                    {info.weight && <InfoItem label="Weight" value={`${info.weight} kg`} />}
                    {info.turnedPro && <InfoItem label="Turned Pro" value={info.turnedPro} />}
                    {info.plays && <InfoItem label="Plays" value={info.plays} />}
                    {info.birthplace && (
                      <InfoItem label="Birthplace" value={info.birthplace} icon={<IconMapPin className="w-3 h-3" />} />
                    )}
                    {info.residence && (
                      <InfoItem label="Residence" value={info.residence} icon={<IconMapPin className="w-3 h-3" />} />
                    )}
                    {info.coach && (
                      <InfoItem label="Coach" value={info.coach} icon={<IconSchool className="w-3 h-3" />} colSpan />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {surfaceLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      ) : (
        <div>
          <h3 className="text-base font-semibold mb-4">Statistics</h3>
          <PlayerStatsChart
            surfaceSummary={surfaceSummary ?? []}
            titles={titles ?? []}
            matchStats={matchStats ?? null}
            playerName={profile.name}
          />
        </div>
      )}
    </div>
  )
}

function InfoItem({ label, value, icon, colSpan }: { label: string; value: string; icon?: React.ReactNode; colSpan?: boolean }) {
  return (
    <div className={colSpan ? "col-span-2 sm:col-span-3" : ""}>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-medium mt-0.5 flex items-center gap-1">
        {icon}
        <span>{value}</span>
      </div>
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-8 w-24" />
      <Card>
        <CardContent className="p-5">
          <div className="flex gap-5">
            <Skeleton className="w-20 h-20 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-24" />
              <div className="grid grid-cols-3 gap-3 mt-4">
                {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-10 rounded-lg" />)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Skeleton className="h-64 rounded-xl" />
    </div>
  )
}
