import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { CountryFlag } from "@/components/common/CountryFlag"
import type { RankingEntry } from "@/types/tennis"

interface TopPlayersProps {
  rankings: RankingEntry[]
  loading?: boolean
  title?: string
}

export function TopPlayers({ rankings, loading, title = "Top Players" }: TopPlayersProps) {
  const navigate = useNavigate()

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-2.5">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-2.5 w-16" />
                </div>
                <Skeleton className="h-3 w-12" />
              </div>
            ))
          : rankings.slice(0, 8).map((entry, idx) => {
              const initials = entry.player.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
              return (
                <div
                  key={entry.id}
                  className="flex items-center gap-3 px-5 py-2.5 hover:bg-muted/40 transition-colors cursor-pointer animate-slide-in border-b border-border/50 last:border-0"
                  style={{ animationDelay: `${idx * 40}ms` }}
                  onClick={() => navigate(`/players/${entry.player.id}`)}
                >
                  <span className={`text-sm font-mono font-bold w-5 shrink-0 tabular-nums ${entry.position <= 3 ? "text-primary" : "text-muted-foreground"}`}>
                    {entry.position}
                  </span>
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{entry.player.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <CountryFlag iso3={entry.player.countryAcr} />
                      <span>{entry.player.country?.name ?? entry.player.countryAcr}</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground shrink-0 tabular-nums">
                    {entry.point.toLocaleString()}
                  </span>
                </div>
              )
            })}
      </CardContent>
    </Card>
  )
}
