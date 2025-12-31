import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getCustomer } from '@/lib/api/customer'
import { CustomerResponse } from '@/types/customer'

export function useCustomer(
  options?: Omit<UseQueryOptions<CustomerResponse>, 'queryKey' | 'queryFn'>
) {
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
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
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