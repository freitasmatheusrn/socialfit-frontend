"use client"

import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { signupConfirmation, resendOtp } from "@/services/auth"
import { toast } from "sonner"
import * as z from "zod"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp"

const otpSchema = z.object({
  otp: z.string().length(6, "O código deve ter 6 dígitos."),
})

type OtpConfirmFormProps = {
  phone: string
  expiresAt: number | null
}

export default function OtpConfirmForm({ phone, expiresAt }: OtpConfirmFormProps) {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = React.useState<number | null>(null)
  const [isExpired, setIsExpired] = React.useState(false)
  const [isResending, setIsResending] = React.useState(false)

  const handleResendOtp = async () => {
    setIsResending(true)
    try {
      await resendOtp()
      toast.success("Código reenviado!", {
        description: "Verifique seu telefone.",
      })
      router.refresh()
    } catch (err: any) {
      const causesMessage = err.causes?.length
        ? err.causes.map((c: { message: string }) => c.message).join(", ")
        : null
      toast.error("Erro ao reenviar código", {
        richColors: true,
        description: causesMessage ?? err.message ?? "Tente novamente mais tarde.",
      })
    } finally {
      setIsResending(false)
    }
  }

  React.useEffect(() => {
    if (!expiresAt) return

    const calculateTimeLeft = () => {
      const now = Date.now()
      const remaining = Math.max(0, expiresAt - now)
      return remaining
    }

    setTimeLeft(calculateTimeLeft())

    const interval = setInterval(() => {
      const remaining = calculateTimeLeft()
      setTimeLeft(remaining)

      if (remaining === 0) {
        clearInterval(interval)
        setIsExpired(true)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [expiresAt])

  const formatTimeLeft = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const getTimeLeftColor = () => {
    if (!timeLeft) return "text-muted-foreground"
    const seconds = Math.floor(timeLeft / 1000)
    if (seconds <= 30) return "text-destructive"
    if (seconds <= 60) return "text-yellow-600 dark:text-yellow-500"
    return "text-muted-foreground"
  }

  const form = useForm({
    defaultValues: {
      otp: "",
    },
    validators: {
      onSubmit: otpSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await signupConfirmation({ otp: value.otp })
        toast.success("Telefone confirmado com sucesso!")
        router.push("/explorar")
      } catch (err: any) {
        // If there are field-specific errors, show them in the toast description
        const causesMessage = err.causes?.length
          ? err.causes.map((c: { message: string }) => c.message).join(", ")
          : null
        toast.error("Erro ao confirmar código", {
          description: causesMessage ?? err.message ?? "Código inválido ou expirado",
        })
      }
    },
  })

  const formatPhone = (phone: string) => {
    if (!phone) return "Número não disponível"
    // If already formatted, return as is
    if (phone.includes("(")) return phone
    // Format as (XX) XXXXX-XXXX
    const cleaned = phone.replace(/\D/g, "")
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
    }
    return phone
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Confirmar Telefone</CardTitle>
          <CardDescription className="space-y-2">
            <span>
              Enviamos um código de 6 dígitos para{" "}
              <span className="font-medium text-foreground">
                {formatPhone(phone)}
              </span>
            </span>
            {timeLeft !== null && !isExpired && (
              <div className={`flex items-center justify-center gap-1.5 text-sm ${getTimeLeftColor()}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Código expira em {formatTimeLeft(timeLeft)}</span>
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isExpired ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-destructive"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-medium text-destructive">Código expirado</p>
                <p className="text-sm text-muted-foreground">
                  Solicite um novo código para continuar
                </p>
              </div>
            </div>
          ) : (
            <form
              id="otp-form"
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
              className="flex flex-col items-center gap-4"
            >
              <form.Field
                name="otp"
                children={(field) => (
                  <InputOTP
                    maxLength={6}
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          {isExpired ? (
            <Button
              onClick={handleResendOtp}
              disabled={isResending}
              className="w-full"
              size="lg"
            >
              {isResending ? "Reenviando..." : "Reenviar código"}
            </Button>
          ) : (
            <>
              <Button type="submit" form="otp-form" className="w-full" size="lg">
                Confirmar
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Não recebeu o código?{" "}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className="text-primary hover:underline disabled:opacity-50"
                >
                  {isResending ? "Reenviando..." : "Reenviar"}
                </button>
              </p>
            </>
          )}
          <p className="text-center text-sm text-muted-foreground">
            Número errado?{" "}
            <Link href="/signup/mudar-numero" className="text-primary hover:underline">
              Alterar número
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
