export interface Event {
  id: string
  title: string
  date: string
  location: string
  gradient: string
  isFavorited: boolean
  category: string
}

export interface SportsClass {
  id: string
  title: string
  instructor: string
  time: string
  daysOfWeek: string[]
  gradient: string
  spotsLeft: number
  totalSpots: number
  level: "Iniciante" | "Intermediário" | "Avançado"
}

export interface Category {
  id: string
  name: string
  icon: string
}

export interface UserSummary {
  name: string
  avatarUrl: string
  city: string
}
