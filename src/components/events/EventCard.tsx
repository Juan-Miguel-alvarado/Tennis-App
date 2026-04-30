import { IconCalendar, IconMapPin, IconCurrencyDollar, IconBallTennis } from "@tabler/icons-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CountryFlag } from "@/components/common/CountryFlag"
import { surfaceColor, tierColor, formatDateShort, surfaceLabel } from "@/lib/utils"
import type { TournamentCalendarEntry } from "@/types/tennis"

interface EventCardProps {
  tournament: TournamentCalendarEntry
}

export function EventCard({ tournament }: EventCardProps) {
  const surface = tournament.court?.name ?? ""
  return (
    <Card className="hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200 animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="outline" className={tierColor(tournament.tier)}>
              {tournament.tier}
            </Badge>
            {surface && (
              <Badge variant="outline" className={surfaceColor(surface)}>
                {surfaceLabel(surface)}
              </Badge>
            )}
          </div>
          <IconBallTennis className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        </div>

        <h3 className="font-semibold text-sm mb-2 leading-snug">{tournament.name}</h3>

        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <IconMapPin className="w-3.5 h-3.5 shrink-0" />
            <CountryFlag iso3={tournament.coutry?.acronym ?? ""} />
            <span>{tournament.coutry?.name ?? ""}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <IconCalendar className="w-3.5 h-3.5 shrink-0" />
            <span>{formatDateShort(tournament.date)}</span>
          </div>
          {tournament.draw_size && (
            <div className="flex items-center gap-1.5">
              <IconCurrencyDollar className="w-3.5 h-3.5 shrink-0" />
              <span>Draw: {tournament.draw_size}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
