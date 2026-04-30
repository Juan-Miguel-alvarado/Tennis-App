import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IconMenu2, IconSearch, IconMoon, IconSun } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/hooks/useTheme"

interface HeaderProps {
  onMenuClick: () => void
  title: string
}

export function Header({ onMenuClick, title }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const { theme, toggle } = useTheme()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/players?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  return (
    <header className="h-14 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10 flex items-center px-4 gap-4">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
        <IconMenu2 className="h-5 w-5" />
      </Button>

      <h1 className="font-semibold text-base hidden sm:block">{title}</h1>

      <form onSubmit={handleSearch} className="flex-1 max-w-md ml-auto mr-auto md:ml-0">
        <div className="relative">
          <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>
      </form>

      <div className="flex items-center gap-1 ml-auto">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggle}>
          {theme === "dark" ? <IconSun className="h-4 w-4" /> : <IconMoon className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  )
}
