import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCheckout } from '@/lib/api/checkout'
import { CheckoutInput } from '@/types/checkout'
import { clearCart } from './useCart'

export function useCheckout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ input, accessToken }: { input: CheckoutInput; accessToken: string }) => {
      return createCheckout(input, accessToken)
    },
    onSuccess: (data) => {
      console.log('Checkout successful:', data)
      
      // Clear cart dari localStorage
      clearCart()
      
      // Invalidate cart & customer queries
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      queryClient.invalidateQueries({ queryKey: ['customer'] })
    },
    onError: (error) => {
      console.error('Checkout failed:', error)
    },
  })
}