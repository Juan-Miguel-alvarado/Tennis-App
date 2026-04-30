import { IconActivity, IconTrophy, IconUsers, IconCalendarEvent } from "@tabler/icons-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface StatsOverviewProps {
  totalRankings?: number
  totalFixtures?: number
  totalTournaments?: number
  topPlayer?: string
  loading?: boolean
}

export function StatsOverview({ totalRankings, totalFixtures, totalTournaments, topPlayer, loading }: StatsOverviewProps) {
  const stats = [
    {
      label: "Today's Fixtures",
      value: loading ? null : String(totalFixtures ?? 0),
      icon: IconActivity,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      label: "Ranked Players",
      value: loading ? null : String(totalRankings ?? 0),
      icon: IconUsers,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Tournaments",
      value: loading ? null : String(totalTournaments ?? 0),
      icon: IconCalendarEvent,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Top Ranked",
      value: loading ? null : (topPlayer ?? "—"),
      icon: IconTrophy,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, color, bg }, i) => (
        <Card key={label} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{label}</span>
              <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
            </div>
            {loading || value === null ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="text-2xl font-bold">{value}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
