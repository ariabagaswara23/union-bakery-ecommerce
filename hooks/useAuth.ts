import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login, register, logout, isAuthenticated, getAccessToken } from '@/lib/api/auth'
import { LoginInput, RegisterInput } from '@/types/auth'
import { useUpdateBuyerIdentity } from './useCart'
import { useState, useEffect } from 'react'
import { useAlert } from '@/contexts/AlertContext'

export function useLogin() {
  const queryClient = useQueryClient()
  const updateBuyerIdentity = useUpdateBuyerIdentity()
  const { showAlert } = useAlert()

  return useMutation({
    mutationFn: (input: LoginInput) => {
      return login(input)
    },
    onSuccess: (data) => {  
      showAlert('success', 'Login successful!')
      // save token & expiry
      localStorage.setItem('accessToken', data.data.accessToken)
      localStorage.setItem('tokenExpiresAt', data.data.expiresAt)
      
      // associate cart with customer (if cart exists)
      const cartId = localStorage.getItem('cartId')
      if (cartId) {
        updateBuyerIdentity.mutate(
          { cartId, accessToken: data.data.accessToken },
          {
            onSuccess: () => {
              localStorage.setItem('cartAssociated', 'true')
            },
            onError: (error) => {
              showAlert('warning', `Cart sync failed: ${error}`)
            }
          }
        )
      }
      
      queryClient.invalidateQueries({ queryKey: ['customer'] })
    },
    onError: (error) => {
      showAlert('error', error.message || 'Login failed')
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()
  const updateBuyerIdentity = useUpdateBuyerIdentity()
  const { showAlert } = useAlert()

  return useMutation({
    mutationFn: (input: RegisterInput) => {
      return register(input)
    },
    onSuccess: (data) => {
      showAlert('success', 'Register successful!')
      
      // save token & expiry
      localStorage.setItem('accessToken', data.data.accessToken)
      localStorage.setItem('tokenExpiresAt', data.data.expiresAt)
      
      // associate cart with customer (if cart exists)
      const cartId = localStorage.getItem('cartId')
      if (cartId) {
        updateBuyerIdentity.mutate(
          { cartId, accessToken: data.data.accessToken },
          {
            onSuccess: () => {
              localStorage.setItem('cartAssociated', 'true')
            },
            onError: (error) => {
              showAlert('warning', `Cart sync failed: ${error}`)
            }
          }
        )
      }
      
      // Invalidate customer query to fetch profile
      queryClient.invalidateQueries({ queryKey: ['customer'] })
    },
    onError: (error) => {
      showAlert('error', error.message || 'Registration failed')
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  const { showAlert } = useAlert()

  return useMutation({
    mutationFn: () => {
      logout()
      return Promise.resolve()
    },
    onSuccess: () => {
      showAlert('success', 'Logout successful!')
      queryClient.clear()
      window.location.href = '/login'
    },
  })
}

export function useIsAuthenticated(): boolean {
  const [authenticated, setAuthenticated] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setAuthenticated(isAuthenticated())
  }, [])

  if (!mounted) {
    return false
  }

  return authenticated
}

export function useAccessToken(): string | null {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    setToken(getAccessToken())
  }, [])

  return token
}
