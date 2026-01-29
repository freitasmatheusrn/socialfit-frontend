/* eslint-disable react/no-children-prop */
"use client"

import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { updatePhone } from "@/services/auth"
import { toast } from "sonner"
import * as z from "zod"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useIMask } from "react-imask"
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
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  numero: z
    .string()
    .min(14, "O número deve ter pelo menos 10 dígitos.")
    .max(15, "O número deve ter no máximo 11 dígitos."),
})

type ServerErrors = Record<string, string[]>

export default function MudarNumero() {
  const router = useRouter()
  const [serverErrors, setServerErrors] = React.useState<ServerErrors>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const { ref: phoneRef } = useIMask<HTMLInputElement>({
    mask: "(00) 00000-0000",
  })

  const form = useForm({
    defaultValues: {
      numero: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)
      try {
        await updatePhone({
          phone: value.numero,
        })

        toast.success("Número atualizado com sucesso!", {
          richColors: true,
          description: "Você receberá um novo código de confirmação.",
        })
        router.push("/signup/confirm")
      } catch (err: any) {
        if (err.causes && err.causes.length > 0) {
          const fieldNameMap: Record<string, string> = {
            phone: "numero",
          }

          const fieldErrors: ServerErrors = {}
          err.causes.forEach(
            ({ field, message }: { field: string; message: string }) => {
              const formFieldName = fieldNameMap[field] ?? field
              if (!fieldErrors[formFieldName]) {
                fieldErrors[formFieldName] = []
              }
              fieldErrors[formFieldName].push(message)
            }
          )

          setServerErrors(fieldErrors)

          toast.error("Erro ao atualizar número", {
            richColors: true,
            description: err.message ?? "Verifique os campos destacados",
          })
        } else {
          toast.error("Erro ao atualizar número", {
            richColors: true,
            description: err.message ?? "Erro inesperado. Tente novamente.",
          })
        }
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Alterar Número</CardTitle>
          <CardDescription>
            Informe o novo número de telefone para receber o código de
            confirmação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="update-phone-form"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <FieldGroup>
              <form.Field
                name="numero"
                children={(field) => {
                  const fieldServerErrors = serverErrors[field.name] ?? []
                  const hasServerError = fieldServerErrors.length > 0
                  const isInvalid =
                    (field.state.meta.isTouched &&
                      (field.state.meta.errors.length > 0 ||
                        !field.state.meta.isValid)) ||
                    hasServerError
                  const allErrors = [
                    ...field.state.meta.errors,
                    ...fieldServerErrors.map((msg) => ({ message: msg })),
                  ]
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Novo Número de Telefone
                      </FieldLabel>
                      <Input
                        ref={phoneRef as React.RefObject<HTMLInputElement>}
                        id={field.name}
                        name={field.name}
                        type="tel"
                        defaultValue={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          field.handleChange(e.target.value)
                          if (hasServerError)
                            setServerErrors((prev) => ({
                              ...prev,
                              [field.name]: [],
                            }))
                        }}
                        aria-invalid={isInvalid}
                        placeholder="(11) 99999-9999"
                        autoComplete="tel"
                        autoFocus
                      />
                      {isInvalid && <FieldError errors={allErrors} />}
                    </Field>
                  )
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            form="update-phone-form"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Atualizando..." : "Atualizar Número"}
          </Button>
          <Link
            href="/signup/confirm"
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Voltar para confirmação
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
