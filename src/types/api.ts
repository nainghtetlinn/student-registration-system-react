export interface ApiResponse<T> {
  code: number
  duration: number
  message: string
  success: number
  meta: { endpoint: string; method: string }
  data: T
}

export type LoginResponse = {
  name: string | null
  email: string
  role: string
  token: {
    accessToken: string
    refreshToken: string
  }
}
