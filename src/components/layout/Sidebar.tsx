import { NavLink } from "react-router-dom"
import {
  IconLayoutDashboard,
  IconUsers,
  IconActivity,
  IconTrophy,
  IconCalendarEvent,
  IconX,
  IconBallTennis,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"

const navItems = [
  { to: "/", label: "Dashboard", icon: IconLayoutDashboard, end: true },
  { to: "/players", label: "Players", icon: IconUsers },
  { to: "/matches", label: "Matches", icon: IconActivity },
  { to: "/rankings", label: "Rankings", icon: IconTrophy },
  { to: "/events", label: "Events", icon: IconCalendarEvent },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={onClose} />
      )}
      <aside
        className={cn(
          "fixed top-0 left-0 z-30 h-full w-64 bg-sidebar text-sidebar-foreground flex flex-col transition-transform duration-300 md:translate-x-0 md:static md:z-auto",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <IconBallTennis className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-bold text-sm text-sidebar-foreground">Tennis Analytics</div>
              <div className="text-xs text-sidebar-foreground/50">Made by Juan</div>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden p-1 rounded-md hover:bg-sidebar-accent transition-colors">
            <IconX className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-sidebar-border">
          <div className="rounded-lg bg-sidebar-accent/50 px-3 py-2.5">
            <p className="text-xs text-sidebar-foreground/50 mb-1">Data Source</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-sidebar-foreground/70">Matchstat API · Live</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
