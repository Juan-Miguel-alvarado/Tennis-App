import { IconAlertCircle } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({ message = "Something went wrong", onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
      <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
        <IconAlertCircle className="w-6 h-6 text-destructive" />
      </div>
      <div>
        <p className="font-medium text-sm">{message}</p>
        <p className="text-xs text-muted-foreground mt-1">Please try again later</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}
