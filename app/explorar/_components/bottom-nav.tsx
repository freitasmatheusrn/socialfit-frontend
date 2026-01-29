"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Compass, Ticket, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScrollDirection } from "@/hooks/use-scroll-direction"

const navItems = [
  { label: "Explorar", href: "/explorar", icon: Compass },
  { label: "Atividades", href: "/explore", icon: Compass },
  { label: "Ingressos", href: "/tickets", icon: Ticket },
  { label: "Perfil", href: "/profile", icon: User },
]

export function BottomNav() {
  const pathname = usePathname()
  const scrollDirection = useScrollDirection()

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm",
        "transition-transform duration-300 ease-in-out",
        "pb-[env(safe-area-inset-bottom)]",
        "md:hidden",
        scrollDirection === "down" ? "translate-y-full" : "translate-y-0"
      )}
    >
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 text-xs font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("size-5", isActive && "text-primary")} />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
