import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getCustomer } from '@/lib/api/customer'
import { CustomerResponse } from '@/types/customer'

export function useCustomer(
  options?: Omit<UseQueryOptions<CustomerResponse>, 'queryKey' | 'queryFn'>
) {
  // Get access token from localStorage (nanti bisa dari auth context)
  const accessToken = typeof window !== 'undefined' 
    ? localStorage.getItem('accessToken') 
    : null

  return useQuery({
    queryKey: ['customer', accessToken],
    queryFn: () => {
      if (!accessToken) {
        throw new Error('No access token found')
      }
      return getCustomer(accessToken)
    },
    enabled: !!accessToken, // Only fetch if token exists
    staleTime: 5 * 60 * 1000, // 5 minutes - user data jarang berubah
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1, // Only retry once (kalau 401, langsung fail)
    ...options,
  })
}

// Helper hook to check if user is logged in
export function useIsLoggedIn(): boolean {
  const { data, isSuccess } = useCustomer()
  return isSuccess && !!data?.success
}

// Helper hook to get customer's display name
export function useCustomerName(): string | null {
  const { data } = useCustomer()
  return data?.data?.displayName || null
}