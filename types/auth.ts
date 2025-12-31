export interface LoginInput {
  email: string
  password: string
}

export interface RegisterInput {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface AuthResponse {
  success: boolean
  data: {
    accessToken: string
    expiresAt: string
  }
}

export interface AuthError {
  success: false
  message: string
}