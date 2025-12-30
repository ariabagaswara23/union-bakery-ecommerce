import { CustomerResponse } from "@/types/customer";
import { rateLimiterManager } from './rateLimiter'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''
const customerLimiter = rateLimiterManager.getLimiter('customer', 3, 1000)

export async function getCustomer(
  accessToken: string
): Promise<CustomerResponse> {
  return customerLimiter.throttle(async () => {
    const response = await fetch(`${API_BASE_URL}/customer`, {
      method: 'GET',
      headers: {
        'Authorization': accessToken, // Required!
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Invalid or expired token')
      }
      throw new Error(`Failed to get customer: ${response.statusText}`)
    }

    return response.json()
  })
}