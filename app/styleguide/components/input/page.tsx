"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Eye, EyeOff, Search, Mail, Lock, User, Calendar, Phone } from "lucide-react"

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
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && <p className="text-muted-foreground text-sm mt-1">{description}</p>}
      </div>
      {children}
    </section>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
      <code>{children}</code>
    </pre>
  )
}

export default function InputPage() {
  const [isDark, setIsDark] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="p-8 space-y-12 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Input</h1>
          <p className="text-muted-foreground mt-2">
            A basic input field component for collecting user text input.
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

      {/* Import */}
      <Section title="Import">
        <CodeBlock>{`import { Input } from "@/components/ui/input"`}</CodeBlock>
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage" description="The default input component">
        <div className="space-y-4">
          <div className="flex flex-col gap-4 p-6 bg-card rounded-xl border">
            <Input type="email" placeholder="Email" />
          </div>
          <CodeBlock>{`<Input type="email" placeholder="Email" />`}</CodeBlock>
        </div>
      </Section>

      {/* Input Types */}
      <Section title="Input Types" description="Different HTML input types">
        <div className="space-y-4">
          <div className="grid gap-4 p-6 bg-card rounded-xl border">
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="text-input">Text</Label>
              <Input id="text-input" type="text" placeholder="Enter text" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="email-input">Email</Label>
              <Input id="email-input" type="email" placeholder="email@example.com" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="password-input">Password</Label>
              <Input id="password-input" type="password" placeholder="Enter password" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="number-input">Number</Label>
              <Input id="number-input" type="number" placeholder="0" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="tel-input">Phone</Label>
              <Input id="tel-input" type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="url-input">URL</Label>
              <Input id="url-input" type="url" placeholder="https://example.com" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="date-input">Date</Label>
              <Input id="date-input" type="date" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="time-input">Time</Label>
              <Input id="time-input" type="time" />
            </div>
          </div>
          <CodeBlock>{`<Input type="text" placeholder="Enter text" />
<Input type="email" placeholder="email@example.com" />
<Input type="password" placeholder="Enter password" />
<Input type="number" placeholder="0" />
<Input type="tel" placeholder="+1 (555) 000-0000" />
<Input type="url" placeholder="https://example.com" />
<Input type="date" />
<Input type="time" />`}</CodeBlock>
        </div>
      </Section>

      {/* With Label */}
      <Section title="With Label" description="Input paired with a label for accessibility">
        <div className="space-y-4">
          <div className="flex flex-col gap-4 p-6 bg-card rounded-xl border">
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="email-label">Email</Label>
              <Input type="email" id="email-label" placeholder="Email" />
            </div>
          </div>
          <CodeBlock>{`<div className="grid w-full max-w-sm items-center gap-2">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>`}</CodeBlock>
        </div>
      </Section>

      {/* With Helper Text */}
      <Section title="With Helper Text" description="Input with descriptive helper text below">
        <div className="space-y-4">
          <div className="flex flex-col gap-4 p-6 bg-card rounded-xl border">
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="email-helper">Email</Label>
              <Input type="email" id="email-helper" placeholder="Email" />
              <p className="text-muted-foreground text-sm">Enter your email address.</p>
            </div>
          </div>
          <CodeBlock>{`<div className="grid w-full max-w-sm items-center gap-2">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
  <p className="text-muted-foreground text-sm">Enter your email address.</p>
</div>`}</CodeBlock>
        </div>
      </Section>

      {/* With Button */}
      <Section title="With Button" description="Input combined with an action button">
        <div className="space-y-4">
          <div className="flex flex-col gap-4 p-6 bg-card rounded-xl border">
            <div className="flex w-full max-w-sm items-center gap-2">
              <Input type="email" placeholder="Email" />
              <Button type="submit" variant="outline">Subscribe</Button>
            </div>
          </div>
          <CodeBlock>{`<div className="flex w-full max-w-sm items-center gap-2">
  <Input type="email" placeholder="Email" />
  <Button type="submit" variant="outline">Subscribe</Button>
</div>`}</CodeBlock>
        </div>
      </Section>

      {/* File Input */}
      <Section title="File Input" description="Input for file uploads">
        <div className="space-y-4">
          <div className="flex flex-col gap-4 p-6 bg-card rounded-xl border">
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" />
            </div>
          </div>
          <CodeBlock>{`<div className="grid w-full max-w-sm items-center gap-2">
  <Label htmlFor="picture">Picture</Label>
  <Input id="picture" type="file" />
</div>`}</CodeBlock>
        </div>
      </Section>

      {/* States */}
      <Section title="States" description="Different input states">
        <div className="space-y-4">
          <div className="grid gap-4 p-6 bg-card rounded-xl border">
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label>Default</Label>
              <Input type="text" placeholder="Default input" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label>Disabled</Label>
              <Input disabled type="text" placeholder="Disabled input" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label>Read Only</Label>
              <Input readOnly type="text" defaultValue="Read only value" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label>With Value</Label>
              <Input type="text" defaultValue="Pre-filled value" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label>Error State</Label>
              <Input type="email" aria-invalid="true" placeholder="Invalid input" />
              <p className="text-destructive text-sm">Please enter a valid email address.</p>
            </div>
          </div>
          <CodeBlock>{`{/* Default */}
<Input type="text" placeholder="Default input" />

{/* Disabled */}
<Input disabled type="text" placeholder="Disabled input" />

{/* Read Only */}
<Input readOnly type="text" defaultValue="Read only value" />

{/* Error State */}
<Input type="email" aria-invalid="true" placeholder="Invalid input" />
<p className="text-destructive text-sm">Please enter a valid email address.</p>`}</CodeBlock>
        </div>
      </Section>

      {/* Common Form Patterns */}
      <Section title="Common Form Patterns" description="Typical form field layouts">
        <div className="space-y-4">
          <div className="p-6 bg-card rounded-xl border">
            <form className="space-y-4 max-w-sm">
              <div className="grid items-center gap-2">
                <Label htmlFor="form-name">Full Name</Label>
                <Input id="form-name" type="text" placeholder="John Doe" />
              </div>
              <div className="grid items-center gap-2">
                <Label htmlFor="form-email">Email</Label>
                <Input id="form-email" type="email" placeholder="john@example.com" />
              </div>
              <div className="grid items-center gap-2">
                <Label htmlFor="form-password">Password</Label>
                <div className="relative">
                  <Input
                    id="form-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full">Sign Up</Button>
            </form>
          </div>
        </div>
      </Section>

      {/* Props Reference */}
      <Section title="Props Reference" description="Available props for the Input component">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Prop</th>
                <th className="text-left py-3 px-4 font-medium">Type</th>
                <th className="text-left py-3 px-4 font-medium">Default</th>
                <th className="text-left py-3 px-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono text-xs">type</td>
                <td className="py-3 px-4 font-mono text-xs">string</td>
                <td className="py-3 px-4 font-mono text-xs">"text"</td>
                <td className="py-3 px-4">HTML input type</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono text-xs">placeholder</td>
                <td className="py-3 px-4 font-mono text-xs">string</td>
                <td className="py-3 px-4 font-mono text-xs">-</td>
                <td className="py-3 px-4">Placeholder text</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono text-xs">disabled</td>
                <td className="py-3 px-4 font-mono text-xs">boolean</td>
                <td className="py-3 px-4 font-mono text-xs">false</td>
                <td className="py-3 px-4">Disables the input</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono text-xs">readOnly</td>
                <td className="py-3 px-4 font-mono text-xs">boolean</td>
                <td className="py-3 px-4 font-mono text-xs">false</td>
                <td className="py-3 px-4">Makes the input read-only</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono text-xs">aria-invalid</td>
                <td className="py-3 px-4 font-mono text-xs">boolean</td>
                <td className="py-3 px-4 font-mono text-xs">false</td>
                <td className="py-3 px-4">Shows error styling</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono text-xs">className</td>
                <td className="py-3 px-4 font-mono text-xs">string</td>
                <td className="py-3 px-4 font-mono text-xs">-</td>
                <td className="py-3 px-4">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility" description="Keyboard navigation and ARIA attributes">
        <div className="p-6 bg-card rounded-xl border space-y-4">
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Always pair inputs with a <code className="bg-muted px-1.5 py-0.5 rounded">Label</code> component using <code className="bg-muted px-1.5 py-0.5 rounded">htmlFor</code></li>
            <li>Use <code className="bg-muted px-1.5 py-0.5 rounded">aria-invalid="true"</code> to indicate validation errors</li>
            <li>Provide descriptive placeholder text as a hint, not a label replacement</li>
            <li>Use <code className="bg-muted px-1.5 py-0.5 rounded">aria-describedby</code> to link helper or error text</li>
            <li>Ensure sufficient color contrast for placeholder and input text</li>
            <li>The input has visible focus states using ring styling</li>
          </ul>
        </div>
      </Section>
    </div>
  )
}
