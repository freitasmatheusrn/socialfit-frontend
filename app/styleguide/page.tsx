"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle, CheckCircle, Info, AlertTriangle, Moon, Sun } from "lucide-react"

const primaryScale = [
  { name: "50", value: "#fef1f4", var: "--primary-50" },
  { name: "100", value: "#fce4ea", var: "--primary-100" },
  { name: "200", value: "#f9c9d6", var: "--primary-200" },
  { name: "300", value: "#f5a0b8", var: "--primary-300" },
  { name: "400", value: "#ee6d91", var: "--primary-400" },
  { name: "500", value: "#e4406d", var: "--primary-500" },
  { name: "600", value: "#d01f53", var: "--primary-600" },
  { name: "700", value: "#bb0233", var: "--primary-700" },
  { name: "800", value: "#930329", var: "--primary-800" },
  { name: "900", value: "#7b0524", var: "--primary-900" },
  { name: "950", value: "#450011", var: "--primary-950" },
]

const greyScale = [
  { name: "50", value: "#fafafa", var: "--grey-50" },
  { name: "100", value: "#f5f5f5", var: "--grey-100" },
  { name: "200", value: "#e5e5e5", var: "--grey-200" },
  { name: "300", value: "#d4d4d4", var: "--grey-300" },
  { name: "400", value: "#a3a3a3", var: "--grey-400" },
  { name: "500", value: "#737373", var: "--grey-500" },
  { name: "600", value: "#525252", var: "--grey-600" },
  { name: "700", value: "#404040", var: "--grey-700" },
  { name: "800", value: "#262626", var: "--grey-800" },
  { name: "900", value: "#171717", var: "--grey-900" },
  { name: "950", value: "#0a0a0a", var: "--grey-950" },
]

const semanticColors = [
  { name: "Primary", value: "#bb0233", var: "--primary", textVar: "--primary-foreground" },
  { name: "Success", value: "#16a34a", var: "--success", textVar: "--success-foreground" },
  { name: "Warning", value: "#f59e0b", var: "--warning", textVar: "--warning-foreground" },
  { name: "Destructive", value: "#dc2626", var: "--destructive", textVar: "--destructive-foreground" },
  { name: "Info", value: "#3b82f6", var: "--info", textVar: "--info-foreground" },
]

const chartColors = [
  { name: "Chart 1", value: "#bb0233", var: "--chart-1" },
  { name: "Chart 2", value: "#e91e63", var: "--chart-2" },
  { name: "Chart 3", value: "#9c27b0", var: "--chart-3" },
  { name: "Chart 4", value: "#673ab7", var: "--chart-4" },
  { name: "Chart 5", value: "#3f51b5", var: "--chart-5" },
]

const radiusSizes = [
  { name: "sm", description: "Small (8px)", class: "rounded-sm" },
  { name: "md", description: "Medium (12px)", class: "rounded-md" },
  { name: "lg", description: "Large (16px)", class: "rounded-lg" },
  { name: "xl", description: "XL (20px)", class: "rounded-xl" },
  { name: "2xl", description: "2XL (24px)", class: "rounded-2xl" },
  { name: "full", description: "Full (pill)", class: "rounded-full" },
]

function ColorSwatch({
  name,
  value,
  variable,
  textColor = "white",
  small = false
}: {
  name: string
  value: string
  variable: string
  textColor?: string
  small?: boolean
}) {
  const isDark = parseInt(value.slice(1), 16) < 0x888888
  const textClass = isDark ? "text-white" : "text-grey-900"

  return (
    <div className={`flex flex-col ${small ? "gap-1" : "gap-2"}`}>
      <div
        className={`${small ? "h-12 w-full" : "h-20 w-full"} rounded-lg flex items-end p-2 ${textClass}`}
        style={{ backgroundColor: value }}
      >
        <span className="text-xs font-medium opacity-90">{value}</span>
      </div>
      <div className="space-y-0.5">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-muted-foreground font-mono">{variable}</p>
      </div>
    </div>
  )
}

function Section({
  title,
  description,
  children
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      {children}
    </section>
  )
}

