import { CheckoutInput, CheckoutResponse } from '@/types/checkout'
import { rateLimiterManager } from './rateLimiter'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''
const checkoutLimiter = rateLimiterManager.getLimiter('checkout', 3, 1000)

export async function createCheckout(
  input: CheckoutInput,
  accessToken: string
): Promise<CheckoutResponse> {
  return checkoutLimiter.throttle(async () => {
    const response = await fetch(`${API_BASE_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      },
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Please login to complete checkout')
      }
      throw new Error(`Failed to checkout: ${response.statusText}`)
    }

    return response.json()
  })
}