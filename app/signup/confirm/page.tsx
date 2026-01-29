import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import OtpConfirmForm from "./otp-form"

type JWTPayload = {
  phone?: string
  exp?: number
  [key: string]: unknown
}

function decodeJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null

    const payload = parts[1]
    const decoded = Buffer.from(payload, "base64url").toString("utf-8")
    return JSON.parse(decoded) as JWTPayload
  } catch {
    return null
  }
}

export default async function ConfirmSignupPage() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value

  if (!accessToken) {
    redirect("/signup")
  }

  const payload = decodeJWT(accessToken)
  const phone = payload?.phone ?? ""
  const expiresAt = payload?.exp ? payload.exp * 1000 : null // Convert to ms

  return <OtpConfirmForm phone={phone} expiresAt={expiresAt} />
}
