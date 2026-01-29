"use client"

import { useState } from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Moon, Sun, Search, Mail, Link, DollarSign, AtSign, Eye, EyeOff, Copy, Check, Send, Plus, ChevronDown } from "lucide-react"

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

export default function InputGroupPage() {
  const [isDark, setIsDark] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-8 space-y-12 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Input Group</h1>
          <p className="text-muted-foreground mt-2">
            Combine inputs with icons, text, buttons, and other addons.
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
        <CodeBlock>{`import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"`}</CodeBlock>
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage" description="A simple input group with search icon">
        <div className="space-y-4">
          <div className="flex flex-col gap-4 p-6 bg-card rounded-xl border">
            <InputGroup className="max-w-sm">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <Search className="h-4 w-4" />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <CodeBlock>{`<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon>
    <Search className="h-4 w-4" />
  </InputGroupAddon>
</InputGroup>`}</CodeBlock>
        </div>
      </Section>

      {/* With Icon Start */}
      <Section title="Icon at Start" description="Icon addon at the beginning of the input">
        <div className="space-y-4">
          <div className="grid gap-4 p-6 bg-card rounded-xl border">
            <InputGroup className="max-w-sm">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon align="inline-start">
                <Search className="h-4 w-4" />
              </InputGroupAddon>
            </InputGroup>
            <InputGroup className="max-w-sm">
              <InputGroupInput placeholder="Email" type="email" />
              <InputGroupAddon align="inline-start">
                <Mail className="h-4 w-4" />
              </InputGroupAddon>
            </InputGroup>
            <InputGroup className="max-w-sm">
              <InputGroupInput placeholder="@username" />
              <InputGroupAddon align="inline-start">
                <AtSign className="h-4 w-4" />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <CodeBlock>{`<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon align="inline-start">
    <Search className="h-4 w-4" />
  </InputGroupAddon>
</InputGroup>`}</CodeBlock>
        </div>
      </Section>

      {/* With Icon End */}
      <Section title="Icon at End" description="Icon addon at the end of the input">
        <div className="space-y-4">
          <div className="grid gap-4 p-6 bg-card rounded-xl border">
            <InputGroup className="max-w-sm">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon align="inline-end">
                <Search className="h-4 w-4" />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <CodeBlock>{`<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon align="inline-end">
    <Search className="h-4 w-4" />
  </InputGroupAddon>
</InputGroup>`}</CodeBlock>
        </div>
      </Section>

      {/* With Text */}
      <Section title="With Text Addon" description="Text labels as addons">
        <div className="space-y-4">
          <div className="grid gap-4 p-6 bg-card rounded-xl border">
            <InputGroup className="max-w-sm">
              <InputGroupInput placeholder="example.com" className="!pl-1" />
              <InputGroupAddon align="inline-start">
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup className="max-w-sm">
              <InputGroupInput placeholder="0.00" type="number" />
              <InputGroupAddon align="inline-start">
                <InputGroupText>$</InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <InputGroupText>USD</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup className="max-w-sm">
              <InputGroupInput placeholder="username" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>@socialfit.com</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <CodeBlock>{`<InputGroup>
  <InputGroupInput placeholder="example.com" className="!pl-1" />
  <InputGroupAddon align="inline-start">
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
</InputGroup>

<InputGroup>
  <InputGroupInput placeholder="0.00" type="number" />
  <InputGroupAddon align="inline-start">
    <InputGroupText>$</InputGroupText>
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">
    <InputGroupText>USD</InputGroupText>
  </InputGroupAddon>
</InputGroup>`}</CodeBlock>
        </div>
      </Section>

      {/* With Button */}
      <Section title="With Button" description="Action buttons inside the input group">
        <div className="space-y-4">
          <div className="grid gap-4 p-6 bg-card rounded-xl border">
            <InputGroup className="max-w-sm">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="xs">
                  <Search className="h-3.5 w-3.5" />
                  Search
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup className="max-w-sm">
              <InputGroupInput placeholder="Enter URL to copy" defaultValue="https://socialfit.com/invite/abc123" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="icon-xs" variant="ghost" onClick={handleCopy}>
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup className="max-w-sm">
              <InputGroupInput
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  size="icon-xs"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <CodeBlock>{`<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="xs">
      <Search className="h-3.5 w-3.5" />
      Search
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>

<InputGroup>
  <InputGroupInput type="password" placeholder="Enter password" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="icon-xs" variant="ghost">
      <Eye className="h-3.5 w-3.5" />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`}</CodeBlock>
        </div>
      </Section>

      {/* Both Sides */}
      <Section title="Addons on Both Sides" description="Combine addons at start and end">
        <div className="space-y-4">
          <div className="grid gap-4 p-6 bg-card rounded-xl border">
            <InputGroup className="max-w-sm">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon align="inline-start">
                <Search className="h-4 w-4" />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <InputGroupText>12 results</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup className="max-w-sm">
              <InputGroupInput placeholder="Amount" type="number" />
              <InputGroupAddon align="inline-start">
                <DollarSign className="h-4 w-4" />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="xs" variant="outline">
                  <ChevronDown className="h-3.5 w-3.5 mr-1" />
                  USD
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <CodeBlock>{`<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon align="inline-start">
    <Search className="h-4 w-4" />
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">
    <InputGroupText>12 results</InputGroupText>
  </InputGroupAddon>
</InputGroup>`}</CodeBlock>
        </div>
      </Section>

      {/* With Textarea */}
      <Section title="With Textarea" description="Input group with textarea for multi-line input">
        <div className="space-y-4">
          <div className="grid gap-4 p-6 bg-card rounded-xl border">
            <InputGroup className="max-w-md">
              <InputGroupTextarea placeholder="Ask, Search or Chat..." />
              <InputGroupAddon align="block-end">
                <InputGroupButton variant="outline" className="rounded-full" size="icon-xs">
                  <Plus className="h-3.5 w-3.5" />
                </InputGroupButton>
                <InputGroupText className="ml-auto">52% used</InputGroupText>
                <InputGroupButton variant="default" className="rounded-full" size="icon-xs">
                  <Send className="h-3.5 w-3.5" />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <CodeBlock>{`<InputGroup>
  <InputGroupTextarea placeholder="Ask, Search or Chat..." />
  <InputGroupAddon align="block-end">
    <InputGroupButton variant="outline" size="icon-xs">
      <Plus className="h-3.5 w-3.5" />
    </InputGroupButton>
    <InputGroupText className="ml-auto">52% used</InputGroupText>
    <InputGroupButton variant="default" size="icon-xs">
      <Send className="h-3.5 w-3.5" />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`}</CodeBlock>
        </div>
      </Section>

      {/* Addon Alignment */}
      <Section title="Addon Alignment" description="Different alignment options for addons">
        <div className="space-y-4">
          <div className="grid gap-4 p-6 bg-card rounded-xl border">
            <div className="space-y-2">
              <Label>inline-start (default)</Label>
              <InputGroup className="max-w-sm">
                <InputGroupInput placeholder="Input text" />
                <InputGroupAddon align="inline-start">
                  <Search className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="space-y-2">
              <Label>inline-end</Label>
              <InputGroup className="max-w-sm">
                <InputGroupInput placeholder="Input text" />
                <InputGroupAddon align="inline-end">
                  <Search className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="space-y-2">
              <Label>block-start</Label>
              <InputGroup className="max-w-sm">
                <InputGroupInput placeholder="Input text" />
                <InputGroupAddon align="block-start">
                  <InputGroupText>Header content</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="space-y-2">
              <Label>block-end</Label>
              <InputGroup className="max-w-sm">
                <InputGroupInput placeholder="Input text" />
                <InputGroupAddon align="block-end">
                  <InputGroupText>Footer content</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
          <CodeBlock>{`{/* inline-start (default) */}
<InputGroupAddon align="inline-start">...</InputGroupAddon>

{/* inline-end */}
<InputGroupAddon align="inline-end">...</InputGroupAddon>

{/* block-start */}
<InputGroupAddon align="block-start">...</InputGroupAddon>

{/* block-end */}
<InputGroupAddon align="block-end">...</InputGroupAddon>`}</CodeBlock>
        </div>
      </Section>

      {/* Button Sizes */}
      <Section title="Button Sizes" description="Different sizes for InputGroupButton">
        <div className="space-y-4">
          <div className="grid gap-4 p-6 bg-card rounded-xl border">
            <div className="space-y-2">
              <Label>size="xs" (default)</Label>
              <InputGroup className="max-w-sm">
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton size="xs">Search</InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="space-y-2">
              <Label>size="sm"</Label>
              <InputGroup className="max-w-sm">
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton size="sm">Search</InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="space-y-2">
              <Label>size="icon-xs"</Label>
              <InputGroup className="max-w-sm">
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton size="icon-xs">
                    <Search className="h-3.5 w-3.5" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="space-y-2">
              <Label>size="icon-sm"</Label>
              <InputGroup className="max-w-sm">
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton size="icon-sm">
                    <Search className="h-4 w-4" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
          <CodeBlock>{`<InputGroupButton size="xs">Search</InputGroupButton>
<InputGroupButton size="sm">Search</InputGroupButton>
<InputGroupButton size="icon-xs"><Search /></InputGroupButton>
<InputGroupButton size="icon-sm"><Search /></InputGroupButton>`}</CodeBlock>
        </div>
      </Section>

      {/* Error State */}
      <Section title="Error State" description="Input group with validation error">
        <div className="space-y-4">
          <div className="grid gap-4 p-6 bg-card rounded-xl border">
            <div className="space-y-2 max-w-sm">
              <Label>Email</Label>
              <InputGroup>
                <InputGroupInput
                  type="email"
                  placeholder="Enter email"
                  aria-invalid="true"
                />
                <InputGroupAddon align="inline-start">
                  <Mail className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>
              <p className="text-destructive text-sm">Please enter a valid email address.</p>
            </div>
          </div>
          <CodeBlock>{`<InputGroup>
  <InputGroupInput
    type="email"
    placeholder="Enter email"
    aria-invalid="true"
  />
  <InputGroupAddon align="inline-start">
    <Mail className="h-4 w-4" />
  </InputGroupAddon>
</InputGroup>
<p className="text-destructive text-sm">Please enter a valid email address.</p>`}</CodeBlock>
        </div>
      </Section>

      {/* Components Reference */}
      <Section title="Components Reference" description="Available components in the Input Group system">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Component</th>
                <th className="text-left py-3 px-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono text-xs">InputGroup</td>
                <td className="py-3 px-4">Container that wraps all input group elements</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono text-xs">InputGroupInput</td>
                <td className="py-3 px-4">The main input element, styled to work within the group</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono text-xs">InputGroupTextarea</td>
                <td className="py-3 px-4">A textarea element for multi-line input within the group</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono text-xs">InputGroupAddon</td>
                <td className="py-3 px-4">Container for addons (icons, text, buttons) with alignment control</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono text-xs">InputGroupButton</td>
                <td className="py-3 px-4">A button sized to fit within the input group</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono text-xs">InputGroupText</td>
                <td className="py-3 px-4">Text element for labels or static content</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* InputGroupAddon Props */}
      <Section title="InputGroupAddon Props">
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
                <td className="py-3 px-4 font-mono text-xs">align</td>
                <td className="py-3 px-4 font-mono text-xs">"inline-start" | "inline-end" | "block-start" | "block-end"</td>
                <td className="py-3 px-4 font-mono text-xs">"inline-start"</td>
                <td className="py-3 px-4">Position of the addon relative to the input</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* InputGroupButton Props */}
      <Section title="InputGroupButton Props">
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
                <td className="py-3 px-4 font-mono text-xs">size</td>
                <td className="py-3 px-4 font-mono text-xs">"xs" | "sm" | "icon-xs" | "icon-sm"</td>
                <td className="py-3 px-4 font-mono text-xs">"xs"</td>
                <td className="py-3 px-4">Size of the button</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono text-xs">variant</td>
                <td className="py-3 px-4 font-mono text-xs">Button variants</td>
                <td className="py-3 px-4 font-mono text-xs">"ghost"</td>
                <td className="py-3 px-4">Visual style of the button</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility" description="Keyboard navigation and ARIA attributes">
        <div className="p-6 bg-card rounded-xl border space-y-4">
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>The <code className="bg-muted px-1.5 py-0.5 rounded">InputGroup</code> uses <code className="bg-muted px-1.5 py-0.5 rounded">role="group"</code> for grouping</li>
            <li>Clicking on addons focuses the input automatically</li>
            <li>Use labels outside the group or <code className="bg-muted px-1.5 py-0.5 rounded">aria-label</code> for screen readers</li>
            <li>Buttons within the group are keyboard accessible</li>
            <li>Error states use <code className="bg-muted px-1.5 py-0.5 rounded">aria-invalid</code> and visual styling</li>
            <li>Focus states are visible with ring styling on the entire group</li>
          </ul>
        </div>
      </Section>
    </div>
  )
}
