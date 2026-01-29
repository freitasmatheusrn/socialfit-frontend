"use client"

import { useIsMobile } from "@/hooks/use-is-mobile"
import { MobileHome } from "./_components/mobile-home"
import { DesktopHome } from "./_components/desktop-home"
import { Skeleton } from "@/components/ui/skeleton"

export default function HomePage() {
  const isMobile = useIsMobile()

  if (isMobile === undefined) {
    return (
      <div className="min-h-screen bg-background p-4 space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="size-11 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-5 w-28 rounded" />
          </div>
        </div>
        <Skeleton className="h-11 w-full rounded-xl" />
        <Skeleton className="h-5 w-36 rounded" />
        <div className="flex gap-3">
          <Skeleton className="h-52 w-40 rounded-2xl flex-shrink-0" />
          <Skeleton className="h-52 w-40 rounded-2xl flex-shrink-0" />
        </div>
      </div>
    )
  }

  return isMobile ? <MobileHome /> : <DesktopHome />
}
