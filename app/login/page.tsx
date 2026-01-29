/* eslint-disable react/no-children-prop */
"use client"

import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { signin } from "@/services/auth"
import { toast } from "sonner"
import * as z from "zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

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
  email: z.email("Por favor, insira um e-mail válido."),
  password: z.string().min(1, "A senha é obrigatória."),
})

export default function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await signin({
          email: value.email,
          password: value.password,
        })

        toast.success("Login realizado com sucesso!",{
          richColors: true
        })
        router.push("/explorar")
      } catch (err: any) {
        if (err.causes && err.causes.length > 0) {
          // Group causes by field
          const fieldErrors: Record<string, string[]> = {}
          err.causes.forEach(({ field, message }: { field: string; message: string }) => {
            if (!fieldErrors[field]) {
              fieldErrors[field] = []
            }
            fieldErrors[field].push(message)
          })

          // Set field errors
          Object.entries(fieldErrors).forEach(([field, messages]) => {
            form.setFieldMeta(field as any, (prev) => ({
              ...prev,
              errors: messages,
              isTouched: true,
            }))
          })
          return
        }
        toast.error("Erro ao fazer login", {
          richColors: true,
          description: err.message ?? "E-mail ou senha inválidos",
        })
      }
    },
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Entrar</CardTitle>
          <CardDescription>
            Digite seu e-mail e senha para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <FieldGroup>
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="seu@email.com"
                        autoComplete="email"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Senha</FieldLabel>
                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          type={showPassword ? "text" : "password"}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="••••••••"
                          autoComplete="current-password"
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          className="absolute right-1 top-1/2 -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Ocultar senha" : "Mostrar senha"}
                          </span>
                        </Button>
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" form="login-form" className="w-full" size="lg">
            Entrar
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Cadastre-se
            </Link>
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Esqueceu a senha?{" "}
            <Link href="/recover-account" className="text-primary hover:underline">
              Recuperar
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
