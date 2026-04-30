import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { winRate, surfaceLabel } from "@/lib/utils"
import type { SurfaceSummaryYear, TitleEntry, MatchStats } from "@/types/tennis"

interface PlayerStatsChartProps {
  surfaceSummary: SurfaceSummaryYear[]
  titles: TitleEntry[]
  matchStats: MatchStats | null
  playerName: string
}

const SURFACE_COLORS: Record<string, string> = {
  Hard: "#3b82f6",
  Clay: "#f97316",
  Grass: "#22c55e",
  "I.hard": "#8b5cf6",
  Carpet: "#6b7280",
}

function useChartColors() {
  const isDark = document.documentElement.classList.contains("dark")
  const tooltipStyle = {
    backgroundColor: isDark ? "hsl(222 47% 10%)" : "hsl(0 0% 100%)",
    border: `1px solid ${isDark ? "hsl(220 30% 18%)" : "hsl(214 32% 91%)"}`,
    borderRadius: "8px",
    fontSize: 12,
    color: isDark ? "hsl(213 31% 91%)" : "hsl(222 47% 11%)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  }
  const tickColor = isDark ? "hsl(215 20% 55%)" : "hsl(215 16% 47%)"
  return { tooltipStyle, tickColor }
}

export function PlayerStatsChart({ surfaceSummary, titles, matchStats, playerName }: PlayerStatsChartProps) {
  const { tooltipStyle, tickColor } = useChartColors()

  const currentYear = surfaceSummary[0]
  const surfaces = currentYear?.surfaces ?? []

  const surfaceData = surfaces.map((s) => ({
    surface: surfaceLabel(s.court),
    wins: s.courtWins,
    losses: s.courtLosses,
    wr: winRate(s.courtWins, s.courtLosses),
    fill: SURFACE_COLORS[s.court] ?? "#6b7280",
  }))

  const yearlyWins = surfaceSummary.slice(0, 5).reverse().map((y) => {
    const wins = y.surfaces.reduce((sum, s) => sum + s.courtWins, 0)
    const losses = y.surfaces.reduce((sum, s) => sum + s.courtLosses, 0)
    return { year: y.year, wins, losses }
  })

  const titlesData = titles.filter((t) => Number(t.titlesWon) > 0).map((t) => ({
    name: t.tourRank
      .replace("Futures/Satellites/ITF tournaments $10K", "Futures")
      .replace("Challengers/ITF tournaments > $10K", "Challengers"),
    titles: Number(t.titlesWon),
  }))

  const firstServeWinPct = matchStats
    ? Math.round((matchStats.serviceStats.winningOnFirstServeGm / matchStats.serviceStats.winningOnFirstServeOfGm) * 100)
    : null
  const secondServeWinPct = matchStats
    ? Math.round((matchStats.serviceStats.winningOnSecondServeGm / matchStats.serviceStats.winningOnSecondServeOfGm) * 100)
    : null
  const bpSavedPct = matchStats
    ? Math.round((matchStats.breakPointsServeStats.breakPointSavedGm / matchStats.breakPointsServeStats.breakPointFacedGm) * 100)
    : null
  const bpConvertPct = matchStats
    ? Math.round((matchStats.breakPointsRtnStats.breakPointWonGm / matchStats.breakPointsRtnStats.breakPointChanceGm) * 100)
    : null

  return (
    <div className="space-y-5">
      {surfaceData.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {surfaceData.map((s) => (
            <div key={s.surface} className="rounded-lg bg-card border border-border p-3 text-center">
              <div className="text-lg font-bold" style={{ color: s.fill }}>{s.wr}%</div>
              <div className="text-xs font-medium mt-0.5">{s.surface}</div>
              <div className="text-xs text-muted-foreground">{s.wins}W / {s.losses}L</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {yearlyWins.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{playerName} — W/L by Year</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={yearlyWins} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(var(--muted)/0.4)" }} />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: 11, color: tickColor }} />
                  <Bar dataKey="wins" name="Wins" fill="#4ade80" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="losses" name="Losses" fill="#f87171" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {surfaceData.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Surface Performance ({currentYear?.year})</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={surfaceData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="wins">
                    {surfaceData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(val, name) => [val, `${name} wins`]}
                  />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: 11, color: tickColor }} formatter={(v) => v} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>

      {titlesData.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Titles by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={titlesData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: tickColor }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(var(--muted)/0.4)" }} />
                <Bar dataKey="titles" name="Titles" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {matchStats && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Service Statistics (Career)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatBox label="1st Srv Win%" value={firstServeWinPct} suffix="%" color="text-primary" />
              <StatBox label="2nd Srv Win%" value={secondServeWinPct} suffix="%" color="text-blue-500" />
              <StatBox label="BP Saved%" value={bpSavedPct} suffix="%" color="text-green-500" />
              <StatBox label="BP Convert%" value={bpConvertPct} suffix="%" color="text-orange-500" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
              <StatBox label="Aces" value={matchStats.serviceStats.acesGm} color="text-yellow-500" />
              <StatBox label="Double Faults" value={matchStats.serviceStats.doubleFaultsGm} color="text-red-400" />
              <StatBox label="BP Faced" value={matchStats.breakPointsServeStats.breakPointFacedGm} color="text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function StatBox({ label, value, suffix = "", color }: { label: string; value: number | null; suffix?: string; color: string }) {
  return (
    <div className="rounded-lg bg-card border border-border p-3 text-center">
      <div className={`text-xl font-bold ${color}`}>{value != null ? `${value}${suffix}` : "—"}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  )
}
