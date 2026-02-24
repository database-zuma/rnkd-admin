import * as React from "react"
import { cn } from "@/lib/utils"

export function PageHeader({ 
  title, 
  description, 
  action, 
  className 
}: { 
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8", className)}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-rnkd-text-primary">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-rnkd-text-secondary">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  )
}
