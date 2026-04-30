import { useNavigate } from "react-router-dom"
import { IconCalendar, IconClock } from "@tabler/icons-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CountryFlag } from "@/components/common/CountryFlag"
import { formatDateShort } from "@/lib/utils"
import type { Fixture } from "@/types/tennis"

interface MatchCardProps {
  fixture: Fixture
  round?: string
  tournament?: string
}

export function MatchCard({ fixture, round, tournament }: MatchCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      className="cursor-pointer hover:border-primary/40 transition-all duration-200 animate-fade-in"
      onClick={() => navigate(`/players/${fixture.player1Id}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <IconCalendar className="w-3.5 h-3.5" />
            <span>{formatDateShort(fixture.date)}</span>
            {fixture.timeGame && (
              <>
                <IconClock className="w-3.5 h-3.5 ml-1" />
                <span>{fixture.timeGame}</span>
              </>
            )}
          </div>
          {round && (
            <Badge variant="outline" className="text-xs">{round}</Badge>
          )}
        </div>

        {tournament && (
          <p className="text-xs text-muted-foreground mb-2 truncate">{tournament}</p>
        )}

        <div className="space-y-2.5">
          <FixturePlayer
            player={fixture.player1}
            seed={fixture.seed1}
          />
          <div className="border-t border-border/40" />
          <FixturePlayer
            player={fixture.player2}
            seed={fixture.seed2}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function FixturePlayer({
  player,
  seed,
}: {
  player: { id: number; name: string; countryAcr: string }
  seed: string | null
}) {
  const initials = player.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
  return (
    <div className="flex items-center gap-2.5">
      <Avatar className="w-7 h-7 shrink-0">
        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
      </Avatar>
      <CountryFlag iso3={player.countryAcr} />
      <span className="text-sm font-medium flex-1 truncate">{player.name}</span>
      {seed && (
        <span className="text-xs text-muted-foreground shrink-0">[{seed}]</span>
      )}
    </div>
  )
}
