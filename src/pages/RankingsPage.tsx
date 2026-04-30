import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RankingsTable } from "@/components/rankings/RankingsTable"
import { useAtpRankings, useWtaRankings } from "@/hooks/useRankings"
import { ErrorState } from "@/components/common/ErrorState"

export function RankingsPage() {
  const [tab, setTab] = useState("atp")
  const { data: atp, isLoading: atpLoading, error: atpError, refetch: refetchAtp } = useAtpRankings()
  const { data: wta, isLoading: wtaLoading, error: wtaError, refetch: refetchWta } = useWtaRankings()

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-lg font-semibold">Rankings</h2>
        <p className="text-sm text-muted-foreground">Current ATP & WTA world singles rankings</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="atp">ATP Singles</TabsTrigger>
          <TabsTrigger value="wta">WTA Singles</TabsTrigger>
        </TabsList>

        <div className="mt-4">
          {tab === "atp" && (
            atpError
              ? <ErrorState message="Failed to load ATP rankings" onRetry={() => refetchAtp()} />
              : <RankingsTable rankings={atp ?? []} loading={atpLoading} />
          )}
          {tab === "wta" && (
            wtaError
              ? <ErrorState message="Failed to load WTA rankings" onRetry={() => refetchWta()} />
              : <RankingsTable rankings={wta ?? []} loading={wtaLoading} />
          )}
        </div>
      </Tabs>
    </div>
  )
}
