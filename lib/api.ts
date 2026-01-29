export type ApiErrorCause = {
  field: string
  message: string
}

export type ApiError = {
  message: string
  error: string
  code: number
  causes?: ApiErrorCause[]
}

// Error codes that the backend may return for 401 responses
export const AUTH_ERROR_CODES = {
  UNAUTHENTICATED: "unauthenticated",
  UNCONFIRMED: "unconfirmed",
  UNAUTHORIZED: "unauthorized",
} as const

export type AuthErrorCode = (typeof AUTH_ERROR_CODES)[keyof typeof AUTH_ERROR_CODES]

type ApiOptions = RequestInit & {
  isServer?: boolean
}

function getBaseUrl(): string {
  if (process.env.NODE_ENV === "production") {
    return process.env.NEXT_PUBLIC_API_BASE_URL || ""
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL_DEV || "http://localhost:8080"
}

export async function api<T>(
  path: string,
  options?: ApiOptions
): Promise<T> {
  const { isServer = false, ...fetchOptions } = options || {}

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...fetchOptions?.headers,
  }

  if (isServer) {
    const { cookies } = await import("next/headers")
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()
    if (cookieHeader) {
      ;(headers as Record<string, string>)["Cookie"] = cookieHeader
    }
  }

  const res = await fetch(`${getBaseUrl()}${path}`, {
    credentials: "include",
    ...fetchOptions,
    headers,
  })

  if (!res.ok) {
    const error = (await res.json()) as ApiError

    // Handle 401 errors by redirecting to login (client-side only)
    if (res.status === 401 && !isServer && typeof window !== "undefined") {
      const errorCode = error.error as AuthErrorCode
      if (errorCode === AUTH_ERROR_CODES.UNAUTHENTICATED || errorCode === AUTH_ERROR_CODES.UNAUTHORIZED) {
        window.location.href = "/login"
      }
    }

    throw error
  }

  return res.json() as Promise<T>
}
