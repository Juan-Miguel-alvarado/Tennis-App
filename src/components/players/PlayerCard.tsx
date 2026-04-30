import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CountryFlag } from "@/components/common/CountryFlag"
import type { RankingEntry } from "@/types/tennis"

interface PlayerCardProps {
  entry: RankingEntry
}

export function PlayerCard({ entry }: PlayerCardProps) {
  const navigate = useNavigate()
  const initials = entry.player.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)

  return (
    <Card
      className="cursor-pointer hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200 animate-fade-in"
      onClick={() => navigate(`/players/${entry.player.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-11 h-11">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">{entry.player.name}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <CountryFlag iso3={entry.player.countryAcr} />
              <span>{entry.player.country?.name ?? entry.player.countryAcr}</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className={`text-lg font-bold tabular-nums ${entry.position <= 3 ? "text-primary" : ""}`}>
              #{entry.position}
            </div>
            <div className="text-xs text-muted-foreground tabular-nums">{entry.point.toLocaleString()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
