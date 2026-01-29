import { api } from "@/lib/api"

export type SignupPayload = {
  name: string
  email: string
  birth_date: string
  phone: string
  password: string
  cpf: string
}

export type SignupResponse = {
  id: string
  email: string
}

export type otpPayload = {
  otp: string
}

export type otpResponse = {
  id: string
  phone: string
}

export type SigninPayload = {
  email: string
  password: string

}

export type SigninResponse = {
  id: string
  email: string
  name: string
  avatarUrl: string
  status: string
}

export function signup(payload: SignupPayload) {
  return api<SignupResponse>("/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}


export function signupConfirmation(payload: otpPayload) {
  return api<otpResponse>("/api/confirm_user", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}


export function signin(payload: SigninPayload) {
  return api<SigninResponse>("/signin", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function resendOtp() {
  return api<void>("/api/resend_otp", {
    method: "GET",
  })
}

export type UpdatePhonePayload = {
  phone: string
}

export type UpdatePhoneResponse = {
  id: string
  phone: string
}

export function updatePhone(payload: UpdatePhonePayload) {
  return api<UpdatePhoneResponse>("/api/update_phone", {
    method: "PUT",
    body: JSON.stringify(payload),
  })
}


