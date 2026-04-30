import { useNavigate } from "react-router-dom"
import { IconCalendar, IconClock } from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CountryFlag } from "@/components/common/CountryFlag"
import { formatDateShort } from "@/lib/utils"
import type { Fixture } from "@/types/tennis"

interface RecentMatchesListProps {
  fixtures: Fixture[]
  loading?: boolean
}

export function RecentMatchesList({ fixtures, loading }: RecentMatchesListProps) {
  const navigate = useNavigate()

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Recent Fixtures</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="px-5 py-3 border-b border-border/50 last:border-0">
                <Skeleton className="h-3 w-32 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))
          : fixtures.slice(0, 6).map((fixture, idx) => (
              <div
                key={fixture.id}
                className="px-5 py-3 border-b border-border/50 last:border-0 hover:bg-muted/40 transition-colors cursor-pointer animate-fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
                onClick={() => navigate(`/matches`)}
              >
                <div className="flex items-center gap-1.5 mb-2 text-xs text-muted-foreground">
                  <IconCalendar className="w-3 h-3" />
                  <span>{formatDateShort(fixture.date)}</span>
                  {fixture.timeGame && (
                    <>
                      <IconClock className="w-3 h-3 ml-1" />
                      <span>{fixture.timeGame}</span>
                    </>
                  )}
                </div>
                <div className="grid grid-cols-[1fr_20px_1fr] items-center gap-2">
                  <PlayerCell player={fixture.player1} seed={fixture.seed1} align="left" />
                  <span className="text-xs text-muted-foreground text-center font-medium">vs</span>
                  <PlayerCell player={fixture.player2} seed={fixture.seed2} align="right" />
                </div>
              </div>
            ))}
        {!loading && fixtures.length === 0 && (
          <div className="px-5 py-8 text-center text-sm text-muted-foreground">No fixtures today</div>
        )}
      </CardContent>
    </Card>
  )
}

function PlayerCell({
  player,
  seed,
  align,
}: {
  player: { id: number; name: string; countryAcr: string }
  seed: string | null
  align: "left" | "right"
}) {
  const initials = player.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
  return (
    <div className={`flex items-center gap-1.5 ${align === "right" ? "flex-row-reverse" : ""}`}>
      <Avatar className="w-6 h-6 shrink-0">
        <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
      </Avatar>
      <CountryFlag iso3={player.countryAcr} />
      <span className="text-xs font-medium truncate max-w-[90px]">{player.name}</span>
      {seed && <span className="text-xs text-muted-foreground shrink-0">[{seed}]</span>}
    </div>
  )
}
