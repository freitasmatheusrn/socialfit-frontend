/* eslint-disable react/no-children-prop */
"use client"


import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { signup } from "@/services/auth"
import { toast } from "sonner"
import * as z from "zod"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useIMask } from "react-imask"

import { cn } from "@/lib/utils"

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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from "next/navigation"
import { log } from "console"

const formSchema = z
  .object({
    nome: z
      .string()
      .min(3, "O nome deve ter pelo menos 3 caracteres.")
      .max(100, "O nome deve ter no máximo 100 caracteres."),
    email: z
      .email("Por favor, insira um e-mail válido."),
    cpf: z
      .string()
      .min(14, "CPF inválido.")
      .max(14, "CPF inválido."),
    nascimento: z
      .date({ message: "Por favor, selecione sua data de nascimento." })
      .refine((date) => date <= new Date(), {
        message: "A data de nascimento não pode ser no futuro.",
      }),
    numero: z
      .string()
      .min(14, "O número deve ter pelo menos 10 dígitos.")
      .max(15, "O número deve ter no máximo 11 dígitos."),
    senha: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres.")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
      .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
      .regex(/[0-9]/, "A senha deve conter pelo menos um número."),
    confirmacaoSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmacaoSenha, {
    message: "As senhas não coincidem.",
    path: ["confirmacaoSenha"],
  })

type ServerErrors = Record<string, string[]>

export default function Signup() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [datePickerOpen, setDatePickerOpen] = React.useState(false)
  const [serverErrors, setServerErrors] = React.useState<ServerErrors>({})

  const { ref: phoneRef } = useIMask<HTMLInputElement>({
    mask: "(00) 00000-0000",
  })

  const { ref: cpfRef } = useIMask<HTMLInputElement>({
    mask: "000.000.000-00",
  })

  const form = useForm({
    defaultValues: {
      nome: "",
      email: "",
      cpf: "",
      nascimento: undefined as Date | undefined,
      numero: "",
      senha: "",
      confirmacaoSenha: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await signup({
          name: value.nome,
          email: value.email,
          cpf: value.cpf,
          birth_date: value.nascimento!.toISOString().split("T")[0],
          phone: value.numero,
          password: value.senha,
        })

        toast.success("Cadastro realizado com sucesso! Por favor confirme seu telefone", {
          richColors: true,
          description: "Verifique seu e-mail para confirmar a conta.",
        })
        router.push("/signup/confirm")

      } catch (err: any) {
        console.log(err)
        if (err.causes && err.causes.length > 0) {
          // Map API field names to form field names
          const fieldNameMap: Record<string, string> = {
            birth_date: "nascimento",
            name: "nome",
            phone: "numero",
            password: "senha",
            cpf: "cpf"
          }

          // Group causes by field
          const fieldErrors: ServerErrors = {}
          err.causes.forEach(({ field, message }: { field: string; message: string }) => {
            const formFieldName = fieldNameMap[field] ?? field
            if (!fieldErrors[formFieldName]) {
              fieldErrors[formFieldName] = []
            }
            fieldErrors[formFieldName].push(message)
          })

          setServerErrors(fieldErrors)

          toast.error("Erro ao criar conta", {
            richColors: true,
            description: err.message ?? "Verifique os campos destacados",
          })
          return
        }
        toast.error("Erro ao criar conta", {
          richColors: true,
          description: err.message ?? "Erro inesperado",
        })
      }
    },
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Criar Conta</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para criar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="signup-form"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <FieldGroup>
              <form.Field
                name="nome"
                children={(field) => {
                  const fieldServerErrors = serverErrors[field.name] ?? []
                  const hasServerError = fieldServerErrors.length > 0
                  const isInvalid =
                    (field.state.meta.isTouched && (field.state.meta.errors.length > 0 || !field.state.meta.isValid)) || hasServerError
                  const allErrors = [
                    ...field.state.meta.errors,
                    ...fieldServerErrors.map(msg => ({ message: msg }))
                  ]
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Nome</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          field.handleChange(e.target.value)
                          if (hasServerError) setServerErrors(prev => ({ ...prev, [field.name]: [] }))
                        }}
                        aria-invalid={isInvalid}
                        placeholder="Seu nome completo"
                        autoComplete="name"
                      />
                      {isInvalid && (
                        <FieldError errors={allErrors} />
                      )}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="email"
                children={(field) => {
                  const fieldServerErrors = serverErrors[field.name] ?? []
                  const hasServerError = fieldServerErrors.length > 0
                  const isInvalid =
                    (field.state.meta.isTouched && (field.state.meta.errors.length > 0 || !field.state.meta.isValid)) || hasServerError
                  const allErrors = [
                    ...field.state.meta.errors,
                    ...fieldServerErrors.map(msg => ({ message: msg }))
                  ]
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          field.handleChange(e.target.value)
                          if (hasServerError) setServerErrors(prev => ({ ...prev, [field.name]: [] }))
                        }}
                        aria-invalid={isInvalid}
                        placeholder="seu@email.com"
                        autoComplete="email"
                      />
                      {isInvalid && (
                        <FieldError errors={allErrors} />
                      )}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="cpf"
                children={(field) => {
                  const fieldServerErrors = serverErrors[field.name] ?? []
                  const hasServerError = fieldServerErrors.length > 0
                  const isInvalid =
                    (field.state.meta.isTouched && (field.state.meta.errors.length > 0 || !field.state.meta.isValid)) || hasServerError
                  const allErrors = [
                    ...field.state.meta.errors,
                    ...fieldServerErrors.map(msg => ({ message: msg }))
                  ]
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>CPF</FieldLabel>
                      <Input
                        ref={cpfRef as React.RefObject<HTMLInputElement>}
                        id={field.name}
                        name={field.name}
                        defaultValue={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          field.handleChange(e.target.value)
                          if (hasServerError) setServerErrors(prev => ({ ...prev, [field.name]: [] }))
                        }}
                        aria-invalid={isInvalid}
                        placeholder="000.000.000-00"
                      />
                      {isInvalid && (
                        <FieldError errors={allErrors} />
                      )}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="nascimento"
                children={(field) => {
                  const fieldServerErrors = serverErrors[field.name] ?? []
                  const hasServerError = fieldServerErrors.length > 0
                  const isInvalid =
                    (field.state.meta.isTouched && (field.state.meta.errors.length > 0 || !field.state.meta.isValid)) || hasServerError
                  const allErrors = [
                    ...field.state.meta.errors,
                    ...fieldServerErrors.map(msg => ({ message: msg }))
                  ]
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Data de Nascimento
                      </FieldLabel>
                      <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            id={field.name}
                            variant="outline"
                            className={cn(
                              "w-full justify-start font-normal",
                              !field.state.value && "text-muted-foreground"
                            )}
                            aria-invalid={isInvalid}
                          >
                            {field.state.value
                              ? field.state.value.toLocaleDateString("pt-BR")
                              : "Selecione uma data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.state.value}
                            defaultMonth={field.state.value}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              field.handleChange(date)
                              field.handleBlur()
                              setDatePickerOpen(false)
                              if (hasServerError) setServerErrors(prev => ({ ...prev, [field.name]: [] }))
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      {isInvalid && (
                        <FieldError errors={allErrors} />
                      )}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="numero"
                children={(field) => {
                  const fieldServerErrors = serverErrors[field.name] ?? []
                  const hasServerError = fieldServerErrors.length > 0
                  const isInvalid =
                    (field.state.meta.isTouched && (field.state.meta.errors.length > 0 || !field.state.meta.isValid)) || hasServerError
                  const allErrors = [
                    ...field.state.meta.errors,
                    ...fieldServerErrors.map(msg => ({ message: msg }))
                  ]
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Número</FieldLabel>
                      <Input
                        ref={phoneRef as React.RefObject<HTMLInputElement>}
                        id={field.name}
                        name={field.name}
                        type="tel"
                        defaultValue={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          field.handleChange(e.target.value)
                          if (hasServerError) setServerErrors(prev => ({ ...prev, [field.name]: [] }))
                        }}
                        aria-invalid={isInvalid}
                        placeholder="(11) 99999-9999"
                        autoComplete="tel"
                      />
                      {isInvalid && (
                        <FieldError errors={allErrors} />
                      )}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="senha"
                children={(field) => {
                  const fieldServerErrors = serverErrors[field.name] ?? []
                  const hasServerError = fieldServerErrors.length > 0
                  const isInvalid =
                    (field.state.meta.isTouched && (field.state.meta.errors.length > 0 || !field.state.meta.isValid)) || hasServerError
                  const allErrors = [
                    ...field.state.meta.errors,
                    ...fieldServerErrors.map(msg => ({ message: msg }))
                  ]
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
                          onChange={(e) => {
                            field.handleChange(e.target.value)
                            if (hasServerError) setServerErrors(prev => ({ ...prev, [field.name]: [] }))
                          }}
                          aria-invalid={isInvalid}
                          placeholder="••••••••"
                          autoComplete="new-password"
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
                      <FieldDescription>
                        Mínimo 8 caracteres, com maiúscula, minúscula e número
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={allErrors} />
                      )}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="confirmacaoSenha"
                children={(field) => {
                  const fieldServerErrors = serverErrors[field.name] ?? []
                  const hasServerError = fieldServerErrors.length > 0
                  const isInvalid =
                    (field.state.meta.isTouched && (field.state.meta.errors.length > 0 || !field.state.meta.isValid)) || hasServerError
                  const allErrors = [
                    ...field.state.meta.errors,
                    ...fieldServerErrors.map(msg => ({ message: msg }))
                  ]
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Confirmação de Senha
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          type={showConfirmPassword ? "text" : "password"}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => {
                            field.handleChange(e.target.value)
                            if (hasServerError) setServerErrors(prev => ({ ...prev, [field.name]: [] }))
                          }}
                          aria-invalid={isInvalid}
                          placeholder="••••••••"
                          autoComplete="new-password"
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          className="absolute right-1 top-1/2 -translate-y-1/2"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                          <span className="sr-only">
                            {showConfirmPassword
                              ? "Ocultar senha"
                              : "Mostrar senha"}
                          </span>
                        </Button>
                      </div>
                      {isInvalid && (
                        <FieldError errors={allErrors} />
                      )}
                    </Field>
                  )
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" form="signup-form" className="w-full" size="lg">
            Cadastrar
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Faça login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
