import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { addCartLine, createCart, getCart, removeCartLine, updateCartBuyerIdentity, updateCartLine } from '@/lib/api/cart'
import { AddCartLineInput, CreateCartInput, GetCartResponse, RemoveCartLineInput, UpdateCartLineInput } from '@/types/cart'
import { useProducts } from './useProducts'
import { getLocalCart, removeCartItemFromLocalStorage, saveCartItemToLocalStorage, updateCartItemInLocalStorage } from '@/lib/cart-storage'
import { useEffect } from 'react'

export function useCreateCart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateCartInput) => {
      // TODO: Get access token from auth context/storage
      const accessToken = undefined // Nanti diganti kalau auth sudah ready
      return createCart(input, accessToken)
    },
    onSuccess: (data) => {
      console.log('Cart created:', data)
      
      // Save cart ID to localStorage for future operations
      if (data.success && data.data.id) {
        localStorage.setItem('cartId', data.data.id)
      }

      // Invalidate cart queries supaya re-fetch
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
      const accessToken = undefined // TODO: Get from auth context
      return addCartLine(input, accessToken)
    },
    onSuccess: (data) => {
      console.log('Item added to cart:', data)
      
      // Update cart ID jika berubah (seharusnya sama)
      if (data.success && data.data.id) {
        localStorage.setItem('cartId', data.data.id)
      }

      // Invalidate cart queries supaya re-fetch
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error) => {
      console.error('Failed to add item to cart:', error)
    },
  })
}

/**
 * Hook combo: Create cart atau add to existing cart
 * Otomatis deteksi apakah cart sudah ada atau belum
 */
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
      // Check if cart already exists
      const cartId = localStorage.getItem('cartId')

      if (cartId) {
        // Cart exists, add line to existing cart
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
        // No cart yet, create new cart
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
  // Get cart ID from localStorage
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
    enabled: !!cartId, // Only fetch if cart ID exists
    staleTime: 30 * 1000, // 30 seconds - cart data lebih sering berubah
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    ...options,
  })
}

// Hook untuk update buyer identity di cart, dipanggil setelah user login
export function useUpdateBuyerIdentity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ cartId, accessToken }: { cartId: string; accessToken: string }) => {
      return updateCartBuyerIdentity({ cartId }, accessToken)
    },
    onSuccess: (data) => {
      console.log('Buyer identity updated:', data)
      
      // Invalidate cart query supaya re-fetch dengan buyer info
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error) => {
      console.error('Failed to update buyer identity:', error)
    },
  })
}

// Helper untuk mengaitkan cart dengan customer setelah login
export function associateCartWithCustomer(accessToken: string) {
  const cartId = localStorage.getItem('cartId')
  
  if (!cartId) {
    console.log('No cart to associate')
    return null
  }

  // TODO: Integrate with your mutation
  return { cartId, accessToken }
}

// helper untuk menghapus asosiasi cart saat logout
export function clearCartAssociation() {
  localStorage.removeItem('cartAssociated')
  localStorage.removeItem('cartId')
  localStorage.removeItem('accessToken')
}

export function useUpdateCartLine() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdateCartLineInput) => {
      const accessToken = undefined // TODO: Get from auth context
      return updateCartLine(input, accessToken)
    },
    onSuccess: (data) => {
      console.log('Cart line updated:', data)
      
      // Invalidate cart query supaya re-fetch dengan data terbaru
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error) => {
      console.error('Failed to update cart line:', error)
    },
  })
}

export function useEnrichedCart() {
  const { data: cartData, isLoading, isError } = useCart()
  const localCart = getLocalCart()

  // ✅ Sync lineIds to localStorage
  useEffect(() => {
    if (cartData?.data?.cart?.lines?.nodes) {
      cartData.data.cart.lines.nodes.forEach(item => {
        // Update localStorage with lineId
        const localItem = localCart?.items.find(
          i => i.variantId === item.merchandise.id
        )
        
        if (localItem) {
          // Update existing item with lineId
          updateCartItemInLocalStorage(item.merchandise.id, {
            lineId: item.id  // ✅ Add lineId
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

  return useMutation({
    mutationFn: (input: RemoveCartLineInput) => {
      const accessToken = undefined
      return removeCartLine(input, accessToken)
    },
    onSuccess: (data, variables) => {
      console.log('Cart line removed:', data)
      
      // Remove from localStorage
      removeCartItemFromLocalStorage(variables.lineIds)
      
      // Invalidate cart query
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error) => {
      console.error('Failed to remove cart line:', error)
    },
  })
}