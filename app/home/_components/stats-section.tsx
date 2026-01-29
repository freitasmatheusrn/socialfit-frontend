"use client"

import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface BarChartData {
  label: string
  value: number
}

const weeklyData: BarChartData[] = [
  { label: "Seg", value: 3 },
  { label: "Ter", value: 7 },
  { label: "Qua", value: 5 },
  { label: "Qui", value: 9 },
  { label: "Sex", value: 6 },
]

function BarChart() {
  const maxValue = Math.max(...weeklyData.map((d) => d.value))

  return (
    <Card className="bg-card">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-foreground mb-4">
          Novos membros
        </h3>
        <div className="flex items-end justify-between gap-2 h-24">
          {weeklyData.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <div
                className="w-8 bg-foreground rounded-sm transition-all"
                style={{
                  height: `${(item.value / maxValue) * 100}%`,
                  minHeight: "8px",
                }}
              />
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface CircularProgressProps {
  percentage: number
  label: string
}

function CircularProgress({ percentage, label }: CircularProgressProps) {
  const circumference = 2 * Math.PI * 40
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <Card className="bg-card">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="relative size-24">
          <svg className="size-24 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className="text-foreground"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
                transition: "stroke-dashoffset 0.5s ease",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold">{percentage}%</span>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </CardContent>
    </Card>
  )
}

interface MetricCardProps {
  value: string
  label: string
  showArrow?: boolean
}

function MetricCard({ value, label, showArrow = true }: MetricCardProps) {
  return (
    <Card className="bg-card">
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
        {showArrow && (
          <ArrowRight className="size-5 text-muted-foreground" />
        )}
      </CardContent>
    </Card>
  )
}

export function StatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <BarChart />
      <CircularProgress percentage={68} label="Taxa de sucesso" />
      <MetricCard value="53" label="Eventos ativos" />
      <MetricCard value="R$ 15.890" label="Receita do mês" />
    </div>
  )
}
