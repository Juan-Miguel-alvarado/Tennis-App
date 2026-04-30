import { useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { CountryFlag } from "@/components/common/CountryFlag"
import type { RankingEntry } from "@/types/tennis"

interface RankingsTableProps {
  rankings: RankingEntry[]
  loading?: boolean
}

export function RankingsTable({ rankings, loading }: RankingsTableProps) {
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50 border-b border-border">
            <th className="text-left px-4 py-2.5 font-medium text-muted-foreground w-12">#</th>
            <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Player</th>
            <th className="text-right px-4 py-2.5 font-medium text-muted-foreground hidden sm:table-cell">Country</th>
            <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">Points</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((entry, idx) => {
            const initials = entry.player.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
            return (
              <tr
                key={entry.id}
                className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer animate-fade-in"
                style={{ animationDelay: `${idx * 20}ms` }}
                onClick={() => navigate(`/players/${entry.player.id}`)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className={`font-mono font-bold text-sm tabular-nums w-6 ${entry.position <= 3 ? "text-primary" : "text-muted-foreground"}`}>
                      {entry.position}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium leading-tight">{entry.player.name}</div>
                      <div className="text-xs text-muted-foreground sm:hidden flex items-center gap-1 mt-0.5">
                        <CountryFlag iso3={entry.player.countryAcr} />
                        <span>{entry.player.country?.name ?? entry.player.countryAcr}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right hidden sm:table-cell">
                  <div className="flex items-center justify-end gap-1.5">
                    <CountryFlag iso3={entry.player.countryAcr} />
                    <span className="text-sm text-muted-foreground">{entry.player.country?.name ?? entry.player.countryAcr}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-semibold tabular-nums">
                  {entry.point.toLocaleString()}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

