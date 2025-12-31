import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { addCartLine, createCart, getCart, removeCartLine, updateCartBuyerIdentity, updateCartLine } from '@/lib/api/cart'
import { AddCartLineInput, CreateCartInput, GetCartResponse, RemoveCartLineInput, UpdateCartLineInput } from '@/types/cart'
import { getLocalCart, removeCartItemFromLocalStorage, saveCartItemToLocalStorage, updateCartItemInLocalStorage } from '@/lib/cart-storage'
import { useEffect } from 'react'
import { getAccessToken } from '@/lib/api/auth'
import { useAlert } from '@/contexts/AlertContext'

export function useCreateCart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateCartInput) => {
      const accessToken = getAccessToken() ?? undefined
      return createCart(input, accessToken)
    },
    onSuccess: (data) => {
      if (data.success && data.data.id) {
        localStorage.setItem('cartId', data.data.id)
      }

      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error) => {
      console.error('Failed to create cart:', error)
    },
  })
}

export function useAddCartLine() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: AddCartLineInput) => {
      const accessToken = getAccessToken() ?? undefined
      return addCartLine(input, accessToken)
    },
    onSuccess: (data) => {
      console.log('Item added to cart:', data)
      
      if (data.success && data.data.id) {
        localStorage.setItem('cartId', data.data.id)
      }

      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error) => {
      console.error('Failed to add item to cart:', error)
    },
  })
}

export function useAddToCart() {
  const createCartMutation = useCreateCart()
  const addCartLineMutation = useAddCartLine()

  return {
    mutate: (input: Omit<CreateCartInput, 'variantId'> & { 
        variantId: string
        productTitle?: string
        productHandle?: string
        price?: string
        imageUrl?: string
    }) => {
      const cartId = localStorage.getItem('cartId')

      if (cartId) {
        addCartLineMutation.mutate({
          cartId,
          variantId: input.variantId,
          quantity: input.quantity,
          cakeWording: input.cakeWording,
          greetingWording: input.greetingWording,
        }, {
            onSuccess: () => {
                saveCartItemToLocalStorage({
                variantId: input.variantId,
                productTitle: input.productTitle,
                productHandle: input.productHandle,
                cakeSize: input.cakeSize,
                quantity: input.quantity,
                price: input.price,
                imageUrl: input.imageUrl,
                cakeWording: input.cakeWording,
                greetingWording: input.greetingWording,
                })
            }
        })
      } else {
        createCartMutation.mutate({
            variantId: input.variantId,
          quantity: input.quantity,
          cakeWording: input.cakeWording,
          greetingWording: input.greetingWording,
        }, {
            onSuccess: (data) => {
                if (data.success && data.data.id) {
                    localStorage.setItem('cartId', data.data.id)

                    saveCartItemToLocalStorage({
                variantId: input.variantId,
                productTitle: input.productTitle,
                productHandle: input.productHandle,
                cakeSize: input.cakeSize,
                quantity: input.quantity,
                price: input.price,
                imageUrl: input.imageUrl,
                cakeWording: input.cakeWording,
                greetingWording: input.greetingWording,
              })
                }
            }
        })
      }
    },
    isPending: createCartMutation.isPending || addCartLineMutation.isPending,
    isError: createCartMutation.isError || addCartLineMutation.isError,
    error: createCartMutation.error || addCartLineMutation.error,
    isSuccess: createCartMutation.isSuccess || addCartLineMutation.isSuccess,
    reset: () => {
      createCartMutation.reset()
      addCartLineMutation.reset()
    },
  }
}

export function clearCart() {
  localStorage.removeItem('cartId')
}

export function getCartId(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('cartId')
}

export function useCart(
  options?: Omit<UseQueryOptions<GetCartResponse>, 'queryKey' | 'queryFn'>
) {
  const cartId = typeof window !== 'undefined' 
    ? localStorage.getItem('cartId') 
    : null

  return useQuery({
    queryKey: ['cart', cartId],
    queryFn: () => {
      if (!cartId) {
        throw new Error('No cart ID found')
      }
      return getCart({ cartId })
    },
    enabled: !!cartId,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    ...options,
  })
}

export function useUpdateBuyerIdentity() {
  const queryClient = useQueryClient()
  const { showAlert } = useAlert()

  return useMutation({
    mutationFn: ({ cartId, accessToken }: { cartId: string; accessToken: string }) => {
      return updateCartBuyerIdentity({ cartId }, accessToken)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error) => {
      showAlert('error', error.message || 'Update Buyer Identity failed')
    },
  })
}


// helper untuk menghapus asosiasi cart saat logout
export function clearCartAssociation() {
  localStorage.removeItem('cartAssociated')
  localStorage.removeItem('cartId')
  localStorage.removeItem('accessToken')
}

export function useUpdateCartLine() {
  const queryClient = useQueryClient()
  const { showAlert } = useAlert()

  return useMutation({
    mutationFn: (input: UpdateCartLineInput) => {
      const accessToken = getAccessToken() ?? undefined
      return updateCartLine(input, accessToken)
    },
    onSuccess: (data) => {      
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error) => {
      showAlert('error', error.message)
    },
  })
}

export function useEnrichedCart() {
  const { data: cartData, isLoading, isError } = useCart()
  const localCart = getLocalCart()

  // sync lineIds to localStorage
  useEffect(() => {
    if (cartData?.data?.cart?.lines?.nodes) {
      cartData.data.cart.lines.nodes.forEach(item => {
        // update localStorage with lineId
        const localItem = localCart?.items.find(
          i => i.variantId === item.merchandise.id
        )
        
        if (localItem) {
          // Update existing item with lineId
          updateCartItemInLocalStorage(item.merchandise.id, {
            lineId: item.id
          })
        }
      })
    }
  }, [cartData])

  const enrichedItems = cartData?.data?.cart?.lines?.nodes.map((item) => {
    const variantId = item.merchandise.id
    const localMetadata = localCart?.items.find(i => i.variantId === variantId)

    return {
      ...item,
      merchandise: {
        ...item.merchandise,
        product: {
          title: localMetadata?.productTitle || 'Product',
          handle: localMetadata?.productHandle || '',
        },
      },
      cakeSize: localMetadata?.cakeSize || '18cm',
    }
  }) || []

  return {
    cartItems: enrichedItems,
    isLoading,
    isError,
    subtotal: cartData?.data?.cart?.cost?.subtotalAmount?.amount || 0,
  }
}

export function useRemoveCartLine() {
  const queryClient = useQueryClient()
  const { showAlert } = useAlert()

  return useMutation({
    mutationFn: (input: RemoveCartLineInput) => {
      const accessToken = getAccessToken() ?? undefined
      return removeCartLine(input, accessToken)
    },
    onSuccess: (data, variables) => {
      removeCartItemFromLocalStorage(variables.lineIds)

      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error) => {
      showAlert('error', error.message || "Failed to remove cart")
    },
  })
}