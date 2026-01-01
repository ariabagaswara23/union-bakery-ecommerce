import { LoginInput, RegisterInput, AuthResponse } from '@/types/auth'
import { rateLimiterManager } from './rateLimiter'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

const authLimiter = rateLimiterManager.getLimiter('auth', 3, 1000)

export async function login(input: LoginInput): Promise<AuthResponse> {
  return authLimiter.throttle(async () => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Login failed')
    }

    return response.json()
  })
}

export async function register(input: RegisterInput): Promise<AuthResponse> {
  return authLimiter.throttle(async () => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Registration failed')
    }

    return response.json()
  })
}

export function logout(): void {
  if (typeof window === 'undefined') return
  

  localStorage.removeItem('accessToken')
  localStorage.removeItem('tokenExpiresAt')
  localStorage.removeItem('cartAssociated')
  localStorage.removeItem('cartId')
  localStorage.removeItem('cart')

  localStorage.removeItem('pendingCheckout')
  localStorage.removeItem('shouldAutoJump')

}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  
  const token = localStorage.getItem('accessToken')
  const expiresAt = localStorage.getItem('tokenExpiresAt')
  
  if (!token || !expiresAt) return false
  
  const now = new Date().getTime()
  const expiry = new Date(expiresAt).getTime()
  
  if (now >= expiry) {
    logout()
    return false
  }
  
  return true
}


export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null
  
  if (!isAuthenticated()) return null
  
  return localStorage.getItem('accessToken')
}