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
    <div className={cn("mb-8", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#F5F5F7]">{title}</h1>
          {description && (
            <p className="mt-1.5 text-sm text-[#A1A1A6]">
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
      <div className="mt-4 h-px bg-gradient-to-r from-[#D2F802]/20 via-white/[0.06] to-transparent" />
    </div>
  )
}
