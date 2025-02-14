import { cn } from "@/lib/utils"
import type React from "react"

type BadgeProps = {
  name: string
  icon: React.ReactNode
  earned: boolean
  className?: string
}

export function Badge({ name, icon, earned, className }: BadgeProps) {
  return (
    <div className={cn("flex flex-col items-center p-2", earned ? "text-green-600" : "text-gray-400", className)}>
      <div className="w-16 h-16 mb-2">{icon}</div>
      <span className="text-sm font-medium text-center">{name}</span>
    </div>
  )
}

