import { useNavigate } from "react-router-dom"
import { IconCalendar, IconMapPin } from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { CountryFlag } from "@/components/common/CountryFlag"
import { surfaceColor, tierColor, formatDateShort, surfaceLabel } from "@/lib/utils"
import type { TournamentCalendarEntry } from "@/types/tennis"

interface UpcomingEventsProps {
  tournaments: TournamentCalendarEntry[]
  loading?: boolean
}

export function UpcomingEvents({ tournaments, loading }: UpcomingEventsProps) {
  const navigate = useNavigate()

  const upcoming = tournaments
    .filter((t) => new Date(t.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="px-5 py-3 border-b border-border/50 last:border-0">
                <Skeleton className="h-3.5 w-36 mb-1.5" />
                <Skeleton className="h-2.5 w-24" />
              </div>
            ))
          : upcoming.map((t, idx) => (
              <div
                key={t.id}
                className="px-5 py-3 border-b border-border/50 last:border-0 hover:bg-muted/40 transition-colors cursor-pointer animate-slide-in"
                style={{ animationDelay: `${idx * 40}ms` }}
                onClick={() => navigate("/events")}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-medium mb-0.5">{t.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <IconMapPin className="w-3 h-3" />
                      <CountryFlag iso3={t.coutry?.acronym ?? ""} />
                      <span>{t.coutry?.name ?? ""}</span>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <IconCalendar className="w-3 h-3" />
                      <span>{formatDateShort(t.date)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge variant="outline" className={`text-xs ${tierColor(t.tier)}`}>{t.tier}</Badge>
                    {t.court?.name && (
                      <Badge variant="outline" className={`text-xs ${surfaceColor(t.court.name)}`}>
                        {surfaceLabel(t.court.name)}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </CardContent>
    </Card>
  )
}
