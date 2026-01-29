"use client"

import { ArrowUpDown, MoreVertical, MessageSquare, CheckSquare, Calendar, MapPin, Mail } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface KanbanItem {
  id: string
  title: string
  description: string
  date: string
  comments: number
  tasks: number
  location?: string
  email?: string
  manager?: {
    name: string
    avatar: string
    initials: string
  }
  isExpanded?: boolean
}

interface KanbanColumn {
  id: string
  title: string
  count: number
  items: KanbanItem[]
}

const mockKanbanData: KanbanColumn[] = [
  {
    id: "interested",
    title: "Interessados",
    count: 12,
    items: [
      {
        id: "1",
        title: "Academia FitPower",
        description: "Rede de academias com foco em musculação e cardio",
        date: "18 Abr",
        comments: 2,
        tasks: 1,
      },
      {
        id: "2",
        title: "Studio Flex",
        description: "Soluções inovadoras baseadas em inteligência artificial",
        date: "21 Mar",
        comments: 1,
        tasks: 3,
      },
      {
        id: "3",
        title: "CrossFit Elite",
        description: "Atração de leads e automação para pequenos negócios",
        date: "Sem prazo",
        comments: 4,
        tasks: 7,
      },
    ],
  },
  {
    id: "negotiation",
    title: "Negociação",
    count: 17,
    items: [
      {
        id: "4",
        title: "Wellness Hub",
        description: "Plataforma para desenvolvimento profissional",
        date: "09 Mar",
        comments: 4,
        tasks: 1,
      },
      {
        id: "5",
        title: "Zen Yoga",
        description: "Plataforma para suporte psicológico e consultas",
        date: "Sem prazo",
        comments: 7,
        tasks: 2,
      },
      {
        id: "6",
        title: "Speed Cargo",
        description: "Transporte internacional de produtos químicos",
        date: "23 Abr",
        comments: 2,
        tasks: 5,
      },
    ],
  },
  {
    id: "proposal",
    title: "Proposta Enviada",
    count: 13,
    items: [
      {
        id: "7",
        title: "FitLife Nutrition",
        description: "Alimentos nutritivos e nutracêuticos para indivíduos",
        date: "10 Mar",
        comments: 1,
        tasks: 3,
      },
      {
        id: "8",
        title: "Prime Gym",
        description: "Incorporadora de imóveis residenciais e comerciais",
        date: "16 Abr",
        location: "Av. Brasil, 540, Natal, RN",
        email: "contato@primegym.com",
        manager: {
          name: "Carlos Mendes",
          avatar: "",
          initials: "CM",
        },
        comments: 1,
        tasks: 1,
        isExpanded: true,
      },
      {
        id: "9",
        title: "NextGen Training",
        description: "Plataforma de treinamento de última geração",
        date: "",
        comments: 0,
        tasks: 0,
      },
    ],
  },
  {
    id: "closed",
    title: "Fechado",
    count: 12,
    items: [
      {
        id: "10",
        title: "CloudSphere",
        description: "Serviços em nuvem para armazenamento e processamento",
        date: "24 Mar",
        comments: 2,
        tasks: 1,
      },
      {
        id: "11",
        title: "Advantage Pro",
        description: "Ciclo completo de publicidade digital e promoção em mídias sociais",
        date: "05 Abr",
        comments: 1,
        tasks: 3,
      },
      {
        id: "12",
        title: "Safebank Solutions",
        description: "Tecnologias financeiras inovadoras e pagamentos digitais",
        date: "30 Mar",
        comments: 4,
        tasks: 7,
      },
    ],
  },
]

interface KanbanCardProps {
  item: KanbanItem
}

function KanbanCard({ item }: KanbanCardProps) {
  return (
    <Card className={`bg-card ${item.isExpanded ? "border-primary/50" : ""}`}>
      <CardHeader className="p-3 pb-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium text-sm leading-tight">{item.title}</h4>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-6 shrink-0">
                <MoreVertical className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuItem>Mover</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0 space-y-3">
        <p className="text-xs text-muted-foreground line-clamp-2">
          {item.description}
        </p>

        {item.isExpanded && (
          <div className="space-y-2 pt-1">
            {item.location && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="size-3" />
                <span className="truncate">{item.location}</span>
              </div>
            )}
            {item.email && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="size-3" />
                <span className="truncate">{item.email}</span>
              </div>
            )}
            {item.manager && (
              <div className="flex items-center gap-2 pt-1">
                <Avatar className="size-6">
                  <AvatarImage src={item.manager.avatar} />
                  <AvatarFallback className="text-xs">
                    {item.manager.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Gerente</span>
                  <span className="text-xs">{item.manager.name}</span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          {item.date && (
            <Badge variant="outline" className="text-xs px-2 py-0.5 gap-1">
              <Calendar className="size-3" />
              {item.date}
            </Badge>
          )}
          <div className="flex items-center gap-2 ml-auto">
            {item.comments > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MessageSquare className="size-3" />
                {item.comments}
              </div>
            )}
            {item.tasks > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <CheckSquare className="size-3" />
                {item.tasks}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface KanbanColumnComponentProps {
  column: KanbanColumn
}

function KanbanColumnComponent({ column }: KanbanColumnComponentProps) {
  return (
    <div className="flex flex-col min-w-[280px] max-w-[320px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">{column.title}</h3>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {column.count}
          </Badge>
          <Button variant="ghost" size="icon" className="size-6">
            <ArrowUpDown className="size-3" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-3 pr-2">
          {column.items.map((item) => (
            <KanbanCard key={item.id} item={item} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export function KanbanBoard() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {mockKanbanData.map((column) => (
        <KanbanColumnComponent key={column.id} column={column} />
      ))}
    </div>
  )
}
