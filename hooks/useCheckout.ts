import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCheckout } from '@/lib/api/checkout'
import { CheckoutInput } from '@/types/checkout'
import { clearCart } from './useCart'
import { useAlert } from '@/contexts/AlertContext'

export function useCheckout() {
  const queryClient = useQueryClient()
  const { showAlert } = useAlert()

  return useMutation({
    mutationFn: ({ input, accessToken }: { input: CheckoutInput; accessToken: string }) => {
      return createCheckout(input, accessToken)
    },
    onSuccess: (data) => {
      console.log('Checkout successful:', data)
      
      clearCart()
      
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      queryClient.invalidateQueries({ queryKey: ['customer'] })
    },
    onError: (error) => {
      showAlert('error', `Checkout failed: ${error}`)
    },
  })
}