import type { Icon } from "@tabler/icons-react"

interface EmptyStateProps {
  icon?: Icon
  title: string
  description?: string
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center gap-2">
      {Icon && (
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-1">
          <Icon className="w-6 h-6 text-muted-foreground" />
        </div>
      )}
      <p className="font-medium text-sm">{title}</p>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  )
}