export default function StyleguidePage() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="p-8 space-y-12 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Design Tokens</h1>
          <p className="text-muted-foreground mt-2">
            Foundation of the SocialFit design system
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="h-10 w-10"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      {/* Primary Color Scale */}
      <Section
        title="Primary Colors"
        description="Crimson red - the main brand color (#bb0233)"
      >
        <div className="grid grid-cols-11 gap-2">
          {primaryScale.map((color) => (
            <ColorSwatch
              key={color.name}
              name={color.name}
              value={color.value}
              variable={color.var}
              small
            />
          ))}
        </div>
      </Section>

      {/* Grey Scale */}
      <Section
        title="Grey Scale"
        description="Neutral colors for backgrounds, borders, and text"
      >
        <div className="grid grid-cols-11 gap-2">
          {greyScale.map((color) => (
            <ColorSwatch
              key={color.name}
              name={color.name}
              value={color.value}
              variable={color.var}
              small
            />
          ))}
        </div>
      </Section>

      {/* Semantic Colors */}
      <Section
        title="Semantic Colors"
        description="Colors with specific meaning in the UI"
      >
        <div className="grid grid-cols-5 gap-4">
          {semanticColors.map((color) => (
            <div key={color.name} className="space-y-2">
              <div
                className="h-24 rounded-lg flex items-center justify-center text-white font-medium"
                style={{ backgroundColor: color.value }}
              >
                {color.name}
              </div>
              <div>
                <p className="text-sm font-medium">{color.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{color.var}</p>
                <p className="text-xs text-muted-foreground">{color.value}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Chart Colors */}
      <Section
        title="Chart Colors"
        description="Colors for data visualization"
      >
        <div className="grid grid-cols-5 gap-4">
          {chartColors.map((color) => (
            <div key={color.name} className="space-y-2">
              <div
                className="h-16 rounded-lg"
                style={{ backgroundColor: color.value }}
              />
              <div>
                <p className="text-sm font-medium">{color.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{color.var}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section
        title="Typography"
        description="Sora - a modern geometric sans-serif typeface"
      >
        <div className="space-y-6 p-6 bg-card rounded-xl border">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Headings</h3>
            <div className="space-y-3">
              <p className="text-5xl font-bold">Heading 1 (5xl Bold)</p>
              <p className="text-4xl font-bold">Heading 2 (4xl Bold)</p>
              <p className="text-3xl font-semibold">Heading 3 (3xl Semibold)</p>
              <p className="text-2xl font-semibold">Heading 4 (2xl Semibold)</p>
              <p className="text-xl font-medium">Heading 5 (xl Medium)</p>
              <p className="text-lg font-medium">Heading 6 (lg Medium)</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Body Text</h3>
            <div className="space-y-3">
              <p className="text-lg">Large body text (lg) - Perfect for introductions and important paragraphs.</p>
              <p className="text-base">Base body text (base) - The default size for most content and descriptions.</p>
              <p className="text-sm">Small body text (sm) - Used for captions, labels, and secondary information.</p>
              <p className="text-xs">Extra small text (xs) - Used for fine print and metadata.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Font Weights</h3>
            <div className="flex flex-wrap gap-6">
              <span className="font-thin">Thin (100)</span>
              <span className="font-extralight">Extra Light (200)</span>
              <span className="font-light">Light (300)</span>
              <span className="font-normal">Normal (400)</span>
              <span className="font-medium">Medium (500)</span>
              <span className="font-semibold">Semibold (600)</span>
              <span className="font-bold">Bold (700)</span>
              <span className="font-extrabold">Extra Bold (800)</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Border Radius */}
      <Section
        title="Border Radius"
        description="Rounded corners for a modern, friendly feel"
      >
        <div className="grid grid-cols-6 gap-4">
          {radiusSizes.map((radius) => (
            <div key={radius.name} className="space-y-2 text-center">
              <div
                className={`h-20 bg-primary ${radius.class}`}
              />
              <div>
                <p className="text-sm font-medium">{radius.name}</p>
                <p className="text-xs text-muted-foreground">{radius.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Shadows */}
      <Section
        title="Shadows"
        description="Elevation and depth effects"
      >
        <div className="grid grid-cols-4 gap-6">
          <div className="space-y-2 text-center">
            <div className="h-20 bg-card rounded-lg shadow-sm" />
            <p className="text-sm font-medium">Shadow SM</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-20 bg-card rounded-lg shadow" />
            <p className="text-sm font-medium">Shadow</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-20 bg-card rounded-lg shadow-md" />
            <p className="text-sm font-medium">Shadow MD</p>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-20 bg-card rounded-lg shadow-lg" />
            <p className="text-sm font-medium">Shadow LG</p>
          </div>
        </div>
      </Section>

      {/* Component Previews */}
      <Section
        title="Components"
        description="UI components using the design tokens"
      >
        <div className="grid gap-8">
          {/* Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">Large</Button>
              <Button size="default">Default</Button>
              <Button size="sm">Small</Button>
              <Button size="icon"><Sun className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* Badges */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Badges</h3>
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Cards</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Event Card</CardTitle>
                  <CardDescription>A sample card component</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card uses the design system tokens for colors, spacing, and typography.</p>
                </CardContent>
                <CardFooter>
                  <Button>Learn More</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Concert</CardTitle>
                  <CardDescription>Upcoming Events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Badge>Concerts</Badge>
                      <Badge variant="secondary">Music</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      13 August, Hollywood Bowl
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span className="text-sm text-muted-foreground">178 attending</span>
                  <Button size="sm">RSVP</Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Alerts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Alerts</h3>
            <div className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  This is an informational alert using the default styling.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Something went wrong. Please try again later.
                </AlertDescription>
              </Alert>
            </div>
          </div>

          {/* Radio Group */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Radio Group</h3>
            <RadioGroup defaultValue="concerts" className="flex gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="concerts" id="concerts" />
                <label htmlFor="concerts" className="text-sm font-medium">Concerts</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="exhibitions" id="exhibitions" />
                <label htmlFor="exhibitions" className="text-sm font-medium">Exhibitions</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lectures" id="lectures" />
                <label htmlFor="lectures" className="text-sm font-medium">Lectures</label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </Section>

      {/* Design Summary */}
      <Section title="Design Summary">
        <Card>
          <CardContent className="pt-6">
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Primary Color</dt>
                <dd className="flex items-center gap-2 mt-1">
                  <span className="w-4 h-4 rounded bg-primary" />
                  <span>#bb0233 (Crimson)</span>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Font</dt>
                <dd className="mt-1">Sora</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Style</dt>
                <dd className="mt-1">Modern, bold, event-focused</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Border Radius</dt>
                <dd className="mt-1">Rounded 16px (1rem)</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-sm font-medium text-muted-foreground">Overall Feel</dt>
                <dd className="mt-1">
                  A dark-first design optimized for entertainment and events. Features bold crimson
                  accents that create energy and excitement, paired with a clean geometric typeface
                  (Sora) for modern readability. Large rounded corners give a friendly, approachable
                  feel perfect for a social platform.
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </Section>
    </div>
  )
}
