import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/queryClient"
import { Layout } from "@/components/layout/Layout"
import { DashboardPage } from "@/pages/DashboardPage"
import { PlayersPage } from "@/pages/PlayersPage"
import { MatchesPage } from "@/pages/MatchesPage"
import { RankingsPage } from "@/pages/RankingsPage"
import { EventsPage } from "@/pages/EventsPage"

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/players/:id" element={<PlayersPage />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/matches/:id" element={<MatchesPage />} />
            <Route path="/rankings" element={<RankingsPage />} />
            <Route path="/events" element={<EventsPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
