tennis-dashboard

  A modern tennis dashboard built with React, Vite, and TypeScript. Displays live ATP and WTA data — rankings, fixtures, player profiles, match statistics, and     tournament calendars —
  sourced from the Matchstat Tennis API via RapidAPI.

  ---
  Stack

  ┌───────────────┬──────────────────────────┐
  │     Layer     │        Technology        │
  ├───────────────┼──────────────────────────┤
  │ Framework     │ React 19 + Vite 8        │
  ├───────────────┼──────────────────────────┤
  │ Language      │ TypeScript 6             │
  ├───────────────┼──────────────────────────┤
  │ Routing       │ React Router DOM v7      │
  ├───────────────┼──────────────────────────┤
  │ Data fetching │ TanStack React Query v5  │
  ├───────────────┼──────────────────────────┤
  │ Styling       │ Tailwind CSS v3          │
  ├───────────────┼──────────────────────────┤
  │ UI primitives │ Radix UI                 │
  ├───────────────┼──────────────────────────┤
  │ Icons         │ @tabler/icons-react      │
  ├───────────────┼──────────────────────────┤
  │ Charts        │ Recharts                 │
  ├───────────────┼──────────────────────────┤
  │ HTTP client   │ Axios                    │
  ├───────────────┼──────────────────────────┤
  │ Flags         │ flagcdn.com (ISO2 codes) │
  └───────────────┴──────────────────────────┘

  ---
  Features

  - Dashboard — Stats overview, today's fixtures, top rankings, upcoming events. ATP/WTA toggle.
  - Players — Search by name across ATP/WTA. Browse top-50 rankings with ATP/WTA toggle. Player profile page with bio, surface win rates, yearly W/L chart, titles by category, and career
  service stats.
  - Matches — Fixtures by date or last 7 days. ATP/WTA tab.
  - Rankings — Full rankings table with country flags, points, positions. ATP/WTA tab.
  - Events — Tournament calendar by year with surface, tier, and country info. ATP/WTA tab.
  - Dark mode — Toggle persisted in localStorage. Sidebar adapts to light/dark theme.

  ---
  Project structure

  src/
  ├── components/
  │   ├── common/         # CountryFlag, ErrorState, EmptyState
  │   ├── dashboard/      # StatsOverview, TopPlayers, RecentMatchesList, UpcomingEvents
  │   ├── events/         # EventCard
  │   ├── layout/         # Layout, Sidebar, Header
  │   ├── matches/        # MatchCard
  │   ├── players/        # PlayerCard, PlayerStatsChart
  │   ├── rankings/       # RankingsTable
  │   └── ui/             # Radix-based primitives (Button, Card, Tabs, etc.)
  ├── hooks/              # useRankings, useMatches, usePlayers, useTournaments, useTheme
  ├── lib/                # api.ts, utils.ts, queryClient.ts
  ├── pages/              # DashboardPage, PlayersPage, MatchesPage, RankingsPage, EventsPage
  └── types/              # tennis.ts — all API types

  ---
  Getting started

  1. Get a RapidAPI key

  Subscribe to the Tennis API - ATP WTA ITF on RapidAPI (Basic plan or higher).
  API host: tennis-api-atp-wta-itf.p.rapidapi.com
  Docs: tennisapidoc.matchstat.com

  2. Configure environment

  cp .env.example .env

  Edit .env:

  VITE_RAPIDAPI_KEY=your_key_here
  VITE_RAPIDAPI_HOST=tennis-api-atp-wta-itf.p.rapidapi.com

  3. Install and run

  npm install
  npm run dev

  4. Build for production

  npm run build
  npm run preview

  ---
  API notes

  All endpoints follow the pattern /tennis/v2/{tour}/{resource} where tour is atp or wta.

  ┌─────────────────────────────────────────┬───────────────────────────────────┐
  │                Endpoint                 │            Description            │
  ├─────────────────────────────────────────┼───────────────────────────────────┤
  │ GET /{tour}/ranking/singles?pageSize=50 │ Player rankings                   │
  ├─────────────────────────────────────────┼───────────────────────────────────┤
  │ GET /{tour}/player/profile/{id}         │ Player bio                        │
  ├─────────────────────────────────────────┼───────────────────────────────────┤
  │ GET /{tour}/player/surface-summary/{id} │ Win/loss by surface and year      │
  ├─────────────────────────────────────────┼───────────────────────────────────┤
  │ GET /{tour}/player/titles/{id}          │ Titles by category                │
  ├─────────────────────────────────────────┼───────────────────────────────────┤
  │ GET /{tour}/player/match-stats/{id}     │ Career service/return stats       │
  ├─────────────────────────────────────────┼───────────────────────────────────┤
  │ GET /{tour}/fixtures/{date}             │ Fixtures for a date (YYYY-MM-DD)  │
  ├─────────────────────────────────────────┼───────────────────────────────────┤
  │ GET /{tour}/fixtures/{start}/{end}      │ Fixtures over a date range        │
  ├─────────────────────────────────────────┼───────────────────────────────────┤
  │ GET /{tour}/tournament/calendar/{year}  │ Tournament calendar               │
  ├─────────────────────────────────────────┼───────────────────────────────────┤
  │ GET /search?search={query}              │ Player search (ATP + WTA results) │
  └─────────────────────────────────────────┴───────────────────────────────────┘

  ▎ Note: GET /tennis/v2/ranking (no tour prefix) returns ranking category metadata, not player rankings.

  ▎ Note: The WTA rankings API returns points multiplied by 100. The app normalizes this automatically in src/lib/api.ts.
